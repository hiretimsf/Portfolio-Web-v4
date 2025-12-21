"use client";

import GitHubStars from "@/components/header/shared/GithubStars";
import { SOURCE_CODE_GITHUB_REPO } from "@/config/seo/site";
import { useEffect, useState } from "react";

export default function GithubButton() {
  const [stargazersCount, setStargazersCount] = useState(0);

  useEffect(() => {
    async function fetchStars() {
      // Don't fetch if repo is not properly configured
      if (!SOURCE_CODE_GITHUB_REPO || !SOURCE_CODE_GITHUB_REPO.includes("/")) {
        return;
      }

      try {
        const response = await fetch(
          `https://api.github.com/repos/${SOURCE_CODE_GITHUB_REPO}`,
          {
            // Add cache and error handling to prevent CORS/rate limit issues
            cache: "force-cache",
          },
        );
        if (response.ok) {
          const data = await response.json();
          setStargazersCount(data.stargazers_count || 0);
        } else if (response.status === 404) {
          // Repository doesn't exist - this is expected if not yet created
          // Silently fail to avoid console errors
          return;
        }
      } catch (error) {
        // Silently fail - GitHub API may be rate-limited or blocked
        // This is expected behavior and not a critical error
      }
    }
    fetchStars();
  }, []);

  return (
    <GitHubStars
      repo={SOURCE_CODE_GITHUB_REPO}
      stargazersCount={stargazersCount}
    />
  );
}
