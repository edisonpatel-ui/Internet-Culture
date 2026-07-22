import type { ResearchSession } from "@/types/admin";
import type { ResearchReport } from "@/lib/admin/research/intelligence";
import {
  MetaChip,
  PriorityChip,
  StatusChip,
  WorkflowChip,
} from "./Chips";

interface TopicHeaderProps {
  session: ResearchSession;
  report?: ResearchReport;
}

export function TopicHeader({ session, report }: TopicHeaderProps) {
  return (
    <header className="border-b border-zinc-800 pb-5">
      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        Research session
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {session.topic}
      </h1>
      {report?.executiveSummary && (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
          {report.executiveSummary}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <StatusChip status={session.status} />
        <PriorityChip priority={session.priority} />
        <WorkflowChip stage={session.workflowStage} />
        {session.assignedTo && (
          <MetaChip>Assignee: {session.assignedTo}</MetaChip>
        )}
        <MetaChip>{session.id}</MetaChip>
      </div>
      {session.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {session.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[11px] text-zinc-500"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
