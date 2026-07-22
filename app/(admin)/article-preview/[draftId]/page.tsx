import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  listDraftPackages,
  loadDraftPackage,
} from "@/lib/admin/draftGeneration";
import { findApprovedDraftByPackageId } from "@/lib/admin/draftReview";
import { ArticlePreviewWorkspace } from "@/components/admin/articlePreview/ArticlePreviewWorkspace";

type Props = { params: Promise<{ draftId: string }> };

export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Article Preview | Internal Editorial OS",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return listDraftPackages().map((d) => ({ draftId: d.id }));
}

/**
 * Article Preview Workspace — primary editor experience.
 * Visitor-style reading + natural-language feedback revision.
 */
export default async function ArticlePreviewPage({ params }: Props) {
  const { draftId } = await params;
  const draft = loadDraftPackage(draftId);
  if (!draft) notFound();

  const existingApproval = findApprovedDraftByPackageId(draftId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ArticlePreviewWorkspace
        draft={draft}
        existingApproval={existingApproval}
      />
    </div>
  );
}
