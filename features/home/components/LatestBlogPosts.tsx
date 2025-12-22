import { getBlogPosts } from "@/features/blog/data/blogSource";
import BackgroundDots from "@/features/common/components/BackgroundDots";
import CardItem from "@/features/common/components/CardItem";
import { slugify } from "@/lib/helpers";

export default function LatestBlogPosts() {
  const blogPosts = getBlogPosts();
  const latestPosts = blogPosts
    .sort(
      (a, b) =>
        new Date(b.created ?? "").getTime() -
        new Date(a.created ?? "").getTime(),
    )
    .slice(0, 3);

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-8">
      <BackgroundDots gridId="latest-blog-posts" className="text-gray-200/80" />
      <div className="xl mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {latestPosts.map((post, index) => {
          const { body, ...postWithoutBody } = post;
          return (
            <CardItem
              key={slugify(post.title ?? "")}
              item={postWithoutBody}
              index={index}
              type="blog"
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 400px"
            />
          );
        })}
      </div>
    </div>
  );
}
