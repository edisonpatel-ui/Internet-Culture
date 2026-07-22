/**
 * Lightweight Knowledge Engine run log for Settings (in-memory).
 */

export interface EngineLogEntry {
  id: string;
  at: string;
  kind: "create" | "revise" | "update";
  topic: string;
  draftId?: string;
  slug?: string;
  unknownFields: number;
  stagesAttempted: number;
  readyForEditor: boolean;
  notes?: string;
}

const MAX = 50;
let log: EngineLogEntry[] = [];

export function recordEngineRun(
  entry: Omit<EngineLogEntry, "id" | "at">,
): EngineLogEntry {
  const full: EngineLogEntry = {
    ...entry,
    id: `elog_${Date.now().toString(36)}`,
    at: new Date().toISOString(),
  };
  log = [full, ...log].slice(0, MAX);
  return full;
}

export function listEngineRuns(): EngineLogEntry[] {
  return [...log];
}

export function engineStats() {
  const runs = listEngineRuns();
  const withUnknown = runs.filter((r) => r.unknownFields > 0).length;
  return {
    totalRuns: runs.length,
    createRuns: runs.filter((r) => r.kind === "create").length,
    reviseRuns: runs.filter((r) => r.kind === "revise").length,
    updateRuns: runs.filter((r) => r.kind === "update").length,
    unknownRate: runs.length ? withUnknown / runs.length : 0,
    recent: runs.slice(0, 10),
  };
}

export function resetEngineLog(): void {
  log = [];
}
