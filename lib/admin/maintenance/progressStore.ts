/**
 * Persist category refresh cursor so Stop → Resume continues mid-category.
 */

import fs from "node:fs";
import path from "node:path";
import type { MaintenanceCategoryFilter } from "./types";

export interface CategoryResumeState {
  category: MaintenanceCategoryFilter;
  lastCompletedSlug: string | null;
  completedCount: number;
  updatedAt: string;
  lastReportId?: string;
}

function dataDir(): string {
  return path.join(process.cwd(), ".data", "admin", "maintenance", "resume");
}

function ensureDir(): void {
  const dir = dataDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function filePath(category: MaintenanceCategoryFilter): string {
  return path.join(dataDir(), `${category}.json`);
}

export function loadCategoryResume(
  category: MaintenanceCategoryFilter,
): CategoryResumeState | null {
  try {
    const raw = fs.readFileSync(filePath(category), "utf8");
    return JSON.parse(raw) as CategoryResumeState;
  } catch {
    return null;
  }
}

export function saveCategoryResume(state: CategoryResumeState): void {
  ensureDir();
  fs.writeFileSync(
    filePath(state.category),
    JSON.stringify(state, null, 2),
    "utf8",
  );
}

export function clearCategoryResume(category: MaintenanceCategoryFilter): void {
  try {
    const fp = filePath(category);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  } catch {
    // ignore
  }
}
