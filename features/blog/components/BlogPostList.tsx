import { Effect } from "@/components/animate-ui/primitives/effects/effect";
import BackgroundDots from "@/components/BackgroundDots";
import { slugify } from "@/lib/helpers";
import { getBlogPosts } from "@/lib/source";
import CardItem from "@/components/CardItem";

export default function BlogPostList() {
  const posts = getBlogPosts().sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  );

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-8">
      <BackgroundDots gridId="blog-posts" className="text-gray-200/80" />
      <div className="xl mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post, index) => {
          return (
            <Effect
              key={slugify(post.title)}
              inView={true}
              inViewOnce={true}
              fade={true}
              slide={{ direction: "up", offset: 10 }}
              delay={index * 100}
            >
              <CardItem index={index} item={post} type="blog" />
            </Effect>
          );
        })}
      </div>
    </div>
  );
}
