/**
 * In-memory Topic Assessment store.
 */

import type { TopicAssessment } from "./initialAssessment";

const store = new Map<string, TopicAssessment>();

export function saveAssessment(a: TopicAssessment): TopicAssessment {
  store.set(a.id, a);
  return a;
}

export function loadAssessment(id: string): TopicAssessment | undefined {
  return store.get(id);
}

export function listAssessments(): TopicAssessment[] {
  return [...store.values()].sort((a, b) =>
    b.assessedAt.localeCompare(a.assessedAt),
  );
}
