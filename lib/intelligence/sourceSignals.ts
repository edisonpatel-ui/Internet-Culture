import type { BaseEntry, EntrySource } from "@/types";

/**
 * Source awareness helpers.
 *
 * We cannot call Google Trends / live APIs from static content today.
 * Instead we reward entries that already cite high-authority sources
 * (Wikipedia, Know Your Meme, Trends URLs) as a soft signal of research quality
 * and cultural documentation — not as a substitute for live popularity.
 */

const AUTHORITY_DOMAINS: { match: RegExp; boost: number; label: string }[] = [
  { match: /wikipedia\.org|wikimedia\.org/i, boost: 8, label: "Wikipedia" },
  { match: /knowyourmeme\.com/i, boost: 7, label: "Know Your Meme" },
  { match: /trends\.google\./i, boost: 6, label: "Google Trends" },
  { match: /merriam-webster\.com|oup\.com|dictionary\.com/i, boost: 4, label: "Dictionary" },
  { match: /nytimes\.com|bbc\.com|theguardian\.com|reuters\.com/i, boost: 3, label: "News" },
];

function sourceText(source: EntrySource): string {
  return `${source.url ?? ""} ${source.domain ?? ""} ${source.title ?? ""}`;
}

/** Soft 0–20 boost from cited authoritative sources. */
export function getSourceAuthorityBoost(entry: BaseEntry): number {
  const sources = entry.sources ?? [];
  if (sources.length === 0) return 0;

  let boost = 0;
  const seen = new Set<string>();

  for (const source of sources) {
    const text = sourceText(source);
    for (const rule of AUTHORITY_DOMAINS) {
      if (rule.match.test(text) && !seen.has(rule.label)) {
        seen.add(rule.label);
        boost += rule.boost;
      }
    }
  }

  return Math.min(20, boost);
}

export function listAuthoritySourceLabels(entry: BaseEntry): string[] {
  const labels: string[] = [];
  for (const source of entry.sources ?? []) {
    const text = sourceText(source);
    for (const rule of AUTHORITY_DOMAINS) {
      if (rule.match.test(text) && !labels.includes(rule.label)) {
        labels.push(rule.label);
      }
    }
  }
  return labels;
}
