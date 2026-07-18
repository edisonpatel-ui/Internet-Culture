import { ScoreBar } from "@/components/ui/ScoreBar";
import { getCulturalScoreSnapshot } from "@/lib/intelligence";
import type { BaseEntry, Scores } from "@/types";

interface EntryScoresProps {
  /** Prefer passing the full entry so derived cultural scores can be computed. */
  entry?: BaseEntry;
  /** Legacy: raw scores only (brainrot trio). */
  scores?: Scores;
  title?: string;
}

/**
 * Cultural perception scores for encyclopedia entries.
 * When `entry` is provided, shows relevance / impact / longevity / cringe
 * with safe derived defaults — not live analytics.
 */
export function EntryScores({
  entry,
  scores,
  title = "Cultural Scores",
}: EntryScoresProps) {
  if (entry) {
    const snap = getCulturalScoreSnapshot(entry);
    return (
      <div className="mb-8 glass-card p-6">
        <h2 className="mb-4 text-base font-semibold text-white">{title}</h2>
        <div className="space-y-2">
          <ScoreBar
            label="Current Relevance"
            score={snap.relevanceScore}
            icon="📈"
          />
          <ScoreBar
            label="Cultural Impact"
            score={snap.culturalImpactScore}
            icon="⚡"
          />
          <ScoreBar
            label="Longevity"
            score={snap.longevityScore}
            icon="⏳"
          />
          <ScoreBar
            label="Popularity"
            score={snap.popularityScore}
            icon="👀"
          />
          <ScoreBar
            label="Cringe (perception)"
            score={snap.cringeLevel}
            icon="😬"
          />
          <ScoreBar
            label="Brainrot"
            score={snap.brainrotScore}
            icon="🧠"
          />
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
          Current relevance = attention today. Cultural impact = historical
          influence. These are never combined. Estimates from calibration +
          metadata — not live Google Trends.
        </p>
      </div>
    );
  }

  if (!scores) return null;

  return (
    <div className="mb-8 glass-card p-6">
      <h2 className="mb-4 text-base font-semibold text-white">{title}</h2>
      <div className="space-y-2">
        <ScoreBar label="Relevance" score={scores.relevance} icon="📈" />
        <ScoreBar label="Brainrot" score={scores.brainrot} icon="🧠" />
        <ScoreBar
          label="Cringe (perception)"
          score={scores.cringe}
          icon="😬"
        />
      </div>
    </div>
  );
}
