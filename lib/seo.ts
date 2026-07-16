import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "./constants";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://internetculturehub.com";

export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: { absolute: fullTitle },
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: `${BASE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}${path}`,
    },
  };
}

// ─── JSON-LD helpers ────────────────────────────────────────────────────────

interface ArticleJsonLdOptions {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  /** breadcrumbs: array of { name, path } from root to current */
  breadcrumbs: Array<{ name: string; path: string }>;
}

export function createArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  breadcrumbs,
}: ArticleJsonLdOptions): object {
  const url = `${BASE_URL}${path}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: datePublished,
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

  const breadcrumbSchema = {
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
        item: `${BASE_URL}${crumb.path}`,
      })),
    ],
  };

  return [articleSchema, breadcrumbSchema];
}
