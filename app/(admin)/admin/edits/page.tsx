import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listEditSessions } from "@/lib/admin/editorialOs";
import { EditsQueue } from "@/components/admin/edits/EditsQueue";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

export const metadata: Metadata = {
  title: "Edits",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ExperimentalEditsPage() {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  const sessions = listEditSessions();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Editorial OS
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Edits
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          AI revisions awaiting preview and publish.
        </p>
      </header>
      <EditsQueue sessions={sessions} />
    </main>
  );
}
