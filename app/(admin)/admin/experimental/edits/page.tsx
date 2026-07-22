import type { Metadata } from "next";
import { listEditSessions } from "@/lib/admin/editorialOs";
import { EditsQueue } from "@/components/admin/edits/EditsQueue";

export const metadata: Metadata = {
  title: "Edits (Experimental)",
  robots: { index: false, follow: false },
};

export default function ExperimentalEditsPage() {
  const sessions = listEditSessions();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Experimental AI Lab
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Edits
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          AI revisions awaiting review and publish.
        </p>
      </header>
      <EditsQueue sessions={sessions} />
    </main>
  );
}
