import BackgroundDots from "@/components/common/BackgroundDots";
import ProjectCardItem from "@/components/common/ProjectCardItem";
import { getProjects } from "@/features/projects/data/projectSource";
import type { ProjectType } from "@/features/projects/types/ProjectType";
import CornerDecorations from "@/components/common/CornerDecorations";

export default function ProjectList() {
  const projects: ProjectType[] = getProjects();

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-8">
      <CornerDecorations bottom={true}/>
      <BackgroundDots gridId="featured-apps" className="text-gray-200/80" />
      <div className="xl mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCardItem key={index} item={project} index={index} />
        ))}
      </div>
    </div>
  );
}
