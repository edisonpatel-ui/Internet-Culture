/**
 * Contradiction analysis — preserve uncertainty (RC3-C).
 *
 * Records conflicts instead of inventing resolutions.
 */

export type ContradictionKind =
  | "conflicting_dates"
  | "conflicting_creators"
  | "conflicting_origins"
  | "disputed_terminology"
  | "uncertain_timeline"
  | "missing_evidence"
  | "other";

export interface ContradictionClaim {
  statement: string;
  sourceTitle?: string;
  sourceUrl?: string;
}

export interface ContradictionRecord {
  id: string;
  kind: ContradictionKind;
  /** Short label for editors. */
  summary: string;
  claims: ContradictionClaim[];
  /** What a human should do next — not an auto-resolution. */
  editorGuidance: string;
  /** Always keep unresolved until a human decides. */
  resolved: false;
}

export interface ContradictionAnalysisResult {
  records: ContradictionRecord[];
  /** True when any unresolved conflict blocks confident drafting of that claim. */
  hasBlockingConflicts: boolean;
  notes: string[];
}

/**
 * Build an analysis envelope from editor/model-supplied records.
 * Pure assembly — does not invent contradictions.
 */
export function buildContradictionAnalysis(
  records: ContradictionRecord[],
  notes: string[] = [],
): ContradictionAnalysisResult {
  return {
    records,
    hasBlockingConflicts: records.some(
      (r) =>
        r.kind === "conflicting_dates" ||
        r.kind === "conflicting_creators" ||
        r.kind === "conflicting_origins" ||
        r.kind === "missing_evidence",
    ),
    notes,
  };
}

export function createContradictionRecord(
  partial: Omit<ContradictionRecord, "resolved">,
): ContradictionRecord {
  return { ...partial, resolved: false };
}
