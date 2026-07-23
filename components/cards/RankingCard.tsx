import Link from "next/link";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { getDetailHref } from "@/lib/utils";
import type { BrainrotRanking } from "@/types";

interface RankingCardProps {
  ranking: BrainrotRanking;
  scoreLabel?: string;
  scoreIcon?: string;
}

export function RankingCard({
  ranking,
  scoreLabel = "Score",
  scoreIcon,
}: RankingCardProps) {
  const href = getDetailHref(ranking.category, ranking.slug);
  const isTopThree = ranking.rank <= 3;

  const rankColors = {
    1: "bg-amber-500/90 text-black",
    2: "bg-zinc-300 text-black",
    3: "bg-amber-700 text-white",
  } as const;

  return (
    <Link
      href={href}
      className="group glass-card flex items-center gap-3 overflow-hidden p-3 transition-colors hover:border-white/15 sm:gap-5 sm:p-4"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold sm:h-12 sm:w-12 sm:text-base ${
          isTopThree
            ? rankColors[ranking.rank as 1 | 2 | 3]
            : "bg-white/5 text-zinc-400"
        }`}
      >
        #{ranking.rank}
      </div>
      <EntryCardMedia
        entry={ranking}
        aspect="none"
        className="h-14 w-14 shrink-0 rounded-lg sm:h-16 sm:w-16"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-white group-hover:text-zinc-200">
          {ranking.title}
        </h3>
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {ranking.category}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-xs text-zinc-500">
          {scoreIcon ? <span aria-hidden>{scoreIcon} </span> : null}
          {scoreLabel}
        </p>
        <p className="text-xl font-bold tabular-nums text-zinc-200 sm:text-2xl">
          {ranking.brainrotScore}
        </p>
      </div>
    </Link>
  );
}
