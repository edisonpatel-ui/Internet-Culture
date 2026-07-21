import type { PromptTemplate, ReviewRequest } from "../types";

/**
 * Editorial review prompt template — reusable string only.
 */
export function buildEditorialReviewPrompt(
  request: ReviewRequest,
): PromptTemplate {
  const fieldBlock = request.fields
    ? Object.entries(request.fields)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")
    : "(no structured fields)";

  return {
    id: "editorial.review",
    label: "Editorial Review",
    system: [
      "You are a senior editor reviewing Internet Culture Hub copy.",
      "Check accuracy risks, missing sources, weak structure, misclassification, and tone.",
      "Be specific. Do not rewrite the whole article unless asked.",
      "Every review requires human confirmation before any catalog change.",
    ].join(" "),
    user: [
      `Slug: ${request.slug ?? "(new)"}`,
      `Title: ${request.title}`,
      `Category: ${request.category}`,
      "",
      "Structured fields:",
      fieldBlock,
      "",
      "Prose:",
      request.prose,
      "",
      "Return overall (strong|improve|weak), findings with severity/dimension, and a short summary.",
    ].join("\n"),
  };
}
