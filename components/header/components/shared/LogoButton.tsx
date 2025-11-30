"use client";

import { MusicIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Logo component with avatar and brand name
const LogoButton = memo(({ className }: { className?: string }) => (
  <Link
    className={cn("group flex items-center gap-2", className)}
    href="/"
    aria-label="Go to homepage"
  >
    <Avatar className="size-6">
      <AvatarImage alt="HireTim logo" src="/images/logo.png" />
      <AvatarFallback>
        <MusicIcon className="size-6" />
      </AvatarFallback>
    </Avatar>
    <span className="text-foreground group-hover:text-foreground/80 text-xl font-semibold group-hover:underline group-hover:underline-offset-6 md:text-lg">
      HireTim
    </span>
  </Link>
));

LogoButton.displayName = "LogoButton";

export default LogoButton;
