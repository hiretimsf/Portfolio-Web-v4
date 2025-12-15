import type { SocialLinkType } from "@/types";
import Link from "next/link";
import type { FC } from "react";
import AnimatedArrow from "@/components/header/desktop/navigations/AnimatedArrow";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

const SocialLink: FC<SocialLinkType> = ({ href, icon: Icon, label }) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        className="group hover:bg-accent -mx-2 rounded-[8px] p-2 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="border-border-edge bg-background shrink-0 rounded-[10px] border p-1.5">
            <Icon
              className="text-foreground group-hover:text-accent-foreground size-4 transition-colors duration-200"
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">
            <p className="text-foreground group-hover:text-accent-foreground text-sm font-medium">
              {label}
            </p>
          </div>
          <AnimatedArrow />
        </div>
      </Link>
    </NavigationMenuLink>
  );
};

export default SocialLink;
