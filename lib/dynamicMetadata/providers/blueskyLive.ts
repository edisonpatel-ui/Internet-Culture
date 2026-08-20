/**
 * Live Bluesky discussion evidence (public AT Protocol AppView API — no
 * API key). Feeds the same "discussion-volume" signal kind as Reddit, so
 * the two blend together in scoreRelevance rather than either being a
 * single point of failure — if one is unreachable (or has thin coverage
 * for a given term) on a given refresh, the other still contributes real
 * evidence instead of the signal silently dropping to null and leaving
 * News as the only working primary source.
 */

import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";
import { evidenceQuery, fetchJson, normalizeCount, recencyRatio } from "./http";

interface BlueskyPost {
  indexedAt?: string;
  likeCount?: number;
  repostCount?: number;
  replyCount?: number;
  uri?: string;
  author?: { handle?: string };
  record?: { text?: string };
}

interface BlueskySearchResponse {
  posts?: BlueskyPost[];
}

function postUrl(post: BlueskyPost): string | null {
  const handle = post.author?.handle;
  const rkey = post.uri?.split("/").pop();
  if (!handle || !rkey) return null;
  return `https://bsky.app/profile/${handle}/post/${rkey}`;
}

export const blueskyLiveProvider: DynamicSignalProvider = {
  id: "bluesky",
  label: "Bluesky (live search)",
  priority: 4,
  async collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> {
    const now = new Date().toISOString();
    const query = evidenceQuery(ctx);
    const url =
      "https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?" +
      new URLSearchParams({
        q: query,
        sort: "latest",
        limit: "25",
      });

    const data = await fetchJson<BlueskySearchResponse>(url, {
      timeoutMs: 10_000,
      headers: { Accept: "application/json" },
    });

    if (!data) {
      return [
        {
          providerId: "bluesky",
          kind: "discussion-volume",
          value: null,
          note: `Bluesky search unavailable for "${query}"`,
          observedAt: now,
        },
      ];
    }

    const posts = data.posts ?? [];
    if (posts.length === 0) {
      return [
        {
          providerId: "bluesky",
          kind: "discussion-volume",
          value: 0,
          note: `No Bluesky posts in recent search for "${query}"`,
          observedAt: now,
          sourceUrls: [url],
        },
      ];
    }

    const { recent } = recencyRatio(
      posts.map((p) => p.indexedAt ?? null),
      30,
    );
    const likeSum = posts.reduce((a, p) => a + (p.likeCount ?? 0), 0);
    const repostSum = posts.reduce((a, p) => a + (p.repostCount ?? 0), 0);
    const replySum = posts.reduce((a, p) => a + (p.replyCount ?? 0), 0);
    const engagement = likeSum + repostSum * 2 + replySum;
    const volume = normalizeCount(recent * 3 + Math.sqrt(Math.max(0, engagement)), 40);

    const urls = posts
      .slice(0, 4)
      .map(postUrl)
      .filter((u): u is string => Boolean(u));

    // Real post text — feeds the LLM judgment step for Cringe/Brainrot/
    // Influence instead of relying on the article's own tags/title.
    const evidenceText = posts
      .slice(0, 8)
      .map((p) => {
        const text = p.record?.text?.trim();
        if (!text) return null;
        const truncated = text.length > 200 ? `${text.slice(0, 200)}…` : text;
        return `@${p.author?.handle ?? "?"}: "${truncated}" (${p.likeCount ?? 0} likes, ${p.repostCount ?? 0} reposts)`;
      })
      .filter((t): t is string => Boolean(t));

    return [
      {
        providerId: "bluesky",
        kind: "discussion-volume",
        value: volume,
        note: `Bluesky search: ${recent} recent posts, engagement=${engagement}`,
        observedAt: now,
        sourceUrls: urls.length > 0 ? urls : [url],
        evidenceText,
      },
      {
        providerId: "bluesky",
        kind: "platform-activity",
        value: volume,
        note: "Bluesky activity mirrored as platform-activity",
        observedAt: now,
        sourceUrls: urls.slice(0, 2),
      },
    ];
  },
};
