import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ProjectDate } from "./ProjectDate";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectImage } from "./ProjectImage";
import ProjectSkills from "./ProjectSkills";
import { ProjectTitle } from "./ProjectTitle";

type ProjectMainProps = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  fromDate: string;
  toDate: string;
  hasBorderTop?: boolean;
  isLast?: boolean;
  techStacks: string[];
  websiteUrl: string;
  githubUrl: string;
};

export function ProjectMain({
  title,
  description,
  imageUrl,
  imageAlt,
  fromDate,
  toDate,
  techStacks,
  websiteUrl,
  githubUrl,
  hasBorderTop = false,
  isLast = false,
}: ProjectMainProps) {
  return (
    <div className="px-6 md:flex-row md:px-8">
      <div
        className={cn(
          "flex w-full flex-row gap-4 border-x border-black/10 dark:border-white/10 border-dashed px-4 md:gap-4",
          !isLast && "border-b",
          hasBorderTop && "border-t",
        )}
      >
        <div className="shrink-0 border-r border-black/10 dark:border-white/10 border-dashed py-4 pr-4">
          <ProjectImage imageUrl={imageUrl} imageAlt={imageAlt ?? title} />
        </div>
        <div className="flex flex-col gap-1 border-black/10 dark:border-white/10 border-dashed py-4">
          <ProjectTitle
            title={title}
            demoLink={websiteUrl ?? githubUrl ?? ""}
          />
          <ProjectDate
            date={`${formatDate(fromDate, "MM/yyyy")} - ${formatDate(
              toDate,
              "MM/yyyy",
            )}`}
          />
          <ProjectDescription description={description} />
        </div>
      </div>
      <ProjectSkills skills={techStacks ?? []} />
    </div>
  );
}
