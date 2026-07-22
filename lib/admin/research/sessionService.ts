/**
 * Research session service — mock in-memory store for browsing sessions.
 * Editorial approval lives in Research Review (ApprovedResearch), not here.
 */

import type {
  CreateResearchSessionInput,
  ResearchSession,
  UpdateResearchSessionInput,
} from "@/types/admin";
import { MOCK_RESEARCH_SESSIONS } from "./mockData";
import { validateSession } from "./validation";

/** Mutable clone of mock data for the process lifetime. */
let store: ResearchSession[] = structuredClone(MOCK_RESEARCH_SESSIONS).map(
  normalizeSession,
);

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeSession(session: ResearchSession): ResearchSession {
  return {
    ...session,
    recommendationResolutions: session.recommendationResolutions ?? [],
  };
}

function appendActivity(
  session: ResearchSession,
  message: string,
  actor = "system",
): void {
  session.activityLog = [
    ...session.activityLog,
    {
      id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      at: nowIso(),
      actor,
      message,
    },
  ];
}

export function listSessions(): ResearchSession[] {
  return store.map((s) => structuredClone(normalizeSession(s)));
}

export function listActiveSessions(): ResearchSession[] {
  return listSessions().filter((s) => s.status !== "archived");
}

export function loadSession(id: string): ResearchSession | null {
  const found = store.find((s) => s.id === id);
  return found ? structuredClone(normalizeSession(found)) : null;
}

export function createSession(
  input: CreateResearchSessionInput,
): ResearchSession {
  const topic = input.topic.trim();
  if (!topic) {
    throw new Error("createSession: topic is required");
  }

  const createdAt = nowIso();
  const session: ResearchSession = {
    id: `rs_${Date.now().toString(36)}`,
    topic,
    status: "active",
    createdAt,
    updatedAt: createdAt,
    notes: input.notes?.trim() ?? "",
    tags: input.tags ?? [],
    priority: input.priority ?? "medium",
    assignedTo: input.assignedTo,
    workflowStage: "ResearchRequested",
    sources: [],
    timeline: [],
    entities: [],
    relationships: [],
    internalLinks: [],
    confidence: [],
    coverageNotes: [],
    aiSuggestions: [],
    recommendationResolutions: [],
    activityLog: [
      {
        id: `act_${Date.now()}`,
        at: createdAt,
        actor: "system",
        message: "Session created",
      },
    ],
  };

  store = [session, ...store];
  return structuredClone(session);
}

export function updateSession(
  id: string,
  patch: UpdateResearchSessionInput,
): ResearchSession {
  const index = store.findIndex((s) => s.id === id);
  if (index < 0) {
    throw new Error(`updateSession: session not found: ${id}`);
  }

  const current = normalizeSession(structuredClone(store[index]!));
  const next: ResearchSession = {
    ...current,
    topic: patch.topic !== undefined ? patch.topic.trim() : current.topic,
    status: patch.status ?? current.status,
    notes: patch.notes !== undefined ? patch.notes : current.notes,
    tags: patch.tags ?? current.tags,
    priority: patch.priority ?? current.priority,
    assignedTo:
      patch.assignedTo === null
        ? undefined
        : (patch.assignedTo ?? current.assignedTo),
    workflowStage: patch.workflowStage ?? current.workflowStage,
    sources: patch.sources ?? current.sources,
    timeline: patch.timeline ?? current.timeline,
    entities: patch.entities ?? current.entities,
    relationships: patch.relationships ?? current.relationships,
    internalLinks: patch.internalLinks ?? current.internalLinks,
    confidence: patch.confidence ?? current.confidence,
    coverageNotes: patch.coverageNotes ?? current.coverageNotes,
    aiSuggestions: patch.aiSuggestions ?? current.aiSuggestions,
    recommendationResolutions:
      patch.recommendationResolutions ?? current.recommendationResolutions,
    updatedAt: nowIso(),
  };

  appendActivity(next, "Session updated");
  store[index] = next;
  return structuredClone(next);
}

export function archiveSession(id: string): ResearchSession {
  return updateSession(id, {
    status: "archived",
    workflowStage: "Archived",
  });
}

export { validateSession };

/** Test helper — reset store to fixture (not for production UI). */
export function resetResearchSessionStore(): void {
  store = structuredClone(MOCK_RESEARCH_SESSIONS).map(normalizeSession);
}
