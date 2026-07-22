import type { Metadata } from "next";
import { KnowledgeEngineSettings } from "@/components/admin/settings/KnowledgeEngineSettings";

export const metadata: Metadata = {
  title: "Knowledge Engine (Experimental)",
  robots: { index: false, follow: false },
};

export default function ExperimentalSettingsPage() {
  return <KnowledgeEngineSettings />;
}
