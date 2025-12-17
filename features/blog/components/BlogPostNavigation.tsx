"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { LLMCopyButtonWithViewOptions } from "@/features/blog/components/buttons/ActionButton";
import type { BlogPostType } from "@/features/blog/types/BlogPostType";
import { ShareButton } from "@/features/blog/components/buttons/ShareButton";
import BackButton from "@/features/blog/components/buttons/BackButton";

type BlogPostNavigationItem = Omit<BlogPostType, "body">;

interface BlogPostNavigationProps {
  post: BlogPostNavigationItem;
  previous?: BlogPostNavigationItem;
  next?: BlogPostNavigationItem;
}

export default function BlogPostNavigation({
  post,
  previous,
  next,
}: BlogPostNavigationProps) {
  return (
    <div className="flex items-center justify-between p-2 pl-4">
      <BackButton />

      <div className="flex items-center gap-2">
        <LLMCopyButtonWithViewOptions markdownUrl={`/blog.mdx/${post.slug}`} />

        <ShareButton url={`/blog/post/${post.slug}`} />

        {previous && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 border border-border-edge rounded-md"
                asChild
              >
                <Link href={`/blog/post/${previous.slug}`}>
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Previous: {previous.title}</span>
                </Link>
              </Button>
            </TooltipTrigger>

            <TooltipContent className="pr-2 pl-3">
              <div className="flex items-center gap-3">
                <span>Previous Post</span>
                <KbdGroup>
                  <Kbd>
                    <ArrowLeftIcon className="h-3 w-3" />
                  </Kbd>
                </KbdGroup>
              </div>
            </TooltipContent>
          </Tooltip>
        )}

        {next && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 border border-border-edge rounded-md"
                asChild
              >
                <Link href={`/blog/post/${next.slug}`}>
                  <span className="sr-only">Next: {next.title}</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>

            <TooltipContent className="pr-2 pl-3">
              <div className="flex items-center gap-3">
                <span>Next Post</span>
                <KbdGroup>
                  <Kbd>
                    <ArrowRightIcon className="h-3 w-3" />
                  </Kbd>
                </KbdGroup>
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
