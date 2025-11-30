"use client";

import dynamic from "next/dynamic";
import ProgressBar from "@/components/header/components/shared/ProgressBar";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, type FC } from "react";

const MobileHeader = dynamic(
  () => import("@/components/header/components/mobile/MobileHeader"),
  {
    ssr: false,
  },
);

const DesktopHeader = dynamic(
  () => import("@/components/header/components/desktop/DesktopHeader"),
  {
    ssr: false,
  },
);

interface Props {
  showProgressBar?: boolean;
}

const HeaderSkeleton = () => (
  <div className="mx-auto hidden h-18 w-full max-w-5xl items-center justify-between md:flex">
    <Skeleton className="h-9 w-24" />
    <div className="flex items-center gap-5">
      <Skeleton className="h-9 w-16" />
      <Skeleton className="h-9 w-16" />
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-9 w-14" />
    </div>
    <Skeleton className="h-9 w-9" />
  </div>
);

const SiteHeader: FC<Props> = ({ showProgressBar = false }) => {
  const path = usePathname();
  const mounted = useMounted();
  const { scrollY } = useScroll();

  const [affix, setAffix] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setAffix(latestValue >= 8);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur bg-background w-full border-y border-edge",
      )}
    >
      <div
        data-affix={affix}
        className={cn(
          "mx-auto max-w-5xl px-4 border-x border-edge",
          "data-[affix=true]:shadow-md dark:data-[affix=true]:shadow-md",
          "transition-shadow duration-300",
        )}
      >
        {mounted ? <DesktopHeader activePath={path} /> : <HeaderSkeleton />}
        <MobileHeader currentPath={path} />
      </div>
      {showProgressBar && <ProgressBar />}
    </header>
  );
};

export default SiteHeader;
