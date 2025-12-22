"use client";

import { LinkIcon, ShareIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { copyText } from "@/features/blog/utils/copy";
import { LinkedInIcon } from "@/features/blog/icons/LinkedInIcon";
import { XIcon } from "@/features/blog/icons/XIcon";
import { trackEvent } from "@/lib/events";

export function ShareButton({ url }: { url: string }) {
  const absoluteUrl = url.startsWith("http")
    ? url
    : typeof window !== "undefined"
      ? new URL(url, window.location.origin).toString()
      : url;

  const urlEncoded = encodeURIComponent(absoluteUrl);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="active:scale-none border border-border-edge rounded-md"
          variant="secondary"
          size="icon-sm"
        >
          <ShareIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        collisionPadding={8}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem
          onClick={() => {
            copyText(absoluteUrl);
            toast.success("Copied link");
            trackEvent({
              name: "blog_copy_link",
              properties: {
                url: absoluteUrl,
              },
            });
          }}
        >
          <LinkIcon />
          Copy link
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          onClick={() => {
            trackEvent({
              name: "blog_share_x",
              properties: {
                url: absoluteUrl,
              },
            });
          }}
        >
          <a
            href={`https://x.com/intent/tweet?url=${urlEncoded}`}
            target="_blank"
            rel="noopener"
          >
            <XIcon />
            Share on X
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          onClick={() => {
            trackEvent({
              name: "blog_share_linkedin",
              properties: {
                url: absoluteUrl,
              },
            });
          }}
        >
          <a
            href={`https://www.linkedin.com/sharing/share-offsite?url=${urlEncoded}`}
            target="_blank"
            rel="noopener"
          >
            <LinkedInIcon />
            Share on LinkedIn
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
