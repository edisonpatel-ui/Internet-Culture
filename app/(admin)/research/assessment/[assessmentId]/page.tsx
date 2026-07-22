import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export default function LegacyAssessmentRedirect() {
  redirect(experimentalPaths.hub);
}
