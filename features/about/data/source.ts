import { about, webApps } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import type { Source, SourceConfig } from "fumadocs-core/source";
import type { ProjectType } from "@/features/projects/types/ProjectType";
import { formatDate } from "@/lib/utils";


// aboutSource config
const aboutDocs = about as unknown as {
  toFumadocsSource: () => unknown;
};

export const aboutSource = loader({
  baseUrl: "/about",
  source: aboutDocs.toFumadocsSource() as Source<SourceConfig>,
});

// webAppsSource config
const webAppsDocs = webApps as unknown as { toFumadocsSource: () => unknown };

export const webAppsSource = loader({
  baseUrl: "/about/web-apps",
  source: webAppsDocs.toFumadocsSource() as Source<SourceConfig>,
});

export function GET_WEB_APPS(): ProjectType[] {
  return webAppsSource.getPages().map((page, index) => {
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
      fromDate: data.fromDate ? formatDate(data.fromDate, "MM/yyyy") : "",
      toDate: data.toDate ? formatDate(data.toDate, "MM/yyyy") : "",
      weight: data.weight,
    };
  });
}


