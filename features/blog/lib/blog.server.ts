import fs from "fs";
import path from "path";
import readingTime from "reading-time";
import { blogSource } from "@/features/blog/data/blogSource";
import type { BlogPostType } from "@/features/blog/types/BlogPostType";
import type { BlogPostFrontmatter } from "@/features/blog/types/BlogPostFrontmatter";
import type { SearchResult } from "@/types/search";
import { getContextAroundMatch, levenshtein } from "@/lib/utils";

type BlogPage = ReturnType<typeof blogSource.getPages>[number];

export function getBlogPosts(): BlogPostType[] {
  return blogSource.getPages().map((page) => {
    const data = page.data as unknown as BlogPostFrontmatter & {
      body: React.ComponentType<object>;
    };

    const pageWithFile = page as BlogPage & { file: { path: string } };
    const slug = page.slugs.join("/");

    let filePath = "";
    if (pageWithFile.file?.path) {
      filePath = path.join(
        process.cwd(),
        "features/blog/content",
        pageWithFile.file.path,
      );
    } else if (slug) {
      filePath = path.join(
        process.cwd(),
        "features/blog/content",
        `${slug}.mdx`,
      );
    }

    if (!filePath || (filePath && !fs.existsSync(filePath))) {
      return {
        title: data.title,
        description: data.description,
        created: data.created,
        lastUpdated: data.lastUpdated,
        image: data.image,
        author: data.author,
        authorAvatar: data.authorAvatar,
        category: data.category,
        tags: data.tags,
        seo: data.seo,
        body: () => null,
        content: "",
        readingTime: "",
        readingTimeMinutes: 0,
        slug,
      };
    }

    const contentStr = fs.readFileSync(filePath, "utf-8");
    const readingTimeStats = readingTime(contentStr);

    return {
      title: data.title,
      description: data.description,
      created: data.created,
      lastUpdated: data.lastUpdated,
      image: data.image,
      author: data.author,
      authorAvatar: data.authorAvatar,
      category: data.category,
      tags: data.tags,
      seo: data.seo,
      body: data.body,
      content: contentStr,
      readingTime: readingTimeStats.text,
      readingTimeMinutes: Math.round(readingTimeStats.minutes),
      slug,
    };
  });
}

export async function getPostsBySearchQuery(query: string) {
  if (!query.trim()) return [];

  const searchQuery = query.toLowerCase().trim();
  const searchWords = searchQuery.split(/\s+/).filter(Boolean);
  const results: SearchResult[] = [];

  for (const post of getBlogPosts()) {
    let score = 0;
    const searchableContent = {
      title: post.title.toLowerCase(),
      description: post.description.toLowerCase(),
      content: post.content.toLowerCase(),
      fileName: post.slug.toLowerCase(),
    };

    searchWords.forEach((word) => {
      // Exact weighted matches
      if (searchableContent.title.includes(word)) score += 10;
      if (searchableContent.fileName.includes(word)) score += 8;
      if (searchableContent.description.includes(word)) score += 6;
      if (searchableContent.content.includes(word)) score += 4;

      // Fuzzy matches
      const fuzzyThreshold = 2;
      if (
        searchableContent.title
          .split(/\s+/)
          .some((term) => levenshtein(term, word) <= fuzzyThreshold)
      ) {
        score += 5;
      }

      if (
        searchableContent.content
          .split(/\s+/)
          .some((term) => levenshtein(term, word) <= fuzzyThreshold)
      ) {
        score += 2;
      }
    });

    if (score > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { body, ...serializablePost } = post;
      results.push({
        ...serializablePost,
        content: getContextAroundMatch(post.content, searchQuery),
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
