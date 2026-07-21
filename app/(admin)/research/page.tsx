import type { Metadata } from "next";
import Link from "next/link";
import { listSessions } from "@/lib/admin/research";
import { SessionList } from "@/components/admin/research";

export const metadata: Metadata = {
  title: "Research Workspace (Internal)",
  description: "Internal research sessions — not indexed.",
  robots: { index: false, follow: false },
};

/**
 * Internal research session list (RC4-B).
 * Mock data only. Not linked from public nav.
 */
export default function ResearchIndexPage() {
  const sessions = listSessions();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Admin · Research
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Research Workspace
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Foundation for future article research. Sessions are mock in-memory
          data — no AI providers, no writes to{" "}
          <code className="text-zinc-300">lib/content</code>.
        </p>
        <p className="mt-3 text-xs text-zinc-600">
          <Link href="/" className="underline decoration-white/15 hover:text-zinc-400">
            ← Public site
          </Link>
        </p>
      </div>

      <SessionList sessions={sessions} />
    </main>
  );
}
