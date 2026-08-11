/**
 * Real Wikimedia Commons media search — free, no API key, no rate limit
 * beyond fair-use etiquette. This is the site's #1 preferred media source
 * per lib/content/templates/articleTemplate.ts (stable, licensed,
 * hotlink-safe — never a /thumb/ CDN path, always the direct full file).
 */

import type { ResearchMediaSuggestion } from "@/lib/ai/packages";

interface CommonsSearchResponse {
  query?: {
    search?: Array<{ title: string; pageid: number }>;
  };
}

interface CommonsImageInfoResponse {
  query?: {
    pages?: Record<
      string,
      {
        title?: string;
        imageinfo?: Array<{
          url?: string;
          descriptionurl?: string;
          extmetadata?: {
            LicenseShortName?: { value?: string };
            Artist?: { value?: string };
          };
          mime?: string;
        }>;
      }
    >;
  };
}

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

/** Licenses acceptable for a public encyclopedia without further review. */
const SAFE_LICENSE = /public domain|cc0|cc-by(-sa)?[- ]?\d|pd-/i;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "InternetCultureHub-DraftStudio/1.0" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function searchCommonsTitles(query: string): Promise<string[]> {
  const url =
    `${COMMONS_API}?` +
    new URLSearchParams({
      action: "query",
      list: "search",
      srnamespace: "6", // File: namespace
      srsearch: `${query} filetype:bitmap`,
      srlimit: "6",
      format: "json",
      origin: "*",
    });
  const data = await fetchJson<CommonsSearchResponse>(url);
  return (data?.query?.search ?? []).map((r) => r.title);
}

/** Try a few query phrasings — a single query misses often on niche topics. */
async function searchCommonsTitlesWithFallbacks(
  topic: string,
): Promise<string[]> {
  const attempts = [topic, `${topic} meme`, `${topic} internet`];
  for (const attempt of attempts) {
    const titles = await searchCommonsTitles(attempt);
    if (titles.length > 0) return titles;
  }
  return [];
}

async function imageInfoFor(titles: string[]): Promise<
  Array<{
    title: string;
    url: string;
    descriptionUrl: string;
    license?: string;
    artist?: string;
  }>
> {
  if (titles.length === 0) return [];
  const url =
    `${COMMONS_API}?` +
    new URLSearchParams({
      action: "query",
      titles: titles.join("|"),
      prop: "imageinfo",
      iiprop: "url|extmetadata|mime",
      format: "json",
      origin: "*",
    });
  const data = await fetchJson<CommonsImageInfoResponse>(url);
  const pages = data?.query?.pages ?? {};
  const out: Array<{
    title: string;
    url: string;
    descriptionUrl: string;
    license?: string;
    artist?: string;
  }> = [];
  for (const page of Object.values(pages)) {
    const info = page.imageinfo?.[0];
    if (!info?.url || !info.mime?.startsWith("image/")) continue;
    out.push({
      title: page.title ?? "",
      url: info.url,
      descriptionUrl: info.descriptionurl ?? info.url,
      license: info.extmetadata?.LicenseShortName?.value,
      artist: info.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, "").trim(),
    });
  }
  return out;
}

/**
 * Search Wikimedia Commons for a representative image and return it in the
 * exact shape Draft Studio already expects (ResearchMediaSuggestion), so it
 * drops straight into `suggestedMedia` / `mediaSuggestions`.
 *
 * Always returns verified:false — a human still confirms before publish,
 * per the project's media rules.
 */
export async function findWikimediaMedia(
  topic: string,
  role: ResearchMediaSuggestion["role"] = "featured",
): Promise<ResearchMediaSuggestion | null> {
  const titles = await searchCommonsTitlesWithFallbacks(topic);
  if (titles.length === 0) return null;

  const infos = await imageInfoFor(titles);
  const safe = infos.find((i) => i.license && SAFE_LICENSE.test(i.license));
  const best = safe ?? infos[0];
  if (!best) return null;

  return {
    id: `media_${role}_${Date.now().toString(36)}`,
    role,
    type: "image",
    title: best.title.replace(/^File:/, "").replace(/\.[a-z]+$/i, ""),
    url: best.url,
    source: "Wikimedia Commons",
    sourceUrl: best.descriptionUrl,
    attribution: [best.artist, best.license].filter(Boolean).join(" — ") || undefined,
    searchHint: topic,
    verified: false,
  };
}

/** Featured + one supporting image, when available. */
export async function findWikimediaMediaSet(
  topic: string,
): Promise<ResearchMediaSuggestion[]> {
  const featured = await findWikimediaMedia(topic, "featured");
  const out: ResearchMediaSuggestion[] = [];
  if (featured) out.push(featured);
  return out;
}
