/**
 * In-memory ApprovedResearch store (Phase 2A).
 * No database. No providers. No publish.
 */

import type { ApprovedResearch, CreateApprovedResearchInput } from "@/lib/ai/packages";
import { createApprovedResearch } from "@/lib/ai/packages";

let store: ApprovedResearch[] = [];

export function listApprovedResearch(): ApprovedResearch[] {
  return store.map((a) => structuredClone(a));
}

export function loadApprovedResearch(id: string): ApprovedResearch | null {
  const found = store.find((a) => a.id === id);
  return found ? structuredClone(found) : null;
}

export function findApprovedByPackageId(
  packageId: string,
): ApprovedResearch | null {
  const found = store.find((a) => a.researchPackageId === packageId);
  return found ? structuredClone(found) : null;
}

export function saveApprovedResearch(
  input: CreateApprovedResearchInput,
): ApprovedResearch {
  const existing = findApprovedByPackageId(input.researchPackage.id);
  if (existing) {
    store = store.filter((a) => a.id !== existing.id);
  }
  const approved = createApprovedResearch(input);
  store = [approved, ...store];
  return structuredClone(approved);
}

/** Remove approval(s) linked to a ResearchPackage. */
export function deleteApprovedByPackageId(packageId: string): number {
  const before = store.length;
  store = store.filter((a) => a.researchPackageId !== packageId);
  return before - store.length;
}

export function deleteApprovedResearch(id: string): boolean {
  const before = store.length;
  store = store.filter((a) => a.id !== id);
  return store.length < before;
}

export function resetApprovedResearchStore(): void {
  store = [];
}
