/**
 * Ensure DraftPackage has visitor-facing article fields (backward-compatible).
 */

import type { DraftPackage } from "@/lib/ai/packages";

export function normalizeDraftPackage(draft: DraftPackage): DraftPackage {
  const lead = draft.lead?.trim() || draft.summary;
  let articleSections = draft.articleSections ?? [];

  if (articleSections.length === 0) {
    articleSections = [
      {
        id: "what-it-is",
        heading: "What it is",
        body: draft.summary,
      },
      {
        id: "origin",
        heading: "Origin",
        body: draft.origin,
      },
      {
        id: "history",
        heading: "History",
        body: draft.history || "Timeline details are pending.",
      },
      {
        id: "cultural-impact",
        heading: "Cultural impact",
        body: draft.culturalSignificance,
      },
    ].filter((s) => s.body.trim().length > 0);
  }

  return {
    ...draft,
    lead,
    articleSections,
    feedbackHistory: draft.feedbackHistory ?? [],
    revision: draft.revision ?? 0,
  };
}
