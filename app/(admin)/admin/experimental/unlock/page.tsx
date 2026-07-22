import type { Metadata } from "next";
import { Suspense } from "react";
import { EditorialUnlockForm } from "@/components/admin/EditorialUnlockForm";

export const metadata: Metadata = {
  title: "Experimental lab unlock",
  robots: { index: false, follow: false },
};

export default function ExperimentalUnlockPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
        Phase 2+ · Experimental
      </p>
      <h1 className="mt-1 text-xl font-semibold text-zinc-100">
        Experimental AI Lab unlock
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        Staff-only gate for the Future Editorial System. Enter the shared{" "}
        <code className="text-zinc-300">EDITORIAL_OS_TOKEN</code>. Not part of
        the Version 1 content workflow. Noindex; not linked from the public
        site.
      </p>
      <Suspense fallback={<p className="mt-6 text-sm text-zinc-500">Loading…</p>}>
        <EditorialUnlockForm />
      </Suspense>
    </main>
  );
}
