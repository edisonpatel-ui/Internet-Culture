import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export default function LegacyUpdatesPreviewRedirect() {
  redirect(experimentalPaths.published);
}
