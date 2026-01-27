import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  TableHTMLAttributes,
} from "react";
import { Image as FrameworkImage } from "fumadocs-core/framework";
import { Card, Cards } from "./card";
import {
  Callout,
  CalloutContainer,
  CalloutDescription,
  CalloutTitle,
} from "./callout";
import { Heading } from "./heading";
import { cn } from "@/lib/utils";
import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  Pre,
} from "./codeblock";

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

function Image(
  props: ImgHTMLAttributes<HTMLImageElement> & {
    sizes?: string;
  },
) {
  return (
    <FrameworkImage
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
      {...props}
      src={props.src as unknown as string}
      className={cn("rounded-lg", props.className)}
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
  CodeBlockTab,
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
  img: Image,
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "leading-7.5! text-pretty text-foreground/80 dark:text-foreground/60 text-base font-normal my-4",
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
    <Heading as="h3" {...props} />
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
};

import type { createRelativeLink as CreateRelativeLinkType } from "@/components/mdx/mdx.server";

export const createRelativeLink: typeof CreateRelativeLinkType = () => {
  throw new Error(
    "`createRelativeLink` is only supported in Node.js environment",
  );
};

export { defaultMdxComponents as default };
