import type { ResearchSource } from "@/types/admin";
import { PanelShell } from "./PanelShell";

interface SourcesPanelProps {
  sources: ResearchSource[];
}

export function SourcesPanel({ sources }: SourcesPanelProps) {
  return (
    <PanelShell
      title="Sources"
      description="Candidate citations — evaluate with RC3 source categories later."
      badge={`${sources.length}`}
    >
      {sources.length === 0 ? (
        <p className="text-sm text-zinc-600">No sources yet.</p>
      ) : (
        <ul className="space-y-3">
          {sources.map((source) => (
            <li
              key={source.id}
              className="rounded-lg border border-white/5 bg-black/20 px-3 py-2"
            >
              <p className="text-sm font-medium text-zinc-200">{source.title}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-zinc-500">
                {source.category}
              </p>
              {source.url && (
                <p className="mt-1 break-all font-mono text-[11px] text-zinc-600">
                  {source.url}
                </p>
              )}
              {source.notes && (
                <p className="mt-1 text-xs text-zinc-500">{source.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
