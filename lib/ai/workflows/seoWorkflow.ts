/**
 * SEO review workflow (RC3-B).
 *
 * Role: produce {@link SeoReviewPackage} recommendations for title, slug,
 * meta description, linking, and schema — never mutates public metadata.
 *
 * Lifecycle position: Editorial Review → **SEO Review** → Validation → Approval
 */

import type { AIDraftCategory } from "../types";
import type { SeoReviewPackage } from "../packages";
import type { EditorialState } from "../editorialState";
import type {
  WorkflowDefinitionMeta,
  WorkflowValidationResult,
} from "./workflowTypes";

export interface SeoWorkflowInput {
  title: string;
  slug: string;
  category: AIDraftCategory;
  description: string;
  lead?: string;
  relatedSlugHints?: string[];
}

export interface SeoWorkflowOutput {
  package: SeoReviewPackage;
  nextState: Extract<EditorialState, "SEOReview">;
}

export const seoWorkflowMeta: WorkflowDefinitionMeta = {
  id: "seo",
  label: "SEO Review",
  entryState: "EditorialReview",
  successState: "SEOReview",
  nextWorkflowId: null,
};

export function validateSeoWorkflowInput(
  input: SeoWorkflowInput,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  if (!input.title.trim()) {
    issues.push({ code: "EMPTY_TITLE", message: "title is required" });
  }
  if (!input.slug.trim()) {
    issues.push({ code: "EMPTY_SLUG", message: "slug is required" });
  }
  if (!input.description.trim()) {
    issues.push({
      code: "EMPTY_DESCRIPTION",
      message: "description is required",
    });
  }
  return { ok: issues.length === 0, issues };
}

export function validateSeoReviewPackage(
  pkg: SeoReviewPackage,
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

/** After SEO: human validation / approval — not another AI workflow module. */
export const seoWorkflowNextStage = "validation" as const;

/**
 * Execute SEO review workflow — not implemented (no provider calls).
 */
export function runSeoWorkflow(_input: SeoWorkflowInput): SeoWorkflowOutput {
  throw new Error("runSeoWorkflow: Not implemented.");
}
