import Contact from "@/components/layout/main/Contact";
import { DocsLayout } from "@/components/fuma/DocsLayout";
import { DocsBody, DocsPage } from "@/components/fuma/DocsPage";
import Title from "@/components/layout/main/Title";
import LastModified from "@/components/common/LastModified";
import Divider from "@/components/Divider";
import { HEAD } from "@/lib/config";
import { getBaseUrl } from "@/lib/utils";
import { getMDXComponents } from "@/mdx-components";
import type { HeadType } from "@/types";
import type { TableOfContents } from "fumadocs-core/toc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { educationSource } from "@/features/education/data/educationSource";
import CornerDecorations from "@/components/common/CornerDecorations";

// Validate SEO configuration to ensure all required fields are present
// This helps catch missing or incomplete SEO setup early
if (!HEAD || HEAD.length === 0) {
  console.error("⚠️ HEAD configuration is missing or empty");
}

// Define the current page for SEO configuration
const PAGE = "Education";

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

export default async function EducationPage() {
  const page = educationSource.getPage(["education"]);
  if (!page) notFound();

  const pageData = page.data as MDXPageData;
  const MDX = pageData.body;
  const title = pageData.title;

  return (
    <>
      <Divider short={true}/>
      <main className="mx-auto flex flex-col">
        <Title
          title={title ?? "Education"}
          textStyleClassName="text-3xl font-semibold md:text-4xl"
          gridId="grid-education"
        />
        <Divider plain={true} />
        <div className="border-border relative min-h-52 max-w-full">
          <CornerDecorations bottom={true}/>
          <DocsLayout
            tree={educationSource.pageTree}
            containerProps={{ className: "relative bg-transparent" }}
          >
            <DocsPage toc={pageData.toc} prose={false}>
              <DocsBody prose={false}>
                <MDX code={MDX} components={{ ...getMDXComponents() }} />
              </DocsBody>
            </DocsPage>
          </DocsLayout>
        </div>
      </main>
      <Divider short={true}/>
      <LastModified
        lastModified={pageData.lastModified ?? new Date().toISOString()}
      />
      <Divider short={true}/>
      <Contact />
      <Divider short={true} borderBottom={false}/>
    </>
  );
}
