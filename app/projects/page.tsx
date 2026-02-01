import Contact from "@/components/layout/main/Contact";
import Divider from "@/components/Divider";
import { HEAD } from "@/lib/config";
import ProjectList from "@/features/projects/components/ProjectList";
import { getBaseUrl } from "@/lib/utils";
import type { HeadType } from "@/types";
import type { Metadata } from "next";
import { Suspense } from "react";
import Title from "@/components/layout/main/Title";
import Paging from "@/components/common/Paging";
import { getProjects } from "@/features/projects/data/projectSource";

// Validate SEO configuration to ensure all required fields are present
// This helps catch missing or incomplete SEO setup early
if (!HEAD || HEAD.length === 0) {
  console.error("⚠️ HEAD configuration is missing or empty");
}

// Define the current page for SEO configuration
const PAGE = "Projects";

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

const PAGE_SIZE = 6;

export default async function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <Divider short={true}/>
      <Title title="Projects" />
      <Divider plain={true}/>
      <Suspense>
        <ProjectList />
        <Divider short={true}/>
        <Paging totalItems={projects.length} pageSize={PAGE_SIZE} />
      </Suspense>
      <Divider short={true}/>
      <Contact />
      <Divider short={true} borderBottom={false}/>
    </>
  );
}
