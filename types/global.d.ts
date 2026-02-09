/**
 * Global type declarations for the application
 */

/**
 * Google Analytics gtag function type
 */
type GtagFunction = (
  command: "event" | "config" | "set",
  eventName: string,
  params?: Record<string, unknown>
) => void;

/**
 * Extended Window interface with Google Analytics
 */
declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}

export {};
