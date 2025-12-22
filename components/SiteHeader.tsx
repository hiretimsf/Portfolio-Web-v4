"use client";

import DesktopHeader from "@/components/header/desktop/DesktopHeader";
import MobileHeader from "@/components/header/mobile/MobileHeader";
import ProgressBar from "@/components/header/shared/ProgressBar";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, type FC } from "react";

interface Props {
  showProgressBar?: boolean;
}

const SiteHeader: FC<Props> = () => {
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
        className={cn(
          "z-50 w-full border-y border-edge bg-background transition-transform",
          mobileMenuOpen || isFixed
            ? "fixed top-0 inset-x-0 z-[100]"
            : "sticky top-0",
        )}
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
      >
        <div
          data-affix={affix}
          className={cn(
            "mx-auto max-w-5xl px-4 border-x border-edge",
            "data-[affix=true]:shadow-md dark:data-[affix=true]:shadow-md",
            "transition-shadow duration-300",
          )}
        >
          <DesktopHeader activePath={path} />
          <MobileHeader
            currentPath={path}
            isOpen={mobileMenuOpen}
            onOpenChange={handleMobileMenuChange}
          />
        </div>
        {showProgressBar && <ProgressBar />}
      </header>
      {(mobileMenuOpen || isFixed) && (
        <div className="h-18" aria-hidden="true" />
      )}
    </>
  );
};

export default SiteHeader;
