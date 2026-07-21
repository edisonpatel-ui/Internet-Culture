/**
 * Research organizer — groups evidence into thematic clusters.
 */

import type {
  Evidence,
  EvidenceGroup,
  ResearchInput,
  ResearchOrganizer,
} from "./types";

export const mockResearchOrganizer: ResearchOrganizer = {
  organize(input: ResearchInput, evidence: Evidence[]): EvidenceGroup[] {
    const byTheme = (theme: string, label: string, filter: (e: Evidence) => boolean): EvidenceGroup => ({
      id: `grp-${theme}`,
      label,
      theme,
      evidence: evidence.filter(filter),
    });

    return [
      byTheme(
        "origin",
        "Origin & early documentation",
        (e) =>
          e.tier === "High" ||
          e.tier === "Medium" ||
          e.sourceCategory === "know_your_meme" ||
          e.sourceCategory === "wikipedia",
      ),
      byTheme(
        "spread",
        "Spread & platforms",
        (e) =>
          e.sourceCategory === "social_media" ||
          e.sourceCategory === "platform_documentation" ||
          e.claim.toLowerCase().includes("platform") ||
          e.claim.toLowerCase().includes("spread"),
      ),
      byTheme(
        "identity",
        "Cultural identity & meaning",
        (e) =>
          e.sourceCategory === "journalism" ||
          e.sourceCategory === "academic" ||
          e.claim.toLowerCase().includes("meaning"),
      ),
      byTheme(
        "editor_seeds",
        "Editor-supplied seeds",
        (e) =>
          e.sourceCategory === "unknown" ||
          Boolean(input.seedSources?.length && e.claim.includes("Seed source")),
      ),
    ].filter((g) => g.evidence.length > 0);
  },
};
