/**
 * Shared visual tokens for the Research Workspace (RC4-D).
 * Professional editorial UI — Linear / Notion / Stripe-adjacent.
 */

import type { ResearchPriority, ResearchSessionStatus } from "@/types/admin";
import type { EditorialState } from "@/lib/ai/editorialState";
import type { FactConfidenceLabel } from "@/lib/ai/intelligence/factConfidence";

export function statusChipClass(status: ResearchSessionStatus): string {
  switch (status) {
    case "active":
      return "border-emerald-800/60 bg-emerald-950/40 text-emerald-300";
    case "paused":
      return "border-amber-800/50 bg-amber-950/30 text-amber-200/90";
    case "ready_for_draft":
      return "border-sky-800/60 bg-sky-950/40 text-sky-300";
    case "archived":
      return "border-zinc-700 bg-zinc-900 text-zinc-500";
    default:
      return "border-zinc-700 bg-zinc-900 text-zinc-400";
  }
}

export function priorityChipClass(priority: ResearchPriority): string {
  switch (priority) {
    case "critical":
      return "border-red-800/60 bg-red-950/40 text-red-300";
    case "high":
      return "border-orange-800/50 bg-orange-950/30 text-orange-200";
    case "medium":
      return "border-zinc-600 bg-zinc-900 text-zinc-300";
    case "low":
      return "border-zinc-700 bg-zinc-950 text-zinc-500";
    default:
      return "border-zinc-700 bg-zinc-900 text-zinc-400";
  }
}

export function confidenceChipClass(label: FactConfidenceLabel): string {
  switch (label) {
    case "Very High":
    case "High":
      return "border-emerald-800/50 bg-emerald-950/30 text-emerald-300";
    case "Medium":
      return "border-sky-800/50 bg-sky-950/30 text-sky-300";
    case "Low":
    case "Very Low":
      return "border-amber-800/40 bg-amber-950/20 text-amber-200/90";
    default:
      return "border-zinc-700 bg-zinc-900 text-zinc-500";
  }
}

export function formatWorkflowStage(stage: EditorialState): string {
  return stage.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function formatLabel(value: string): string {
  return value.replace(/_/g, " ");
}

export const WORKSPACE_STAGES: EditorialState[] = [
  "ResearchRequested",
  "ResearchComplete",
  "DraftGenerated",
  "HumanEditing",
  "EditorialReview",
  "SEOReview",
  "Approved",
  "Published",
  "NeedsUpdate",
  "Archived",
];

export const WORKSPACE_PRIORITIES: ResearchPriority[] = [
  "critical",
  "high",
  "medium",
  "low",
];

export const WORKSPACE_STATUSES: ResearchSessionStatus[] = [
  "active",
  "paused",
  "ready_for_draft",
  "archived",
];
