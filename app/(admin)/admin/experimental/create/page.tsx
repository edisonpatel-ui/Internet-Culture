import type { Metadata } from "next";
import { CreateArticleWorkspace } from "@/components/admin/create/CreateArticleWorkspace";

export const metadata: Metadata = {
  title: "Create Article (Experimental)",
  robots: { index: false, follow: false },
};

export default function ExperimentalCreatePage() {
  return <CreateArticleWorkspace />;
}
