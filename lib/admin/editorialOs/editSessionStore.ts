/**
 * Editorial OS v2 — Edit sessions (revision queue).
 */

import type { DraftPackage } from "@/lib/ai/packages";

export interface EditSession {
  id: string;
  draftId: string;
  editorComment: string;
  previousDraft: DraftPackage;
  revisedDraft: DraftPackage;
  createdAt: string;
  updatedAt: string;
  status: "open" | "published";
  changeSummary: string;
}

let store: EditSession[] = [];

export function listEditSessions(): EditSession[] {
  return store
    .filter((s) => s.status === "open")
    .map((s) => structuredClone(s))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function listAllEditSessions(): EditSession[] {
  return store.map((s) => structuredClone(s));
}

export function loadEditSession(id: string): EditSession | null {
  const found = store.find((s) => s.id === id);
  return found ? structuredClone(found) : null;
}

export function saveEditSession(session: EditSession): EditSession {
  const index = store.findIndex((s) => s.id === session.id);
  if (index < 0) {
    store = [structuredClone(session), ...store];
  } else {
    store[index] = structuredClone(session);
  }
  return structuredClone(session);
}

export function deleteEditSessionsForDraft(draftId: string): number {
  const before = store.length;
  store = store.filter((s) => s.draftId !== draftId);
  return before - store.length;
}

export function resetEditSessionStore(): void {
  store = [];
}
