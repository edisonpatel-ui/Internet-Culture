/**
 * Research workflow (RC3-B) — completeness-first mock implementation.
 *
 * Role: turn an idea / brief into a complete {@link ResearchPackage}.
 * Does not call real AI providers. Does not write content files.
 */

import type { AIDraftCategory } from "../types";
import type { ResearchPackage } from "../packages";
import type { EditorialState } from "../editorialState";
import type {
  WorkflowDefinitionMeta,
  WorkflowValidationResult,
} from "./workflowTypes";
import { buildResearchReport } from "@/lib/admin/research/intelligence";
import { researchReportToPackage } from "../packages/fromResearchReport";

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
  if (!pkg.id?.trim()) {
    issues.push({ code: "EMPTY_ID", message: "id is required" });
  }
  if (!pkg.title?.trim() && !pkg.topic?.trim()) {
    issues.push({ code: "EMPTY_TITLE", message: "title or topic is required" });
  }
  if (!pkg.summary.trim()) {
    issues.push({ code: "EMPTY_SUMMARY", message: "summary is required" });
  }
  if (!pkg.origin.trim()) {
    issues.push({ code: "EMPTY_ORIGIN", message: "origin is required" });
  }
  if (pkg.timeline.length < 2) {
    issues.push({
      code: "THIN_TIMELINE",
      message: "timeline should include multiple milestones before editor review",
    });
  }
  if (!pkg.categoryRecommendation) {
    issues.push({
      code: "NO_CATEGORY",
      message: "categoryRecommendation is expected before drafting",
    });
  }
  if (!pkg.slugSuggestion?.trim()) {
    issues.push({
      code: "NO_SLUG",
      message: "slugSuggestion is expected before drafting",
    });
  }
  if (pkg.confidence < 0 || pkg.confidence > 1) {
    issues.push({
      code: "CONFIDENCE_RANGE",
      message: "confidence must be between 0 and 1",
    });
  }
  if (pkg.sources.length === 0) {
    issues.push({
      code: "NO_SOURCES",
      message: "at least one source candidate is expected before drafting",
    });
  }
  if (pkg.completeness && !pkg.completeness.readyForEditor) {
    issues.push({
      code: "NOT_COMPLETE",
      message: "completeness pipeline has not marked this package ready for editor review",
    });
  }
  return { ok: issues.length === 0, issues };
}

/** Next workflow stage after research. */
export const researchWorkflowNextStage = "draft" as const;

/**
 * Execute mock research workflow with completeness-first passes.
 */
export function runResearchWorkflow(
  input: ResearchWorkflowInput,
): ResearchWorkflowOutput {
  const validation = validateResearchWorkflowInput(input);
  if (!validation.ok) {
    throw new Error(
      `runResearchWorkflow: invalid input — ${validation.issues.map((i) => i.message).join("; ")}`,
    );
  }

  const { report } = buildResearchReport({
    topic: input.topic.trim(),
    notes: input.notes,
    tags: input.categoryHint ? [input.categoryHint] : undefined,
    seedSources: input.seedUrls?.map((url) => ({ title: url, url })),
  });

  const pkg = researchReportToPackage(report, {
    packageId: `rp_wf_${report.id}`,
    session: input.categoryHint
      ? {
          id: report.id,
          topic: input.topic.trim(),
          tags: [input.categoryHint],
          sources: [],
          notes: input.notes ?? "",
        }
      : undefined,
  });

  const pkgValidation = validateResearchPackage(pkg);
  if (!pkgValidation.ok) {
    throw new Error(
      `runResearchWorkflow: incomplete package — ${pkgValidation.issues.map((i) => i.message).join("; ")}`,
    );
  }

  return {
    package: pkg,
    nextState: "ResearchComplete",
  };
}
