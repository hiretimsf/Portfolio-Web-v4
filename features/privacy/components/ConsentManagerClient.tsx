"use client";

import { ClientSideOptionsProvider } from "@c15t/nextjs/client";

export function ConsentManagerClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientSideOptionsProvider
      callbacks={{
        onConsentSet() {
          // You can add Google Analytics consent logic here if needed
          // e.g., window.gtag('consent', 'update', { 'analytics_storage': preferences.measurement ? 'granted' : 'denied' });
        },
      }}
    >
      {children}
    </ClientSideOptionsProvider>
  );
}
