import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "./constants";

const BASE_URL =
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
    title: fullTitle,
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
  };
}
