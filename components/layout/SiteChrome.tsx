"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isEditorialPath } from "@/lib/admin/editorialPaths";

/**
 * Public chrome (Header/Footer) is omitted on experimental / internal
 * Editorial OS routes so encyclopedia navigation cannot reach them.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const editorial = isEditorialPath(pathname);

  if (editorial) {
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
