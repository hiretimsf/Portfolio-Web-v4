"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

// Logo component with avatar and brand name
const LogoButton = memo(({ className }: { className?: string }) => {
  return (
    <Link
      className={cn("group flex items-center gap-2", className)}
      href="/"
      aria-label="Go to homepage"
    >
      <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
        <Image
          src="/images/logo.png"
          alt="HireTim logo"
          className="size-full object-cover"
          width={48}
          height={48}
          priority
        />
      </div>
      <span className="text-foreground group-hover:text-foreground/80 text-xl font-semibold group-hover:underline group-hover:underline-offset-6 md:text-lg">
        HireTim
      </span>
    </Link>
  );
});

LogoButton.displayName = "LogoButton";

export default LogoButton;
