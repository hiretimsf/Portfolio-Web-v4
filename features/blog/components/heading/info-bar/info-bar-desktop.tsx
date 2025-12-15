import CalendarIcon from "@/features/common/icons/calendar-icon";
import ClockIcon from "@/features/common/icons/clock-icon";
import FolderIcon from "@/features/common/icons/folder-icon";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import type { FC } from "react";
import { getMinutes } from "@/features/blog/lib/get-minutes";

interface InfoBarDetailDesktopProps {
  authorImage: string;
  authorName: string;
  date: string;
  category: string;
  readTime: number;
  className?: string;
}

const InfoBarDetailDesktop: FC<InfoBarDetailDesktopProps> = ({
  authorImage,
  authorName,
  date,
  category,
  readTime,
  className,
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-3xl flex-row items-center justify-start gap-4 pt-2",
        className,
      )}
    >
      <div className="flex flex-row items-center gap-1">
        <Image
          src={authorImage}
          alt={authorName}
          width="24"
          height="24"
          className="size-6 rounded-full"
          loading="lazy"
        />

        <span className="text-md text-foreground flex font-medium">
          {authorName}
        </span>
      </div>
      <Separator orientation="vertical" className="bg-border h-4 w-px" />
      <div className="inline-flex items-center gap-2">
        <FolderIcon size={20} className="size-5" aria-hidden="true" />
        <span className="text-md">{category}</span>
      </div>
      <Separator orientation="vertical" className="bg-border h-4 w-px" />
      <div className="inline-flex items-center gap-2">
        <CalendarIcon className="size-5" aria-hidden="true" />
        <span className="text-md">
          {format(parseISO(date), "MMM dd, yyyy")}
        </span>
      </div>
      <Separator orientation="vertical" className="bg-border h-4 w-px" />
      <div className="inline-flex items-center gap-2">
        <ClockIcon className="size-5" aria-hidden="true" />
        <span className="text-md">{getMinutes(readTime)}</span>
      </div>
    </div>
  );
};

export default InfoBarDetailDesktop;
