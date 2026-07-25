import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RefreshReportView } from "@/components/admin/maintenance/RefreshReportView";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";
import { loadMaintenanceReport } from "@/lib/admin/maintenance/reportStore";

export const metadata: Metadata = {
  title: "Refresh Report (Experimental)",
  robots: { index: false, follow: false },
};

export default async function MaintenanceReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  const { reportId } = await params;
  const report = loadMaintenanceReport(reportId);
  if (!report) notFound();
  return <RefreshReportView report={report} />;
}
