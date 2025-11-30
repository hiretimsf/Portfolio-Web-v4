export interface HeadType {
  page: string;
  title: string;
  description: string;
  slug: string;
}

export interface NavigationLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
}

export type CategoryType = {
  name: string;
  slug: string;
  background?: React.ComponentType<{ className?: string }>;
  icon?: React.ComponentType<{ className?: string }>;
  bigIcon?: React.ComponentType<{ className?: string }>;
  description: string;
  weight: number;
};

export type NavigationLinkType = {
  href: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  subNavigationLinks?: NavigationLinkType[];
};

export type SocialLinkType = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

// This is return type of content-collections
export type ProjectLinkType = {
  order: number;
  title: string;
  category: string;
  created_at: string;
  image: string;
  featured: boolean;
  webUrl: string | null;
  youtubeUrl: string | null;
  githubUrl: string | null;
  mdx: string;
  content: string;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    path: string;
    extension: string;
  };
};

export type ProjectSubNavigationLinkType = {
  title: string;
  description: string;
  image?: string;
  href: string;
  icon?: IconType;
};
