/**
 * In-memory store for published article update sessions.
 */

import type { UpdatePackage } from "@/lib/ai/packages";
import type { FieldDiff } from "./diff";
import type { DraftPackage } from "@/lib/ai/packages";

export interface ArticleUpdateSession {
  id: string;
  slug: string;
  title: string;
  category: string;
  request: string;
  createdAt: string;
  updatePackage: UpdatePackage;
  /** Proposed article body for preview. */
  proposedDraft: DraftPackage;
  diffs: FieldDiff[];
  status: "preview" | "approved" | "applied";
}

const sessions = new Map<string, ArticleUpdateSession>();

export function saveUpdateSession(
  session: ArticleUpdateSession,
): ArticleUpdateSession {
  sessions.set(session.id, session);
  return session;
}

export function loadUpdateSession(
  id: string,
): ArticleUpdateSession | undefined {
  return sessions.get(id);
}

export function findUpdateSessionBySlug(
  slug: string,
): ArticleUpdateSession | undefined {
  return [...sessions.values()]
    .filter((s) => s.slug === slug)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}

export function listUpdateSessions(): ArticleUpdateSession[] {
  return [...sessions.values()].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}
