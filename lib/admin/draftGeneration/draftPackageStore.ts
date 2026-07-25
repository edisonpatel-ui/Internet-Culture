/**
 * DraftPackage store — memory + .data persistence.
 * Disk is required so Generate Draft → Preview survives separate
 * server-action / RSC isolates (was causing 404 after generate).
 */

import fs from "node:fs";
import path from "node:path";
import type { DraftPackage } from "@/lib/ai/packages";

let store: DraftPackage[] = [];
let hydrated = false;

function dataDir(): string {
  return path.join(process.cwd(), ".data", "admin", "drafts");
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

function hydrateFromDisk(): void {
  if (hydrated) return;
  hydrated = true;
  try {
    ensureDir();
    for (const name of fs.readdirSync(dataDir())) {
      if (!name.endsWith(".json")) continue;
      try {
        const raw = fs.readFileSync(path.join(dataDir(), name), "utf8");
        const pkg = JSON.parse(raw) as DraftPackage;
        if (!pkg?.id) continue;
        if (!store.some((d) => d.id === pkg.id)) {
          store.push(pkg);
        }
      } catch {
        // skip corrupt file
      }
    }
  } catch {
    // disk optional until first write
  }
}

function persistOne(pkg: DraftPackage): void {
  try {
    ensureDir();
    fs.writeFileSync(filePath(pkg.id), JSON.stringify(pkg, null, 2), "utf8");
  } catch {
    // memory still holds the draft for this process
  }
}

function removeFile(id: string): void {
  try {
    const fp = filePath(id);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  } catch {
    // ignore
  }
}

export function listDraftPackages(): DraftPackage[] {
  hydrateFromDisk();
  return store.map((d) => structuredClone(d));
}

export function loadDraftPackage(id: string): DraftPackage | null {
  hydrateFromDisk();
  const found = store.find((d) => d.id === id);
  if (found) return structuredClone(found);
  try {
    const raw = fs.readFileSync(filePath(id), "utf8");
    const pkg = JSON.parse(raw) as DraftPackage;
    if (pkg?.id) {
      store = [pkg, ...store.filter((d) => d.id !== pkg.id)];
      return structuredClone(pkg);
    }
  } catch {
    // miss
  }
  return null;
}

export function findDraftPackageByApprovedResearchId(
  approvedResearchId: string,
): DraftPackage | null {
  hydrateFromDisk();
  const found = store.find((d) => d.approvedResearchId === approvedResearchId);
  return found ? structuredClone(found) : null;
}

export function saveDraftPackage(pkg: DraftPackage): DraftPackage {
  hydrateFromDisk();
  const clone = structuredClone(pkg);
  const index = store.findIndex((d) => d.id === clone.id);
  if (index < 0) {
    store = [clone, ...store];
  } else {
    store[index] = clone;
  }
  persistOne(clone);
  return structuredClone(clone);
}

export function deleteDraftPackage(id: string): boolean {
  hydrateFromDisk();
  const before = store.length;
  store = store.filter((d) => d.id !== id);
  removeFile(id);
  return store.length < before;
}

/** Remove drafts grounded on a given ApprovedResearch id. */
export function deleteDraftsByApprovedResearchId(
  approvedResearchId: string,
): number {
  hydrateFromDisk();
  const toRemove = store.filter(
    (d) => d.approvedResearchId === approvedResearchId,
  );
  const before = store.length;
  store = store.filter((d) => d.approvedResearchId !== approvedResearchId);
  for (const d of toRemove) removeFile(d.id);
  return before - store.length;
}

export function resetDraftPackageStore(): void {
  store = [];
  hydrated = false;
}
