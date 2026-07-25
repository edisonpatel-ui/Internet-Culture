import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadEditSession } from "@/lib/admin/editorialOs";
import { EditRevisionView } from "@/components/admin/edits/EditRevisionView";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

type Props = { params: Promise<{ editId: string }> };

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Updated Draft Preview (Experimental)",
  robots: { index: false, follow: false },
};

export default async function ExperimentalEditDetailPage({ params }: Props) {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  const { editId } = await params;
  const session = loadEditSession(editId);
  if (!session) notFound();

  return <EditRevisionView session={session} />;
}
