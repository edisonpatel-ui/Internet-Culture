/**
 * Live Wikipedia + Wikimedia Pageviews evidence.
 * Free public APIs — no API key.
 */

import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";
import {
  daysAgo,
  evidenceQuery,
  fetchJson,
  normalizeCount,
  ymd,
} from "./http";

interface WikiSearchResult {
  query?: {
    search?: Array<{ title: string; pageid: number; timestamp?: string }>;
  };
}

interface PageviewsResult {
  items?: Array<{ views: number; timestamp: string }>;
}

function normalizeTitle(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function titleRelevance(query: string, title: string, category: string): number {
  const q = normalizeTitle(query);
  const t = normalizeTitle(title);
  if (!q || !t) return 0;
  let score = 0;
  if (t === q) score += 100;
  else if (t.startsWith(q + " ") || t.includes(" " + q + " ") || t.endsWith(" " + q)) {
    score += 70;
  } else {
    const qParts = q.split(" ").filter((p) => p.length > 1);
    const hits = qParts.filter((p) => t.includes(p)).length;
    score += qParts.length ? (hits / qParts.length) * 50 : 0;
  }
  // Prefer cultural pages over political/org name collisions (e.g. Doge → DOGE).
  if (/\(meme\)|internet|slang|viral/i.test(title)) score += 35;
  if (category === "meme" || category === "brainrot") {
    if (/\(meme\)/i.test(title)) score += 25;
  }
  if (category === "slang" && /\(slang|internet slang|neologism\)/i.test(title)) {
    score += 25;
  }
  // Penalize long bureaucratic titles that only share a token.
  if (title.length > 48 && !t.includes(q)) score -= 20;
  return score;
}

async function searchWiki(query: string): Promise<Array<{ title: string }>> {
  const url =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: query,
      srlimit: "8",
      format: "json",
      origin: "*",
    });
  const data = await fetchJson<WikiSearchResult>(url, { timeoutMs: 8_000 });
  return data?.query?.search ?? [];
}

async function resolveWikiTitle(
  query: string,
  category: string,
): Promise<string | null> {
  const attempts = [query];
  if (category === "meme" || category === "brainrot") {
    attempts.push(`${query} meme`);
  }
  if (category === "slang") {
    attempts.push(`${query} slang`);
    attempts.push(`${query} internet slang`);
  }

  let best: { title: string; score: number } | null = null;
  for (const attempt of attempts) {
    const results = await searchWiki(attempt);
    for (const r of results) {
      const score = titleRelevance(query, r.title, category);
      if (!best || score > best.score) best = { title: r.title, score };
    }
    if (best && best.score >= 80) break;
  }
  if (!best || best.score < 35) return null;
  return best.title;
}

async function fetchPageviews(title: string): Promise<number[]> {
  const end = daysAgo(1);
  const start = daysAgo(30);
  // Wikimedia expects spaces as underscores; encode other characters.
  const encoded = encodeURIComponent(title.replace(/ /g, "_"));
  const url =
    `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/` +
    `en.wikipedia/all-access/user/${encoded}/daily/${ymd(start)}/${ymd(end)}`;
  const data = await fetchJson<PageviewsResult>(url, {
    timeoutMs: 10_000,
    headers: { Accept: "application/json" },
  });
  return (data?.items ?? []).map((i) => i.views).filter((v) => Number.isFinite(v));
}

function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

export const wikipediaLiveProvider: DynamicSignalProvider = {
  id: "wikipedia",
  label: "Wikipedia (live pageviews)",
  priority: 1,
  async collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> {
    const now = new Date().toISOString();
    const query = evidenceQuery(ctx);
    const out: DynamicSignalObservation[] = [];

    const title = await resolveWikiTitle(query, ctx.category);
    if (!title) {
      out.push({
        providerId: "wikipedia",
        kind: "search-interest",
        value: null,
        note: `No confident English Wikipedia match for “${query}”`,
        observedAt: now,
      });
      return out;
    }

    const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
    const views = await fetchPageviews(title);
    if (views.length === 0) {
      out.push({
        providerId: "wikipedia",
        kind: "search-interest",
        value: null,
        note: `Wikipedia page “${title}” found but pageviews unavailable`,
        observedAt: now,
        sourceUrls: [pageUrl],
      });
      return out;
    }

    const total30 = sum(views);
    const last7 = sum(views.slice(-7));
    const prev7 = sum(views.slice(-14, -7));
    const searchInterest = normalizeCount(total30, 50_000);
    out.push({
      providerId: "wikipedia",
      kind: "search-interest",
      value: searchInterest,
      note: `Wikimedia pageviews 30d=${total30.toLocaleString()} for “${title}”`,
      observedAt: now,
      sourceUrls: [pageUrl],
    });

    let trend: number | null = null;
    let trendNote = "Insufficient pageview history for WoW trend";
    if (prev7 > 0) {
      const delta = (last7 - prev7) / prev7;
      trend = Math.max(0, Math.min(100, Math.round(50 + delta * 60)));
      trendNote = `Pageviews WoW last7=${last7} prev7=${prev7} (${(delta * 100).toFixed(0)}%)`;
    } else if (last7 > 0) {
      trend = 70;
      trendNote = `Pageviews appeared recently (last7=${last7}, prev7=0)`;
    }
    out.push({
      providerId: "wikipedia",
      kind: "editorial-trend",
      value: trend,
      note: trendNote,
      observedAt: now,
      sourceUrls: [pageUrl],
    });

    return out;
  },
};
