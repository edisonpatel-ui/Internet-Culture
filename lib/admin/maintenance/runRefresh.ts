/**
 * Run a Maintenance Center dynamic refresh — propose only (no file writes).
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import { proposeDynamicMetadataForEntry } from "@/lib/dynamicMetadata";
import { resolveMaintenanceTargets } from "./selectTargets";
import { saveMaintenanceReport } from "./reportStore";
import type {
  MaintenanceEntryChange,
  MaintenanceRefreshReport,
  MaintenanceRefreshRequest,
} from "./types";

function newId(): string {
  return `mr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function scoresChanged(
  before: MaintenanceEntryChange["beforeScores"],
  after: MaintenanceEntryChange["afterScores"],
  beforeTrend: string,
  afterTrend: string,
  beforeTrending: number | null,
  afterTrending: number | null,
): boolean {
  if (before.relevance !== after.relevance) return true;
  if (before.cringe !== after.cringe) return true;
  if (before.brainrot !== after.brainrot) return true;
  if (beforeTrend !== afterTrend) return true;
  if (beforeTrending !== afterTrending) return true;
  return false;
}

/**
 * Research dynamic signals for selected targets and build an editorial report.
 * Does NOT modify lib/content. Does NOT commit.
 */
export async function runMaintenanceRefresh(
  request: MaintenanceRefreshRequest,
): Promise<MaintenanceRefreshReport> {
  const catalog = getAllEntriesSync();
  const resolved = resolveMaintenanceTargets(catalog, request);

  const changes: MaintenanceEntryChange[] = [];
  const notes: string[] = [
    "Propose-only run — content files unchanged until you Apply.",
    "Historical prose (definition, origin, timeline, references) is never rewritten here.",
    "No git commit or deploy is performed.",
    "Live providers queried: Wikipedia pageviews, Know Your Meme, Wiktionary, Google News RSS, Google Trending RSS, Reddit, YouTube (if API key), creator RSS.",
  ];

  if (resolved.promptInterpretation) {
    notes.push(resolved.promptInterpretation);
  }

  for (const entry of resolved.entries) {
    const proposed = await proposeDynamicMetadataForEntry(entry);
    const beforeTrending =
      typeof entry.dynamicMetadata?.trendingScore === "number"
        ? entry.dynamicMetadata.trendingScore
        : null;
    const afterTrending =
      typeof proposed.after.dynamicMetadata.trendingScore === "number"
        ? proposed.after.dynamicMetadata.trendingScore
        : null;

    const changed = scoresChanged(
      proposed.before.scores,
      proposed.after.scores,
      proposed.before.trendDirection,
      proposed.after.trendDirection,
      beforeTrending,
      afterTrending,
    );

    if (!changed) {
      // Still record lastReviewed proposal so Apply can stamp freshness.
      // Skip unchanged from "updated" count but keep if anything differs in metadata stamp.
    }

    changes.push({
      slug: proposed.slug,
      title: proposed.title,
      category: proposed.category,
      beforeScores: proposed.before.scores,
      afterScores: proposed.after.scores,
      beforeTrendDirection: proposed.before.trendDirection,
      afterTrendDirection: proposed.after.trendDirection,
      beforeTrendingScore: beforeTrending,
      afterTrendingScore: afterTrending,
      relevanceDelta: proposed.relevanceDelta,
      trendingDelta: proposed.trendingDelta,
      lastReviewed: proposed.after.lastUpdated,
      currentStatus: proposed.after.dynamicMetadata.currentStatus,
      activePlatforms: proposed.after.dynamicMetadata.activePlatforms,
      popularityNotes: proposed.after.dynamicMetadata.popularityNotes,
      usedCatalogFallback: proposed.usedCatalogFallback,
      needsManualReview: proposed.needsManualReview,
      reviewReasons: proposed.reviewReasons,
      after: proposed.after,
    });
  }

  const materiallyUpdated = changes.filter((c) =>
    scoresChanged(
      c.beforeScores,
      c.afterScores,
      c.beforeTrendDirection,
      c.afterTrendDirection,
      c.beforeTrendingScore,
      c.afterTrendingScore,
    ),
  );

  const largestRelevanceChanges = [...materiallyUpdated]
    .filter((c) => c.relevanceDelta != null)
    .sort(
      (a, b) => Math.abs(b.relevanceDelta!) - Math.abs(a.relevanceDelta!),
    )
    .slice(0, 25)
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      from: c.beforeScores.relevance,
      to: c.afterScores.relevance,
      delta: c.relevanceDelta!,
    }));

  const largestTrendingChanges = [...materiallyUpdated]
    .filter((c) => c.trendingDelta != null)
    .sort(
      (a, b) => Math.abs(b.trendingDelta!) - Math.abs(a.trendingDelta!),
    )
    .slice(0, 25)
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      from: c.beforeTrendingScore ?? c.beforeScores.relevance,
      to: c.afterTrendingScore ?? c.afterScores.relevance,
      delta: c.trendingDelta!,
    }));

  const manualReviewSlugs = changes
    .filter((c) => c.needsManualReview)
    .map((c) => c.slug);

  if (resolved.entries.length === 0) {
    notes.push("Zero targets resolved — nothing to refresh.");
  }

  const unknownCount = changes.filter(
    (c) =>
      c.after.dynamicMetadata.currentRelevance === "unknown" ||
      c.after.dynamicMetadata.trendingScore === "unknown",
  ).length;
  if (unknownCount > 0) {
    notes.push(
      `${unknownCount} article(s) have Unknown relevance/trending — listed under Needs Editorial Review and excluded from homepage Trending after Apply.`,
    );
  }

  const report: MaintenanceRefreshReport = {
    id: newId(),
    createdAt: new Date().toISOString(),
    status: "proposed",
    request,
    scopeLabel: resolved.scopeLabel,
    promptInterpretation: resolved.promptInterpretation,
    targetCount: resolved.entries.length,
    updatedCount: materiallyUpdated.length,
    unchangedCount: resolved.entries.length - materiallyUpdated.length,
    changes,
    largestRelevanceChanges,
    largestTrendingChanges,
    manualReviewSlugs,
    notes,
  };

  return saveMaintenanceReport(report);
}
