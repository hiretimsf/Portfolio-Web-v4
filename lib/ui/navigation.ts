/**
 * Determines if a navigation link is active based on the current pathname
 */
export function isActive(
  url: string,
  pathname: string,
  nested: boolean = true,
): boolean {
  if (url === pathname) return true;
  if (!nested) return false;
  return pathname.startsWith(url + "/");
}
