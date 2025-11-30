"use client";

import { SOURCE_CODE_GITHUB_REPO } from "@/config/seo/site";
import GitHubStars from "@/components/header/components/shared/GithubStars";
import { useEffect, useState } from "react";

export default function GithubButton() {
  const [stargazersCount, setStargazersCount] = useState(0);

  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${SOURCE_CODE_GITHUB_REPO}`,
        );
        if (response.ok) {
          const data = await response.json();
          setStargazersCount(data.stargazers_count || 0);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stars", error);
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
