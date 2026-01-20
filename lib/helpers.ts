import { format } from "date-fns";
/**
 * Gets base URL for the app
 */
export function getBaseUrl(slug?: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hiretimsf.com");

  if (!slug) return baseUrl;

  // Ensure slug starts with forward slash
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;
  return `${baseUrl}${normalizedSlug}`;
}

// Slugify
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize(`NFD`)
    .trim()
    .replace(/\./g, ``)
    .replace(/\s+/g, `-`)
    .replace(/[^\w-]+/g, ``)
    .replace(/--+/g, `-`);
}
export function formatDate(date: string, formatStr: string = "MMM d, yyyy") {
  if (date === "Present" || date === "present") return "Present";
  return format(new Date(date), formatStr);
}

export function parseDate(dateStr?: string): number {
  if (!dateStr || typeof dateStr !== "string") return 0;

  // Handle common "Present" indicators
  const normalizedStr = dateStr.trim().toLowerCase();
  if (normalizedStr.includes("present") || normalizedStr.includes("current")) {
    return Date.now();
  }

  // Split by common range separators: hyphen, en dash, em dash
  const parts = dateStr.split(/\s+[-–—]\s+/);
  const dateToParse = (parts[parts.length - 1] ?? dateStr).trim();

  if (!dateToParse) return 0;

  const timestamp = new Date(dateToParse).getTime();
  return isNaN(timestamp) ? 0 : timestamp;
}

/**
 * Gets the most recent date (usually end date) from a list of positions.
 * This determines the sorting order of the experience.
 */
export function getMostRecentDate(
  positions: Array<{ employmentPeriod: string }>,
): Date {
  const timestamps = positions
    .map((pos) => parseDate(pos.employmentPeriod))
    .filter((timestamp) => timestamp !== 0);

  if (timestamps.length === 0) return new Date(0); // Fallback for no dates

  // Sort descending to get the latest date first
  timestamps.sort((a, b) => b - a);
  const mostRecent = timestamps[0];
  return new Date(mostRecent ?? 0);
}

export const levenshtein = (a: string, b: string): number => {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  const matrix: number[][] = Array.from({ length: bLen + 1 }, () =>
    Array(aLen + 1).fill(0),
  );

  for (let i = 0; i <= aLen; i++) matrix[0]![i] = i;
  for (let j = 0; j <= bLen; j++) matrix[j]![0] = j;

  for (let j = 1; j <= bLen; j++) {
    for (let i = 1; i <= aLen; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j]![i] = Math.min(
        matrix[j]![i - 1]! + 1, // deletion
        matrix[j - 1]![i]! + 1, // insertion
        matrix[j - 1]![i - 1]! + cost, // substitution
      );
    }
  }

  return matrix[bLen]![aLen]!;
};
