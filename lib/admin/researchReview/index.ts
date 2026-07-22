/**
 * Research Review Workspace services (Phase 2A).
 * ResearchPackage → ApprovedResearch. No draft gen / publish / providers.
 */

export {
  listResearchPackages,
  loadResearchPackage,
  saveResearchPackage,
  resetResearchPackageStore,
} from "./packageStore";

export {
  listApprovedResearch,
  loadApprovedResearch,
  findApprovedByPackageId,
  saveApprovedResearch,
  resetApprovedResearchStore,
} from "./approvedStore";

export {
  approveResearchFromReview,
  getApprovalForPackage,
  type ResearchReviewSubmission,
} from "./reviewService";

export { sourceKey } from "./sourceKey";

export { approveResearchAction } from "./actions";
