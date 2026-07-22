"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ResearchSession } from "@/types/admin";
import type { EditorialState } from "@/lib/ai/editorialState";
import type { ResearchPriority } from "@/types/admin";
import { PriorityChip, StatusChip, WorkflowChip } from "./Chips";
import {
  WORKSPACE_PRIORITIES,
  WORKSPACE_STAGES,
  formatWorkflowStage,
} from "./workspaceTokens";

interface SessionSidebarProps {
  sessions: ResearchSession[];
  activeSessionId?: string;
}

export function SessionSidebar({
  sessions,
  activeSessionId,
}: SessionSidebarProps) {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<EditorialState | "all">("all");
  const [priority, setPriority] = useState<ResearchPriority | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions.filter((s) => {
      if (stage !== "all" && s.workflowStage !== stage) return false;
      if (priority !== "all" && s.priority !== priority) return false;
      if (!q) return true;
      return (
        s.topic.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [sessions, query, stage, priority]);

  return (
    <aside className="flex h-full min-h-0 w-full flex-col border-zinc-800 bg-zinc-950 lg:w-72 lg:shrink-0 lg:border-r">
      <div className="border-b border-zinc-800 px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
              Research
            </p>
            <h2 className="mt-0.5 text-sm font-semibold text-zinc-100">
              Sessions
            </h2>
          </div>
          <button
            type="button"
            disabled
            title="Placeholder — session creation wires later"
            className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-[11px] font-medium text-zinc-400 opacity-70"
          >
            New Session
          </button>
        </div>

        <label className="mt-3 block">
          <span className="sr-only">Search sessions</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sessions…"
            autoComplete="off"
            className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-zinc-600"
          />
        </label>

        <div className="mt-2 grid grid-cols-1 gap-2">
          <label className="block">
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-zinc-600">
              Workflow stage
            </span>
            <select
              value={stage}
              onChange={(e) =>
                setStage(e.target.value as EditorialState | "all")
              }
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-xs text-zinc-300 outline-none focus:border-zinc-600"
            >
              <option value="all">All stages</option>
              {WORKSPACE_STAGES.map((s) => (
                <option key={s} value={s}>
                  {formatWorkflowStage(s)}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-zinc-600">
              Priority
            </span>
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as ResearchPriority | "all")
              }
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-xs text-zinc-300 outline-none focus:border-zinc-600"
            >
              <option value="all">All priorities</option>
              {WORKSPACE_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="px-4 py-6 text-xs text-zinc-600">
            No sessions match these filters.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-900">
            {filtered.map((session) => {
              const active = session.id === activeSessionId;
              return (
                <li key={session.id}>
                  <Link
                    href={`/research/${session.id}`}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "block bg-zinc-900/80 px-4 py-3 transition-colors"
                        : "block px-4 py-3 transition-colors hover:bg-zinc-900/40"
                    }
                  >
                    <p
                      className={
                        active
                          ? "text-sm font-medium leading-snug text-white"
                          : "text-sm font-medium leading-snug text-zinc-200"
                      }
                    >
                      {session.topic}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <StatusChip status={session.status} />
                      <PriorityChip priority={session.priority} />
                    </div>
                    <div className="mt-1.5">
                      <WorkflowChip stage={session.workflowStage} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-zinc-800 px-4 py-3 text-[10px] text-zinc-600">
        {filtered.length} of {sessions.length} sessions · mock store
      </div>
    </aside>
  );
}
