import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadPublicDraftPackage } from "@/lib/admin/draftGeneration";
import { DraftArticleView } from "@/components/admin/drafts/DraftArticleView";

type Props = { params: Promise<{ draftId: string }> };

export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Draft (Experimental)",
  robots: { index: false, follow: false },
};

export default async function ExperimentalDraftDetailPage({ params }: Props) {
  const { draftId } = await params;
  const draft = loadPublicDraftPackage(draftId);
  if (!draft || draft.status === "published") notFound();

  return <DraftArticleView draft={draft} />;
}
