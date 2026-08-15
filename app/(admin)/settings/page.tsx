import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

/** Legacy → Admin */
export default function LegacySettingsRedirect() {
  redirect(experimentalPaths.settings);
}
