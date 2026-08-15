"use server";

/**
 * Server actions for true publish.
 */

import { revalidatePath } from "next/cache";
import { deleteDraftPackage } from "@/lib/admin/draftGeneration/draftPackageStore";
import {
  deleteApprovedDraft,
  loadApprovedDraft,
} from "@/lib/admin/draftReview/approvedDraftStore";
import { revalidatePublicDiscovery } from "@/lib/admin/revalidatePublicDiscovery";
import { publishApprovedDraft } from "./publishApprovedDraft";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

async function gate(): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminSession();
  if (!access.ok) return { ok: false, error: "Not found." };
  return { ok: true };
}

export async function publishApprovedDraftAction(
  approvedDraftId: string,
): Promise<
  | {
      ok: true;
      filePath: string;
      slug: string;
      category: string;
      fixes: string[];
      buildOk: boolean;
    }
  | {
      ok: false;
      error: string;
      fixes?: string[];
      judgmentRequired?: string[];
      validateOutput?: string;
      buildOutput?: string;
    }
> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    const before = loadApprovedDraft(approvedDraftId);
    const packageId = before?.draftPackageId;

    const result = publishApprovedDraft(approvedDraftId);
    revalidatePath("/admin");
    revalidatePath("/admin/drafts");
    revalidatePath("/admin/published");
    revalidatePath("/admin/edits");
    revalidatePath("/publish");
    revalidatePath("/drafts");
    revalidatePublicDiscovery();

    if (!result.ok || !result.published) {
      return {
        ok: false,
        error: result.error ?? "Publish failed.",
        fixes: result.fixes,
        judgmentRequired: result.judgmentRequired,
        validateOutput: result.validateOutput,
        buildOutput: result.buildOutput,
      };
    }

    if (result.validateOk) {
      if (packageId) deleteDraftPackage(packageId);
      deleteApprovedDraft(approvedDraftId);
    }

    const publicPath =
      result.published.category === "creator"
        ? `/people/${result.published.slug}`
        : result.published.category === "event"
          ? `/events/${result.published.slug}`
          : result.published.category === "trend"
            ? `/trending/${result.published.slug}`
            : result.published.category === "slang"
              ? `/slang/${result.published.slug}`
              : `/memes/${result.published.slug}`;
    revalidatePath(publicPath);

    return {
      ok: true,
      filePath: result.published.filePath,
      slug: result.published.slug,
      category: result.published.category,
      fixes: result.fixes,
      buildOk: Boolean(result.buildOk),
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Publish failed.",
    };
  }
}
