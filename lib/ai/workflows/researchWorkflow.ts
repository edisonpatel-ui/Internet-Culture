/**
 * Research workflow — Knowledge Engine entrypoint.
 *
 * Exhausts every research stage before sealing a ResearchPackage.
 * Research Review is verification only — not a research stage.
 * Optional Unknown fields never block article generation.
 * Editor continue_anyway override may proceed despite required gaps.
 */

import type { AIDraftCategory } from "../types";
import type { ResearchPackage } from "../packages";
import type { EditorialState } from "../editorialState";
import type {
  WorkflowDefinitionMeta,
  WorkflowValidationResult,
} from "./workflowTypes";
import { runKnowledgeEngine } from "@/lib/ai/knowledgeEngine";
import { isUnknownSentinel } from "@/lib/ai/research/completenessTypes";

export interface ResearchWorkflowInput {
  topic: string;
  categoryHint?: AIDraftCategory;
  notes?: string;
  seedUrls?: string[];
  updateRequest?: string;
  targetSlug?: string;
}

export interface ResearchWorkflowOutput {
  package: ResearchPackage;
  nextState: Extract<EditorialState, "ResearchComplete">;
  researchFailed: boolean;
}

export const researchWorkflowMeta: WorkflowDefinitionMeta = {
  id: "research",
  label: "Research",
  entryState: "ResearchRequested",
  successState: "ResearchComplete",
  nextWorkflowId: "draft",
};

export function validateResearchWorkflowInput(
  input: ResearchWorkflowInput,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  if (!input.topic.trim()) {
    issues.push({ code: "EMPTY_TOPIC", message: "topic is required" });
  }
  return { ok: issues.length === 0, issues };
}

export function validateResearchPackage(
  pkg: ResearchPackage,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  if (!pkg.id?.trim()) {
    issues.push({ code: "EMPTY_ID", message: "id is required" });
  }
  if (!pkg.title?.trim() && !pkg.topic?.trim()) {
    issues.push({ code: "EMPTY_TITLE", message: "title or topic is required" });
  }
  if (pkg.confidence < 0 || pkg.confidence > 1) {
    issues.push({
      code: "CONFIDENCE_RANGE",
      message: "confidence must be between 0 and 1",
    });
  }
  return { ok: issues.length === 0, issues };
}

/**
 * Draft readiness — REQUIRED fields only.
 * Optional Unknown never fails this gate.
 * Editor continue_anyway override (with comment) may proceed despite required gaps.
 */
export function validateResearchPackageReadyForDraft(
  pkg: ResearchPackage,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  const urlSources = pkg.sources.filter(
    (s) => s.url?.trim() && /^https?:\/\//i.test(s.url.trim()),
  );
  const override =
    pkg.editorialOverride?.action === "continue_anyway" &&
    Boolean(pkg.editorialOverride.comment.trim());

  if (!pkg.title?.trim() && !pkg.topic?.trim()) {
    issues.push({
      code: "NO_ENTITY",
      message: "Canonical entity / title could not be identified.",
    });
  }
  if (!pkg.categoryRecommendation) {
    issues.push({
      code: "NO_CATEGORY",
      message: "Category is required before drafting",
    });
  }
  if (!pkg.slugSuggestion?.trim()) {
    issues.push({
      code: "NO_SLUG",
      message: "Slug is required before drafting",
    });
  }

  if (pkg.completeness?.researchFailed && !override) {
    issues.push({
      code: "RESEARCH_FAILED",
      message:
        "Research Failed: cannot produce the minimum required package. Enter an Editor Comment to re-run or continue anyway.",
    });
  }
  if (pkg.completeness && !pkg.completeness.readyForEditor && !override) {
    issues.push({
      code: "NOT_READY",
      message:
        "Required fields are incomplete. Provide Editor Comment to re-run Knowledge Engine or continue anyway.",
    });
  }
  if (urlSources.length === 0 && !override) {
    issues.push({
      code: "NO_URL_SOURCES",
      message:
        "At least one trustworthy source with a stable http(s) URL is required.",
    });
  }
  if (
    (!pkg.summary.trim() || isUnknownSentinel(pkg.summary)) &&
    !override
  ) {
    issues.push({
      code: "EMPTY_SUMMARY",
      message: "Basic explanation / summary is required before drafting.",
    });
  }

  if (override) {
    const blocking = issues.filter((i) =>
      ["NO_ENTITY", "NO_CATEGORY", "NO_SLUG"].includes(i.code),
    );
    if (blocking.length > 0) {
      return { ok: false, issues: blocking };
    }
    return {
      ok: true,
      issues: [
        {
          code: "EDITOR_OVERRIDE",
          message: `Continuing with editor guidance: ${pkg.editorialOverride!.comment.trim()}`,
        },
      ],
    };
  }

  return { ok: issues.length === 0, issues };
}

export const researchWorkflowNextStage = "draft" as const;

export function runResearchWorkflow(
  input: ResearchWorkflowInput,
): ResearchWorkflowOutput {
  const validation = validateResearchWorkflowInput(input);
  if (!validation.ok) {
    throw new Error(
      `runResearchWorkflow: invalid input — ${validation.issues.map((i) => i.message).join("; ")}`,
    );
  }

  const { package: pkg } = runKnowledgeEngine({
    topic: input.topic.trim(),
    categoryHint: input.categoryHint,
    notes: input.notes,
    seedUrls: input.seedUrls,
    updateRequest: input.updateRequest,
    targetSlug: input.targetSlug,
  });

  const pkgValidation = validateResearchPackage(pkg);
  if (!pkgValidation.ok) {
    throw new Error(
      `runResearchWorkflow: invalid package structure — ${pkgValidation.issues.map((i) => i.message).join("; ")}`,
    );
  }

  return {
    package: pkg,
    nextState: "ResearchComplete",
    researchFailed: Boolean(pkg.completeness?.researchFailed),
  };
}
