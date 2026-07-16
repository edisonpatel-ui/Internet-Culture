import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ScoreBar } from "@/components/ui/ScoreBar";
import type { SlangEntry } from "@/types";

interface SlangCardProps {
  term: SlangEntry;
}

export function SlangCard({ term }: SlangCardProps) {
  return (
    <Link
      href={`/slang/${term.slug}`}
      className="group glass-card block p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200">
          {term.title}
        </h3>
        <Badge category="slang" />
      </div>
      <p className="mb-4 text-sm leading-relaxed text-zinc-400 line-clamp-2">
        {term.definition}
      </p>
      <ScoreBar label="Relevance" score={term.scores.relevance} icon="📈" compact />
    </Link>
  );
}
