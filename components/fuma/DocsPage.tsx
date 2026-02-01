import type { TableOfContents } from "fumadocs-core/toc";
import { AnchorProvider, type AnchorProviderProps } from "fumadocs-core/toc";
import { I18nLabel } from "fumadocs-ui/contexts/i18n";
import { cn } from "@/lib/utils";
import { Edit, Text } from "lucide-react";
import { type ComponentProps, forwardRef, lazy, type ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Breadcrumb,
  type BreadcrumbProps,
  Footer,
  type FooterProps,
  LastUpdate,
  DocsPageArticle,
  DocsPageBody,
  DocsTOCPopover,
  DocsTOCPopoverContent,
  DocsTOCPopoverTrigger,
} from "./DocsPageClient";
import { TOCItems, type TOCProps, TOCScrollArea, DocsTOC } from "./DocsTOC";
import DotsBackground from "@/components/common/BackgroundDots";

const ClerkTOCItems = lazy(() =>
  import("fumadocs-ui/components/toc/clerk").then((mod) => ({
    default: mod.TOCItems,
  })),
);

function slot<T extends { enabled?: boolean; component?: ReactNode }>(
  options: T | undefined | false,
  defaultComponent: ReactNode,
  _props?: Record<string, unknown>,
): ReactNode {
  if (!options || options.enabled === false) return null;
  if (options.component) return options.component;
  return defaultComponent;
}

type TableOfContentOptions = Omit<TOCProps, "items" | "children"> &
  Pick<AnchorProviderProps, "single"> & {
    enabled: boolean;
    component: ReactNode;

    /**
     * @defaultValue 'normal'
     */
    style?: "normal" | "clerk";
  };

type TableOfContentPopoverOptions = Omit<TableOfContentOptions, "single">;

interface EditOnGitHubOptions extends Omit<
  ComponentProps<"a">,
  "href" | "children"
> {
  owner: string;
  repo: string;

  /**
   * SHA or ref (branch or tag) name.
   *
   * @defaultValue main
   */
  sha?: string;

  /**
   * File path in the repo
   */
  path: string;
}

interface BreadcrumbOptions extends BreadcrumbProps {
  enabled: boolean;
  component: ReactNode;

  /**
   * Show the full path to the current page
   *
   * @defaultValue false
   * @deprecated use `includePage` instead
   */
  full?: boolean;
}

interface FooterOptions extends FooterProps {
  enabled: boolean;
  component: ReactNode;
}

export interface DocsPageProps {
  toc?: TableOfContents;

  /**
   * Extend the page to fill all available space
   *
   * @defaultValue false
   */
  full?: boolean;

  /**
   * Enable prose styling
   *
   * @defaultValue true
   */
  prose?: boolean;

  tableOfContent?: Partial<TableOfContentOptions>;
  tableOfContentPopover?: Partial<TableOfContentPopoverOptions>;

  /**
   * Replace or disable breadcrumb
   */
  breadcrumb?: Partial<BreadcrumbOptions>;

  /**
   * Footer navigation, you can disable it by passing `false`
   */
  footer?: Partial<FooterOptions>;

  editOnGithub?: EditOnGitHubOptions;
  lastUpdate?: Date | string | number;

  container?: ComponentProps<"div">;
  article?: ComponentProps<"article">;
  children: ReactNode;
}

export function DocsPage({
  toc = [],
  full = false,
  prose = true,
  editOnGithub,
  tableOfContentPopover: {
    enabled: tocPopoverEnabled,
    component: tocPopoverReplace,
    ...tocPopoverOptions
  } = {},
  tableOfContent: {
    enabled: tocEnabled,
    component: tocReplace,
    ...tocOptions
  } = {},
  ...props
}: DocsPageProps) {
  const isTocRequired =
    toc.length > 0 ||
    tocOptions.footer !== undefined ||
    tocOptions.header !== undefined;

  // disable TOC on full mode, you can still enable it with `enabled` option.
  tocEnabled ??= !full && isTocRequired;

  tocPopoverEnabled ??=
    toc.length > 0 ||
    tocPopoverOptions.header !== undefined ||
    tocPopoverOptions.footer !== undefined;

  return (
    <AnchorProvider toc={toc} single={tocOptions.single}>
      <DocsPageBody
        {...props.container}
        className={cn(props.container?.className)}
        style={
          {
            "--fd-tocnav-height": !tocPopoverEnabled ? "0px" : undefined,
            ...props.container?.style,
          } as object
        }
      >
        {slot(
          { enabled: tocPopoverEnabled, component: tocPopoverReplace },
          <DocsTOCPopover className="h-10">
            <DocsTOCPopoverTrigger
              className="mx-auto w-full max-w-7xl"
              items={toc}
            />
            <DocsTOCPopoverContent>
              {tocPopoverOptions.header}
              <TOCScrollArea className="px-4 md:px-6">
                {tocPopoverOptions.style === "clerk" ? (
                  <ClerkTOCItems />
                ) : (
                  <TOCItems items={toc} prose={prose} />
                )}
              </TOCScrollArea>
              {tocPopoverOptions.footer}
            </DocsTOCPopoverContent>
          </DocsTOCPopover>,
          {
            items: toc,
            ...tocPopoverOptions,
          },
        )}
        <DocsPageArticle
          {...props.article}
          prose={prose}
          className={cn(
            full || !tocEnabled ? "mx-auto max-w-7xl" : "mx-auto max-w-7xl",
            props.article?.className,
          )}
        >
          <DotsBackground
            gridId="company-main"
            className="text-gray-200/80 h-16"
            fadeBottomMask
          />
          {slot(props.breadcrumb, <Breadcrumb {...props.breadcrumb} />)}
          {props.children}
          <div role="none" className="flex-1" />
          <div className="mx-auto flex w-full max-w-7xl flex-row flex-wrap items-center justify-between gap-4 empty:hidden">
            {editOnGithub && (
              <EditOnGitHub
                href={`https://github.com/${editOnGithub.owner}/${editOnGithub.repo}/blob/${editOnGithub.sha}/${editOnGithub.path.startsWith("/") ? editOnGithub.path.slice(1) : editOnGithub.path}`}
              />
            )}
            {props.lastUpdate && (
              <LastUpdate date={new Date(props.lastUpdate)} />
            )}
          </div>
          {slot(props.footer, <Footer items={props.footer?.items} />)}
        </DocsPageArticle>
      </DocsPageBody>
      {slot(
        { enabled: tocEnabled, component: tocReplace },
        <DocsTOC bannerEnabled={tocOptions.bannerEnabled}>
          {tocOptions.header}
          <h3 className="text-foreground inline-flex items-center gap-1.5 text-sm">
            <Text className="size-4" />
            <I18nLabel label="toc" />
          </h3>
          <TOCScrollArea>
            {tocOptions.style === "clerk" ? (
              <ClerkTOCItems />
            ) : (
              <TOCItems
                items={toc}
                prose={prose}
                compact={!(tocOptions.bannerEnabled ?? true)}
              />
            )}
          </TOCScrollArea>
          {tocOptions.footer}
        </DocsTOC>,
        {
          items: toc,
          ...tocOptions,
        },
      )}
    </AnchorProvider>
  );
}

export function EditOnGitHub(props: ComponentProps<"a">) {
  return (
    <a
      target="_blank"
      rel="noreferrer noopener"
      {...props}
      className={cn(
        buttonVariants({
          variant: "secondary",
          size: "sm",
          className: "not-prose gap-1.5",
        }),
        props.className,
      )}
    >
      {props.children ?? (
        <>
          <Edit className="size-3.5" />
          <I18nLabel label="editOnGithub" />
        </>
      )}
    </a>
  );
}

/**
 * Add typography styles
 */
export const DocsBody = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & { prose?: boolean }
>(({ prose = true, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn(
      prose ? "prose" : "mx-auto w-full max-w-7xl",
      props.className,
    )}
  >
    {props.children}
  </div>
));

DocsBody.displayName = "DocsBody";

export const DocsDescription = forwardRef<
  HTMLParagraphElement,
  ComponentProps<"p">
>((props, ref) => {
  // don't render if no description provided
  if (props.children === undefined) return null;

  return (
    <p
      ref={ref}
      {...props}
      className={cn("text-fd-muted-foreground mb-8 text-lg", props.className)}
    >
      {props.children}
    </p>
  );
});

DocsDescription.displayName = "DocsDescription";

export const DocsTitle = forwardRef<HTMLHeadingElement, ComponentProps<"h1">>(
  (props, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn("text-3xl font-semibold", props.className)}
      >
        {props.children}
      </h1>
    );
  },
);

DocsTitle.displayName = "DocsTitle";

/**
 * For separate MDX page
 */
export function withArticle(props: ComponentProps<"main">): ReactNode {
  return (
    <main {...props} className={cn("container py-12", props.className)}>
      <article className="prose">{props.children}</article>
    </main>
  );
}
