"use client";

import BrowserWrapper from "@/components/common/BrowserWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectType } from "@/features/projects/types/ProjectType";
import { CalendarIcon, TechStackIcon } from "@/components/common/Icons";
import { cn, trackEvent, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ImageWithLoader from "@/components/common/ImageWithLoader";

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

const dashedBorder = "border-dashed border-black/10 dark:border-white/10";

/**
 * Displays a project portfolio item with thumbnail, details, and action buttons.
 */
export default function ProjectCardItem({
  index,
  item,
  sizes,
}: ProjectCardItemProps) {
  const href = item.websiteUrl ?? item.githubUrl ?? "#";

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
            dashedBorder
          )}
        >
          <SideBorder position="left" />
          <div className="flex flex-1 flex-col">
            <CardHeader className="gap-0">
              <div
                className={cn(
                  "flex w-full py-2 flex-row items-center border-b",
                  dashedBorder
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
                  dashedBorder
                )}
              >
                <div
                  className={cn(
                    "flex items-center px-2 py-2 border-r",
                    dashedBorder
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
                  <TechStackIcon
                    size={16}
                    className="mr-2 size-4 text-muted-foreground"
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.category || "Uncategorized"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription
                className={cn("border-b px-2 py-2", dashedBorder)}
              >
                <span className="line-clamp-3 text-left text-md leading-6 text-muted-foreground">
                  {item.description}
                </span>
              </CardDescription>
            </CardContent>
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

const SideBorder = ({ position }: { position: "left" | "right" }) => (
  <div
    className={cn(
      "flex w-4 flex-none flex-col",
      dashedBorder,
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
  if (!url || (url === "#" && !comingSoon)) return null;

  return (
    <div
      className={cn(
        "flex w-full px-2 py-2",
        borderBottom && `border-b ${dashedBorder}`
      )}
    >
      <Button
        asChild={!comingSoon}
        disabled={comingSoon}
        className="w-full"
        variant="outline"
        onClick={() => {
          if (comingSoon) return;
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
        {comingSoon ? (
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

const ThumbnailImage = ({
  imageUrl,
  imageAlt,
  sizes,
}: {
  imageUrl: string;
  imageAlt: string;
  sizes?: string;
}) => {
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
