import type { ResearchActivityEntry } from "@/types/admin";
import { PanelShell } from "./PanelShell";

interface ActivityLogProps {
  entries: ResearchActivityEntry[];
}

export function ActivityLog({ entries }: ActivityLogProps) {
  const sorted = [...entries].sort((a, b) => b.at.localeCompare(a.at));

  return (
    <PanelShell title="Activity log" description="Session history (mock)." badge={`${entries.length}`}>
      {sorted.length === 0 ? (
        <p className="text-sm text-zinc-600">No activity.</p>
      ) : (
        <ul className="space-y-2">
          {sorted.map((entry) => (
            <li key={entry.id} className="text-sm">
              <p className="text-[11px] text-zinc-600">
                {entry.at} · {entry.actor}
              </p>
              <p className="text-zinc-300">{entry.message}</p>
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
