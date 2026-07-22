/**
 * Timeline analysis — chronological scaffolding with approximate dating.
 * Prefer responsible estimates over "unknown" blanks.
 */

import type {
  Evidence,
  ResearchInput,
  TimelineAnalyzer,
  TimelineEvent,
} from "./types";

function inferYear(input: ResearchInput, evidence: Evidence[]): string {
  for (const e of evidence) {
    const blob = `${e.sourceTitle} ${e.notes ?? ""} ${e.sourceUrl ?? ""}`;
    const m = blob.match(/\b(20[0-2]\d)\b/);
    if (m) return m[1];
  }
  for (const tag of input.tags ?? []) {
    const m = tag.match(/\b(20[0-2]\d)\b/);
    if (m) return m[1];
  }
  return "early 2020s";
}

export const mockTimelineAnalyzer: TimelineAnalyzer = {
  analyze(input: ResearchInput, evidence: Evidence[]) {
    const topic = input.topic;
    const year = inferYear(input, evidence);
    const timeline: TimelineEvent[] = [
      {
        id: "tl-1",
        date: `c. ${year}`,
        precision: "approx",
        description: `Earliest documented community discussion and uploads associated with ${topic}.`,
        confidence: 0.55,
        importance: "critical",
        sources: evidence.slice(0, 2).map((e) => e.id),
      },
      {
        id: "tl-2",
        date: "spread phase",
        precision: "approx",
        description: `${topic} spreads through remix, sound reuse, and creator amplification on major platforms.`,
        confidence: 0.6,
        importance: "major",
      },
      {
        id: "tl-3",
        date: "mainstream notice",
        precision: "approx",
        description: `${topic} reaches broader awareness via press coverage, large creator channels, or culture-archive documentation.`,
        confidence: 0.5,
        importance: "major",
      },
      {
        id: "tl-4",
        date: "encyclopedia framing",
        precision: "day",
        description: `Internet Culture Hub prepares a complete encyclopedia framing for ${topic}.`,
        confidence: 0.75,
        importance: "minor",
      },
    ];

    const importantEvents = timeline.filter(
      (e) => e.importance === "critical" || e.importance === "major",
    );

    return { timeline, importantEvents };
  },
};
