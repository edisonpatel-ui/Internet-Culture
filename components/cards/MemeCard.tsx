import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ScoreBar } from "@/components/ui/ScoreBar";
import type { MemeEntry } from "@/types";

interface MemeCardProps {
  meme: MemeEntry;
}

export function MemeCard({ meme }: MemeCardProps) {
  return (
    <Link
      href={`/memes/${meme.slug}`}
      className="group glass-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
    >
      <ImagePlaceholder
        title={meme.title}
        gradient={meme.imageGradient}
        className="rounded-none rounded-t-2xl"
      />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white group-hover:text-pink-200 line-clamp-2">
            {meme.title}
          </h3>
          <Badge category="meme" />
        </div>
        <p className="flex-1 text-sm text-zinc-400 line-clamp-2">
          {meme.description}
        </p>
        <ScoreBar label="Relevance" score={meme.scores.relevance} icon="📈" compact />
      </div>
    </Link>
  );
}
