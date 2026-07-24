/**
 * In-memory + optional .data persistence for maintenance refresh reports.
 * Never commits git; never deploys.
 */

import fs from "node:fs";
import path from "node:path";
import type { MaintenanceRefreshReport } from "./types";

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

export function saveMaintenanceReport(
  report: MaintenanceRefreshReport,
): MaintenanceRefreshReport {
  const clone = structuredClone(report);
  memory.set(clone.id, clone);
  try {
    ensureDir();
    fs.writeFileSync(filePath(clone.id), JSON.stringify(clone, null, 2), "utf8");
  } catch {
    // Disk optional — memory still holds the report for this process.
  }
  return structuredClone(clone);
}

export function loadMaintenanceReport(
  id: string,
): MaintenanceRefreshReport | undefined {
  const mem = memory.get(id);
  if (mem) return structuredClone(mem);
  try {
    const raw = fs.readFileSync(filePath(id), "utf8");
    const parsed = JSON.parse(raw) as MaintenanceRefreshReport;
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
    // ignore
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
