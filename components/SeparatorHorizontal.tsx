import { cn } from "@/lib/utils";

interface SeparatorHorizontalProps {
  className?: string;
  borderBottom?: boolean;
  borderTop?: boolean;
  short?: boolean;
}

export default function SeparatorHorizontal({
  className,
  borderBottom = true,
  borderTop = true,
  short = false,
}: SeparatorHorizontalProps) {
  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden",
        short ? "h-4" : "h-8",
        "before:absolute before:inset-0 before:w-screen before:left-1/2 before:-translate-x-1/2 before:-z-1",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]",
        "before:bg-size-[10px_10px]",
        "before:[--pattern-foreground:color-mix(in_oklab,var(--color-edge)_40%,transparent)]",
        borderBottom && "border-b border-edge",
        borderTop && "border-t border-edge",
        className,
      )}
    />
  );
}
