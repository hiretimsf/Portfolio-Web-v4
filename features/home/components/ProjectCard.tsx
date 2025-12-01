import Image from "next/image";
import { GitHubStarsButton } from "@/features/home/components/GithubStarsButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectItemType } from "@/features/home/types/ProjectItem";
import Link from "next/link";

interface ProjectCardProps {
  project: ProjectItemType;
  index?: number;
}

function getGitHubInfo(url: string) {
  try {
    const urlToParse = url.startsWith("http") ? url : `https://${url}`;
    const { hostname, pathname } = new URL(urlToParse);

    if (!hostname.includes("github.com")) return null;

    const parts = pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return { username: parts[0], repo: parts[1] };
    }
  } catch {
    return null;
  }
  return null;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const gitHubInfo = project.github ? getGitHubInfo(project.github) : null;

  return (
    <Card
      key={`${project.title}-${index}`}
      className="group h-full gap-0 rounded-none rounded-b-md border border-gray-200 py-0 shadow-lg transition-all duration-300 hover:border-gray-300"
      role="article"
      aria-labelledby={`project-title-${index}`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          alt={project.imageAlt || project.title || "Project image"}
          src={project.imageUrl || "/images/app-placeholder.jpg"}
          width={1000}
          height={500}
          className="h-full w-full rounded-none object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index !== undefined && index < 3}
        />
      </div>
      <CardHeader>
        <CardTitle
          id={`project-title-${index}`}
          className="text-panda-text mt-4 text-lg/6"
        >
          {project.title}
        </CardTitle>
        <CardDescription className="text-panda-text/80 text-sm/6">
          {project.date ?? null}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-panda-text line-clamp-2 text-sm/6">
          {project.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-6 mb-4 flex-col gap-2">
        {/* Live Demo */}
        {project.liveDemo && project.liveDemo !== "#" ? (
          <Button asChild>
            <Link href={project.liveDemo}>Live Demo</Link>
          </Button>
        ) : null}
        {/* GitHub */}
        {project.github ? (
          <GitHubStarsButton
            href={project.github}
            username={gitHubInfo?.username}
            repo={gitHubInfo?.repo}
          />
        ) : null}
      </CardFooter>
    </Card>
  );
}
