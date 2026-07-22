import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export default function LegacyResearchReviewRedirect() {
  redirect(experimentalPaths.drafts);
}
