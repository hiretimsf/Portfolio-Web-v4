"use server";

import { cache } from "react";

interface GitHubRepoResponse {
  stargazers_count: number;
}

// One day in seconds: 24 hours * 60 minutes * 60 seconds
const TWO_HOURS = 2 * 60 * 60;

const fetchGitHubStars = cache(
  async (owner: string, repo: string): Promise<number> => {
    const url = `https://api.github.com/repos/${owner}/${repo}`;

    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: TWO_HOURS },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API Error:", errorText);
      throw new Error("GitHub API request failed");
    }

    const data: GitHubRepoResponse = await response.json();
    return data.stargazers_count;
  },
);

export async function getGitHubStars(owner: string, repo: string) {
  if (!repo || !owner) {
    throw new Error("Owner and Repository are required");
  }

  try {
    const stars = await fetchGitHubStars(owner, repo);
    return { stars };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(errorMessage);
    return { stars: 0 }; // Return 0 on error to avoid crashing UI
  }
}
