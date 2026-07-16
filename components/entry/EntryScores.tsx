import { ScoreGroup } from "@/components/ui/ScoreBar";
import type { Scores } from "@/types";

interface EntryScoresProps {
  scores: Scores;
  title?: string;
}

export function EntryScores({ scores, title = "Trend Scores" }: EntryScoresProps) {
  return (
    <div className="mb-8 glass-card p-6">
      <h2 className="mb-4 text-base font-semibold text-white">{title}</h2>
      <ScoreGroup
        relevance={scores.relevance}
        brainrot={scores.brainrot}
        cringe={scores.cringe}
      />
    </div>
  );
}
