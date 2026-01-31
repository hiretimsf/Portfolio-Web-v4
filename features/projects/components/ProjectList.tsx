import BackgroundDots from "@/components/common/BackgroundDots";
import CornerDecorations from "@/components/common/CornerDecorations";
import { getProjects } from "@/features/projects/data/projectSource";
import PaginatedProjectGrid from "@/features/projects/components/PaginatedProjectGrid";

export default function ProjectList() {
  const projects = getProjects();

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10 lg:px-8">
      <CornerDecorations bottom={true} />
      <BackgroundDots gridId="featured-apps" className="text-gray-200/80" />
      <PaginatedProjectGrid projects={projects} />
    </div>
  );
}
