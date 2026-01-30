import { z } from "zod";

const eventSchema = z.object({
  name: z.string(),
  properties: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.null()]),
    )
    .optional(),
});

export type Event = z.infer<typeof eventSchema>;

/**
 * Tracks a custom event in Google Analytics (gtag)
 */
export function trackEvent(input: Event) {
  try {
    const event = eventSchema.parse(input);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.name, {
        ...event.properties,
      });
    } else if (process.env.NODE_ENV === "development") {
      console.warn("[GA] Track Event (skipping - not initialized):", event);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to track event:", error);
    }
  }
}

/**
 * Captures an exception and tracks it as an error event in Google Analytics
 */
export function captureException(
  error: Error,
  properties?: Record<string, unknown>,
) {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.message,
        fatal: properties?.fatal ?? false,
        ...properties,
      });
    } else if (process.env.NODE_ENV === "development") {
      console.warn(
        "[GA] Capture Exception (skipping - not initialized):",
        error,
        properties,
      );
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to capture exception:", err);
    }
  }
}
