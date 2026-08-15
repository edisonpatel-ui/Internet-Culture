import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeEngineSettings } from "@/components/admin/settings/KnowledgeEngineSettings";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

export const metadata: Metadata = {
  title: "Knowledge Engine",
  robots: { index: false, follow: false },
};

export default async function ExperimentalSettingsPage() {
  const access = await requireAdminSession();
  if (!access.ok) notFound();
  return <KnowledgeEngineSettings />;
}
