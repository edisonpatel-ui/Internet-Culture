/**
 * Editorial review workflow (RC3-B).
 *
 * Role: evaluate draft or human-edited prose against teach-first / style-guide
 * standards. Outputs {@link ReviewPackage} recommendations only — never rewrites.
 *
 * Lifecycle position: Human Editing → **Editorial Review** → SEO Review
 */

import type { AIDraftCategory } from "../types";
import type { DraftPackage, ReviewPackage } from "../packages";
import type { EditorialState } from "../editorialState";
import type {
  WorkflowDefinitionMeta,
  WorkflowValidationResult,
} from "./workflowTypes";

export interface ReviewWorkflowInput {
  title: string;
  category: AIDraftCategory;
  slug?: string;
  /** Flattened prose or field map for review. */
  prose: string;
  fields?: Record<string, string>;
  /** Optional structured draft under review. */
  draft?: DraftPackage;
}

export interface ReviewWorkflowOutput {
  package: ReviewPackage;
  nextState: Extract<EditorialState, "EditorialReview">;
}

export const reviewWorkflowMeta: WorkflowDefinitionMeta = {
  id: "review",
  label: "Editorial Review",
  entryState: "HumanEditing",
  successState: "EditorialReview",
  nextWorkflowId: "seo",
};

export function validateReviewWorkflowInput(
  input: ReviewWorkflowInput,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  if (!input.title.trim()) {
    issues.push({ code: "EMPTY_TITLE", message: "title is required" });
  }
  if (!input.prose.trim() && !input.draft) {
    issues.push({
      code: "EMPTY_PROSE",
      message: "prose or draft package is required",
    });
  }
  return { ok: issues.length === 0, issues };
}

export function validateReviewPackage(
  pkg: ReviewPackage,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  if (!pkg.requiresHumanReview) {
    issues.push({
      code: "HUMAN_REVIEW_FLAG",
      message: "requiresHumanReview must be true",
    });
  }
  return { ok: issues.length === 0, issues };
}

export const reviewWorkflowNextStage = "seo" as const;

/**
 * Execute editorial review workflow — not implemented (no provider calls).
 */
export function runReviewWorkflow(
  _input: ReviewWorkflowInput,
): ReviewWorkflowOutput {
  throw new Error("runReviewWorkflow: Not implemented.");
}
