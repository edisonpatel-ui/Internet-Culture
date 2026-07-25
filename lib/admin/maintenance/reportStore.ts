/**
 * In-memory + .data persistence for maintenance refresh reports.
 * Disk write is required so reports open after stepped refreshes.
 */

import fs from "node:fs";
import path from "node:path";
import type { MaintenanceRefreshReport } from "./types";
import { ESTIMATED_SECONDS_PER_ARTICLE } from "./types";

const memory = new Map<string, MaintenanceRefreshReport>();

function dataDir(): string {
  return path.join(process.cwd(), ".data", "admin", "maintenance", "reports");
}

function ensureDir(): void {
  const dir = dataDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function filePath(id: string): string {
  const safe = id.replace(/[^a-zA-Z0-9_-]/g, "");
  return path.join(dataDir(), `${safe}.json`);
}

/** Backfill fields for reports saved before stepped category refresh. */
function normalizeReport(
  raw: MaintenanceRefreshReport,
): MaintenanceRefreshReport {
  const changes = (raw.changes ?? []).map((c) => ({
    ...c,
    beforeCurrentRelevance: c.beforeCurrentRelevance ?? null,
    afterCurrentRelevance:
      c.afterCurrentRelevance ??
      (c.after?.dynamicMetadata?.currentRelevance as
        | number
        | "unknown"
        | null
        | undefined) ??
      null,
    outcome: c.outcome ?? (c.errorMessage ? "failed" : "updated"),
    outcomeReason:
      c.outcomeReason ??
      c.popularityNotes ??
      (c.errorMessage
        ? c.errorMessage
        : "See score deltas and review notes."),
    providers: c.providers ?? [],
  }));

  return {
    ...raw,
    jobStatus: (() => {
      const js = raw.jobStatus as string | undefined;
      if (js === "cancelled") return "stopped" as const;
      if (
        js === "running" ||
        js === "success" ||
        js === "failed" ||
        js === "stopped"
      ) {
        return js;
      }
      return "success" as const;
    })(),
    category: raw.category ?? "meme",
    processedCount: raw.processedCount ?? changes.length,
    unknownCount:
      raw.unknownCount ??
      changes.filter((c) => c.outcome === "unknown").length,
    failedCount:
      raw.failedCount ?? changes.filter((c) => c.outcome === "failed").length,
    unchangedCount: raw.unchangedCount ?? 0,
    largestRelevanceChanges: raw.largestRelevanceChanges ?? [],
    largestTrendingChanges: raw.largestTrendingChanges ?? [],
    notes: raw.notes ?? [],
    estimatedSecondsPerArticle:
      raw.estimatedSecondsPerArticle ?? ESTIMATED_SECONDS_PER_ARTICLE,
    changes,
  };
}

export function saveMaintenanceReport(
  report: MaintenanceRefreshReport,
): MaintenanceRefreshReport {
  const clone = normalizeReport(structuredClone(report));
  memory.set(clone.id, clone);
  ensureDir();
  fs.writeFileSync(filePath(clone.id), JSON.stringify(clone, null, 2), "utf8");
  return structuredClone(clone);
}

export function loadMaintenanceReport(
  id: string,
): MaintenanceRefreshReport | undefined {
  const mem = memory.get(id);
  if (mem) return structuredClone(normalizeReport(mem));
  try {
    const raw = fs.readFileSync(filePath(id), "utf8");
    const parsed = normalizeReport(JSON.parse(raw) as MaintenanceRefreshReport);
    memory.set(parsed.id, parsed);
    return structuredClone(parsed);
  } catch {
    return undefined;
  }
}

export function listMaintenanceReports(): MaintenanceRefreshReport[] {
  try {
    ensureDir();
    for (const name of fs.readdirSync(dataDir())) {
      if (!name.endsWith(".json")) continue;
      const id = name.replace(/\.json$/, "");
      if (!memory.has(id)) {
        loadMaintenanceReport(id);
      }
    }
  } catch {
    // ignore listing errors; memory may still have reports
  }
  return [...memory.values()]
    .map((r) => structuredClone(r))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function discardMaintenanceReport(id: string): boolean {
  memory.delete(id);
  try {
    const fp = filePath(id);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  } catch {
    // ignore
  }
  return true;
}
