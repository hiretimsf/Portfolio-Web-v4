"use client";

import ProgressBar from "@/components/header/components/shared/ProgressBar";
import { usePathname } from "next/navigation";
import { FC } from "react";
import DesktopHeader from "@/components/header/components/desktop/DesktopHeader";

interface Props {
  showProgressBar?: boolean;
}

const SiteHeader: FC<Props> = ({ showProgressBar = false }) => {
  const path = usePathname();

  return (
    <div className="sticky inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="relative mx-auto w-full px-3 lg:px-4 xl:px-0">
        <DesktopHeader activePath={path} />
        {/* <MobileHeader currentPath={path} /> */}
      </div>
      {showProgressBar && <ProgressBar />}
    </div>
  );
};

export default SiteHeader;
