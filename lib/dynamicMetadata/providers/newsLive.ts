/**
 * Live news evidence via Google News RSS (no API key).
 * Tries multiple cultural query variants; scores by recent (≈30d) article count.
 */

import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";
import {
  evidenceQueryVariants,
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
    const queries = evidenceQueryVariants(ctx);
    const cat = ctx.category.toLowerCase();
    const preferPrimaryOnly =
      cat === "meme" || cat === "brainrot" || cat === "slang";

    type NewsHit = {
      query: string;
      recent: number;
      total: number;
      score: number;
      urls: string[];
    };

    async function fetchQuery(query: string): Promise<NewsHit | null> {
      const url =
        "https://news.google.com/rss/search?" +
        new URLSearchParams({
          q: query,
          hl: "en-US",
          gl: "US",
          ceid: "US:en",
        });
      const xml = await fetchText(url, { timeoutMs: 10_000 });
      if (!xml) return null;
      const items = parseRssItems(xml);
      // Prefer ~60d creation window (methodology: last 30–60 days).
      const { recent, total } = recencyRatio(
        items.map((i) => i.pubDate),
        60,
      );
      // mid=8 → ~10 recent articles maps near “steady creation”
      const score = normalizeCount(recent, 8);
      const urls = items
        .slice(0, 5)
        .map((i) => i.link)
        .filter(Boolean);
      return {
        query,
        recent,
        total,
        score,
        urls: urls.length ? urls : [url],
      };
    }

    const primary = await fetchQuery(queries[0]!);
    let best = primary;
    const primaryEmpty =
      !primary || (primary.recent === 0 && primary.total === 0);

    // Variants fill gaps. For meme/slang, keep disambiguated primary when it
    // has hits — never let bare "Doge" crypto results replace "Doge meme".
    // If primary is empty, allow careful fallbacks (including bare title).
    if (!preferPrimaryOnly || !primary || primaryEmpty) {
      for (const query of queries.slice(1)) {
        const bareSingle = query.split(/\s+/).length === 1;
        const primaryIsDisambiguated = queries[0]!
          .toLowerCase()
          .endsWith(" meme");
        if (
          preferPrimaryOnly &&
          primaryIsDisambiguated &&
          bareSingle &&
          !primaryEmpty
        ) {
          continue;
        }
        const hit = await fetchQuery(query);
        if (!hit) continue;
        // Bare-token fallback: accept only modest scores (avoid crypto floods).
        if (preferPrimaryOnly && primaryIsDisambiguated && bareSingle) {
          if (hit.score > 55) continue;
        }
        if (
          !best ||
          hit.score > best.score ||
          (hit.score === best.score && hit.recent > best.recent)
        ) {
          best = hit;
        }
      }
    }

    if (!best && !primary) {
      return [
        {
          providerId: "news",
          kind: "recent-articles",
          value: null,
          note: `Google News RSS unavailable for “${queries[0]}”`,
          observedAt: now,
        },
      ];
    }

    if (!best || best.total === 0) {
      return [
        {
          providerId: "news",
          kind: "recent-articles",
          value: 0,
          note: `No Google News hits for “${queries[0]}”`,
          observedAt: now,
        },
      ];
    }

    return [
      {
        providerId: "news",
        kind: "recent-articles",
        value: best.score,
        note: `Google News: ${best.recent} items in last 60d (${best.total} returned) for “${best.query}”`,
        observedAt: now,
        sourceUrls: best.urls,
      },
    ];
  },
};
