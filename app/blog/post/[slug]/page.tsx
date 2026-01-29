import Contact from "@/components/layout/main/Contact";
import { DocsLayout } from "@/components/fuma/DocsLayout";
import { DocsBody, DocsPage } from "@/components/fuma/DocsPage";
import LastModified from "@/components/common/LastModified";
import ImageWithLoader from "@/components/common/ImageWithLoader";
import Divider from "@/components/Divider";
import { SITE_INFO, USER } from "@/lib/config";
import BlogPostMetaData from "@/features/blog/components/BlogPostMetaData";
import BlogPostNavigation from "@/features/blog/components/BlogPostNavigation";
import BlogPostTitle from "@/features/blog/components/BlogPostTitle";
import { blogSource } from "@/features/blog/data/blogSource";
import { getBlogPosts } from "@/features/blog/lib/blog.server";
import type { BlogPostFrontmatter } from "@/features/blog/types/BlogPostFrontmatter";
import type { BlogPostType } from "@/features/blog/types/BlogPostType";
import { getBaseUrl } from "@/lib/utils";
import { getMDXComponents } from "@/mdx-components";
import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { BlogPosting, WithContext } from "schema-dts";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getPageJsonLd(post: BlogPostType): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image || `/og/simple?title=${encodeURIComponent(post.title)}`,
    url: `${SITE_INFO.url}/blog/post/${post.slug}`,
    datePublished: new Date(post.created).toISOString(),
    dateModified: new Date(post.lastUpdated || post.created).toISOString(),
    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />
      <Divider />
      <main className="mx-auto flex flex-col">
        <BlogPostNavigation
          post={postWithoutBody}
          previous={prevPostWithoutBody}
          next={nextPostWithoutBody}
        />
        <Divider plain={true} />
        <ImageWithLoader
          alt={post.title}
          src={post.image}
          width={1000}
          height={500}
          className="h-auto max-h-96 w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1000px"
          priority
        />
        <Divider plain={true} />
        <BlogPostMetaData
          authorImage={authorImage}
          authorName={authorName}
          date={date}
          category={category}
          readTime={readTime}
          comments={0}
          views={0}
        />
        <Divider plain={true} />
        <BlogPostTitle
          title={post.title}
          textStyleClassName="text-2xl font-semibold md:text-3xl"
          gridId="grid-blog-post-heading"
        />
        <Divider plain={true} />
        <div className="mx-auto w-full max-w-5xl">
          <DocsLayout tree={blogSource.pageTree}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <DocsPage toc={(page.data as any).toc ?? []}>
              <DocsBody prose={false}>
                <MDXContent components={getMDXComponents()} />
              </DocsBody>
            </DocsPage>
          </DocsLayout>
        </div>
      </main>
      <Divider plain={true} />
      <LastModified
        lastModified={post.lastUpdated ?? new Date().toISOString()}
      />
      <Divider plain={true} />
      <Contact />
      <Divider borderBottom={false} />
    </>
  );
}
