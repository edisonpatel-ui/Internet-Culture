import Link from "next/link";
import type { ResearchSession } from "@/types/admin";
import type { ResearchReport } from "@/lib/admin/research/intelligence";
import { SessionSidebar } from "./SessionSidebar";
import { ResearchWorkspace } from "./ResearchWorkspace";

interface ResearchAppShellProps {
  sessions: ResearchSession[];
  activeSession?: ResearchSession;
  report?: ResearchReport;
}

/**
 * Two-column Research Workspace shell (RC4-D).
 * Sidebar is interactive (client); main panel is server-composed.
 */
export function ResearchAppShell({
  sessions,
  activeSession,
  report,
}: ResearchAppShellProps) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1400px] flex-col lg:flex-row">
      <SessionSidebar
        sessions={sessions}
        activeSessionId={activeSession?.id}
      />

      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-600 lg:hidden">
          <Link href="/" className="hover:text-zinc-400">
            ← Public site
          </Link>
          <span>Internal · mock data</span>
        </div>

        {activeSession && report ? (
          <ResearchWorkspace
            session={activeSession}
            report={report}
          />
        ) : (
          <EmptyWorkspace />
        )}
      </div>
    </div>
  );
}

function EmptyWorkspace() {
  return (
    <div className="flex min-h-[50vh] flex-col justify-center rounded-lg border border-dashed border-zinc-800 px-6 py-16 text-center">
      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        Research Workspace
      </p>
      <h1 className="mt-2 text-xl font-semibold text-zinc-100">
        Select a session
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
        Choose a research session from the sidebar to open the editorial
        workspace. Sessions are mock in-memory data — no AI providers, no
        encyclopedia writes.
      </p>
      <p className="mt-6 text-xs text-zinc-600">
        <Link href="/" className="underline decoration-zinc-700 hover:text-zinc-400">
          ← Public site
        </Link>
      </p>
    </div>
  );
}
