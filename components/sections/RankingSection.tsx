import { RankingCard } from "@/components/cards/RankingCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { BrainrotRanking } from "@/types";

interface RankingSectionProps {
  emoji?: string;
  title?: string;
  description?: string;
  rankings: BrainrotRanking[];
  href?: string;
  scoreLabel?: string;
  scoreIcon?: string;
  limit?: number;
}

export function RankingSection({
  emoji,
  title = "Rankings",
  description,
  rankings,
  href,
  scoreLabel,
  scoreIcon,
  limit = 5,
}: RankingSectionProps) {
  return (
    <section className="py-10 sm:py-14">
      <SectionHeader
        emoji={emoji}
        title={title}
        description={description}
        href={href}
        linkLabel="View all"
      />
      <div className="space-y-3">
        {rankings.slice(0, limit).map((ranking) => (
          <RankingCard
            key={ranking.slug}
            ranking={ranking}
            scoreLabel={scoreLabel}
            scoreIcon={scoreIcon}
          />
        ))}
      </div>
    </section>
  );
}
