import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreateArticleWorkspace } from "@/components/admin/create/CreateArticleWorkspace";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

export const metadata: Metadata = {
  title: "Draft Studio (Experimental)",
  robots: { index: false, follow: false },
};

export default async function ExperimentalCreatePage() {
  const access = await requireAdminSession();
  if (!access.ok) notFound();
  return <CreateArticleWorkspace />;
}
