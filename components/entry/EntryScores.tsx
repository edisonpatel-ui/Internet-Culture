import Link from "next/link";
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
 * Placed after the article story so readers learn the topic first.
 */
export function EntryScores({
  entry,
  scores,
  title = "Cultural scores",
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
    <section
      className="mb-12 border-t border-white/5 pt-10"
      aria-labelledby="entry-scores-heading"
    >
      <h2
        id="entry-scores-heading"
        className="mb-2 text-lg font-semibold tracking-tight text-white"
      >
        {title}
      </h2>
      <p className="mb-5 max-w-2xl text-sm leading-relaxed text-zinc-500">
        Editorial estimates of cultural weight — not engagement metrics or
        popularity rankings.
      </p>
      <div className="glass-card space-y-3 p-5 sm:p-6">
        <ScoreBar label="Relevance" score={snap.relevance} icon="📈" />
        <ScoreBar label="Influence" score={snap.influence} icon="⚡" />
        <ScoreBar label="Cringe" score={snap.cringe} icon="😬" />
        <ScoreBar label="Brainrot" score={snap.brainrot} icon="🧠" />
        <p className="pt-2 text-[11px] leading-relaxed text-zinc-600">
          Relevance = how current in today&apos;s internet. Influence = lasting
          footprint. Cringe = online reception. Brainrot = absurdist energy.{" "}
          <Link
            href="/about#how-entries"
            className="text-zinc-500 underline decoration-white/10 underline-offset-2 transition-colors hover:text-zinc-400"
          >
            How scoring works
          </Link>
        </p>
      </div>
    </section>
  );
}
