import { GameStatus, Guess } from "../api/userData";

/**
 * Gets the emoji string representing the player's guesses in a wordle-style format.
 *
 * Note that for N clues, a user can make N+1 guesses (the final guess after all clues).
 *
 * Example output (for a game with 5 clues, won in 5 guesses, with 2 skips):
 * ⬜⬜🟥🟥🟩⬜
 *
 * @param guesses The guesses made by the player.
 * @param numClues The number of clues there were in this game.
 * @param gameStatus The current status of the game.
 */
export function getEmojiString(
  guesses: Guess[],
  numClues: number,
  gameStatus: GameStatus
): string {
  const emojiString: ("⬛" | "🟩" | "🟥" | "⬜")[] = guesses.map((guess, i) => {
    if (guess.value === "") {
      // Skip
      return "⬛";
    }
    if (gameStatus === GameStatus.WON && i === guesses.length - 1) {
      // If the user won the game and this is their last guess, this must be the correct guess
      return "🟩";
    }
    // Wrong guess
    return "🟥";
  });
  for (let i = guesses.length; i < numClues + 1; i++) {
    // Fill in with empty squares
    emojiString.push("⬜");
  }

  return emojiString.join("");
}

export function isCompleted(status: GameStatus): boolean {
  return status === GameStatus.WON || status === GameStatus.LOST;
}

export function validateAccessionNumber(
  accessionNumber: string,
  input: string
): boolean {
  // We only care about the accession numbers' digits and periods
  const clean = (str: string) => str.replace(/[^0-9.]/g, "");
  return clean(accessionNumber) === clean(input);
}
