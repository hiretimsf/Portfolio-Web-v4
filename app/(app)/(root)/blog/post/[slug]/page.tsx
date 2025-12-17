import ContactMe from "@/components/ContactMe";
import { DocsLayout } from "@/components/fuma/fuma-layout";
import { DocsBody, DocsPage } from "@/components/fuma/fuma-page";
import LastModified from "@/components/LastModified";
import SeparatorHorizontal from "@/components/SeparatorHorizontal";
import BlogPostDetailHeader from "@/features/blog/components/BlogPostHeader";
import BlogPostNavigation from "@/features/blog/components/BlogPostNavigation";
import { blogSource, getBlogPosts } from "@/features/blog/data/blogSource";
import type { BlogPostFrontmatter } from "@/features/blog/types/BlogPostFrontmatter";
import { getBaseUrl } from "@/lib/helpers";
import { getMDXComponents } from "@/mdx-components";
import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogSource.getPage([slug]);
  if (!post) {
    return notFound();
  }
  const data = post.data as unknown as BlogPostFrontmatter;

  return {
    title: data.title || "Blog Post",
    description:
      data.description?.slice(0, 100) + ("..." as string) ||
      "Read this insightful blog post.",
    keywords: data.seo?.join(", ") || "blog, mdx, next.js",
    alternates: {
      canonical: getBaseUrl(`blog/post/${slug}`),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: data.title,
      description: data.description?.slice(0, 100) + ("..." as string),
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
          alt: data.title,
          type: "image/png",
        },
      ],
      type: "article",
      url: getBaseUrl(`blog/post/${slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description?.slice(0, 100) + ("..." as string),
      images: data.image ? [data.image] : undefined,
    },
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const posts = getBlogPosts().sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  );
  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];
  const page = blogSource.getPage([slug]);

  if (!post || !page) {
    return notFound();
  }

  const nextPost = posts[postIndex - 1]; // Newer
  const prevPost = posts[postIndex + 1]; // Older

  const authorImage = post.authorAvatar ?? "";
  const authorName = post.author ?? "Tim Baz";
  const date = post.created;
  const category = post.category ?? "General";
  const readTime = post.readingTimeMinutes;

  const MDXContent = post.body as React.FC<{ components: MDXComponents }>;

  // Remove the body function from the post object to avoid serialization errors
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body: _body, ...postWithoutBody } = post;

  const prevPostWithoutBody = prevPost
    ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ body: _b, ...rest }) => rest)(prevPost)
    : undefined;

  const nextPostWithoutBody = nextPost
    ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ body: _b, ...rest }) => rest)(nextPost)
    : undefined;

  return (
    <>
      <SeparatorHorizontal borderTop={false} />
      <main className="mx-auto flex flex-col">
        <BlogPostNavigation
          post={postWithoutBody}
          previous={prevPostWithoutBody}
          next={nextPostWithoutBody}
        />
        <BlogPostDetailHeader
          title={post.title}
          date={date}
          authorImage={authorImage}
          authorName={authorName}
          category={category}
          readTime={readTime}
          imageUrl={post.image}
        />
        <div className="mx-auto w-full max-w-5xl">
          <DocsLayout tree={blogSource.pageTree}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <DocsPage toc={(page.data as any).toc ?? []}>
              <DocsBody>
                <MDXContent components={getMDXComponents()} />
              </DocsBody>
            </DocsPage>
          </DocsLayout>
        </div>
      </main>
      <SeparatorHorizontal short={true} />
      <LastModified
        lastModified={post.lastUpdated ?? new Date().toISOString()}
      />
      <SeparatorHorizontal short={true} />
      <ContactMe />
      <SeparatorHorizontal borderBottom={false} />
    </>
  );
}
