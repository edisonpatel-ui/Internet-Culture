import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/5" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="h-9 w-9 shrink-0">
                <defs>
                  <linearGradient id="ich-grad-footer" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#c026d3" />
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="10" fill="url(#ich-grad-footer)" />
                <path d="M10 13h4v14h-4V13zm8 0h4v5.5h5V13h4v14h-4v-5.5h-5V27h-4V13z" fill="white" />
              </svg>
              <span className="font-semibold text-white">{SITE_NAME}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              {SITE_TAGLINE}
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-zinc-500">
              The world&apos;s organized database of internet culture. Discover, understand, and explore memes, slang, viral trends, and cultural events.
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
              <li>Trend Reports</li>
              <li>Affiliate Shop</li>
              <li>API Access</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-500">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-zinc-500 transition-colors hover:text-zinc-400">About</Link>
            <span className="text-xs text-zinc-600">·</span>
            <p className="text-xs text-zinc-600">v1.0 — Public Encyclopedia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
