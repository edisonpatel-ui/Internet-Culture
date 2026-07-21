import { PanelShell } from "./PanelShell";

interface ResearchNotesProps {
  notes: string;
}

export function ResearchNotes({ notes }: ResearchNotesProps) {
  return (
    <PanelShell
      title="Research notes"
      description="Editor notes for this session — not published."
    >
      {notes.trim() ? (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
          {notes}
        </p>
      ) : (
        <p className="text-sm text-zinc-600">No notes yet.</p>
      )}
    </PanelShell>
  );
}
