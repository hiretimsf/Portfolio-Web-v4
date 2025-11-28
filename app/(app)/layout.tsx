import dynamic from "next/dynamic";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const ScrollToTop = dynamic(() =>
	import("@/components/ScrollToTop").then((mod) => mod.ScrollToTop),
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto max-w-5xl min-h-screen">
			<SiteHeader />
			<main className="mx-auto w-full border-y border-border text-center">
				{children}
			</main>
			<SiteFooter />
			<ScrollToTop />
		</div>
	);
}
