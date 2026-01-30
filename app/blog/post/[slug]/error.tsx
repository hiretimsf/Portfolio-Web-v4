"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Blog post error:", error);
    }
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Something went wrong loading this blog post
        </h2>
        <p className="text-muted-foreground">
          We encountered an error while trying to load this blog post. This
          might be a temporary issue.
        </p>
      </div>

      <div className="flex gap-4">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
        <Button onClick={() => (window.location.href = "/blog")} variant="outline">
          Return to blog
        </Button>
      </div>

      {process.env.NODE_ENV === "development" && error.message && (
        <details className="mt-8 w-full max-w-prose rounded-lg border border-red-200 bg-red-50 p-4 text-left dark:border-red-800 dark:bg-red-950/20">
          <summary className="cursor-pointer font-semibold text-red-900 dark:text-red-100">
            Error Details (Development Only)
          </summary>
          <pre className="mt-4 overflow-auto text-sm text-red-800 dark:text-red-200">
            {error.message}
          </pre>
          {error.stack && (
            <pre className="mt-2 overflow-auto text-xs text-red-700 dark:text-red-300">
              {error.stack}
            </pre>
          )}
        </details>
      )}
    </div>
  );
}
