/**
 * Editorial workflow state machine (RC3-B).
 *
 * Typed states + transition helpers. Invalid transitions throw.
 * Side-effect free — no I/O, no providers, no content writes.
 */

/** Lifecycle states for an internal editorial job. */
export type EditorialState =
  | "ResearchRequested"
  | "ResearchComplete"
  | "DraftGenerated"
  | "HumanEditing"
  | "EditorialReview"
  | "SEOReview"
  | "Approved"
  | "Published"
  | "NeedsUpdate"
  | "Archived";

/** Allowed next states from each state. */
export const EDITORIAL_TRANSITIONS: Record<
  EditorialState,
  readonly EditorialState[]
> = {
  ResearchRequested: ["ResearchComplete", "Archived"],
  ResearchComplete: ["DraftGenerated", "HumanEditing", "Archived"],
  DraftGenerated: ["HumanEditing", "EditorialReview", "Archived"],
  HumanEditing: ["EditorialReview", "DraftGenerated", "Archived"],
  EditorialReview: ["SEOReview", "HumanEditing", "Approved", "Archived"],
  SEOReview: ["Approved", "HumanEditing", "EditorialReview", "Archived"],
  Approved: ["Published", "HumanEditing", "Archived"],
  Published: ["NeedsUpdate", "Archived"],
  NeedsUpdate: ["ResearchRequested", "HumanEditing", "Archived"],
  Archived: [],
} as const;

export function canTransition(
  from: EditorialState,
  to: EditorialState,
): boolean {
  return EDITORIAL_TRANSITIONS[from].includes(to);
}

/**
 * Returns `to` if the transition is allowed; otherwise throws.
 */
export function transition(
  from: EditorialState,
  to: EditorialState,
): EditorialState {
  if (!canTransition(from, to)) {
    throw new Error(
      `Invalid editorial transition: ${from} → ${to}. Allowed: ${
        EDITORIAL_TRANSITIONS[from].join(", ") || "(none)"
      }`,
    );
  }
  return to;
}

/** Terminal states (no further forward progress without a new job). */
export function isTerminalState(state: EditorialState): boolean {
  return EDITORIAL_TRANSITIONS[state].length === 0;
}

/** States where AI suggestions may still be requested (not published/archived). */
export function isPrePublishState(state: EditorialState): boolean {
  return (
    state !== "Published" &&
    state !== "Archived" &&
    state !== "NeedsUpdate"
  );
}

/**
 * In-memory editorial job handle — architecture only.
 * Future tooling may persist this; RC3-B does not.
 */
export interface EditorialJob {
  id: string;
  topic: string;
  state: EditorialState;
  createdAt: string;
  updatedAt: string;
}

export function createEditorialJob(
  topic: string,
  id: string = `job_${Date.now()}`,
): EditorialJob {
  const now = new Date().toISOString();
  return {
    id,
    topic,
    state: "ResearchRequested",
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Advance a job to a new state via {@link transition}.
 * Does not persist — returns a new object.
 */
export function advanceEditorialJob(
  job: EditorialJob,
  to: EditorialState,
): EditorialJob {
  const state = transition(job.state, to);
  return {
    ...job,
    state,
    updatedAt: new Date().toISOString(),
  };
}
