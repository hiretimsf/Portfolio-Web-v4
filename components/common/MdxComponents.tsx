"use client";

import Link from "next/link";
import Image from "next/image";
import {
  type AnchorHTMLAttributes,
  type ComponentProps,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type TableHTMLAttributes,
  type ReactNode,
  type RefObject,
  createContext,
  use,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useEffectEvent,
  type ComponentPropsWithoutRef,
} from "react";
import { Tweet } from "react-tweet";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import FumadocsLink from "fumadocs-core/link";
import { CircleCheck, CircleX, Info, TriangleAlert, Sun, Check, Clipboard } from "lucide-react";
import * as Primitive from "@radix-ui/react-tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicator,
  CarouselCounter,
} from "@/components/ui/carousel";
import { buttonVariants } from "@/components/ui/button";
import { cn, mergeRefs } from "@/lib/utils";
import { useCopyButton } from "@/hooks/useCopyButton";

// --- Tabs Component ---

type ChangeListener = (v: string) => void;
const listeners = new Map<string, Set<ChangeListener>>();

export interface TabsProps extends ComponentProps<typeof Primitive.Tabs> {
  /**
   * Identifier for Sharing value of tabs
   */
  groupId?: string;

  /**
   * Enable persistent
   */
  persist?: boolean;

  /**
   * If true, updates the URL hash based on the tab's id
   */
  updateAnchor?: boolean;
}

const TabsContext = createContext<{
  valueToIdMap: Map<string, string>;
} | null>(null);

function useTabContext() {
  const ctx = use(TabsContext);
  if (!ctx) throw new Error("You must wrap your component in <Tabs>");
  return ctx;
}

export const TabsList = Primitive.TabsList;

export const TabsTrigger = Primitive.TabsTrigger;

export function Tabs({
  ref,
  groupId,
  persist = false,
  updateAnchor = false,
  defaultValue,
  value: _value,
  onValueChange: _onValueChange,
  ...props
}: TabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const valueToIdMap = useMemo(() => new Map<string, string>(), []);
  const [value, setValue] =
    _value === undefined
      ? // eslint-disable-next-line react-hooks/rules-of-hooks -- not supposed to change controlled/uncontrolled
        useState(defaultValue)
      : // eslint-disable-next-line react-hooks/rules-of-hooks -- not supposed to change controlled/uncontrolled
        [_value, useEffectEvent((v: string) => _onValueChange?.(v))];

  useLayoutEffect(() => {
    if (!groupId) return;
    let previous = sessionStorage.getItem(groupId);
    if (persist) previous ??= localStorage.getItem(groupId);
    if (previous) setValue(previous);

    const groupListeners = listeners.get(groupId) ?? new Set();
    groupListeners.add(setValue);
    listeners.set(groupId, groupListeners);
    return () => {
      groupListeners.delete(setValue);
    };
  }, [groupId, persist, setValue]);

  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    for (const [value, id] of valueToIdMap.entries()) {
      if (id === hash) {
        setValue(value);
        tabsRef.current?.scrollIntoView();
        break;
      }
    }
  }, [setValue, valueToIdMap]);

  return (
    <Primitive.Tabs
      ref={mergeRefs(ref, tabsRef)}
      value={value}
      onValueChange={(v: string) => {
        if (updateAnchor) {
          const id = valueToIdMap.get(v);

          if (id) {
            window.history.replaceState(null, "", `#${id}`);
          }
        }

        if (groupId) {
          const groupListeners = listeners.get(groupId);
          if (groupListeners) {
            for (const listener of groupListeners) listener(v);
          }

          sessionStorage.setItem(groupId, v);
          if (persist) localStorage.setItem(groupId, v);
        } else {
          setValue(v);
        }
      }}
      {...props}
    >
      <TabsContext value={useMemo(() => ({ valueToIdMap }), [valueToIdMap])}>
        {props.children}
      </TabsContext>
    </Primitive.Tabs>
  );
}

export function TabsContent({
  value,
  ...props
}: ComponentProps<typeof Primitive.TabsContent>) {
  const { valueToIdMap } = useTabContext();

  if (props.id) {
    valueToIdMap.set(value, props.id);
  }

  return (
    <Primitive.TabsContent value={value} {...props}>
      {props.children}
    </Primitive.TabsContent>
  );
}

// --- ImageSlider Component ---

interface ImageSliderProps {
  images: {
    src: string;
    alt: string;
  }[];
  caption?: string;
  className?: string;
}

export function ImageSlider({ images, caption, className }: ImageSliderProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className={cn("my-6 w-full", className)}>
      <Carousel className="w-full group">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Overlapping Buttons */}
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-900/50 dark:border-zinc-800" />
            <CarouselNext className="right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-900/50 dark:border-zinc-800" />
            <div className="absolute bottom-4 left-0 right-0 z-10 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-4">
              <CarouselIndicator
                totalSlides={images.length}
                className="mt-0!"
              />
              <CarouselCounter className="absolute right-4 bottom-0" />
            </div>
          </>
        )}
      </Carousel>
      {caption && (
        <p className="mt-4 text-center text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-500">
          {caption}
        </p>
      )}
    </div>
  );
}

// --- Steps Component ---

export function Steps({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ml-4 mb-8 [counter-reset:step] md:mb-12 [&>*:first-child]:mt-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Step({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "step border-l border-muted pl-7.5 relative pb-4 last:border-transparent last:pb-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

// --- Heading Component ---

type HeadingTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends HeadingTypes> = Omit<ComponentPropsWithoutRef<T>, "as"> & {
  as?: T;
};

export function Heading<T extends HeadingTypes = "h1">({
  as,
  className,
  ...props
}: HeadingProps<T>): React.ReactElement {
  const As = as ?? "h1";

  const sizes = {
    h1: "text-3xl",
    h2: "text-2xl",
    h3: "text-xl",
    h4: "text-lg",
    h5: "text-base",
    h6: "text-sm",
  };

  const size = sizes[As];

  if (!props.id) return <As className={className} {...props} />;

  return (
    <As
      className={cn("flex flex-row items-center gap-2 scroll-m-28", className)}
      {...props}
    >
      <a
        data-card=""
        href={`#${props.id}`}
        className={cn(
          "text-foreground no-underline hover:underline hover:text-primary transition-colors duration-200 hover:underline-offset-4 font-semibold -mt-0.5!",
          size,
        )}
      >
        {props.children}
      </a>
    </As>
  );
}

// --- CodeBlock Component ---

export interface CodeBlockProps extends ComponentProps<"figure"> {
  /**
   * Icon of code block
   *
   * When passed as a string, it assumes the value is the HTML of icon
   */
  icon?: ReactNode;

  /**
   * Allow to copy code with copy button
   *
   * @defaultValue true
   */
  allowCopy?: boolean;

  /**
   * Keep original background color generated by Shiki or Rehype Code
   *
   * @defaultValue false
   */
  keepBackground?: boolean;

  viewportProps?: HTMLAttributes<HTMLElement>;

  /**
   * show line numbers
   */
  "data-line-numbers"?: boolean;

  /**
   * @defaultValue 1
   */
  "data-line-numbers-start"?: number;

  Actions?: (props: { className?: string; children?: ReactNode }) => ReactNode;
}

const CodeBlockTabsContext = createContext<{
  containerRef: RefObject<HTMLDivElement | null>;
  nested: boolean;
} | null>(null);

export function Pre(props: ComponentProps<"pre">) {
  return (
    <pre
      {...props}
      className={cn("min-w-full w-max *:flex *:flex-col", props.className)}
    >
      {props.children}
    </pre>
  );
}

export function CodeBlock({
  ref,
  title,
  allowCopy = true,
  keepBackground = false,
  icon,
  viewportProps = {},
  children,
  Actions = (props) => (
    <div {...props} className={cn("empty:hidden", props.className)} />
  ),
  ...props
}: CodeBlockProps) {
  const inTab = use(CodeBlockTabsContext) !== null;
  const areaRef = useRef<HTMLDivElement>(null);

  return (
    <figure
      ref={ref}
      dir="ltr"
      {...props}
      tabIndex={-1}
      className={cn(
        inTab
          ? "bg-fd-secondary -mx-px -mb-px last:rounded-b-xl"
          : "my-4 bg-fd-card rounded-xl",
        keepBackground && "bg-(--shiki-light-bg) dark:bg-(--shiki-dark-bg)",

        "shiki relative border shadow-sm not-prose overflow-hidden text-sm",
        props.className,
      )}
    >
      {title ? (
        <div className="flex text-fd-muted-foreground items-center gap-2 h-9.5 border-b px-4">
          {typeof icon === "string" ? (
            <div
              className="[&_svg]:size-3.5"
              dangerouslySetInnerHTML={{
                __html: icon,
              }}
            />
          ) : (
            icon
          )}
          <figcaption className="flex-1 truncate">{title}</figcaption>
          {Actions({
            className: "-me-2",
            children: allowCopy && <CopyButton containerRef={areaRef} />,
          })}
        </div>
      ) : (
        Actions({
          className:
            "absolute top-2 right-2 z-2 backdrop-blur-lg rounded-lg text-fd-muted-foreground",
          children: allowCopy && <CopyButton containerRef={areaRef} />,
        })
      )}
      <div
        ref={areaRef}
        {...viewportProps}
        role="region"
        tabIndex={0}
        className={cn(
          "text-[0.8125rem] py-3.5 overflow-auto max-h-[600px] fd-scroll-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fd-ring",
          viewportProps.className,
        )}
        style={
          {
            // space for toolbar
            "--padding-right": !title ? "calc(var(--spacing) * 8)" : undefined,
            counterSet: props["data-line-numbers"]
              ? `line ${Number(props["data-line-numbers-start"] ?? 1) - 1}`
              : undefined,
            ...viewportProps.style,
          } as object
        }
      >
        {children}
      </div>
    </figure>
  );
}

function CopyButton({
  className,
  containerRef,
  ...props
}: ComponentProps<"button"> & {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [checked, onClick] = useCopyButton(() => {
    const pre = containerRef.current?.getElementsByTagName("pre").item(0);
    if (!pre) return;

    const clone = pre.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
      node.replaceWith("\n");
    });

    void navigator.clipboard.writeText(clone.textContent ?? "");
  });

  return (
    <button
      type="button"
      data-checked={checked || undefined}
      className={cn(
        buttonVariants({
          className:
            "hover:text-fd-accent-foreground data-checked:text-fd-accent-foreground",
          size: "icon-sm",
        }),
        className,
      )}
      aria-label={checked ? "Copied Text" : "Copy Text"}
      onClick={onClick}
      {...props}
    >
      {checked ? <Check /> : <Clipboard />}
    </button>
  );
}

export function CodeBlockTabs({ ref, ...props }: ComponentProps<typeof Tabs>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nested = use(CodeBlockTabsContext) !== null;

  return (
    <Tabs
      ref={mergeRefs(containerRef, ref)}
      {...props}
      className={cn(
        "bg-fd-card rounded-xl border",
        !nested && "my-4",
        props.className,
      )}
    >
      <CodeBlockTabsContext
        value={useMemo(
          () => ({
            containerRef,
            nested,
          }),
          [nested],
        )}
      >
        {props.children}
      </CodeBlockTabsContext>
    </Tabs>
  );
}

export function CodeBlockTabsList(props: ComponentProps<typeof TabsList>) {
  return (
    <TabsList
      {...props}
      className={cn(
        "flex flex-row px-2 overflow-x-auto text-fd-muted-foreground",
        props.className,
      )}
    >
      {props.children}
    </TabsList>
  );
}

export function CodeBlockTabsTrigger({
  children,
  ...props
}: ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      {...props}
      className={cn(
        "relative group inline-flex text-sm font-medium text-nowrap items-center transition-colors gap-2 px-2 py-1.5 hover:text-fd-accent-foreground data-[state=active]:text-fd-primary [&_svg]:size-3.5",
        props.className,
      )}
    >
      <div className="absolute inset-x-2 bottom-0 h-px group-data-[state=active]:bg-fd-primary" />
      {children}
    </TabsTrigger>
  );
}

export function CodeBlockTab(props: ComponentProps<typeof TabsContent>) {
  return <TabsContent {...props} />;
}

// --- Card Component ---

export function Cards(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("grid grid-cols-2 gap-3 @container", props.className)}
    >
      {props.children}
    </div>
  );
}

export type CardProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;

  href?: string;
  external?: boolean;
};

export function Card({ icon, title, description, ...props }: CardProps) {
  const E = props.href ? FumadocsLink : "div";

  return (
    <E
      {...props}
      data-card
      className={cn(
        "block rounded-xl border bg-fd-card p-4 text-fd-card-foreground transition-colors @max-lg:col-span-full",
        props.href && "hover:bg-fd-accent/80",
        props.className,
      )}
    >
      {icon ? (
        <div className="not-prose mb-2 w-fit shadow-md rounded-lg border bg-fd-muted p-1.5 text-fd-muted-foreground [&_svg]:size-4">
          {icon}
        </div>
      ) : null}
      <h3 className="not-prose mb-1 text-sm font-medium">{title}</h3>
      {description ? (
        <p className="my-0! text-sm text-fd-muted-foreground">{description}</p>
      ) : null}
      <div className="text-sm text-fd-muted-foreground prose-no-margin empty:hidden">
        {props.children}
      </div>
    </E>
  );
}

// --- Callout Component ---

export type CalloutType =
  | "info"
  | "warn"
  | "error"
  | "success"
  | "warning"
  | "idea";

const iconClass = "size-5 -me-0.5 fill-(--callout-color) text-fd-card";

export interface CalloutContainerProps extends ComponentProps<"div"> {
  /**
   * @defaultValue info
   */
  type?: CalloutType;

  /**
   * Force an icon
   */
  icon?: ReactNode;
}

function resolveAlias(type: CalloutType) {
  if (type === "warn") return "warning";
  if ((type as unknown) === "tip") return "info";
  return type;
}

export function CalloutContainer({
  type: inputType = "info",
  icon,
  children,
  className,
  style,
  ...props
}: CalloutContainerProps) {
  const type = resolveAlias(inputType);

  return (
    <div
      className={cn(
        "flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-md",
        className,
      )}
      style={
        {
          "--callout-color": `var(--color-fd-${type}, var(--color-fd-muted))`,
          ...style,
        } as object
      }
      {...props}
    >
      <div role="none" className="w-0.5 bg-(--callout-color)/50 rounded-sm" />
      {icon ??
        {
          info: <Info className={iconClass} />,
          warning: <TriangleAlert className={iconClass} />,
          error: <CircleX className={iconClass} />,
          success: <CircleCheck className={iconClass} />,
          idea: <Sun className={iconClass} />,
        }[type]}
      <div className="flex flex-col gap-2 min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function CalloutTitle({
  children,
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p className={cn("font-medium my-0!", className)} {...props}>
      {children}
    </p>
  );
}

export function CalloutDescription({
  children,
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <div
      className={cn(
        "text-fd-muted-foreground prose-no-margin empty:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Callout({
  children,
  title,
  ...props
}: { title?: ReactNode } & Omit<CalloutContainerProps, "title">) {
  return (
    <CalloutContainer {...props}>
      {title && <CalloutTitle>{title}</CalloutTitle>}
      <CalloutDescription>{children}</CalloutDescription>
    </CalloutContainer>
  );
}

// --- defaultMdxComponents ---

function CustomLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href || "#";
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      target="_blank"
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "font-medium underline underline-offset-4 decoration-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors",
        props.className,
      )}
      {...props}
    >
      {props.children}
    </Link>
  );
}

function CustomImage(
  props: ImgHTMLAttributes<HTMLImageElement> & {
    sizes?: string;
  },
) {
  return (
    <ImageZoom
      {...(props as ComponentProps<typeof ImageZoom>)}
      src={props.src as string}
      alt={props.alt || ""}
      className={cn("object-fill", props.className)}
    />
  );
}

function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative overflow-auto prose-no-margin my-6">
      <table {...props} />
    </div>
  );
}

function UnorderedList(props: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "my-6 ml-6 list-disc marker:text-zinc-500",
        props.className,
      )}
      {...props}
    />
  );
}

function OrderedList(props: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn(
        "my-6 ml-6 list-decimal marker:text-zinc-500",
        props.className,
      )}
      {...props}
    />
  );
}

function ListItem(props: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn(
        "mt-2 text-foreground/80 dark:text-foreground/60 text-base font-normal leading-7.5! text-pretty",
        props.className,
      )}
      {...props}
    />
  );
}

const defaultMdxComponents = {
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
  Card,
  Cards,
  a: CustomLink,
  Link: CustomLink,
  img: CustomImage,
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "leading-7.5! text-pretty text-foreground/80 dark:text-foreground/60 text-base font-normal",
        props.className,
      )}
      {...props}
    />
  ),
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h1" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h3" {...props}/>
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h4" {...props} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h5" {...props} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h6" {...props} />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn(
        "font-medium text-foreground dark:text-white",
        props.className,
      )}
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "bg-muted/50 px-[0.3rem] py-[0.2rem] rounded font-mono text-sm font-medium text-foreground dark:bg-white/10 dark:text-white border border-border/50",
        props.className,
      )}
      {...props}
    />
  ),

  table: Table,
  Callout,
  CalloutContainer,
  CalloutTitle,
  CalloutDescription,
  Tweet: ({ id }: { id: string }) => (
    <div className="my-6 flex justify-center">
      <Tweet id={id} />
    </div>
  ),
  ImageSlider,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRelativeLink: any = () => {
  throw new Error(
    "`createRelativeLink` is only supported in Node.js environment",
  );
};

export { defaultMdxComponents as default };
