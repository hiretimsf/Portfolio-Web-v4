import type * as PageTree from "fumadocs-core/page-tree";
import { type PageStyles, StylesProvider } from "./DocsLayoutContext";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;

  /**
   * Props for the `div` container
   */
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export function DocsLayout({
  i18n = false,
  children,
  ...props
}: DocsLayoutProps): ReactNode {
  const variables = cn(
    "[--fd-tocnav-height:36px] lg:[--fd-toc-width:286px] lg:[--fd-tocnav-height:0px]",
  );

  const pageStyles: PageStyles = {
    tocNav: cn("lg:hidden"),
    toc: cn("max-lg:hidden"),
  };

  return (
    <TreeContextProvider tree={props.tree}>
      <main
        id="nd-docs-layout"
        {...props.containerProps}
        className={cn(
          "bg-background mx-auto flex w-full max-w-7xl flex-1 flex-row text-foreground text-left",
          variables,
          props.containerProps?.className,
        )}
        style={props.containerProps?.style}
      >
        <StylesProvider {...pageStyles}>{children}</StylesProvider>
      </main>
    </TreeContextProvider>
  );
}
