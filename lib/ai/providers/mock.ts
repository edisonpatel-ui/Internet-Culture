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
 * Deterministic mock provider placeholder for future tests.
 * RC3-A: throws like other vendors — no fake generations yet.
 */
export class MockProvider implements AIProvider {
  readonly id = "mock" as const;
  readonly label = "Mock";

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
