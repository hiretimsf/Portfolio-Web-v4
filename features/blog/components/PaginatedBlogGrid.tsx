"use client";

import BlogCardItem from "@/features/blog/components/BlogCardItem";
import { usePaging } from "@/components/common/Paging";
import type { BlogPostType } from "@/features/blog/types/BlogPostType";

const PAGE_SIZE = 6;

interface PaginatedBlogGridProps {
  posts: Omit<BlogPostType, "body">[];
}

export default function PaginatedBlogGrid({ posts }: PaginatedBlogGridProps) {
  const { startIndex, endIndex } = usePaging("page", PAGE_SIZE);
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <div className="xl mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {paginatedPosts.map((post, index) => (
        <BlogCardItem key={post.slug} index={index} item={post} />
      ))}
    </div>
  );
}
