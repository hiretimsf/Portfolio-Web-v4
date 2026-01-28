"use client";

import Desktop from "@/components/layout/header/Desktop";
import Mobile from "@/components/layout/header/Mobile";
import ProgressBar from "@/components/layout/header/ProgressBar";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, type FC } from "react";

interface Props {
  showProgressBar?: boolean;
}

const Header: FC<Props> = () => {
  const path = usePathname();
  const showProgressBar = path?.startsWith("/blog/post/");

  const { scrollY } = useScroll();

  const [affix, setAffix] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const handleMobileMenuChange = (open: boolean) => {
    setMobileMenuOpen(open);
    if (open) {
      setIsFixed(true);
    } else {
      setTimeout(() => setIsFixed(false), 300);
    }
  };

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setAffix(latestValue >= 8);
  });

  return (
    <>
      <header
        suppressHydrationWarning
        className={cn(
          "w-full border-y border-edge bg-background transition-transform fixed top-0 inset-x-0",
          mobileMenuOpen || isFixed ? "z-100" : "z-50",
        )}
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
      >
        <div
          suppressHydrationWarning
          data-affix={affix}
          className={cn(
            "mx-auto max-w-5xl px-4 border-x border-edge",
            "data-[affix=true]:shadow-md dark:data-[affix=true]:shadow-md",
            "transition-shadow duration-300",
          )}
        >
          <Desktop activePath={path} />
          <Mobile
            currentPath={path}
            isOpen={mobileMenuOpen}
            onOpenChange={handleMobileMenuChange}
          />
        </div>
        {showProgressBar && <ProgressBar />}
      </header>
      <div className="h-18" aria-hidden="true" />
    </>
  );
};

export default Header;
