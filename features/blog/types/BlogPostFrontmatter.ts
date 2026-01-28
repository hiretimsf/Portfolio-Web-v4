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
};

export type { BlogPostFrontmatter };
