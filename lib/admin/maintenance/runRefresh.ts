/**
 * Category-only Maintenance Center refresh.
 * Stepped: one article per server action. Stop finishes current, then halts.
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import { proposeDynamicMetadataForEntry } from "@/lib/dynamicMetadata";
import type { BaseEntry } from "@/types";
import {
  deleteMaintenanceJob,
  loadMaintenanceJob,
  saveMaintenanceJob,
  type MaintenanceRefreshJob,
} from "./jobStore";
import {
  clearCategoryResume,
  loadCategoryResume,
  saveCategoryResume,
} from "./progressStore";
import {
  discardMaintenanceReport,
  loadMaintenanceReport,
  saveMaintenanceReport,
} from "./reportStore";
import { resolveCategoryTargets } from "./selectTargets";
import {
  CATEGORY_LABELS,
  ESTIMATED_SECONDS_PER_ARTICLE,
  type MaintenanceCategoryFilter,
  type MaintenanceEntryChange,
  type MaintenanceJobProgress,
  type MaintenanceProviderStatus,
  type MaintenanceRefreshOutcome,
  type MaintenanceRefreshReport,
} from "./types";

export const PROGRESS_PROVIDER_DISPLAY: Array<{ id: string; label: string }> = [
  { id: "wikipedia", label: "Wikipedia" },
  { id: "know-your-meme", label: "KYM" },
  { id: "reddit", label: "Reddit" },
  { id: "news", label: "News" },
  { id: "youtube", label: "YouTube" },
];

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function scoresMateriallyChanged(change: {
  beforeScores: MaintenanceEntryChange["beforeScores"];
  afterScores: MaintenanceEntryChange["afterScores"];
  beforeTrendDirection: string;
  afterTrendDirection: string;
  beforeTrendingScore: number | null;
  afterTrendingScore: number | null;
}): boolean {
  if (change.beforeScores.relevance !== change.afterScores.relevance) return true;
  if (change.beforeScores.cringe !== change.afterScores.cringe) return true;
  if (change.beforeScores.brainrot !== change.afterScores.brainrot) return true;
  if (change.beforeTrendDirection !== change.afterTrendDirection) return true;
  if (change.beforeTrendingScore !== change.afterTrendingScore) return true;
  return false;
}

function mapProvidersForUi(
  providers: MaintenanceProviderStatus[],
): MaintenanceProviderStatus[] {
  const byId = new Map(providers.map((p) => [p.id, p]));
  return PROGRESS_PROVIDER_DISPLAY.map(({ id, label }) => {
    const hit = byId.get(id);
    return {
      id,
      label,
      status: hit?.status ?? "no_data",
      note: hit?.note,
    };
  });
}

function classifyOutcome(input: {
  usedCatalogFallback: boolean;
  afterRelevance: number | "unknown" | null | undefined;
  afterTrending: number | "unknown" | null | undefined;
  changed: boolean;
  relevanceDelta: number | null;
  trendingDelta: number | null;
  popularityNotes?: string;
  scoreReasons?: {
    relevance: string;
    influence: string;
    brainrot: string;
    cringe: string;
  };
}): { outcome: MaintenanceRefreshOutcome; outcomeReason: string } {
  const relevanceUnknown = input.afterRelevance === "unknown";
  const trendingUnknown = input.afterTrending === "unknown";

  if (input.usedCatalogFallback || (relevanceUnknown && trendingUnknown)) {
    return {
      outcome: "unknown",
      outcomeReason:
        input.scoreReasons?.relevance ||
        "No confident live evidence of how often people would naturally encounter this today.",
    };
  }

  if (!input.changed) {
    return {
      outcome: "no_changes",
      outcomeReason:
        input.scoreReasons?.relevance ||
        "Live encounter signals still match the stored Current Relevance.",
    };
  }

  const trendDelta = input.trendingDelta ?? 0;
  const relDelta = input.relevanceDelta ?? 0;

  if (relDelta <= -20) {
    return {
      outcome: "updated",
      outcomeReason:
        input.scoreReasons?.relevance ||
        "A typical young internet user is less likely to naturally encounter this today.",
    };
  }
  if (relDelta >= 20 || trendDelta >= 20) {
    return {
      outcome: "updated",
      outcomeReason:
        input.scoreReasons?.relevance ||
        "Live signals suggest people are more likely to encounter this on today's internet.",
    };
  }

  return {
    outcome: "updated",
    outcomeReason:
      input.scoreReasons?.relevance ||
      input.popularityNotes?.trim() ||
      "Live evidence produced updated scores.",
  };
}

function emptyProviders(): MaintenanceProviderStatus[] {
  return PROGRESS_PROVIDER_DISPLAY.map(({ id, label }) => ({
    id,
    label,
    status: "no_data" as const,
  }));
}

function recomputeSummaries(report: MaintenanceRefreshReport): void {
  const updated = report.changes.filter((c) => c.outcome === "updated");
  const unchanged = report.changes.filter((c) => c.outcome === "no_changes");
  const unknown = report.changes.filter((c) => c.outcome === "unknown");
  const failed = report.changes.filter((c) => c.outcome === "failed");

  report.updatedCount = updated.length;
  report.unchangedCount = unchanged.length;
  report.unknownCount = unknown.length;
  report.failedCount = failed.length;
  report.processedCount = report.changes.length;

  report.largestRelevanceChanges = [...updated]
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

  report.largestTrendingChanges = [...updated]
    .filter((c) => c.trendingDelta != null)
    .sort((a, b) => Math.abs(b.trendingDelta!) - Math.abs(a.trendingDelta!))
    .slice(0, 25)
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      from: c.beforeTrendingScore ?? c.beforeScores.relevance,
      to: c.afterTrendingScore ?? c.afterScores.relevance,
      delta: c.trendingDelta!,
    }));
}

function materialChangeCount(report: MaintenanceRefreshReport): number {
  return report.updatedCount + report.unknownCount + report.failedCount;
}

function progressFromJob(job: MaintenanceRefreshJob): MaintenanceJobProgress {
  const remaining = Math.max(0, job.total - job.processedCount);
  return {
    jobId: job.id,
    reportId: job.reportId,
    status: job.status,
    category: job.category,
    scopeLabel: CATEGORY_LABELS[job.category],
    total: job.total,
    currentIndex: job.processedCount,
    currentTitle: job.currentTitle,
    currentSlug: job.currentSlug,
    providers: job.providers.length > 0 ? job.providers : emptyProviders(),
    estimatedSecondsRemaining: remaining * ESTIMATED_SECONDS_PER_ARTICLE,
    error: job.error,
    processedCount: job.processedCount,
  };
}

function changeFromProposal(
  entry: BaseEntry,
  proposed: Awaited<ReturnType<typeof proposeDynamicMetadataForEntry>>,
): MaintenanceEntryChange {
  const beforeTrending =
    typeof entry.dynamicMetadata?.trendingScore === "number"
      ? entry.dynamicMetadata.trendingScore
      : null;
  const afterTrending =
    typeof proposed.after.dynamicMetadata.trendingScore === "number"
      ? proposed.after.dynamicMetadata.trendingScore
      : null;
  const beforeCurrentRelevance =
    typeof entry.dynamicMetadata?.currentRelevance === "number"
      ? entry.dynamicMetadata.currentRelevance
      : null;
  const afterCurrentRelevance = proposed.after.dynamicMetadata
    .currentRelevance as number | "unknown" | null;

  const draft = {
    beforeScores: proposed.before.scores,
    afterScores: proposed.after.scores,
    beforeTrendDirection: proposed.before.trendDirection,
    afterTrendDirection: proposed.after.trendDirection,
    beforeTrendingScore: beforeTrending,
    afterTrendingScore: afterTrending,
  };
  const changed = scoresMateriallyChanged(draft);
  const scoreReasons = proposed.after.dynamicMetadata.scoreReasons as
    | {
        relevance: string;
        influence: string;
        brainrot: string;
        cringe: string;
      }
    | undefined;
  const { outcome, outcomeReason } = classifyOutcome({
    usedCatalogFallback: proposed.usedCatalogFallback,
    afterRelevance: proposed.after.dynamicMetadata.currentRelevance,
    afterTrending: proposed.after.dynamicMetadata.trendingScore,
    changed,
    relevanceDelta: proposed.relevanceDelta,
    trendingDelta: proposed.trendingDelta,
    popularityNotes: proposed.after.dynamicMetadata.popularityNotes,
    scoreReasons,
  });

  return {
    slug: proposed.slug,
    title: proposed.title,
    category: proposed.category,
    beforeScores: proposed.before.scores,
    afterScores: proposed.after.scores,
    beforeTrendDirection: proposed.before.trendDirection,
    afterTrendDirection: proposed.after.trendDirection,
    beforeTrendingScore: beforeTrending,
    afterTrendingScore: afterTrending,
    beforeCurrentRelevance,
    afterCurrentRelevance,
    relevanceDelta: proposed.relevanceDelta,
    trendingDelta: proposed.trendingDelta,
    lastReviewed: proposed.after.lastUpdated,
    currentStatus: proposed.after.dynamicMetadata.currentStatus,
    activePlatforms: proposed.after.dynamicMetadata.activePlatforms,
    popularityNotes: proposed.after.dynamicMetadata.popularityNotes,
    scoreReasons,
    usedCatalogFallback: proposed.usedCatalogFallback,
    outcome,
    outcomeReason,
    providers: mapProvidersForUi(
      proposed.providers.map((p) => ({
        id: p.id,
        label: p.label,
        status: p.status,
        note: p.note,
      })),
    ),
    after: proposed.after,
  };
}

function failedChange(entry: BaseEntry, message: string): MaintenanceEntryChange {
  const beforeTrending =
    typeof entry.dynamicMetadata?.trendingScore === "number"
      ? entry.dynamicMetadata.trendingScore
      : null;
  const beforeCurrentRelevance =
    typeof entry.dynamicMetadata?.currentRelevance === "number"
      ? entry.dynamicMetadata.currentRelevance
      : null;

  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    beforeScores: { ...entry.scores },
    afterScores: { ...entry.scores },
    beforeTrendDirection: entry.trendDirection,
    afterTrendDirection: entry.trendDirection,
    beforeTrendingScore: beforeTrending,
    afterTrendingScore: beforeTrending,
    beforeCurrentRelevance,
    afterCurrentRelevance: beforeCurrentRelevance,
    relevanceDelta: null,
    trendingDelta: null,
    lastReviewed: new Date().toISOString().slice(0, 10),
    usedCatalogFallback: true,
    outcome: "failed",
    outcomeReason: message,
    providers: emptyProviders(),
    errorMessage: message,
  };
}

function persistResumeFromJob(job: MaintenanceRefreshJob, reportId: string): void {
  if (!job.lastCompletedSlug) return;
  saveCategoryResume({
    category: job.category,
    lastCompletedSlug: job.lastCompletedSlug,
    completedCount: job.processedCount,
    updatedAt: new Date().toISOString(),
    lastReportId: reportId,
  });
}

export type StartCategoryRefreshOptions = {
  /** When true (default), continue after last completed slug if a resume cursor exists. */
  resume?: boolean;
};

/**
 * Start a category refresh job (propose-only). Does not process articles yet.
 */
export function startCategoryRefresh(
  category: MaintenanceCategoryFilter,
  options: StartCategoryRefreshOptions = {},
): MaintenanceJobProgress {
  const resume = options.resume !== false;
  const catalog = getAllEntriesSync();
  const resolved = resolveCategoryTargets(catalog, category);
  const allSlugs = resolved.entries.map((e) => e.slug);

  let pendingSlugs = allSlugs;
  let resumedFromSlug: string | null = null;

  if (resume) {
    const cursor = loadCategoryResume(category);
    if (cursor?.lastCompletedSlug) {
      const idx = allSlugs.indexOf(cursor.lastCompletedSlug);
      if (idx >= 0 && idx < allSlugs.length - 1) {
        pendingSlugs = allSlugs.slice(idx + 1);
        resumedFromSlug = cursor.lastCompletedSlug;
      } else if (idx === allSlugs.length - 1) {
        // Fully complete previously — start fresh
        clearCategoryResume(category);
        pendingSlugs = allSlugs;
      }
    }
  } else {
    clearCategoryResume(category);
  }

  const reportId = newId("mr");
  const jobId = newId("mj");
  const createdAt = new Date().toISOString();

  const report: MaintenanceRefreshReport = {
    id: reportId,
    createdAt,
    status: "proposed",
    jobStatus: "running",
    category,
    scopeLabel: `Category: ${CATEGORY_LABELS[category]}`,
    targetCount: pendingSlugs.length,
    processedCount: 0,
    updatedCount: 0,
    unchangedCount: 0,
    unknownCount: 0,
    failedCount: 0,
    changes: [],
    largestRelevanceChanges: [],
    largestTrendingChanges: [],
    notes: [
      "Propose-only — content files unchanged until you Apply.",
      "Historical prose is never rewritten here.",
      resumedFromSlug
        ? `Resumed after “${resumedFromSlug}” (${pendingSlugs.length} remaining).`
        : `Category ${CATEGORY_LABELS[category]}: ${pendingSlugs.length} article(s).`,
      `Estimated time ≈ ${pendingSlugs.length * ESTIMATED_SECONDS_PER_ARTICLE}s.`,
    ],
    estimatedSecondsPerArticle: ESTIMATED_SECONDS_PER_ARTICLE,
    resumedFromSlug,
  };

  if (pendingSlugs.length === 0) {
    report.jobStatus = "success";
    report.notes.push("Nothing left to refresh in this category.");
    clearCategoryResume(category);
    // No material work — do not keep an empty report
    return {
      jobId,
      reportId: "",
      status: "success",
      category,
      scopeLabel: CATEGORY_LABELS[category],
      total: 0,
      currentIndex: 0,
      currentTitle: null,
      currentSlug: null,
      providers: emptyProviders(),
      estimatedSecondsRemaining: 0,
      noMaterialChanges: true,
      processedCount: 0,
    };
  }

  saveMaintenanceReport(report);

  const job: MaintenanceRefreshJob = {
    id: jobId,
    reportId,
    category,
    status: "running",
    pendingSlugs,
    allSlugs,
    processedCount: 0,
    total: pendingSlugs.length,
    currentTitle: null,
    currentSlug: null,
    providers: emptyProviders(),
    stopRequested: false,
    createdAt,
    lastCompletedSlug: resumedFromSlug,
  };
  saveMaintenanceJob(job);
  return progressFromJob(job);
}

function finalizeSuccess(
  job: MaintenanceRefreshJob,
  report: MaintenanceRefreshReport,
): MaintenanceJobProgress {
  job.status = "success";
  job.currentTitle = null;
  job.currentSlug = null;
  report.jobStatus = "success";
  recomputeSummaries(report);

  const material = materialChangeCount(report);
  if (material === 0) {
    discardMaintenanceReport(report.id);
    clearCategoryResume(job.category);
    deleteMaintenanceJob(job.id);
    return {
      ...progressFromJob({ ...job, status: "success", reportId: "" }),
      reportId: "",
      noMaterialChanges: true,
      processedCount: report.processedCount,
    };
  }

  report.notes.push(
    `Finished: ${report.updatedCount} updated, ${report.unchangedCount} unchanged, ${report.unknownCount} unknown, ${report.failedCount} failed.`,
  );
  clearCategoryResume(job.category);
  saveMaintenanceReport(report);
  deleteMaintenanceJob(job.id);
  return progressFromJob({ ...job, status: "success" });
}

function finalizeStopped(
  job: MaintenanceRefreshJob,
  report: MaintenanceRefreshReport,
): MaintenanceJobProgress {
  job.status = "stopped";
  job.currentTitle = null;
  job.currentSlug = null;
  recomputeSummaries(report);
  report.jobStatus = "stopped";
  const msg = `Stopped by editor.\n\n${report.processedCount} articles refreshed.\n\nNext refresh will resume where it stopped.`;
  report.stoppedMessage = msg;
  report.notes.push(msg.replace(/\n+/g, " "));
  persistResumeFromJob(job, report.id);

  const material = materialChangeCount(report);
  if (material === 0 && report.processedCount === 0) {
    discardMaintenanceReport(report.id);
    deleteMaintenanceJob(job.id);
    return {
      ...progressFromJob({ ...job, status: "stopped", reportId: "" }),
      reportId: "",
      noMaterialChanges: true,
      stoppedMessage: msg,
      processedCount: 0,
    };
  }

  saveMaintenanceReport(report);
  deleteMaintenanceJob(job.id);
  return {
    ...progressFromJob({ ...job, status: "stopped" }),
    stoppedMessage: msg,
  };
}

/**
 * Process the next pending article.
 * If stop was requested, finalize without starting another article.
 */
export async function stepCategoryRefresh(
  jobId: string,
): Promise<MaintenanceJobProgress> {
  const job = loadMaintenanceJob(jobId);
  if (!job) {
    return {
      jobId,
      reportId: "",
      status: "failed",
      category: "meme",
      scopeLabel: "Unknown",
      total: 0,
      currentIndex: 0,
      currentTitle: null,
      currentSlug: null,
      providers: emptyProviders(),
      estimatedSecondsRemaining: 0,
      error: "Refresh job not found.",
    };
  }

  if (job.status !== "running") {
    return progressFromJob(job);
  }

  const report = loadMaintenanceReport(job.reportId);
  if (!report) {
    job.status = "failed";
    job.error = "Report missing for job.";
    saveMaintenanceJob(job);
    return progressFromJob(job);
  }

  // Stop before beginning the next article (current already finished last step).
  if (job.stopRequested) {
    return finalizeStopped(job, report);
  }

  if (job.pendingSlugs.length === 0) {
    return finalizeSuccess(job, report);
  }

  const slug = job.pendingSlugs[0]!;
  const catalog = getAllEntriesSync();
  const entry = catalog.find((e) => e.slug === slug);

  job.currentSlug = slug;
  job.currentTitle = entry?.title ?? slug;
  saveMaintenanceJob(job);

  try {
    if (!entry) {
      throw new Error(`Catalog entry missing for slug "${slug}".`);
    }
    const proposed = await proposeDynamicMetadataForEntry(entry);
    const change = changeFromProposal(entry, proposed);
    job.providers = change.providers;
    report.changes.push(change);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    if (entry) {
      report.changes.push(failedChange(entry, message));
    } else {
      report.changes.push({
        slug,
        title: slug,
        category: report.category,
        beforeScores: { relevance: 0, influence: 0, cringe: 0, brainrot: 0 },
        afterScores: { relevance: 0, influence: 0, cringe: 0, brainrot: 0 },
        beforeTrendDirection: "stable",
        afterTrendDirection: "stable",
        beforeTrendingScore: null,
        afterTrendingScore: null,
        beforeCurrentRelevance: null,
        afterCurrentRelevance: null,
        relevanceDelta: null,
        trendingDelta: null,
        lastReviewed: new Date().toISOString().slice(0, 10),
        usedCatalogFallback: true,
        outcome: "failed",
        outcomeReason: message,
        providers: emptyProviders(),
        errorMessage: message,
      });
    }
    job.providers = emptyProviders();
  }

  job.pendingSlugs = job.pendingSlugs.slice(1);
  job.processedCount += 1;
  job.lastCompletedSlug = slug;
  recomputeSummaries(report);

  // After finishing this article, honor stop before peeking the next.
  if (job.stopRequested) {
    return finalizeStopped(job, report);
  }

  if (job.pendingSlugs.length === 0) {
    return finalizeSuccess(job, report);
  }

  const nextSlug = job.pendingSlugs[0]!;
  const nextEntry = catalog.find((e) => e.slug === nextSlug);
  job.currentSlug = nextSlug;
  job.currentTitle = nextEntry?.title ?? nextSlug;
  job.providers = emptyProviders();

  saveMaintenanceReport(report);
  saveMaintenanceJob(job);
  return progressFromJob(job);
}

/** Request stop after the in-flight article completes. */
export function stopCategoryRefresh(jobId: string): MaintenanceJobProgress {
  const job = loadMaintenanceJob(jobId);
  if (!job) {
    return {
      jobId,
      reportId: "",
      status: "failed",
      category: "meme",
      scopeLabel: "Unknown",
      total: 0,
      currentIndex: 0,
      currentTitle: null,
      currentSlug: null,
      providers: emptyProviders(),
      estimatedSecondsRemaining: 0,
      error: "Refresh job not found.",
    };
  }
  if (job.status !== "running") {
    return progressFromJob(job);
  }
  job.stopRequested = true;
  saveMaintenanceJob(job);
  return progressFromJob(job);
}

/** @deprecated use stopCategoryRefresh */
export const cancelCategoryRefresh = stopCategoryRefresh;

export function getCategoryRefreshProgress(
  jobId: string,
): MaintenanceJobProgress | null {
  const job = loadMaintenanceJob(jobId);
  if (!job) return null;
  return progressFromJob(job);
}

export function getCategoryResumeInfo(category: MaintenanceCategoryFilter) {
  return loadCategoryResume(category);
}
