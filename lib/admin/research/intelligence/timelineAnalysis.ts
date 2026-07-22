/**
 * Timeline analysis — dated milestones from evidence only.
 * Never invent generic spread / mainstream / encyclopedia framing rows.
 */

import type {
  Evidence,
  ResearchInput,
  TimelineAnalyzer,
  TimelineEvent,
} from "./types";

function hasUrl(url?: string): boolean {
  return Boolean(url?.trim() && /^https?:\/\//i.test(url.trim()));
}

function yearsFromEvidence(evidence: Evidence[]): string[] {
  const years: string[] = [];
  for (const e of evidence) {
    if (!hasUrl(e.sourceUrl)) continue;
    const blob = `${e.sourceTitle} ${e.notes ?? ""} ${e.sourceUrl ?? ""} ${e.claim}`;
    const matches = blob.match(/\b(19\d{2}|20[0-2]\d)\b/g);
    if (matches) {
      for (const y of matches) {
        if (!years.includes(y)) years.push(y);
      }
    }
  }
  return years.sort();
}

export const mockTimelineAnalyzer: TimelineAnalyzer = {
  analyze(input: ResearchInput, evidence: Evidence[]) {
    const years = yearsFromEvidence(evidence);
    const timeline: TimelineEvent[] = [];

    // Only emit a timeline row when a year is literally present in URL-backed evidence.
    for (const year of years.slice(0, 5)) {
      timeline.push({
        id: `tl-${year}`,
        date: year,
        precision: "year",
        description: `Dated reference to ${input.topic} appears in retrieved source material (${year}).`,
        confidence: 0.55,
        importance: "major",
        sources: evidence
          .filter((e) => hasUrl(e.sourceUrl) && `${e.sourceTitle} ${e.claim}`.includes(year))
          .map((e) => e.id)
          .slice(0, 3),
      });
    }

    if (timeline.length === 0) {
      return { timeline: [], importantEvents: [] };
    }

    const importantEvents = timeline.filter(
      (e) => e.importance === "critical" || e.importance === "major",
    );
    return { timeline, importantEvents };
  },
};
