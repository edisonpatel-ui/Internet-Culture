/**
 * Editorial OS v2 — Edit sessions (revision queue).
 * Memory + .data persistence so Preview Updated → Publish survives isolates.
 */

import fs from "node:fs";
import path from "node:path";
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
let hydrated = false;

function dataDir(): string {
  return path.join(process.cwd(), ".data", "admin", "edits");
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
        const session = JSON.parse(raw) as EditSession;
        if (!session?.id) continue;
        if (!store.some((s) => s.id === session.id)) {
          store.push(session);
        }
      } catch {
        // skip
      }
    }
  } catch {
    // ignore
  }
}

function persistOne(session: EditSession): void {
  try {
    ensureDir();
    fs.writeFileSync(
      filePath(session.id),
      JSON.stringify(session, null, 2),
      "utf8",
    );
  } catch {
    // memory still holds
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

export function listEditSessions(): EditSession[] {
  hydrateFromDisk();
  return store
    .filter((s) => s.status === "open")
    .map((s) => structuredClone(s))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function listAllEditSessions(): EditSession[] {
  hydrateFromDisk();
  return store.map((s) => structuredClone(s));
}

export function loadEditSession(id: string): EditSession | null {
  hydrateFromDisk();
  const found = store.find((s) => s.id === id);
  if (found) return structuredClone(found);
  try {
    const raw = fs.readFileSync(filePath(id), "utf8");
    const session = JSON.parse(raw) as EditSession;
    if (session?.id) {
      store = [session, ...store.filter((s) => s.id !== session.id)];
      return structuredClone(session);
    }
  } catch {
    // miss
  }
  return null;
}

export function saveEditSession(session: EditSession): EditSession {
  hydrateFromDisk();
  const clone = structuredClone(session);
  const index = store.findIndex((s) => s.id === clone.id);
  if (index < 0) {
    store = [clone, ...store];
  } else {
    store[index] = clone;
  }
  persistOne(clone);
  return structuredClone(clone);
}

export function deleteEditSessionsForDraft(draftId: string): number {
  hydrateFromDisk();
  const toRemove = store.filter((s) => s.draftId === draftId);
  const before = store.length;
  store = store.filter((s) => s.draftId !== draftId);
  for (const s of toRemove) removeFile(s.id);
  return before - store.length;
}

export function resetEditSessionStore(): void {
  store = [];
  hydrated = false;
}
