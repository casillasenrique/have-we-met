import { GameStatus, Guess } from "@/api/userData";

/**
 * Gets the emoji string representing the player's guesses in a wordle-style format.
 *
 * Example output (for a game with 6 clues, won in 5 guesses, with 2 skips):
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
  const emojiString = guesses.map((guess, i) => {
    if (guess.value === "") {
      // Skip
      return "⬜";
    }
    if (gameStatus === GameStatus.WON && i === guesses.length - 1) {
      // If the user won the game and this is their last guess, this must be the correct guess
      return "🟩";
    }
    // Wrong guess
    return "🟥";
  });
  for (let i = guesses.length; i < numClues; i++) {
    // Fill in with empty squares
    emojiString.push("⬜");
  }

  return emojiString.join("");
}
