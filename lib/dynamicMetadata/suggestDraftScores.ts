/**
 * Draft-time score suggestions.
 * Relevance/trending require live evidence (Maintenance refresh) — drafts keep
 * base relevance/influence and only soft-fill brainrot/cringe from catalog cues.
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
 * Offline draft seeds for character scores only.
 * Does not invent Current Relevance from age/heuristics.
 */
export function suggestDraftCulturalScores(ctx: DraftScoreContext): Scores {
  const now = new Date().toISOString();
  const tags = (ctx.tags ?? []).map((t) => t.toLowerCase());
  const tagBlob = tags.join(" ");
  const observations: DynamicSignalBundle["observations"] = [];

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

  const bundle: DynamicSignalBundle = {
    slug: ctx.title.toLowerCase().replace(/\s+/g, "-"),
    title: ctx.title,
    observations,
    providersAttempted: ["catalog-evidence"],
    hasMeasuredData: observations.some((o) => o.value != null),
    hasLiveEvidence: false,
  };

  const suggestion = scoreDynamicMetadata(bundle, {
    ageYears: ctx.ageYears ?? null,
    tags,
  });

  const base: Scores = {
    relevance: ctx.baseScores?.relevance ?? 50,
    influence: ctx.baseScores?.influence ?? 45,
    cringe: ctx.baseScores?.cringe ?? 25,
    brainrot: ctx.baseScores?.brainrot ?? (ctx.category === "brainrot" ? 70 : 30),
  };

  return suggestScoresFromSignals(base, suggestion);
}
