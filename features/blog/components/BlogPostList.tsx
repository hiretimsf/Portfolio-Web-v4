import { getBlogPosts } from "@/features/blog/lib/blog.server";
import BackgroundDots from "@/components/common/BackgroundDots";

import PaginatedBlogGrid from "@/features/blog/components/PaginatedBlogGrid";
import type { BlogPostType } from "@/features/blog/types/BlogPostType";

function withoutBody(post: BlogPostType): Omit<BlogPostType, "body"> {
  const clone = { ...post };
  delete (clone as { body?: unknown }).body;
  return clone;
}

export default function BlogPostList() {
  const posts = getBlogPosts()
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    )
    .map(withoutBody);

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-8">

      <BackgroundDots gridId="blog-posts" className="text-gray-200/80" />
      <PaginatedBlogGrid posts={posts} />
    </div>
  );
}
