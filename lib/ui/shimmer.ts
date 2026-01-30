/**
 * Generates a shimmer SVG for image loading placeholder
 */
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop class="s-base" offset="20%" />
      <stop class="s-shine" offset="50%" />
      <stop class="s-base" offset="70%" />
    </linearGradient>
  </defs>
  <style>
    .base { fill: #f3f4f6; }
    .s-base { stop-color: #f3f4f6; }
    .s-shine { stop-color: #e5e7eb; }
    @media (prefers-color-scheme: dark) {
      .base { fill: #374151; }
      .s-base { stop-color: #374151; }
      .s-shine { stop-color: #4b5563; }
    }
  </style>
  <rect width="${w}" height="${h}" class="base" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`;

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
export function getShimmerDataUrl(w: number = 700, h: number = 475) {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
}
