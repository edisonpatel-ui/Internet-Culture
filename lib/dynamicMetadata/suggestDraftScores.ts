/**
 * Draft-time score suggestions using the same dynamic methodology.
 * Prefer this over hardcoded 55/45/25/30 defaults.
 */

import type { Scores } from "@/types";
import type { DynamicSignalBundle } from "./providers/types";
import { scoreDynamicMetadata, suggestScoresFromSignals } from "./scoreFromEvidence";

export interface DraftScoreContext {
  title: string;
  category: string;
  tags?: string[];
  sourceUrls?: string[];
  trendDirection?: string;
  ageYears?: number | null;
  /** Seed scores before methodology (influence preserved). */
  baseScores?: Partial<Scores>;
}

/**
 * Build a minimal signal bundle from draft context (no network).
 * Live providers can be layered later via researchDynamicSignals on published entries.
 */
export function suggestDraftCulturalScores(ctx: DraftScoreContext): Scores {
  const now = new Date().toISOString();
  const tags = (ctx.tags ?? []).map((t) => t.toLowerCase());
  const tagBlob = tags.join(" ");
  const observations: DynamicSignalBundle["observations"] = [];

  const trendMap: Record<string, number> = {
    rising: 85,
    new: 80,
    stable: 55,
    declining: 30,
  };
  observations.push({
    providerId: "catalog-evidence",
    kind: "editorial-trend",
    value: trendMap[ctx.trendDirection ?? "stable"] ?? 55,
    observedAt: now,
    note: "Draft trend seed",
  });

  if (ctx.ageYears != null) {
    observations.push({
      providerId: "catalog-evidence",
      kind: "outdatedness",
      value: Math.max(0, Math.min(100, Math.round((ctx.ageYears / 25) * 100))),
      observedAt: now,
    });
  }

  if (
    ctx.category === "brainrot" ||
    /brainrot|skibidi|ohio|gen.?alpha/.test(tagBlob)
  ) {
    observations.push({
      providerId: "catalog-evidence",
      kind: "absurdity",
      value: 80,
      observedAt: now,
    });
    observations.push({
      providerId: "catalog-evidence",
      kind: "gen-cohort-adoption",
      value: 85,
      observedAt: now,
    });
  }

  if (ctx.category === "meme") {
    observations.push({
      providerId: "catalog-evidence",
      kind: "remix-activity",
      value: 60,
      observedAt: now,
    });
  }

  const urls = ctx.sourceUrls ?? [];
  if (urls.some((u) => /wikipedia|knowyourmeme|merriam-webster|britannica/i.test(u))) {
    observations.push({
      providerId: "authority-sources",
      kind: "authority-documentation",
      value: 70,
      observedAt: now,
    });
  }

  const bundle: DynamicSignalBundle = {
    slug: ctx.title.toLowerCase().replace(/\s+/g, "-"),
    title: ctx.title,
    observations,
    providersAttempted: ["catalog-evidence", "authority-sources"],
    hasMeasuredData: observations.some((o) => o.value != null),
  };

  const suggestion = scoreDynamicMetadata(bundle, {
    ageYears: ctx.ageYears ?? null,
    tags,
  });

  const base: Scores = {
    relevance: ctx.baseScores?.relevance ?? 50,
    influence: ctx.baseScores?.influence ?? 45,
    cringe: ctx.baseScores?.cringe ?? 25,
    brainrot: ctx.baseScores?.brainrot ?? 30,
  };

  return suggestScoresFromSignals(base, suggestion);
}
