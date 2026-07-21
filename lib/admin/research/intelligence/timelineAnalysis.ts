/**
 * Timeline analysis — builds chronological scaffolding from research input.
 */

import type {
  Evidence,
  ResearchInput,
  TimelineAnalyzer,
  TimelineEvent,
} from "./types";

export const mockTimelineAnalyzer: TimelineAnalyzer = {
  analyze(input: ResearchInput, _evidence: Evidence[]) {
    const topic = input.topic;
    const timeline: TimelineEvent[] = [
      {
        id: "tl-1",
        date: "unknown",
        precision: "unknown",
        description: `Earliest documented appearance of ${topic} (to be researched).`,
        confidence: 0.2,
        importance: "critical",
        sources: [],
      },
      {
        id: "tl-2",
        date: "approx",
        precision: "approx",
        description: `Period of rapid platform spread for ${topic}.`,
        confidence: 0.3,
        importance: "major",
      },
      {
        id: "tl-3",
        date: "approx",
        precision: "approx",
        description: `Mainstream / press notice or encyclopedia documentation of ${topic}.`,
        confidence: 0.3,
        importance: "major",
      },
    ];

    const importantEvents = timeline.filter(
      (e) => e.importance === "critical" || e.importance === "major",
    );

    return { timeline, importantEvents };
  },
};
