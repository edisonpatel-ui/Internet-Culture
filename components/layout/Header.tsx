"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  EXPLORE_NAV_LINKS,
  PRIMARY_NAV_LINKS,
  UTILITY_NAV_LINKS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Wordmark: "Internet Culture" + brand-colored "Hub". */
function Wordmark() {
  return (
    <span className="flex items-baseline gap-1 font-semibold tracking-tight">
      <span className="text-zinc-300">Internet Culture</span>
      <span className="text-[var(--accent-secondary)]">Hub</span>
    </span>
  );
}

/** Short version for mid-size screens. */
function WordmarkShort() {
  return (
    <span className="font-semibold tracking-tight">
      <span className="text-white">IC </span>
      <span className="text-[var(--accent-secondary)]">Hub</span>
    </span>
  );
}

function navLinkClass(active: boolean) {
  return cn(
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-[var(--accent-muted)] text-white"
      : "text-zinc-400 hover:bg-white/5 hover:text-white"
  );
}

function isExplorePath(pathname: string) {
  return (
    pathname.startsWith("/trending") ||
    pathname.startsWith("/brainrot") ||
    pathname.startsWith("/rankings")
  );
}

function exploreItemActive(pathname: string, href: string) {
  const pathOnly = href.split("#")[0] ?? href;
  if (pathOnly === "/trending") {
    return pathname === "/trending" || pathname.startsWith("/trending/");
  }
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [navPathname, setNavPathname] = useState(pathname);
  const exploreRef = useRef<HTMLDivElement>(null);

  // Close menus when the route changes (adjust state while rendering — not in an effect).
  if (pathname !== navPathname) {
    setNavPathname(pathname);
    setExploreOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!exploreOpen) return;

    function onPointerDown(e: MouseEvent) {
      if (!exploreRef.current?.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setExploreOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [exploreOpen]);

  const exploreActive = isExplorePath(pathname);

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
          <span className="hidden sm:block lg:hidden">
            <WordmarkShort />
          </span>
          <span className="hidden lg:block">
            <Wordmark />
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {PRIMARY_NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(isActive)}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="relative" ref={exploreRef}>
            <button
              type="button"
              aria-expanded={exploreOpen}
              aria-haspopup="menu"
              aria-controls="explore-menu"
              onClick={() => setExploreOpen((v) => !v)}
              className={cn(
                navLinkClass(exploreActive || exploreOpen),
                "inline-flex items-center gap-1"
              )}
            >
              Explore
              <svg
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  exploreOpen && "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {exploreOpen && (
              <div
                id="explore-menu"
                role="menu"
                className="absolute left-0 top-full z-50 mt-1 min-w-[12.5rem] rounded-xl border border-white/10 bg-zinc-950/95 p-1.5 shadow-xl backdrop-blur-xl"
              >
                {EXPLORE_NAV_LINKS.map((link) => {
                  const active = exploreItemActive(pathname, link.href);
                  return (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setExploreOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-[var(--accent-muted)] text-white"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="my-1 border-t border-white/10" />
                {UTILITY_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setExploreOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      pathname.startsWith(link.href)
                        ? "bg-[var(--accent-muted)] text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* ── Right-side actions ── */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 transition-all hover:border-[var(--accent-border)] hover:bg-[var(--accent-muted)] hover:text-white lg:flex"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search memes, slang…
          </Link>

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
          <Link
            href="/search"
            onClick={() => setMobileOpen(false)}
            className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search memes, slang, trends…
          </Link>

          <p className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Encyclopedia
          </p>
          <div className="mb-3 grid grid-cols-2 gap-1">
            {PRIMARY_NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[var(--accent-muted)] text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <p className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Explore
          </p>
          <div className="mb-3 grid grid-cols-2 gap-1">
            {EXPLORE_NAV_LINKS.map((link) => {
              const isActive = exploreItemActive(pathname, link.href);
              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[var(--accent-muted)] text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {UTILITY_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-[var(--accent-muted)] text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
