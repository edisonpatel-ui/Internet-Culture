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
import { getEntryBySlug } from "@/lib/services/entries";
import { saveMetricSnapshot } from "@/lib/services/metricsHistory";

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

    // Log the article's starting relevance score to Redis as its first
    // metrics:history:<slug> snapshot, same store the Vercel Cron job and
    // manual Maintenance refreshes write to — a brand-new article should
    // have a real first data point rather than waiting for its first cron
    // rotation. Best-effort: re-fetching the just-written entry and a
    // Redis hiccup must never fail a publish that has already succeeded.
    try {
      const published = await getEntryBySlug(result.published.slug);
      if (published) {
        await saveMetricSnapshot(published.slug, published.scores.relevance);
      }
    } catch (err) {
      console.error(
        `[publish] Failed to log initial Redis metric snapshot for ` +
          `"${result.published.slug}" (publish itself succeeded):`,
        err,
      );
    }

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
