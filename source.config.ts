import {
  defineCollections,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const projects = defineDocs({
  dir: "features/projects/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/projects/content",
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      fromDate: z.string(),
      toDate: z.string(),
      imageUrl: z.string().optional(),
      imageAlt: z.string().optional(),
      featured: z.boolean(),
      showOnPortfolio: z.boolean().default(true),
      websiteUrl: z.string().optional(),
      githubUrl: z.string().optional(),
      videoEmbedUrl: z.string().optional(),
      videoEmbedAlt: z.string().optional(),
      techStacks: z.array(z.string()).optional(),
    }),
  }),
});

export const experience = defineDocs({
  dir: "features/experience/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/experience/content",
    schema: frontmatterSchema.extend({
      title: z.string().optional(),
      companyName: z.string(),
      companyWebsite: z.string().optional(),
      companyLogo: z.string().optional(),
      companyLogoAlt: z.string().optional(),
      companyLocation: z.string().optional(),
      country: z.string().optional(),
      isCurrentEmployer: z.boolean().optional(),
      positions: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          employmentPeriod: z.string(),
          employmentDuration: z.string().optional(),
          employmentType: z.string().optional(),
          description: z.string().optional(),
          skills: z.array(z.string()).optional(),
          icon: z.string().optional(),
        }),
      ),
      projectSlugs: z.array(z.string()).optional(),
    }),
  }),
});

export const education = defineDocs({
  dir: "features/education/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/education/content",
    schema: frontmatterSchema.extend({
      title: z.string().optional(),
      companyName: z.string(),
      companyWebsite: z.string().optional(),
      companyLogo: z.string().optional(),
      companyLogoAlt: z.string().optional(),
      companyLocation: z.string().optional(),
      country: z.string().optional(),
      isCurrentEmployer: z.boolean().optional(),
      positions: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          employmentPeriod: z.string(),
          employmentDuration: z.string().optional(),
          employmentType: z.string().optional(),
          description: z.string().optional(),
          skills: z.array(z.string()).optional(),
        }),
      ),
      projectSlugs: z.array(z.string()).optional(),
    }),
  }),
});

export const about = defineDocs({
  dir: "features/about/content",
});

export const blog = defineDocs({
  dir: "features/blog/content",
  docs: defineCollections({
    type: "doc",
    dir: "features/blog/content",
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
      created: z.string(),
      lastUpdated: z.string().optional(),
      image: z.string(),
      imageAlt: z.string().optional(),
      author: z.string().optional(),
      authorAvatar: z.string().optional(),
      authorAvatarAlt: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
      seo: z.array(z.string()).optional(),
    }),
  }),
});
