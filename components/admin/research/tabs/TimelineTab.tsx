import type { ResearchReport, TimelineEvent } from "@/lib/admin/research/intelligence";
import type { ResearchTimelineItem } from "@/types/admin";
import { PanelShell } from "../PanelShell";

interface TimelineTabProps {
  report: ResearchReport;
  sessionItems: ResearchTimelineItem[];
}

type DisplayEvent = {
  id: string;
  date: string;
  precision: string;
  description: string;
  confidence: number;
  sourceCount: number;
  importance?: string;
};

function mergeTimeline(
  report: ResearchReport,
  sessionItems: ResearchTimelineItem[],
): DisplayEvent[] {
  const fromReport: DisplayEvent[] = report.timeline.map((e: TimelineEvent) => ({
    id: e.id,
    date: e.date,
    precision: e.precision,
    description: e.description,
    confidence: e.confidence,
    sourceCount: e.sources?.length ?? 0,
    importance: e.importance,
  }));

  const reportDates = new Set(
    fromReport.map((e) => `${e.date}|${e.description}`),
  );

  const fromSession: DisplayEvent[] = sessionItems
    .filter((s) => !reportDates.has(`${s.date}|${s.description}`))
    .map((s) => ({
      id: s.id,
      date: s.date,
      precision: s.precision,
      description: s.description,
      confidence: s.confidence,
      sourceCount: 0,
    }));

  return [...fromReport, ...fromSession].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}

export function TimelineTab({ report, sessionItems }: TimelineTabProps) {
  const events = mergeTimeline(report, sessionItems);

  return (
    <PanelShell
      title="Chronology"
      description="Date, event, confidence, and source count — expandable for future research."
      badge={`${events.length}`}
    >
      {events.length === 0 ? (
        <p className="text-sm text-zinc-600">No timeline events yet.</p>
      ) : (
        <ol className="relative ml-2 space-y-0 border-l border-zinc-800">
          {events.map((event, index) => (
            <li key={event.id} className="relative pb-8 pl-6 last:pb-0">
              <span
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-zinc-600 bg-zinc-900"
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <time className="text-xs font-semibold tabular-nums text-zinc-200">
                  {event.date}
                </time>
                <span className="text-[10px] uppercase tracking-wide text-zinc-600">
                  {event.precision}
                </span>
                {event.importance && (
                  <span className="text-[10px] uppercase tracking-wide text-zinc-500">
                    {event.importance}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                {event.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-zinc-500">
                <span>
                  Confidence{" "}
                  <span className="tabular-nums text-zinc-400">
                    {(event.confidence * 100).toFixed(0)}%
                  </span>
                </span>
                <span>
                  Sources{" "}
                  <span className="tabular-nums text-zinc-400">
                    {event.sourceCount}
                  </span>
                </span>
                <span className="text-zinc-700">#{index + 1}</span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </PanelShell>
  );
}
