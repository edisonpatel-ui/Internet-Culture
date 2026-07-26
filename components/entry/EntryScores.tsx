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
 * Cultural scores — Current Popularity, Influence, Cringe, Brainrot.
 * Placed between History and Timeline on article pages.
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

  const relevanceUnknown =
    entry?.dynamicMetadata?.currentRelevance === "unknown";

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
        Editorial estimates of cultural weight — Current Popularity tracks
        how much people are posting about this now, not historical fame.
      </p>
      <div className="surface rounded-xl space-y-3 p-5 sm:p-6">
        <ScoreBar
          label="Current Popularity"
          score={snap.relevance}
          displayValue={relevanceUnknown ? "Unknown" : undefined}
        />
        <ScoreBar label="Influence" score={snap.influence} />
        <ScoreBar label="Cringe" score={snap.cringe} />
        <ScoreBar label="Brainrot" score={snap.brainrot} />
        <p className="pt-2 text-[11px] leading-relaxed text-zinc-600">
          Current Popularity = how actively people are posting about this
          today. Influence = lasting footprint. Cringe = online reception.
          Brainrot = absurdist energy.{" "}
          {relevanceUnknown ? (
            <>
              Current Popularity could not be confirmed from live evidence.{" "}
            </>
          ) : null}
          {entry?.dynamicMetadata?.lastReviewed ? (
            <>
              Current Popularity last reviewed{" "}
              {entry.dynamicMetadata.lastReviewed}.{" "}
            </>
          ) : null}
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
