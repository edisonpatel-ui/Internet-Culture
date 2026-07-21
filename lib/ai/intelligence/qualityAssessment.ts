/**
 * Quality assessment — editorial quality recommendations (RC3-C).
 *
 * Never rewrites content automatically.
 */

export type QualityIssueCode =
  | "missing_context"
  | "missing_chronology"
  | "weak_sources"
  | "too_few_examples"
  | "unsupported_claims"
  | "ai_style_writing"
  | "duplicate_content"
  | "poor_readability"
  | "weak_historical_explanation"
  | "other";

export type QualitySeverity = "info" | "improve" | "critical";

export interface QualityIssue {
  code: QualityIssueCode;
  severity: QualitySeverity;
  finding: string;
  recommendation: string;
}

export interface QualityAssessmentResult {
  slug?: string;
  title: string;
  overall: "strong" | "improve" | "weak";
  issues: QualityIssue[];
  summary: string;
  requiresHumanReview: true;
}

export function buildQualityAssessment(
  title: string,
  issues: QualityIssue[],
  summary: string,
  slug?: string,
): QualityAssessmentResult {
  let overall: QualityAssessmentResult["overall"] = "strong";
  if (issues.some((i) => i.severity === "critical")) {
    overall = "weak";
  } else if (issues.some((i) => i.severity === "improve") || issues.length > 0) {
    overall = "improve";
  }

  return {
    slug,
    title,
    overall,
    issues,
    summary,
    requiresHumanReview: true,
  };
}
