import { redirect } from "next/navigation";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

type Props = { params: Promise<{ editId: string }> };

/** Legacy → Admin */
export default async function LegacyEditDetailRedirect({ params }: Props) {
  const { editId } = await params;
  redirect(experimentalPaths.edit(editId));
}
