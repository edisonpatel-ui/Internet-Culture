/**
 * Cultural impact evaluator — recommendation structures only (RC3-C).
 *
 * Never generates or writes catalog scores. Humans decide.
 */

export type ImpactDimension =
  | "historical_significance"
  | "longevity"
  | "platform_reach"
  | "language_influence"
  | "mainstream_adoption"
  | "media_coverage"
  | "commercial_impact"
  | "lasting_legacy";

export type ImpactSignalStrength = "strong" | "moderate" | "weak" | "unknown";

export interface CulturalImpactSignal {
  dimension: ImpactDimension;
  strength: ImpactSignalStrength;
  /** Evidence-backed note — not a numeric catalog score. */
  evidenceNote: string;
  recommendation: string;
}

export interface CulturalImpactAssessment {
  topic: string;
  signals: CulturalImpactSignal[];
  /** Overall editorial recommendation narrative. */
  summaryRecommendation: string;
  /** Always true — never auto-apply to scores.relevance / influence / etc. */
  requiresHumanScoreJudgment: true;
  /** Suggested dimensions to consider when a human sets scores — not values. */
  scoreConsiderations: string[];
}

/**
 * Assemble an impact assessment from supplied signals.
 * Does not invent impact claims.
 */
export function buildCulturalImpactAssessment(
  topic: string,
  signals: CulturalImpactSignal[],
  summaryRecommendation: string,
  scoreConsiderations: string[] = [],
): CulturalImpactAssessment {
  return {
    topic,
    signals,
    summaryRecommendation,
    requiresHumanScoreJudgment: true,
    scoreConsiderations,
  };
}
