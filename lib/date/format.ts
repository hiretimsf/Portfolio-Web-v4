import { format } from "date-fns";

/**
 * Formats a date string into a human-readable format
 */
export function formatDate(date: string, formatStr: string = "MM/dd/yyyy") {
  if (date === "Present" || date === "present") return "Present";

  // Handle MM/yyyy format
  if (/^\d{1,2}\/\d{4}$/.test(date)) {
    const [month, year] = date.split("/");
    return format(new Date(Number(year), Number(month) - 1, 1), formatStr);
  }

  // Append time to date-only strings to avoid UTC parsing shifting the day
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00` : date;
  return format(new Date(parsed), formatStr);
}
