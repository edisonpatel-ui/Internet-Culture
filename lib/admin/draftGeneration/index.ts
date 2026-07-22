/**
 * Mock draft generation from ApprovedResearch (Phase 3).
 */

export {
  generateDraftFromApprovedResearch,
} from "./fromApprovedResearch";

export { reviseDraftWithFeedback } from "./reviseDraft";
export { normalizeDraftPackage } from "./normalizeDraft";
export { draftPackageToPreviewEntry } from "./draftToPreviewEntry";

export {
  listDraftPackages,
  loadDraftPackage,
  findDraftPackageByApprovedResearchId,
  saveDraftPackage,
  resetDraftPackageStore,
} from "./draftPackageStore";

export {
  generateDraftFromApproved,
  updateDraftPackageFields,
} from "./draftService";

export {
  generateDraftFromApprovedAction,
  saveDraftPackageAction,
  reviseDraftAction,
} from "./actions";
