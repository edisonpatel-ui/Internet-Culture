import type { ReactNode } from "react";
import {
  confidenceChipClass,
  formatLabel,
  formatWorkflowStage,
  priorityChipClass,
  statusChipClass,
} from "./workspaceTokens";
import type { ResearchPriority, ResearchSessionStatus } from "@/types/admin";
import type { EditorialState } from "@/lib/ai/editorialState";
import type { FactConfidenceLabel } from "@/lib/ai/intelligence/factConfidence";

export function StatusChip({ status }: { status: ResearchSessionStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium capitalize ${statusChipClass(status)}`}
    >
      {formatLabel(status)}
    </span>
  );
}

export function PriorityChip({ priority }: { priority: ResearchPriority }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium capitalize ${priorityChipClass(priority)}`}
    >
      {priority}
    </span>
  );
}

export function WorkflowChip({ stage }: { stage: EditorialState }) {
  return (
    <span className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
      {formatWorkflowStage(stage)}
    </span>
  );
}

export function ConfidenceChip({ label }: { label: FactConfidenceLabel }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${confidenceChipClass(label)}`}
    >
      {label}
    </span>
  );
}

export function MetaChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[11px] text-zinc-500">
      {children}
    </span>
  );
}
