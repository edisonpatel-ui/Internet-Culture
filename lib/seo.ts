import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "./constants";
import { getEntryPreviewImageUrl } from "@/lib/media/mediaUtils";
import { getDetailHref } from "@/lib/utils";
import type { BaseEntry, ContentCategory, CreatorEntry, EventEntry } from "@/types";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://internetculturehub.com";

// ─── Metadata ────────────────────────────────────────────────────────────────

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  /** Absolute or site-relative image URL for OG/Twitter */
  image?: string | null;
  keywords?: string[];
  type?: "website" | "article";
  /** Override canonical when it differs from path (e.g. trending → category) */
  canonicalPath?: string;
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return `${BASE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image,
  keywords,
  type = "website",
  canonicalPath,
}: CreateMetadataOptions): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = toAbsoluteUrl(canonicalPath ?? (path || "/"));
  const ogImages = image
    ? [{ url: toAbsoluteUrl(image), alt: title ?? SITE_NAME }]
    : undefined;

  return {
    title: { absolute: fullTitle },
    description,
    keywords: keywords?.length ? keywords : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImages ? { images: [toAbsoluteUrl(image!)] } : {}),
    },
    alternates: {
      canonical,
    },
  };
}

/** Category-aware SEO title — unique, readable, not stuffed. */
export function buildEntrySeoTitle(
  entry: Pick<BaseEntry, "title" | "category">,
): string {
  switch (entry.category) {
    case "meme":
      return `${entry.title} Meme Meaning & Origin`;
    case "slang":
      return `${entry.title} Meaning — Internet Slang Explained`;
    case "event":
      return `${entry.title} — Internet Culture Event`;
    case "creator":
      return `${entry.title} — Internet Creator Profile`;
    case "trend":
      return `${entry.title} — Viral Trend Explained`;
    case "brainrot":
      return `${entry.title} — Brainrot Explained`;
    default:
      return entry.title;
  }
}

/**
 * Useful meta description from entry copy.
 * Keeps natural language; adds light category context only when short.
 */
export function buildEntrySeoDescription(entry: BaseEntry): string {
  const raw = (entry.description || "").trim();
  const max = 160;

  const suffix: Partial<Record<ContentCategory, string>> = {
    meme: " Meaning, origin, and cultural impact.",
    slang: " Definition, origin, and how it is used online.",
    event: " What happened and why it mattered online.",
    creator: " Platforms, influence, and cultural impact.",
    trend: " What it is and why it went viral.",
  };

  let text = raw;
  if (text.length < 90 && suffix[entry.category]) {
    text = `${text.replace(/\.$/, "")}.${suffix[entry.category]}`;
  }

  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Natural keywords — title + category + a few tags. No stuffing. */
export function buildEntryKeywords(entry: BaseEntry): string[] {
  const keywords = [
    entry.title,
    entry.category,
    "internet culture",
    ...(entry.tags ?? []).slice(0, 4),
  ];
  return [...new Set(keywords.map((k) => k.toLowerCase()))];
}

/**
 * Full metadata for an encyclopedia entry.
 * Canonical always points at the category-native URL (avoids /trending duplicates).
 */
export function createEntryMetadata(
  entry: BaseEntry,
  options?: { path?: string },
): Metadata {
  const canonicalPath = getDetailHref(entry.category, entry.slug);
  const path = options?.path ?? canonicalPath;
  const image = getEntryPreviewImageUrl(entry);

  return createMetadata({
    title: buildEntrySeoTitle(entry),
    description: buildEntrySeoDescription(entry),
    path,
    canonicalPath,
    image,
    keywords: buildEntryKeywords(entry),
    type: "article",
  });
}

// ─── JSON-LD helpers ────────────────────────────────────────────────────────

interface BreadcrumbCrumb {
  name: string;
  path: string;
}

export function createBreadcrumbJsonLd(
  breadcrumbs: BreadcrumbCrumb[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: BASE_URL,
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: toAbsoluteUrl(crumb.path),
      })),
    ],
  };
}

interface ArticleJsonLdOptions {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string | null;
  breadcrumbs: BreadcrumbCrumb[];
}

/** Article + BreadcrumbList — used for memes, slang, trends. */
export function createArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
  breadcrumbs,
}: ArticleJsonLdOptions): object[] {
  const url = toAbsoluteUrl(path);
  const absoluteImage = image ? toAbsoluteUrl(image) : undefined;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  if (absoluteImage) {
    articleSchema.image = [absoluteImage];
  }

  return [articleSchema, createBreadcrumbJsonLd(breadcrumbs)];
}

/** Person schema for creator profiles. */
export function createPersonJsonLd(
  creator: CreatorEntry,
  options: { path: string; breadcrumbs: BreadcrumbCrumb[] },
): object[] {
  const url = toAbsoluteUrl(options.path);
  const image = getEntryPreviewImageUrl(creator);
  const sameAs = (creator.platforms ?? [])
    .map((p) => p.url)
    .filter((u): u is string => Boolean(u));

  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: creator.title,
    description: creator.description,
    url,
    ...(image ? { image: toAbsoluteUrl(image) } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    jobTitle: "Internet creator",
  };

  return [person, createBreadcrumbJsonLd(options.breadcrumbs)];
}

/** Event schema for cultural events. */
export function createEventJsonLd(
  event: EventEntry,
  options: { path: string; breadcrumbs: BreadcrumbCrumb[] },
): object[] {
  const url = toAbsoluteUrl(options.path);
  const image = getEntryPreviewImageUrl(event);
  const startDate =
    event.startDate ?? event.historicalDate ?? event.addedAt;

  const eventSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    url,
    startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: {
      "@type": "VirtualLocation",
      url,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    ...(image ? { image: [toAbsoluteUrl(image)] } : {}),
  };

  return [eventSchema, createBreadcrumbJsonLd(options.breadcrumbs)];
}

/** CollectionPage + ItemList for category listing pages. */
export function createCollectionPageJsonLd(options: {
  name: string;
  description: string;
  path: string;
  entries: Array<Pick<BaseEntry, "title" | "slug" | "category" | "description">>;
}): object {
  const url = toAbsoluteUrl(options.path);
  const items = options.entries.slice(0, 24);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.name,
    description: options.description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: options.entries.length,
      itemListElement: items.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: toAbsoluteUrl(getDetailHref(entry.category, entry.slug)),
        name: entry.title,
      })),
    },
  };
}

/** WebSite schema with SearchAction for the homepage. */
export function createWebSiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Convenience: Article JSON-LD from a BaseEntry. */
export function createEntryArticleJsonLd(
  entry: BaseEntry,
  breadcrumbs: BreadcrumbCrumb[],
): object[] {
  const path = getDetailHref(entry.category, entry.slug);
  return createArticleJsonLd({
    title: entry.title,
    description: entry.description,
    path,
    datePublished: entry.addedAt,
    dateModified: entry.lastUpdated ?? entry.addedAt,
    image: getEntryPreviewImageUrl(entry),
    breadcrumbs,
  });
}
