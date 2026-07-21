/**
 * Evidence matrix — normalizes organized groups into a report-ready matrix.
 */

import type { EvidenceGroup, EvidenceMatrixBuilder } from "./types";

export const mockEvidenceMatrixBuilder: EvidenceMatrixBuilder = {
  build(groups: EvidenceGroup[]): EvidenceGroup[] {
    // Mock: sort by theme stability and de-dupe empty groups.
    return groups
      .filter((g) => g.evidence.length > 0)
      .map((g) => ({
        ...g,
        evidence: [...g.evidence].sort((a, b) => a.tier.localeCompare(b.tier)),
      }));
  },
};
