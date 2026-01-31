"use client";

import ProjectCardItem from "@/features/projects/components/ProjectCardItem";
import { usePaging } from "@/components/common/Paging";
import type { ProjectType } from "@/features/projects/types/ProjectType";

const PAGE_SIZE = 6;

interface PaginatedProjectGridProps {
  projects: ProjectType[];
}

export default function PaginatedProjectGrid({
  projects,
}: PaginatedProjectGridProps) {
  const { startIndex, endIndex } = usePaging("page", PAGE_SIZE);
  const paginatedProjects = projects.slice(startIndex, endIndex);

  return (
    <>
      <div className="xl mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {paginatedProjects.map((project, index) => (
          <ProjectCardItem key={project.id} item={project} index={index} />
        ))}
      </div>
    </>
  );
}
