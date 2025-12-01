"use client";

import { memo } from "react";
import Masonry from "react-masonry-css";
import { cn } from "@/lib/utils";

type MasonryGridProps = {
  children: React.ReactNode;
  className?: string;
};

export default memo(function MasonryGrid({
  children,
  className,
}: MasonryGridProps) {
  return (
    <Masonry
      breakpointCols={{ default: 3, 1200: 2, 768: 1 }}
      className={cn("flex w-auto gap-4", className)}
      columnClassName="space-y-4"
    >
      {children}
    </Masonry>
  );
});
