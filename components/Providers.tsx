"use client";

import { AppProgressProvider } from "@bprogress/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";

if (typeof window !== "undefined") {
  import("@/instrumentation-client");
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          enableColorScheme
          storageKey="theme"
          defaultTheme="system"
          attribute="class"
        >
          <RootProvider search={{ enabled: false }}>
            <AppProgressProvider
              color="var(--foreground)"
              height="2px"
              delay={500}
              options={{ showSpinner: false }}
            >
              {children}
            </AppProgressProvider>
          </RootProvider>

          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}
