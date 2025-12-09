import { getProjects } from "@/lib/source";
import Projects from "./Projects";
import { formatDate } from "@/lib/helpers";
import type { ProjectType } from "@/features/projects/types/ProjectType";

export default function Web() {
  const projects = getProjects() as ProjectType[];
  const targetTitles = [
    "Full-Stack Blog App",
    "Portfolio Website v3",
    "Portfolio Website v2",
    "Portfolio Website v1",
    "Portfolio Website v0",
  ];

  const webProjects = projects
    .filter((project) => targetTitles.includes(project.title))
    .sort((a, b) => {
      return targetTitles.indexOf(a.title) - targetTitles.indexOf(b.title);
    })
    .map((project) => ({
      ...project,
      fromDate: project.fromDate
        ? formatDate(project.fromDate, "MMM yyyy")
        : "",
      toDate: project.toDate ? formatDate(project.toDate, "MMM yyyy") : "",
      websiteUrl: project.websiteUrl,
      githubUrl: project.githubUrl,
      videoEmbedUrl: project.videoEmbedUrl,
      videoEmbedAlt: project.videoEmbedAlt,
      techStacks: project.techStacks,
    }));

  return <Projects data={webProjects as ProjectType[]} />;
}
