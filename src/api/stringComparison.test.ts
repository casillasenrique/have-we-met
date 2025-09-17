import { guessIsCloseEnough } from "./stringComparison";
import { describe, expect, test } from "@jest/globals";

describe("guessIsCloseEnough", () => {
  test("should return true for exact matches", () => {
    expect(guessIsCloseEnough("Mona Lisa", "Mona Lisa")).toBe(true);
  });

  test("should return true for case-insensitive matches", () => {
    expect(guessIsCloseEnough("Mona Lisa", "mona lisa")).toBe(true);
  });

  test("should return true for guesses within the threshold", () => {
    expect(guessIsCloseEnough("Mona Lisa", "Mona Liza")).toBe(true);
  });

  test("should return false for guesses outside the threshold", () => {
    expect(guessIsCloseEnough("Mona Lisa", "Random Guess")).toBe(false);
  });

  test("should handle leading and trailing spaces in the input", () => {
    expect(guessIsCloseEnough("  Mona Lisa  ", "Mona Lisa")).toBe(true);
  });

  test("should return true for short titles with small differences", () => {
    expect(guessIsCloseEnough("Cat", "Bat")).toBe(true);
  });

  test("should return false for short titles with large differences", () => {
    expect(guessIsCloseEnough("Cat", "Dog")).toBe(false);
  });

  test("should handle empty strings correctly", () => {
    expect(guessIsCloseEnough("", "")).toBe(true);
    expect(guessIsCloseEnough("Mona Lisa", "")).toBe(false);
    expect(guessIsCloseEnough("", "Mona Lisa")).toBe(false);
  });

  test("should handle long titles with small differences", () => {
    const title = "The Starry Night by Vincent van Gogh";
    const guess = "The Starry Night by Vincent van Goh";
    expect(guessIsCloseEnough(title, guess)).toBe(true);
  });

  test("should return false for completely unrelated strings", () => {
    expect(guessIsCloseEnough("Sunflowers", "Moonlight")).toBe(false);
  });

  // Real-world examples
  test("should handle titles with accents", () => {
    expect(
      guessIsCloseEnough(
        "Potpourri vase (pot-pourri gondole)",
        "potpourri vase potpourri gondole"
      )
    ).toBe(false);
    expect(
      guessIsCloseEnough(
        "Potpourri vase (pot-pourri gondole)",
        "potpourri vase"
      )
    ).toBe(true);
    expect(
      guessIsCloseEnough("Jean-François Oeben", "Jean Francois Oeben")
    ).toBe(true);
    expect(guessIsCloseEnough("Sèvres Manufactory", "Sevres Manufactory")).toBe(
      true
    );
  });

  test("should handle titles with omitted words", () => {
    expect(
      guessIsCloseEnough(
        "Naophorous Block Statue of a Governor of Sais",
        "Naophorous Block Statue Governor Sais"
      )
    ).toBe(true);
    expect(
      guessIsCloseEnough(
        "Block Statue of a Prophet of Montu and Scribe Djedkhonsuefankh",
        "Block Statue Prophet Montu Scribe"
      )
    ).toBe(true);
    expect(guessIsCloseEnough("The Farnese Table", "Farnese Table")).toBe(true);
  });

  test("should handle titles with dates", () => {
    expect(
      guessIsCloseEnough("Sabine Houdon (1787–1836)", "Sabine Houdon")
    ).toBe(true);
    expect(
      guessIsCloseEnough(
        "Display dish with Charles II (1630–1685) in a tree",
        "Display dish Charles II in tree"
      )
    ).toBe(true);
  });

  test("should handle partial matches for long titles", () => {
    expect(guessIsCloseEnough("Mechanical table", "mechanical")).toBe(true);
    expect(
      guessIsCloseEnough(
        "Dining room from Lansdowne House",
        "Dining room Lansdowne"
      )
    ).toBe(true);
    expect(
      guessIsCloseEnough(
        "Monteith with the Gibbs and Nelthorpe coats of arms",
        "Monteith Gibbs Nelthorpe coats arms"
      )
    ).toBe(true);
  });

  test("should handle unrelated guesses for real-world examples", () => {
    expect(guessIsCloseEnough("Bassoon", "Guitar")).toBe(false);
    expect(guessIsCloseEnough("Accordion", "Violin")).toBe(false);
    expect(
      guessIsCloseEnough("Head Attributed to Arsinoe II", "Head of a goddess")
    ).toBe(false);
  });

  test("should handle edge cases with special characters", () => {
    expect(guessIsCloseEnough("Ewer (Brocca)", "Ewer")).toBe(true);
    expect(guessIsCloseEnough("Commode à vantaux", "Commode vantaux")).toBe(
      true
    );
    expect(
      guessIsCloseEnough(
        "Bottle cooler from the Louis XV service (seau à bouteille)",
        "Bottle cooler Louis XV service"
      )
    ).toBe(true);
  });

  test("should handle titles with parentheses", () => {
    expect(
      guessIsCloseEnough(
        "Bottle cooler from the Louis XV service (seau à bouteille)",
        "Bottle cooler from Louis XV service"
      )
    ).toBe(true);
    expect(
      guessIsCloseEnough("Sabine Houdon (1787–1836)", "Sabine Houdon")
    ).toBe(true);
    expect(
      guessIsCloseEnough("The Farnese Table [Giacomo]", "Farnese Table")
    ).toBe(true);
    expect(
      guessIsCloseEnough(
        "Display dish with Charles II (1630–1685)",
        "Display dish Charles II"
      )
    ).toBe(true);
  });
});
