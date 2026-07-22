import type { ResearchActivityEntry } from "@/types/admin";
import { PanelShell } from "../PanelShell";

interface ActivityTabProps {
  entries: ResearchActivityEntry[];
}

/**
 * Deterministic timestamp formatting (SSR + client).
 * Avoids toLocaleString(undefined) locale/timezone drift.
 */
function formatWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const min = String(d.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min} UTC`;
}

export function ActivityTab({ entries }: ActivityTabProps) {
  const sorted = [...entries].sort((a, b) => b.at.localeCompare(a.at));

  return (
    <PanelShell
      title="Activity"
      description="Chronological session history (mock)."
      badge={`${sorted.length}`}
    >
      {sorted.length === 0 ? (
        <p className="text-sm text-zinc-600">No activity yet.</p>
      ) : (
        <ol className="relative ml-2 border-l border-zinc-800">
          {sorted.map((entry) => (
            <li key={entry.id} className="relative pb-6 pl-6 last:pb-0">
              <span
                className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full bg-zinc-600"
                aria-hidden
              />
              <p className="text-[11px] text-zinc-600">
                <time dateTime={entry.at}>{formatWhen(entry.at)}</time>
                {" · "}
                {entry.actor}
              </p>
              <p className="mt-1 text-sm text-zinc-300">{entry.message}</p>
            </li>
          ))}
        </ol>
      )}
    </PanelShell>
  );
}
