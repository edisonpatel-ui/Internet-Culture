/**
 * Editorial packages — structured AI workflow payloads (RC3-B).
 */

export type {
  ResearchPackage,
  ResearchSourceRef,
  ResearchChronologyItem,
} from "./researchPackage";

export type {
  DraftPackage,
  SuggestedCulturalScores,
  SuggestedMediaItem,
  SuggestedSourceItem,
} from "./draftPackage";

export type {
  ReviewPackage,
  ReviewRecommendation,
  ReviewDimension,
  ReviewSeverity,
} from "./reviewPackage";

export type {
  SeoReviewPackage,
  SeoInternalLinkOpportunity,
} from "./seoPackage";

export type {
  UpdatePackage,
  ExistingArticleSnapshot,
} from "./updatePackage";
