"use server";

import { revalidatePath } from "next/cache";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";
import { runMaintenanceRefresh } from "./runRefresh";
import { applyMaintenanceReport } from "./applyReport";
import {
  discardMaintenanceReport,
  listMaintenanceReports,
  loadMaintenanceReport,
} from "./reportStore";
import type {
  MaintenanceCategoryFilter,
  MaintenanceRefreshRequest,
  MaintenanceRefreshReport,
} from "./types";

function revalidateMaintenance() {
  revalidatePath("/admin/maintenance");
  revalidatePath(experimentalPaths.hub);
}

export async function runMaintenanceRefreshAction(
  request: MaintenanceRefreshRequest,
): Promise<
  { ok: true; reportId: string } | { ok: false; error: string }
> {
  try {
    const report = await runMaintenanceRefresh(request);
    revalidateMaintenance();
    revalidatePath(`/admin/maintenance/${report.id}`);
    return { ok: true, reportId: report.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Refresh failed.",
    };
  }
}

export async function refreshEntireEncyclopediaAction() {
  return runMaintenanceRefreshAction({ kind: "entire" });
}

export async function refreshCategoryAction(
  category: MaintenanceCategoryFilter,
) {
  return runMaintenanceRefreshAction({ kind: "category", category });
}

export async function refreshSelectedAction(slugs: string[]) {
  return runMaintenanceRefreshAction({ kind: "selected", slugs });
}

export async function refreshByPromptAction(prompt: string) {
  return runMaintenanceRefreshAction({ kind: "prompt", prompt });
}

export async function applyMaintenanceReportAction(
  reportId: string,
): Promise<
  | { ok: true; appliedCount: number }
  | { ok: false; error: string }
> {
  try {
    const result = applyMaintenanceReport(reportId);
    if (!result.ok) {
      return { ok: false, error: result.error ?? "Apply failed." };
    }
    revalidateMaintenance();
    revalidatePath(`/admin/maintenance/${reportId}`);
    // Public pages only change after editor deploys — still revalidate local preview.
    revalidatePath("/");
    revalidatePath("/trending");
    revalidatePath("/memes");
    revalidatePath("/slang");
    revalidatePath("/events");
    revalidatePath("/people");
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
    | "scopeLabel"
    | "targetCount"
    | "updatedCount"
    | "manualReviewSlugs"
  >[]
> {
  return listMaintenanceReports().map((r) => ({
    id: r.id,
    createdAt: r.createdAt,
    status: r.status,
    scopeLabel: r.scopeLabel,
    targetCount: r.targetCount,
    updatedCount: r.updatedCount,
    manualReviewSlugs: r.manualReviewSlugs,
  }));
}

export async function loadMaintenanceReportAction(
  reportId: string,
): Promise<MaintenanceRefreshReport | null> {
  return loadMaintenanceReport(reportId) ?? null;
}
