/**
 * YouTube thumbnail fallback — real generation's #2 media source per
 * lib/content/templates/articleTemplate.ts source priority (after
 * Wikimedia Commons). Uses the same extractYouTubeId + oEmbed
 * verification pattern as lib/content/validation/mediaLiveChecks.ts,
 * so a thumbnail is never attached for a deleted/private video.
 */

import type { ResearchMediaSuggestion } from "@/lib/ai/packages";

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace(/^\//, "").slice(0, 11);
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const embed = u.pathname.match(/\/embed\/([\w-]{11})/);
      if (embed) return embed[1];
      const shorts = u.pathname.match(/\/shorts\/([\w-]{11})/);
      if (shorts) return shorts[1];
    }
  } catch {
    return null;
  }
  return null;
}

async function isEmbeddable(videoId: string): Promise<boolean> {
  try {
    const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${videoId}`,
    )}&format=json`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8_000) });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Scan already-fetched source URLs (from Tavily results) for a YouTube
 * link, verify it's actually embeddable, and return its thumbnail.
 * hqdefault is used per the project's media rules — maxresdefault 404s often.
 */
export async function findYouTubeThumbnail(
  sourceUrls: string[],
): Promise<ResearchMediaSuggestion | null> {
  for (const url of sourceUrls) {
    const videoId = extractYouTubeId(url);
    if (!videoId) continue;
    if (!(await isEmbeddable(videoId))) continue;
    return {
      id: `media_featured_yt_${videoId}`,
      role: "featured",
      type: "image",
      title: "YouTube thumbnail",
      url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      source: "YouTube",
      sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
      searchHint: url,
      verified: false,
    };
  }
  return null;
}
