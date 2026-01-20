import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { Person, WebSite, WithContext } from "schema-dts";

import ConsentManager from "@/components/ConsentManager";
import { Providers } from "@/components/Providers";
import { SkipToMain } from "@/components/SkipToMain";
import { AUTHOR, FAVICONS, HEAD, KEYWORDS, OPEN_GRAPH } from "@/config/seo";
import { SITE_INFO } from "@/config/seo/site";
import { META_THEME_COLORS } from "@/config/theme";
import { ThemeScript } from "@/components/ThemeScript";
import { fontMono, fontSans } from "@/lib/fonts";
import { getBaseUrl } from "@/lib/helpers";
import type { HeadType } from "@/types";

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

// Generates JSON-LD structured data for the person/professional
function getPersonJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    url: SITE_INFO.url,
    image: OPEN_GRAPH.image,
    jobTitle: "Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and modern web technologies",
    sameAs: [AUTHOR.twitterUrl, AUTHOR.githubUrl].filter(Boolean),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Web Development",
      "Frontend Development",
    ],
  };
}


// Constants
const CURRENT_PAGE = "Home"; // Define the current page for SEO configuration

// SEO configuration
const currentPageSEO = HEAD.find(
  (page: HeadType) => page.page === CURRENT_PAGE,
) as HeadType; // Get SEO configuration for the current page from the HEAD array

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
        <ThemeScript />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Injecting JSON-LD for SEO
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Injecting JSON-LD for SEO
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9FGZ2QWHX7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9FGZ2QWHX7');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <SkipToMain />
        <Providers>
          <NuqsAdapter>
            <ConsentManager>{children}</ConsentManager>
          </NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
