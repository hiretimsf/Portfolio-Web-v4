import { getMinutes } from "@/features/blog/lib/get-minutes";
import CalendarIcon from "@/features/common/icons/calendar-icon";
import ClockIcon from "@/features/common/icons/clock-icon";
import FolderIcon from "@/features/common/icons/folder-icon";
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
    <div className={cn("inline-flex items-center gap-2 px-6 py-4", className)}>
      {Icon && (
        <Icon className={cn("size-5", iconClassName)} aria-hidden="true" />
      )}
      {children}
      <span className="text-sm">{text}</span>
    </div>
  );
};

interface BlogPostMetaDataProps {
  authorImage: string;
  authorName: string;
  date: string;
  category: string;
  readTime: number;
  className?: string;
}

const BlogPostMetaData: FC<BlogPostMetaDataProps> = ({
  authorImage,
  authorName,
  date,
  category,
  readTime,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop View */}
      <div className="hidden sm:flex mx-auto w-full max-w-5xl flex-row items-center justify-start divide-x divide-border-edge divide-dashed">
        <InfoBarItem
          text={
            <span className="font-medium text-foreground">{authorName}</span>
          }
        >
          <Image
            src={authorImage}
            alt={authorName}
            width={24}
            height={24}
            className="size-6 rounded-full"
            loading="lazy"
          />
        </InfoBarItem>

        <InfoBarItem icon={FolderIcon} text={category} />

        <InfoBarItem
          icon={CalendarIcon}
          text={format(parseISO(date), "MMM dd, yyyy")}
        />

        <InfoBarItem icon={ClockIcon} text={getMinutes(readTime)} />
      </div>

      {/* Mobile View */}
      <div className="sm:hidden grid grid-cols-2 items-center justify-start divide-x divide-border-edge divide-dashed">
        <InfoBarItem
          className="border-b border-border-edge border-dashed"
          text={
            <span className="font-medium text-foreground">{authorName}</span>
          }
        >
          <Image
            src={authorImage}
            alt={authorName}
            width={24}
            height={24}
            className="size-6 rounded-full"
            loading="lazy"
          />
        </InfoBarItem>

        <InfoBarItem
          icon={FolderIcon}
          text={category}
          className="border-b border-border-edge border-dashed"
        />

        <InfoBarItem
          icon={CalendarIcon}
          text={format(parseISO(date), "MMM dd, yyyy")}
        />

        <InfoBarItem icon={ClockIcon} text={getMinutes(readTime)} />
      </div>
    </div>
  );
};

export default BlogPostMetaData;
