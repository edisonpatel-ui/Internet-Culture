import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import type { SlangEntry } from "@/types";

interface SlangCardProps {
  term: SlangEntry;
}

export function SlangCard({ term }: SlangCardProps) {
  return (
    <Link
      href={`/slang/${term.slug}`}
      className="group glass-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
    >
      <EntryCardMedia
        entry={term}
        aspect="video"
        className="rounded-none rounded-t-2xl"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200">
            {term.title}
          </h3>
          <Badge category="slang" />
        </div>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400 line-clamp-2">
          {term.definition}
        </p>
        <ScoreBar
          label="Relevance"
          score={term.scores.relevance}
          icon="📈"
          compact
        />
      </div>
    </Link>
  );
}
