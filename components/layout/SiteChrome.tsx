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
    // `h-dvh` (dynamic viewport height) rather than `min-h-full`/`100vh`:
    // mobile Safari and Chrome resize their visual viewport as the address
    // bar shows/hides on scroll, and `100vh` is measured against the
    // LARGEST possible viewport — so a `min-h-full` (which depends on an
    // ancestor's height resolving sensibly at all) or `100vh` container can
    // end up taller than what's actually visible, leaving Scalar's
    // internal panes to fight the outer page for scroll ("double scroll").
    // `h-dvh` tracks the real, current visual viewport, and `overflow-hidden`
    // here ensures only Scalar's own internal scroll containers scroll —
    // never this outer wrapper — which is what makes the 3-pane layout feel
    // like one seamless scroll area on a touch device instead of two nested
    // scrollbars fighting each other.
    return <div className="flex h-dvh flex-1 flex-col overflow-hidden overscroll-contain">{children}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
