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
export function evidenceQuery(ctx: {
  title: string;
  slug: string;
  tags?: string[];
}): string {
  const title = ctx.title.replace(/\s*[—|:].*$/, "").trim();
  return title || ctx.slug.replace(/-/g, " ");
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
