"use server";

import { getPostsBySearchQuery } from "@/features/blog/lib/blog.server";
import type { SearchResult } from "@/types/search";

export async function searchPosts(query: string): Promise<SearchResult[]> {
  if (!query || typeof query !== "string") {
    throw new Error("Query parameter is required");
  }

  const searchResults = await getPostsBySearchQuery(query);
  // Return a plain object to avoid serialization issues with server actions
  return JSON.parse(JSON.stringify(searchResults));
}
