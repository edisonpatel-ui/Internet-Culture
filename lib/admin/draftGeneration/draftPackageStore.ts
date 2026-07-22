/**
 * In-memory DraftPackage store (Phase 3).
 * No database. No providers. No lib/content writes.
 */

import type { DraftPackage } from "@/lib/ai/packages";

let store: DraftPackage[] = [];

export function listDraftPackages(): DraftPackage[] {
  return store.map((d) => structuredClone(d));
}

export function loadDraftPackage(id: string): DraftPackage | null {
  const found = store.find((d) => d.id === id);
  return found ? structuredClone(found) : null;
}

export function findDraftPackageByApprovedResearchId(
  approvedResearchId: string,
): DraftPackage | null {
  const found = store.find((d) => d.approvedResearchId === approvedResearchId);
  return found ? structuredClone(found) : null;
}

export function saveDraftPackage(pkg: DraftPackage): DraftPackage {
  const index = store.findIndex((d) => d.id === pkg.id);
  if (index < 0) {
    store = [structuredClone(pkg), ...store];
  } else {
    store[index] = structuredClone(pkg);
  }
  return structuredClone(pkg);
}

export function resetDraftPackageStore(): void {
  store = [];
}
