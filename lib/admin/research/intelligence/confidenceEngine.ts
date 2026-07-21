/**
 * Confidence engine — maps evidence tiers to FactConfidenceLabel assessments.
 */

import type { ConfidenceAssessment, ConfidenceEngine, Evidence } from "./types";

export const mockConfidenceEngine: ConfidenceEngine = {
  assess(evidence: Evidence[]): ConfidenceAssessment[] {
    return evidence.map((e) => {
      let label: ConfidenceAssessment["label"] = "Unknown";
      const reasons: string[] = [];

      if (e.tier === "High") {
        label = "High";
        reasons.push("High evidence tier in stub.");
      } else if (e.tier === "Medium") {
        label = "Medium";
        reasons.push("Medium evidence tier — secondary / encyclopedia-class stub.");
      } else if (e.tier === "Low") {
        label = "Low";
        reasons.push("Low evidence tier — social / unverified discourse stub.");
      } else {
        label = "Unknown";
        reasons.push("Unknown tier — treat as unsupported until verified.");
      }

      if (!e.sourceUrl) {
        reasons.push("No URL attached — confidence capped for editorial use.");
        if (label === "High") label = "Medium";
      }

      const scoreByLabel: Record<ConfidenceAssessment["label"], number> = {
        "Very High": 0.9,
        High: 0.8,
        Medium: 0.55,
        Low: 0.35,
        "Very Low": 0.2,
        Unknown: 0.15,
      };

      return {
        claim: e.claim,
        label,
        score: scoreByLabel[label],
        reasons,
      };
    });
  },
};
