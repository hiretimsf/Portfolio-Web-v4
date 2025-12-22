import { LRUCache } from "lru-cache";

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

/**
 * Rate limiter using LRU cache
 * Prevents abuse by limiting requests per IP/token
 */
export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000, // 1 minute default
  });

  return {
    check: async (limit: number, token: string): Promise<void> => {
      const tokenCount = tokenCache.get(token) || [0];

      if (tokenCount[0] === 0) {
        tokenCache.set(token, tokenCount);
      }

      tokenCount[0] = (tokenCount[0] ?? 0) + 1;

      const currentUsage = tokenCount[0] ?? 0;
      const isRateLimited = currentUsage > limit;

      if (isRateLimited) {
        throw new Error("Rate limit exceeded");
      }
    },

    /**
     * Get current usage for a token
     */
    getUsage: (token: string): number => {
      const tokenCount = tokenCache.get(token);
      return tokenCount?.[0] ?? 0;
    },
  };
}

/**
 * Get identifier from request (IP address or fallback)
 */
export function getIdentifier(request: Request): string {
  // Try to get real IP from various headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  return (
    cfConnectingIp || realIp || forwarded?.split(",")[0]?.trim() || "anonymous"
  );
}
