/**
 * Parses a date string or range (e.g., "Jan 2020 - Present") into a numeric timestamp
 */
export function parseDate(dateStr?: string): number {
  if (!dateStr || typeof dateStr !== "string") return 0;

  const normalizedStr = dateStr.trim().toLowerCase();
  if (normalizedStr.includes("present") || normalizedStr.includes("current")) {
    return Date.now();
  }

  const parts = dateStr.split(/\s+[-–—]\s+/);
  const dateToParse = (parts[parts.length - 1] ?? dateStr).trim();

  if (!dateToParse) return 0;

  const timestamp = new Date(dateToParse).getTime();
  return isNaN(timestamp) ? 0 : timestamp;
}

/**
 * Gets the most recent date from a list of employment positions to determine sort order
 */
export function getMostRecentDate(
  positions: Array<{ employmentPeriod: string }>,
): Date {
  const timestamps = positions
    .map((pos) => parseDate(pos.employmentPeriod))
    .filter((timestamp) => timestamp !== 0);

  if (timestamps.length === 0) return new Date(0);

  timestamps.sort((a, b) => b - a);
  const mostRecent = timestamps[0];
  return new Date(mostRecent ?? 0);
}
