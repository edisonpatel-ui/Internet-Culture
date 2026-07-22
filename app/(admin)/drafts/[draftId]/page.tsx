import { redirect, notFound } from "next/navigation";
import {
  listDraftPackages,
  loadDraftPackage,
} from "@/lib/admin/draftGeneration";

type Props = { params: Promise<{ draftId: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return listDraftPackages().map((d) => ({ draftId: d.id }));
}

/**
 * Legacy Draft Review route — redirects to Article Preview.
 */
export default async function DraftDetailRedirectPage({ params }: Props) {
  const { draftId } = await params;
  if (!loadDraftPackage(draftId)) notFound();
  redirect(`/article-preview/${draftId}`);
}
