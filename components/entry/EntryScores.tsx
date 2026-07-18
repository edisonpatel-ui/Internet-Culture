import { ScoreBar } from "@/components/ui/ScoreBar";
import { getCulturalScoreSnapshot } from "@/lib/intelligence";
import type { BaseEntry, Scores } from "@/types";

interface EntryScoresProps {
  entry?: BaseEntry;
  /** Fallback when only raw scores are available. */
  scores?: Scores;
  title?: string;
}

/**
 * Cultural scores — Relevance, Influence, Cringe, Brainrot only.
 */
export function EntryScores({
  entry,
  scores,
  title = "Scores",
}: EntryScoresProps) {
  const snap = entry
    ? getCulturalScoreSnapshot(entry)
    : scores
      ? {
          relevance: scores.relevance,
          influence: scores.influence,
          cringe: scores.cringe,
          brainrot: scores.brainrot,
        }
      : null;

  if (!snap) return null;

  return (
    <div className="mb-8 glass-card p-6">
      <h2 className="mb-4 text-base font-semibold text-white">{title}</h2>
      <div className="space-y-2">
        <ScoreBar label="Relevance" score={snap.relevance} icon="📈" />
        <ScoreBar label="Influence" score={snap.influence} icon="⚡" />
        <ScoreBar label="Cringe" score={snap.cringe} icon="😬" />
        <ScoreBar label="Brainrot" score={snap.brainrot} icon="🧠" />
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
        Relevance = how current it is. Influence = how much it shaped culture.
        Cringe = online reception. Brainrot = absurdist / chaotic energy.
      </p>
    </div>
  );
}
