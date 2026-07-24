/**
 * Live YouTube evidence via Data API v3 when YOUTUBE_DATA_API_KEY is set.
 * Without a key, returns null (does not invent activity).
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
} from "./http";

function youtubeApiKey(): string | undefined {
  const raw =
    process.env.YOUTUBE_DATA_API_KEY?.trim() ||
    process.env.YOUTUBE_API_KEY?.trim();
  return raw || undefined;
}

interface YtSearchResponse {
  items?: Array<{
    id?: { videoId?: string };
    snippet?: { title?: string; publishedAt?: string; channelTitle?: string };
  }>;
}

interface YtVideosResponse {
  items?: Array<{
    id?: string;
    statistics?: { viewCount?: string; likeCount?: string };
  }>;
}

export const youtubeLiveProvider: DynamicSignalProvider = {
  id: "youtube",
  label: "YouTube (Data API)",
  priority: 4,
  async collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> {
    const now = new Date().toISOString();
    const key = youtubeApiKey();
    if (!key) {
      return [
        {
          providerId: "youtube",
          kind: "recent-uploads",
          value: null,
          note: "YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
          observedAt: now,
        },
      ];
    }

    const query = evidenceQuery(ctx);
    const publishedAfter = daysAgo(30).toISOString();
    const searchUrl =
      "https://www.googleapis.com/youtube/v3/search?" +
      new URLSearchParams({
        part: "snippet",
        q: query,
        type: "video",
        order: "date",
        publishedAfter,
        maxResults: "15",
        key,
      });

    const search = await fetchJson<YtSearchResponse>(searchUrl, {
      timeoutMs: 10_000,
    });
    if (!search) {
      return [
        {
          providerId: "youtube",
          kind: "recent-uploads",
          value: null,
          note: `YouTube search failed for “${query}”`,
          observedAt: now,
        },
      ];
    }

    const items = search.items ?? [];
    if (items.length === 0) {
      return [
        {
          providerId: "youtube",
          kind: "recent-uploads",
          value: 0,
          note: `No YouTube videos in last 30d for “${query}”`,
          observedAt: now,
        },
      ];
    }

    const ids = items
      .map((i) => i.id?.videoId)
      .filter((id): id is string => Boolean(id));
    let viewSum = 0;
    if (ids.length > 0) {
      const videosUrl =
        "https://www.googleapis.com/youtube/v3/videos?" +
        new URLSearchParams({
          part: "statistics",
          id: ids.slice(0, 15).join(","),
          key,
        });
      const videos = await fetchJson<YtVideosResponse>(videosUrl, {
        timeoutMs: 10_000,
      });
      for (const v of videos?.items ?? []) {
        viewSum += Number(v.statistics?.viewCount ?? 0) || 0;
      }
    }

    const uploadScore = normalizeCount(items.length, 10);
    const viewScore = normalizeCount(viewSum, 500_000);
    const blended = Math.round(uploadScore * 0.55 + viewScore * 0.45);
    const urls = ids
      .slice(0, 4)
      .map((id) => `https://www.youtube.com/watch?v=${id}`);

    return [
      {
        providerId: "youtube",
        kind: "recent-uploads",
        value: blended,
        note: `YouTube 30d: ${items.length} videos, viewΣ≈${viewSum.toLocaleString()}`,
        observedAt: now,
        sourceUrls: urls,
      },
      {
        providerId: "youtube",
        kind: "platform-activity",
        value: blended,
        note: "YouTube activity mirrored as platform-activity",
        observedAt: now,
        sourceUrls: urls.slice(0, 2),
      },
    ];
  },
};
