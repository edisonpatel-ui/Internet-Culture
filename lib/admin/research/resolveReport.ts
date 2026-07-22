/**
 * Resolve a ResearchReport for a workspace session (RC4-D).
 * Uses RC4-C mock reports / builder — no providers.
 */

import type { ResearchSession } from "@/types/admin";
import {
  buildResearchReport,
  getMockReportByTopic,
  MOCK_RESEARCH_REPORTS,
  type ResearchReport,
} from "./intelligence";

function normalizeTopic(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/\s*—\s*.*$/, "")
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Fuzzy-match curated mock reports (e.g. "Skibidi Toilet — update check"). */
export function findMockReportForTopic(topic: string): ResearchReport | undefined {
  const exact = getMockReportByTopic(topic);
  if (exact) return exact;

  const normalized = normalizeTopic(topic);
  return MOCK_RESEARCH_REPORTS.find((r) => {
    const rt = r.topic.toLowerCase();
    return (
      normalized === rt ||
      normalized.includes(rt) ||
      rt.includes(normalized) ||
      topic.toLowerCase().includes(rt)
    );
  });
}

/**
 * Prefer curated mock report when available; otherwise generate via mock engine.
 * Overlay session notes into researchNotes for workspace display.
 */
export function resolveReportForSession(session: ResearchSession): ResearchReport {
  const curated = findMockReportForTopic(session.topic);
  const base =
    curated ??
    buildResearchReport({
      topic: normalizeTopic(session.topic) || session.topic,
      sessionId: session.id,
      notes: session.notes,
      tags: session.tags,
      seedSources: session.sources.map((s) => ({
        title: s.title,
        url: s.url,
      })),
    }).report;

  const sessionNotes = session.notes.trim()
    ? [`Session notes: ${session.notes.trim()}`, ...base.researchNotes]
    : base.researchNotes;

  const coverageNotesAsGaps = session.coverageNotes.map((note, i) => ({
    id: `session-cov-${i}`,
    title: note,
    reason: "From session coverage notes",
    priority: "medium" as const,
  }));

  return {
    ...base,
    id: `workspace-${session.id}`,
    topic: session.topic,
    researchNotes: sessionNotes,
    potentialMissingEntries: [
      ...base.potentialMissingEntries,
      ...coverageNotesAsGaps.filter(
        (g) =>
          !base.potentialMissingEntries.some((e) => e.title === g.title),
      ),
    ],
  };
}
