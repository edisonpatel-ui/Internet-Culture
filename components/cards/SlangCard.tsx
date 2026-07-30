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
      className="group surface flex h-full flex-col overflow-hidden rounded-xl transition-colors duration-150 hover:border-white/14 hover:bg-[var(--surface-elevated)]"
    >
      <div className="p-5">
        <EntryCardMedia entry={term} aspect="video" />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-zinc-100">
            {term.title}
          </h3>
          <Badge category="slang" />
        </div>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400 line-clamp-2">
          {term.definition}
        </p>
        <ScoreBar
          label="Current Popularity"
          score={term.scores.relevance}
          compact
        />
      </div>
    </Link>
  );
}
