// source.config.ts
import { z as z3 } from "zod";
import {
  defineCollections,
  defineDocs,
  defineConfig,
  frontmatterSchema
} from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";

// lib/config.ts
import { z as z2 } from "zod";

// lib/utils.tsx
import { clsx } from "clsx";
import { format } from "date-fns";
import { LRUCache } from "lru-cache";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
function truncateTitle(title, maxLength = 60) {
  return title.length > maxLength ? title.slice(0, maxLength - 3) + "..." : title;
}
function truncateDescription(description, maxLength = 160) {
  return description.length > maxLength ? description.slice(0, maxLength - 3) + "..." : description;
}
function getBaseUrl(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://hiretimsf.com");
  if (!slug) return baseUrl;
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;
  return `${baseUrl}${normalizedSlug}`;
}
var envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  CONTACT_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  NEXT_PUBLIC_POSTHOG_UI_HOST: z.string().url().optional(),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development")
});
var eventSchema = z.object({
  name: z.string(),
  properties: z.record(
    z.string(),
    z.union([z.string(), z.number(), z.boolean(), z.null()])
  ).optional()
});

// lib/config.ts
import { CopyrightIcon, FileTextIcon, LockIcon } from "lucide-react";
import {
  UserIcon as AboutMeIcon,
  ArchiveIcon,
  RssIcon as BlogIcon,
  MailIcon as ContactIcon,
  GraduationCapIcon as EducationIcon,
  FileTextIcon as ExperienceIcon,
  HomeIcon
} from "lucide-react";
import { FaStrava as StravaIcon } from "react-icons/fa";
import {
  FaEnvelope as EmailIcon,
  FaFacebook as FacebookIcon,
  FaGithub as GitHubIcon,
  FaLinkedin as LinkedInIcon,
  FaSitemap as SiteMapIcon,
  FaSquareRss as RSSIcon,
  FaXTwitter as XPlatformIcon
} from "react-icons/fa6";
import { LuBrain as LLMsIcon } from "react-icons/lu";
var SITE_INFO = {
  name: "Hire Tim",
  url: getBaseUrl(),
  alternateName: "Tumur Bazarragchaa"
};
var GITHUB_REPO_OWNER = "hiretimsf";
var GITHUB_REPO_NAME = "hiretimsf.com";
var SOURCE_CODE_GITHUB_REPO = `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;
var SOURCE_CODE_GITHUB_URL = `https://github.com/${SOURCE_CODE_GITHUB_REPO}`;
var NAVIGATION_LINKS = [
  {
    icon: HomeIcon,
    href: "/",
    label: "Home"
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
        icon: AboutMeIcon
      },
      {
        href: "/experience",
        label: "Experience",
        description: truncateDescription("Background and Experience", 30),
        icon: ExperienceIcon
      },
      {
        href: "/education",
        label: "Education",
        description: truncateDescription("Education and certifications", 30),
        icon: EducationIcon
      }
    ]
  },
  {
    icon: ArchiveIcon,
    href: "/projects",
    label: "Projects"
  },
  {
    icon: BlogIcon,
    href: "/blog",
    label: "Blog"
  },
  {
    icon: ContactIcon,
    href: "/contact",
    label: "Contact"
  }
];
var BOTTOM_NAV_LINKS = [
  {
    href: `${SITE_INFO.url}/llms.txt`,
    target: "_blank",
    icon: LLMsIcon,
    label: "llms.txt",
    ariaLabel: "View llms.txt"
  },
  {
    href: "/sitemap.xml",
    icon: SiteMapIcon,
    label: "Sitemap",
    ariaLabel: "View website sitemap"
  },
  {
    href: "/rss.xml",
    icon: RSSIcon,
    label: "RSS Feed",
    ariaLabel: "Subscribe to RSS feed"
  }
];
var COPYRIGHT_LINKS = {
  privacy: {
    href: "/privacy",
    icon: LockIcon,
    label: "Privacy Policy",
    ariaLabel: "View privacy policy"
  },
  copyright: {
    icon: CopyrightIcon,
    label: `${(/* @__PURE__ */ new Date()).getFullYear()} - All rights reserved.`,
    ariaLabel: "View copyright information"
  },
  terms: {
    href: "/changelog",
    icon: FileTextIcon,
    label: "Changelog",
    ariaLabel: "View changelog"
  }
};
var HEAD = [
  {
    page: "Home",
    title: truncateTitle("Tim | Frontend Developer | 5+ Years Exp"),
    description: truncateDescription(
      "Frontend Developer with 5+ years experience. Pixel-perfect execution in Next.js, React, & TypeScript. Building high-quality, user-centric web & mobile apps."
    ),
    slug: "/"
  },
  {
    page: "About",
    title: truncateTitle("About Tim | Frontend Developer | 5+ Years Exp"),
    description: truncateDescription(
      "Frontend Developer with 5+ years experience. Pixel-perfect execution in Next.js, React, & TypeScript. Building high-quality, user-centric web & mobile apps."
    ),
    slug: "/about"
  },
  {
    page: "Experience",
    title: truncateTitle("WorkExperience | Frontend Developer | 5+ Years Exp"),
    description: truncateDescription(
      "Work experience of Tim, a Frontend Developer based in San Francisco Bay Area."
    ),
    slug: "/experience"
  },
  {
    page: "Education",
    title: truncateTitle(
      "Education of Tim | Frontend Developer | 5+ Years Exp"
    ),
    description: truncateDescription("Education of Tim, a Frontend Developer."),
    slug: "/education"
  },
  {
    page: "Blog",
    title: truncateTitle("Blog | Frontend Development Insights | Tim"),
    description: truncateDescription(
      "Thoughts on exploring new technologies and turning ideas into reality through code."
    ),
    slug: "/blog"
  },
  {
    page: "Projects",
    title: truncateTitle("Projects | High-Quality Web & Mobile Apps | Tim"),
    description: truncateDescription(
      "Showcasing applications built with Next.js, React, TypeScript and modern front-end technologies."
    ),
    slug: "/projects"
  },
  {
    page: "Contact",
    title: truncateTitle(
      "Contact Tim | Hire a Frontend Developer | 5+ Years Exp"
    ),
    description: truncateDescription(
      "Have a project in mind? Let's connect. Open to remote and on-site opportunities in the San Francisco Bay Area."
    ),
    slug: "/contact"
  },
  {
    page: "Privacy",
    title: truncateTitle("Privacy Policy | Hire Tim"),
    description: truncateDescription(
      "Frontend Developer with 5+ years experience. Pixel-perfect execution in Next.js, React, & TypeScript. Building high-quality, user-centric web & mobile apps."
    ),
    slug: "/privacy"
  },
  {
    page: "Changelog",
    title: truncateTitle(
      "Changelog | The history and evolution of my portfolio website."
    ),
    description: truncateDescription(
      "The history and evolution of my portfolio website."
    ),
    slug: "/changelog"
  }
];
var baseProjectSchema = z2.object({
  title: z2.string(),
  description: z2.string(),
  category: z2.string(),
  fromDate: z2.union([z2.string(), z2.number()]),
  toDate: z2.union([z2.string(), z2.number()]),
  imageUrl: z2.string().optional(),
  imageAlt: z2.string().optional(),
  featured: z2.boolean().default(false),
  showOnPortfolio: z2.boolean().default(true),
  websiteUrl: z2.string().optional(),
  githubUrl: z2.string().optional(),
  videoEmbedUrl: z2.string().optional(),
  videoEmbedAlt: z2.string().optional(),
  comingSoon: z2.boolean().default(false),
  techStacks: z2.array(z2.string()).default([])
});
var blogPostSchema = z2.object({
  title: z2.string(),
  description: z2.string(),
  image: z2.string().optional(),
  thumbnail: z2.string().optional(),
  imageAlt: z2.string().optional(),
  author: z2.string(),
  authorAvatar: z2.string(),
  authorAvatarAlt: z2.string(),
  created: z2.string(),
  lastUpdated: z2.string().optional(),
  category: z2.string(),
  tags: z2.array(z2.string()).default([]),
  seo: z2.array(z2.string()).default([])
});
var privacySchema = z2.object({
  title: z2.string(),
  description: z2.string()
});
var changelogSchema = z2.object({
  title: z2.string(),
  description: z2.string(),
  created: z2.string()
});

// source.config.ts
var about = defineDocs({
  dir: "features/about/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/about/content",
    schema: frontmatterSchema.extend({
      title: z3.string(),
      description: z3.string().optional(),
      imageUrl: z3.string().optional(),
      imageUrlDesktop: z3.string().optional(),
      imageUrlMobile: z3.string().optional(),
      imageAlt: z3.string().optional()
    })
  })
});
var webApps = defineDocs({
  dir: "features/about/content/web-apps",
  docs: defineCollections({
    type: "doc",
    dir: "features/about/content/web-apps",
    schema: baseProjectSchema.extend({
      imageUrl: baseProjectSchema.shape.imageUrl.unwrap(),
      imageAlt: baseProjectSchema.shape.imageAlt.unwrap()
    })
  })
});
var projects = defineDocs({
  dir: "features/projects/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/projects/content",
    schema: baseProjectSchema
  })
});
var experience = defineDocs({
  dir: "features/experience/content"
});
var education = defineDocs({
  dir: "features/education/content"
});
var blog = defineDocs({
  dir: "features/blog/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/blog/content",
    schema: blogPostSchema
  })
});
var privacy = defineDocs({
  dir: "features/privacy/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/privacy/content",
    schema: privacySchema
  })
});
var changelog = defineDocs({
  dir: "features/changelog/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/changelog/content",
    schema: changelogSchema
  })
});
var source_config_default = defineConfig({
  plugins: [lastModified()]
});
export {
  about,
  blog,
  changelog,
  source_config_default as default,
  education,
  experience,
  privacy,
  projects,
  webApps
};
