import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

type Props = { params: Promise<{ draftId: string }> };

export default async function LegacyDraftStudioDetailRedirect({
  params,
}: Props) {
  const { draftId } = await params;
  redirect(experimentalPaths.draft(draftId));
}
