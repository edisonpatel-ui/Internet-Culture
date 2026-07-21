/**
 * Research pipeline (RC3-A foundation — not wired).
 *
 * Intended workflow (future):
 * 1. Normalize topic + category hint from an editor brief.
 * 2. Build prompt via `buildResearchPrompt`.
 * 3. Call `AIProvider.research` (human-selected vendor).
 * 4. Present `ResearchResult` in an internal tool for review.
 * 5. Human confirms sources before any draft pipeline run.
 *
 * Guarantees:
 * - Does not call providers in RC3-A.
 * - Does not write to `lib/content/`.
 * - Does not expose a public UI or API route.
 */
export function researchPipeline(): never {
  throw new Error("researchPipeline: Not implemented.");
}
