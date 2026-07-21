import type {
  AIProvider,
  DraftRequest,
  DraftResult,
  ResearchRequest,
  ResearchResult,
  ReviewRequest,
  ReviewResult,
  SEORequest,
  SEOResult,
} from "../types";
import { notImplemented } from "./base";

/**
 * Anthropic-shaped provider placeholder.
 * Future: Anthropic SDK behind this port — not installed in RC3-A.
 */
export class AnthropicProvider implements AIProvider {
  readonly id = "anthropic" as const;
  readonly label = "Anthropic";

  research(_request: ResearchRequest): Promise<ResearchResult> {
    return notImplemented(this.label, "research");
  }

  draft(_request: DraftRequest): Promise<DraftResult> {
    return notImplemented(this.label, "draft");
  }

  review(_request: ReviewRequest): Promise<ReviewResult> {
    return notImplemented(this.label, "review");
  }

  seo(_request: SEORequest): Promise<SEOResult> {
    return notImplemented(this.label, "seo");
  }
}
