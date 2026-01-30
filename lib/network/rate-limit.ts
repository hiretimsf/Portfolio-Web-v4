import { LRUCache } from "lru-cache";

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
