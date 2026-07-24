/**
 * Apply an approved maintenance report to lib/content files.
 * Does NOT git commit or push.
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import { applyDynamicMetadataPatch } from "@/lib/dynamicMetadata";
import {
  loadMaintenanceReport,
  saveMaintenanceReport,
} from "./reportStore";
import type { MaintenanceRefreshReport } from "./types";

export interface ApplyMaintenanceResult {
  ok: boolean;
  error?: string;
  report?: MaintenanceRefreshReport;
  appliedCount?: number;
  filePaths?: string[];
}

/**
 * Write proposed dynamic patches after explicit editor approval.
 */
export function applyMaintenanceReport(
  reportId: string,
): ApplyMaintenanceResult {
  const report = loadMaintenanceReport(reportId);
  if (!report) {
    return { ok: false, error: "Report not found." };
  }
  if (report.status === "applied") {
    return { ok: false, error: "Report already applied." };
  }
  if (report.status === "discarded") {
    return { ok: false, error: "Report was discarded." };
  }

  const catalog = getAllEntriesSync();
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));
  const filePaths: string[] = [];
  let appliedCount = 0;

  for (const change of report.changes) {
    const entry = bySlug.get(change.slug);
    if (!entry) continue;
    try {
      const { filePath } = applyDynamicMetadataPatch(entry, {
        scores: change.after.scores,
        trendDirection: change.after.trendDirection,
        lastUpdated: change.after.lastUpdated,
        dynamicMetadata: change.after.dynamicMetadata,
      });
      filePaths.push(filePath);
      appliedCount += 1;
    } catch (err) {
      return {
        ok: false,
        error: `Failed on ${change.slug}: ${err instanceof Error ? err.message : "unknown"}`,
        appliedCount,
        filePaths,
      };
    }
  }

  report.status = "applied";
  report.appliedAt = new Date().toISOString();
  report.appliedCount = appliedCount;
  report.notes.push(
    `Applied ${appliedCount} content file patch(es). Commit and deploy separately when ready.`,
  );
  saveMaintenanceReport(report);

  return { ok: true, report, appliedCount, filePaths };
}
