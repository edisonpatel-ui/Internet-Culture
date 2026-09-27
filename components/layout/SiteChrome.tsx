"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isEditorialPath } from "@/lib/admin/editorialPaths";

/**
 * /docs (the interactive Scalar API reference, app/docs/page.tsx) renders
 * its own complete, full-viewport 3-pane UI with its own navigation — it is
 * a legitimate public page (unlike Editorial OS routes below), just one
 * that needs to own the whole screen rather than sit inside the site's
 * Header/Footer, which would otherwise double up the chrome.
 */
function isFullBleedPath(pathname: string): boolean {
  return pathname === "/docs" || pathname.startsWith("/docs/reference");
}

/**
 * Public chrome (Header/Footer) is omitted on experimental / internal
 * Editorial OS routes so encyclopedia navigation cannot reach them, and on
 * full-bleed pages like /docs that render their own complete UI.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const editorial = isEditorialPath(pathname);
  const fullBleed = isFullBleedPath(pathname);

  if (editorial || fullBleed) {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
