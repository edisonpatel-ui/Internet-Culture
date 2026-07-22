import type { ResearchReport } from "@/lib/admin/research/intelligence";
import { PanelShell } from "../PanelShell";
import { priorityChipClass } from "../workspaceTokens";

interface CoverageTabProps {
  report: ResearchReport;
}

const COVERAGE_SCORE: Record<
  ResearchReport["coverageAssessment"]["coverageLevel"],
  number
> = {
  none: 12,
  thin: 35,
  adequate: 68,
  strong: 90,
};

export function CoverageTab({ report }: CoverageTabProps) {
  const cov = report.coverageAssessment;
  const score = COVERAGE_SCORE[cov.coverageLevel];

  return (
    <div className="space-y-4">
      <PanelShell title="Coverage score">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-semibold tabular-nums tracking-tight text-zinc-100">
              {score}
              <span className="ml-1 text-base font-normal text-zinc-500">
                / 100
              </span>
            </p>
            <p className="mt-1 text-xs capitalize text-zinc-500">
              Level: {cov.coverageLevel}
            </p>
          </div>
          <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-zinc-900">
            <div
              className="h-full rounded-full bg-zinc-400"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
        {(cov.existingEntrySlug || cov.existingEntryTitle) && (
          <p className="mt-3 text-xs text-zinc-500">
            Existing entry: {cov.existingEntryTitle ?? cov.existingEntrySlug}
          </p>
        )}
      </PanelShell>

      <div className="grid gap-4 sm:grid-cols-2">
        <PanelShell title="Strengths">
          {cov.strengths.length === 0 ? (
            <p className="text-sm text-zinc-600">None listed.</p>
          ) : (
            <ul className="list-disc space-y-1 pl-4 text-sm text-zinc-300">
              {cov.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </PanelShell>
        <PanelShell title="Missing information">
          {cov.weaknesses.length === 0 ? (
            <p className="text-sm text-zinc-600">None listed.</p>
          ) : (
            <ul className="list-disc space-y-1 pl-4 text-sm text-zinc-300">
              {cov.weaknesses.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </PanelShell>
      </div>

      <PanelShell
        title="Knowledge gaps"
        description="Recommended research priorities."
        badge={`${cov.gaps.length}`}
      >
        {cov.gaps.length === 0 ? (
          <p className="text-sm text-zinc-600">No gaps flagged.</p>
        ) : (
          <ul className="space-y-2">
            {cov.gaps.map((g) => (
              <li
                key={g.id}
                className="flex flex-col gap-2 rounded-md border border-zinc-800 px-3 py-2.5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-200">{g.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{g.reason}</p>
                  {g.suggestedCategory && (
                    <p className="mt-1 text-[11px] text-zinc-600">
                      Suggested category: {g.suggestedCategory}
                    </p>
                  )}
                </div>
                <span
                  className={`shrink-0 self-start rounded-md border px-2 py-0.5 text-[11px] capitalize ${priorityChipClass(
                    g.priority === "high"
                      ? "high"
                      : g.priority === "low"
                        ? "low"
                        : "medium",
                  )}`}
                >
                  {g.priority}
                </span>
              </li>
            ))}
          </ul>
        )}
      </PanelShell>
    </div>
  );
}
