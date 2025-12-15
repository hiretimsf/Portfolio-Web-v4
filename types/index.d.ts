import type * as React from "react";

export interface HeadType {
  page: string;
  title: string;
  description: string;
  slug: string;
}

export type Heading = {
  text: string;
  slug: string;
  depth: number;
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
export type TechStackType = {
  key: string;
  title: string;
  href: string;
  categories: string[];
  theme?: boolean;
};

export type User = {
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  gender: string;
  pronouns: string;
  bio: string;
  flipSentences: string[];
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
  jobTitle: string;
  jobs: {
    title: string;
    company: string;
    website: string;
  }[];
  about: string;
  avatar: string;
  ogImage: string;
  namePronunciationUrl: string;
  keywords: string[];
  timeZone: string;
  dateCreated: string;
};

export type LinkItem = {
  href?: string;
  target?: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  ariaLabel: string;
};
