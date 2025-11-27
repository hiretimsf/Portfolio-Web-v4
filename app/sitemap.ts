import type { MetadataRoute } from "next";
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
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: getBaseUrl("/projects"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }
  ];

  return [...staticPages];
}
