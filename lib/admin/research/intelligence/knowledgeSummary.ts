/**
 * Knowledge summary — executive / overview / historical prose stubs.
 */

import type { Evidence, KnowledgeSummarizer, ResearchInput } from "./types";

export const mockKnowledgeSummarizer: KnowledgeSummarizer = {
  summarize(input: ResearchInput, evidence: Evidence[]) {
    const topic = input.topic;
    return {
      executiveSummary: `${topic} is under editorial research. This mock summary is scaffolding only — replace with verified synthesis before drafting.`,
      topicOverview: `${topic} is treated as an internet-culture subject for encyclopedia research. Classification (meme, slang, event, trend, creator) must be confirmed against catalog rules before article creation.`,
      historicalContext: `Historical context for ${topic} is incomplete in this mock output. Editors should establish earliest documentation, platform of origin, and major spread moments using High/Medium-tier sources.`,
      researchNotes: [
        input.notes?.trim() || "No editor notes supplied.",
        `Evidence stubs collected: ${evidence.length}.`,
        "All claims require human verification before ResearchPackage promotion.",
        "Do not auto-generate or publish articles from this intelligence layer.",
      ],
    };
  },
};
