import type { ResearchTimelineItem } from "@/types/admin";
import { PanelShell } from "./PanelShell";

interface TimelinePanelProps {
  items: ResearchTimelineItem[];
}

export function TimelinePanel({ items }: TimelinePanelProps) {
  return (
    <PanelShell
      title="Timeline"
      description="Chronology with precision — RC3 timelineBuilder plugs in later."
      badge={`${items.length}`}
    >
      {items.length === 0 ? (
        <p className="text-sm text-zinc-600">No timeline events yet.</p>
      ) : (
        <ol className="space-y-3 border-l border-white/10 pl-4">
          {items.map((item) => (
            <li key={item.id}>
              <p className="text-xs font-medium uppercase tracking-wide text-violet-400/90">
                {item.date} · {item.precision}
              </p>
              <p className="mt-0.5 text-sm text-zinc-300">{item.description}</p>
              <p className="mt-0.5 text-[11px] text-zinc-600">
                confidence {item.confidence.toFixed(2)}
              </p>
            </li>
          ))}
        </ol>
      )}
    </PanelShell>
  );
}
