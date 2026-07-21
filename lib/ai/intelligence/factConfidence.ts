/**
 * Fact confidence — combine evidence into labeled confidence (RC3-C).
 *
 * Pure logic. Examples:
 * - 3 independent journalism + official + archive → Very High
 * - Single Reddit thread → Low
 */

import type { SourceCategory } from "./sourceEvaluation";
import { scoreEvidence, type EvidenceSignals, type EvidenceTier } from "./evidenceScoring";

export type FactConfidenceLabel =
  | "Very High"
  | "High"
  | "Medium"
  | "Low"
  | "Very Low"
  | "Unknown";

export interface FactEvidenceInput {
  claim: string;
  sourceCategories: SourceCategory[];
  /** True when sources appear independently authored. */
  independent: boolean;
  /** Optional: treat as official announcement present. */
  hasOfficial?: boolean;
  /** Optional: archive corroboration present. */
  hasArchive?: boolean;
}

export interface FactConfidenceResult {
  claim: string;
  label: FactConfidenceLabel;
  /** 0–1 */
  score: number;
  evidenceTier: EvidenceTier;
  reasons: string[];
}

function toLabel(
  tier: EvidenceTier,
  score: number,
  input: FactEvidenceInput,
): FactConfidenceLabel {
  const journalismCount = input.sourceCategories.filter(
    (c) => c === "journalism",
  ).length;
  const strongStack =
    journalismCount >= 3 &&
    input.hasOfficial === true &&
    input.hasArchive === true &&
    input.independent;

  if (strongStack) return "Very High";

  if (tier === "Unknown" || score <= 0) return "Unknown";
  if (score >= 0.85) return "Very High";
  if (tier === "High" || score >= 0.7) return "High";
  if (tier === "Medium" || score >= 0.4) return "Medium";
  if (score >= 0.2) return "Low";
  return "Very Low";
}

/**
 * Combine source categories into a confidence label for one claim.
 */
export function assessFactConfidence(
  input: FactEvidenceInput,
): FactConfidenceResult {
  const categories = [...input.sourceCategories];
  if (input.hasOfficial && !categories.includes("official")) {
    categories.push("official");
  }
  if (input.hasArchive && !categories.includes("archive")) {
    categories.push("archive");
  }

  const onlyReddit =
    categories.length === 1 && categories[0] === "reddit";
  const onlySocialWeak =
    categories.length > 0 &&
    categories.every((c) =>
      ["reddit", "social_media", "blog", "unknown"].includes(c),
    );

  if (onlyReddit) {
    return {
      claim: input.claim,
      label: "Low",
      score: 0.15,
      evidenceTier: "Low",
      reasons: ["Single Reddit thread / category — insufficient alone"],
    };
  }

  const independentConfirmations = input.independent
    ? Math.max(1, new Set(categories).size)
    : categories.length > 0
      ? 1
      : 0;

  const signals: EvidenceSignals = {
    sourceCount: categories.length,
    independentConfirmations,
    sourceCategories: categories,
  };

  const scored = scoreEvidence(signals);
  let label = toLabel(scored.tier, scored.confidence, input);
  const reasons = [...scored.reasons];

  if (onlySocialWeak && (label === "High" || label === "Very High")) {
    label = "Low";
    reasons.push("Capped: weak source categories only");
  }

  if (
    input.hasOfficial &&
    input.hasArchive &&
    independentConfirmations >= 3
  ) {
    reasons.push("Official + archive + multiple independents");
  }

  return {
    claim: input.claim,
    label,
    score: scored.confidence,
    evidenceTier: scored.tier,
    reasons,
  };
}

/** Numeric midpoints for tooling that needs a single float. */
export function confidenceLabelToScore(label: FactConfidenceLabel): number {
  switch (label) {
    case "Very High":
      return 0.95;
    case "High":
      return 0.8;
    case "Medium":
      return 0.55;
    case "Low":
      return 0.3;
    case "Very Low":
      return 0.1;
    case "Unknown":
      return 0;
  }
}
