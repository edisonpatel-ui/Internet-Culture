import type { ResearchReport } from "@/lib/admin/research/intelligence";
import type { ResearchSource } from "@/types/admin";
import { ConfidenceChip } from "../Chips";
import { PanelShell } from "../PanelShell";
import { formatLabel } from "../workspaceTokens";

interface EvidenceTabProps {
  report: ResearchReport;
  sessionSources: ResearchSource[];
}

export function EvidenceTab({ report, sessionSources }: EvidenceTabProps) {
  return (
    <div className="space-y-4">
      <PanelShell
        title="Evidence matrix"
        description="Grouped claims by theme — quality from RC4-C intelligence stubs."
        badge={`${report.evidenceMatrix.length} groups`}
      >
        {report.evidenceMatrix.length === 0 ? (
          <p className="text-sm text-zinc-600">No evidence groups yet.</p>
        ) : (
          <div className="space-y-4">
            {report.evidenceMatrix.map((group) => (
              <div
                key={group.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {group.label}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wide text-zinc-600">
                    {group.theme}
                  </span>
                </div>
                <ul className="mt-3 space-y-3">
                  {group.evidence.map((ev) => {
                    const conf = report.confidenceLevels.find(
                      (c) => c.claim === ev.claim,
                    );
                    return (
                      <li
                        key={ev.id}
                        className="rounded-md border border-zinc-800/80 bg-zinc-900/30 px-3 py-2.5"
                      >
                        <p className="text-sm text-zinc-300">{ev.claim}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                          <span className="rounded border border-zinc-800 px-1.5 py-0.5 text-zinc-500">
                            {formatLabel(ev.sourceCategory)}
                          </span>
                          <span className="rounded border border-zinc-800 px-1.5 py-0.5 text-zinc-500">
                            Quality · {ev.tier}
                          </span>
                          {conf && <ConfidenceChip label={conf.label} />}
                        </div>
                        <p className="mt-1.5 text-[11px] text-zinc-600">
                          {ev.sourceTitle}
                          {ev.notes ? ` · ${ev.notes}` : ""}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </PanelShell>

      <PanelShell
        title="Session sources"
        description="Sources attached on the research session."
        badge={`${sessionSources.length}`}
      >
        {sessionSources.length === 0 ? (
          <p className="text-sm text-zinc-600">No session sources.</p>
        ) : (
          <ul className="space-y-2">
            {sessionSources.map((s) => (
              <li
                key={s.id}
                className="rounded-md border border-zinc-800 px-3 py-2 text-sm"
              >
                <p className="font-medium text-zinc-200">{s.title}</p>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  {formatLabel(s.category)}
                  {s.url ? ` · ${s.url}` : ""}
                </p>
                {s.notes && (
                  <p className="mt-1 text-xs text-zinc-500">{s.notes}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </PanelShell>

      <PanelShell
        title="Conflicting claims"
        badge={`${report.conflictingClaims.length}`}
      >
        {report.conflictingClaims.length === 0 ? (
          <p className="text-sm text-zinc-600">No conflicts recorded.</p>
        ) : (
          <ul className="space-y-3">
            {report.conflictingClaims.map((c) => (
              <li
                key={c.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4"
              >
                <p className="text-sm font-medium text-zinc-200">{c.summary}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-400">
                  {c.claims.map((claim) => (
                    <li key={claim}>{claim}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-zinc-500">
                  Guidance: {c.editorGuidance}
                </p>
              </li>
            ))}
          </ul>
        )}
      </PanelShell>
    </div>
  );
}
