/**
 * Reusable editorial prompt templates — strings only, no provider calls.
 */

export { buildResearchPrompt } from "./research";
export { buildArticleDraftPrompt } from "./articleDraft";
export { buildEditorialReviewPrompt } from "./editorialReview";
export { buildSeoReviewPrompt } from "./seoReview";
export {
  buildInternalLinkingPrompt,
  type InternalLinkingPromptInput,
} from "./internalLinking";
export {
  buildMediaSuggestionsPrompt,
  type MediaSuggestionsPromptInput,
} from "./mediaSuggestions";
export {
  buildUpdateDetectionPrompt,
  type UpdateDetectionPromptInput,
} from "./updateDetection";
