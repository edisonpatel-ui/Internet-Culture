import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mb-8 text-7xl">404</div>
      <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mb-10 text-lg text-zinc-400">
        That URL isn&apos;t in the catalog. It may have moved, or it never existed.
      </p>

      <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:from-violet-500 hover:to-fuchsia-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
        >
          Back to Home
        </Link>
        <Link
          href="/search"
          className="glass rounded-full border border-white/10 px-8 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
        >
          Search
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CATEGORIES.slice(0, 6).map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="glass-card flex items-center gap-3 p-4 text-left transition-colors hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
          >
            <span className="text-xl">{cat.icon}</span>
            <span className="text-sm font-medium text-white">{cat.label}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
