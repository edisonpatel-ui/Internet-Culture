import Link from "next/link";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { getDetailHref, formatViews } from "@/lib/utils";
import type { BrainrotRanking } from "@/types";

interface RankingCardProps {
  ranking: BrainrotRanking;
  scoreLabel?: string;
  scoreIcon?: string;
}

export function RankingCard({
  ranking,
  scoreLabel = "Brainrot",
  scoreIcon = "🧠",
}: RankingCardProps) {
  const href = getDetailHref(ranking.category, ranking.slug);
  const isTopThree = ranking.rank <= 3;

  const rankColors = {
    1: "from-amber-400 to-yellow-500 text-black",
    2: "from-zinc-300 to-zinc-400 text-black",
    3: "from-amber-600 to-amber-700 text-white",
  } as const;

  return (
    <Link
      href={href}
      className="group glass-card flex items-center gap-3 overflow-hidden p-3 transition-all duration-300 hover:border-white/15 sm:gap-5 sm:p-4"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold sm:h-12 sm:w-12 sm:text-base ${
          isTopThree
            ? `bg-gradient-to-br ${rankColors[ranking.rank as 1 | 2 | 3]}`
            : "bg-white/5 text-zinc-400"
        }`}
      >
        #{ranking.rank}
      </div>
      <EntryCardMedia
        entry={ranking}
        aspect="none"
        className="h-14 w-14 shrink-0 rounded-xl sm:h-16 sm:w-16"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-white group-hover:text-violet-200">
          {ranking.title}
        </h3>
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {ranking.category}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-xs text-zinc-500">
          {scoreIcon} {scoreLabel}
        </p>
        <p className="text-xl font-bold tabular-nums text-orange-400 sm:text-2xl">
          {ranking.brainrotScore > 999
            ? formatViews(ranking.brainrotScore)
            : ranking.brainrotScore}
        </p>
      </div>
    </Link>
  );
}
