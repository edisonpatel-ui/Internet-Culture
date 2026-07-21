/**
 * AI Editorial Platform (RC3-A) — provider-agnostic foundation.
 *
 * Status: architecture only. No SDKs, env vars, API routes, or public UI.
 * Importing this module has no runtime side effects on the site.
 *
 * Layout:
 * - `types.ts` — AIProvider + request/result contracts
 * - `providers/` — OpenAI / Anthropic / Google / Mock placeholders (throw)
 * - `prompts/` — reusable prompt templates (strings only)
 * - `pipelines/` — documented workflows (throw; no provider calls)
 *
 * Related (separate):
 * - `lib/intelligence/ai` — heuristic assistance envelopes
 * - `lib/integrations` — future `AiAssistProvider` port
 *
 * @see docs/AI_EDITORIAL_PLATFORM.md
 */

export type {
  AIProvider,
  AIProviderId,
  AIDraftCategory,
  ResearchRequest,
  ResearchResult,
  DraftRequest,
  DraftResult,
  ReviewRequest,
  ReviewResult,
  ReviewFinding,
  SEORequest,
  SEOResult,
  PromptTemplate,
} from "./types";

export {
  OpenAIProvider,
  AnthropicProvider,
  GoogleProvider,
  MockProvider,
  notImplemented,
} from "./providers";

export {
  buildResearchPrompt,
  buildArticleDraftPrompt,
  buildEditorialReviewPrompt,
  buildSeoReviewPrompt,
  buildInternalLinkingPrompt,
  buildMediaSuggestionsPrompt,
  buildUpdateDetectionPrompt,
} from "./prompts";

export type {
  InternalLinkingPromptInput,
  MediaSuggestionsPromptInput,
  UpdateDetectionPromptInput,
} from "./prompts";

export {
  researchPipeline,
  draftPipeline,
  reviewPipeline,
} from "./pipelines";
