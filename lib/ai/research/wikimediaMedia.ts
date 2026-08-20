/**
 * Real Wikimedia Commons media search — free, no API key, no rate limit
 * beyond fair-use etiquette. This is the site's #1 preferred media source
 * per lib/content/templates/articleTemplate.ts (stable, licensed,
 * hotlink-safe — never a /thumb/ CDN path, always the direct full file).
 *
 * Ranks candidates by actual relevance to the topic instead of taking the
 * first Commons search hit — a plain single-query "first match" approach
 * regularly returns visually-similar-but-wrong subjects (a generic icon, a
 * disambiguation page's file, a flag/map/logo Commons surfaces for almost
 * any query) and, for non-meme categories, a bare `topic` query alone
 * frequently misses the actual representative asset entirely.
 */

import type { ResearchMediaSuggestion } from "@/lib/ai/packages";

interface CommonsSearchResponse {
  query?: {
    search?: Array<{ title: string; pageid: number; snippet?: string }>;
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
          width?: number;
          height?: number;
          extmetadata?: {
            LicenseShortName?: { value?: string };
            Artist?: { value?: string };
            Categories?: { value?: string };
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

/**
 * File-title patterns that are almost never the right representative image
 * for an internet-culture entry, even when they share a keyword with the
 * topic — Commons over-returns these for nearly any search term.
 */
const JUNK_TITLE = /\b(flag of|coat of arms|locator map|location map|\.svg logo|wikimedia logo|commons logo|question mark|no image available|disambig|crystal_?clear|icon_)\b/i;

const GENERIC_FILE_EXT_OK = /\.(jpe?g|png|webp|gif)$/i;

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

/** Query phrasings tuned to what actually represents each category. */
function queryVariants(topic: string, category?: string): string[] {
  const base = topic.trim();
  switch (category) {
    case "meme":
      return [`${base} meme`, `${base} meme screenshot`, base];
    case "creator":
    case "person":
      return [`${base}`, `${base} portrait`, `${base} creator`];
    case "event":
      return [`${base} event`, `${base} viral video`, base];
    case "slang":
      return [base, `${base} slang`, `${base} internet culture`];
    case "trend":
    case "brainrot":
      return [`${base} trend`, `${base} viral`, base];
    default:
      return [base, `${base} internet culture`, `${base} meme`];
  }
}

async function searchCommonsTitles(
  query: string,
): Promise<Array<{ title: string; snippet: string }>> {
  const url =
    `${COMMONS_API}?` +
    new URLSearchParams({
      action: "query",
      list: "search",
      srnamespace: "6", // File: namespace
      srsearch: `${query} filetype:bitmap`,
      srlimit: "10",
      srprop: "snippet",
      format: "json",
      origin: "*",
    });
  const data = await fetchJson<CommonsSearchResponse>(url);
  return (data?.query?.search ?? []).map((r) => ({
    title: r.title,
    snippet: (r.snippet ?? "").replace(/<[^>]+>/g, ""),
  }));
}

/** Gather candidates across ALL query variants, not just the first hit. */
async function gatherCandidateTitles(
  topic: string,
  category?: string,
): Promise<Array<{ title: string; snippet: string; queryRank: number }>> {
  const variants = queryVariants(topic, category);
  const seen = new Map<string, { title: string; snippet: string; queryRank: number }>();
  for (let i = 0; i < variants.length; i++) {
    const results = await searchCommonsTitles(variants[i]);
    for (const r of results) {
      if (!seen.has(r.title)) {
        seen.set(r.title, { ...r, queryRank: i });
      }
    }
    // Stop early once we have a healthy pool — further variants are
    // diminishing returns and cost extra requests.
    if (seen.size >= 10) break;
  }
  return [...seen.values()];
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/^file:/, "")
    .replace(/\.[a-z]+$/i, "")
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length > 1);
}

/** 0-1 relevance score: token overlap between the file title and the topic. */
function relevanceScore(
  candidateTitle: string,
  snippet: string,
  topic: string,
  queryRank: number,
): number {
  if (JUNK_TITLE.test(candidateTitle)) return -1;

  const topicTokens = new Set(tokenize(topic));
  if (topicTokens.size === 0) return 0;
  const titleTokens = new Set(tokenize(candidateTitle));
  const snippetTokens = new Set(tokenize(snippet));

  let titleOverlap = 0;
  let snippetOverlap = 0;
  for (const t of topicTokens) {
    if (titleTokens.has(t)) titleOverlap++;
    if (snippetTokens.has(t)) snippetOverlap++;
  }
  const titleScore = titleOverlap / topicTokens.size;
  const snippetScore = snippetOverlap / topicTokens.size;

  // Exact phrase match in the title is a strong signal.
  const exactPhraseBonus = candidateTitle
    .toLowerCase()
    .includes(topic.toLowerCase())
    ? 0.35
    : 0;

  // Earlier query variants (category-tuned) are more trustworthy than later
  // generic fallbacks.
  const queryRankPenalty = queryRank * 0.05;

  return Math.max(
    0,
    titleScore * 0.6 + snippetScore * 0.2 + exactPhraseBonus - queryRankPenalty,
  );
}

async function imageInfoFor(titles: string[]): Promise<
  Array<{
    title: string;
    url: string;
    descriptionUrl: string;
    license?: string;
    artist?: string;
    width?: number;
    height?: number;
  }>
> {
  if (titles.length === 0) return [];
  const url =
    `${COMMONS_API}?` +
    new URLSearchParams({
      action: "query",
      titles: titles.join("|"),
      prop: "imageinfo",
      iiprop: "url|extmetadata|mime|size",
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
    width?: number;
    height?: number;
  }> = [];
  for (const page of Object.values(pages)) {
    const info = page.imageinfo?.[0];
    if (!info?.url || !info.mime?.startsWith("image/")) continue;
    if (!GENERIC_FILE_EXT_OK.test(info.url)) continue; // skip svg/tiff/etc.
    out.push({
      title: page.title ?? "",
      url: info.url,
      descriptionUrl: info.descriptionurl ?? info.url,
      license: info.extmetadata?.LicenseShortName?.value,
      artist: info.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, "").trim(),
      width: info.width,
      height: info.height,
    });
  }
  return out;
}

interface RankedCandidate {
  title: string;
  url: string;
  descriptionUrl: string;
  license?: string;
  artist?: string;
  score: number;
}

async function rankedCandidates(
  topic: string,
  category?: string,
): Promise<RankedCandidate[]> {
  const candidates = await gatherCandidateTitles(topic, category);
  if (candidates.length === 0) return [];

  const infos = await imageInfoFor(candidates.map((c) => c.title));
  const byTitle = new Map(infos.map((i) => [i.title, i]));

  const ranked: RankedCandidate[] = [];
  for (const c of candidates) {
    const info = byTitle.get(c.title);
    if (!info) continue;
    // Thumbnail-sized / tiny images are rarely a genuine hero asset.
    if (info.width && info.height && info.width < 200 && info.height < 200) {
      continue;
    }
    const relevance = relevanceScore(c.title, c.snippet, topic, c.queryRank);
    if (relevance <= 0) continue;
    const licenseBonus =
      info.license && SAFE_LICENSE.test(info.license) ? 0.1 : 0;
    ranked.push({
      title: info.title,
      url: info.url,
      descriptionUrl: info.descriptionUrl,
      license: info.license,
      artist: info.artist,
      score: relevance + licenseBonus,
    });
  }

  ranked.sort((a, b) => b.score - a.score);
  return ranked;
}

function toSuggestion(
  c: RankedCandidate,
  role: ResearchMediaSuggestion["role"],
  topic: string,
): ResearchMediaSuggestion {
  return {
    id: `media_${role}_${Date.now().toString(36)}_${Math.round(c.score * 100)}`,
    role,
    type: "image",
    title: c.title.replace(/^File:/, "").replace(/\.[a-z]+$/i, ""),
    url: c.url,
    source: "Wikimedia Commons",
    sourceUrl: c.descriptionUrl,
    attribution: [c.artist, c.license].filter(Boolean).join(" — ") || undefined,
    searchHint: topic,
    verified: false,
  };
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
  category?: string,
): Promise<ResearchMediaSuggestion | null> {
  const ranked = await rankedCandidates(topic, category);
  const best = ranked[0];
  // Below this, the "match" is weak enough (little/no real token overlap)
  // that it's better to return nothing and let the caller try another
  // source (e.g. YouTube) than to attach a visually-similar-but-wrong image.
  if (!best || best.score < 0.18) return null;
  return toSuggestion(best, role, topic);
}

/**
 * Featured + a genuinely distinct supporting image, when the ranked pool
 * has more than one relevant, non-duplicate candidate. Previously this
 * always returned at most one image regardless of how many good candidates
 * existed — galleries never actually got populated from Wikimedia.
 */
export async function findWikimediaMediaSet(
  topic: string,
  category?: string,
): Promise<ResearchMediaSuggestion[]> {
  const ranked = await rankedCandidates(topic, category);
  if (ranked.length === 0 || ranked[0].score < 0.18) return [];

  const out: ResearchMediaSuggestion[] = [toSuggestion(ranked[0], "featured", topic)];

  // Pick the next candidate that isn't a near-duplicate of the featured pick
  // (same file, or a title that's basically the same subject re-uploaded —
  // e.g. an "(alternate upload)" of the exact same photo). Overlap is
  // measured against the SMALLER token set (overlap coefficient), not the
  // candidate's own token count — a title with a few extra descriptive
  // words ("... (alternate upload)") still fully contains the original and
  // must still be caught, not diluted into looking "distinct".
  const featuredTokens = new Set(tokenize(ranked[0].title));
  for (let i = 1; i < ranked.length; i++) {
    if (ranked[i].url === ranked[0].url) continue;
    const tokens = tokenize(ranked[i].title);
    const overlap = tokens.filter((t) => featuredTokens.has(t)).length;
    const smaller = Math.min(featuredTokens.size, tokens.length);
    const isNearDuplicate = smaller > 0 && overlap / smaller > 0.8;
    // Require a real relevance floor for the supporting slot too — don't
    // pad the gallery with a weak second-best just to fill a slot.
    if (!isNearDuplicate && ranked[i].score >= 0.25) {
      out.push(toSuggestion(ranked[i], "supporting", topic));
      break;
    }
  }

  return out;
}
