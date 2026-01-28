import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { LRUCache } from "lru-cache";
import * as React from "react";
import { type JSX } from "react";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

// ==========================================
// 1. UI & Core Utilities
// ==========================================

/**
 * Merges Tailwind classes with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Merges multiple refs into a single RefCallback
 */
export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    });
  };
}

/**
 * Determines if a navigation link is active based on the current pathname
 */
export function isActive(
  url: string,
  pathname: string,
  nested: boolean = true,
): boolean {
  if (url === pathname) return true;
  if (!nested) return false;
  return pathname.startsWith(url + "/");
}

// ==========================================
// 2. String & URL Utilities
// ==========================================

export function truncateTitle(title: string, maxLength: number = 60): string {
  return title.length > maxLength
    ? title.slice(0, maxLength - 3) + "..."
    : title;
}

export function truncateDescription(
  description: string,
  maxLength: number = 160,
): string {
  return description.length > maxLength
    ? description.slice(0, maxLength - 3) + "..."
    : description;
}

/**
 * Normalizes text into a URL-safe slug
 */
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize(`NFD`)
    .trim()
    .replace(/\./g, ``)
    .replace(/\s+/g, `-`)
    .replace(/[^\w-]+/g, ``)
    .replace(/--+/g, `-`);
}

/**
 * Gets the base URL for the application, handling dev and prod environments
 */
export function getBaseUrl(slug?: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hiretimsf.com");

  if (!slug) return baseUrl;

  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;
  return `${baseUrl}${normalizedSlug}`;
}

// ==========================================
// 3. Date & Time Utilities
// ==========================================

/**
 * Formats a date string into a human-readable format
 */
export function formatDate(date: string, formatStr: string = "MM/dd/yyyy") {
  if (date === "Present" || date === "present") return "Present";
  return format(new Date(date), formatStr);
}

/**
 * Parses a date string or range (e.g., "Jan 2020 - Present") into a numeric timestamp
 */
export function parseDate(dateStr?: string): number {
  if (!dateStr || typeof dateStr !== "string") return 0;

  const normalizedStr = dateStr.trim().toLowerCase();
  if (normalizedStr.includes("present") || normalizedStr.includes("current")) {
    return Date.now();
  }

  const parts = dateStr.split(/\s+[-–—]\s+/);
  const dateToParse = (parts[parts.length - 1] ?? dateStr).trim();

  if (!dateToParse) return 0;

  const timestamp = new Date(dateToParse).getTime();
  return isNaN(timestamp) ? 0 : timestamp;
}

/**
 * Gets the most recent date from a list of employment positions to determine sort order
 */
export function getMostRecentDate(
  positions: Array<{ employmentPeriod: string }>,
): Date {
  const timestamps = positions
    .map((pos) => parseDate(pos.employmentPeriod))
    .filter((timestamp) => timestamp !== 0);

  if (timestamps.length === 0) return new Date(0);

  timestamps.sort((a, b) => b - a);
  const mostRecent = timestamps[0];
  return new Date(mostRecent ?? 0);
}

/**
 * Calculates human-readable duration between two dates
 * Returns format like "1 yr 10 months", "3 months", "6 months", etc.
 */
export function calculateDuration(fromDate: string, toDate: string): string {
  const start = new Date(fromDate);
  const end = toDate.toLowerCase() === "present" ? new Date() : new Date(toDate);
  
  const totalMonths = Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  );
  
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  if (years === 0) {
    return months === 1 ? "1 month" : `${months} months`;
  }
  
  if (months === 0) {
    return years === 1 ? "1 yr" : `${years} yrs`;
  }
  
  const yearStr = years === 1 ? "1 yr" : `${years} yrs`;
  const monthStr = months === 1 ? "1 month" : `${months} months`;
  return `${yearStr} ${monthStr}`;
}

// ==========================================
// 4. Networking & Security Utilities
// ==========================================

/**
 * Extracts the best possible identifier (IP) from request headers
 */
export function getIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  return (
    cfConnectingIp || realIp || forwarded?.split(",")[0]?.trim() || "anonymous"
  );
}

type RateLimitOptions = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

/**
 * Simple rate limiter using LRU cache to prevent API abuse
 */
export function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: async (limit: number, token: string): Promise<void> => {
      const tokenCount = tokenCache.get(token) || [0];

      if (tokenCount[0] === 0) {
        tokenCache.set(token, tokenCount);
      }

      tokenCount[0] = (tokenCount[0] ?? 0) + 1;
      const isRateLimited = (tokenCount[0] ?? 0) > limit;

      if (isRateLimited) {
        throw new Error("Rate limit exceeded");
      }
    },

    getUsage: (token: string): number => {
      const tokenCount = tokenCache.get(token);
      return tokenCount?.[0] ?? 0;
    },
  };
}

// ==========================================
// 5. Search Algorithms & Logic
// ==========================================

/**
 * Computes the Levenshtein distance between two strings for fuzzy matching
 */
export const levenshtein = (a: string, b: string): number => {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  const matrix: number[][] = Array.from({ length: bLen + 1 }, () =>
    Array(aLen + 1).fill(0),
  );

  for (let i = 0; i <= aLen; i++) matrix[0]![i] = i;
  for (let j = 0; j <= bLen; j++) matrix[j]![0] = j;

  for (let j = 1; j <= bLen; j++) {
    for (let i = 1; i <= aLen; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j]![i] = Math.min(
        matrix[j]![i - 1]! + 1,
        matrix[j - 1]![i]! + 1,
        matrix[j - 1]![i - 1]! + cost,
      );
    }
  }

  return matrix[bLen]![aLen]!;
};


/**
 * Extracts a window of text around the best match in a larger content block
 */
export function getContextAroundMatch(content: string, query: string) {
  if (!content || !query.trim()) return content;

  const searchWords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (searchWords.length === 0) return content;

  const windowSize = 150;
  let bestScore = 0;
  let bestStart = 0;

  for (let i = 0; i < content.length - windowSize; i += 50) {
    const window = content.slice(i, i + windowSize).toLowerCase();
    let score = 0;

    searchWords.forEach((word) => {
      const exactMatches = window.split(word).length - 1;
      score += exactMatches * word.length * 2;

      const fuzzyThreshold = 2;
      window.split(/\s+/).forEach((term) => {
        if (levenshtein(term as string, word) <= fuzzyThreshold) {
          score += word.length;
        }
      });
    });

    if (score > bestScore) {
      bestScore = score;
      bestStart = i;
    }
  }

  const contextStart = Math.max(0, bestStart - 50);
  const contextEnd = Math.min(content.length, bestStart + windowSize);

  let excerpt = content.slice(contextStart, contextEnd).trim();
  if (contextStart > 0) excerpt = "..." + excerpt;
  if (contextEnd < content.length) excerpt = excerpt + "...";

  return excerpt;
}

// ==========================================
// 6. Components & Rendering Utilities
// ==========================================

/**
 * Wraps search matches in <mark> tags for visual highlighting in the UI
 */
export function highlightMatches(text: string, query: string) {
  if (!query.trim()) return text;

  const searchWords = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length >= 3);
  if (searchWords.length === 0) return text;

  const tokens = text.split(/(\s+|[.,!?;])/g);

  return tokens.map((token, i) => {
    const tokenLower = token.trim().toLowerCase();
    if (!tokenLower) return token;

    let highlightedToken: JSX.Element | string = token;
    let shouldHighlight = false;

    searchWords.forEach((searchWord) => {
      const exactIndex = tokenLower.indexOf(searchWord);
      if (exactIndex !== -1) {
        shouldHighlight = true;
        if (token.length > searchWord.length) {
          const prefix = token.slice(0, exactIndex);
          const match = token.slice(exactIndex, exactIndex + searchWord.length);
          const suffix = token.slice(exactIndex + searchWord.length);
          highlightedToken = (
            <React.Fragment key={`${i}-${searchWord}`}>
              {prefix}
              <mark className="rounded bg-blue-500 px-0.5 text-white">
                {match}
              </mark>
              {suffix}
            </React.Fragment>
          );
        }
        return;
      }

      for (let j = 0; j <= tokenLower.length - searchWord.length; j++) {
        const substring = tokenLower.slice(j, j + searchWord.length);
        if (levenshtein(substring, searchWord) <= 1) {
          shouldHighlight = true;
          const prefix = token.slice(0, j);
          const match = token.slice(j, j + searchWord.length);
          const suffix = token.slice(j + searchWord.length);
          highlightedToken = (
            <React.Fragment key={`${i}-${searchWord}-fuzzy`}>
              {prefix}
              <mark className="rounded bg-blue-500 px-0.5 text-white">
                {match}
              </mark>
              {suffix}
            </React.Fragment>
          );
          return;
        }
      }
    });

    return shouldHighlight ? (
      typeof highlightedToken === "string" ? (
        <mark key={i} className="rounded bg-blue-500 px-0.5 text-white">
          {token}
        </mark>
      ) : (
        <span key={i}>{highlightedToken}</span>
      )
    ) : (
      token
    );
  });
}

/**
 * Simple markdown parser for rendering previews with basic styling (code, links, bold, italic)
 */
export function renderMarkdownContent({ content }: { content: string }) {
  const patterns = [
    {
      regex: /```(?:.*\n)?([\s\S]*?)```/g,
      render: (_: string, code: string) => (
        <code className="rounded bg-gray-300 px-1.5 py-0.5 whitespace-pre-wrap text-black">
          {code.trim()}
        </code>
      ),
    },
    {
      regex: /`([^`]+)`/g,
      render: (_: string, code: string) => (
        <code className="rounded bg-gray-300 px-1.5 py-0.5 text-black">
          {code}
        </code>
      ),
    },
    {
      regex: /\[([^\]]+)\]\(([^)]+)\)/g,
      render: (_: string, text: string, _href: string) => (
        <span className="inline font-medium text-black underline underline-offset-4">
          {text}
        </span>
      ),
    },
    {
      regex: /\*\*([^*]+)\*\*/g,
      render: (_: string, text: string) => (
        <b className="font-semibold text-black">{text}</b>
      ),
    },
    {
      regex: /(?<=\s)_([^_]+)_(?=\s)/g,
      render: (_: string, text: string) => (
        <i className="text-black italic">{text}</i>
      ),
    },
  ];

  let elements: (string | JSX.Element)[] = [content];

  patterns.forEach(({ regex, render }) => {
    elements = elements
      .map((element) => {
        if (typeof element !== "string") return element;

        const parts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(element)) !== null) {
          if (match.index > lastIndex) {
            parts.push(element.slice(lastIndex, match.index));
          }

          // @ts-expect-error tuple match
          parts.push(render(...match));
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < element.length) {
          parts.push(element.slice(lastIndex));
        }

        return parts;
      })
      .flat();
  });

  return elements;
}

// ==========================================
// 7. Environment & Analytics Utilities
// ==========================================

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  CONTACT_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  NEXT_PUBLIC_POSTHOG_UI_HOST: z.string().url().optional(),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates environment variables and throws if required values are missing
 */
export function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      throw new Error(
        `❌ Invalid environment variables:\n${missingVars.join("\n")}\n\nPlease check your .env.local file.`,
      );
    }
    throw error;
  }
}

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", event.name, {
        ...event.properties,
      });
    } else if (process.env.NODE_ENV === "development") {
      console.warn("[GA] Track Event (skipping - not initialized):", event);
    }
  } catch (error) {
    console.error("Failed to track event:", error);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", "exception", {
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
    console.error("Failed to capture exception:", err);
  }
}
