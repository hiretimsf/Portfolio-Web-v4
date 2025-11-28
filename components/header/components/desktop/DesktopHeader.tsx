"use client";

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
import navigationLinks from "@/components/header/data/navigationLinks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC, memo, Suspense, useCallback } from "react";
import LogoButton from "@/components/header/components/shared/LogoButton";
import ThemeToggle from "@/components/header/components/shared/ThemeToggle";
import NavigationAbout from "./navigations/about/NavigationAbout";

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
    (link: (typeof navigationLinks)[0]) => {
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
          {navigationLinks.map(renderNavigationItem)}
        </NavigationMenuList>

        <div className="flex flex-1 justify-end gap-2">
          <ThemeToggle />
        </div>
      </div>
    </NavigationMenu>
  );
});

DesktopHeader.displayName = "DesktopHeader";

export default DesktopHeader;
