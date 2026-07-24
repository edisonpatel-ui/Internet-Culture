/**
 * Live Know Your Meme evidence — fetch entry page when cited, else search HTML.
 */

import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";
import { evidenceQuery, fetchText, normalizeCount } from "./http";

function kymUrlsFromSources(urls: string[]): string[] {
  return urls.filter((u) => /knowyourmeme\.com\/memes\//i.test(u));
}

function parseLastUpdated(html: string): Date | null {
  // Common KYM patterns
  const patterns = [
    /Last\s+Updated\s*[:\-]?\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/i,
    /datetime="(\d{4}-\d{2}-\d{2}[^"]*)"/i,
    /Updated\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (!m?.[1]) continue;
    const t = Date.parse(m[1]);
    if (Number.isFinite(t)) return new Date(t);
  }
  return null;
}

function daysSince(d: Date): number {
  return Math.floor((Date.now() - d.getTime()) / 86_400_000);
}

function freshnessScore(days: number): number {
  // Updated this week → high; 1 year+ → low current activity signal
  if (days <= 7) return 90;
  if (days <= 30) return 75;
  if (days <= 90) return 55;
  if (days <= 365) return 35;
  if (days <= 730) return 18;
  return 8;
}

export const knowYourMemeLiveProvider: DynamicSignalProvider = {
  id: "know-your-meme",
  label: "Know Your Meme (live)",
  priority: 1,
  async collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> {
    const now = new Date().toISOString();
    const cited = kymUrlsFromSources(ctx.sourceUrls);
    const query = evidenceQuery(ctx);

    let pageUrl = cited[0];
    let html: string | null = null;

    if (pageUrl) {
      html = await fetchText(pageUrl, { timeoutMs: 10_000 });
    }

    if (!html) {
      const searchUrl =
        "https://knowyourmeme.com/search?" +
        new URLSearchParams({ q: query });
      const searchHtml = await fetchText(searchUrl, { timeoutMs: 10_000 });
      if (!searchHtml) {
        return [
          {
            providerId: "know-your-meme",
            kind: "platform-activity",
            value: null,
            note: `Know Your Meme unreachable for “${query}”`,
            observedAt: now,
          },
        ];
      }
      const entryMatch = searchHtml.match(
        /href="(\/memes\/[a-z0-9-]+)"/i,
      );
      if (entryMatch?.[1]) {
        pageUrl = `https://knowyourmeme.com${entryMatch[1]}`;
        html = await fetchText(pageUrl, { timeoutMs: 10_000 });
      } else {
        return [
          {
            providerId: "know-your-meme",
            kind: "platform-activity",
            value: 0,
            note: `No Know Your Meme entry match for “${query}”`,
            observedAt: now,
            sourceUrls: [searchUrl],
          },
        ];
      }
    }

    if (!html || !pageUrl) {
      return [
        {
          providerId: "know-your-meme",
          kind: "platform-activity",
          value: null,
          note: "Know Your Meme page fetch failed",
          observedAt: now,
        },
      ];
    }

    const updated = parseLastUpdated(html);
    const out: DynamicSignalObservation[] = [
      {
        providerId: "know-your-meme",
        kind: "authority-documentation",
        value: 72,
        note: `Know Your Meme entry located`,
        observedAt: now,
        sourceUrls: [pageUrl],
      },
    ];

    if (updated) {
      const days = daysSince(updated);
      out.push({
        providerId: "know-your-meme",
        kind: "platform-activity",
        value: freshnessScore(days),
        note: `KYM last updated ~${days}d ago (${updated.toISOString().slice(0, 10)})`,
        observedAt: now,
        sourceUrls: [pageUrl],
      });
    } else {
      // Page exists but no parseable date — mild presence, not current heat.
      out.push({
        providerId: "know-your-meme",
        kind: "platform-activity",
        value: normalizeCount(1, 2),
        note: "KYM entry exists; last-updated date not parseable",
        observedAt: now,
        sourceUrls: [pageUrl],
      });
    }

    return out;
  },
};
