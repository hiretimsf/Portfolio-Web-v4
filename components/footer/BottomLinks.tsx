import { SITE_INFO } from "@/config/seo/site";
import Separator from "@/components/footer/Separator";
import { FaSitemap, FaSquareRss } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuBrain as FaBrain } from "react-icons/lu";

export default function BottomLinks() {
  return (
    <div className="mx-auto flex items-center justify-center gap-3 border-x border-edge bg-background px-4">
      <FooterLink
        href={`${SITE_INFO.url}/llms.txt`}
        target="_blank"
        icon={
          <FaBrain
            aria-hidden="true"
            className={cn(defaultStyle, "size-[18px]")}
          />
        }
        label="llms.txt"
        ariaLabel="View llms.txt"
      />

      <Separator />

      <FooterLink
        href="/sitemap.xml"
        icon={
          <FaSitemap
            aria-hidden="true"
            className={cn(defaultStyle, "size-[18px]")}
          />
        }
        label="Sitemap"
        ariaLabel="View website sitemap"
      />

      <Separator />

      <FooterLink
        href="/rss.xml"
        icon={
          <FaSquareRss
            aria-hidden="true"
            className={cn(defaultStyle, "size-[18px]")}
          />
        }
        label="RSS Feed"
        ariaLabel="Subscribe to RSS feed"
      />
    </div>
  );
}

interface FooterLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  ariaLabel?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

const defaultStyle =
  "text-muted-foreground group-hover:text-accent-foreground transition-colors duration-200";

const FooterLink = ({
  href,
  icon,
  label,
  ariaLabel,
  target,
}: FooterLinkProps) => (
  <Button variant="link" asChild className="group">
    <Link
      href={href}
      className="group flex items-center gap-2"
      aria-label={ariaLabel || label}
      prefetch={true}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {icon}
      <span className={cn(defaultStyle)}>{label}</span>
    </Link>
  </Button>
);
