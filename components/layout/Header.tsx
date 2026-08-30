"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  EXPLORE_NAV_LINKS,
  PRIMARY_NAV_LINKS,
  TIMELINE_NAV_LINK,
  CULTURE_GRAPH_NAV_LINK,
  UTILITY_NAV_LINKS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Wordmark: full title in one color (no accent on "Hub"). */
function Wordmark() {
  return (
    <span className="font-semibold tracking-tight text-zinc-300">
      Internet Culture Hub
    </span>
  );
}

/** Short version for mid-size screens. */
function WordmarkShort() {
  return (
    <span className="font-semibold tracking-tight text-white">IC Hub</span>
  );
}

function navLinkClass(active: boolean) {
  return cn(
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-[var(--accent-muted)] text-white"
      : "text-zinc-400 hover:bg-white/5 hover:text-white"
  );
}

function itemActive(pathname: string, href: string) {
  const pathOnly = href.split("#")[0] ?? href;
  if (pathOnly === "/trending") {
    return pathname === "/trending" || pathname.startsWith("/trending/");
  }
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

function isArticlesPath(pathname: string) {
  return PRIMARY_NAV_LINKS.some((l) => itemActive(pathname, l.href));
}

function isExplorePath(pathname: string) {
  return (
    pathname.startsWith("/trending") ||
    pathname.startsWith("/brainrot") ||
    pathname.startsWith("/rankings")
  );
}

function isAboutPath(pathname: string) {
  return UTILITY_NAV_LINKS.some((l) => pathname.startsWith(l.href));
}

type MenuKey = "articles" | "explore" | "about";

interface NavDropdownProps {
  id: string;
  label: string;
  links: readonly { href: string; label: string }[];
  isOpen: boolean;
  isActive: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
  pathname: string;
}

/** One reusable dropdown implementation — reused for Articles, Explore, and About. */
function NavDropdown({ id, label, links, isOpen, isActive, onToggle, onLinkClick, pathname }: NavDropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={id}
        onClick={onToggle}
        className={cn(navLinkClass(isActive || isOpen), "inline-flex items-center gap-1")}
      >
        {label}
        <svg
          className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          id={id}
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 min-w-[12.5rem] rounded-xl border border-white/10 bg-zinc-950/95 p-1.5 shadow-xl backdrop-blur-xl"
        >
          {links.map((link) => {
            const active = itemActive(pathname, link.href);
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                role="menuitem"
                onClick={onLinkClick}
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
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [navPathname, setNavPathname] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);

  // Close menus when the route changes (adjust state while rendering — not in an effect).
  if (pathname !== navPathname) {
    setNavPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!openMenu) return;

    function onPointerDown(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  function toggleMenu(key: MenuKey) {
    setOpenMenu((v) => (v === key ? null : key));
  }

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

        {/* ── Desktop nav — exactly 5 top-level items ── */}
        <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          <NavDropdown
            id="articles-menu"
            label="Articles"
            links={PRIMARY_NAV_LINKS}
            isOpen={openMenu === "articles"}
            isActive={isArticlesPath(pathname)}
            onToggle={() => toggleMenu("articles")}
            onLinkClick={() => setOpenMenu(null)}
            pathname={pathname}
          />

          <Link
            href={TIMELINE_NAV_LINK.href}
            className={navLinkClass(pathname.startsWith(TIMELINE_NAV_LINK.href))}
          >
            {TIMELINE_NAV_LINK.label}
          </Link>

          <Link
            href={CULTURE_GRAPH_NAV_LINK.href}
            className={navLinkClass(pathname.startsWith(CULTURE_GRAPH_NAV_LINK.href))}
          >
            {CULTURE_GRAPH_NAV_LINK.label}
          </Link>

          <NavDropdown
            id="explore-menu"
            label="Explore"
            links={EXPLORE_NAV_LINKS}
            isOpen={openMenu === "explore"}
            isActive={isExplorePath(pathname)}
            onToggle={() => toggleMenu("explore")}
            onLinkClick={() => setOpenMenu(null)}
            pathname={pathname}
          />

          <NavDropdown
            id="about-menu"
            label="About"
            links={UTILITY_NAV_LINKS}
            isOpen={openMenu === "about"}
            isActive={isAboutPath(pathname)}
            onToggle={() => toggleMenu("about")}
            onLinkClick={() => setOpenMenu(null)}
            pathname={pathname}
          />
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
            Search
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
            Search
          </Link>

          <p className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Articles
          </p>
          <div className="mb-3 grid grid-cols-2 gap-1">
            {PRIMARY_NAV_LINKS.map((link) => {
              const isActive = itemActive(pathname, link.href);
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

          <Link
            href={TIMELINE_NAV_LINK.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "mb-3 block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              pathname.startsWith(TIMELINE_NAV_LINK.href)
                ? "bg-[var(--accent-muted)] text-white"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {TIMELINE_NAV_LINK.label}
          </Link>

          <Link
            href={CULTURE_GRAPH_NAV_LINK.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "mb-3 block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              pathname.startsWith(CULTURE_GRAPH_NAV_LINK.href)
                ? "bg-[var(--accent-muted)] text-white"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {CULTURE_GRAPH_NAV_LINK.label}
          </Link>

          <p className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Explore
          </p>
          <div className="mb-3 grid grid-cols-2 gap-1">
            {EXPLORE_NAV_LINKS.map((link) => {
              const isActive = itemActive(pathname, link.href);
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

          <p className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            About
          </p>
          <div className="grid grid-cols-1 gap-1">
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
          </div>
        </nav>
      )}
    </header>
  );
}
