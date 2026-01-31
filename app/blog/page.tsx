import Contact from "@/components/layout/main/Contact";
import Title from "@/components/layout/main/Title";
import Divider from "@/components/Divider";
import { HEAD } from "@/lib/config";
import { getBaseUrl } from "@/lib/utils";
import type { HeadType } from "@/types";
import type { Metadata } from "next";
import { Suspense } from "react";
import BlogPostList from "@/features/blog/components/BlogPostList";
import Paging from "@/components/common/Paging";
import { getBlogPosts } from "@/features/blog/lib/blog.server";

// Validate SEO configuration to ensure all required fields are present
// This helps catch missing or incomplete SEO setup early
if (!HEAD || HEAD.length === 0) {
  console.error("⚠️ HEAD configuration is missing or empty");
}

// Define the current page for SEO configuration
const PAGE = "Blog";

// Get SEO configuration for the current page from the HEAD array
const page = HEAD.find((page: HeadType) => page.page === PAGE) as HeadType;

// Configure comprehensive metadata for SEO and social sharing
// This includes all necessary meta tags for search engines and social media platforms
export const metadata: Metadata = {
  // Basic metadata
  title: page?.title,
  applicationName: page?.title,
  description: page?.description,

  // URL configurations for canonical links and RSS feed
  metadataBase: new URL(getBaseUrl(page?.slug)),
  alternates: {
    canonical: getBaseUrl(page?.slug),
  },
};

const PAGE_SIZE = 6;

export default async function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Divider short={true} />
      <Title title="Blog" textStyleClassName="text-2xl font-bold sm:text-3xl" />
      <Divider plain={true} />
      <Suspense>
        <BlogPostList />
        <Divider short={true} />
        <Paging totalItems={posts.length} pageSize={PAGE_SIZE} />
      </Suspense>
      <Contact />
      <Divider short={true} borderBottom={false} />
    </>
  );
}
