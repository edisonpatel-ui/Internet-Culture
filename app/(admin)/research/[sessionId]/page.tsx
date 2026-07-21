import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadSession, listSessions } from "@/lib/admin/research";
import { ResearchWorkspace } from "@/components/admin/research";

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
 * Single research session workspace (RC4-B).
 */
export default async function ResearchSessionPage({ params }: Props) {
  const { sessionId } = await params;
  const session = loadSession(sessionId);
  if (!session) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <p className="mb-6 text-xs text-zinc-500">
        <Link href="/research" className="hover:text-zinc-300">
          ← All sessions
        </Link>
      </p>
      <ResearchWorkspace session={session} />
    </main>
  );
}
