import Contact from "@/components/layout/main/Contact";
import { DocsLayout } from "@/components/fuma/DocsLayout";
import { DocsBody, DocsPage } from "@/components/fuma/DocsPage";
import Title from "@/components/layout/main/Title";
import Divider from "@/components/Divider";
import { HEAD } from "@/lib/config";
import { aboutSource } from "@/features/about/data/source";
import { getBaseUrl } from "@/lib/utils";
import { getMDXComponents } from "@/mdx-components";
import type { HeadType } from "@/types";
import type { TableOfContents } from "fumadocs-core/toc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import Web from "@/features/about/components/Web";
import LastModified from "@/components/common/LastModified";
import ImageWithLoader from "@/components/common/ImageWithLoader";

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
  imageUrlDesktop?: string;
  imageUrlMobile?: string;
  imageAlt?: string;
  lastModified?: string | number | Date;
};

export default async function AboutMePage() {
  const page = aboutSource.getPage(["about"]);
  if (!page) notFound();

  const pageData = page.data as MDXPageData;
  const MDX = pageData.body;
  const title = pageData.title;
  const defaultImage = "/images/horizontal-profile-about.jpg";
  const imageUrlDesktop =
    pageData.imageUrlDesktop ?? pageData.imageUrl ?? defaultImage;
  const imageUrlMobile =
    pageData.imageUrlMobile ?? pageData.imageUrl ?? defaultImage;
  const imageAlt =
    pageData.imageAlt ??
    "Professional headshot of Tim, a Frontend Developer with 5 years of experience";

  return (
    <>
      <Divider />
      <main className="mx-auto flex flex-col">
        <div className="relative">
          {/* Mobile Image */}
          <div className="md:hidden">
            <ImageWithLoader
              alt={imageAlt}
              src={imageUrlMobile}
              width={1000}
              height={750}
              className="aspect-4/3 w-full object-cover"
              sizes="100vw"
              priority
            />
          </div>
          {/* Desktop Image */}
          <div className="hidden md:block">
            <ImageWithLoader
              alt={imageAlt}
              src={imageUrlDesktop}
              width={1000}
              height={500}
              className="w-full object-cover md:h-auto md:max-h-96"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <Divider plain={true} />
        <Title
          title={title ?? "Hello, I'm Tim"}
          textStyleClassName="text-3xl font-semibold md:text-4xl"
          gridId="grid-about"
        />
        <Divider plain={true} />
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
      <Divider plain={true} />
      <LastModified
        lastModified={pageData.lastModified ?? new Date().toISOString()}
      />
      <Divider plain={true} />
      <Contact />
      <Divider borderBottom={false} />
    </>
  );
}
