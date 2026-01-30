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

  return format(new Date(date), formatStr);
}
