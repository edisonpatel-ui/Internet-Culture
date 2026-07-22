/**
 * Research Review Workspace services (Phase 2A).
 * ResearchPackage → ApprovedResearch. No draft gen / publish / providers.
 */

export {
  listResearchPackages,
  loadResearchPackage,
  saveResearchPackage,
  deleteResearchPackage,
  resetResearchPackageStore,
} from "./packageStore";

export {
  listApprovedResearch,
  loadApprovedResearch,
  findApprovedByPackageId,
  saveApprovedResearch,
  deleteApprovedByPackageId,
  resetApprovedResearchStore,
} from "./approvedStore";

export {
  approveResearchFromReview,
  getApprovalForPackage,
  type ResearchReviewSubmission,
} from "./reviewService";

export {
  deleteResearchJobByPackageId,
  deleteResearchJobBySessionId,
} from "./deleteResearchJob";

export {
  attachEditorialOverride,
  continueAnywayWithUnknowns,
  rerunResearchWithEditorGuidance,
} from "./editorialOverride";

export { sourceKey } from "./sourceKey";

export {
  approveResearchAction,
  deleteResearchPackageAction,
  continueAnywayAction,
  rerunResearchWithGuidanceAction,
} from "./actions";
