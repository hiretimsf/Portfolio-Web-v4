import Link from "next/link";
import { type FC, useId } from "react";

interface Props {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  external?: boolean;
}

const CardItem: FC<Props> = ({
  href,
  title,
  description,
  icon: Icon,
  external,
}) => {
  const patternId = useId();

  return (
    <Link
      className="group border-border bg-accent/50 hover:bg-accent relative flex flex-col justify-center overflow-hidden rounded-xl border  transition-all duration-200"
      href={href}
      aria-label={`${title} - ${description}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        <div className="absolute -inset-1/4 -skew-y-6 mask-[linear-gradient(225deg,black,transparent_50%)]">
          <svg
            className="pointer-events-none absolute inset-0 translate-y-2 transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            width="100%"
            height="100%"
          >
            <defs>
              <pattern
                id={patternId}
                x="-1"
                y="-15"
                width="46"
                height="46"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 46 0 L 0 0 0 46"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect fill={`url(#${patternId})`} width="100%" height="100%" />
          </svg>
        </div>
      </div>
      <div className="relative flex flex-col gap-1 px-5 py-4 z-10">
        <div className="inline-flex items-center gap-1">
          <Icon
            className="text-foreground group-hover:text-accent-foreground size-5 transition-colors duration-200"
            aria-hidden="true"
          />
          <span className="text-foreground group-hover:text-accent-foreground text-sm font-medium">
            {title}
          </span>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default CardItem;
