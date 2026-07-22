/**
 * Media discovery — find the best representative media for an article.
 *
 * Goal: representative visual for the topic, not perfect Wikimedia purity.
 * If a strong candidate is found but not human-confirmed, store verified: false
 * with attribution and source URL. Do not leave articles without media solely
 * because a fully verified asset could not be found.
 */

import type { ResearchMediaSuggestion } from "@/lib/ai/packages";
import type { MediaItem } from "@/types";

function hasUrl(url?: string): boolean {
  return Boolean(url?.trim() && /^https?:\/\//i.test(url.trim()));
}

function youtubeId(url: string): string | null {
  const m =
    url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/) ||
    url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/) ||
    url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/);
  return m?.[1] ?? null;
}

/** Curated representative assets (AI-suggested — always verified: false). */
const CURATED: Array<{
  match: RegExp;
  item: ResearchMediaSuggestion;
}> = [
  {
    match: /flashlight/i,
    item: {
      id: "media_flashlight_1921",
      role: "featured",
      type: "image",
      title: "How you think you look when a flashlight is taken (Judge, 1921)",
      url: "https://upload.wikimedia.org/wikipedia/commons/6/6d/How_you_think_you_look_when_a_flashlight_is_taken.webp",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:How_you_think_you_look_when_a_flashlight_is_taken.webp",
      attribution: "Judge magazine (1921) via Wikimedia Commons",
      verified: false,
    },
  },
  {
    match: /dancing baby|baby cha.?cha/i,
    item: {
      id: "media_dancing_baby_ref",
      role: "reference",
      type: "embed",
      title: "Dancing Baby — cultural reference",
      url: "https://en.wikipedia.org/wiki/Dancing_baby",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Dancing_baby",
      attribution: "Wikipedia — Dancing baby",
      verified: false,
      searchHint: "Prefer a still or GIF from a rights-clear source for featured",
    },
  },
];

function fromEncyclopediaMedia(
  items: MediaItem[] | undefined,
): ResearchMediaSuggestion[] {
  if (!items?.length) return [];
  return items
    .filter((m) => hasUrl(m.url))
    .map((m, i) => ({
      id: `media_catalog_${m.role}_${i}`,
      role: m.role,
      type: m.type,
      title: m.title,
      url: m.url,
      source: m.source,
      sourceUrl: m.sourceUrl ?? m.url,
      attribution: m.attribution,
      verified: false as const,
      searchHint: "Carried from live ICH encyclopedia media",
    }));
}

function fromYouTubeSources(urls: string[]): ResearchMediaSuggestion[] {
  const out: ResearchMediaSuggestion[] = [];
  for (const url of urls) {
    const id = youtubeId(url);
    if (!id) continue;
    out.push({
      id: `media_yt_${id}`,
      role: out.some((m) => m.role === "featured") ? "video" : "featured",
      type: out.some((m) => m.role === "featured") ? "video" : "image",
      title: `YouTube media ${id}`,
      url:
        out.some((m) => m.role === "featured") &&
        out.some((x) => x.type === "image")
          ? `https://www.youtube.com/watch?v=${id}`
          : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      source: "YouTube",
      sourceUrl: `https://www.youtube.com/watch?v=${id}`,
      attribution: "YouTube thumbnail / video — unverified",
      verified: false,
    });
    // Also add video role if featured was thumbnail
    if (!out.some((m) => m.role === "video")) {
      out.push({
        id: `media_yt_video_${id}`,
        role: "video",
        type: "video",
        title: `YouTube video ${id}`,
        url: `https://www.youtube.com/watch?v=${id}`,
        source: "YouTube",
        sourceUrl: `https://www.youtube.com/watch?v=${id}`,
        attribution: "YouTube — unverified",
        verified: false,
      });
    }
  }
  return out;
}

function fromTrustedPageReferences(urls: string[]): ResearchMediaSuggestion[] {
  return urls
    .filter((u) =>
      /wikipedia\.org|knowyourmeme\.com|wikimedia\.org/i.test(u),
    )
    .slice(0, 3)
    .map((url, i) => ({
      id: `media_ref_${i}`,
      role: "reference" as const,
      type: "embed" as const,
      title: /knowyourmeme/i.test(url)
        ? "Know Your Meme reference"
        : /wikimedia/i.test(url)
          ? "Wikimedia reference"
          : "Wikipedia reference",
      url,
      source: /knowyourmeme/i.test(url)
        ? "Know Your Meme"
        : /wikimedia/i.test(url)
          ? "Wikimedia Commons"
          : "Wikipedia",
      sourceUrl: url,
      attribution: "Reference page — unverified",
      verified: false as const,
    }));
}

/**
 * Discover the best representative media candidates available.
 */
export function discoverMediaSuggestions(input: {
  title: string;
  slug?: string;
  existing?: ResearchMediaSuggestion[];
  sourceUrls?: string[];
  encyclopediaMedia?: MediaItem[];
  relatedMedia?: MediaItem[];
}): ResearchMediaSuggestion[] {
  const out: ResearchMediaSuggestion[] = [];
  const seen = new Set<string>();

  function push(items: ResearchMediaSuggestion[]) {
    for (const m of items) {
      if (!hasUrl(m.url)) continue;
      const key = `${m.role}|${m.url}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ ...m, verified: false });
    }
  }

  // 1. Existing URL-backed suggestions
  push(input.existing ?? []);

  // 2. Live encyclopedia media for this entry (best representative often already published)
  push(fromEncyclopediaMedia(input.encyclopediaMedia));

  // 3. Curated title matches
  for (const c of CURATED) {
    if (c.match.test(input.title) || (input.slug && c.match.test(input.slug))) {
      push([c.item]);
    }
  }

  // 4. YouTube thumbnails / videos from sources
  push(fromYouTubeSources(input.sourceUrls ?? []));

  // 5. Related encyclopedia media (supporting only if we still lack featured)
  const related = fromEncyclopediaMedia(input.relatedMedia).map((m) => ({
    ...m,
    role:
      m.role === "featured" && out.some((x) => x.role === "featured")
        ? ("supporting" as const)
        : m.role,
    id: `media_related_${m.id ?? m.title}`,
  }));
  push(related);

  // 6. Trusted page references
  push(fromTrustedPageReferences(input.sourceUrls ?? []));

  // Ensure at most one featured
  let featuredSeen = false;
  const normalized = out.map((m) => {
    if (m.role !== "featured") return m;
    if (featuredSeen) return { ...m, role: "supporting" as const };
    featuredSeen = true;
    return m;
  });

  return normalized;
}
