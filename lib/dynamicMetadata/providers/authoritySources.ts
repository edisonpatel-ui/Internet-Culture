import type {
  DynamicSignalObservation,
  DynamicSignalProvider,
  DynamicSignalProviderContext,
} from "./types";

const RULES: { match: RegExp; kindBoost: number; note: string }[] = [
  {
    match: /wikipedia\.org|wikimedia\.org/i,
    kindBoost: 70,
    note: "Wikipedia / Wikimedia cited",
  },
  {
    match: /knowyourmeme\.com/i,
    kindBoost: 75,
    note: "Know Your Meme cited",
  },
  {
    match: /merriam-webster\.com|britannica\.com|dictionary\.com|oup\.com/i,
    kindBoost: 65,
    note: "Dictionary / Britannica cited",
  },
  {
    match: /nytimes\.com|bbc\.|theguardian\.com|reuters\.com|apnews\.com|washingtonpost\.com/i,
    kindBoost: 55,
    note: "Major news organization cited",
  },
  {
    match: /trends\.google\./i,
    kindBoost: 50,
    note: "Google Trends URL cited on entry",
  },
];

/**
 * Reads already-cited sources on the entry — no network.
 * Live Wikipedia/KYM/news fetchers can replace or augment this later.
 */
export const authoritySourcesProvider: DynamicSignalProvider = {
  id: "authority-sources",
  label: "Authority sources (cited)",
  priority: 2,
  collect(ctx: DynamicSignalProviderContext): DynamicSignalObservation[] {
    const now = new Date().toISOString();
    const out: DynamicSignalObservation[] = [];
    let best = 0;
    const notes: string[] = [];

    for (const url of ctx.sourceUrls) {
      for (const rule of RULES) {
        if (rule.match.test(url)) {
          best = Math.max(best, rule.kindBoost);
          if (!notes.includes(rule.note)) notes.push(rule.note);
        }
      }
    }

    if (best > 0) {
      out.push({
        providerId: "authority-sources",
        kind: "authority-documentation",
        value: best,
        note: notes.join("; "),
        observedAt: now,
        sourceUrls: ctx.sourceUrls.slice(0, 8),
      });
    } else {
      out.push({
        providerId: "authority-sources",
        kind: "authority-documentation",
        value: null,
        note: "No Wikipedia / KYM / dictionary / major-news URLs on entry sources",
        observedAt: now,
      });
    }

    return out;
  },
};
