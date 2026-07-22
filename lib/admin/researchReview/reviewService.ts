/**
 * Research review → ApprovedResearch.
 * Structured decision outcomes — no free-text research homework.
 */

import type { AIDraftCategory } from "@/lib/ai/types";
import type {
  ApprovedResearch,
  ApprovedResolvedIssue,
  ApprovedVerifiedSource,
  ResearchPackage,
} from "@/lib/ai/packages";
import {
  applyOriginChoice,
  buildEditorialDecisions,
  type EditorialDecisionOutcome,
} from "@/lib/ai/research/editorialDecisions";
import { loadResearchPackage, saveResearchPackage } from "./packageStore";
import {
  findApprovedByPackageId,
  saveApprovedResearch,
} from "./approvedStore";
import { sourceKey } from "./sourceKey";

export interface ResearchReviewSubmission {
  packageId: string;
  /** Structured choices for decisions that needed (or received) editor action. */
  decisionOutcomes: EditorialDecisionOutcome[];
  /** Optional genuine editorial comment — not used for routine research. */
  editorNotes: string;
}

export { sourceKey };

function outcomeFor(
  outcomes: EditorialDecisionOutcome[],
  decisionId: string,
): EditorialDecisionOutcome | undefined {
  return outcomes.find((o) => o.decisionId === decisionId);
}

export function approveResearchFromReview(
  submission: ResearchReviewSubmission,
): ApprovedResearch {
  const original = loadResearchPackage(submission.packageId);
  if (!original) {
    throw new Error(
      `approveResearchFromReview: package not found: ${submission.packageId}`,
    );
  }

  const decisions = buildEditorialDecisions(original);
  const changesMade: string[] = [];

  // Category — keep AI recommendation unless editor overrode
  const categoryOutcome = outcomeFor(submission.decisionOutcomes, "decision_category");
  const categoryDecision = (
    categoryOutcome?.chosenValue ||
    original.categoryRecommendation
  ) as AIDraftCategory;

  let categoryReasoning = original.categoryReasoning;
  if (
    categoryOutcome &&
    categoryOutcome.chosenValue !== original.categoryRecommendation
  ) {
    categoryReasoning = `Editor chose ${categoryOutcome.chosenLabel} instead of AI recommendation ${original.categoryRecommendation}.`;
    changesMade.push(
      `Category changed from "${original.categoryRecommendation}" to "${categoryDecision}"`,
    );
  } else {
    const catDecision = decisions.find((d) => d.id === "decision_category");
    changesMade.push(
      catDecision?.autoAccepted
        ? `Category auto-accepted: "${categoryDecision}" (${Math.round((catDecision.confidence || 0) * 100)}%)`
        : `Category kept: "${categoryDecision}"`,
    );
  }

  // Origin framing
  let origin = original.origin;
  const originOutcome = outcomeFor(submission.decisionOutcomes, "decision_origin");
  if (originOutcome && originOutcome.chosenValue !== "keep") {
    origin = applyOriginChoice(origin, originOutcome.chosenValue);
    changesMade.push(`Origin framing: ${originOutcome.chosenLabel}`);
  }

  // Slug
  let slugSuggestion = original.slugSuggestion;
  const slugOutcome = outcomeFor(submission.decisionOutcomes, "decision_slug");
  if (slugOutcome?.chosenValue) {
    slugSuggestion = slugOutcome.chosenValue;
    if (slugOutcome.chosenValue !== original.slugSuggestion) {
      changesMade.push(`Slug set to /${slugSuggestion}`);
    }
  }

  const approvedPackage: ResearchPackage = {
    ...original,
    categoryRecommendation: categoryDecision,
    categoryReasoning,
    origin,
    slugSuggestion,
  };
  saveResearchPackage(approvedPackage);

  // Always accept AI-selected sources (no per-source homework)
  const verifiedSources: ApprovedVerifiedSource[] = approvedPackage.sources
    .slice(0, 8)
    .map((source, index) => ({
      sourceId: sourceKey(source, index),
      title: source.title,
      url: source.url,
      tier: source.tier,
      verificationNote:
        "AI-selected during completeness pipeline; accepted with package approval",
    }));
  if (verifiedSources.length > 0) {
    changesMade.push(`Accepted ${verifiedSources.length} AI-selected source(s)`);
  }

  const now = new Date().toISOString();
  const resolvedIssues: ApprovedResolvedIssue[] = submission.decisionOutcomes.map(
    (o) => {
      const decision = decisions.find((d) => d.id === o.decisionId);
      return {
        issueId: o.decisionId,
        title: decision?.label ?? o.decisionId,
        resolutionNote:
          o.action === "keep"
            ? `Kept AI recommendation: ${o.chosenLabel}`
            : `Chose ${o.action === "alternative" ? "alternative" : "different option"}: ${o.chosenLabel}`,
        resolvedAt: now,
      };
    },
  );
  if (resolvedIssues.length > 0) {
    changesMade.push(`Recorded ${resolvedIssues.length} structured decision(s)`);
  }

  const editorNotes = submission.editorNotes.trim();
  const notesList = editorNotes ? [editorNotes] : [];

  return saveApprovedResearch({
    researchPackage: approvedPackage,
    categoryDecision,
    verifiedSources,
    resolvedIssues,
    editorNotes: notesList,
    changesMade,
  });
}

export function getApprovalForPackage(
  packageId: string,
): ApprovedResearch | null {
  return findApprovedByPackageId(packageId);
}
