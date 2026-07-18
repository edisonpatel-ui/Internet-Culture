export { buildCatalog, getCanonicalEntryArrays } from "./catalog";
export {
  formatValidationIssue,
  runContentValidation,
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
export type {
  CatalogBuildResult,
  CatalogConflict,
  ValidationIssue,
  ValidationResult,
} from "./types";
