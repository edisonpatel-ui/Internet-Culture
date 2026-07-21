/**
 * Review pipeline (RC3-A foundation — not wired).
 *
 * Intended workflow (future):
 * 1. Load draft or existing entry prose (editor-supplied).
 * 2. Run `buildEditorialReviewPrompt` + optional `buildSeoReviewPrompt`.
 * 3. Call `AIProvider.review` / `AIProvider.seo`.
 * 4. Optionally queue linking / media / update-detection prompt passes.
 * 5. Return findings with `requiresHumanReview: true` — never auto-merge.
 *
 * Guarantees:
 * - Does not call providers in RC3-A.
 * - Does not mutate catalog scores, media `verified`, or relatedSlugs.
 * - Complements (does not replace) `npm run validate` / editorial audits.
 */
export function reviewPipeline(): never {
  throw new Error("reviewPipeline: Not implemented.");
}
