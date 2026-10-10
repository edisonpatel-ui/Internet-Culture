"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import "@scalar/api-reference-react/style.css";

/**
 * Scalar's React wrapper (@scalar/api-reference-react) renders via an
 * internal Vue instance that touches the DOM directly, so it's loaded with
 * `ssr: false` — there's nothing meaningful to server-render here anyway,
 * the whole point is the client-side interactive browser.
 */
const ApiReferenceReact = dynamic(
  () => import("@scalar/api-reference-react").then((mod) => mod.ApiReferenceReact),
  { ssr: false, loading: () => <p className="p-8 text-sm text-zinc-500">Loading API reference…</p> },
);

/** Height of the slim site bar above the reference. */
const TOP_BAR_PX = 48;

/**
 * Scalar's "modern" layout is the split-pane we want on desktop:
 *   left   — endpoint navigation
 *   middle — endpoint documentation (description, parameters, responses)
 *   right  — request examples (curl / JavaScript / Python) and live response
 * On narrow screens Scalar collapses this to one column with a menu button.
 *
 * Custom CSS only tunes typography/colors to match the site.
 */
const CUSTOM_CSS = `
  /* The site bar sits OUTSIDE Scalar's scroll container, so no extra sticky offset is needed. */
  :root { --scalar-custom-header-height: 0px; }
  .dark-mode, .light-mode {
    --scalar-font: var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif);
    --scalar-radius: 8px;
    --scalar-radius-lg: 10px;
  }
  .dark-mode {
    --scalar-background-1: #09090b;
    --scalar-background-2: #111114;
    --scalar-background-3: #18181c;
    --scalar-border-color: rgba(255, 255, 255, 0.1);
  }
  .scalar-app .section-header-label { letter-spacing: -0.01em; }
`;

export function ApiReferenceView() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header
        className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#09090b] px-4 sm:px-6"
        style={{ height: TOP_BAR_PX }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="truncate text-sm font-semibold text-white hover:text-zinc-300">
            Internet Culture Hub
          </Link>
          <span className="hidden text-zinc-600 sm:inline">/</span>
          <span className="hidden text-sm text-zinc-400 sm:inline">API Reference</span>
        </div>
        <nav className="flex shrink-0 items-center gap-4 whitespace-nowrap text-sm">
          <Link href="/guides" className="text-zinc-400 hover:text-white">
            Developer Guides
          </Link>
          <Link href="/pricing" className="hidden text-zinc-400 hover:text-white sm:inline">
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md border border-white/10 px-2.5 py-1 text-zinc-200 hover:bg-white/5"
          >
            Dashboard
          </Link>
        </nav>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <ApiReferenceReact
          configuration={{
            url: "/openapi.json",
            layout: "modern",
            theme: "deepSpace",
            showSidebar: true,
            hideModels: true,
            hideDarkModeToggle: true,
            forceDarkModeState: "dark",
            defaultOpenFirstTag: true,
            hideClientButton: false,
            // Strip vendor upsell chrome (toolbar, dev tools, MCP/AI agent promos) for a clean docs surface.
            showDeveloperTools: "never",
            mcp: { disabled: true },
            defaultHttpClient: { targetKey: "shell", clientKey: "curl" },
            hiddenClients: {
              c: true,
              clojure: true,
              csharp: true,
              dart: true,
              kotlin: true,
              objc: true,
              ocaml: true,
              powershell: true,
              r: true,
              swift: true,
            },
            metaData: { title: "API Reference — Culture Graph API" },
            // Scalar's default web fonts load from fonts.scalar.com, which the site CSP (font-src 'self' data:) blocks.
            // Use the site's own font stack instead (see --scalar-font in CUSTOM_CSS).
            withDefaultFonts: false,
            customCss: CUSTOM_CSS,
          }}
        />
      </div>
    </div>
  );
}
