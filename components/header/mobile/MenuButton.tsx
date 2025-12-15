"use client";

import SubNavigationItem from "@/components/header/mobile/SubNavigationItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NAVIGATION_LINKS from "@/config/navigationLinks";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import React, { memo, useCallback, useState } from "react";

interface Props {
  currentPath: string;
  className?: string;
}

const extractActivePath = (path: string): string => {
  return path.split("/")[1] ? `/${path.split("/")[1]}` : path;
};

const MenuButton: FC<Props> = memo(({ currentPath, className }) => {
  const activePath = extractActivePath(currentPath);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSheet = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  const handleNavigation = useCallback(() => {
    setIsLoading(true);
    toggleSheet();
    // Reset loading state after a short delay to ensure smooth transition
    setTimeout(() => setIsLoading(false), 300);
  }, [toggleSheet]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={toggleSheet}
          onKeyDown={handleKeyDown}
          variant="ghost"
          size="icon"
          className={cn(
            "group hover:bg-accent rounded-xl corner-squircle",
            className,
          )}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? (
            <X className="text-foreground group-hover:text-accent-foreground size-5" />
          ) : (
            <Menu className="text-foreground group-hover:text-accent-foreground size-5" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="z-1 mt-10"
        onKeyDown={handleKeyDown}
        id="mobile-navigation"
      >
        <VisuallyHidden>
          <SheetTitle>Mobile Navigation</SheetTitle>
        </VisuallyHidden>

        <div className="bg-background">
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <Accordion type="single" collapsible>
              {NAVIGATION_LINKS.map((menuItem) => {
                const isActive = activePath === menuItem.href;
                return menuItem.href === "/about" &&
                  menuItem.subNavigationLinks ? (
                  <AccordionItem key={menuItem.href} value={menuItem.href}>
                    <AccordionTrigger
                      className={cn(
                        "group inline-flex w-full gap-2 px-6 py-4",
                        {
                          "bg-accent/50 shadow-xs": isActive,
                          "hover:bg-accent hover:shadow-xs": !isActive,
                        },
                      )}
                      aria-label={`${menuItem.label} menu`}
                    >
                      <span className="text-foreground group-hover:text-accent-foreground">
                        {menuItem.label}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="divide-border divide-y">
                        {menuItem.href === "/about" &&
                          menuItem.subNavigationLinks.map((subItem) => (
                            <li key={subItem.href}>
                              <SubNavigationItem
                                href={subItem.href}
                                onClick={() => handleNavigation()}
                                label={subItem.label ?? ""}
                                description={subItem.description ?? ""}
                                icon={
                                  subItem.icon
                                    ? React.createElement(subItem.icon)
                                    : null
                                }
                                className="group flex w-full gap-2 px-6 py-4"
                                isLoading={isLoading}
                              />
                            </li>
                          ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <li key={menuItem.href} className="list-none">
                    <Link
                      href={menuItem.href}
                      className={cn(
                        "group border-border inline-flex w-full gap-2 border-b px-6 py-4",
                        {
                          "bg-accent/50 shadow-xs": isActive,
                          "hover:bg-accent hover:shadow-xs": !isActive,
                        },
                      )}
                      onClick={() => handleNavigation()}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="text-foreground group-hover:text-accent-foreground font-medium">
                        {menuItem.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </Accordion>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
});

MenuButton.displayName = "MenuButton";

export default MenuButton;
