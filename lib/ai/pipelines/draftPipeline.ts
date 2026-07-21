/**
 * Draft pipeline (RC3-A foundation — not wired).
 *
 * Intended workflow (future):
 * 1. Accept approved research notes or an editor brief.
 * 2. Build prompt via `buildArticleDraftPrompt`.
 * 3. Call `AIProvider.draft`.
 * 4. Map `DraftResult` into a human-editable article template preview.
 * 5. Human edits, verifies sources/media, then commits via normal content workflow.
 *
 * Guarantees:
 * - Does not call providers in RC3-A.
 * - Does not auto-create content files or index imports.
 * - Does not publish or bypass `npm run validate`.
 */
export function draftPipeline(): never {
  throw new Error("draftPipeline: Not implemented.");
}
