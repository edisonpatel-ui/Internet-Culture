import type { ResearchSession } from "@/types/admin";
import type { ResearchReport } from "@/lib/admin/research/intelligence";
import { ConfidenceChip, WorkflowChip } from "../Chips";
import { PanelShell } from "../PanelShell";

interface OverviewTabProps {
  session: ResearchSession;
  report: ResearchReport;
}

function overallConfidence(
  report: ResearchReport,
): ResearchReport["confidenceLevels"][0]["label"] | "Unknown" {
  if (report.confidenceLevels.length === 0) return "Unknown";
  const counts = new Map<string, number>();
  for (const c of report.confidenceLevels) {
    counts.set(c.label, (counts.get(c.label) ?? 0) + 1);
  }
  let top = report.confidenceLevels[0].label;
  let topN = 0;
  for (const [label, n] of counts) {
    if (n > topN) {
      top = label as typeof top;
      topN = n;
    }
  }
  return top;
}

export function OverviewTab({ session, report }: OverviewTabProps) {
  const conf = overallConfidence(report);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            Workflow stage
          </p>
          <div className="mt-2">
            <WorkflowChip stage={session.workflowStage} />
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            Confidence indicator
          </p>
          <div className="mt-2 flex items-center gap-2">
            <ConfidenceChip label={conf} />
            <span className="text-xs text-zinc-500">
              from {report.confidenceLevels.length} assessed claims
            </span>
          </div>
        </div>
      </div>

      <PanelShell title="Executive summary">
        <p className="text-sm leading-relaxed text-zinc-300">
          {report.executiveSummary}
        </p>
      </PanelShell>

      <PanelShell title="Topic overview">
        <p className="text-sm leading-relaxed text-zinc-300">
          {report.topicOverview}
        </p>
      </PanelShell>

      <PanelShell title="Historical context">
        <p className="text-sm leading-relaxed text-zinc-300">
          {report.historicalContext}
        </p>
      </PanelShell>

      <PanelShell
        title="Research notes"
        badge={`${report.researchNotes.length}`}
      >
        {report.researchNotes.length === 0 ? (
          <p className="text-sm text-zinc-600">No notes yet.</p>
        ) : (
          <ul className="space-y-2">
            {report.researchNotes.map((note, i) => (
              <li
                key={`${i}-${note.slice(0, 24)}`}
                className="rounded-md border border-zinc-800/80 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-300"
              >
                {note}
              </li>
            ))}
          </ul>
        )}
      </PanelShell>
    </div>
  );
}
