/**
 * Update workflow — compare live article vs scoped Knowledge Engine research.
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
  /** Editor-requested change (scoped research focus). */
  request?: string;
}

export interface UpdateWorkflowOutput {
  package: UpdatePackage;
  nextState: Extract<EditorialState, "NeedsUpdate" | "ResearchRequested">;
}

export const updateWorkflowMeta: WorkflowDefinitionMeta = {
  id: "update",
  label: "Published Article Update",
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
  if (!input.newResearch.id?.trim()) {
    issues.push({
      code: "EMPTY_RESEARCH",
      message: "newResearch.id is required",
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
 * Compare existing published article to new scoped research.
 */
export function runUpdateWorkflow(
  input: UpdateWorkflowInput,
): UpdateWorkflowOutput {
  const validation = validateUpdateWorkflowInput(input);
  if (!validation.ok) {
    throw new Error(
      `runUpdateWorkflow: invalid input — ${validation.issues.map((i) => i.message).join("; ")}`,
    );
  }

  const { existing, newResearch, request } = input;
  const changedFacts: string[] = [];
  const outdatedSections: string[] = [];

  if (
    newResearch.summary.trim() &&
    newResearch.summary.trim() !== existing.description.trim()
  ) {
    changedFacts.push("description/summary");
    outdatedSections.push("description");
  }
  if (
    newResearch.origin.trim() &&
    newResearch.origin.trim() !== (existing.fields.origin ?? "").trim()
  ) {
    changedFacts.push("origin");
    outdatedSections.push("origin");
  }
  if (newResearch.timeline.length > 0) {
    const liveTimeline = existing.fields.timeline ?? "";
    const nextTimeline = newResearch.timeline
      .map((t) => `${t.when}: ${t.what}`)
      .join("\n");
    if (nextTimeline !== liveTimeline) {
      changedFacts.push("timeline");
      outdatedSections.push("timeline");
    }
  }

  const newAliases = newResearch.aliases.filter(
    (a) =>
      !existing.aliases?.some(
        (e) => e.toLowerCase() === a.toLowerCase(),
      ) && a.toLowerCase() !== existing.title.toLowerCase(),
  );

  const newMemes = newResearch.relatedEntries
    .map((r) => r.slug ?? r.title)
    .filter(
      (s) =>
        s &&
        !(existing.relatedSlugs ?? []).includes(s) &&
        s !== existing.slug,
    );

  const newEvents = newResearch.notableMoments.slice(0, 5);

  if (request?.trim()) {
    changedFacts.unshift(`Requested: ${request.trim()}`);
  }

  const pkg: UpdatePackage = {
    slug: existing.slug,
    title: existing.title,
    category: existing.category,
    newResearch,
    changedFacts:
      changedFacts.length > 0
        ? changedFacts
        : [
            "Scoped update instruction recorded (research directives only — not article text).",
          ],
    outdatedSections,
    newEvents,
    newMemes,
    newAliases,
    suggestedScoreUpdates: existing.scores ?? {
      relevance: 50,
      cringe: 25,
      brainrot: 30,
    },
    confidence: newResearch.completeness?.readyForEditor
      ? Math.max(0.55, newResearch.confidence)
      : Math.min(0.5, newResearch.confidence),
    humanReviewRequired: true,
    // Admin package summary — never copy the instruction as encyclopedia prose
    summary: `Update proposal for ${existing.title} based on scoped Knowledge Engine research.`,
    editorNotes: [
      "Update Preview is verification — Knowledge Engine already exhausted research stages.",
      ...(request
        ? [`Editor instruction (internal, not article text): ${request.slice(0, 200)}`]
        : []),
    ],
  };

  const pkgValidation = validateUpdatePackage(pkg);
  if (!pkgValidation.ok) {
    throw new Error(
      `runUpdateWorkflow: invalid package — ${pkgValidation.issues.map((i) => i.message).join("; ")}`,
    );
  }

  return {
    package: pkg,
    nextState: "NeedsUpdate",
  };
}
