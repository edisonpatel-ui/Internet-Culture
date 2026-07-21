/**
 * Research workflow (RC3-B).
 *
 * Role: turn an idea / brief into a {@link ResearchPackage} for drafting.
 * Does not call AI providers. Does not write content files.
 *
 * Lifecycle position: Idea → **Research** → Draft
 */

import type { AIDraftCategory } from "../types";
import type { ResearchPackage } from "../packages";
import type { EditorialState } from "../editorialState";
import type {
  WorkflowDefinitionMeta,
  WorkflowValidationResult,
} from "./workflowTypes";

export interface ResearchWorkflowInput {
  topic: string;
  categoryHint?: AIDraftCategory;
  notes?: string;
  seedUrls?: string[];
}

export interface ResearchWorkflowOutput {
  package: ResearchPackage;
  /** State after research completes. */
  nextState: Extract<EditorialState, "ResearchComplete">;
}

export const researchWorkflowMeta: WorkflowDefinitionMeta = {
  id: "research",
  label: "Research",
  entryState: "ResearchRequested",
  successState: "ResearchComplete",
  nextWorkflowId: "draft",
};

/**
 * Soft validation hooks — structure checks only (no network).
 */
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
  if (!pkg.summary.trim()) {
    issues.push({ code: "EMPTY_SUMMARY", message: "summary is required" });
  }
  if (pkg.confidence < 0 || pkg.confidence > 1) {
    issues.push({
      code: "CONFIDENCE_RANGE",
      message: "confidence must be between 0 and 1",
    });
  }
  if (pkg.primarySources.length === 0 && pkg.secondarySources.length === 0) {
    issues.push({
      code: "NO_SOURCES",
      message: "at least one source candidate is expected before drafting",
    });
  }
  return { ok: issues.length === 0, issues };
}

/** Next workflow stage after research. */
export const researchWorkflowNextStage = "draft" as const;

/**
 * Execute research workflow — not implemented (no provider calls).
 */
export function runResearchWorkflow(
  _input: ResearchWorkflowInput,
): ResearchWorkflowOutput {
  throw new Error("runResearchWorkflow: Not implemented.");
}
