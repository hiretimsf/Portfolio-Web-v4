import { levenshtein } from "./levenshtein";

const SEARCH_WINDOW_SIZE = 150;
const FUZZY_MATCH_THRESHOLD = 2;

/**
 * Extracts a window of text around the best match in a larger content block
 */
export function getContextAroundMatch(content: string, query: string) {
  if (!content || !query.trim()) return content;

  const searchWords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (searchWords.length === 0) return content;

  let bestScore = 0;
  let bestStart = 0;

  for (let i = 0; i < content.length - SEARCH_WINDOW_SIZE; i += 50) {
    const window = content.slice(i, i + SEARCH_WINDOW_SIZE).toLowerCase();
    let score = 0;

    searchWords.forEach((word) => {
      const exactMatches = window.split(word).length - 1;
      score += exactMatches * word.length * 2;

      window.split(/\s+/).forEach((term) => {
        if (levenshtein(term as string, word) <= FUZZY_MATCH_THRESHOLD) {
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
  const contextEnd = Math.min(content.length, bestStart + SEARCH_WINDOW_SIZE);

  let excerpt = content.slice(contextStart, contextEnd).trim();
  if (contextStart > 0) excerpt = "..." + excerpt;
  if (contextEnd < content.length) excerpt = excerpt + "...";

  return excerpt;
}
