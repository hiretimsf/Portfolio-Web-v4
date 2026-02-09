import { getBlogPosts } from "@/features/blog/lib/blog.server";
import Section from "@/components/layout/main/Section";
import BlogCardItem from "@/features/blog/components/BlogCardItem";
import { slugify } from "@/lib/utils";
import type { BlogPostType } from "@/features/blog/types/BlogPostType";

function withoutBody(post: BlogPostType): Omit<BlogPostType, "body"> {
  const clone = { ...post };
  delete (clone as { body?: unknown }).body;
  return clone;
}

export default function LatestBlogPostsSection() {
  const blogPosts = getBlogPosts();
  const latestPosts = blogPosts
    .sort(
      (a, b) =>
        new Date(b.created ?? "").getTime() -
        new Date(a.created ?? "").getTime(),
    )
    .slice(0, 3);

  return (
    <Section gridId="latest-blog-posts">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {latestPosts.map((post, index) => {
          return (
            <BlogCardItem
              key={slugify(post.title ?? "")}
              item={withoutBody(post)}
              index={index}
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 400px"
            />
          );
        })}
      </div>
    </Section>
  );
}
