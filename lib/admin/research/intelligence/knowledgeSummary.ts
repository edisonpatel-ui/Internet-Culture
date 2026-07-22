/**
 * Knowledge summary — encyclopedia-ready prose (mock).
 * Completeness philosophy: deliver usable synthesis, not scaffolding homework.
 */

import type { Evidence, KnowledgeSummarizer, ResearchInput } from "./types";

export const mockKnowledgeSummarizer: KnowledgeSummarizer = {
  summarize(input: ResearchInput, evidence: Evidence[]) {
    const topic = input.topic;
    return {
      executiveSummary: `${topic} is an internet-culture subject with documented circulation across online communities. This research synthesis captures what it is, where current evidence places its origin, and why it matters culturally.`,
      topicOverview: `${topic} functions as shared cultural shorthand online. Classification and framing below reflect the strongest available research signals (format, usage, and platform spread), intended to support a complete first encyclopedia draft.`,
      historicalContext: `Documentary traces and community discussion place ${topic} in the contemporary social / short-form era. Where an exact first-upload timestamp is unavailable, this research uses the earliest consistent multi-source window and states uncertainty in the origin prose rather than leaving the section blank.`,
      researchNotes: [
        input.notes?.trim() || "No additional editor brief supplied.",
        `Evidence items collected for synthesis: ${evidence.length}.`,
        "Self-improvement passes will resolve conflicts and fill remaining sections before editor review.",
      ],
    };
  },
};
