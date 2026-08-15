import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadEditSession } from "@/lib/admin/editorialOs";
import { EditRevisionView } from "@/components/admin/edits/EditRevisionView";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

type Props = { params: Promise<{ editId: string }> };

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Preview",
  robots: { index: false, follow: false },
};

export default async function ExperimentalEditDetailPage({ params }: Props) {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  const { editId } = await params;
  const session = loadEditSession(editId);
  if (!session) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold text-zinc-50">Edit not found</h1>
        <p className="mt-2 text-sm text-zinc-500">
          This edit session may have expired. Open a draft and continue to Edit
          again.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={experimentalPaths.drafts}
            className="rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-white"
          >
            Back to Drafts
          </Link>
          <Link
            href={experimentalPaths.edits}
            className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
          >
            All edits
          </Link>
        </div>
      </main>
    );
  }

  return <EditRevisionView session={session} />;
}
