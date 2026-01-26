import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link";
import type { FC } from "react";

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
  return (
    <NavigationMenuLink asChild>
      <Link
        className="group border-border-edge bg-accent/50 hover:bg-accent relative flex flex-col justify-center overflow-hidden border transition-all duration-200"
        href={href}
        aria-label={`${title} - ${description}`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <div className="relative flex flex-col gap-1 px-4 py-2 z-10">
          <div className="inline-flex items-center gap-1">
            <Icon
              className="text-foreground group-hover:text-accent-foreground size-4 transition-colors duration-200"
              aria-hidden="true"
            />
            <span className="text-foreground group-hover:text-accent-foreground text-sm font-medium">
              {title}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </Link>
    </NavigationMenuLink>
  );
};

export default CardItem;
