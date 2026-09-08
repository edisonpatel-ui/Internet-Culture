/**
 * lib/ai/tokenBudget.ts
 *
 * Lightweight, dependency-free token estimation for Groq prompt payloads.
 *
 * This is a heuristic (~4 characters/token, the standard rule-of-thumb for
 * English prose and JSON) rather than a real tokenizer — Groq doesn't publish
 * a JS tokenizer for its hosted models, and pulling in a full BPE tokenizer
 * dependency for a rough pre-flight check isn't worth the weight. It's
 * intentionally conservative (rounds up) so it over-estimates slightly
 * rather than under-estimates, which is the safe direction for a rate-limit
 * guard.
 *
 * Used by lib/admin/editorialOs/{realArticleGeneration,realDraftRevision}.ts
 * to keep prompts comfortably under Groq's free-tier 8,000 TPM ceiling.
 */

/** Groq free-tier TPM ceiling is 8,000 (prompt + completion tokens combined).
 *  This is the hard budget for the PROMPT half of that — completion tokens
 *  are controlled separately via `maxTokens` on each call site, so prompt
 *  and completion budgets stay independently accountable. */
export const MAX_PROMPT_TOKENS = 4500;

export function estimateTokenCount(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Hard-truncates `text` to fit within `maxTokens`, cutting from the END.
 * Only use this on a block you control the tail of (e.g. an already-capped
 * source excerpt list) — never on a full prompt whose trailing content is
 * the required JSON-schema instructions, or you'll truncate the schema
 * itself and break response parsing.
 */
export function truncateToTokenBudget(text: string, maxTokens: number): string {
  const maxChars = maxTokens * 4;
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n… [truncated to stay within the prompt token budget]`;
}

/**
 * Given a prompt already assembled from a schema/instructions tail plus a
 * trimmable "block" (source excerpts, draft-content JSON, etc.), keeps
 * dropping items from the trimmable block (via `shrink`) until the full
 * assembled prompt (via `assemble`) fits under `maxTokens`, or there's
 * nothing left to drop. This is the safe way to enforce a hard prompt
 * ceiling without ever truncating the required schema instructions.
 */
export function fitPromptToBudget<TBlock>(
  block: TBlock[],
  assemble: (block: TBlock[]) => string,
  maxTokens: number = MAX_PROMPT_TOKENS,
): { prompt: string; itemsUsed: number; trimmed: boolean } {
  let items = [...block];
  let prompt = assemble(items);
  let trimmed = false;

  while (estimateTokenCount(prompt) > maxTokens && items.length > 0) {
    items = items.slice(0, -1);
    prompt = assemble(items);
    trimmed = true;
  }

  return { prompt, itemsUsed: items.length, trimmed };
}
