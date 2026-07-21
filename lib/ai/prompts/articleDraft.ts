import type { DraftRequest, PromptTemplate } from "../types";

/**
 * Article draft prompt template — reusable string only.
 * Teach-first encyclopedia prose; never auto-publish.
 */
export function buildArticleDraftPrompt(request: DraftRequest): PromptTemplate {
  const related =
    request.relatedSlugHints && request.relatedSlugHints.length > 0
      ? request.relatedSlugHints.join(", ")
      : "(none)";

  const researchBlock = request.research
    ? [
        "Research brief:",
        request.research.definition,
        request.research.originSummary,
        `Not this: ${request.research.notThis.join("; ") || "(none)"}`,
      ].join("\n")
    : `Brief:\n${request.brief}`;

  return {
    id: "editorial.article-draft",
    label: "Article Draft",
    system: [
      "You draft encyclopedia entries for Internet Culture Hub.",
      "Write so a curious teenager understands the first two sentences.",
      "Answer: what it is, why people cared, why it spread, why it is remembered, influence if supportable.",
      "Do not invent facts. Prefer plain language over hype. Never claim scores or view counts.",
    ].join(" "),
    user: [
      `Title/topic: ${request.topic}`,
      `Category: ${request.category}`,
      `Related slug hints: ${related}`,
      "",
      researchBlock,
      "",
      "Draft: title, slug suggestion, short description, category fields,",
      "related slug suggestions, and source suggestions for human verification.",
    ].join("\n"),
  };
}
