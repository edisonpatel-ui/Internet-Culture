/**
 * Draft workflow (RC3-B).
 *
 * Role: map ApprovedResearch into a structured DraftPackage.
 * Runtime mock path: lib/admin/draftGeneration/fromApprovedResearch.ts
 * This runner stays provider-unwired.
 *
 * Lifecycle: ResearchComplete → DraftGenerated → HumanEditing
 */

import type { AIDraftCategory } from "../types";
import type { DraftPackage, ResearchPackage } from "../packages";
import type { EditorialState } from "../editorialState";
import type {
  WorkflowDefinitionMeta,
  WorkflowValidationResult,
} from "./workflowTypes";

export interface DraftWorkflowInput {
  topic: string;
  category: AIDraftCategory;
  research: ResearchPackage;
  relatedSlugHints?: string[];
  editorBrief?: string;
}

export interface DraftWorkflowOutput {
  package: DraftPackage;
  nextState: Extract<EditorialState, "DraftGenerated">;
}

export const draftWorkflowMeta: WorkflowDefinitionMeta = {
  id: "draft",
  label: "Draft",
  entryState: "ResearchComplete",
  successState: "DraftGenerated",
  nextWorkflowId: "review",
};

export function validateDraftWorkflowInput(
  input: DraftWorkflowInput,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  if (!input.topic.trim()) {
    issues.push({ code: "EMPTY_TOPIC", message: "topic is required" });
  }
  if (!input.research.summary.trim()) {
    issues.push({
      code: "EMPTY_RESEARCH",
      message: "research.summary is required to ground a draft",
    });
  }
  return { ok: issues.length === 0, issues };
}

export function validateDraftPackage(
  pkg: DraftPackage,
): WorkflowValidationResult {
  const issues: WorkflowValidationResult["issues"] = [];
  if (!pkg.id?.trim()) {
    issues.push({ code: "EMPTY_ID", message: "id is required" });
  }
  if (!pkg.title.trim()) {
    issues.push({ code: "EMPTY_TITLE", message: "title is required" });
  }
  if (!pkg.slugSuggestion.trim()) {
    issues.push({
      code: "EMPTY_SLUG",
      message: "slugSuggestion is required",
    });
  }
  if (!pkg.summary.trim()) {
    issues.push({ code: "EMPTY_SUMMARY", message: "summary is required" });
  }
  if (!pkg.lead?.trim() && !pkg.summary.trim()) {
    issues.push({ code: "EMPTY_LEAD", message: "lead or summary is required" });
  }
  if (!pkg.articleSections?.length) {
    issues.push({
      code: "EMPTY_SECTIONS",
      message: "articleSections should include a complete article body",
    });
  }
  return { ok: issues.length === 0, issues };
}

export const draftWorkflowNextStage = "review" as const;

/**
 * Execute draft workflow — not implemented (no provider calls).
 */
export function runDraftWorkflow(
  _input: DraftWorkflowInput,
): DraftWorkflowOutput {
  throw new Error("runDraftWorkflow: Not implemented.");
}
