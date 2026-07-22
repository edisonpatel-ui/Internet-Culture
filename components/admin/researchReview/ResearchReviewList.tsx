import Link from "next/link";
import type { ApprovedResearch, ResearchPackage } from "@/lib/ai/packages";

interface ResearchReviewListProps {
  packages: ResearchPackage[];
  approvalsByPackageId: Record<string, ApprovedResearch>;
}

export function ResearchReviewList({
  packages,
  approvalsByPackageId,
}: ResearchReviewListProps) {
  if (packages.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 px-6 py-12 text-center text-sm text-zinc-500">
        No research packages seeded. Open Research Workspace sessions first
        (packages are adapted from session reports).
      </div>
    );
  }

  return (
    <ul className="divide-y divide-zinc-900 rounded-lg border border-zinc-800">
      {packages.map((pkg) => {
        const approved = approvalsByPackageId[pkg.id];
        return (
          <li key={pkg.id}>
            <Link
              href={`/research-review/${pkg.id}`}
              className="flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-zinc-100">{pkg.title}</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {pkg.id} · AI category: {pkg.categoryRecommendation}
                </p>
              </div>
              <span
                className={`text-xs ${
                  approved ? "text-emerald-400/90" : "text-amber-300/90"
                }`}
              >
                {approved ? "Approved" : "Needs review"}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
