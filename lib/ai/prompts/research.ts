import type { PromptTemplate, ResearchRequest } from "../types";

/**
 * Research prompt template — reusable string only.
 * Does not call providers or the network.
 */
export function buildResearchPrompt(request: ResearchRequest): PromptTemplate {
  const seeds =
    request.seedUrls && request.seedUrls.length > 0
      ? request.seedUrls.map((u) => `- ${u}`).join("\n")
      : "(none provided)";

  return {
    id: "editorial.research",
    label: "Research",
    system: [
      "You are a research assistant for Internet Culture Hub, a curated encyclopedia.",
      "Prioritize verifiable sources (Know Your Meme, Wikipedia, reputable reporting).",
      "Never invent origin dates, creators, or statistics.",
      "Flag uncertainty. Output structured research notes for a human editor — not a publishable article.",
    ].join(" "),
    user: [
      `Topic: ${request.topic}`,
      `Category hint: ${request.categoryHint ?? "unknown"}`,
      `Editor notes: ${request.notes ?? "(none)"}`,
      `Seed URLs:\n${seeds}`,
      "",
      "Provide: one-sentence definition, origin summary (only if supportable),",
      "what it is NOT, candidate sources, open questions, and confidence 0–1.",
    ].join("\n"),
  };
}
