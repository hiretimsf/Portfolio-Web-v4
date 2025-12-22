/**
 * Logger utility for consistent logging across the application
 * Prevents sensitive data leakage in production
 */

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

type LogLevel = "log" | "info" | "warn" | "error" | "debug";

interface LoggerOptions {
  context?: string;
  meta?: Record<string, unknown>;
}

class Logger {
  private prefix(level: LogLevel, context?: string): string {
    const timestamp = new Date().toISOString();
    const ctx = context ? `[${context}]` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${ctx}`;
  }

  private shouldLog(level: LogLevel): boolean {
    if (isTest) return false;
    if (level === "error") return true; // Always log errors
    return isDev;
  }

  log(message: string, options?: LoggerOptions): void {
    if (!this.shouldLog("log")) return;
    console.log(
      this.prefix("log", options?.context),
      message,
      options?.meta || "",
    );
  }

  info(message: string, options?: LoggerOptions): void {
    if (!this.shouldLog("info")) return;
    console.info(
      this.prefix("info", options?.context),
      message,
      options?.meta || "",
    );
  }

  warn(message: string, options?: LoggerOptions): void {
    if (!this.shouldLog("warn")) return;
    console.warn(
      this.prefix("warn", options?.context),
      message,
      options?.meta || "",
    );
  }

  error(
    message: string,
    error?: Error | unknown,
    options?: LoggerOptions,
  ): void {
    if (!this.shouldLog("error")) return;

    if (isDev) {
      console.error(
        this.prefix("error", options?.context),
        message,
        error,
        options?.meta || "",
      );
    } else {
      // In production, log sanitized error message
      console.error(this.prefix("error", options?.context), message);

      // Here you would send to error tracking service (Sentry, etc.)
      // Example: Sentry.captureException(error);
    }
  }

  debug(message: string, options?: LoggerOptions): void {
    if (!this.shouldLog("debug")) return;
    console.debug(
      this.prefix("debug", options?.context),
      message,
      options?.meta || "",
    );
  }
}

export const logger = new Logger();
