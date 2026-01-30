/**
 * Utility functions organized into focused modules
 * This file maintains backward compatibility by re-exporting all utilities
 *
 * Prefer importing from specific modules:
 * - @/lib/ui/* for UI utilities
 * - @/lib/string/* for string operations
 * - @/lib/date/* for date operations
 * - @/lib/network/* for network utilities
 * - @/lib/search/* for search algorithms
 * - @/lib/component/* for component utilities
 * - @/lib/analytics/* for analytics and environment
 */

// UI & Core Utilities
export { cn } from "./ui/cn";
export { mergeRefs } from "./ui/refs";
export { isActive } from "./ui/navigation";
export { getShimmerDataUrl } from "./ui/shimmer";

// String & URL Utilities
export { truncate, truncateTitle, truncateDescription } from "./string/truncate";
export { slugify } from "./string/slug";
export { getBaseUrl } from "./string/url";

// Date & Time Utilities
export { formatDate } from "./date/format";
export { parseDate, getMostRecentDate } from "./date/parse";
export { calculateDuration } from "./date/duration";

// Networking & Security Utilities
export { getIdentifier } from "./network/identifier";
export { rateLimit } from "./network/rate-limit";

// Search Algorithms & Logic
export { levenshtein } from "./search/levenshtein";
export { getContextAroundMatch } from "./search/context";

// Components & Rendering Utilities
export { highlightMatches } from "./component/highlight";
export { renderMarkdownContent } from "./component/markdown";

// Environment & Analytics Utilities
export { validateEnv, type Env } from "./analytics/env";
export { trackEvent, captureException, type Event } from "./analytics/tracking";
