"use client";

import { motion } from "framer-motion";
import type { TOCItemType } from "fumadocs-core/toc";
import * as Primitive from "fumadocs-core/toc";
import { TocThumb } from "fumadocs-ui/components/toc/index";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { usePageStyles } from "./DocsLayoutContext";
import { cn } from "@/lib/utils";
import {
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Banner from "@/components/common/Banner";

export interface TOCProps {
  /**
   * Custom content in TOC container, before the main TOC
   */
  header?: ReactNode;

  /**
   * Custom content in TOC container, after the main TOC
   */
  footer?: ReactNode;

  children: ReactNode;

  /**
   * Enabled the banner in the TOC
   *
   * @defaultValue true
   */
  bannerEnabled?: boolean;
}

export function DocsTOC({
  header,
  footer,
  children,
  bannerEnabled = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  header?: ReactNode;
  footer?: ReactNode;
  bannerEnabled?: boolean;
}) {
  const { toc } = usePageStyles();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      id="nd-toc"
      {...(props as ComponentProps<typeof motion.div>)}
      className={cn(
        "sticky top-[calc(var(--fd-banner-height,0px)+var(--fd-nav-height,0px))] h-(--fd-toc-height) pb-2 pl-4 border-l border-black/10 dark:border-white/10 border-dashed bg-accent/20 dark:bg-accent/10",
        toc,
        props.className,
      )}
      animate={{ paddingTop: isScrolled ? "4.5rem" : "1.5rem" }}
      transition={{ duration: 0.2 }}
      style={
        {
          ...props.style,
          "--fd-toc-height":
            "calc(100dvh - var(--fd-banner-height,0px) - var(--fd-nav-height,0px))",
        } as object
      }
    >
      <div
        className={cn(
          "flex h-full max-w-full flex-col pe-4 transition-[width]",
          bannerEnabled ? "w-(--fd-toc-width)" : "w-[220px]",
        )}
      >
        {header}
        {children}
        {footer}
        {bannerEnabled && <Banner />}
      </div>
    </motion.div>
  );
}

export function TocItemsEmpty() {
  const { text } = useI18n();

  return (
    <div className="bg-fd-card text-foreground rounded-lg border border-black/10 dark:border-white/10 p-3 text-xs">
      {text.tocNoHeadings}
    </div>
  );
}

export function TOCScrollArea(props: ComponentProps<"div">) {
  const viewRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      ref={viewRef}
      className={cn(
        "relative ms-px min-h-0 overflow-auto mask-[linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] py-3 text-sm [scrollbar-width:none]",
        props.className,
      )}
    >
      <Primitive.ScrollProvider containerRef={viewRef}>
        {props.children}
      </Primitive.ScrollProvider>
    </div>
  );
}

export function TOCItems({
  items,
  prose = true,
  compact = false,
}: {
  items: TOCItemType[];
  prose?: boolean;
  compact?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return <TocItemsEmpty />;

  return (
    <>
      <TocThumb
        containerRef={containerRef}
        className="bg-foreground absolute top-(--fd-top) h-(--fd-height) w-px transition-all"
      />
      <div
        ref={containerRef}
        className="border-fd-foreground/10 flex flex-col border-s"
      >
        {items.map((item) => (
          <TOCItem
            key={item.url}
            item={item}
            prose={prose}
            compact={compact}
          />
        ))}
      </div>
    </>
  );
}

function TOCItem({
  item,
  prose = true,
  compact = false,
}: {
  item: TOCItemType;
  prose?: boolean;
  compact?: boolean;
}) {
  return (
    <Primitive.TOCItem
      href={item.url}
      className={cn(
        "text-foreground/60 text-left data-[active=true]:text-foreground py-1.5 text-sm transition-colors first:pt-0 last:pb-0",
        prose && "prose",
        item.depth <= 2 && "ps-3",
        item.depth === 3 && "ps-6",
        item.depth >= 4 && "ps-8",
        compact ? "truncate" : "[overflow-wrap:anywhere]",
      )}
    >
      {item.title}
    </Primitive.TOCItem>
  );
}
