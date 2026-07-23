import Link from "next/link";
import Image from "next/image";
import {
  FOOTER_BROWSE_LINKS,
  FOOTER_LEGAL_LINKS,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t border-white/5"
      style={{ background: "rgba(0,0,0,0.2)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <Image
                src="/ic-logo.png"
                alt="Internet Culture Hub"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <span className="flex items-baseline gap-1 font-semibold tracking-tight">
                <span className="text-zinc-300">Internet Culture</span>
                <span className="text-[var(--accent-secondary)]">Hub</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              {SITE_TAGLINE}
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-zinc-500">
              Clear entries on memes, slang, people, and cultural moments —
              written to be useful, not hype.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Browse
            </h3>
            <ul className="space-y-2">
              {FOOTER_BROWSE_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Legal
            </h3>
            <ul className="space-y-2">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-500">
            © {currentYear} {SITE_NAME}
          </p>
          <p className="text-xs text-zinc-600">Public encyclopedia</p>
        </div>
      </div>
    </footer>
  );
}
