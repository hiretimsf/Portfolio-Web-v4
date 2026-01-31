"use client";

import { useState } from "react";
import BrowserWrapper from "@/components/common/BrowserWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BlogPostType } from "@/features/blog/types/BlogPostType";
import {
  CalendarIcon,
  ClockIcon,
  FolderIcon,
} from "@/components/common/Icons";
import { cn, formatDate, trackEvent, getShimmerDataUrl } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ImageWithLoader from "@/components/common/ImageWithLoader";

const DASHED_BORDER = "border-dashed border-black/10 dark:border-white/10";

type BlogCardItemProps = {
  index: number;
  item: Omit<BlogPostType, "body">;
  sizes?: string;
};

export default function BlogCardItem({ index, item, sizes }: BlogCardItemProps) {
  const href = `/blog/post/${item.slug}`;

  return (
    <BrowserWrapper>
      <Card
        className="h-full gap-0 py-0 transition-all duration-300 rounded-xl corner-squircle border-none"
        role="article"
        aria-labelledby={`card-title-${index}`}
      >
        <CoverImage
          imageUrl={item.thumbnail || `/images/blog/${item.slug}/thumbnail.jpg`}
          imageAlt={item.imageAlt || item.title}
          href={href}
          sizes={sizes}
        />

        <div className={cn("flex w-full items-stretch justify-between border-t", DASHED_BORDER)}>
          <SideBorder position="left" />
          <div className="flex flex-1 flex-col">
            <CardHeader className="gap-0">
              <div className={cn("flex w-full py-2 flex-row items-center border-b", DASHED_BORDER)}>
                <Link href={href} className="group/title">
                  <CardTitle
                    id={`card-title-${index}`}
                    className="line-clamp-2 px-2 text-left text-lg font-semibold leading-tight text-foreground group-hover/title:text-primary"
                  >
                    {item.title}
                  </CardTitle>
                </Link>
              </div>
              <div className={cn("grid grid-cols-2 grid-rows-1 w-full border-b", DASHED_BORDER)}>
                <MetaCell icon={<CalendarIcon size={16} className="mr-2 size-4 text-muted-foreground" />} bordered>
                  {item.created ? formatDate(item.created as string) : "No date"}
                </MetaCell>
                <MetaCell icon={<ClockIcon size={16} className="mr-2 size-4 text-muted-foreground" />}>
                  {item.readingTimeMinutes !== undefined ? `${item.readingTimeMinutes} min` : "N/A"}
                </MetaCell>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="my-2 line-clamp-3 px-2 text-left text-md leading-6 text-muted-foreground">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex w-full flex-col items-stretch p-0">
              <div className={cn("grid grid-cols-2 grid-rows-1 w-full border-t", DASHED_BORDER)}>
                <MetaCell
                  icon={
                    item.author ? (
                      <div className="relative size-5 shrink-0 overflow-hidden rounded-full mr-2">
                        <Image
                          src={item.authorAvatar || ""}
                          alt={item.author}
                          fill
                          className="object-cover"
                          sizes="16px"
                          placeholder="blur"
                          blurDataURL={getShimmerDataUrl(16, 16)}
                        />
                      </div>
                    ) : null
                  }
                  bordered
                >
                  {item.author || "No author"}
                </MetaCell>
                <MetaCell icon={<FolderIcon size={16} className="mr-2 size-4 text-muted-foreground" />}>
                  {item.category || "Uncategorized"}
                </MetaCell>
              </div>
              <div className={cn("flex w-full border-t px-2 py-2", DASHED_BORDER)}>
                <Button
                  variant="outline"
                  asChild
                  className="w-full"
                  onClick={() => {
                    trackEvent({
                      name: "blog_post_read_more_clicked",
                      properties: {
                        post_title: item.title,
                        post_slug: item.slug,
                      },
                    });
                  }}
                >
                  <Link href={href} className="group/btn flex items-center gap-1">
                    Read more
                    <span className="sr-only">about {item.title}</span>
                    <ArrowRightIcon className="size-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </div>
          <SideBorder position="right" />
        </div>
      </Card>
    </BrowserWrapper>
  );
}

// Sub-components

function MetaCell({
  icon,
  bordered,
  children,
}: {
  icon: React.ReactNode;
  bordered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center px-2 py-2", bordered && cn("border-r", DASHED_BORDER))}>
      {icon}
      <span className="text-sm text-muted-foreground">{children}</span>
    </div>
  );
}

function SideBorder({ position }: { position: "left" | "right" }) {
  return (
    <div
      className={cn(
        "flex w-4 flex-none flex-col",
        DASHED_BORDER,
        position === "left" ? "border-r" : "border-l",
      )}
    />
  );
}

function CoverImage({
  imageUrl,
  imageAlt,
  href,
  sizes,
}: {
  imageUrl: string;
  imageAlt: string;
  href?: string;
  sizes?: string;
}) {
  const [src, setSrc] = useState(imageUrl);

  const content = (
    <div className="relative aspect-video w-full overflow-hidden">
      <ImageWithLoader
        alt={imageAlt || "Card image"}
        src={src || ""}
        width={600}
        height={338}
        className="h-full w-full rounded-none object-cover"
        sizes={sizes || "(max-width: 1023px) 100vw, 33vw"}
        priority={false}
        onError={() => setSrc("/images/placeholder.jpg")}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block cursor-pointer">
        {content}
      </Link>
    );
  }

  return content;
}
