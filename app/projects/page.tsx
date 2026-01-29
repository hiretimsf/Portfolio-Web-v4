import Contact from "@/components/layout/main/Contact";
import Divider from "@/components/Divider";
import { HEAD } from "@/lib/config";
import ProjectList from "@/features/projects/components/ProjectList";
import { getBaseUrl } from "@/lib/utils";
import type { HeadType } from "@/types";
import type { Metadata } from "next";
import Title from "@/components/layout/main/Title";

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

export default async function ProjectsPage() {
  return (
    <>
      <Divider short={true}/>
      <Title title="Projects" />
      <Divider plain={true}/>
      <ProjectList />
      <Divider short={true}/>
      <Contact />
      <Divider short={true} borderBottom={false}/>
    </>
  );
}
