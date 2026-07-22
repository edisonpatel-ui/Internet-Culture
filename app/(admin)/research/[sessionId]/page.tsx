import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  listSessions,
  loadSession,
  resolveReportForSession,
} from "@/lib/admin/research";
import { ResearchAppShell } from "@/components/admin/research/ResearchAppShell";

type Props = { params: Promise<{ sessionId: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return listSessions().map((s) => ({ sessionId: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sessionId } = await params;
  const session = loadSession(sessionId);
  return {
    title: session
      ? `Research: ${session.topic} (Internal)`
      : "Research session (Internal)",
    robots: { index: false, follow: false },
  };
}

/**
 * Legacy research session workspace — browse report outputs only.
 * Approval: /research-review. Drafts: /drafts. Publish prep: /publish.
 */
export default async function ResearchSessionPage({ params }: Props) {
  const { sessionId } = await params;
  const session = loadSession(sessionId);
  if (!session) notFound();

  const sessions = listSessions();
  const report = resolveReportForSession(session);

  return (
    <ResearchAppShell
      sessions={sessions}
      activeSession={session}
      report={report}
    />
  );
}
