import { cn } from "@/lib/utils";

interface HeadingTitleProps {
  title: string;
  textStyleClassName?: string;
  gridId?: string;
}
export default function HeadingTitle({
  title,
  textStyleClassName = "text-3xl sm:text-4xl font-bold",
  gridId = "grid-default",
}: HeadingTitleProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full justify-center px-6 py-8 text-muted-foreground/20 md:py-4 lg:px-8",
      )}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full mask-[radial-gradient(circle_at_50%_0,black,transparent_80%)]"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient
            id={`${gridId}-fade`}
            x1="0"
            y1="0"
            x2="0"
            y2="2"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="black" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <mask id={`${gridId}-mask`}>
            <rect width="100%" height="100%" fill={`url(#${gridId}-fade)`} />
          </mask>
          <pattern
            id={gridId}
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              stroke="currentColor"
              fill="transparent"
              strokeWidth="2"
            ></path>
          </pattern>
        </defs>
        <rect
          fill={`url(#${gridId})`}
          width="100%"
          height="100%"
          mask={`url(#${gridId}-mask)`}
        ></rect>
      </svg>
      <h2
        className={cn(
          "text-foreground relative mx-auto text-center tracking-tight",
          textStyleClassName,
        )}
      >
        {title}
      </h2>
    </div>
  );
}
