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
import { FaLinkedin as LinkedInIcon } from "react-icons/fa";
import { FaSquareXTwitter as XIcon } from "react-icons/fa6";
import { trackEvent } from "@/lib/utils";
import { FaReddit as RedditIcon } from "react-icons/fa";
import { FaFacebook as FacebookIcon } from "react-icons/fa";
import { FaHackerNewsSquare as HackerNewsIcon } from "react-icons/fa";

export function ShareButton({ url }: { url: string }) {
  const absoluteUrl = url.startsWith("http")
    ? url
    : typeof window !== "undefined"
      ? new URL(url, window.location.origin).toString()
      : url;

  const urlEncoded = encodeURIComponent(absoluteUrl);
  // Titles should also be encoded usually but for these simple share URLs it might be okay or handled by platform.
  // Facebook only takes u (url). Reddit takes url and title. HN takes u (url) and t (title).
  // We'll just pass the URL for now as per `ShareButton` pattern.

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="active:scale-none border border-black/10 dark:border-white/10 rounded-xl corner-squircle hover:bg-black/5 dark:hover:bg-white/5 border-dashed"
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
              name: "blog_share_reddit",
              properties: {
                url: absoluteUrl,
              },
            });
          }}
        >
          <a
            href={`https://www.reddit.com/submit?url=${urlEncoded}`}
            target="_blank"
            rel="noopener"
          >
            <RedditIcon />
            Share on Reddit
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          onClick={() => {
            trackEvent({
              name: "blog_share_hackernews",
              properties: {
                url: absoluteUrl,
              },
            });
          }}
        >
          <a
            href={`https://news.ycombinator.com/submitlink?u=${urlEncoded}`}
            target="_blank"
            rel="noopener"
          >
            <HackerNewsIcon />
            Share on Hacker News
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          onClick={() => {
            trackEvent({
              name: "blog_share_facebook",
              properties: {
                url: absoluteUrl,
              },
            });
          }}
        >
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`}
            target="_blank"
            rel="noopener"
          >
            <FacebookIcon />
            Share on Facebook
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
