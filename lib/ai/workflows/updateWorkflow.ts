/**
 * Update workflow (RC3-B).
 *
 * Role: compare an {@link ExistingArticleSnapshot} to a new
 * {@link ResearchPackage} and produce an {@link UpdatePackage}.
 *
 * Lifecycle position: Published → NeedsUpdate → **Update / Research** → Revision
 */

import type {
  ExistingArticleSnapshot,
  ResearchPackage,
  UpdatePackage,
} from "../packages";
import type { EditorialState } from "../editorialState";
import type {
  WorkflowDefinitionMeta,
  WorkflowValidationResult,
} from "./workflowTypes";

export interface UpdateWorkflowInput {
  existing: ExistingArticleSnapshot;
  newResearch: ResearchPackage;
}

export interface UpdateWorkflowOutput {
  package: UpdatePackage;
  nextState: Extract<EditorialState, "NeedsUpdate" | "ResearchRequested">;
}

export const updateWorkflowMeta: WorkflowDefinitionMeta = {
  id: "update",
  label: "Update Detection",
  entryState: "Published",
  successState: "NeedsUpdate",
  nextWorkflowId: "research",
};

export function validateUpdateWorkflowInput(
  input: UpdateWorkflowInput,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  if (!input.existing.slug.trim()) {
    issues.push({ code: "EMPTY_SLUG", message: "existing.slug is required" });
  }
  if (!input.newResearch.summary.trim()) {
    issues.push({
      code: "EMPTY_RESEARCH",
      message: "newResearch.summary is required",
    });
  }
  return { ok: issues.length === 0, issues };
}

export function validateUpdatePackage(
  pkg: UpdatePackage,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  if (!pkg.humanReviewRequired) {
    issues.push({
      code: "HUMAN_REVIEW_FLAG",
      message: "humanReviewRequired must be true",
    });
  }
  if (pkg.confidence < 0 || pkg.confidence > 1) {
    issues.push({
      code: "CONFIDENCE_RANGE",
      message: "confidence must be between 0 and 1",
    });
  }
  return { ok: issues.length === 0, issues };
}

export const updateWorkflowNextStage = "research" as const;

/**
 * Execute update workflow — not implemented (no provider calls).
 */
export function runUpdateWorkflow(
  _input: UpdateWorkflowInput,
): UpdateWorkflowOutput {
  throw new Error("runUpdateWorkflow: Not implemented.");
}
