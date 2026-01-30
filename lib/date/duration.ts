/**
 * Calculates human-readable duration between two dates
 * Returns format like "1 yr 10 months", "3 months", "6 months", etc.
 */
export function calculateDuration(fromDate: string, toDate: string): string {
  const start = new Date(fromDate);
  const end = toDate.toLowerCase() === "present" ? new Date() : new Date(toDate);

  const totalMonths = Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  );

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return months === 1 ? "1 month" : `${months} months`;
  }

  if (months === 0) {
    return years === 1 ? "1 yr" : `${years} yrs`;
  }

  const yearStr = years === 1 ? "1 yr" : `${years} yrs`;
  const monthStr = months === 1 ? "1 month" : `${months} months`;
  return `${yearStr} ${monthStr}`;
}
