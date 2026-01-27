type BlogPostType = {
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
  body: React.ComponentType<object>;
  content: string;
  readingTime: string;
  readingTimeMinutes: number;
  slug: string;
};

export type { BlogPostType };
