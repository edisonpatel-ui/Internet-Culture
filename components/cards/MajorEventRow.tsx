import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import {
  getTrendDirectionColor,
  getTrendDirectionIcon,
} from "@/lib/utils";
import type { EventEntry } from "@/types";

interface MajorEventRowProps {
  event: EventEntry;
}

/** Horizontal major-event preview — shares EntryCardMedia with EventCard. */
export function MajorEventRow({ event }: MajorEventRowProps) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group glass-card flex gap-5 overflow-hidden transition-colors hover:border-white/15"
    >
      <EntryCardMedia
        entry={event}
        aspect="none"
        className="h-24 w-24 shrink-0 rounded-none rounded-l-[0.75rem] sm:h-32 sm:w-32"
      />
      <div className="flex flex-1 flex-col justify-center gap-2 py-4 pr-4">
        <div className="flex items-center gap-2">
          <Badge category="event" />
          <span
            className={`text-xs font-medium ${getTrendDirectionColor(event.trendDirection)}`}
          >
            {getTrendDirectionIcon(event.trendDirection)} {event.trendDirection}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-zinc-200">
          {event.title}
        </h3>
        <p className="line-clamp-2 text-sm text-zinc-400">{event.description}</p>
        {event.platform && (
          <div className="text-xs text-zinc-500">{event.platform}</div>
        )}
      </div>
    </Link>
  );
}
