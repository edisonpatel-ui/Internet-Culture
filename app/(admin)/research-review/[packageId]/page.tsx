import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  findApprovedByPackageId,
  listResearchPackages,
  loadResearchPackage,
} from "@/lib/admin/researchReview";
import { findDraftPackageByApprovedResearchId } from "@/lib/admin/draftGeneration";
import { ResearchReviewWorkspace } from "@/components/admin/researchReview/ResearchReviewWorkspace";

type Props = { params: Promise<{ packageId: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return listResearchPackages().map((p) => ({ packageId: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { packageId } = await params;
  const pkg = loadResearchPackage(packageId);
  return {
    title: pkg
      ? `Review: ${pkg.title} (Internal)`
      : "Research Review (Internal)",
    robots: { index: false, follow: false },
  };
}

/**
 * Research Review Workspace — ResearchPackage → ApprovedResearch.
 */
export default async function ResearchReviewPackagePage({ params }: Props) {
  const { packageId } = await params;
  const pkg = loadResearchPackage(packageId);
  if (!pkg) notFound();

  const existingApproval = findApprovedByPackageId(pkg.id);
  const existingDraft = existingApproval
    ? findDraftPackageByApprovedResearchId(existingApproval.id)
    : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs">
        <Link
          href="/research-review"
          className="text-zinc-500 underline hover:text-zinc-300"
        >
          ← All packages
        </Link>
        {" · "}
        <Link
          href="/research"
          className="text-zinc-500 underline hover:text-zinc-300"
        >
          Research Workspace
        </Link>
      </p>
      <ResearchReviewWorkspace
        researchPackage={pkg}
        existingApproval={existingApproval}
        existingDraftId={existingDraft?.id}
      />
    </main>
  );
}
