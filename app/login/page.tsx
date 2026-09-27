import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import { LoginCard } from "@/components/auth/LoginCard";

export const metadata = createMetadata({
  title: "Log In",
  description: "Log in to your Culture Graph API dashboard.",
  path: "/login",
  robots: { index: false, follow: false },
});

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
          Culture Graph API
        </p>
        <h1 className="font-page mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Log in to your dashboard
        </h1>
        <p className="font-page mt-2 text-sm text-zinc-400">
          We&apos;ll email you a secure, one-time login link. No password needed.
        </p>
      </div>
      <Suspense fallback={<div className="h-56 rounded-2xl border border-white/10 bg-white/[0.02]" />}>
        <LoginCard />
      </Suspense>
    </main>
  );
}
