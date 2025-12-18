"use server";

import { getPostsBySearchQuery, type SearchResult } from "@/lib/search-server";

export type { SearchResult };

export async function searchPosts(query: string): Promise<SearchResult[]> {
  if (!query || typeof query !== "string") {
    throw new Error("Query parameter is required");
  }

  const searchResults = await getPostsBySearchQuery(query);
  return searchResults;
}
