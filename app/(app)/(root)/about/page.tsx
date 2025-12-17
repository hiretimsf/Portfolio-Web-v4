import ContactMe from "@/components/ContactMe";
import { DocsLayout } from "@/components/fuma/fuma-layout";
import { DocsBody, DocsPage } from "@/components/fuma/fuma-page";
import Heading from "@/components/HeadingTitle";
import SeparatorHorizontal from "@/components/SeparatorHorizontal";
import HEAD from "@/config/seo/head";
import { aboutSource } from "@/features/about/data/aboutSource";
import { getBaseUrl } from "@/lib/helpers";
import { getMDXComponents } from "@/mdx-components";
import type { HeadType } from "@/types";
import type { TableOfContents } from "fumadocs-core/toc";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import Web from "@/features/about/components/Web";
import LastModified from "@/components/LastModified";

// Validate SEO configuration to ensure all required fields are present
// This helps catch missing or incomplete SEO setup early
if (!HEAD || HEAD.length === 0) {
  console.error("⚠️ HEAD configuration is missing or empty");
}

// Define the current page for SEO configuration
const PAGE = "About";

// Get SEO configuration for the current page from the HEAD array
const page = HEAD.find((page: HeadType) => page.page === PAGE) as HeadType;

// Configure comprehensive metadata for SEO and social sharing
// This includes all necessary meta tags for search engines and social media platforms
export const metadata: Metadata = {
  // Basic metadata
  title: page.title,
  applicationName: page.title,
  description: page.description,

  // URL configurations for canonical links and RSS feed
  metadataBase: new URL(getBaseUrl(page.slug)),
  alternates: {
    canonical: getBaseUrl(page.slug),
  },
};

type MDXPageData = {
  body: ComponentType<{ code: unknown; components?: unknown }>;
  toc?: TableOfContents;
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  lastModified?: string | number | Date;
};

export default async function AboutMePage() {
  const page = aboutSource.getPage(["about"]);
  if (!page) notFound();

  const pageData = page.data as MDXPageData;
  const MDX = pageData.body;
  const title = pageData.title;
  const imageUrl = pageData.imageUrl ?? "/images/horizontal-profile-about.jpg";
  const imageAlt =
    pageData.imageAlt ??
    "Professional headshot of Tim, a Frontend Developer with 5 years of experience";

  return (
    <>
      <SeparatorHorizontal borderTop={false} />
      <main className="mx-auto flex flex-col">
        <div className="relative">
          <Image
            alt={imageAlt}
            src={imageUrl}
            width={1000}
            height={500}
            className="w-full object-cover aspect-4/3 md:aspect-auto md:h-auto md:max-h-96"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1000px"
          />
        </div>
        <SeparatorHorizontal short={true} />
        <Heading
          title={title ?? "Hello, I'm Tim"}
          textStyleClassName="text-3xl font-semibold md:text-4xl"
          gridId="grid-about"
        />
        <SeparatorHorizontal short={true} />
        <div className="border-border relative min-h-52 max-w-full">
          <DocsLayout
            tree={aboutSource.pageTree}
            containerProps={{ className: "relative bg-transparent" }}
          >
            <DocsPage toc={pageData.toc}>
              <DocsBody prose={false}>
                <MDX code={MDX} components={{ ...getMDXComponents(), Web }} />
              </DocsBody>
            </DocsPage>
          </DocsLayout>
        </div>
      </main>
      <SeparatorHorizontal short={true} />
      <LastModified
        lastModified={pageData.lastModified ?? new Date().toISOString()}
      />
      <SeparatorHorizontal short={true} />
      <ContactMe />
      <SeparatorHorizontal borderBottom={false} />
    </>
  );
}
