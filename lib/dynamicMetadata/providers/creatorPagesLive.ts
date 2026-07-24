/**
 * Creator / official page activity from cited YouTube channel RSS feeds.
 */

import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";
import { fetchText, normalizeCount, recencyRatio } from "./http";

function extractChannelFeedUrls(sourceUrls: string[]): string[] {
  const feeds: string[] = [];
  for (const raw of sourceUrls) {
    try {
      const u = new URL(raw);
      if (!/youtube\.com|youtu\.be/i.test(u.hostname)) continue;
      const channelMatch = u.pathname.match(/\/channel\/(UC[\w-]+)/i);
      if (channelMatch?.[1]) {
        feeds.push(
          `https://www.youtube.com/feeds/videos.xml?channel_id=${channelMatch[1]}`,
        );
        continue;
      }
      // @handle — RSS needs channel_id; skip unless we already have channel URL.
    } catch {
      // ignore bad URLs
    }
  }
  return [...new Set(feeds)];
}

function parseFeedDates(xml: string): string[] {
  const dates: string[] = [];
  const published = xml.match(/<published>(.*?)<\/published>/gi) ?? [];
  for (const p of published) {
    const m = p.match(/<published>(.*?)<\/published>/i);
    if (m?.[1]) dates.push(m[1]);
  }
  return dates;
}

export const creatorPagesLiveProvider: DynamicSignalProvider = {
  id: "creator-pages",
  label: "Creator pages (YouTube RSS)",
  priority: 2,
  async collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> {
    const now = new Date().toISOString();
    const feeds = extractChannelFeedUrls(ctx.sourceUrls);

    if (feeds.length === 0) {
      return [
        {
          providerId: "creator-pages",
          kind: "recent-uploads",
          value: null,
          note: "No YouTube channel_id URLs on entry sources — creator RSS skipped",
          observedAt: now,
        },
      ];
    }

    const feedUrl = feeds[0];
    const xml = await fetchText(feedUrl, { timeoutMs: 10_000 });
    if (!xml) {
      return [
        {
          providerId: "creator-pages",
          kind: "recent-uploads",
          value: null,
          note: "Creator YouTube RSS fetch failed",
          observedAt: now,
          sourceUrls: [feedUrl],
        },
      ];
    }

    const dates = parseFeedDates(xml);
    const { recent, total } = recencyRatio(dates, 30);
    const score = normalizeCount(recent, 6);

    return [
      {
        providerId: "creator-pages",
        kind: "recent-uploads",
        value: score,
        note: `Creator channel RSS: ${recent}/${total} videos published in last 30d`,
        observedAt: now,
        sourceUrls: [feedUrl],
      },
      {
        providerId: "creator-pages",
        kind: "platform-activity",
        value: score,
        note: "Creator upload cadence as platform-activity",
        observedAt: now,
        sourceUrls: [feedUrl],
      },
    ];
  },
};
