"use client";

import { AppProgressProvider } from "@bprogress/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
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
        <SpeedInsights />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
