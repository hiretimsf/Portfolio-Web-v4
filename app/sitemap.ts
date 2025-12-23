import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/features/blog/data/blogSource";
import { getBaseUrl } from "@/lib/helpers";

export default function sitemap(): MetadataRoute.Sitemap {
  // Define static pages with their configurations
  const staticPages = [
    {
      url: getBaseUrl(),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0, // Homepage gets highest priority
    },
    {
      url: getBaseUrl("/about"),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: getBaseUrl("/experience"),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: getBaseUrl("/education"),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: getBaseUrl("/projects"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: getBaseUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: getBaseUrl("/contact"),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: getBaseUrl("/llms.txt"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: getBaseUrl("/llms-full.txt"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: getBaseUrl("/rss.xml"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: getBaseUrl("/sitemap.xml"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: getBaseUrl("/robots.txt"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: getBaseUrl("/privacy"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: getBaseUrl("/changelog"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  const blogPosts = getBlogPosts().map((post) => ({
    url: getBaseUrl(`/blog/post/${post.slug}`),
    lastModified: post.lastUpdated
      ? new Date(post.lastUpdated)
      : new Date(post.created || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPosts];
}
