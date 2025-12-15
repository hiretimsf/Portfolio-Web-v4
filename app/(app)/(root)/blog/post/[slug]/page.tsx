import { DocsLayout } from "@/components/fuma/fuma-layout";
import { DocsBody, DocsPage } from "@/components/fuma/fuma-page";
import BlogPostHeading from "@/features/blog/components/heading/blog-post-heading";
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
  const post = getBlogPosts().find((p) => p.slug === slug);
  const page = blogSource.getPage([slug]);

  if (!post || !page) {
    return notFound();
  }

  const MDXContent = post.body as React.FC<{ components: MDXComponents }>;

  return (
    <>
      <BlogPostHeading
        title={post.title}
        description={post.description}
        date={post.created}
        authorImage={post.authorAvatar || ""}
        authorName={post.author || ""}
        category={post.category || ""}
        readTime={post.readingTimeMinutes}
        imageUrl={post.image}
      />

      <div className="border-border bg-background relative border-t">
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
      </div>
    </>
  );
}
