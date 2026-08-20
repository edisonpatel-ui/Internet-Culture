/**
 * Live Reddit discussion evidence (public JSON search — no API key).
 */

import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";
import {
  evidenceQuery,
  fetchJson,
  normalizeCount,
  recencyRatio,
} from "./http";

interface RedditListing {
  data?: {
    children?: Array<{
      data?: {
        title?: string;
        score?: number;
        num_comments?: number;
        created_utc?: number;
        permalink?: string;
        subreddit?: string;
      };
    }>;
  };
}

export const redditLiveProvider: DynamicSignalProvider = {
  id: "reddit",
  label: "Reddit (live search)",
  priority: 4,
  async collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> {
    const now = new Date().toISOString();
    const query = evidenceQuery(ctx);
    const url =
      "https://www.reddit.com/search.json?" +
      new URLSearchParams({
        q: query,
        sort: "new",
        t: "month",
        limit: "25",
        type: "link",
      });

    const data = await fetchJson<RedditListing>(url, {
      timeoutMs: 10_000,
      headers: {
        Accept: "application/json",
      },
    });

    const posts = (data?.data?.children ?? [])
      .map((c) => c.data)
      .filter(Boolean) as NonNullable<
      NonNullable<RedditListing["data"]>["children"]
    >[number]["data"][];

    if (!data) {
      return [
        {
          providerId: "reddit",
          kind: "discussion-volume",
          value: null,
          note: `Reddit search unavailable for “${query}”`,
          observedAt: now,
        },
      ];
    }

    if (posts.length === 0) {
      return [
        {
          providerId: "reddit",
          kind: "discussion-volume",
          value: 0,
          note: `No Reddit posts in ~30d search for “${query}”`,
          observedAt: now,
          sourceUrls: [url],
        },
      ];
    }

    const { recent } = recencyRatio(
      posts.map((p) => p?.created_utc ?? null),
      30,
    );
    const scoreSum = posts.reduce((a, p) => a + (p?.score ?? 0), 0);
    const comments = posts.reduce((a, p) => a + (p?.num_comments ?? 0), 0);
    // Blend post count + engagement.
    const volume = normalizeCount(recent * 3 + Math.sqrt(Math.max(0, scoreSum)) + Math.sqrt(comments), 40);

    const urls = posts
      .slice(0, 4)
      .map((p) =>
        p?.permalink ? `https://www.reddit.com${p.permalink}` : null,
      )
      .filter((u): u is string => Boolean(u));

    // Real post titles — this is what an LLM judgment step reasons over for
    // Cringe/Brainrot/Influence, instead of pattern-matching the article's
    // own title/tags against itself.
    const evidenceText = posts
      .slice(0, 8)
      .map((p) =>
        p?.title
          ? `r/${p.subreddit ?? "?"}: "${p.title}" (${p.score ?? 0} pts, ${p.num_comments ?? 0} comments)`
          : null,
      )
      .filter((t): t is string => Boolean(t));

    return [
      {
        providerId: "reddit",
        kind: "discussion-volume",
        value: volume,
        note: `Reddit month search: ${recent} recent posts, scoreΣ=${scoreSum}, commentsΣ=${comments}`,
        observedAt: now,
        sourceUrls: urls.length > 0 ? urls : [url],
        evidenceText,
      },
      {
        providerId: "reddit",
        kind: "platform-activity",
        value: volume,
        note: "Reddit activity mirrored as platform-activity",
        observedAt: now,
        sourceUrls: urls.slice(0, 2),
      },
    ];
  },
};
