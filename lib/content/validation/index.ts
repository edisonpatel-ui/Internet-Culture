export { buildCatalog, getCanonicalEntryArrays } from "./catalog";
export {
  formatValidationIssue,
  runContentValidation,
  type ContentValidationRun,
} from "./validateContent";
export {
  checkTitleSimilarity,
  normalizeTitleText,
  tokenizeTitle,
} from "./titleSimilarity";
export {
  runLiveMediaChecks,
  assertVerifiedRemainsHumanControlled,
} from "./mediaLiveChecks";
export type { LiveMediaWarning } from "./mediaLiveChecks";
export {
  buildCatalogQualityReport,
  formatQualityReport,
  scoreEntry,
  type CatalogQualityReport,
  type DimensionScores,
  type EntryQualityReport,
} from "./qualityScore";
export { validateArticleStandard } from "./articleStandard";
export { validatePlaceholderText } from "./placeholderChecks";
export {
  classifySource,
  scoreReferences,
  validateReferenceQuality,
} from "./referenceQuality";
export { scoreRelated, validateRelatedQuality } from "./relatedQuality";
export { scoreSeo, validateSeoQuality } from "./seoQuality";
export type {
  CatalogBuildResult,
  CatalogConflict,
  ValidationIssue,
  ValidationResult,
} from "./types";

