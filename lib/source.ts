import { about, blog, education, experience, projects } from "@/.source";
import type { BlogPostItemType } from "@/features/blog/types/BlogPostItem";
import type { ProjectType } from "@/features/projects/types/ProjectType";
import { parseDate, formatDate } from "@/lib/helpers";
import fs from "fs";
import type { Source, SourceConfig } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import path from "path";
import readingTime from "reading-time";

const projectsDocs = projects as unknown as { toFumadocsSource: () => unknown };
const experienceDocs = experience as unknown as {
  toFumadocsSource: () => unknown;
};
const educationDocs = education as unknown as {
  toFumadocsSource: () => unknown;
};
const aboutDocs = about as unknown as {
  toFumadocsSource: () => unknown;
};
const blogDocs = blog as unknown as {
  toFumadocsSource: () => unknown;
};

export const projectsSource = loader({
  baseUrl: "/projects",
  source: projectsDocs.toFumadocsSource() as Source<SourceConfig>,
});

export const experienceSource = loader({
  baseUrl: "/experience",
  source: experienceDocs.toFumadocsSource() as Source<SourceConfig>,
});

export const educationSource = loader({
  baseUrl: "/education",
  source: educationDocs.toFumadocsSource() as Source<SourceConfig>,
});

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
};

type Page = ReturnType<typeof projectsSource.getPages>[number];

function getProject(page: Page, index: number): ProjectType {
  const data = page.data as unknown as ProjectFrontmatter;

  return {
    id: index,
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl ?? "",
    imageAlt: data.imageAlt ?? "",
    fromDate: data.fromDate,
    toDate: data.toDate,
    category: data.category,
    websiteUrl: data.websiteUrl,
    githubUrl: data.githubUrl,
    videoEmbedUrl: data.videoEmbedUrl,
    videoEmbedAlt: data.videoEmbedAlt,
    techStacks: data.techStacks,
    featured: data.featured,
    showOnPortfolio: data.showOnPortfolio,
  };
}

export function getFeaturedProjects(): ProjectType[] {
  return projectsSource
    .getPages()
    .filter((page) => (page.data as ProjectFrontmatter).featured === true)
    .map((page, index) => getProject(page, index))
    .sort((a, b) => {
      const dateA = parseDate(a.toDate ?? a.fromDate);
      const dateB = parseDate(b.toDate ?? b.fromDate);
      return dateB - dateA;
    });
}

export function getProjects(): ProjectType[] {
  return projectsSource
    .getPages()
    .filter(
      (page) => (page.data as ProjectFrontmatter).showOnPortfolio === true,
    )
    .map((page, index) => getProject(page, index))
    .sort((a, b) => {
      const dateA = parseDate(a.toDate ?? a.fromDate);
      const dateB = parseDate(b.toDate ?? b.fromDate);
      return dateB - dateA;
    });
}

export const aboutSource = loader({
  baseUrl: "/about",
  source: aboutDocs.toFumadocsSource() as Source<SourceConfig>,
});

export const blogSource = loader({
  baseUrl: "/blog",
  source: blogDocs.toFumadocsSource() as Source<SourceConfig>,
});

type BlogPostFrontmatter = {
  title: string;
  description: string;
  created: string;
  lastUpdated?: string;
  image: string;
  imageAlt?: string;
  author?: string;
  authorAvatar?: string;
  authorAvatarAlt?: string;
  category?: string;
  tags?: string[];
  seo?: string[];
  body: React.ComponentType<object>;
};

type BlogPage = ReturnType<typeof blogSource.getPages>[number];

export function getBlogPosts(): BlogPostItemType[] {
  return blogSource.getPages().map((page) => {
    const data = page.data as unknown as BlogPostFrontmatter;

    const pageWithFile = page as BlogPage & { file: { path: string } };

    const filePath = pageWithFile.file?.path
      ? path.join(
          process.cwd(),
          "features/blog/content",
          pageWithFile.file.path,
        )
      : "";

    if (!filePath) {
      return {
        title: data.title,
        description: data.description,
        created: data.created,
        lastUpdated: data.lastUpdated,
        image: data.image,
        author: data.author,
        authorAvatar: data.authorAvatar,
        category: data.category,
        tags: data.tags,
        seo: data.seo,
        content: () => null,
        readingTime: "",
        readingTimeMinutes: 0,
      };
    }

    const contentStr = fs.readFileSync(filePath, "utf-8");
    const readingTimeStats = readingTime(contentStr);

    return {
      title: data.title,
      description: data.description,
      created: data.created,
      lastUpdated: data.lastUpdated,
      image: data.image,
      author: data.author,
      authorAvatar: data.authorAvatar,
      category: data.category,
      tags: data.tags,
      seo: data.seo,
      content: data.body,
      readingTime: readingTimeStats.text,
      readingTimeMinutes: readingTimeStats.minutes,
    };
  });
}
