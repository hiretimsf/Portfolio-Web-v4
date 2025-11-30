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

/**
 * Truncates text to max length with ellipsis
 */
export function truncateText(text: string, maxLength = 40): string {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

/**
 * Truncates title to max length with ellipsis
 */
export function truncateTitle(title: string, maxLength = 60): string {
  return title.length > maxLength
    ? `${title.slice(0, maxLength - 3)}...`
    : title;
}

/**
 * Truncates description to max length with ellipsis
 */
export function truncateDescription(
  description: string,
  maxLength = 160,
): string {
  return description.length > maxLength
    ? `${description.slice(0, maxLength - 3)}...`
    : description;
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
