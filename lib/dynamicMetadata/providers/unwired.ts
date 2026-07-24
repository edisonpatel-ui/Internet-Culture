import type { DynamicSignalProvider } from "./types";

/**
 * Factory for future live providers. Returns null observations until wired.
 * Does not invent values.
 */
export function createUnwiredProvider(
  id: DynamicSignalProvider["id"],
  label: string,
  priority: DynamicSignalProvider["priority"],
  futureSource: string,
): DynamicSignalProvider {
  return {
    id,
    label,
    priority,
    collect() {
      return [
        {
          providerId: id,
          kind: "search-interest",
          value: null,
          note: `Not connected yet — ${futureSource}. Exhausted without live data.`,
        },
      ];
    },
  };
}

export const wikipediaProvider = createUnwiredProvider(
  "wikipedia",
  "Wikipedia (live)",
  1,
  "Wikipedia / MediaWiki API",
);

export const knowYourMemeProvider = createUnwiredProvider(
  "know-your-meme",
  "Know Your Meme (live)",
  1,
  "Know Your Meme page fetch",
);

export const dictionaryProvider = createUnwiredProvider(
  "dictionary",
  "Dictionary (live)",
  2,
  "Merriam-Webster / Britannica",
);

export const newsProvider = createUnwiredProvider(
  "news",
  "News (live)",
  2,
  "Major news search / RSS",
);

export const googleTrendsProvider = createUnwiredProvider(
  "google-trends",
  "Google Trends",
  3,
  "Google Trends interest-over-time",
);

export const redditProvider = createUnwiredProvider(
  "reddit",
  "Reddit",
  4,
  "Reddit search / listing APIs",
);

export const youtubeProvider = createUnwiredProvider(
  "youtube",
  "YouTube",
  4,
  "YouTube Data API",
);

export const creatorPagesProvider = createUnwiredProvider(
  "creator-pages",
  "Creator / official pages",
  2,
  "Official site / channel metadata",
);
