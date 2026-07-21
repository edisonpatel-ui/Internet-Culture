/**
 * Encyclopedia Knowledge Base (RC3-D).
 *
 * Permanent reusable knowledge assets for AI / editorial / search / recommendations.
 * Not prompts. Not providers. Not article generators.
 *
 * Distinct from `lib/ai/intelligence/` (reasoning utilities) and
 * `lib/intelligence/` (live-site cultural scores).
 *
 * @see docs/KNOWLEDGE_BASE.md
 */

export {
  INTERNET_CULTURE_TAXONOMY,
  TAXONOMY_TOP_LEVEL_IDS,
  getTaxonomyNode,
  type TaxonomyTopLevel,
  type TaxonomyNode,
} from "./taxonomy";

export {
  MEME_LIFECYCLE_STAGES,
  getMemeLifecycleStage,
  type MemeLifecycleStageId,
  type MemeLifecycleStage,
} from "./memeLifecycle";

export {
  SLANG_EVOLUTION_STAGES,
  getSlangEvolutionStage,
  type SlangEvolutionStageId,
  type SlangEvolutionStage,
} from "./slangEvolution";

export {
  CREATOR_INFLUENCE_DIMENSIONS,
  getCreatorInfluenceDimension,
  type CreatorInfluenceDimensionId,
  type CreatorInfluenceDimension,
} from "./creatorInfluence";

export {
  PLATFORM_CULTURE,
  PLATFORM_CULTURE_IDS,
  getPlatformCulture,
  type PlatformCultureId,
  type PlatformCultureProfile,
} from "./platformCulture";

export {
  COMMUNITY_TAXONOMY,
  COMMUNITY_TAXONOMY_IDS,
  getCommunityTaxonomy,
  type CommunityTaxonomyId,
  type CommunityTaxonomyNode,
} from "./communityTaxonomy";

export {
  INTERNET_HISTORY_ERAS,
  getInternetHistoryEra,
  type InternetHistoryEraId,
  type InternetHistoryEra,
} from "./internetHistory";

export {
  VIRALITY_DRIVERS,
  getViralityDriver,
  type ViralityDriverId,
  type ViralityDriver,
} from "./viralityModel";

export {
  CULTURAL_IMPACT_FRAMEWORK,
  getCulturalImpactFrameworkDimension,
  type CulturalImpactFrameworkDimensionId,
  type CulturalImpactFrameworkDimension,
} from "./culturalImpactFramework";

export {
  RESEARCH_PATTERNS,
  getResearchPattern,
  type ResearchPatternId,
  type ResearchPattern,
} from "./researchPatterns";

export {
  ENCYCLOPEDIA_PRINCIPLES,
  getEncyclopediaPrinciple,
  type EncyclopediaPrincipleId,
  type EncyclopediaPrinciple,
} from "./encyclopediaPrinciples";

export {
  createTopicClassification,
  validateTopicClassificationShape,
  type ContentMaturity,
  type ResearchDifficulty,
  type TopicClassification,
} from "./classification";

export {
  createKnowledgeGraphFragment,
  validateKnowledgeGraphFragment,
  type KnowledgeNodeKind,
  type KnowledgeRelationKind,
  type KnowledgeNode,
  type KnowledgeEdge,
  type KnowledgeGraphFragment,
} from "./knowledgeGraph";
