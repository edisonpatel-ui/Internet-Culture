"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  EXPERIMENTAL_OS_BASE,
  experimentalPaths,
} from "@/lib/admin/experimentalPaths";

const NAV = [
  { href: "/admin", label: "Admin" },
  { href: experimentalPaths.create, label: "Prompt" },
  { href: experimentalPaths.drafts, label: "Drafts" },
  { href: experimentalPaths.edits, label: "Edits" },
  { href: experimentalPaths.maintenance, label: "Maintenance" },
  { href: experimentalPaths.settings, label: "Settings" },
] as const;

function isImmersive(pathname: string): boolean {
  const base = EXPERIMENTAL_OS_BASE;
  if (pathname.startsWith(`${base}/drafts/`) && pathname !== `${base}/drafts`) {
    return true;
  }
  if (pathname.startsWith(`${base}/edits/`) && pathname !== `${base}/edits`) {
    return true;
  }
  if (
    pathname.startsWith(`${base}/published/`) &&
    pathname !== `${base}/published`
  ) {
    return true;
  }
  return false;
}

/**
 * Internal Admin chrome — experimental tools only.
 */
export function AdminChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";

  const isMaintenance =
    pathname === experimentalPaths.maintenance ||
    pathname.startsWith(`${experimentalPaths.maintenance}/`);

  const underAdmin =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith(EXPERIMENTAL_OS_BASE) ||
    isMaintenance;

  if (!underAdmin) {
    return <>{children}</>;
  }

  if (pathname === "/admin/access" || pathname.startsWith("/admin/access/")) {
    return <>{children}</>;
  }

  if (isImmersive(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="border-b border-amber-900/40 bg-zinc-950">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs text-zinc-400 sm:px-6 lg:px-8">
          <p>
            <span className="font-medium text-amber-200/90">Admin</span>
            {" — "}
            Internal
          </p>
          <nav className="flex flex-wrap gap-2">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "rounded-md border border-amber-700/60 bg-zinc-900 px-2 py-1 text-amber-100"
                      : "rounded-md border border-zinc-700 px-2 py-1 text-zinc-300 hover:bg-zinc-900"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {children}
    </>
  );
}
