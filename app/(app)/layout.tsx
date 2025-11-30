import dynamic from "next/dynamic";

import { SiteFooter } from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const ScrollToTop = dynamic(() =>
  import("@/components/ScrollToTop").then((mod) => mod.ScrollToTop),
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full">
      <SiteHeader />
      <main className="mx-auto max-w-5xl w-full text-center border-x border-edge">
        {children}
      </main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
