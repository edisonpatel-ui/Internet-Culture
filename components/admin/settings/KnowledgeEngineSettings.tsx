import Link from "next/link";
import { engineStats } from "@/lib/admin/editorialOs/engineLog";
import { listDraftPackages } from "@/lib/admin/draftGeneration";
import { listEditSessions } from "@/lib/admin/editorialOs";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function KnowledgeEngineSettings() {
  const stats = engineStats();
  const drafts = listDraftPackages().filter((d) => d.status !== "published");
  const edits = listEditSessions();

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Knowledge Engine (Experimental) · Phase 2+
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Settings / Knowledge Engine
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Diagnostics only for the Future Editorial System. Not part of the
          Version 1 content workflow.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        <Stat label="Engine runs (session)" value={String(stats.totalRuns)} />
        <Stat
          label="Unknown rate"
          value={`${Math.round(stats.unknownRate * 100)}%`}
        />
        <Stat label="Open drafts" value={String(drafts.length)} />
        <Stat label="Open edits" value={String(edits.length)} />
        <Stat label="Create runs" value={String(stats.createRuns)} />
        <Stat label="Revise runs" value={String(stats.reviseRuns)} />
        <Stat label="Update runs" value={String(stats.updateRuns)} />
      </section>

      <section className="rounded-lg border border-zinc-800 p-4">
        <h2 className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          Recent pipeline runs
        </h2>
        {stats.recent.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-600">No runs recorded yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-zinc-900 text-sm">
            {stats.recent.map((r) => (
              <li key={r.id} className="py-2">
                <p className="text-zinc-200">
                  {r.kind} · {r.topic}
                </p>
                <p className="text-xs text-zinc-600">
                  {r.at} · stages {r.stagesAttempted} · unknown fields{" "}
                  {r.unknownFields}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-zinc-800 p-4 text-sm text-zinc-400">
        <h2 className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          Access
        </h2>
        <p className="mt-2">
          Soft gate via{" "}
          <code className="text-zinc-300">EDITORIAL_OS_TOKEN</code>. See{" "}
          <Link
            href={experimentalPaths.unlock}
            className="text-zinc-200 underline"
          >
            {experimentalPaths.unlock}
          </Link>{" "}
          and{" "}
          <span className="text-zinc-300">docs/EDITORIAL_OS_SECURITY.md</span>.
        </p>
        <p className="mt-2 text-xs text-zinc-600">
          Live HTTP source fetch is not wired — trusted-source discovery uses
          candidate URLs. In-memory stores reset on process restart.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-3">
      <p className="text-[11px] uppercase tracking-wide text-zinc-600">{label}</p>
      <p className="mt-1 text-xl font-semibold text-zinc-100">{value}</p>
    </div>
  );
}
