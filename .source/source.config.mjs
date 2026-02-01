// source.config.ts
import { z as z4 } from "zod";
import {
  defineCollections,
  defineDocs,
  defineConfig,
  frontmatterSchema
} from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";

// lib/config.ts
import { z as z3 } from "zod";

// lib/ui/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// lib/string/truncate.ts
function truncate(text, maxLength = 160) {
  return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
}
function truncateTitle(title, maxLength = 60) {
  return truncate(title, maxLength);
}
function truncateDescription(description, maxLength = 160) {
  return truncate(description, maxLength);
}

// lib/string/url.ts
function getBaseUrl(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://hiretimsf.com");
  if (!slug) return baseUrl;
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;
  return `${baseUrl}${normalizedSlug}`;
}

// lib/date/format.ts
import { format } from "date-fns";

// lib/network/rate-limit.ts
import { LRUCache } from "lru-cache";

// lib/component/highlight.tsx
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";

// lib/component/markdown.tsx
import { jsx as jsx2 } from "react/jsx-runtime";

// lib/analytics/env.ts
import { z } from "zod";
var envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  CONTACT_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  NEXT_PUBLIC_POSTHOG_UI_HOST: z.string().url().optional(),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development")
});

// lib/analytics/tracking.ts
import { z as z2 } from "zod";
var eventSchema = z2.object({
  name: z2.string(),
  properties: z2.record(
    z2.string(),
    z2.union([z2.string(), z2.number(), z2.boolean(), z2.null()])
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
      "Learn about Tim Baz, a Frontend Developer in San Francisco with 5+ years of experience building web apps with React, Next.js, and TypeScript."
    ),
    slug: "/about"
  },
  {
    page: "Experience",
    title: truncateTitle("Work Experience | Frontend Developer | 5+ Years Exp"),
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
      "Privacy policy for hiretimsf.com. Learn how your data is collected, used, and protected when visiting this site."
    ),
    slug: "/privacy"
  },
  {
    page: "Changelog",
    title: truncateTitle(
      "Changelog | Portfolio Website Updates & History"
    ),
    description: truncateDescription(
      "The history and evolution of my portfolio website."
    ),
    slug: "/changelog"
  }
];
var baseProjectSchema = z3.object({
  title: z3.string(),
  description: z3.string(),
  category: z3.string(),
  fromDate: z3.union([z3.string(), z3.number()]),
  toDate: z3.union([z3.string(), z3.number()]),
  imageUrl: z3.string().optional(),
  imageAlt: z3.string().optional(),
  featured: z3.boolean().default(false),
  showOnPortfolio: z3.boolean().default(true),
  websiteUrl: z3.string().optional(),
  githubUrl: z3.string().optional(),
  videoEmbedUrl: z3.string().optional(),
  videoEmbedAlt: z3.string().optional(),
  comingSoon: z3.boolean().default(false),
  techStacks: z3.array(z3.string()).default([]),
  weight: z3.number().default(0)
});
var blogPostSchema = z3.object({
  title: z3.string(),
  description: z3.string(),
  image: z3.string().optional(),
  thumbnail: z3.string().optional(),
  imageAlt: z3.string().optional(),
  author: z3.string(),
  authorAvatar: z3.string(),
  authorAvatarAlt: z3.string(),
  created: z3.string(),
  lastUpdated: z3.string().optional(),
  category: z3.string(),
  tags: z3.array(z3.string()).default([]),
  seo: z3.array(z3.string()).default([])
});
var privacySchema = z3.object({
  title: z3.string(),
  description: z3.string()
});
var changelogSchema = z3.object({
  title: z3.string(),
  description: z3.string(),
  created: z3.string()
});

// source.config.ts
var about = defineDocs({
  dir: "features/about/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/about/content",
    schema: frontmatterSchema.extend({
      title: z4.string(),
      description: z4.string().optional(),
      imageUrl: z4.string().optional(),
      imageUrlDesktop: z4.string().optional(),
      imageUrlMobile: z4.string().optional(),
      imageAlt: z4.string().optional()
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
