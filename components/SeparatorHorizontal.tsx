import { cn } from "@/lib/utils";

interface SeparatorHorizontalProps {
  className?: string;
  borderBottom?: boolean;
  borderTop?: boolean;
}

export default function SeparatorHorizontal({
  className,
  borderBottom = true,
  borderTop = true,
}: SeparatorHorizontalProps) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:left-1/2 before:-translate-x-1/2 before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:color-mix(in_oklab,var(--color-edge)_56%,transparent)]",
        borderBottom && "before:border-b before:border-edge",
        borderTop && "before:border-t before:border-edge",
        className,
      )}
    />
  );
}
