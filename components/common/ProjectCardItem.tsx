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
import { CalendarIcon } from "@/components/common/Icons";
import { cn, trackEvent } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ProjectCardItemProps = {
  index: number;
  item: ProjectType;
  sizes?: string;
};

export default function ProjectCardItem({ index, item, sizes }: ProjectCardItemProps) {
  return (
    <BrowserWrapper>
      <Card
        className={cn(
          "h-full gap-0 py-0 transition-all duration-300 rounded-xl corner-squircle border-none",
        )}
        role="article"
        aria-labelledby={`card-title-${index}`}
      >
        <CoverImage
          index={index}
          imageUrl={item.imageUrl}
          imageAlt={item.imageAlt || item.title}
          sizes={sizes}
        />

        <div className="flex w-full items-stretch justify-between border-t border-dashed border-black/10 dark:border-white/10">
          <SideBorder position="left" />
          <div className="flex flex-1 flex-col">
            <CardHeader className="gap-0 p-0">
              <div className="border-b border-dashed border-black/10 dark:border-white/10 px-2 py-2 text-left text-sm/6 text-muted-foreground">
                {item.comingSoon ? (
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-mono">
                      Coming Soon
                    </span>
                  </div>
                ) : item.fromDate ? (
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-mono">
                      {item.fromDate} - {item.toDate}
                    </span>
                  </div>
                ) : null}
              </div>
              <CardTitle
                id={`card-title-${index}`}
                className="border-b border-dashed border-black/10 dark:border-white/10 px-2 py-2 text-left text-lg/6 text-foreground"
              >
                {item.title}
              </CardTitle>

            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="border-b border-dashed border-black/10 dark:border-white/10 px-2 py-2">
                <span className="line-clamp-3 font-mono text-left text-md/6 text-muted-foreground text-pretty">
                  {item.description}
                </span>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex w-full flex-col items-stretch p-0">
              {item.websiteUrl && item.websiteUrl !== "#" && (
                <div className="flex w-full border-b border-dashed border-black/10 dark:border-white/10 px-2 py-2">
                  <Button
                    asChild={!item.comingSoon}
                    disabled={item.comingSoon}
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      if (item.comingSoon) return;
                      trackEvent({
                        name: "project_live_demo_clicked",
                        properties: {
                          project_title: item.title,
                          project_url: item.websiteUrl ?? "",
                        },
                      });
                    }}
                  >
                    {item.comingSoon ? (
                      <span>Live Demo</span>
                    ) : (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.websiteUrl}
                      >
                        Live Demo
                        <span className="sr-only">of {item.title}</span>
                      </Link>
                    )}
                  </Button>
                </div>
              )}
              {item.githubUrl && (
                <div className="flex w-full px-2 py-2">
                  <Button
                    asChild={!item.comingSoon}
                    disabled={item.comingSoon}
                    className="w-full"
                    onClick={() => {
                      if (item.comingSoon) return;
                      trackEvent({
                        name: "project_github_clicked",
                        properties: {
                          project_title: item.title,
                          github_url: item.githubUrl ?? "",
                        },
                      });
                    }}
                  >
                    {item.comingSoon ? (
                      <span>GitHub</span>
                    ) : (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.githubUrl}
                      >
                        GitHub
                        <span className="sr-only">repository for {item.title}</span>
                      </Link>
                    )}
                  </Button>
                </div>
              )}
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
      "flex w-4 flex-none flex-col border-dashed border-black/10 dark:border-white/10",
      position === "left" ? "border-r" : "border-l",
    )}
  />
);

const CoverImage = ({
  imageUrl,
  imageAlt,
  sizes,
}: {
  index: number;
  imageUrl: string;
  imageAlt: string;
  sizes?: string;
}) => {
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <Image
        alt={imageAlt || "Card image"}
        src={imageUrl || ""}
        width={600}
        height={338}
        className="h-full w-full rounded-none object-cover dark:grayscale"
        sizes={sizes || "(max-width: 1023px) 100vw, 33vw"}
        priority={false}
      />
    </div>
  );
};
