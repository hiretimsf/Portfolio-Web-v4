"use client";

import dynamic from "next/dynamic";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import NAVIGATION_LINKS from "@/config/navigationLinks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { FC } from "react";
import React, { memo, Suspense, useCallback } from "react";
import NavigationAbout from "./navigations/about/NavigationAbout";
import { SearchButton } from "@/components/header/shared/SearchButton";

const LogoButton = dynamic(
  () => import("@/components/header/shared/LogoButton"),
  {
    ssr: false,
  },
);

const ThemeToggle = dynamic(
  () => import("@/components/header/shared/ThemeToggle"),
  {
    ssr: false,
  },
);

const GithubButton = dynamic(
  () => import("@/components/header/shared/GithubButton"),
  {
    ssr: false,
  },
);
interface Props {
  activePath: string;
}

// Reusable styles
const navItemStyles = {
  base: "text-md font-semibold transition-colors duration-200",
  active: "bg-accent text-md font-semibold",
};

const NavigationContentFallback = () => (
  <div className="w-[540px] p-4">
    <Skeleton className="h-24 w-full" />
  </div>
);

const navigationComponents: Record<string, React.ComponentType> = {
  About: NavigationAbout,
};

const DesktopHeader: FC<Props> = memo(({ activePath }) => {
  const isActive = useCallback(
    (path: string) => {
      if (path === "/") return activePath === "/";
      if (path === "/blog") return activePath.startsWith("/blog");
      return activePath === path;
    },
    [activePath],
  );

  const getNavItemClassName = useCallback(
    (path: string) =>
      cn(
        navigationMenuTriggerStyle(),
        isActive(path) ? navItemStyles.active : navItemStyles.base,
      ),
    [isActive],
  );

  const renderNavigationItem = useCallback(
    (link: (typeof NAVIGATION_LINKS)[0]) => {
      const isDropdown =
        link.subNavigationLinks && link.subNavigationLinks.length > 0;

      if (isDropdown) {
        return (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuTrigger
              aria-current={isActive(link.href) ? "page" : undefined}
              className={getNavItemClassName(link.href)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1"
                prefetch
              >
                {link.label}
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Suspense fallback={<NavigationContentFallback />}>
                {(() => {
                  const NavContent = navigationComponents[link.label];
                  return NavContent ? <NavContent /> : null;
                })()}
              </Suspense>
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      }

      return (
        <NavigationMenuItem key={link.href}>
          <NavigationMenuLink
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={getNavItemClassName(link.href)}
          >
            <div className="flex items-center gap-1">{link.label}</div>
          </NavigationMenuLink>
        </NavigationMenuItem>
      );
    },
    [isActive, getNavItemClassName],
  );

  return (
    <NavigationMenu className="mx-auto hidden w-full max-w-5xl md:block">
      <div className="flex h-18 w-full items-center justify-between">
        <div className="flex flex-1 justify-start">
          <LogoButton />
        </div>
        <NavigationMenuList
          className="flex items-center gap-5"
          aria-label="Main navigation"
        >
          {NAVIGATION_LINKS.map(renderNavigationItem)}
        </NavigationMenuList>

        <div className="flex flex-1 items-center justify-end gap-1.5">
          <GithubButton />
          <span className="mx-2 flex h-4 w-px bg-border" />
          <SearchButton />
          <span className="mx-2 flex h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
      </div>
    </NavigationMenu>
  );
});

DesktopHeader.displayName = "DesktopHeader";

export default DesktopHeader;
