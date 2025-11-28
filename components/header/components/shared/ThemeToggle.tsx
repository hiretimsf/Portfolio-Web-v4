"use client";

import { Button } from "@/components/ui/button";
import { META_THEME_COLORS } from "@/config/theme";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";
import { MoonIcon } from "@/components/header/icons/MoonIcon";
import { SunIcon } from "@/components/header/icons/SunIcon";
import { useTheme } from "next-themes";
import { useCallback } from "react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const { setMetaColor } = useMetaColor();

  const playClick = useSound("/audio/click.wav");

  const switchTheme = useCallback(() => {
    playClick(0.5);
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark,
    );
  }, [resolvedTheme, setTheme, setMetaColor, playClick]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={switchTheme}
      className="rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-950"
    >
      <MoonIcon className="hidden size-6 dark:block" />
      <SunIcon className="text-foreground size-6 dark:hidden" />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
};

export default ThemeToggle;
