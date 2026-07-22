/**
 * In-memory ApprovedDraft store (Phase 4).
 */

import type { ApprovedDraft, CreateApprovedDraftInput } from "@/lib/ai/packages";
import { createApprovedDraft } from "@/lib/ai/packages";

let store: ApprovedDraft[] = [];

export function listApprovedDrafts(): ApprovedDraft[] {
  return store.map((a) => structuredClone(a));
}

export function loadApprovedDraft(id: string): ApprovedDraft | null {
  const found = store.find((a) => a.id === id);
  return found ? structuredClone(found) : null;
}

export function findApprovedDraftByPackageId(
  draftPackageId: string,
): ApprovedDraft | null {
  const found = store.find((a) => a.draftPackageId === draftPackageId);
  return found ? structuredClone(found) : null;
}

export function saveApprovedDraft(
  input: CreateApprovedDraftInput,
): ApprovedDraft {
  const existing = findApprovedDraftByPackageId(input.draftPackage.id);
  if (existing) {
    store = store.filter((a) => a.id !== existing.id);
  }
  const approved = createApprovedDraft(input);
  store = [approved, ...store];
  return structuredClone(approved);
}

export function resetApprovedDraftStore(): void {
  store = [];
}
