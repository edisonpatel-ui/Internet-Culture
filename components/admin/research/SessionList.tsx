import Link from "next/link";
import type { ResearchSession } from "@/types/admin";

interface SessionListProps {
  sessions: ResearchSession[];
}

export function SessionList({ sessions }: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <p className="text-sm text-zinc-500">No research sessions in the mock store.</p>
    );
  }

  return (
    <ul className="divide-y divide-white/5 rounded-xl border border-white/10">
      {sessions.map((session) => (
        <li key={session.id}>
          <Link
            href={`/research/${session.id}`}
            className="flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-white">{session.topic}</p>
              <p className="text-xs text-zinc-500">
                {session.id} · {session.workflowStage}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400">
              <span className="rounded-full border border-white/10 px-2 py-0.5">
                {session.status}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-0.5">
                {session.priority}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-0.5">
                {session.sources.length} sources
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
