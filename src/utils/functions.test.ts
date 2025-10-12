import { getEmojiString, validateAccessionNumber } from "./functions";
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

describe("validateAccessionNumber", () => {
  test("should return true for exact matches", () => {
    expect(validateAccessionNumber("123.45", "123.45")).toBe(true);
  });

  test("should return true for matches ignoring letters", () => {
    expect(validateAccessionNumber("abc123.45", "123.45")).toBe(true);
  });

  test("should return true for matches ignoring special characters", () => {
    expect(validateAccessionNumber("123-45", "123.45")).toBe(false);
    expect(validateAccessionNumber("123/45", "123.45")).toBe(false);
    expect(validateAccessionNumber("123.45", "123.45")).toBe(true);
  });

  test("should return true for matches ignoring whitespace", () => {
    expect(validateAccessionNumber("  123.45 ", "123.45")).toBe(true);
  });

  test("should return true for matches ignoring both letters and special characters", () => {
    expect(validateAccessionNumber("abc-123.45", "123.45")).toBe(true);
    expect(validateAccessionNumber("abc/123.45", "123.45")).toBe(true);
  });

  test("should return false for non-matching numbers", () => {
    expect(validateAccessionNumber("123.45", "678.90")).toBe(false);
  });

  test("should return false for completely different strings", () => {
    expect(validateAccessionNumber("abc123.45", "xyz678.90")).toBe(false);
  });

  test("should return true for empty strings", () => {
    expect(validateAccessionNumber("", "")).toBe(true);
  });

  test("should return false if only one string is empty", () => {
    expect(validateAccessionNumber("123.45", "")).toBe(false);
    expect(validateAccessionNumber("", "123.45")).toBe(false);
  });

  test("should handle complex mixed cases", () => {
    expect(validateAccessionNumber("abc-123.45xyz", "123.45")).toBe(true);
    expect(validateAccessionNumber("123.45xyz", "123.45")).toBe(true);
  });

  test("real world examples", () => {
    expect(validateAccessionNumber("2017.357.13a, b", "2017.357.13")).toBe(
      true
    );
  });
});
