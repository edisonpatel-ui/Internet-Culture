import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import {
  formatViews,
  getTrendDirectionColor,
  getTrendDirectionIcon,
} from "@/lib/utils";
import type { EventEntry } from "@/types";

interface EventCardProps {
  event: EventEntry;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group glass-card flex h-full flex-col overflow-hidden transition-colors duration-200 hover:-translate-y-0.5 hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
    >
      <EntryCardMedia
        entry={event}
        aspect="video"
        className="rounded-none rounded-t-2xl"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-bold text-white transition-colors group-hover:text-violet-200">
            {event.title}
          </h3>
          <Badge category="event" />
        </div>
        <p className="line-clamp-2 flex-1 text-sm text-zinc-400">
          {event.description}
        </p>
        <p className="line-clamp-2 border-l-2 border-emerald-500/40 pl-3 text-sm font-medium italic text-zinc-300">
          {event.impact}
        </p>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span>
            <span aria-hidden>👀 </span>
            {formatViews(event.views)}
            <span className="sr-only"> views</span>
          </span>
          <span className={getTrendDirectionColor(event.trendDirection)}>
            <span aria-hidden>
              {getTrendDirectionIcon(event.trendDirection)}{" "}
            </span>
            {event.trendDirection}
          </span>
        </div>
      </div>
    </Link>
  );
}
