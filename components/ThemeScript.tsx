"use client";

import { META_THEME_COLORS } from "@/config/theme";
import Script from "next/script";

const darkModeScript = `
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`;

export function ThemeScript() {
  return (
    <>
      <script
        type="text/javascript"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Injecting script for theme handling
        dangerouslySetInnerHTML={{ __html: darkModeScript }}
      />
      <Script
        id="theme-detection"
        src={`data:text/javascript;base64,${btoa(darkModeScript)}`}
      />
    </>
  );
}
