/**
 * Apply an approved maintenance report to lib/content files.
 * Continues past per-article failures. Does NOT git commit or push.
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import { applyDynamicMetadataPatch } from "@/lib/dynamicMetadata";
import {
  loadMaintenanceReport,
  saveMaintenanceReport,
} from "./reportStore";
import type {
  MaintenanceApplyArticleResult,
  MaintenanceRefreshReport,
} from "./types";

export interface ApplyMaintenanceResult {
  ok: boolean;
  error?: string;
  report?: MaintenanceRefreshReport;
  appliedCount?: number;
  filePaths?: string[];
  applyResults?: MaintenanceApplyArticleResult[];
}

function scoresUnchanged(
  change: MaintenanceRefreshReport["changes"][number],
): boolean {
  return (
    change.beforeScores.relevance === change.afterScores.relevance &&
    change.beforeTrendDirection === change.afterTrendDirection &&
    change.beforeTrendingScore === change.afterTrendingScore
  );
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
  if (report.jobStatus === "running") {
    return {
      ok: false,
      error: "Refresh is still running — wait for it to finish.",
    };
  }

  const catalog = getAllEntriesSync();
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));
  const filePaths: string[] = [];
  const applyResults: MaintenanceApplyArticleResult[] = [];
  let appliedCount = 0;

  // Apply Updated / Unknown / Failed-skip; skip pure no_changes for cleaner disk writes
  // but still allow applying unknown (clears stale highs when engine decided Unknown).
  for (const change of report.changes) {
    if (change.outcome === "failed" || !change.after) {
      applyResults.push({
        slug: change.slug,
        title: change.title,
        result: "skipped",
        reason:
          change.outcomeReason ||
          change.errorMessage ||
          "Propose failed — nothing to apply.",
      });
      continue;
    }

    if (change.outcome === "no_changes") {
      applyResults.push({
        slug: change.slug,
        title: change.title,
        result: "no_changes_required",
        reason:
          change.outcomeReason ||
          "Live evidence produced the same scores.",
        relevance: {
          from: change.beforeScores.relevance,
          to: change.afterScores.relevance,
        },
        trending: {
          from: change.beforeTrendingScore,
          to: change.afterTrendingScore,
        },
      });
      continue;
    }

    const entry = bySlug.get(change.slug);
    if (!entry) {
      applyResults.push({
        slug: change.slug,
        title: change.title,
        result: "failed",
        reason: `Catalog entry missing for slug "${change.slug}".`,
      });
      continue;
    }

    try {
      const { filePath } = applyDynamicMetadataPatch(entry, {
        scores: change.after.scores,
        trendDirection: change.after.trendDirection,
        lastUpdated: change.after.lastUpdated,
        dynamicMetadata: change.after.dynamicMetadata,
      });
      filePaths.push(filePath);
      appliedCount += 1;

      const relevance = {
        from: change.beforeScores.relevance,
        to: change.afterScores.relevance,
      };
      const trending = {
        from: change.beforeTrendingScore,
        to: change.afterTrendingScore,
      };

      if (change.outcome === "unknown") {
        applyResults.push({
          slug: change.slug,
          title: change.title,
          result: "unknown",
          reason:
            change.outcomeReason || "No confident live evidence available.",
          relevance,
          trending,
        });
      } else if (scoresUnchanged(change)) {
        applyResults.push({
          slug: change.slug,
          title: change.title,
          result: "no_changes_required",
          reason:
            change.outcomeReason ||
            "Live evidence produced the same scores.",
          relevance,
          trending,
        });
      } else {
        applyResults.push({
          slug: change.slug,
          title: change.title,
          result: "updated",
          reason: change.outcomeReason || "Scores updated from live evidence.",
          relevance,
          trending,
        });
      }
    } catch (err) {
      applyResults.push({
        slug: change.slug,
        title: change.title,
        result: "failed",
        reason: err instanceof Error ? err.message : "Apply failed.",
      });
    }
  }

  report.status = "applied";
  report.appliedAt = new Date().toISOString();
  report.appliedCount = appliedCount;
  report.applyResults = applyResults;
  report.notes.push(
    `Apply finished: ${applyResults.filter((r) => r.result === "updated").length} updated, ${applyResults.filter((r) => r.result === "no_changes_required").length} no changes, ${applyResults.filter((r) => r.result === "unknown").length} unknown, ${applyResults.filter((r) => r.result === "skipped").length} skipped, ${applyResults.filter((r) => r.result === "failed").length} failed.`,
  );
  saveMaintenanceReport(report);

  return { ok: true, report, appliedCount, filePaths, applyResults };
}
