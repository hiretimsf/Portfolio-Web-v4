"use client";

import { useCommandState } from "cmdk";
import {
  CornerDownLeftIcon,
  MoonStarIcon,
  SunMediumIcon,
  type LucideProps,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import SearchIcon from "@/icons/SearchIcon";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import NAVIGATION_LINKS from "@/config/navigationLinks";
import SOCIAL_LINKS from "@/config/socialLinks";
import { useSound } from "@/hooks/use-sound";
import { Icons } from "@/icons/icons";
import { trackEvent } from "@/lib/events";

// --- Types ---

type CommandLinkItem = {
  title: string;
  href: string;
  icon?: React.ComponentType<LucideProps>;
  iconImage?: string;
  keywords?: string[];
  openInNewTab?: boolean;
};

type CommandKind = "command" | "page" | "link";

// --- Constants & Helpers ---

// Flatten navigation links for the command menu
const MENU_LINKS: CommandLinkItem[] = NAVIGATION_LINKS.flatMap((link) => {
  const mainLink: CommandLinkItem = {
    title: link.label,
    href: link.href,
    icon: link.icon,
  };

  if (link.subNavigationLinks?.length) {
    return link.subNavigationLinks.map((sub) => ({
      title: sub.label,
      href: sub.href,
      icon: sub.icon,
    }));
  }

  return [mainLink];
});

// Prepare social links for the command menu
const SOCIAL_COMMAND_LINKS: CommandLinkItem[] = SOCIAL_LINKS.map((link) => ({
  title: link.label,
  href: link.href,
  icon: link.icon as React.ComponentType<LucideProps>,
  openInNewTab: true,
}));

// Map command titles to their "kind" (e.g. "page", "link", "command")
// Keys are stored in lowercase to match cmdk's default value behavior
const COMMAND_META_MAP = new Map<string, { commandKind: CommandKind }>();

// Populate the meta map
COMMAND_META_MAP.set("light", { commandKind: "command" });
COMMAND_META_MAP.set("dark", { commandKind: "command" });
COMMAND_META_MAP.set("auto", { commandKind: "command" });

SOCIAL_COMMAND_LINKS.forEach((item) => {
  COMMAND_META_MAP.set(item.title.toLowerCase(), { commandKind: "link" });
});

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  command: "Run Command",
  page: "Go to Page",
  link: "Open Link",
};

/**
 * SearchButton Component
 *
 * Displays a search button that triggers a command menu (CMDK) dialog.
 * Supports keyboard shortcuts (Cmd+K / Ctrl+K / /) to open.
 */
export function SearchButton() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const playClick = useSound("/audio/click.wav");

  // Toggle command menu with keyboard shortcuts
  useHotkeys("mod+k, slash", (e) => {
    e.preventDefault();
    setOpen((prevOpen) => {
      if (!prevOpen) {
        trackEvent({
          name: "open_command_menu",
          properties: {
            method: "keyboard",
            key: e.key === "/" ? "/" : e.metaKey ? "cmd+k" : "ctrl+k",
          },
        });
      }
      return !prevOpen;
    });
  });

  // Handle navigation from the command menu
  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false);
      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "navigate",
          href,
          open_in_new_tab: openInNewTab,
        },
      });

      if (openInNewTab) {
        window.open(href, "_blank", "noopener");
      } else {
        router.push(href);
      }
    },
    [router],
  );

  // Handle theme switching from the command menu
  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      setOpen(false);
      playClick(0.5);
      trackEvent({
        name: "command_menu_action",
        properties: { action: "change_theme", theme },
      });
      setTheme(theme);
    },
    [playClick, setTheme],
  );

  return (
    <>
      {/* Trigger Button */}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          playClick(0.5);
          setOpen(true);
          trackEvent({
            name: "open_command_menu",
            properties: { method: "click" },
          });
        }}
        className="corner-squircle rounded-xl text-foreground "
      >
        <SearchIcon aria-hidden className="size-5 shrink-0 text-foreground" />
      </Button>

      {/* Command Menu Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandMenuInput />

        <CommandList className="min-h-80 supports-timeline-scroll:scroll-fade-y">
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Navigation Links */}
          <CommandLinkGroup
            heading="Menu"
            links={MENU_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          {/* Social Links */}
          <CommandLinkGroup
            heading="Social Links"
            links={SOCIAL_COMMAND_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          {/* Theme Options */}
          <CommandGroup heading="Theme">
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("light")}
            >
              <SunMediumIcon />
              Light
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("dark")}
            >
              <MoonStarIcon />
              Dark
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("system")}
            >
              <Icons.contrast />
              Auto
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <CommandMenuFooter />
      </CommandDialog>
    </>
  );
}

// --- Sub-components ---

/**
 * CommandMenuInput
 *
 * Wraps CommandInput to handle search tracking analytics.
 */
function CommandMenuInput() {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.length >= 2) {
      const timeoutId = setTimeout(() => {
        trackEvent({
          name: "command_menu_search",
          properties: {
            query: searchValue,
            query_length: searchValue.length,
          },
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchValue]);

  return (
    <CommandInput
      placeholder="Type a command or search..."
      value={searchValue}
      onValueChange={setSearchValue}
    />
  );
}

/**
 * CommandLinkGroup
 *
 * Renders a group of links in the command menu.
 */
function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkSelect,
}: {
  heading: string;
  links: CommandLinkItem[];
  fallbackIcon?: React.ComponentType<LucideProps>;
  onLinkSelect: (href: string, openInNewTab?: boolean) => void;
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const Icon = link?.icon ?? fallbackIcon ?? React.Fragment;
        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <Image
                className="rounded-sm corner-squircle supports-corner-shape:rounded-[50%]"
                src={link.iconImage}
                alt={link.title}
                width={16}
                height={16}
                unoptimized
              />
            ) : (
              <Icon />
            )}
            {link.title}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

/**
 * CommandMenuFooter
 *
 * Displays contextual actions at the bottom of the command menu (e.g., "Go to Page", "Open Link").
 */
function CommandMenuFooter() {
  // Get the currently selected command item value
  const selectedCommandKind = useCommandState(
    (state) => COMMAND_META_MAP.get(state.value)?.commandKind ?? "page",
  );

  return (
    <>
      <div className="flex h-10" />
      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 border-t bg-zinc-100/30 px-4 text-xs font-medium dark:bg-zinc-800/30">
        <div className="flex shrink-0 items-center gap-2">
          <span>{ENTER_ACTION_LABELS[selectedCommandKind]}</span>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <span className="text-muted-foreground">Exit</span>
          <Kbd>Esc</Kbd>
        </div>
      </div>
    </>
  );
}

export default SearchButton;
