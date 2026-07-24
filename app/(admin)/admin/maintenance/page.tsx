import type { Metadata } from "next";
import { MaintenanceCenter } from "@/components/admin/maintenance/MaintenanceCenter";
import { listMaintenanceReports } from "@/lib/admin/maintenance/reportStore";

export const metadata: Metadata = {
  title: "Maintenance Center (Experimental)",
  robots: { index: false, follow: false },
};

/**
 * Experimental Maintenance Center — editor-only dynamic metadata refresh.
 * Not linked from the public site.
 */
export default function MaintenancePage() {
  const recentReports = listMaintenanceReports()
    .slice(0, 20)
    .map((r) => ({
      id: r.id,
      createdAt: r.createdAt,
      status: r.status,
      scopeLabel: r.scopeLabel,
      targetCount: r.targetCount,
      updatedCount: r.updatedCount,
      manualReviewSlugs: r.manualReviewSlugs,
    }));

  return <MaintenanceCenter recentReports={recentReports} />;
}
