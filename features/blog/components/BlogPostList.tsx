import { getBlogPosts } from "@/features/blog/lib/blog.server";
import BackgroundDots from "@/components/common/BackgroundDots";
import CornerDecorations from "@/components/common/CornerDecorations";
import PaginatedBlogGrid from "@/features/blog/components/PaginatedBlogGrid";

export default function BlogPostList() {
  const posts = getBlogPosts()
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    )
    .map(({ body, ...postItem }) => postItem);

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-8">
      <CornerDecorations bottom={true} />
      <BackgroundDots gridId="blog-posts" className="text-gray-200/80" />
      <PaginatedBlogGrid posts={posts} />
    </div>
  );
}
