import { z } from "zod";
import { getBaseUrl, truncateDescription, truncateTitle } from "@/lib/utils";
import type {
  HeadType,
  LinkItem,
  NavigationLinkType,
  SocialLinkType,
  TechStackType,
  User,
} from "@/types";
import { CopyrightIcon, FileTextIcon, LockIcon } from "lucide-react";
import {
  UserIcon as AboutMeIcon,
  ArchiveIcon as ArchiveIcon,
  RssIcon as BlogIcon,
  MailIcon as ContactIcon,
  GraduationCapIcon as EducationIcon,
  FileTextIcon as ExperienceIcon,
  HomeIcon,
} from "lucide-react";
import { FaStrava as StravaIcon } from "react-icons/fa";
import {
  FaEnvelope as EmailIcon,
  FaFacebook as FacebookIcon,
  FaGithub as GitHubIcon,
  FaLinkedin as LinkedInIcon,
  FaSitemap as SiteMapIcon,
  FaSquareRss as RSSIcon,
  FaXTwitter as XPlatformIcon,
} from "react-icons/fa6";
import { LuBrain as LLMsIcon } from "react-icons/lu";

// --- Theme ---
export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

// --- Site Info ---
export const SITE_INFO = {
  name: "Hire Tim",
  url: getBaseUrl(),
  alternateName: "Tumur Bazarragchaa",
};

export const GITHUB_REPO_OWNER = "hiretimsf";
export const GITHUB_REPO_NAME = "hiretimsf.com";
export const SOURCE_CODE_GITHUB_REPO = `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;
export const SOURCE_CODE_GITHUB_URL = `https://github.com/${SOURCE_CODE_GITHUB_REPO}`;

// --- Author ---
export const AUTHOR = {
  name: "Tim Baz",
  twitterUrl: "https://x.com/hiretimsf",
  twitterAddress: "@hiretimsf",
  githubUrl: "https://github.com/hiretimsf",
  email: "hiretimsf@gmail.com",
};

// --- User ---
export const USER: User = {
  firstName: "Tumur",
  lastName: "Bazarragchaa",
  displayName: "Tim",
  username: "hiretimsf",
  gender: "male",
  pronouns: "he/him",
  bio: "Frontend Developer based in San Francisco.",
  flipSentences: [
    "Frontend Developer",
    "Based in San Francisco",
    "Passionate about building high-quality web and mobile apps",
  ],
  address: "San Francisco, CA",
  phoneNumber: "", // E.164 format, base64 encoded
  email: "hiretimsf@gmail.com",
  website: "https://hiretimsf.com",
  jobTitle: "Frontend Developer",
  jobs: [
    {
      title: "Frontend Developer",
      company: "Personal Projects",
      website: "https://hiretimsf.com",
    },
  ],
  about: `
Hello! I am Tim, a Frontend Developer based in San Francisco.

I specialize in building high-quality web and mobile apps using modern technologies.

Connect with me to learn more about my work and projects!
`,
  avatar: "/images/home/horizontal-profile.jpg",
  ogImage: "/images/open-graph-image.jpg",
  namePronunciationUrl: "",
  timeZone: "America/Los_Angeles",
  keywords: [
    "Tumur Bazarragchaa",
    "Tim Baz",
    "Tumur",
    "Bazarragchaa",
    "Tim",
    "frontend",
    "developer",
    "hire",
    "san francisco",
    "javascript",
    "typescript",
    "kotlin",
    "jetpack compose",
    "node.js",
    "react",
    "next.js",
    "supabase",
    "tailwindcss",
    "css",
    "html",
    "web development",
  ],
  dateCreated: "2025-12-11", // YYYY-MM-DD
};

// --- Tech Stack ---
export const TECH_STACK: TechStackType[] = [
  {
    key: "typescript",
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    categories: ["Language"],
  },
  {
    key: "js",
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    categories: ["Language"],
  },
  {
    key: "java",
    title: "Java",
    href: "https://www.java.com/",
    categories: ["Language"],
  },
  {
    key: "Kotlin",
    title: "Kotlin",
    href: "https://kotlinlang.org/",
    categories: ["Language"],
  },
  {
    key: "jetpack-compose",
    title: "Jetpack Compose",
    href: "https://developer.android.com/jetpack/compose",
    categories: ["Framework", "Mobile"],
    theme: true,
  },
  {
    key: "nodejs",
    title: "Node.js",
    href: "https://nodejs.org/",
    categories: ["Runtime Environment"],
  },
  {
    key: "react",
    title: "React",
    href: "https://react.dev/",
    categories: ["Library", "UI Library"],
  },
  {
    key: "nextjs2",
    title: "Next.js",
    href: "https://nextjs.org/",
    categories: ["Framework"],
    theme: true,
  },
  {
    key: "tailwindcss",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    categories: ["Framework"],
  },
  {
    key: "shadcn-ui",
    title: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    categories: ["Library", "Component Library"],
    theme: true,
  },
  {
    key: "radixui",
    title: "Radix UI",
    href: "https://www.radix-ui.com/",
    categories: ["Library", "Component Library"],
    theme: true,
  },
  {
    key: "motion",
    title: "Motion",
    href: "https://motion.dev/",
    categories: ["Library", "Animation"],
  },
  {
    key: "git",
    title: "Git",
    href: "https://git-scm.com/",
    categories: ["Version Control"],
  },
  {
    key: "supabase",
    title: "Supabase",
    href: "https://supabase.com/",
    categories: ["Backend", "Database"],
    theme: true,
  },
  {
    key: "figma",
    title: "Figma",
    href: "https://www.figma.com/",
    categories: ["Tools", "Design"],
  },
  {
    key: "ps",
    title: "Adobe Photoshop",
    href: "https://www.adobe.com/vn_en/products/photoshop.html",
    categories: ["Tools", "Design"],
  },
  {
    key: "chatgpt",
    title: "ChatGPT",
    href: "https://chatgpt.com/",
    categories: ["Tools", "AI"],
    theme: true,
  },
];

// --- Navigation ---
export const NAVIGATION_LINKS: NavigationLinkType[] = [
  {
    icon: HomeIcon,
    href: "/",
    label: "Home",
  },
  {
    icon: AboutMeIcon,
    href: "/about",
    label: "About",
    subNavigationLinks: [
      {
        href: "/about",
        label: "About Me",
        description: truncateDescription("Background and skills", 30),
        icon: AboutMeIcon,
      },
      {
        href: "/experience",
        label: "Experience",
        description: truncateDescription("Background and Experience", 30),
        icon: ExperienceIcon,
      },
      {
        href: "/education",
        label: "Education",
        description: truncateDescription("Education and certifications", 30),
        icon: EducationIcon,
      },
    ],
  },
  {
    icon: ArchiveIcon,
    href: "/projects",
    label: "Projects",
  },
  {
    icon: BlogIcon,
    href: "/blog",
    label: "Blog",
  },
  {
    icon: ContactIcon,
    href: "/contact",
    label: "Contact",
  },
];

export const SOCIAL_LINKS: SocialLinkType[] = [
  {
    href: "mailto:hiretimsf@gmail.com",
    icon: EmailIcon,
    label: "Email",
  },
  {
    href: "https://x.com/hiretimsf",
    icon: XPlatformIcon,
    label: "X (Twitter)",
  },
  {
    href: "https://github.com/hiretimsf",
    icon: GitHubIcon,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/hiretimsf/",
    icon: LinkedInIcon,
    label: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/hiretimsf/",
    icon: FacebookIcon,
    label: "Facebook",
  },
  {
    href: "https://www.strava.com/athletes/128944314",
    icon: StravaIcon,
    label: "Strava",
  },
];

export const BOTTOM_NAV_LINKS: LinkItem[] = [
  {
    href: `${SITE_INFO.url}/llms.txt`,
    target: "_blank",
    icon: LLMsIcon,
    label: "llms.txt",
    ariaLabel: "View llms.txt",
  },
  {
    href: "/sitemap.xml",
    icon: SiteMapIcon,
    label: "Sitemap",
    ariaLabel: "View website sitemap",
  },
  {
    href: "/rss.xml",
    icon: RSSIcon,
    label: "RSS Feed",
    ariaLabel: "Subscribe to RSS feed",
  },
];

export const COPYRIGHT_LINKS: Record<string, LinkItem> = {
  privacy: {
    href: "/privacy",
    icon: LockIcon,
    label: "Privacy Policy",
    ariaLabel: "View privacy policy",
  },
  copyright: {
    icon: CopyrightIcon,
    label: `${new Date().getFullYear()} - All rights reserved.`,
    ariaLabel: "View copyright information",
  },
  terms: {
    href: "/changelog",
    icon: FileTextIcon,
    label: "Changelog",
    ariaLabel: "View changelog",
  },
};

// --- SEO ---
export const KEYWORDS = [
  "hire tim",
  "Tumur Bazarragchaa",
  "Tim Baz",
  "Tumur",
  "Bazarragchaa",
  "Tim",
  "frontend",
  "developer",
  "hire",
  "san francisco",
  "javascript",
  "typescript",
  "node.js",
  "react",
  "next.js",
  "supabase",
  "tailwindcss",
  "css",
  "html",
  "web development",
];

export const FAVICONS = {
  icon: [
    { url: "/favicons/favicon.ico", type: "image/x-icon" },
    { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    {
      url: "/favicons/android-icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
  ],
  apple: [
    { url: "/favicons/apple-icon.png" },
    {
      url: "/favicons/apple-icon-180x180.png",
      sizes: "180x180",
      type: "image/png",
    },
  ],
  other: [
    {
      rel: "apple-touch-icon-precomposed",
      url: "/favicons/apple-icon-precomposed.png",
    },
  ],
};

export const OPEN_GRAPH = {
  image: "/images/open-graph-image.jpg",
  twitterImage: "/images/twitter-image.jpg",
};

export const HEAD: HeadType[] = [
  {
    page: "Home",
    title: truncateTitle("Tim | Frontend Developer | 5+ Years Exp"),
    description: truncateDescription(
      "Frontend Developer with 5+ years experience. Pixel-perfect execution in Next.js, React, & TypeScript. Building high-quality, user-centric web & mobile apps.",
    ),
    slug: "/",
  },
  {
    page: "About",
    title: truncateTitle("About Tim | Frontend Developer | 5+ Years Exp"),
    description: truncateDescription(
      "Frontend Developer with 5+ years experience. Pixel-perfect execution in Next.js, React, & TypeScript. Building high-quality, user-centric web & mobile apps.",
    ),
    slug: "/about",
  },
  {
    page: "Experience",
    title: truncateTitle("WorkExperience | Frontend Developer | 5+ Years Exp"),
    description: truncateDescription(
      "Work experience of Tim, a Frontend Developer based in San Francisco Bay Area.",
    ),
    slug: "/experience",
  },
  {
    page: "Education",
    title: truncateTitle(
      "Education of Tim | Frontend Developer | 5+ Years Exp",
    ),
    description: truncateDescription("Education of Tim, a Frontend Developer."),
    slug: "/education",
  },
  {
    page: "Blog",
    title: truncateTitle("Blog | Frontend Development Insights | Tim"),
    description: truncateDescription(
      "Thoughts on exploring new technologies and turning ideas into reality through code.",
    ),
    slug: "/blog",
  },
  {
    page: "Projects",
    title: truncateTitle("Projects | High-Quality Web & Mobile Apps | Tim"),
    description: truncateDescription(
      "Showcasing applications built with Next.js, React, TypeScript and modern front-end technologies.",
    ),
    slug: "/projects",
  },
  {
    page: "Contact",
    title: truncateTitle(
      "Contact Tim | Hire a Frontend Developer | 5+ Years Exp",
    ),
    description: truncateDescription(
      "Have a project in mind? Let's connect. Open to remote and on-site opportunities in the San Francisco Bay Area.",
    ),
    slug: "/contact",
  },
  {
    page: "Privacy",
    title: truncateTitle("Privacy Policy | Hire Tim"),
    description: truncateDescription(
      "Frontend Developer with 5+ years experience. Pixel-perfect execution in Next.js, React, & TypeScript. Building high-quality, user-centric web & mobile apps.",
    ),
    slug: "/privacy",
  },
  {
    page: "Changelog",
    title: truncateTitle(
      "Changelog | The history and evolution of my portfolio website.",
    ),
    description: truncateDescription(
      "The history and evolution of my portfolio website.",
    ),
    slug: "/changelog",
  },
];

// --- Schemas ---
export const baseProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  fromDate: z.union([z.string(), z.number()]),
  toDate: z.union([z.string(), z.number()]),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  featured: z.boolean().default(false),
  showOnPortfolio: z.boolean().default(true),
  websiteUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  videoEmbedUrl: z.string().optional(),
  videoEmbedAlt: z.string().optional(),
  comingSoon: z.boolean().default(false),
  techStacks: z.array(z.string()).default([]),
});

export const blogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  author: z.string(),
  authorAvatar: z.string(),
  authorAvatarAlt: z.string(),
  created: z.string(),
  lastUpdated: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  seo: z.array(z.string()).default([]),
});

export const privacySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const changelogSchema = z.object({
  title: z.string(),
  description: z.string(),
  created: z.string(),
});
