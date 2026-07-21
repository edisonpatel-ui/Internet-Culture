import { PanelShell } from "./PanelShell";

interface CoveragePanelProps {
  notes: string[];
}

export function CoveragePanel({ notes }: CoveragePanelProps) {
  return (
    <PanelShell
      title="Coverage"
      description="How this topic sits against the live catalog / gaps."
    >
      {notes.length === 0 ? (
        <p className="text-sm text-zinc-600">No coverage notes.</p>
      ) : (
        <ul className="list-disc space-y-1 pl-4 text-sm text-zinc-300">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
