import * as React from "react";
import type { JSX } from "react";
import { levenshtein } from "../search/levenshtein";

/**
 * Wraps search matches in <mark> tags for visual highlighting in the UI
 */
export function highlightMatches(
  text: string,
  query: string,
): (string | JSX.Element)[] {
  if (!query.trim()) return [text];

  const searchWords = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length >= 3);
  if (searchWords.length === 0) return [text];

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
