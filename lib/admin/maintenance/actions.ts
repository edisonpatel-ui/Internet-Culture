"use server";

import { revalidatePath } from "next/cache";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";
import { revalidatePublicDiscovery } from "@/lib/admin/revalidatePublicDiscovery";
import {
  getCategoryResumeInfo,
  startCategoryRefresh,
  stepCategoryRefresh,
  stopCategoryRefresh,
} from "./runRefresh";
import { applyMaintenanceReport } from "./applyReport";
import {
  discardMaintenanceReport,
  listMaintenanceReports,
  loadMaintenanceReport,
} from "./reportStore";
import type {
  MaintenanceCategoryFilter,
  MaintenanceJobProgress,
  MaintenanceRefreshReport,
} from "./types";

function revalidateMaintenance() {
  revalidatePath("/admin");
  revalidatePath("/admin/maintenance");
  revalidatePath(experimentalPaths.hub);
}

async function gate(): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminSession();
  if (!access.ok) return { ok: false, error: "Not found." };
  return { ok: true };
}

export async function startCategoryRefreshAction(
  category: MaintenanceCategoryFilter,
  options?: { resume?: boolean },
): Promise<
  { ok: true; progress: MaintenanceJobProgress } | { ok: false; error: string }
> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    const progress = startCategoryRefresh(category, options);
    revalidateMaintenance();
    if (progress.reportId) {
      revalidatePath(`/admin/maintenance/${progress.reportId}`);
    }
    return { ok: true, progress };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Could not start refresh.",
    };
  }
}

export async function stepCategoryRefreshAction(
  jobId: string,
): Promise<
  { ok: true; progress: MaintenanceJobProgress } | { ok: false; error: string }
> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    const progress = await stepCategoryRefresh(jobId);
    if (progress.reportId) {
      revalidatePath(`/admin/maintenance/${progress.reportId}`);
    }
    if (
      progress.status === "success" ||
      progress.status === "failed" ||
      progress.status === "stopped"
    ) {
      revalidateMaintenance();
    }
    return { ok: true, progress };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Refresh step failed.";
    try {
      const { loadMaintenanceJob, saveMaintenanceJob } = await import("./jobStore");
      const { loadMaintenanceReport, saveMaintenanceReport } = await import(
        "./reportStore"
      );
      const job = loadMaintenanceJob(jobId);
      if (job && job.status === "running") {
        job.status = "failed";
        job.error = message;
        saveMaintenanceJob(job);
        const report = loadMaintenanceReport(job.reportId);
        if (report) {
          report.jobStatus = "failed";
          report.notes.push(`Job failed: ${message}`);
          saveMaintenanceReport(report);
        }
      }
    } catch {
      // best-effort
    }
    return { ok: false, error: message };
  }
}

export async function stopCategoryRefreshAction(
  jobId: string,
): Promise<
  { ok: true; progress: MaintenanceJobProgress } | { ok: false; error: string }
> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    const progress = stopCategoryRefresh(jobId);
    return { ok: true, progress };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Stop failed.",
    };
  }
}

export async function getCategoryResumeAction(
  category: MaintenanceCategoryFilter,
) {
  const g = await gate();
  if (!g.ok) return null;
  return getCategoryResumeInfo(category);
}

export async function applyMaintenanceReportAction(
  reportId: string,
): Promise<
  | { ok: true; appliedCount: number }
  | { ok: false; error: string }
> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    const result = applyMaintenanceReport(reportId);
    if (!result.ok) {
      return { ok: false, error: result.error ?? "Apply failed." };
    }
    revalidateMaintenance();
    revalidatePath(`/admin/maintenance/${reportId}`);
    revalidatePublicDiscovery();
    return { ok: true, appliedCount: result.appliedCount ?? 0 };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Apply failed.",
    };
  }
}

export async function discardMaintenanceReportAction(
  reportId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    discardMaintenanceReport(reportId);
    revalidateMaintenance();
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Discard failed.",
    };
  }
}

export async function listMaintenanceReportsAction(): Promise<
  Pick<
    MaintenanceRefreshReport,
    | "id"
    | "createdAt"
    | "status"
    | "jobStatus"
    | "scopeLabel"
    | "targetCount"
    | "updatedCount"
    | "unchangedCount"
    | "failedCount"
  >[]
> {
  const g = await gate();
  if (!g.ok) return [];
  return listMaintenanceReports().map((r) => ({
    id: r.id,
    createdAt: r.createdAt,
    status: r.status,
    jobStatus: r.jobStatus ?? "success",
    scopeLabel: r.scopeLabel,
    targetCount: r.targetCount,
    updatedCount: r.updatedCount,
    unchangedCount: r.unchangedCount ?? 0,
    failedCount: r.failedCount ?? 0,
  }));
}

export async function loadMaintenanceReportAction(
  reportId: string,
): Promise<MaintenanceRefreshReport | null> {
  const g = await gate();
  if (!g.ok) return null;
  return loadMaintenanceReport(reportId) ?? null;
}
