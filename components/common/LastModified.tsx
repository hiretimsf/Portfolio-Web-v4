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
        "relative mx-auto flex w-full justify-center text-muted-foreground/20",
      )}
    >

      <p className="w-full max-w-2xl border-0 md:border-x border-black/10 dark:border-white/10 border-dashed text-muted-foreground font-mono relative text-md mx-auto text-center tracking-tight py-4">
        Last updated: {format(new Date(lastModified), "MMMM d, yyyy")}
      </p>
    </div>
  );
}
