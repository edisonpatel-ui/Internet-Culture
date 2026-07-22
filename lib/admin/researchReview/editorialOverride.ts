/**
 * Re-run Knowledge Engine with editor guidance for missing required fields.
 * Continue Anyway marks unresolved required fields as Unknown and unlocks draft.
 */

import {
  parseEditorInstructions,
  runKnowledgeEngine,
} from "@/lib/ai/knowledgeEngine";
import {
  categoryHintFromGuidance,
  discoverTrustedSources,
  summaryFromEditorGuidance,
} from "@/lib/ai/knowledgeEngine/trustedSourceDiscovery";
import {
  loadResearchPackage,
  saveResearchPackage,
} from "@/lib/admin/researchReview/packageStore";
import { runCompletenessPipeline } from "@/lib/ai/research/completenessPipeline";
import { UNKNOWN_SENTINEL } from "@/lib/ai/research/completenessTypes";
import type { ResearchPackage } from "@/lib/ai/packages";
import type { AIDraftCategory } from "@/lib/ai/types";

export function attachEditorialOverride(
  packageId: string,
  comment: string,
  action: "continue_anyway" | "rerun_guidance",
): ResearchPackage {
  const pkg = loadResearchPackage(packageId);
  if (!pkg) {
    throw new Error(`attachEditorialOverride: package not found: ${packageId}`);
  }
  const trimmed = comment.trim();
  if (!trimmed) {
    throw new Error("Editor comment is required.");
  }
  const next: ResearchPackage = {
    ...pkg,
    editorialOverride: {
      comment: trimmed,
      appliedAt: new Date().toISOString(),
      action,
    },
  };
  return saveResearchPackage(next);
}

/**
 * Continue despite required gaps: Unknown (not fabricated) + preserved guidance.
 */
export function continueAnywayWithUnknowns(
  packageId: string,
  comment: string,
): ResearchPackage {
  const pkg = loadResearchPackage(packageId);
  if (!pkg) {
    throw new Error(`continueAnywayWithUnknowns: package not found: ${packageId}`);
  }
  const trimmed = comment.trim();
  if (!trimmed) {
    throw new Error("Editor comment is required.");
  }

  const directives = parseEditorInstructions({
    text: trimmed,
    topicFallback: pkg.topic || pkg.title,
  });
  const categoryFromGuidance =
    directives.categoryHint ?? categoryHintFromGuidance(trimmed);
  let next: ResearchPackage = {
    ...pkg,
    categoryRecommendation:
      pkg.categoryRecommendation ??
      categoryFromGuidance ??
      pkg.categoryRecommendation,
    categoryReasoning: categoryFromGuidance
      ? `Category from editor instruction directives: ${categoryFromGuidance}`
      : pkg.categoryReasoning,
    summary:
      !pkg.summary.trim() || pkg.summary.trim() === UNKNOWN_SENTINEL
        ? UNKNOWN_SENTINEL
        : pkg.summary,
    origin: pkg.origin.trim() ? pkg.origin : UNKNOWN_SENTINEL,
    culturalImpact: pkg.culturalImpact.trim()
      ? pkg.culturalImpact
      : UNKNOWN_SENTINEL,
    editorialOverride: {
      // Keep for admin audit — draft generation must not use as prose seed
      comment: trimmed,
      appliedAt: new Date().toISOString(),
      action: "continue_anyway",
    },
    researchNotes: [
      ...pkg.researchNotes,
      ...directives.researchNotes,
      "Missing required fields recorded as Unknown — not fabricated.",
    ],
  };

  // Ensure at least identity fields for draft packaging
  if (!next.title.trim()) next.title = next.topic || "Untitled";
  if (!next.topic.trim()) next.topic = next.title;
  if (!next.slugSuggestion?.trim()) {
    next.slugSuggestion = next.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  if (!next.categoryRecommendation && categoryFromGuidance) {
    next.categoryRecommendation = categoryFromGuidance;
  }
  // Last resort category so draft packaging can proceed under override
  if (!next.categoryRecommendation) {
    next.categoryRecommendation = "meme";
    next.categoryReasoning =
      "Category unset after exhaust-all; defaulted under Continue Anyway for packaging only — verify before publish.";
  }

  next = runCompletenessPipeline(next);
  next = {
    ...next,
    editorialOverride: {
      comment: trimmed,
      appliedAt: new Date().toISOString(),
      action: "continue_anyway",
    },
    summary:
      !next.summary.trim() || next.summary === UNKNOWN_SENTINEL
        ? UNKNOWN_SENTINEL
        : next.summary,
  };

  return saveResearchPackage(next);
}

/**
 * Re-run KE with editor comment as research guidance. Preserves package id.
 * Rebuilds ResearchPackage, recalculates completeness, replaces store entry.
 */
export function rerunResearchWithEditorGuidance(
  packageId: string,
  comment: string,
): ResearchPackage {
  const pkg = loadResearchPackage(packageId);
  if (!pkg) {
    throw new Error(
      `rerunResearchWithEditorGuidance: package not found: ${packageId}`,
    );
  }
  const trimmed = comment.trim();
  if (!trimmed) {
    throw new Error("Editor comment is required.");
  }

  const directives = parseEditorInstructions({
    text: trimmed,
    topicFallback: pkg.topic || pkg.title,
  });
  const categoryHint: AIDraftCategory | undefined =
    directives.categoryHint ??
    categoryHintFromGuidance(trimmed) ??
    pkg.categoryRecommendation;

  const seedUrls = [
    ...pkg.sources.map((s) => s.url).filter((u): u is string => Boolean(u?.trim())),
    ...directives.seedUrls,
    ...discoverTrustedSources({
      topic: pkg.topic || pkg.title,
      categoryHint,
      directives,
      notes: directives.researchNotes.join("; "),
    }).map((d) => d.url),
  ];

  // Only explicit definitional claims — never the raw instruction
  const guidanceSummary = directives.definitionalClaim
    ? summaryFromEditorGuidance(
        pkg.title || pkg.topic,
        directives.definitionalClaim,
      )
    : null;

  const { package: fresh } = runKnowledgeEngine({
    topic: pkg.topic || pkg.title,
    categoryHint,
    directives,
    seedUrls,
  });

  const merged: ResearchPackage = {
    ...fresh,
    id: packageId,
    // Prefer newly grounded summary; claim only if researched summary empty
    summary:
      fresh.summary.trim() && fresh.summary !== UNKNOWN_SENTINEL
        ? fresh.summary
        : guidanceSummary ?? fresh.summary,
    categoryRecommendation:
      fresh.categoryRecommendation ?? categoryHint ?? pkg.categoryRecommendation,
    editorialOverride: {
      comment: trimmed,
      appliedAt: new Date().toISOString(),
      action: "rerun_guidance",
    },
    researchNotes: [
      ...fresh.researchNotes,
      ...directives.researchNotes,
      "Re-ran Knowledge Engine with parsed editor instruction directives.",
    ],
  };

  // Re-seal completeness after merge so Approve state matches package
  const sealed = runCompletenessPipeline(merged);
  const withOverride: ResearchPackage = {
    ...sealed,
    id: packageId,
    editorialOverride: merged.editorialOverride,
    researchNotes: merged.researchNotes,
  };

  return saveResearchPackage(withOverride);
}
