import Link from "next/link";
import type { ResearchSession } from "@/types/admin";
import type { ResearchReport } from "@/lib/admin/research/intelligence";
import { TopicHeader } from "./TopicHeader";
import { WorkspaceTabs } from "./WorkspaceTabs";

interface ResearchWorkspaceProps {
  session: ResearchSession;
  report: ResearchReport;
}

/**
 * Research browsing workspace — view research outputs only.
 * Approval / draft generation: /research-review
 */
export function ResearchWorkspace({
  session,
  report,
}: ResearchWorkspaceProps) {
  const reviewHref = `/research-review/rp_${session.id}`;

  return (
    <div className="min-w-0 space-y-5">
      <TopicHeader session={session} report={report} />

      <section className="rounded-lg border border-zinc-700 bg-zinc-950/60 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          Next step
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          Browse the AI research output. The engine already runs completeness
          passes before review — open Research Review to accept the package and
          generate a finished article draft.
        </p>
        <Link
          href={reviewHref}
          className="mt-3 inline-flex rounded-md border border-zinc-500 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
        >
          Review complete research
        </Link>
      </section>

      <section className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          Research overview
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
          {report.topicOverview}
        </p>
        <dl className="mt-3 grid gap-3 text-xs text-zinc-500 sm:grid-cols-3">
          <div>
            <dt className="text-zinc-600">Evidence groups</dt>
            <dd className="mt-0.5 tabular-nums text-zinc-300">
              {report.evidenceMatrix.length}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">Timeline events</dt>
            <dd className="mt-0.5 tabular-nums text-zinc-300">
              {report.timeline.length}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-600">Coverage</dt>
            <dd className="mt-0.5 capitalize text-zinc-300">
              {report.coverageAssessment.coverageLevel}
            </dd>
          </div>
        </dl>
      </section>

      <WorkspaceTabs session={session} report={report} />
    </div>
  );
}
