"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Wordmark: "Internet Culture" light-weight + "Hub" accented. */
function Wordmark() {
  return (
    <span className="flex items-baseline gap-1 font-semibold tracking-tight">
      <span className="text-zinc-300">Internet Culture</span>
      <span className="text-white">Hub</span>
    </span>
  );
}

/** Short version for mid-size screens where the full name + 9 nav links won't fit. */
function WordmarkShort() {
  return (
    <span className="font-semibold tracking-tight text-white">IC Hub</span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/5"
      style={{ background: "var(--header-bg)", backdropFilter: "blur(20px)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo + Wordmark ── */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <Image
            src="/ic-logo.png"
            alt="Internet Culture Hub"
            width={36}
            height={36}
            priority
            className="h-9 w-9 shrink-0 transition-transform duration-200 group-hover:scale-105"
          />
          {/* Short name: visible from sm → lg */}
          <span className="hidden sm:block lg:hidden">
            <WordmarkShort />
          </span>
          {/* Full name: visible from lg+ */}
          <span className="hidden lg:block">
            <Wordmark />
          </span>
        </Link>

        {/* ── Desktop nav (only at lg+, where 9 items fit comfortably) ── */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right-side actions ── */}
        <div className="flex items-center gap-2">
          {/* Search pill — desktop only */}
          <Link
            href="/search"
            aria-label="Search"
            className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white lg:flex"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </Link>

          {/* Mobile/tablet hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition-colors hover:border-white/20 hover:text-white lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile / tablet drawer ── */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/5 px-4 pb-4 pt-3 lg:hidden"
          style={{ background: "var(--header-bg)" }}
        >
          {/* Search row */}
          <Link
            href="/search"
            onClick={() => setMobileOpen(false)}
            className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search the encyclopedia…
          </Link>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
