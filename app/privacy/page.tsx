import Contact from "@/components/layout/main/Contact";
import { DocsLayout } from "@/components/fuma/DocsLayout";
import { DocsBody, DocsPage } from "@/components/fuma/DocsPage";
import Title from "@/components/layout/main/Title";
import Divider from "@/components/Divider";
import { HEAD } from "@/lib/config";
import { privacySource } from "@/features/privacy/data/privacySource";
import { getBaseUrl } from "@/lib/utils";
import { getMDXComponents } from "@/mdx-components";
import type { HeadType } from "@/types";
import type { TableOfContents } from "fumadocs-core/toc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import LastModified from "@/components/common/LastModified";


// Validate SEO configuration to ensure all required fields are present
// This helps catch missing or incomplete SEO setup early
if (!HEAD || HEAD.length === 0) {
  console.error("⚠️ HEAD configuration is missing or empty");
}

// Define the current page for SEO configuration
const PAGE = "Privacy";

// Get SEO configuration for the current page from the HEAD array
const page = HEAD.find((page: HeadType) => page.page === PAGE) as HeadType;

// Configure comprehensive metadata for SEO and social sharing
// This includes all necessary meta tags for search engines and social media platforms
export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    canonical: getBaseUrl(page.slug),
  },
  openGraph: {
    title: page.title,
    description: page.description,
    url: getBaseUrl(page.slug),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
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

export default async function PrivacyPage() {
  const page = privacySource.getPage(["privacy"]);
  if (!page) notFound();

  const pageData = page.data as MDXPageData;
  const MDX = pageData.body;
  const title = pageData.title;

  return (
    <>
      <Divider short={true}/>
      <main className="mx-auto flex flex-col">
        <Title
          title={title ?? "Privacy Policy"}
          textStyleClassName="text-3xl font-semibold md:text-4xl"
          gridId="grid-privacy"
        />
        <Divider plain={true} />
        <div className="border-border relative min-h-52 max-w-full">

          <DocsLayout
            tree={privacySource.pageTree}
            containerProps={{ className: "relative bg-transparent" }}
          >
            <DocsPage toc={pageData.toc}>
              <DocsBody prose={false}>
                <MDX code={MDX} components={{ ...getMDXComponents() }} />
              </DocsBody>
            </DocsPage>
          </DocsLayout>
        </div>
      </main>
      <Divider short={true} />
      <LastModified
        lastModified={pageData.lastModified ?? new Date().toISOString()}
      />
      <Divider short={true} />
      <Contact />
      <Divider short={true} borderBottom={false} />
    </>
  );
}
