import { cn } from "@/lib/utils";

interface BackgroundDotsProps {
  gridId?: string;
  fadeBottomMask?: boolean;
  className?: string;
}
export default function BackgroundDots({
  gridId = "dots-default",
  className,
  fadeBottomMask,
}: BackgroundDotsProps) {
  const patternId = `dots-${gridId}`;
  const gradientId = `fade-bottom-${gridId}`;
  const maskId = `fade-bottom-mask-${gridId}`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-[-1] h-full w-full pt-1 text-gray-100/10 dark:text-gray-100/10",
        className,
      )}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id={patternId}
          x="-1"
          y="-1"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" y="1" width="2" height="2" fill="currentColor"></rect>
        </pattern>
        {fadeBottomMask && (
          <>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1"></stop>
              <stop offset="75%" stopColor="white" stopOpacity="0.6"></stop>
              <stop offset="100%" stopColor="white" stopOpacity="0"></stop>
            </linearGradient>
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
            >
              <rect
                width="100%"
                height="100%"
                fill={`url(#${gradientId})`}
              ></rect>
            </mask>
          </>
        )}
      </defs>
      <rect
        fill={`url(#${patternId})`}
        width="100%"
        height="100%"
        {...(fadeBottomMask && { mask: `url(#${maskId})` })}
      ></rect>
    </svg>
  );
}
