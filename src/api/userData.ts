/**
 * API for user data, stored using localStorage.
 */

export enum GameStatus {
  NOT_PLAYED = "NOT_PLAYED",
  IN_PROGRESS = "IN_PROGRESS",
  WON = "WON",
  LOST = "LOST",
}

export interface Guess {
  value: string; // Single string property
}

export interface GameData {
  id: number; // Game ID
  status: GameStatus; // Game status (IN_PROGRESS, WON, LOST)
  guesses: Guess[]; // Array of Guess objects
}

export interface UserData {
  playedGames: GameData[]; // Array of GameData objects
}

const USER_DATA_KEY = "userData";

function createUserData(): UserData {
  console.log("Creating new user data in localStorage");
  const defaultData: UserData = { playedGames: [] };

  // Initialize user data in localStorage
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(defaultData));

  return defaultData;
}

/**
 * Gets or creates user data in localStorage.
 * If user data does not exist, it initializes it with default values.
 */
export function getOrCreateUserData(): UserData {
  const userData = localStorage.getItem(USER_DATA_KEY);

  if (userData) {
    try {
      return JSON.parse(userData) as UserData;
    } catch {
      console.warn("Failed to parse user data, resetting to default values");
      // If parsing fails, reset to default
      return createUserData();
    }
  }

  // If no user data exists, create it
  return createUserData();
}

/**
 * Gets or creates game data for a specific game ID.
 * If the game does not exist, it initializes it with default values.
 *
 * @param {number} gameId - The ID of the game.
 * @returns {GameData} The game data object.
 */
export function getOrCreateGameData(gameId: number): GameData {
  const userData = getOrCreateUserData();

  // Check if the game already exists
  let gameData = userData.playedGames.find((game) => game.id === gameId);

  if (!gameData) {
    // If the game does not exist, create a new one with default values
    gameData = {
      id: gameId,
      status: GameStatus.IN_PROGRESS, // Default status when a game is created
      guesses: [],
    };
    userData.playedGames.push(gameData);

    // Save new user data back to localStorage
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }

  return gameData;
}

/**
 * Adds a guess to a user's played game.
 *
 * Note: Assumes the game already exists in user data.
 *
 * @param {number} gameId - The ID of the game.
 * @param {Guess} guess - The guess to add.
 */
export function addGuessToGame(gameId: number, guess: Guess): void {
  const userData = getOrCreateUserData();

  // Find the game by ID
  const game = userData.playedGames.find((g) => g.id === gameId);

  if (game) {
    // If the game exists, add the guess
    game.guesses.push(guess);
  } else {
    console.error(
      `Game with ID ${gameId} not found in user data. Could not add guess.`
    );
    return;
  }

  // Save updated user data back to localStorage
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

/**
 * Marks a game as finished (and optionally won).
 * If the game does not exist, it logs an error.
 *
 * @param {number} gameId - The ID of the game to finish.
 * @param {boolean} won - Whether the game was won or not.
 */
export function finishGame(gameId: number, won: boolean): void {
  const userData = getOrCreateUserData();

  // Find the game by ID
  const game = userData.playedGames.find((g) => g.id === gameId);

  if (game) {
    game.status = won ? GameStatus.WON : GameStatus.LOST;

    // Save updated user data back to localStorage
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

    console.log(
      `Game with ID ${gameId} marked as finished. Status: ${game.status}`
    );
  } else {
    console.error(
      `Game with ID ${gameId} not found in user data. Could not finish game.`
    );
  }
}
