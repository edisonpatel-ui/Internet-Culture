import type { ResearchAiSuggestionStub } from "@/types/admin";
import { PanelShell } from "./PanelShell";

interface AISuggestionsPanelProps {
  suggestions: ResearchAiSuggestionStub[];
}

export function AISuggestionsPanel({ suggestions }: AISuggestionsPanelProps) {
  return (
    <PanelShell
      title="AI suggestions"
      description="Placeholders only — providers not connected (RC4-B)."
      badge="unwired"
    >
      {suggestions.length === 0 ? (
        <p className="text-sm text-zinc-600">
          No stub suggestions. RC3 ports throw until wired.
        </p>
      ) : (
        <ul className="space-y-2">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="rounded-lg border border-dashed border-violet-500/30 bg-violet-500/5 px-3 py-2"
            >
              <p className="text-xs font-medium text-violet-300">{s.assistant}</p>
              <p className="mt-0.5 text-sm text-zinc-300">{s.summary}</p>
              <p className="mt-1 text-[11px] text-zinc-600">
                point: {s.integrationPoint} · requires human review
              </p>
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
