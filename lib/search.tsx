import type { JSX } from "react";
import { levenshtein } from "./helpers";

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
            <>
              {prefix}
              <mark className="rounded bg-blue-500 px-0.5 text-white">
                {match}
              </mark>
              {suffix}
            </>
          );
        }
        return;
      }

      for (let i = 0; i <= tokenLower.length - searchWord.length; i++) {
        const substring = tokenLower.slice(i, i + searchWord.length);
        if (levenshtein(substring, searchWord) <= 1) {
          shouldHighlight = true;
          const prefix = token.slice(0, i);
          const match = token.slice(i, i + searchWord.length);
          const suffix = token.slice(i + searchWord.length);
          highlightedToken = (
            <>
              {prefix}
              <mark className="rounded bg-blue-500 px-0.5 text-white">
                {match}
              </mark>
              {suffix}
            </>
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

export function renderMarkdownContent({ content }: { content: string }) {
  const patterns = [
    {
      regex: /```(?:.*\n)?([\s\S]*?)```/g,
      render: (_: string, code: string) => (
        <code className="rounded bg-gray-300 px-1.5 py-0.5 font-mono whitespace-pre-wrap text-black">
          {code.trim()}
        </code>
      ),
    },
    {
      regex: /`([^`]+)`/g,
      render: (_: string, code: string) => (
        <code className="rounded bg-gray-300 px-1.5 py-0.5 font-mono text-black">
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

          // @ts-expect-error tuple err
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
