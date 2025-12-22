"use client";

import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";
import { trackEvent, captureException } from "@/lib/events";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary for the application
 * Catches and displays errors in a user-friendly way
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console in development, or send to error tracking service
    logger.error("Application error caught by error boundary", error, {
      context: "error-boundary",
      meta: { digest: error.digest },
    });

    // Track error with PostHog
    trackEvent({
      name: "application_error",
      properties: {
        error_message: error.message,
        error_digest: error.digest || null,
      },
    });

    // Capture exception for PostHog error tracking
    captureException(error, { context: "error-boundary" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
        <p className="mb-6 text-muted-foreground">
          We apologize for the inconvenience. An unexpected error occurred.
        </p>
        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 rounded-lg border bg-muted p-4 text-left text-sm">
            <summary className="cursor-pointer font-semibold">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto whitespace-pre-wrap break-words text-xs">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => {
              trackEvent({
                name: "error_retry_clicked",
                properties: {
                  error_message: error.message,
                },
              });
              reset();
            }}
            variant="default"
          >
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
