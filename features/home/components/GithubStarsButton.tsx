"use client";

import { getGitHubStars } from "@/actions/github";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/icons/GithubIcon";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const formatNumber = (
  num: number,
  formatted: boolean,
): { number: string[]; unit: string } => {
  if (formatted) {
    if (num < 1000) {
      return { number: [num.toString()], unit: "" };
    }
    const units = ["k", "M", "B", "T"];
    let unitIndex = 0;
    let n = num;
    while (n >= 1000 && unitIndex < units.length) {
      n /= 1000;
      unitIndex++;
    }
    const finalNumber = Math.floor(n).toString();
    return { number: [finalNumber], unit: units[unitIndex - 1] };
  }
  return { number: num.toLocaleString("en-US").split(","), unit: "" };
};

interface GitHubStarsButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  username?: string;
  repo?: string;
  formatted?: boolean;
}

const GitHubStarsButton = React.forwardRef<
  HTMLAnchorElement,
  GitHubStarsButtonProps
>(({ username, repo, href, formatted = false, className, ...props }, ref) => {
  const [stars, setStars] = React.useState(0);

  React.useEffect(() => {
    if (!username || !repo) return;

    const fetchStars = async () => {
      try {
        const { stars: starCount } = await getGitHubStars(username, repo);
        setStars(starCount);
      } catch (error) {
        console.error("Failed to fetch stars:", error);
      }
    };

    fetchStars();
  }, [username, repo]);

  const formattedResult = formatNumber(stars, formatted);

  const renderNumber = (segments: string[], unit: string) => (
    <span className="flex items-center gap-px">
      {segments.map((segment, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: index is stable for formatted numbers
        <React.Fragment key={index}>
          <span>{segment}</span>
          {index < segments.length - 1 && <span>,</span>}
        </React.Fragment>
      ))}
      {formatted && unit && <span className="leading-none">{unit}</span>}
    </span>
  );

  return (
    <Button
      asChild
      className={cn(
        "bg-panda-blue hover:bg-panda-blue/90 text-md w-full gap-0 text-white transition-colors duration-200 hover:shadow-md",
        className,
      )}
    >
      <Link
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        <GithubIcon className="mr-1 size-4 fill-current" />
        <span>GitHub</span>
        {stars > 0 && (
          <>
            <div className="relative ml-2 inline-flex size-[18px] shrink-0">
              <Star
                className="fill-yellow-500 text-yellow-500"
                size={18}
                aria-hidden="true"
              />
            </div>
            <span className="relative inline-flex">
              {renderNumber(formattedResult.number, formattedResult.unit)}
            </span>
          </>
        )}
      </Link>
    </Button>
  );
});

GitHubStarsButton.displayName = "GitHubStarsButton";

export { GitHubStarsButton, type GitHubStarsButtonProps };
