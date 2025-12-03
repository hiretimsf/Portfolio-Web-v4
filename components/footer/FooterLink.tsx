import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FooterLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  ariaLabel?: string;
  target?: React.HTMLAttributeAnchorTarget;
  hideOnMobile?: boolean;
};

export const FOOTER_LINK_DEFAULT_STYLE =
  "text-foreground/80 hover:text-muted-foreground transition-colors duration-200 text-sm font-normal";

export default function FooterLink({
  href,
  icon,
  label,
  ariaLabel,
  target,
  hideOnMobile = false,
}: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "link" }),
        "group flex items-center gap-1 text-sm font-medium",
        hideOnMobile && "hidden sm:flex items-center",
      )}
      aria-label={ariaLabel || label}
      prefetch={true}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {icon}
      <span className={cn(FOOTER_LINK_DEFAULT_STYLE)}>{label}</span>
    </Link>
  );
}
