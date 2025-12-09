import type { ComponentType } from "react";

type BlogPostItemType = {
  title: string;
  description: string;
  created: string;
  lastUpdated?: string;
  image: string;
  imageAlt?: string;
  author?: string;
  authorAvatar?: string;
  authorAvatarAlt?: string;
  category?: string;
  tags?: string[];
  seo?: string[];
  content: ComponentType<any>;
  readingTime: string;
  readingTimeMinutes: number;
};

export type { BlogPostItemType };
