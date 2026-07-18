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
    <section className="mb-10" aria-labelledby="entry-scores-heading">
      <h2
        id="entry-scores-heading"
        className="mb-4 text-lg font-semibold tracking-tight text-white"
      >
        {title}
      </h2>
      <div className="glass-card space-y-3 p-5 sm:p-6">
        <ScoreBar label="Relevance" score={snap.relevance} icon="📈" />
        <ScoreBar label="Influence" score={snap.influence} icon="⚡" />
        <ScoreBar label="Cringe" score={snap.cringe} icon="😬" />
        <ScoreBar label="Brainrot" score={snap.brainrot} icon="🧠" />
        <p className="pt-1 text-[11px] leading-relaxed text-zinc-600">
          Relevance = how current. Influence = lasting footprint. Cringe =
          online reception. Brainrot = absurdist energy.
        </p>
      </div>
    </section>
  );
}
