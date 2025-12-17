// Thanks @fumadocs

"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useOptimistic, useTransition } from "react";

import { motionIconProps } from "@/features/blog/components/buttons/CopyButton";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MarkdownIcon } from "@/features/blog/icons/MarkDownIcon";
import { OpenAIIcon } from "@/features/blog/icons/OpenAI-Icon";
import { ClaudeIcon } from "@/features/blog/icons/ClaudeIcon";
import { SciraIcon } from "@/features/blog/icons/SciraIcon";

const cache = new Map<string, string>();

function LLMCopyButton({ markdownUrl }: { markdownUrl: string }) {
  const [state, setState] = useOptimistic<"idle" | "copied" | "failed">("idle");
  const [, startTransition] = useTransition();

  const handleCopy = () => {
    startTransition(async () => {
      try {
        setState("copied");

        const cached = cache.get(markdownUrl);
        if (cached) {
          await navigator.clipboard.writeText(cached);
          return;
        }

        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": fetch(markdownUrl)
              .then((res) => res.text())
              .then((content) => {
                cache.set(markdownUrl, content);
                return content;
              }),
          }),
        ]);
      } catch {
        setState("failed");
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    });
  };

  return (
    <button
      className="flex h-7 px-3 text-sm font-sans font-medium active:scale-none disabled:pointer-events-none disabled:opacity-50 items-center gap-1.5 rounded-l-full pr-2 pl-2.5"
      onClick={handleCopy}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {state === "idle" ? (
          <motion.span key="idle" {...motionIconProps}>
            <CopyIcon />
          </motion.span>
        ) : state === "copied" ? (
          <motion.span key="copied" {...motionIconProps}>
            <CheckIcon strokeWidth={3} />
          </motion.span>
        ) : state === "failed" ? (
          <motion.span key="failed" {...motionIconProps}>
            <TriangleAlertIcon />
          </motion.span>
        ) : null}
      </AnimatePresence>
      MDX
    </button>
  );
}

function getPrompt(url: string) {
  return `Read this article at ${url}. I want to ask questions about it.`;
}

function ViewOptions({ markdownUrl }: { markdownUrl: string }) {
  const items = useMemo(() => {
    const fullMarkdownUrl =
      typeof window !== "undefined"
        ? new URL(markdownUrl, window.location.origin).toString()
        : markdownUrl;

    const q = getPrompt(fullMarkdownUrl);

    return [
      {
        title: "View as Markdown",
        href: fullMarkdownUrl,
        icon: MarkdownIcon,
      },
      {
        title: "Open in ChatGPT",
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: "search",
          q,
        })}`,
        icon: OpenAIIcon,
      },
      {
        title: "Open in Claude",
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: ClaudeIcon,
      },
      {
        title: "Open in Scira AI",
        href: `https://scira.ai/?${new URLSearchParams({
          q,
        })}`,
        icon: SciraIcon,
      },
    ];
  }, [markdownUrl]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex size-7 items-center justify-center gap-2 rounded-r-full text-sm">
          <ChevronDownIcon className="mt-0.5 size-4" />
          <span className="sr-only">View Options</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {items.map(({ title, href, icon: Icon }) => (
          <DropdownMenuItem key={href} asChild>
            <a href={href} rel="noreferrer noopener" target="_blank">
              <Icon />
              {title}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LLMCopyButtonWithViewOptions({
  markdownUrl,
}: {
  markdownUrl: string;
}) {
  return (
    <div
      className={cn(
        buttonVariants({
          size: "sm",
          variant: "secondary",
          className:
            "gap-0 divide-x px-0 font-sans active:scale-none dark:divide-white/10 border border-border-edge rounded-md",
        }),
      )}
    >
      <LLMCopyButton markdownUrl={markdownUrl} />
      <ViewOptions markdownUrl={markdownUrl} />
    </div>
  );
}
