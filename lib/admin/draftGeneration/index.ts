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
  draftPackageToPresentationArticle,
  type PresentationArticle,
} from "./presentationArticle";
export {
  sanitizePublicProse,
  writeEncyclopediaLead,
  writeOriginProse,
} from "./encyclopediaProse";

export {
  listDraftPackages,
  loadDraftPackage,
  findDraftPackageByApprovedResearchId,
  saveDraftPackage,
  deleteDraftPackage,
  resetDraftPackageStore,
} from "./draftPackageStore";

export {
  generateDraftFromApproved,
  updateDraftPackageFields,
  loadPublicDraftPackage,
} from "./draftService";

export {
  generateDraftFromApprovedAction,
  saveDraftPackageAction,
  reviseDraftAction,
  deleteDraftAction,
} from "./actions";
