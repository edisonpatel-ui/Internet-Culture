/**
 * Knowledge summary — grounded synthesis only (mock).
 * Prefer catalog copy and explicit definitional claims over empty failure.
 * Never invent encyclopedia origin/history claims.
 * Never copy editor instructions into executiveSummary / topicOverview.
 */

import type { Evidence, KnowledgeSummarizer, ResearchInput } from "./types";
import { summaryFromEditorGuidance } from "@/lib/ai/knowledgeEngine/trustedSourceDiscovery";
import { isEditorInstruction } from "@/lib/ai/knowledgeEngine/parseEditorInstructions";

function hasUrl(url?: string): boolean {
  return Boolean(url?.trim() && /^https?:\/\//i.test(url.trim()));
}

function safeInternalNote(notes?: string): string {
  const n = notes?.trim();
  if (!n) return "No additional research directives supplied.";
  // Keep directive notes internal — never echo raw instruction phrasing as "brief"
  if (isEditorInstruction(n) && n.length < 200) {
    return "Editor instruction parsed into research directives (not article content).";
  }
  return n.slice(0, 400);
}

export const mockKnowledgeSummarizer: KnowledgeSummarizer = {
  summarize(input: ResearchInput, evidence: Evidence[]) {
    const topic = input.topic;
    const grounded = evidence.filter((e) => hasUrl(e.sourceUrl));
    const catalog = input.catalogSummary?.trim();
    // Only explicit definitional claims — never raw instructions
    const claim = input.definitionalClaim?.trim() ?? "";
    const fromClaim = claim
      ? summaryFromEditorGuidance(topic, claim)
      : null;

    if (catalog) {
      return {
        executiveSummary: catalog.slice(0, 480),
        topicOverview: catalog.slice(0, 800),
        historicalContext: "",
        researchNotes: [
          safeInternalNote(input.notes),
          `Summary grounded from live ICH encyclopedia entry for "${topic}".`,
          `URL-backed evidence items: ${grounded.length}.`,
        ],
      };
    }

    if (fromClaim) {
      return {
        executiveSummary: fromClaim,
        topicOverview: fromClaim,
        historicalContext: "",
        researchNotes: [
          "Basic explanation taken from explicit editor definitional claim (not an instruction).",
          `URL-backed evidence items: ${grounded.length}.`,
          "Verify against preferred / trusted sources before publish.",
        ],
      };
    }

    if (grounded.length === 0) {
      return {
        executiveSummary: "",
        topicOverview: "",
        historicalContext: "",
        researchNotes: [
          safeInternalNote(input.notes),
          `Evidence items seen: ${evidence.length}; with stable URLs: 0.`,
          `Knowledge Engine could not determine a grounded summary for "${topic}".`,
          "Trusted-source discovery must still run before Unknown.",
        ],
      };
    }

    // URL candidates exist but live page fetch is not wired — do not invent prose.
    return {
      executiveSummary: "",
      topicOverview: "",
      historicalContext: "",
      researchNotes: [
        safeInternalNote(input.notes),
        `Trusted source candidates with URLs: ${grounded.length}.`,
        "Live page fetch not yet wired — refusing fabricated summary/origin/impact text.",
        "Preferred-source directives affect ranking; they never become article text.",
      ],
    };
  },
};
