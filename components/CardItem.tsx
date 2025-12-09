import BrowserWrapper from "@/components/BrowserWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BlogPostItemType } from "@/features/blog/types/BlogPostItem";
import type { ProjectType } from "@/features/projects/types/ProjectType";
import CalendarIcon from "@/icons/calendar-icon";
import DateIcon from "@/icons/date-icon";
import ReadingTimeIcon from "@/icons/reading-time-icon";
import { formatDate, slugify } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type CardItemProps =
  | {
      index: number;
      type: "project";
      item: ProjectType;
    }
  | {
      index: number;
      type: "blog";
      item: BlogPostItemType;
    };

export default function CardItem({ index, item, type }: CardItemProps) {
  const isBlog = type === "blog";
  const href = isBlog ? `/blog/${slugify(item.title)}` : undefined;

  return (
    <Card
      className={cn(
        "h-full gap-0 rounded-md border-x border-b border-border-edge py-0 transition-all duration-300",
        isBlog ? "shadow-md hover:border-muted-foreground/40" : "shadow-lg",
      )}
      role="article"
      aria-labelledby={`card-title-${index}`}
    >
      <CoverImage
        index={index}
        imageUrl={isBlog ? item.image : item.imageUrl}
        imageAlt={item.imageAlt || item.title}
        href={href}
      />

      <div className="flex w-full items-stretch justify-between">
        <SideBorder position="left" />
        <div className="flex flex-1 flex-col">
          {isBlog ? (
            <BlogContent item={item} index={index} />
          ) : (
            <ProjectContent item={item} index={index} />
          )}
        </div>
        <SideBorder position="right" />
      </div>
    </Card>
  );
}

// Sub-components

const SideBorder = ({ position }: { position: "left" | "right" }) => (
  <div
    className={cn(
      "flex w-4 flex-none flex-col border-dashed border-border-edge",
      position === "left" ? "border-r" : "border-l",
    )}
  />
);

const CoverImage = ({
  index,
  imageUrl,
  imageAlt,
  href,
}: {
  index: number;
  imageUrl: string;
  imageAlt: string;
  href?: string;
}) => {
  const content = (
    <BrowserWrapper>
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          alt={imageAlt || "Card image"}
          src={imageUrl || "/images/app-placeholder.jpg"}
          width={1000}
          height={500}
          className="h-full w-full rounded-none object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index !== undefined && index < 3}
        />
      </div>
    </BrowserWrapper>
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

const BlogContent = ({
  item,
  index,
}: {
  item: BlogPostItemType;
  index: number;
}) => {
  const href = `/blog/${slugify(item.title)}`;
  return (
    <>
      <CardHeader className="gap-0">
        <div className="mb-2 flex w-full flex-row items-center border-b border-dashed border-border-edge">
          <div className="flex items-center px-2 py-2">
            <DateIcon size={20} className="mr-2 size-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {item.created ? formatDate(item.created as string) : "No date"}
            </span>
          </div>

          {item.readingTimeMinutes !== undefined && (
            <>
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-4 border-dashed border-border-edge"
              />
              <div className="flex items-center px-2 py-2">
                <ReadingTimeIcon
                  size={20}
                  className="mr-2 size-5 text-muted-foreground"
                />
                <span className="text-sm text-muted-foreground">
                  {item.readingTimeMinutes} min
                </span>
              </div>
            </>
          )}
        </div>
        <Link href={href} className="group/title">
          <CardTitle
            id={`card-title-${index}`}
            className="line-clamp-2 px-2 text-left text-lg font-bold leading-tight text-foreground group-hover/title:text-primary"
          >
            {item.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <CardDescription className="my-2 line-clamp-3 px-2 text-left text-sm text-muted-foreground">
          {item.description}
        </CardDescription>
        <div className="flex items-center justify-between border-t border-dashed border-border-edge px-2 py-2">
          <div className="flex items-center space-x-2">
            {item.author && (
              <>
                <Avatar className="size-6">
                  <AvatarImage src={item.authorAvatar} alt={item.author} />
                  <AvatarFallback>
                    <UserIcon className="size-3 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-muted-foreground">
                  {item.author}
                </span>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 px-2 text-sm hover:bg-transparent hover:text-primary"
          >
            <Link href={href} className="group/btn flex items-center gap-1">
              Read more
              <ArrowRightIcon className="size-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </>
  );
};

const ProjectContent = ({
  item,
  index,
}: {
  item: ProjectType;
  index: number;
}) => {
  return (
    <>
      <CardHeader className="gap-0 p-0">
        <CardTitle
          id={`project-title-${index}`}
          className="border-b border-dashed border-border-edge px-2 py-2 text-left text-lg/6 text-foreground"
        >
          {item.title}
        </CardTitle>
        <CardDescription className="border-b border-dashed border-border-edge px-2 py-2 text-left text-sm/6 text-muted-foreground">
          {item.fromDate ? (
            <div className="flex items-center">
              <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {item.fromDate} - {item.toDate}
              </span>
            </div>
          ) : null}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <CardDescription className="border-b border-dashed border-border-edge px-2 py-2">
          <span className="line-clamp-3 text-left text-sm/6 text-balance text-foreground">
            {item.description}
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex w-full flex-col items-stretch p-0">
        {item.websiteUrl && item.websiteUrl !== "#" && (
          <div className="flex w-full border-b border-dashed border-border-edge px-2 py-2">
            <Button asChild className="w-full" variant="outline">
              <Link href={item.websiteUrl}>Live Demo</Link>
            </Button>
          </div>
        )}
        {item.githubUrl && (
          <div className="flex w-full px-2 py-2">
            <Button asChild className="w-full">
              <Link href={item.githubUrl}>GitHub</Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </>
  );
};
