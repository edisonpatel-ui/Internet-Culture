/**
 * Experimental Maintenance Center — refresh dynamic encyclopedia metadata.
 * Editor-only. Refresh → preview → apply. No auto-commit.
 */

export type {
  MaintenanceCategoryFilter,
  MaintenanceEntryChange,
  MaintenanceRefreshReport,
  MaintenanceJobProgress,
  MaintenanceApplyArticleResult,
} from "./types";

export {
  CATEGORY_LABELS,
  ESTIMATED_SECONDS_PER_ARTICLE,
} from "./types";

export { resolveCategoryTargets } from "./selectTargets";
export {
  startCategoryRefresh,
  stepCategoryRefresh,
  stopCategoryRefresh,
  getCategoryResumeInfo,
} from "./runRefresh";
export { applyMaintenanceReport } from "./applyReport";
export {
  saveMaintenanceReport,
  loadMaintenanceReport,
  listMaintenanceReports,
  discardMaintenanceReport,
} from "./reportStore";
export {
  loadCategoryResume,
  saveCategoryResume,
  clearCategoryResume,
} from "./progressStore";
