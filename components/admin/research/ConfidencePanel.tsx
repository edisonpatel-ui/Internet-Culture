import type { ResearchConfidenceEntry } from "@/types/admin";
import { PanelShell } from "./PanelShell";

interface ConfidencePanelProps {
  entries: ResearchConfidenceEntry[];
}

export function ConfidencePanel({ entries }: ConfidencePanelProps) {
  return (
    <PanelShell
      title="Confidence"
      description="Claim confidence labels — RC3 factConfidence later."
      badge={`${entries.length}`}
    >
      {entries.length === 0 ? (
        <p className="text-sm text-zinc-600">No confidence entries.</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-lg border border-white/5 px-3 py-2"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
                  {entry.label}
                </span>
                <span className="text-sm text-zinc-200">{entry.claim}</span>
              </div>
              {entry.notes && (
                <p className="mt-1 text-xs text-zinc-500">{entry.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
