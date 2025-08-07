import React from "react";
import ArchiveView from "./ArchiveView";
import { getObjectIdsToToday } from "@/api/objectData";

const DAYS_IN_WEEK = 7;
const DAYS_IN_WEEK_STRINGS = ["s", "m", "t", "w", "th", "f", "s"];

export interface ArchiveDay {
  dateString: string; // Formatted date string (e.g., "Jan 1")
  gameId: number; // Game number for that day
  dayOfWeekIdx: number; // Index of the day in the week (0-6)
}

export default function Archive() {
  const allObjectIds = getObjectIdsToToday(); // Server-side retrieval
  const totalGames = allObjectIds.length;
  console.log(`Retrieved ${totalGames} games/object IDs`);

  // todo: can probably get the dates in getObjectIdsToToday
  const today = new Date();
  const archiveDays = Array.from({ length: totalGames }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() - index);
    return {
      dateString: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      dayOfWeekIdx: date.getDay(),
      gameId: totalGames - index, // Game numbers count down from totalGames
    } as ArchiveDay;
  });

  const emptyDay = { dateString: "", gameId: 0, dayOfWeekIdx: 0 };

  // We might not be done with the latest week, so fill it with placeholders.
  // For example, if today is a Thursday, we need empty slots for Friday, Saturday, and Sunday
  const firstDayOfWeekIdx = archiveDays[0].dayOfWeekIdx;
  const daysLeftInWeek = DAYS_IN_WEEK - firstDayOfWeekIdx - 1;
  console.log(
    `First day of the week index: ${firstDayOfWeekIdx}, ${daysLeftInWeek} days left in the week`
  );
  for (let i = 0; i < daysLeftInWeek; i++) {
    archiveDays.unshift(emptyDay);
  }

  // Create an array of weeks so we can display them in the grid correctly
  // Each week will have 7 days, and we reverse the order so the most recent day is on the left
  const weeks: ArchiveDay[][] = [];
  for (let i = 0; i < archiveDays.length; i += DAYS_IN_WEEK) {
    const week = archiveDays.slice(i, i + DAYS_IN_WEEK);

    // The last week might not have 7 days, so fill it with empty days
    while (week.length < DAYS_IN_WEEK) {
      week.push(emptyDay);
    }
    weeks.push(week.reverse());
  }

  console.log(
    "Successfully created weeks for archive, total weeks:",
    weeks.length
  );

  return (
    <div className="p-6">
      <h1 className="text-black text-2xl font-bold mb-1">Play the archive</h1>
      <p className="text-sm text-gray-600 mb-6">
        Click on a circle to guess the MET object of that day
      </p>
      <div className="grid grid-cols-7 gap-4 text-center">
        {/* Days of the week */}
        {DAYS_IN_WEEK_STRINGS.map((day, index) => (
          <div key={index} className="text-xl font-bold text-primary">
            {day}
          </div>
        ))}
        <ArchiveView weeks={weeks} />
      </div>
    </div>
  );
}
