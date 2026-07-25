import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MaintenanceCenter } from "@/components/admin/maintenance/MaintenanceCenter";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";
import { loadCategoryResume } from "@/lib/admin/maintenance/progressStore";
import { listMaintenanceReports } from "@/lib/admin/maintenance/reportStore";
import type { MaintenanceCategoryFilter } from "@/lib/admin/maintenance/types";
import { getAllEntriesSync } from "@/lib/services/entries";

export const metadata: Metadata = {
  title: "Maintenance (Experimental)",
  robots: { index: false, follow: false },
};

const CATEGORIES: MaintenanceCategoryFilter[] = [
  "meme",
  "slang",
  "creator",
  "event",
  "trend",
];

export default async function MaintenancePage() {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  const catalog = getAllEntriesSync();
  const categoryCounts = {
    meme: 0,
    slang: 0,
    creator: 0,
    event: 0,
    trend: 0,
  } satisfies Record<MaintenanceCategoryFilter, number>;

  for (const entry of catalog) {
    if (entry.category in categoryCounts) {
      categoryCounts[entry.category as MaintenanceCategoryFilter] += 1;
    }
  }

  const resumeByCategory: Partial<
    Record<MaintenanceCategoryFilter, ReturnType<typeof loadCategoryResume>>
  > = {};
  for (const cat of CATEGORIES) {
    resumeByCategory[cat] = loadCategoryResume(cat);
  }

  const recentReports = listMaintenanceReports()
    .slice(0, 20)
    .map((r) => ({
      id: r.id,
      createdAt: r.createdAt,
      status: r.status,
      jobStatus: r.jobStatus,
      scopeLabel: r.scopeLabel,
      targetCount: r.targetCount,
      updatedCount: r.updatedCount,
      unchangedCount: r.unchangedCount,
      failedCount: r.failedCount,
    }));

  return (
    <MaintenanceCenter
      recentReports={recentReports}
      categoryCounts={categoryCounts}
      resumeByCategory={resumeByCategory}
    />
  );
}
