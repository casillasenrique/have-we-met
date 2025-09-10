const { distance } = require("fastest-levenshtein");

// List of common stop words to remove
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "the",
  "to",
  "with",
]);

/**
 * Normalize a title by:
 * - Converting to lowercase
 * - Replacing accented characters with plain ASCII
 * - Removing non-alphabetical characters
 * - Stripping extra spaces
 */
function normalizeTitle(title: string): string {
  // Remove content inside parentheses or brackets (e.g., "(1787–1836)" or "[Giacomo]")
  title = title.replace(/\(.*?\)|\[.*?\]/g, "");

  // Convert to lowercase
  title = title.trim().toLowerCase();

  // Replace accented characters with plain ASCII
  title = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove non-alphabetical characters
  title = title.replace(/[^a-z\s]/g, "");

  // Remove stop words
  title = title
    .split(" ")
    .filter((word) => !STOP_WORDS.has(word))
    .join(" ");

  // Normalize whitespace
  title = title.replace(/\s+/g, " ").trim();

  return title;
}

export function guessIsCloseEnough(
  objectTitle: string,
  guess: string
): boolean {
  console.log("Comparing titles:", { objectTitle, guess });

  const normalizedTitle = normalizeTitle(objectTitle);
  const normalizedGuess = normalizeTitle(guess);
  const dist = distance(normalizedTitle, normalizedGuess);

  // Factor in the length of the strings to determine an acceptable threshold
  // For example, longer strings can tolerate more differences
  const length = Math.max(normalizedTitle.length, normalizedGuess.length);
  const threshold = Math.ceil(length * 0.4);

  console.log("Normalized titles:", {
    normalizedTitle,
    normalizedGuess,
    dist,
    threshold,
  });

  return dist <= threshold;
}
