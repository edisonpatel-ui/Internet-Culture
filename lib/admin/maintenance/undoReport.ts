/**
 * Undo an applied Maintenance report: reverts every article it changed
 * back to its exact before-state (scores, trend direction, dynamic
 * metadata). Immediate, writes to disk — same as Apply, just backwards.
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import { applyDynamicMetadataPatch } from "@/lib/dynamicMetadata";
import { loadMaintenanceReport, saveMaintenanceReport } from "./reportStore";
import type { MaintenanceApplyArticleResult } from "./types";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface UndoMaintenanceResult {
  ok: boolean;
  error?: string;
  undoneCount?: number;
  filePaths?: string[];
  results?: MaintenanceApplyArticleResult[];
}

export function undoMaintenanceReport(reportId: string): UndoMaintenanceResult {
  const report = loadMaintenanceReport(reportId);
  if (!report) return { ok: false, error: "Report not found." };
  if (report.status !== "applied") {
    return { ok: false, error: "This report hasn't been applied — nothing to undo." };
  }
  if (report.undoneAt) {
    return { ok: false, error: "This report has already been undone." };
  }

  const catalog = getAllEntriesSync();
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));
  const filePaths: string[] = [];
  const results: MaintenanceApplyArticleResult[] = [];
  let undoneCount = 0;

  for (const change of report.changes) {
    // Only revert articles that were actually written during Apply.
    const wasApplied = report.applyResults?.some(
      (r) => r.slug === change.slug && r.result === "updated",
    );
    if (!wasApplied || !change.before) continue;

    const entry = bySlug.get(change.slug);
    if (!entry) {
      results.push({
        slug: change.slug,
        title: change.title,
        result: "failed",
        reason: `Catalog entry missing for slug "${change.slug}".`,
      });
      continue;
    }

    try {
      const dynamicMetadata = change.before.dynamicMetadata ?? entry.dynamicMetadata;
      if (!dynamicMetadata) {
        results.push({
          slug: change.slug,
          title: change.title,
          result: "failed",
          reason: "No prior dynamic metadata to restore.",
        });
        continue;
      }
      const { filePath } = applyDynamicMetadataPatch(entry, {
        scores: change.before.scores,
        trendDirection: change.before.trendDirection,
        lastUpdated: today(),
        dynamicMetadata,
      });
      filePaths.push(filePath);
      undoneCount += 1;
      results.push({
        slug: change.slug,
        title: change.title,
        result: "updated",
        reason: "Reverted to pre-refresh values.",
        relevance: { from: change.afterScores.relevance, to: change.beforeScores.relevance },
        trending: { from: change.afterTrendingScore, to: change.beforeTrendingScore },
      });
    } catch (err) {
      results.push({
        slug: change.slug,
        title: change.title,
        result: "failed",
        reason: err instanceof Error ? err.message : "Undo failed.",
      });
    }
  }

  report.undoneAt = new Date().toISOString();
  report.notes.push(`Undone: ${undoneCount} article(s) reverted to pre-refresh values.`);
  saveMaintenanceReport(report);

  return { ok: true, undoneCount, filePaths, results };
}
