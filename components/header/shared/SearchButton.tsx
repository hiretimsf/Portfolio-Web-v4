"use client";

import { searchPosts, type SearchResult } from "@/actions/search";
import { useDebounce } from "@/hooks/useDebounce";
import { trackEvent } from "@/lib/events";
import { highlightMatches, renderMarkdownContent } from "@/lib/search";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCommandState } from "cmdk";
import {
  CornerDownLeftIcon,
  MoonStarIcon,
  SearchIcon,
  SunMediumIcon,
  type LucideProps,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import ContrastIcon from "@/components/header/shared/contrast-icon";
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
  const queryClient = useQueryClient();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Analytics for search
  useEffect(() => {
    if (debouncedSearchTerm.length >= 2) {
      trackEvent({
        name: "command_menu_search",
        properties: {
          query: debouncedSearchTerm,
          query_length: debouncedSearchTerm.length,
        },
      });
    }
  }, [debouncedSearchTerm]);

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

  // Search Query
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm) return [];
      try {
        setError(null);
        return await searchPosts(debouncedSearchTerm);
      } catch (err) {
        setError("Failed to search posts. Please try again.");
        throw err;
      }
    },
    enabled: !!debouncedSearchTerm && debouncedSearchTerm.length >= 2,
    retry: retryCount,
  });

  const displayedResults = searchResults || [];

  const handleResultClick = (slug: string) => {
    // Add to history
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory((prev) => [searchTerm, ...prev].slice(0, 5));
    }
    handleOpenLink(`/blog/post/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      selectedIndex >= 0 &&
      displayedResults.length > 0
    ) {
      const result = displayedResults[selectedIndex];
      if (result) {
        handleResultClick(result.slug);
      }
    }
    // Navigate results with arrows if needed, but cmdk handles this naturally for CommandItems
    // Actually, `cmdk` manages selection index internally.
    // The user's snippet uses `selectedIndex` state to highlight manually?
    // `cmdk` automatically selects the first item.
    // The user's snippet has `aria-selected={index === selectedIndex}`.
    // Maybe we should let `cmdk` handle selection unless we need custom behavior.
    // But sticking to user snippet:
  };

  // Handle theme switching from the command menu
  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      setOpen(false);
      trackEvent({
        name: "command_menu_action",
        properties: { action: "change_theme", theme },
      });
      setTheme(theme);
    },
    [setTheme],
  );

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        onClick={() => {
          setOpen(true);
          trackEvent({
            name: "open_command_menu",
            properties: { method: "click" },
          });
        }}
        className="corner-squircle rounded-xl text-foreground "
      >
        <SearchIcon className="size-5 shrink-0 text-foreground" />
      </Button>

      {/* Command Menu Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            queryClient.removeQueries({
              queryKey: ["search", debouncedSearchTerm],
            });
            setSearchTerm("");
            setSelectedIndex(-1);
            setError(null);
            setRetryCount(0);
          }
        }}
      >
        <CommandInput
          ref={inputRef}
          value={searchTerm ?? ""}
          onValueChange={setSearchTerm}
          onKeyDown={handleKeyDown}
          placeholder="Type a command or search..."
          aria-label="Search blog posts"
        />

        <CommandList className="min-h-80 supports-timeline-scroll:scroll-fade-y">
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <div className="border-border h-6 w-6 animate-spin rounded-full border-b-2" />
              <span className="text-muted-foreground ml-2 text-sm">
                Searching...
              </span>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-sm text-red-500">{error}</div>
              {retryCount < 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => setRetryCount((prev) => prev + 1)}
                >
                  Retry
                </Button>
              )}
            </div>
          )}

          {!isLoading && !error && (
            <>
              <CommandEmpty>No results found.</CommandEmpty>

              {searchHistory.length > 0 && !searchTerm && (
                <CommandGroup heading="Recent Searches">
                  {searchHistory.map((term, index) => (
                    <CommandItem
                      key={index}
                      value={term}
                      onSelect={() => setSearchTerm(term)}
                      className="flex items-center gap-2"
                    >
                      <SearchIcon className="text-foreground size-4" />
                      {term}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {displayedResults?.length > 0 && (
                <CommandGroup heading="Search Results">
                  {displayedResults.map(
                    (result: SearchResult, index: number) => (
                      <CommandItem
                        key={result.slug}
                        value={result.title}
                        onSelect={() => handleResultClick(result.slug)}
                        className={cn(
                          "mt-2 cursor-pointer rounded-sm px-4 py-5 transition-colors dark:hover:bg-background/50",
                          index === selectedIndex && "bg-background/50",
                          // index !== selectedIndex && "hover:bg-neutral-100", // cmdk handles hover
                        )}
                        // aria-selected={index === selectedIndex} // cmdk handles this
                      >
                        <div className="space-y-2 w-full">
                          <h3 className="text-foreground text-lg font-semibold">
                            {highlightMatches(result.title || "", searchTerm)}
                          </h3>
                          <p className="text-foreground mt-1 text-sm">
                            {highlightMatches(
                              result.description || "",
                              searchTerm,
                            )}
                          </p>
                          <div className="text-foreground mt-2 text-sm leading-relaxed line-clamp-2">
                            {/* Render snippet of content match if possible, or just description */}
                            {/* The snippet logic uses renderMarkdownContent on result.content. 
                               result.content from getPostsBySearchQuery is the context snippet. */}
                            {result.content &&
                              renderMarkdownContent({
                                content: result.content,
                              }).map((element, index) =>
                                typeof element === "string" ? (
                                  <React.Fragment key={index}>
                                    {highlightMatches(element, searchTerm)}
                                  </React.Fragment>
                                ) : (
                                  <span key={index}>{element}</span>
                                ),
                              )}
                          </div>
                          {result.category && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-muted-foreground text-xs">
                                Category:
                              </span>
                              <span className="text-foreground rounded-full px-2 py-1 text-xs">
                                {result.category}
                              </span>
                            </div>
                          )}
                        </div>
                      </CommandItem>
                    ),
                  )}
                </CommandGroup>
              )}

              {/* Existing Menus */}
              {/* Only show these if we are NOT showing search results? 
                  Or always show them?
                  If I search "Contact", I might want the contact page link.
                  The blog search might yield nothing.
                  So better to keep them.
              */}

              <CommandSeparator />

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
                  <ContrastIcon className="size-4" />
                  Auto
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>

        <CommandMenuFooter />
      </CommandDialog>
    </>
  );
}

// --- Sub-components ---

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
