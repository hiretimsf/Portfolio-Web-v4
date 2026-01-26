import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  borderBottom?: boolean;
  borderTop?: boolean;
  short?: boolean;
}

export default function Divider({
  className,
  borderBottom = true,
  borderTop = true,
  short = false,
}: DividerProps) {
  return (
    <div
      className={cn(
        "relative flex w-full",
        short ? "h-4" : "h-8",
        "before:absolute before:left-1/2 before:-translate-x-1/2 before:-z-1 before:w-screen",
        short ? "before:h-4" : "before:h-8",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:color-mix(in_oklab,var(--color-edge)_56%,transparent)]",
        borderBottom && "before:border-b before:border-edge",
        borderTop && "before:border-t before:border-edge",
        className,
      )}
    />
  );
}