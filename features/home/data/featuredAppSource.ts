import { featuredApps } from "@/.source/server";
import type { Source, SourceConfig } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { formatDate } from "@/lib/helpers";
import type { ProjectType } from "@/features/projects/types/ProjectType";

const featuredAppsDocs = featuredApps as unknown as {
  toFumadocsSource: () => unknown;
};

export const featuredAppsSource = loader({
  baseUrl: "/home/featured-apps",
  source: featuredAppsDocs.toFumadocsSource() as Source<SourceConfig>,
});

export function getFeaturedApps(): ProjectType[] {
  return featuredAppsSource
    .getPages()
    .map((page, index) => {
      const data = page.data as unknown as ProjectType;
      return {
        id: index,
        title: data.title,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
        imageAlt: data.imageAlt,
        featured: data.featured,
        showOnPortfolio: data.showOnPortfolio,
        websiteUrl: data.websiteUrl,
        githubUrl: data.githubUrl,
        videoEmbedUrl: data.videoEmbedUrl,
        videoEmbedAlt: data.videoEmbedAlt,
        techStacks: data.techStacks,
        fromDate: data.fromDate ? formatDate(data.fromDate, "MMM yyyy") : "",
        toDate: data.toDate ? formatDate(data.toDate, "MMM yyyy") : "",
        weight: data.weight,
      };
    })
    .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
}
