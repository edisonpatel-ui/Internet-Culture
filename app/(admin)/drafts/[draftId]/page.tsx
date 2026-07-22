import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

type Props = { params: Promise<{ draftId: string }> };

/** Legacy → Experimental AI Lab */
export default async function LegacyDraftDetailRedirect({ params }: Props) {
  const { draftId } = await params;
  redirect(experimentalPaths.draft(draftId));
}
