/**
 * Google Trends-style signal.
 * Uses Google Trending RSS (US) for exact/fuzzy title hits when possible.
 * Optional: set GOOGLE_TRENDS_ENABLED=false to skip.
 */

import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";
import { evidenceQuery, fetchText } from "./http";

function normalizeToken(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function titleMatchScore(query: string, itemTitle: string): number {
  const q = normalizeToken(query);
  const t = normalizeToken(itemTitle);
  if (!q || !t) return 0;
  if (t === q) return 100;
  if (t.includes(q) || q.includes(t)) return 85;
  const qParts = q.split(" ").filter((p) => p.length > 2);
  if (qParts.length === 0) return 0;
  const hits = qParts.filter((p) => t.includes(p)).length;
  return Math.round((hits / qParts.length) * 70);
}

function parseTrendTitles(xml: string): string[] {
  const titles: string[] = [];
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  for (const block of blocks) {
    const title =
      block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i)?.[1] ??
      block.match(/<title>(.*?)<\/title>/i)?.[1];
    if (title) titles.push(title.replace(/<[^>]+>/g, "").trim());
  }
  return titles;
}

export const googleTrendsLiveProvider: DynamicSignalProvider = {
  id: "google-trends",
  label: "Google Trends (RSS)",
  priority: 3,
  async collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> {
    const now = new Date().toISOString();
    if (process.env.GOOGLE_TRENDS_ENABLED?.trim() === "false") {
      return [
        {
          providerId: "google-trends",
          kind: "search-interest",
          value: null,
          note: "GOOGLE_TRENDS_ENABLED=false — skipped",
          observedAt: now,
        },
      ];
    }

    const query = evidenceQuery(ctx);
    const url = "https://trends.google.com/trending/rss?geo=US";
    const xml = await fetchText(url, { timeoutMs: 10_000 });
    if (!xml) {
      return [
        {
          providerId: "google-trends",
          kind: "search-interest",
          value: null,
          note: "Google Trending RSS unavailable",
          observedAt: now,
        },
      ];
    }

    const titles = parseTrendTitles(xml);
    if (titles.length === 0) {
      return [
        {
          providerId: "google-trends",
          kind: "search-interest",
          value: null,
          note: "Google Trending RSS returned no items",
          observedAt: now,
          sourceUrls: [url],
        },
      ];
    }

    let best = 0;
    let bestTitle = "";
    for (const t of titles) {
      const s = titleMatchScore(query, t);
      if (s > best) {
        best = s;
        bestTitle = t;
      }
    }

    if (best < 40) {
      return [
        {
          providerId: "google-trends",
          kind: "search-interest",
          value: null,
          note: `Not on current Google US Trending RSS (${titles.length} topics) — not treated as zero search interest`,
          observedAt: now,
          sourceUrls: [url],
        },
        {
          providerId: "google-trends",
          kind: "editorial-trend",
          value: 28,
          note: "Absence from daily trending list → not currently spiking",
          observedAt: now,
          sourceUrls: [url],
        },
      ];
    }

    return [
      {
        providerId: "google-trends",
        kind: "search-interest",
        value: best,
        note: `Matched Google Trending topic “${bestTitle}” (score ${best})`,
        observedAt: now,
        sourceUrls: [url],
      },
      {
        providerId: "google-trends",
        kind: "editorial-trend",
        value: Math.min(100, best + 5),
        note: "Present on Google Trending RSS — growth/spike signal",
        observedAt: now,
        sourceUrls: [url],
      },
    ];
  },
};
