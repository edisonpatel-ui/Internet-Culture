/**
 * Pure calculation of "what does this update session actually change" —
 * no filesystem access. Deliberately kept separate from
 * applyScopedPatch.ts (which writes to disk) so that pages which only
 * need the preview calculation — like the update preview page — don't
 * pull filesystem-mutating code into their build trace.
 */

import type { ArticleUpdateSession } from "./store";

export interface ScopedFieldUpdates {
  description?: string;
  origin?: string;
  meaning?: string;
  definition?: string;
  impact?: string;
  timeline?: { date: string; event: string }[];
}

/**
 * The single source of truth for "what does this update session actually
 * change". Used by both the apply step and the preview, so the preview can
 * never show something different from what Approve will actually do.
 *
 * Deliberately never includes meaning/definition/impact — a term's core
 * definition is never touched by a scoped update.
 */
export function deriveScopedFieldUpdates(
  session: ArticleUpdateSession,
): ScopedFieldUpdates {
  const changed = new Map(
    session.diffs.filter((d) => d.changed).map((d) => [d.field, d]),
  );
  const fieldUpdates: ScopedFieldUpdates = {};

  if (changed.has("description")) fieldUpdates.description = changed.get("description")!.after;
  if (changed.has("origin")) fieldUpdates.origin = changed.get("origin")!.after;
  if (changed.has("timeline")) {
    fieldUpdates.timeline = session.proposedDraft.timeline.map((t) => ({
      date: t.date,
      event: t.event,
    }));
  }

  return fieldUpdates;
}
