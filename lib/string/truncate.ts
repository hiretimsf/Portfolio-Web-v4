/**
 * Truncates text to a maximum length with ellipsis
 */
export function truncate(text: string, maxLength: number = 160): string {
  return text.length > maxLength
    ? text.slice(0, maxLength - 3) + "..."
    : text;
}

/**
 * Truncates a title to a maximum length (default: 60 chars)
 * @deprecated Use truncate(text, 60) instead
 */
export function truncateTitle(title: string, maxLength: number = 60): string {
  return truncate(title, maxLength);
}

/**
 * Truncates a description to a maximum length (default: 160 chars)
 * @deprecated Use truncate(text, 160) instead
 */
export function truncateDescription(
  description: string,
  maxLength: number = 160,
): string {
  return truncate(description, maxLength);
}
