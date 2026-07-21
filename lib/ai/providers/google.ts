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
 * Google (Gemini)-shaped provider placeholder.
 * Future: Google Generative AI SDK behind this port — not installed in RC3-A.
 */
export class GoogleProvider implements AIProvider {
  readonly id = "google" as const;
  readonly label = "Google";

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
