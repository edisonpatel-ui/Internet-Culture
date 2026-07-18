/**
 * Network-backed media checks (HEAD + YouTube oEmbed).
 *
 * Soft warnings only. Never sets verified:true — humans remain the gate.
 * Keep offline validate/prebuild free of these calls.
 */

import type { BaseEntry, MediaItem } from "@/types";
import { SUSPICIOUS_HOSTS } from "@/lib/content/validateMedia";

export interface LiveMediaWarning {
  slug: string;
  title: string;
  field: string;
  message: string;
}

const UA = "InternetCultureHub-MediaAudit/1.0 (+local; content quality)";

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace(/^\//, "").slice(0, 11);
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const embed = u.pathname.match(/\/embed\/([\w-]{11})/);
      if (embed) return embed[1];
      const shorts = u.pathname.match(/\/shorts\/([\w-]{11})/);
      if (shorts) return shorts[1];
    }
  } catch {
    return null;
  }
  return null;
}

async function headOk(url: string): Promise<{
  ok: boolean;
  status: number;
  contentType: string;
  error?: string;
}> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(12_000),
    });
    // Some CDNs reject HEAD — fall back to GET range
    if (res.status === 405 || res.status === 403) {
      const getRes = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": UA, Range: "bytes=0-0" },
        signal: AbortSignal.timeout(12_000),
      });
      return {
        ok: getRes.ok || getRes.status === 206,
        status: getRes.status,
        contentType: getRes.headers.get("content-type") ?? "",
      };
    }
    return {
      ok: res.ok,
      status: res.status,
      contentType: res.headers.get("content-type") ?? "",
    };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      contentType: "",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

async function checkYouTubeOembed(videoId: string): Promise<{
  ok: boolean;
  embeddable: boolean;
  message?: string;
}> {
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${videoId}`,
  )}&format=json`;
  try {
    const res = await fetch(oembedUrl, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) {
      return {
        ok: false,
        embeddable: false,
        message: `YouTube oEmbed HTTP ${res.status} for ${videoId} (deleted/private/unavailable)`,
      };
    }
    const data = (await res.json()) as { html?: string; title?: string };
    const embeddable = typeof data.html === "string" && data.html.includes("iframe");
    if (!embeddable) {
      return {
        ok: true,
        embeddable: false,
        message: `YouTube ${videoId} oEmbed returned but embedding appears disabled`,
      };
    }
    return { ok: true, embeddable: true };
  } catch (e) {
    return {
      ok: false,
      embeddable: false,
      message: `YouTube oEmbed failed for ${videoId}: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
}

function isImageLike(contentType: string): boolean {
  if (!contentType) return true; // some hosts omit type on HEAD
  const ct = contentType.toLowerCase();
  return (
    ct.startsWith("image/") ||
    ct.includes("svg") ||
    ct.includes("octet-stream") // some CDNs
  );
}

async function checkMediaItem(
  entry: BaseEntry,
  item: MediaItem,
  index: number,
): Promise<LiveMediaWarning[]> {
  const warnings: LiveMediaWarning[] = [];
  const ref = `media[${index}] "${item.title ?? "(no title)"}"`;
  const base = { slug: entry.slug, title: entry.title, field: ref };

  if (!item.url?.trim()) {
    warnings.push({ ...base, message: "Missing URL" });
    return warnings;
  }

  const urlLower = item.url.toLowerCase();
  const suspicious = SUSPICIOUS_HOSTS.find((h) => urlLower.includes(h));
  if (suspicious) {
    warnings.push({
      ...base,
      message: `Banned/suspicious host ("${suspicious}") — do not use for production media`,
    });
  }

  const ytId = extractYouTubeId(item.url);
  if (ytId && (item.type === "video" || item.type === "embed" || item.platform === "youtube")) {
    const yt = await checkYouTubeOembed(ytId);
    if (!yt.ok || !yt.embeddable) {
      warnings.push({
        ...base,
        message: yt.message ?? `YouTube video ${ytId} failed oEmbed check`,
      });
    }
    // Do not mark verified — human gate only
    return warnings;
  }

  // Featured / supporting images: reachability
  if (
    item.role === "featured" ||
    item.role === "supporting" ||
    item.type === "image" ||
    item.type === "gif"
  ) {
    const head = await headOk(item.url);
    if (!head.ok) {
      warnings.push({
        ...base,
        message: head.error
          ? `URL unreachable: ${head.error}`
          : `URL returned HTTP ${head.status}`,
      });
    } else if (
      (item.type === "image" || item.type === "gif") &&
      !isImageLike(head.contentType)
    ) {
      warnings.push({
        ...base,
        message: `URL reachable but Content-Type is "${head.contentType || "(missing)"}" — expected an image`,
      });
    }
  }

  return warnings;
}

/**
 * Run live checks for all media on the given entries.
 * Concurrent with a small concurrency limit.
 */
export async function runLiveMediaChecks(
  entries: readonly BaseEntry[],
  options?: { concurrency?: number },
): Promise<LiveMediaWarning[]> {
  const concurrency = options?.concurrency ?? 6;
  const warnings: LiveMediaWarning[] = [];
  const queue: Array<() => Promise<void>> = [];

  for (const entry of entries) {
    const media = entry.media ?? [];
    for (let i = 0; i < media.length; i++) {
      const item = media[i];
      const idx = i;
      queue.push(async () => {
        const w = await checkMediaItem(entry, item, idx);
        warnings.push(...w);
      });
    }
  }

  let cursor = 0;
  async function worker() {
    while (cursor < queue.length) {
      const i = cursor++;
      await queue[i]();
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, () => worker()),
  );

  return warnings;
}

/** Never auto-set verified:true — helper documents the human gate. */
export function assertVerifiedRemainsHumanControlled(): true {
  return true;
}
