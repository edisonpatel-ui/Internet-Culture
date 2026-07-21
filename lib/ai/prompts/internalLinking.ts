import type { PromptTemplate } from "../types";

export interface InternalLinkingPromptInput {
  slug: string;
  title: string;
  category: string;
  /** Candidate slugs already in the catalog. */
  candidateSlugs: string[];
  /** Existing relatedSlugs / relationships, if any. */
  existingLinks?: string[];
}

/**
 * Internal linking prompt template — reusable string only.
 */
export function buildInternalLinkingPrompt(
  input: InternalLinkingPromptInput,
): PromptTemplate {
  return {
    id: "editorial.internal-linking",
    label: "Internal Linking",
    system: [
      "You suggest cultural internal links for Internet Culture Hub.",
      "Prefer typed relationships (same era, inspired, related event) over random similarity.",
      "Only suggest slugs from the provided candidate list. Never invent slugs.",
      "Human editors must verify every suggestion before writing to content files.",
    ].join(" "),
    user: [
      `Entry: ${input.title} (${input.slug})`,
      `Category: ${input.category}`,
      `Existing links: ${(input.existingLinks ?? []).join(", ") || "(none)"}`,
      `Candidates:\n${input.candidateSlugs.map((s) => `- ${s}`).join("\n") || "(none)"}`,
      "",
      "Suggest related slugs with a one-line cultural reason each. Cap at 8.",
    ].join("\n"),
  };
}
