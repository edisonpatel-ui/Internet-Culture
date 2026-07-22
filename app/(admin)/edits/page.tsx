import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

/** Legacy → Experimental AI Lab */
export default function LegacyEditsRedirect() {
  redirect(experimentalPaths.edits);
}
