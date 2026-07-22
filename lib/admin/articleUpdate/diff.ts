/**
 * Diff published snapshot vs proposed update fields for preview highlighting.
 */

export interface FieldDiff {
  field: string;
  label: string;
  before: string;
  after: string;
  changed: boolean;
}

export function buildFieldDiffs(
  before: Record<string, string>,
  after: Record<string, string>,
): FieldDiff[] {
  const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
  const labels: Record<string, string> = {
    description: "Description",
    origin: "Origin",
    meaning: "Meaning",
    definition: "Definition",
    impact: "Impact",
    timeline: "Timeline",
    summary: "Summary",
    culturalSignificance: "Cultural significance",
  };

  return keys.map((field) => {
    const b = (before[field] ?? "").trim();
    const a = (after[field] ?? "").trim();
    return {
      field,
      label: labels[field] ?? field,
      before: b,
      after: a,
      changed: b !== a && (b.length > 0 || a.length > 0),
    };
  });
}
