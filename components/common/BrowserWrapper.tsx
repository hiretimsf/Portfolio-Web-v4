import { cn } from "@/lib/utils";
import React, { type FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BrowserWrapper: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("group bg-accent shadow-md border-black/10 dark:border-white/10 border text-sm", className)}>
      <div className="flex gap-2 p-2">
        <span className="size-3 rounded-full bg-red-500"></span>
        <span className="size-3 rounded-full bg-yellow-500"></span>
        <span className="size-3 rounded-full bg-green-500 "></span>
      </div>
      <div className="border-black/10 dark:border-white/10 bg-background dark:bg-accent/50 border border-r-0 border-b-0 border-l-0">
        {children}
      </div>
    </div>
  );
};

export default BrowserWrapper;
