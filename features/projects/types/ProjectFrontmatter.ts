type ProjectFrontmatter = {
  title: string;
  description: string;
  category?: string;
  fromDate: string;
  toDate: string;
  imageUrl?: string;
  imageAlt?: string;
  featured?: boolean;
  showOnPortfolio?: boolean;
  websiteUrl?: string;
  githubUrl?: string;
  videoEmbedUrl?: string;
  videoEmbedAlt?: string;
  techStacks?: string[];
  weight?: number;
  comingSoon?: boolean;
};

export type { ProjectFrontmatter };
