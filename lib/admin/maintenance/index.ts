/**
 * Experimental Maintenance Center — refresh dynamic encyclopedia metadata.
 * Editor-only. Propose → review → apply. No auto-commit.
 */

export type {
  MaintenanceScopeKind,
  MaintenanceCategoryFilter,
  MaintenanceRefreshRequest,
  MaintenanceEntryChange,
  MaintenanceRefreshReport,
} from "./types";

export { resolveMaintenanceTargets } from "./selectTargets";
export { runMaintenanceRefresh } from "./runRefresh";
export { applyMaintenanceReport } from "./applyReport";
export {
  saveMaintenanceReport,
  loadMaintenanceReport,
  listMaintenanceReports,
  discardMaintenanceReport,
} from "./reportStore";
