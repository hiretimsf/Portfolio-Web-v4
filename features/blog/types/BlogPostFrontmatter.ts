import type { TOCItemType } from "fumadocs-core/toc";

type BlogPostFrontmatter = {
  title: string;
  description: string;
  created: string;
  lastUpdated?: string;
  image: string;
  thumbnail?: string;
  imageAlt?: string;
  author?: string;
  authorAvatar?: string;
  authorAvatarAlt?: string;
  category?: string;
  tags?: string[];
  seo?: string[];
  toc?: TOCItemType[];
};

export type { BlogPostFrontmatter };
