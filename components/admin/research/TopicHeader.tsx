import type { ResearchSession } from "@/types/admin";

interface TopicHeaderProps {
  session: ResearchSession;
}

export function TopicHeader({ session }: TopicHeaderProps) {
  return (
    <header className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
        Internal research session
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {session.topic}
      </h1>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
          {session.status}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
          {session.workflowStage}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
          priority: {session.priority}
        </span>
        {session.assignedTo && (
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
            assignee: {session.assignedTo}
          </span>
        )}
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
          id: {session.id}
        </span>
      </div>
      {session.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {session.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-zinc-500"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
