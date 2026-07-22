import type { ResearchReport } from "@/lib/admin/research/intelligence";
import type { ResearchInternalLink } from "@/types/admin";
import { PanelShell } from "../PanelShell";
import { formatLabel } from "../workspaceTokens";

interface RecommendationsTabProps {
  report: ResearchReport;
  sessionLinks: ResearchInternalLink[];
}

function severityClass(severity: string): string {
  switch (severity) {
    case "critical":
      return "border-red-900/50 text-red-300";
    case "improve":
      return "border-amber-900/40 text-amber-200/90";
    default:
      return "border-zinc-700 text-zinc-400";
  }
}

/**
 * Read-only internal AI follow-ups from ResearchReport.
 * Completeness pipeline resolves these before Research Review.
 */
export function RecommendationsTab({
  report,
  sessionLinks,
}: RecommendationsTabProps) {
  const linkSuggestions = sessionLinks.filter(
    (l) => l.kind === "related_article" || l.kind === "missing_article",
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2.5 text-xs text-zinc-400">
        <p className="font-medium text-zinc-300">Internal AI notes</p>
        <p className="mt-1">
          These are engine follow-ups, not editor homework. Completeness passes
          resolve them before Research Review; accept the package there to
          generate the article.
        </p>
      </div>

      <PanelShell
        title="Editorial recommendations"
        badge={`${report.editorialRecommendations.length}`}
      >
        {report.editorialRecommendations.length === 0 ? (
          <p className="text-sm text-zinc-600">None yet.</p>
        ) : (
          <ul className="space-y-2">
            {report.editorialRecommendations.map((r) => (
              <li
                key={r.id}
                className="rounded-md border border-zinc-800 px-3 py-2.5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded border px-1.5 py-0.5 text-[10px] uppercase ${severityClass(r.severity)}`}
                  >
                    {r.severity}
                  </span>
                  <span className="text-[10px] uppercase text-zinc-600">
                    {r.area}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-zinc-200">
                  {r.recommendation}
                </p>
                {r.rationale && (
                  <p className="mt-1 text-xs text-zinc-500">{r.rationale}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </PanelShell>

      <PanelShell
        title="SEO recommendations"
        badge={`${report.seoRecommendations.length}`}
      >
        {report.seoRecommendations.length === 0 ? (
          <p className="text-sm text-zinc-600">None yet.</p>
        ) : (
          <ul className="space-y-2">
            {report.seoRecommendations.map((r) => (
              <li
                key={r.id}
                className="rounded-md border border-zinc-800 px-3 py-2.5 text-sm text-zinc-300"
              >
                {r.recommendation}
              </li>
            ))}
          </ul>
        )}
      </PanelShell>

      <PanelShell
        title="Media suggestions"
        description="Always unverified until a human confirms URLs."
        badge={`${report.futureMediaSuggestions.length}`}
      >
        {report.futureMediaSuggestions.length === 0 ? (
          <p className="text-sm text-zinc-600">None yet.</p>
        ) : (
          <ul className="space-y-2">
            {report.futureMediaSuggestions.map((m) => (
              <li
                key={m.id}
                className="rounded-md border border-zinc-800 px-3 py-2.5"
              >
                <p className="text-sm font-medium text-zinc-200">{m.title}</p>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Role: {m.role} · verified: false
                </p>
                <p className="mt-1 text-xs text-zinc-500">{m.searchHint}</p>
              </li>
            ))}
          </ul>
        )}
      </PanelShell>

      <PanelShell
        title="Suggested internal links"
        badge={`${linkSuggestions.length}`}
      >
        {linkSuggestions.length === 0 ? (
          <p className="text-sm text-zinc-600">No link suggestions on session.</p>
        ) : (
          <ul className="space-y-2">
            {linkSuggestions.map((l) => (
              <li
                key={l.id}
                className="rounded-md border border-zinc-800 px-3 py-2 text-sm"
              >
                <p className="font-medium text-zinc-200">{l.label}</p>
                <p className="text-[11px] text-zinc-500">
                  {formatLabel(l.kind)}
                  {l.target ? ` · ${l.target}` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </PanelShell>
    </div>
  );
}
