/**
 * Evidence scoring — tier facts by corroboration quality (RC3-C).
 *
 * Pure logic. Does not call providers or fetch sources.
 */

import type { SourceCategory } from "./sourceEvaluation";
import { SOURCE_CATEGORY_PROFILES } from "./sourceEvaluation";

export type EvidenceTier = "High" | "Medium" | "Low" | "Unknown";

/** Inputs describing corroboration for a single fact/claim. */
export interface EvidenceSignals {
  /** Total sources that mention the claim. */
  sourceCount: number;
  /** Sources that appear independent of each other. */
  independentConfirmations: number;
  /** Distinct source categories represented. */
  sourceCategories: SourceCategory[];
  /** Days since the newest supporting source (optional). */
  recencyDays?: number;
  /** 1–5 subjective historical importance of the claim itself. */
  historicalImportance?: 1 | 2 | 3 | 4 | 5;
}

export interface EvidenceScoreResult {
  tier: EvidenceTier;
  /** 0–1 numeric hint for tooling — not a catalog score. */
  confidence: number;
  reasons: string[];
}

function diversityBonus(categories: SourceCategory[]): number {
  const unique = new Set(categories);
  if (unique.size >= 3) return 0.15;
  if (unique.size === 2) return 0.08;
  return 0;
}

function avgCredibility(categories: SourceCategory[]): number {
  if (categories.length === 0) return 0;
  const sum = categories.reduce(
    (acc, c) => acc + SOURCE_CATEGORY_PROFILES[c].credibility,
    0,
  );
  return sum / categories.length / 5;
}

/**
 * Score a fact's evidence into High / Medium / Low / Unknown.
 */
export function scoreEvidence(signals: EvidenceSignals): EvidenceScoreResult {
  const reasons: string[] = [];

  if (signals.sourceCount <= 0 || signals.sourceCategories.length === 0) {
    return {
      tier: "Unknown",
      confidence: 0,
      reasons: ["No supporting sources recorded"],
    };
  }

  let score = 0;

  // Independent confirmations dominate.
  if (signals.independentConfirmations >= 3) {
    score += 0.45;
    reasons.push("3+ independent confirmations");
  } else if (signals.independentConfirmations === 2) {
    score += 0.3;
    reasons.push("2 independent confirmations");
  } else if (signals.independentConfirmations === 1) {
    score += 0.15;
    reasons.push("Single independent confirmation");
  } else {
    reasons.push("No clear independent confirmation");
  }

  score += diversityBonus(signals.sourceCategories);
  if (signals.sourceCategories.length >= 2) {
    reasons.push(
      `Source diversity: ${[...new Set(signals.sourceCategories)].join(", ")}`,
    );
  }

  const cred = avgCredibility(signals.sourceCategories);
  score += cred * 0.25;
  reasons.push(`Avg category credibility weight: ${cred.toFixed(2)}`);

  if (signals.recencyDays !== undefined) {
    if (signals.recencyDays <= 365) {
      score += 0.05;
      reasons.push("Supporting source within last year");
    } else if (signals.recencyDays > 3650) {
      score -= 0.05;
      reasons.push("Newest support is older than ~10 years — check archival context");
    }
  }

  if ((signals.historicalImportance ?? 3) >= 4) {
    score += 0.05;
    reasons.push("High historical importance claim — needs strong corroboration");
  }

  score = Math.max(0, Math.min(1, score));

  let tier: EvidenceTier;
  if (score >= 0.7 && signals.independentConfirmations >= 2) {
    tier = "High";
  } else if (score >= 0.4) {
    tier = "Medium";
  } else if (score > 0) {
    tier = "Low";
  } else {
    tier = "Unknown";
  }

  // Reddit/social-only stacks cannot be High.
  const onlyWeak = signals.sourceCategories.every((c) =>
    ["reddit", "social_media", "blog", "unknown"].includes(c),
  );
  if (onlyWeak && tier === "High") {
    tier = "Low";
    reasons.push("Downgraded: only weak source categories");
  }

  return { tier, confidence: score, reasons };
}
