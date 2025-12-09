import type { ProjectType } from "@/features/projects/types/ProjectType";
import { cn } from "@/lib/utils";
import { ProjectDate } from "./ProjectDate";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectImage } from "./ProjectImage";
import ProjectSkills from "./ProjectSkills";
import { ProjectTitle } from "./ProjectTitle";

type ProjectMainProps = {
  project: ProjectType;
  hasBorderTop?: boolean;
  isLast?: boolean;
};

export function ProjectMain({
  project,
  hasBorderTop = false,
  isLast = false,
}: ProjectMainProps) {
  const date = project.fromDate
    ? `${project.fromDate} - ${project.toDate}`
    : "Unknown date";

  return (
    <div className="px-6 md:flex-row md:px-8">
      <div
        className={cn(
          "flex w-full flex-row gap-4 border-x border-border-edge border-dashed px-4 md:gap-4",
          !isLast && "border-b",
          hasBorderTop && "border-t",
        )}
      >
        <div className="shrink-0 border-r border-border-edge border-dashed py-4 pr-4">
          <ProjectImage
            imageUrl={project.imageUrl}
            imageAlt={project.imageAlt ?? project.title}
          />
        </div>
        <div className="flex flex-col gap-1 border-border-edge border-dashed py-4">
          <ProjectTitle
            title={project.title}
            demoLink={project.websiteUrl ?? project.githubUrl ?? ""}
          />
          <ProjectDate date={date} />
          <ProjectDescription description={project.description} />
        </div>
      </div>
      <ProjectSkills skills={project.techStacks ?? []} />
    </div>
  );
}
