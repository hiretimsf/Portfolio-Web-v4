"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import BrowserWrapper from "@/components/common/BrowserWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageWithLoader from "@/components/common/ImageWithLoader";
import { CalendarIcon, StarIcon } from "@/components/common/Icons";
import { cn, trackEvent, formatDate } from "@/lib/utils";
import { getGitHubStars } from "@/actions/github";

import type { ProjectType } from "@/features/projects/types/ProjectType";
import { getTechIcon } from "@/features/projects/icons";

/**
 * Props for the ProjectCardItem component.
 * @property index - Unique index for list rendering and ARIA labels.
 * @property item - The project data object.
 * @property sizes - Optimized image sizes string.
 */
type ProjectCardItemProps = {
  index: number;
  item: ProjectType;
  sizes?: string;
};

const DASHED_BORDER = "border-dashed border-black/10 dark:border-white/10";

/**
 * Parses a GitHub URL to extract owner and repository name.
 * @param githubUrl - The GitHub repository URL
 * @returns Object containing owner and repo, or null if parsing fails
 */
const parseGitHubUrl = (
  githubUrl: string
): { owner: string; repo: string } | null => {
  try {
    const urlObj = new URL(githubUrl);
    const parts = urlObj.pathname.split("/").filter(Boolean);

    if (parts.length >= 2) {
      const [owner, repo] = parts;
      if (owner && repo) {
        return { owner, repo };
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to parse GitHub URL:", githubUrl, error);
    }
  }
  return null;
};

/**
 * Displays a project portfolio item with thumbnail, details, and action buttons.
 */
export default function ProjectCardItem({
  index,
  item,
  sizes,
}: ProjectCardItemProps) {
  const href = item.websiteUrl ?? item.githubUrl ?? "#";
  const [stars, setStars] = useState<number>(0);

  useEffect(() => {
    const fetchStars = async () => {
      if (!item.githubUrl) return;

      const parsed = parseGitHubUrl(item.githubUrl);
      if (!parsed) return;

      const { owner, repo } = parsed;
      const { stars } = await getGitHubStars(owner, repo);
      setStars(stars);
    };

    fetchStars();
  }, [item.githubUrl]);


  return (
    <BrowserWrapper>
      <Card
        className={cn(
          "h-full gap-0 py-0 transition-all duration-300 rounded-xl corner-squircle border-none"
        )}
        role="article"
        aria-labelledby={`card-title-${index}`}
      >
        <ThumbnailImage
          imageUrl={item.imageUrl}
          imageAlt={item.imageAlt || item.title}
          sizes={sizes}
        />

        <div
          className={cn(
            "flex w-full items-stretch justify-between border-t",
            DASHED_BORDER
          )}
        >
          <SideBorder position="left" />
          <div className="flex flex-1 flex-col">
            <CardHeader className="gap-0">
              <div
                className={cn(
                  "flex w-full py-2 flex-row items-center border-b",
                  DASHED_BORDER
                )}
              >
                <Link href={href} className="group/title">
                  <CardTitle
                    id={`card-title-${index}`}
                    className="line-clamp-2 px-2 text-left text-lg font-semibold leading-tight text-foreground group-hover/title:text-primary"
                  >
                    {item.title}
                  </CardTitle>
                </Link>
              </div>
              <div
                className={cn(
                  "grid grid-cols-2 grid-rows-1 w-full border-b",
                  DASHED_BORDER
                )}
              >
                <div
                  className={cn(
                    "flex items-center px-2 py-2 border-r",
                    DASHED_BORDER
                  )}
                >
                  <CalendarIcon
                    size={16}
                    className="mr-2 size-4 text-muted-foreground"
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.toDate
                      ? formatDate(item.toDate, "MM/yyyy")
                      : "No date"}
                  </span>
                </div>
                <div className="flex items-center px-2 py-2">
                  <StarIcon className="mr-2 size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{stars}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription
                className={cn("border-b px-2 py-2", DASHED_BORDER)}
              >
                <span className="line-clamp-3 text-left text-md leading-6 text-muted-foreground">
                  {item.description}
                </span>
              </CardDescription>
            </CardContent>
             <CardHeader className="gap-0">
              <div
                className={cn(
                  "grid grid-cols-2 grid-rows-2 w-full border-b",
                  DASHED_BORDER
                )}
              >
                {item.techStacks?.slice(0, 4).map((tech, i) => {
                  const TechIcon = getTechIcon(tech);
                  const isLeftColumn = i % 2 === 0;
                  const isTopRow = i < 2;
                  const hasMultipleRows = item.techStacks && item.techStacks.length > 2;

                  return (
                    <div
                      key={tech}
                      className={cn(
                        "flex items-center px-2 py-2",
                        isLeftColumn && `border-r ${DASHED_BORDER}`,
                        isTopRow && hasMultipleRows && `border-b ${DASHED_BORDER}`
                      )}
                    >
                      <TechIcon
                        size={16}
                        className="mr-2 size-4 text-muted-foreground"
                      />
                      <span className="text-sm text-muted-foreground truncate">
                        {tech}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardHeader>

            <CardFooter className="flex w-full flex-col items-stretch p-0">
              <ProjectButton
                label="Live Demo"
                url={item.websiteUrl}
                comingSoon={item.comingSoon}
                eventName="project_live_demo_clicked"
                itemTitle={item.title}
                borderBottom
              />
              <ProjectButton
                label="GitHub"
                url={item.githubUrl}
                comingSoon={item.comingSoon}
                eventName="project_github_clicked"
                itemTitle={item.title}
                srOnlySuffix="repository for"
              />
            </CardFooter>
          </div>
          <SideBorder position="right" />
        </div>
      </Card>
    </BrowserWrapper>
  );
}

// Sub-components

type SideBorderProps = {
  position: "left" | "right";
};

const SideBorder = ({ position }: SideBorderProps) => (
  <div
    className={cn(
      "flex w-4 flex-none flex-col",
      DASHED_BORDER,
      position === "left" ? "border-r" : "border-l"
    )}
  />
);

type ProjectButtonProps = {
  label: string;
  url?: string;
  comingSoon?: boolean;
  eventName: string;
  itemTitle: string;
  borderBottom?: boolean;
  srOnlySuffix?: string;
};

/**
 * Helper component for project action buttons (Demo, GitHub).
 */
const ProjectButton = ({
  label,
  url,
  comingSoon,
  eventName,
  itemTitle,
  borderBottom,
  srOnlySuffix,
}: ProjectButtonProps) => {
  const isDisabled = !url || url === "#";

  return (
    <div
      className={cn(
        "flex w-full px-2 py-2",
        borderBottom && `border-b ${DASHED_BORDER}`
      )}
    >
      <Button
        asChild={!comingSoon && !isDisabled}
        disabled={comingSoon || isDisabled}
        className="w-full"
        variant="outline"
        title={isDisabled ? `No ${label.toLowerCase()} URL` : undefined}
        onClick={() => {
          if (comingSoon || isDisabled) return;
          trackEvent({
            name: eventName,
            properties: {
              project_title: itemTitle,
              [eventName === "project_github_clicked"
                ? "github_url"
                : "project_url"]: url ?? "",
            },
          });
        }}
      >
        {comingSoon || isDisabled ? (
          <span>{label}</span>
        ) : (
          <Link target="_blank" rel="noopener noreferrer" href={url}>
            {label}
            <span className="sr-only">
              {srOnlySuffix ? `${srOnlySuffix} ` : "of "}
              {itemTitle}
            </span>
          </Link>
        )}
      </Button>
    </div>
  );
};

type ThumbnailImageProps = {
  imageUrl: string;
  imageAlt: string;
  sizes?: string;
};

const ThumbnailImage = ({
  imageUrl,
  imageAlt,
  sizes,
}: ThumbnailImageProps) => {
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <ImageWithLoader
        alt={imageAlt || "Card image"}
        src={imageUrl || ""}
        width={600}
        height={338}
        className="h-full w-full rounded-none object-cover"
        sizes={sizes || "(max-width: 1023px) 100vw, 33vw"}
        priority={false}
      />
    </div>
  );
};
