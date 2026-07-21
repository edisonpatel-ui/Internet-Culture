/**
 * Draft workflow (RC3-B).
 *
 * Role: map an approved {@link ResearchPackage} into a structured
 * {@link DraftPackage} (field-level proposals, not markdown).
 *
 * Lifecycle position: Research → **Draft** → Human Editing
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
