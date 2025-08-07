import fs from "fs";
import path from "path";
import { toZonedTime } from "date-fns-tz";

const START_DATE = new Date("2025-01-01T00:00:00-05:00"); // Midnight ET
const OBJECT_IDS_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "objectIds.txt"
);

/**
 * The global cache object to store object data.
 *
 * Maps game IDs to their corresponding object data.
 */
type ObjectCache = {
  [gameId: number]: { data: any; timestamp: number };
};

let objectCache: ObjectCache = {};

/**
 * Cache the object IDs to avoid reading the file multiple times.
 *
 * Contains the list of object IDs up to today.
 */
let cachedIds: number[] | null = null;

/**
 * Caches the date fetching the same data multiple times across different days.
 *
 * If today's date is different from the cached date, it will reset cachedIds.
 */
let cachedDate: Date | null = null;

function getEasternDateNow() {
  const timeZone = "America/New_York";
  const now = new Date();
  return toZonedTime(now, timeZone);
}

function getDayIndexFromStart(start: Date, today: Date) {
  const diffTime = today.getTime() - start.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function getObjectIdsToToday(): number[] {
  const today = getEasternDateNow();
  // If the cached date is different from today, reset the cache
  if (!cachedDate || today.toDateString() !== cachedDate.toDateString()) {
    cachedIds = null;
  }

  // If cachedIds is already populated, return it
  if (cachedIds) {
    return cachedIds;
  }

  // Otherwise read the file and populate cachedIds
  console.log(
    "Cache is not populated, reading object IDs from file. Cached date:",
    cachedDate?.toDateString(),
    "Today:",
    today.toDateString()
  );
  const raw = fs.readFileSync(OBJECT_IDS_PATH, "utf-8");
  const objectIds = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map(Number);

  if (objectIds.length === 0) {
    throw new Error("No object IDs found in the file");
  }

  const index = getDayIndexFromStart(START_DATE, today);
  if (index < 0 || index >= objectIds.length) {
    throw new Error(
      `Today's index ${index} is out of bounds for the object IDs array`
    );
  }
  // Return only the object IDs up to today
  cachedIds = objectIds.slice(0, index + 1);
  cachedDate = today;
  return cachedIds;
}

/**
 * Gets the object ID for a given game ID.
 *
 * @param gameId - The ID of the game.
 * @returns the object ID for the game, or null if the game ID is invalid.
 */
export function getObjectId(gameId: number): number | null {
  const objectIds = getObjectIdsToToday(); // Ensure the cache is populated
  if (!objectIds || gameId < 1 || gameId > objectIds.length) {
    console.warn(
      `Invalid game ID ${gameId}. Valid range is 1 to ${objectIds?.length || 0}`
    );
    return null;
  }

  return objectIds[gameId - 1]; // Game IDs are 1-based, so subtract 1 for 0-based index
}

/**
 * Gets the ID of today's game.
 *
 * @returns the ID of today's game.
 */
export function getTodaysGameId(): number {
  const objectIds = getObjectIdsToToday();
  return objectIds.length;
}

/**
 *
 * @param id - The ID of the game.
 * Fetches the object data for the given game ID.
 * @returns the object data for the game.
 */
export async function fetchObjectData(gameId: number) {
  // todo: add a TTL
  const now = Date.now();

  // Check if the data is in the cache and still valid
  if (objectCache[gameId]) {
    console.log(`Cache hit for ID ${gameId}`);
    return objectCache[gameId].data;
  }

  // Otherwise get the next game object ID

  // Fetch data from the external API
  console.log(`Cache miss for ID ${gameId}, retrieving from API`);
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${gameId}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch data for ID ${gameId}`);
  }

  const data = await response.json();

  // Cache the response
  objectCache[gameId] = { data, timestamp: now };

  return data;
}
