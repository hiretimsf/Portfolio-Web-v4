import { getBlogPosts } from "@/features/blog/data/blogSource";
import type { BlogPostType } from "@/features/blog/types/BlogPostType";
import { levenshtein } from "./helpers";

export type SerializableBlogPostType = Omit<BlogPostType, "body">;

export interface SearchResult extends SerializableBlogPostType {
  score: number;
}

/**
 * Function to get all posts by search query.
 * @param query - The search query.
 * @returns An array of search results.
 */
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

    // Calculate score based on different factors
    searchWords.forEach((word) => {
      // Exact matches get highest score
      if (searchableContent.title.includes(word)) {
        score += 10;
      }
      if (searchableContent.fileName.includes(word)) {
        score += 8;
      }
      if (searchableContent.description.includes(word)) {
        score += 6;
      }
      if (searchableContent.content.includes(word)) {
        score += 4;
      }

      // Fuzzy matches get lower scores
      const fuzzyThreshold = 2; // Maximum Levenshtein distance for fuzzy matching

      // Check fuzzy matches in title
      if (
        searchableContent.title
          .split(/\s+/)
          .some((term) => levenshtein(term, word) <= fuzzyThreshold)
      ) {
        score += 5;
      }

      // Check fuzzy matches in content
      if (
        searchableContent.content
          .split(/\s+/)
          .some((term) => levenshtein(term, word) <= fuzzyThreshold)
      ) {
        score += 2;
      }
    });

    // Only include results with a minimum score
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

  // Sort results by score in descending order
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Function to get the context around the best match of the query in the content.
 * @param content - The content to search within.
 * @param query - The search query.
 * @returns A string containing the context around the best match.
 */
export function getContextAroundMatch(content: string, query: string) {
  if (!content || !query.trim()) return content;

  const searchWords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (searchWords.length === 0) return content;

  const windowSize = 150;
  let bestScore = 0;
  let bestStart = 0;

  // Iterate over the content in steps of 50 characters
  for (let i = 0; i < content.length - windowSize; i += 50) {
    const window = content.slice(i, i + windowSize).toLowerCase();
    let score = 0;

    // Calculate score for the current window
    searchWords.forEach((word) => {
      // Exact matches get higher scores
      const exactMatches = window.split(word).length - 1;
      score += exactMatches * word.length * 2;

      // Fuzzy matches get lower scores
      const fuzzyThreshold = 2;
      window.split(/\s+/).forEach((term) => {
        if (levenshtein(term, word) <= fuzzyThreshold) {
          score += word.length;
        }
      });
    });

    if (score > bestScore) {
      bestScore = score;
      bestStart = i;
    }
  }

  const contextStart = Math.max(0, bestStart - 50);
  const contextEnd = Math.min(content.length, bestStart + windowSize);

  let excerpt = content.slice(contextStart, contextEnd).trim();

  if (contextStart > 0) excerpt = "..." + excerpt;
  if (contextEnd < content.length) excerpt = excerpt + "...";

  return excerpt;
}
