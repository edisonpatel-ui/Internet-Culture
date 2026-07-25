/**
 * Persist in-progress category refresh jobs so stepped server actions
 * always finish (SUCCESS | FAILED | STOPPED) instead of hanging one request.
 */

import fs from "node:fs";
import path from "node:path";
import type {
  MaintenanceCategoryFilter,
  MaintenanceJobStatus,
  MaintenanceProviderStatus,
} from "./types";

export interface MaintenanceRefreshJob {
  id: string;
  reportId: string;
  category: MaintenanceCategoryFilter;
  status: MaintenanceJobStatus;
  pendingSlugs: string[];
  /** Full ordered slug list for this category run (for resume cursor). */
  allSlugs: string[];
  /** Articles fully processed so far in this job */
  processedCount: number;
  total: number;
  currentTitle: string | null;
  currentSlug: string | null;
  providers: MaintenanceProviderStatus[];
  stopRequested: boolean;
  createdAt: string;
  error?: string;
  /** Last slug completed in this job (for resume). */
  lastCompletedSlug?: string | null;
}

const memory = new Map<string, MaintenanceRefreshJob>();

function dataDir(): string {
  return path.join(process.cwd(), ".data", "admin", "maintenance", "jobs");
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

export function saveMaintenanceJob(
  job: MaintenanceRefreshJob,
): MaintenanceRefreshJob {
  const clone = structuredClone(job);
  memory.set(clone.id, clone);
  ensureDir();
  fs.writeFileSync(filePath(clone.id), JSON.stringify(clone, null, 2), "utf8");
  return structuredClone(clone);
}

export function loadMaintenanceJob(
  id: string,
): MaintenanceRefreshJob | undefined {
  const mem = memory.get(id);
  if (mem) return structuredClone(mem);
  try {
    const raw = fs.readFileSync(filePath(id), "utf8");
    const parsed = JSON.parse(raw) as MaintenanceRefreshJob & {
      cancelRequested?: boolean;
    };
    if (parsed.stopRequested == null && parsed.cancelRequested != null) {
      parsed.stopRequested = parsed.cancelRequested;
    }
    if (!parsed.allSlugs) parsed.allSlugs = [...parsed.pendingSlugs];
    memory.set(parsed.id, parsed);
    return structuredClone(parsed);
  } catch {
    return undefined;
  }
}

export function deleteMaintenanceJob(id: string): void {
  memory.delete(id);
  try {
    const fp = filePath(id);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  } catch {
    // ignore
  }
}
