import { projects } from "@/.source/server";
import type { Source, SourceConfig } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import type { ProjectType } from "../types/ProjectType";
import type { ProjectFrontmatter } from "../types/ProjectFrontmatter";
import { formatDate, parseDate } from "@/lib/utils";

const projectsDocs = projects as unknown as { toFumadocsSource: () => unknown };

export const projectsSource = loader({
  baseUrl: "/projects",
  source: projectsDocs.toFumadocsSource() as Source<SourceConfig>,
});

type Page = ReturnType<typeof projectsSource.getPages>[number];

function getProject(page: Page, index: number): ProjectType {
  const data = page.data as unknown as ProjectFrontmatter;

  return {
    id: index,
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl ?? "",
    imageAlt: data.imageAlt ?? "",
    fromDate: formatDate(data.fromDate, "MMM yyyy"),
    toDate:
      data.toDate === "Present"
        ? "Present"
        : formatDate(data.toDate, "MMM yyyy"),
    category: data.category,
    websiteUrl: data.websiteUrl,
    githubUrl: data.githubUrl,
    videoEmbedUrl: data.videoEmbedUrl,
    videoEmbedAlt: data.videoEmbedAlt,
    techStacks: data.techStacks,
    featured: data.featured,
    showOnPortfolio: data.showOnPortfolio,
    comingSoon: data.comingSoon,
  };
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
