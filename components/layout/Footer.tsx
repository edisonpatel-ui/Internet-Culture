import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/5 bg-zinc-950/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-bold text-white">
                ICH
              </span>
              <span className="font-semibold text-white">{SITE_NAME}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              {SITE_TAGLINE}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Explore
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Coming Soon
            </h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>AI Trend Detection</li>
              <li>User Accounts</li>
              <li>Brand Analytics</li>
              <li>Affiliate Shop</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Version 1 — Public Encyclopedia
          </p>
        </div>
      </div>
    </footer>
  );
}
