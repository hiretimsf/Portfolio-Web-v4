import { getMinutes } from "@/features/blog/lib/get-minutes";
import {
  CalendarIcon,
  FolderIcon,
  ClockIcon,
  CommentIcon,
  EyeIcon,
} from "@/components/common/Icons";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import type { ElementType, FC, ReactNode } from "react";

interface InfoBarItemProps {
  icon?: ElementType;
  iconClassName?: string;
  text: ReactNode;
  className?: string;
  children?: ReactNode;
}

const InfoBarItem: FC<InfoBarItemProps> = ({
  icon: Icon,
  iconClassName,
  text,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-6 py-2",
        className,
      )}
    >
      {Icon && (
        <Icon
          className={cn("size-4 text-muted-foreground", iconClassName)}
          aria-hidden="true"
        />
      )}
      {children}
      <span className="text-sm">{text}</span>
    </div>
  );
};

/**
 * Displays metadata for a blog post including author, date, category, and stats.
 */
interface BlogPostMetaDataProps {
  authorImage: string;
  authorName: string;
  date: string;
  category: string;
  readTime: number;
  comments?: number;
  views?: number;
  className?: string;
}

/**
 * A responsive metadata bar for blog posts.
 * Renders a row layout on desktop and a grid layout on mobile.
 */
const BlogPostMetaData: FC<BlogPostMetaDataProps> = ({
  authorImage,
  authorName,
  date,
  category,
  readTime,
  comments = 0,
  views = 0,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop View */}
      <div className="hidden sm:flex mx-auto w-full max-w-5xl flex-row items-center justify-start divide-x divide-black/10 dark:divide-white/10">
        <InfoBarItem
          text={
            <span className="font-medium text-foreground">{authorName}</span>
          }
        >
          <Image
            src={authorImage}
            alt={authorName}
            width={16}
            height={16}
            className="size-4 rounded-full"
            loading="lazy"
          />
        </InfoBarItem>

        <InfoBarItem icon={FolderIcon} text={category} />

        <InfoBarItem
          icon={CalendarIcon}
          text={format(parseISO(date), "MMM dd, yyyy")}
        />

        <InfoBarItem icon={ClockIcon} text={getMinutes(readTime)} />
        <InfoBarItem icon={CommentIcon} text={`${comments} Comments`} />
        <InfoBarItem icon={EyeIcon} text={`${views} Views`} />
      </div>

      {/* Mobile View */}
      <div className="sm:hidden grid grid-cols-2 items-center justify-start border-black/10 dark:border-white/10">
        <InfoBarItem
          className="border-b border-r border-dashed border-black/10 dark:border-white/10"
          text={
            <span className="font-medium text-foreground">{authorName}</span>
          }
        >
          <Image
            src={authorImage}
            alt={authorName}
            width={16}
            height={16}
            className="size-4 rounded-full"
            loading="lazy"
          />
        </InfoBarItem>

        <InfoBarItem
          icon={FolderIcon}
          text={category}
          className="border-b border-dashed border-black/10 dark:border-white/10"
        />

        <InfoBarItem
          icon={CalendarIcon}
          text={format(parseISO(date), "MMM dd, yyyy")}
          className="border-b border-r border-dashed border-black/10 dark:border-white/10"
        />

        <InfoBarItem
          icon={ClockIcon}
          text={getMinutes(readTime)}
          className="border-b border-dashed border-black/10 dark:border-white/10"
        />

        <InfoBarItem
          icon={CommentIcon}
          text={`${comments} Comments`}
          className="border-r border-dashed border-black/10 dark:border-white/10"
        />
        <InfoBarItem icon={EyeIcon} text={`${views} Views`} />
      </div>
    </div>
  );
};

export default BlogPostMetaData;
