/**
 * Live news evidence via Google News RSS (no API key).
 */

import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";
import {
  evidenceQuery,
  fetchText,
  normalizeCount,
  recencyRatio,
} from "./http";

function parseRssItems(xml: string): Array<{ title: string; link: string; pubDate?: string }> {
  const items: Array<{ title: string; link: string; pubDate?: string }> = [];
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  for (const block of blocks.slice(0, 40)) {
    const title =
      block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i)?.[1] ??
      block.match(/<title>(.*?)<\/title>/i)?.[1] ??
      "";
    const link =
      block.match(/<link>(.*?)<\/link>/i)?.[1]?.trim() ??
      block.match(/<guid[^>]*>(.*?)<\/guid>/i)?.[1]?.trim() ??
      "";
    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1];
    if (title || link) {
      items.push({
        title: title.replace(/<[^>]+>/g, "").trim(),
        link,
        pubDate,
      });
    }
  }
  return items;
}

export const newsLiveProvider: DynamicSignalProvider = {
  id: "news",
  label: "News (Google News RSS)",
  priority: 2,
  async collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> {
    const now = new Date().toISOString();
    const query = evidenceQuery(ctx);
    const url =
      "https://news.google.com/rss/search?" +
      new URLSearchParams({
        q: query,
        hl: "en-US",
        gl: "US",
        ceid: "US:en",
      });

    const xml = await fetchText(url, { timeoutMs: 10_000 });
    if (!xml) {
      return [
        {
          providerId: "news",
          kind: "recent-articles",
          value: null,
          note: `Google News RSS unavailable for “${query}”`,
          observedAt: now,
        },
      ];
    }

    const items = parseRssItems(xml);
    if (items.length === 0) {
      return [
        {
          providerId: "news",
          kind: "recent-articles",
          value: 0,
          note: `No Google News hits for “${query}”`,
          observedAt: now,
          sourceUrls: [url],
        },
      ];
    }

    const { recent, total } = recencyRatio(
      items.map((i) => i.pubDate),
      30,
    );
    // Prefer recent count; zero recent with old hits → low current coverage.
    const score = normalizeCount(recent, 12);
    const urls = items
      .slice(0, 5)
      .map((i) => i.link)
      .filter(Boolean);

    return [
      {
        providerId: "news",
        kind: "recent-articles",
        value: score,
        note: `Google News: ${recent} items in last 30d (${total} returned) for “${query}”`,
        observedAt: now,
        sourceUrls: urls.length > 0 ? urls : [url],
      },
    ];
  },
};
