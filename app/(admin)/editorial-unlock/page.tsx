import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

/** Legacy → Experimental AI Lab unlock */
export default function LegacyEditorialUnlockRedirect() {
  redirect(experimentalPaths.unlock);
}
