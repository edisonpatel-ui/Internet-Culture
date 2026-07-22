import type { Metadata } from "next";
import { listSessions } from "@/lib/admin/research";
import { ResearchAppShell } from "@/components/admin/research/ResearchAppShell";

export const metadata: Metadata = {
  title: "Research Workspace (Internal)",
  description: "Internal research sessions — not indexed.",
  robots: { index: false, follow: false },
};

/**
 * Internal research workspace index (RC4-D).
 * Two-column shell; select a session from the sidebar.
 */
export default function ResearchIndexPage() {
  const sessions = listSessions();

  return <ResearchAppShell sessions={sessions} />;
}
