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
import type { BlogPostType } from "@/features/blog/types/BlogPostType";
import {
  DateIcon,
  ReadingTimeIcon,
  FolderIcon,
} from "@/components/common/Icons";
import { cn, formatDate, trackEvent } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        className={cn(
          "h-full gap-0 py-0 transition-all duration-300 rounded-xl corner-squircle border-none",
        )}
        role="article"
        aria-labelledby={`card-title-${index}`}
      >
        <CoverImage
          imageUrl={item.thumbnail || item.image}
          imageAlt={item.imageAlt || item.title}
          href={href}
          sizes={sizes}
        />

        <div className="flex w-full items-stretch justify-between border-t border-dashed border-black/10 dark:border-white/10">
          <SideBorder position="left" />
          <div className="flex flex-1 flex-col">
            <CardHeader className="gap-0">
              <div className="flex w-full py-2 flex-row items-center border-b border-dashed border-black/10 dark:border-white/10">
                <Link href={href} className="group/title">
                  <CardTitle
                    id={`card-title-${index}`}
                    className="line-clamp-2 px-2 text-left text-lg font-semibold leading-tight text-foreground group-hover/title:text-primary"
                  >
                    {item.title}
                  </CardTitle>
                </Link>
              </div>
              <div className="grid grid-cols-2 grid-rows-1 w-full border-b border-dashed border-black/10 dark:border-white/10">
                <div className="flex items-center px-2 py-2 border-r border-dashed border-black/10 dark:border-white/10">
                  <DateIcon size={20} className="mr-2 size-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {item.created ? formatDate(item.created as string) : "No date"}
                  </span>
                </div>
                <div className="flex items-center px-2 py-2">
                  <ReadingTimeIcon
                    size={20}
                    className="mr-2 size-5 text-muted-foreground"
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.readingTimeMinutes !== undefined ? `${item.readingTimeMinutes} min` : "N/A"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="my-2 line-clamp-3 px-2 text-left text-md leading-6 text-muted-foreground">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex w-full flex-col items-stretch p-0">
              <div className="grid grid-cols-2 grid-rows-1 w-full border-y border-dashed border-black/10 dark:border-white/10">
                <div className="flex items-center px-2 py-2 border-r border-dashed border-black/10 dark:border-white/10">
                  {item.author ? (
                    <>
                      <div className="relative size-5 shrink-0 overflow-hidden rounded-full mr-2">
                        <Image
                          src={item.authorAvatar || ""}
                          alt={item.author}
                          fill
                          className="object-cover"
                          sizes="20px"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.author}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">No author</span>
                  )}
                </div>
                <div className="flex items-center px-2 py-2">
                  <FolderIcon size={20} className="mr-2 size-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {item.category || "Uncategorized"}
                  </span>
                </div>
              </div>
              <div className="flex w-full border-t border-dashed border-black/10 dark:border-white/10 px-2 py-2">
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
  href,
  sizes,
}: {
  imageUrl: string;
  imageAlt: string;
  href?: string;
  sizes?: string;
}) => {
  const content = (
    <div className="relative aspect-video w-full overflow-hidden">
      <Image
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

  if (href) {
    return (
      <Link href={href} className="block cursor-pointer">
        {content}
      </Link>
    );
  }

  return content;
};
