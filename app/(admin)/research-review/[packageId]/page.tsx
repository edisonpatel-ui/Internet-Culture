import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export default function LegacyResearchReviewDetailRedirect() {
  redirect(experimentalPaths.drafts);
}
