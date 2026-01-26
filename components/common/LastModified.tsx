import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface LastModifiedProps {
  lastModified: string | number | Date;
  textStyleClassName?: string;
}
export default function LastModified({ lastModified }: LastModifiedProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full justify-center px-6 py-8 text-muted-foreground/20 md:py-4 lg:px-8",
      )}
    >
      <p className="text-muted-foreground font-mono relative text-md mx-auto text-center tracking-tight">
        Last updated: {format(new Date(lastModified), "MMMM d, yyyy")}
      </p>
    </div>
  );
}
