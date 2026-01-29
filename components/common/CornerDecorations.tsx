import { cn } from "@/lib/utils";

const CORNER_POSITIONS = [
  "top-[-3.5px] left-[-4.5px]",
  "top-[-3.5px] right-[-4.5px]",
  "bottom-[-3.5px] left-[-4.5px]",
  "bottom-[-3.5px] right-[-4.5px]",
];

export default function CornerDecorations({
  className,
  top,
  bottom,
}: {
  className?: string;
  top?: boolean;
  bottom?: boolean;
}) {
  const hasSide = top !== undefined || bottom !== undefined;
  const showTop = hasSide ? !!top : true;
  const showBottom = hasSide ? !!bottom : true;

  return (
    <>
      {CORNER_POSITIONS.map((position) => {
        if (position.includes("top") && !showTop) return null;
        if (position.includes("bottom") && !showBottom) return null;

        return (
          <div
            key={position}
            className={cn(
              "absolute size-2 rounded-xs border bg-popover",
              position,
              className
            )}
          />
        );
      })}
    </>
  );
}
