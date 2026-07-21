import type { PromptTemplate, SEORequest } from "../types";

/**
 * SEO review prompt template — reusable string only.
 * Does not mutate metadata; suggestions only.
 */
export function buildSeoReviewPrompt(request: SEORequest): PromptTemplate {
  return {
    id: "editorial.seo-review",
    label: "SEO Review",
    system: [
      "You review encyclopedia entry SEO for Internet Culture Hub.",
      "Prefer clear titles and descriptions over clickbait.",
      "Respect category-native URLs. Do not invent keywords the topic does not support.",
      "Flag risks (duplicate intent, vague descriptions, slug mismatch).",
    ].join(" "),
    user: [
      `Title: ${request.title}`,
      `Slug: ${request.slug}`,
      `Category: ${request.category}`,
      `Description: ${request.description}`,
      `Lead: ${request.lead ?? "(none)"}`,
      "",
      "Provide feedback on title, description, slug; optional suggested description;",
      "keyword notes; and risks.",
    ].join("\n"),
  };
}
