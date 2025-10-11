import { getEmojiString } from "./functions";
import { GameStatus } from "../api/userData";
import { describe, expect, test } from "@jest/globals";

describe("getEmojiString", () => {
  test("should return all empty squares for no guesses", () => {
    const result = getEmojiString([], 5, GameStatus.LOST);
    expect(result).toBe("⬜⬜⬜⬜⬜⬜");
  });

  test("should return correct emoji for a winning guess", () => {
    const result = getEmojiString([{ value: "correct" }], 5, GameStatus.WON);
    expect(result).toBe("🟩⬜⬜⬜⬜⬜");
  });

  test("should return correct emoji for wrong guesses", () => {
    const result = getEmojiString(
      [{ value: "wrong" }, { value: "wrong" }],
      5,
      GameStatus.LOST
    );
    expect(result).toBe("🟥🟥⬜⬜⬜⬜");
  });

  test("should handle mixed guesses with skips", () => {
    const result = getEmojiString(
      [
        { value: "wrong" },
        { value: "" },
        { value: "wrong" },
        { value: "correct" },
      ],
      5,
      GameStatus.WON
    );
    expect(result).toBe("🟥⬛🟥🟩⬜⬜");
  });

  test("should fill remaining slots with empty squares", () => {
    const result = getEmojiString([{ value: "wrong" }], 3, GameStatus.LOST);
    expect(result).toBe("🟥⬜⬜⬜");
  });

  test("should handle edge case with no clues", () => {
    const result = getEmojiString([], 0, GameStatus.LOST);
    expect(result).toBe("⬜");
  });

  test("should handle edge case with all skips", () => {
    const result = getEmojiString(
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
      3,
      GameStatus.LOST
    );
    expect(result).toBe("⬛⬛⬛⬛");
  });

  test("should handle edge case with all incorrect values", () => {
    const result = getEmojiString(
      [
        { value: "wrong" },
        { value: "wrong" },
        { value: "wrong" },
        { value: "wrong" },
      ],
      3,
      GameStatus.LOST
    );
    expect(result).toBe("🟥🟥🟥🟥");
  });

  test("should handle edge case with only one winning guess", () => {
    const result = getEmojiString([{ value: "correct" }], 1, GameStatus.WON);
    expect(result).toBe("🟩⬜");
  });
});
