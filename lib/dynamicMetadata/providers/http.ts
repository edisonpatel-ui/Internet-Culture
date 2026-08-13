/**
 * Shared HTTP helpers for live dynamic-signal providers.
 * Server-side / Maintenance Center only — never called from public page renders.
 */

const DEFAULT_UA =
  "InternetCultureHubMaintenance/1.0 (+https://internet-culture.vercel.app; editorial-refresh)";

export class ProviderHttpError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ProviderHttpError";
  }
}

export async function providerFetch(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<Response> {
  const { timeoutMs = 10_000, headers, ...rest } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...rest,
      signal: controller.signal,
      headers: {
        "User-Agent": DEFAULT_UA,
        Accept: "application/json, application/rss+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8",
        ...(headers ?? {}),
      },
      // Avoid Next fetch caching of live evidence during refresh runs.
      cache: "no-store",
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchJson<T>(
  url: string,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T | null> {
  try {
    const res = await providerFetch(url, init);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchText(
  url: string,
  init?: RequestInit & { timeoutMs?: number },
): Promise<string | null> {
  try {
    const res = await providerFetch(url, init);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** Build a search query from entry context. */
/**
 * Best single public-search query for a catalog entry.
 * Prefer the cultural name — not compound subtitles or ambiguous single tokens.
 */
export function evidenceQuery(ctx: {
  title: string;
  slug: string;
  tags?: string[];
  category?: string;
}): string {
  const title = ctx.title
    .replace(/\s*[—|:].*$/, "")
    .replace(/\s*\/\s*.*$/, "") // e.g. "Topic / Subtopic" → "Topic"
    .trim();
  const fromSlug = ctx.slug.replace(/-/g, " ").trim();
  let q = title || fromSlug;

  // Disambiguate short, common-word titles ("Doge" → "Doge meme", "Karen" →
  // "Karen slang") to avoid flooding news/search results with unrelated
  // hits — a bare common first name like "Karen" pulls in real-person news
  // that has nothing to do with the meme, which was inflating scores.
  const cat = (ctx.category ?? "").toLowerCase();
  const isShortSingleWord =
    q.split(/\s+/).filter(Boolean).length === 1 && q.length <= 14;
  if (isShortSingleWord) {
    if (cat === "meme" || cat === "brainrot") q = `${q} meme`;
    else if (cat === "slang") q = `${q} slang`;
    else if (cat === "trend") q = `${q} trend`;
    else if (cat === "creator") q = `${q} creator`;
    else if (cat === "event") q = `${q} event`;
  }
  return q;
}

/** Alternate queries for providers that can try more than one search. */
export function evidenceQueryVariants(ctx: {
  title: string;
  slug: string;
  tags?: string[];
  category?: string;
}): string[] {
  const primary = evidenceQuery(ctx);
  const slugWords = ctx.slug.replace(/-/g, " ").trim();
  const titleHead = ctx.title
    .replace(/\s*[—|:].*$/, "")
    .replace(/\s*\/\s*.*$/, "")
    .trim();
  const cat = (ctx.category ?? "").toLowerCase();
  const out: string[] = [primary];
  for (const v of [
    titleHead,
    slugWords,
    slugWords.split(/\s+/).slice(0, 2).join(" "),
    // Platform-scoped variants help slang/trends that news indexes poorly alone.
    cat === "trend" || cat === "slang" || cat === "meme"
      ? `${titleHead} tiktok`
      : "",
    cat === "trend" || cat === "slang" ? `${titleHead} meme` : "",
  ]) {
    const t = (v ?? "").trim();
    if (!t) continue;
    if (!out.some((x) => x.toLowerCase() === t.toLowerCase())) out.push(t);
  }
  return out.slice(0, 5);
}

/** YYYYMMDD for Wikimedia pageviews. */
export function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

export function daysAgo(n: number): Date {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}

/**
 * Log-scale map of a count into 0–100.
 * `mid` ≈ value that maps near 50.
 */
export function normalizeCount(count: number, mid: number, maxCap = 100): number {
  if (count <= 0) return 0;
  const score = (Math.log10(count + 1) / Math.log10(mid + 1)) * 50;
  return Math.max(0, Math.min(maxCap, Math.round(score)));
}

/** Fraction of items with dates in the last `withinDays`. */
export function recencyRatio(
  isoDates: Array<string | number | Date | null | undefined>,
  withinDays: number,
): { recent: number; total: number; ratio: number } {
  const now = Date.now();
  const cutoff = now - withinDays * 86_400_000;
  let recent = 0;
  let total = 0;
  for (const raw of isoDates) {
    if (raw == null) continue;
    const t =
      typeof raw === "number"
        ? raw * (raw < 2e12 ? 1000 : 1)
        : new Date(raw).getTime();
    if (!Number.isFinite(t)) continue;
    total += 1;
    if (t >= cutoff) recent += 1;
  }
  return {
    recent,
    total,
    ratio: total === 0 ? 0 : recent / total,
  };
}
