import { Providers } from "@/components/Providers";
import ConsentManager from "@/components/ConsentManager";
import { AUTHOR, FAVICONS, HEAD, KEYWORDS, OPEN_GRAPH } from "@/config/seo";
import { SITE_INFO } from "@/config/seo/site";
import { META_THEME_COLORS } from "@/config/theme";
import { fontMono, fontSans } from "@/lib/fonts";
import { getBaseUrl } from "@/lib/helpers";
import type { HeadType } from "@/types";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { WebSite, WithContext } from "schema-dts";
import "@/styles/globals.css";


// Type definitions
interface RootLayoutProps {
  children: React.ReactNode;
}

// Generates JSON-LD structured data for the website
function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    alternateName: [SITE_INFO.alternateName],
  };
}

// Script to handle initial theme state and macOS detection to prevent flashing of the wrong theme.
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

// Constants
const CURRENT_PAGE = "Home"; // Define the current page for SEO configuration

// SEO configuration
const currentPageSEO = HEAD.find(
  (page: HeadType) => page.page === CURRENT_PAGE,
) as HeadType; // Get SEO configuration for the current page from the HEAD array

// Utility functions
const validateSEOConfig = () => {
  // Validates SEO configuration to ensure all required fields are present
  if (!HEAD || HEAD.length === 0) {
    console.error("⚠️ HEAD configuration is missing or empty");
  }
  if (!KEYWORDS || KEYWORDS.length === 0) {
    console.warn("🔍 No keywords defined for SEO");
  }
  if (!AUTHOR?.name) {
    console.error("❌ Author information is missing");
  }
  if (!FAVICONS?.icon || FAVICONS.icon.length === 0) {
    console.warn("🖼️ No favicons configured");
  }
  if (!OPEN_GRAPH) {
    console.error("📱 OpenGraph configuration is missing");
  } else if (!OPEN_GRAPH.image || !OPEN_GRAPH.twitterImage) {
    console.warn("📱 OpenGraph images are missing");
  }
};

// Initialize SEO validation
if (process.env.NODE_ENV === "development") {
  validateSEOConfig();
}

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: META_THEME_COLORS.light,
};

// Metadata configuration
export const metadata: Metadata = {
  // Basic metadata
  title: currentPageSEO?.title,
  generator: AUTHOR.name,
  applicationName: currentPageSEO?.title,
  description: currentPageSEO?.description,
  referrer: "origin-when-cross-origin",
  keywords: (KEYWORDS ?? []).join(", "),

  // Author information
  authors: [
    {
      name: AUTHOR.name,
      url: AUTHOR.twitterUrl,
    },
  ],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,

  // URL configurations
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    canonical: getBaseUrl(),
    types: {
      "application/rss+xml": `${getBaseUrl("/rss.xml")}`,
    },
    languages: {
      "en-US": getBaseUrl(),
      "x-default": getBaseUrl(),
    },
  },

  // Apple web app configuration
  appleWebApp: {
    title: currentPageSEO?.title ?? "",
    statusBarStyle: "default",
    capable: true,
  },

  // Search engine configuration
  robots: {
    index: true,
    follow: true,
  },

  // Favicon configuration
  icons: FAVICONS,

  // OpenGraph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en",
    url: getBaseUrl(),
    title: currentPageSEO?.title,
    description: currentPageSEO?.description,
    siteName: currentPageSEO?.title,
    images: [
      {
        url: OPEN_GRAPH.image,
        width: 1200,
        height: 630,
        alt: currentPageSEO?.title ?? "",
        type: "image/png",
      },
    ],
  },

  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: currentPageSEO?.title,
    description: currentPageSEO?.description,
    site: AUTHOR.twitterAddress,
    images: [
      {
        url: OPEN_GRAPH.twitterImage,
        width: 1200,
        height: 675,
        alt: currentPageSEO?.title,
        type: "image/png",
      },
    ],
    creator: AUTHOR.twitterAddress,
  },
};

// Root layout component
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="text/javascript"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Injecting script for theme handling
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Injecting JSON-LD for SEO
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <Providers>
          <NuqsAdapter>
            <ConsentManager>{children}</ConsentManager>
          </NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
