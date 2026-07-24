/**
 * Live dictionary / Wiktionary evidence (especially useful for slang).
 * Free MediaWiki API — no key.
 */

import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";
import { evidenceQuery, fetchJson } from "./http";

interface WikiQuery {
  query?: {
    pages?: Record<
      string,
      {
        pageid?: number;
        title?: string;
        missing?: boolean;
        revisions?: Array<{ timestamp?: string }>;
      }
    >;
  };
}

function freshnessFromRevision(iso?: string): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  const days = Math.floor((Date.now() - t) / 86_400_000);
  if (days <= 30) return 70;
  if (days <= 180) return 50;
  if (days <= 365) return 35;
  if (days <= 1000) return 20;
  return 10;
}

export const dictionaryLiveProvider: DynamicSignalProvider = {
  id: "dictionary",
  label: "Wiktionary (live)",
  priority: 2,
  async collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> {
    const now = new Date().toISOString();
    // Prefer slang / short titles; still try for others.
    const query = evidenceQuery(ctx);
    const title = query.split(/\s+/)[0] ?? query;

    const url =
      "https://en.wiktionary.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        titles: title,
        prop: "revisions",
        rvprop: "timestamp",
        rvlimit: "1",
        format: "json",
        origin: "*",
      });

    const data = await fetchJson<WikiQuery>(url, { timeoutMs: 8_000 });
    if (!data?.query?.pages) {
      return [
        {
          providerId: "dictionary",
          kind: "platform-activity",
          value: null,
          note: `Wiktionary lookup unavailable for “${title}”`,
          observedAt: now,
        },
      ];
    }

    const page = Object.values(data.query.pages)[0];
    if (!page || page.missing || page.pageid == null) {
      return [
        {
          providerId: "dictionary",
          kind: "authority-documentation",
          value: null,
          note: `No Wiktionary page for “${title}”`,
          observedAt: now,
        },
      ];
    }

    const pageUrl = `https://en.wiktionary.org/wiki/${encodeURIComponent(page.title ?? title)}`;
    const revTs = page.revisions?.[0]?.timestamp;
    const fresh = freshnessFromRevision(revTs);

    return [
      {
        providerId: "dictionary",
        kind: "authority-documentation",
        value: 65,
        note: `Wiktionary page “${page.title ?? title}”`,
        observedAt: now,
        sourceUrls: [pageUrl],
      },
      {
        providerId: "dictionary",
        kind: "platform-activity",
        value: fresh,
        note: revTs
          ? `Wiktionary last revision ${revTs.slice(0, 10)}`
          : "Wiktionary page exists; revision time unknown",
        observedAt: now,
        sourceUrls: [pageUrl],
      },
    ];
  },
};
