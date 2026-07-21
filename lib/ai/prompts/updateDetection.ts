import type { PromptTemplate } from "../types";

export interface UpdateDetectionPromptInput {
  slug: string;
  title: string;
  category: string;
  /** Current public description or lead. */
  currentSummary: string;
  /** Optional lastUpdated ISO date. */
  lastUpdated?: string;
  /** Editor question or known change rumor. */
  changeHint?: string;
}

/**
 * Update detection prompt template — reusable string only.
 * Suggests whether an entry may need an editorial refresh — never auto-edits.
 */
export function buildUpdateDetectionPrompt(
  input: UpdateDetectionPromptInput,
): PromptTemplate {
  return {
    id: "editorial.update-detection",
    label: "Update Detection",
    system: [
      "You assess whether an encyclopedia entry may need a human refresh.",
      "Do not invent news. Prefer asking for sources over asserting new facts.",
      "Recommend update only when cultural status, definition, or notable events likely changed.",
    ].join(" "),
    user: [
      `Entry: ${input.title} (${input.slug})`,
      `Category: ${input.category}`,
      `Last updated: ${input.lastUpdated ?? "unknown"}`,
      `Change hint: ${input.changeHint ?? "(none)"}`,
      "",
      "Current summary:",
      input.currentSummary,
      "",
      "Say: needs_update | monitor | stable — with reasons and questions for an editor.",
    ].join("\n"),
  };
}
