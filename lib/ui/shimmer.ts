const COLORS = {
  light: { base: "#f3f4f6", shine: "#e5e7eb" },
  dark: { base: "#09090b", shine: "#18181b" },
} as const;

/**
 * Generates a shimmer SVG for image loading placeholder
 */
const shimmer = (w: number, h: number, theme: "light" | "dark" = "light") => {
  const { base, shine } = COLORS[theme];
  return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="${base}" offset="20%" />
      <stop stop-color="${shine}" offset="50%" />
      <stop stop-color="${base}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${base}" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`;
};

/**
 * Converts SVG to base64 data URL for use as image placeholder
 */
const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/**
 * Generates a shimmer data URL for Next.js Image placeholder
 */
export function getShimmerDataUrl(
  w: number = 700,
  h: number = 475,
  theme: "light" | "dark" = "light"
) {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h, theme))}`;
}
