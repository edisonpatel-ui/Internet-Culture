import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadEditSession } from "@/lib/admin/editorialOs";
import { EditRevisionView } from "@/components/admin/edits/EditRevisionView";

type Props = { params: Promise<{ editId: string }> };

export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Edit review (Experimental)",
  robots: { index: false, follow: false },
};

export default async function ExperimentalEditDetailPage({ params }: Props) {
  const { editId } = await params;
  const session = loadEditSession(editId);
  if (!session) notFound();

  return <EditRevisionView session={session} />;
}
