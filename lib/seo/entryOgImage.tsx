/**
 * Shared renderer for per-article Open Graph preview cards.
 *
 * One design, five thin route files (`app/{memes,slang,events,people,trending}/[slug]/opengraph-image.tsx`)
 * — so the card can never drift between categories. Uses `next/og`'s
 * ImageResponse (the built-in successor to `@vercel/og`; no extra dependency).
 *
 * Visual language follows the site's design rules: flat charcoal surface,
 * a single green accent, no gradients or glass effects.
 *
 * Statically generated at build time (the segment's generateStaticParams
 * enumerates every slug), so there is zero runtime/origin cost per share.
 */

import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { BASE_URL } from "@/lib/seo";
import type { BaseEntry, ContentCategory } from "@/types";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = "image/png";
/** Static alt text (the `alt` file-convention export cannot be per-entry). */
export const OG_IMAGE_ALT = `${SITE_NAME} — encyclopedia entry preview`;

const COLORS = {
  background: "#141416",
  surface: "#1c1c1f",
  foreground: "#f4f4f5",
  muted: "#a1a1aa",
  accent: "#3dd68c",
  accentMuted: "rgba(61, 214, 140, 0.12)",
  accentBorder: "rgba(61, 214, 140, 0.28)",
} as const;

/** Public-facing labels — `creator` is shown as "Person" (public rename). */
const CATEGORY_LABEL: Record<ContentCategory, string> = {
  meme: "Meme",
  slang: "Slang",
  event: "Event",
  creator: "Person",
  trend: "Trend",
  brainrot: "Brainrot",
};

function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

/** Scale the headline down for long titles so it never overflows the card. */
function titleFontSize(title: string): number {
  if (title.length <= 24) return 84;
  if (title.length <= 44) return 68;
  if (title.length <= 70) return 54;
  return 44;
}

function siteHost(): string {
  try {
    return new URL(BASE_URL).host;
  } catch {
    return BASE_URL;
  }
}

/**
 * Render the preview card for an entry. Passing `null` (unknown slug) renders
 * the generic site card instead of throwing, so a bad request can never fail
 * the build or leave a route without an image.
 */
export function renderEntryOgImage(
  entry: Pick<BaseEntry, "title" | "description" | "category"> | null,
): ImageResponse {
  const title = truncate(entry?.title ?? SITE_NAME, 90);
  const summary = truncate(entry?.description || SITE_TAGLINE, 190);
  const badge = entry ? CATEGORY_LABEL[entry.category] ?? "Entry" : "Encyclopedia";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: COLORS.background,
          color: COLORS.foreground,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: COLORS.accentMuted,
              border: `2px solid ${COLORS.accentBorder}`,
              color: COLORS.accent,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {badge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: titleFontSize(title),
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 1056,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.4,
              color: COLORS.muted,
              maxWidth: 1000,
            }}
          >
            {summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: `2px solid ${COLORS.surface}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 999,
                background: COLORS.accent,
                marginRight: 16,
              }}
            />
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
              {SITE_NAME}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: COLORS.muted }}>
            {siteHost()}
          </div>
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
