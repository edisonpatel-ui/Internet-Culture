import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import { ForgotPasswordCard } from "@/components/auth/ForgotPasswordCard";

export const metadata = createMetadata({
  title: "Forgot Password",
  description: "Reset your Culture Graph API dashboard password.",
  path: "/forgot-password",
  robots: { index: false, follow: false },
});

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
          Culture Graph API
        </p>
        <h1 className="font-page mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Reset your password
        </h1>
        <p className="font-page mt-2 text-sm text-zinc-400">
          We&apos;ll email you a secure, one-time reset link.
        </p>
      </div>
      <Suspense fallback={<div className="h-56 rounded-2xl border border-white/10 bg-white/[0.02]" />}>
        <ForgotPasswordCard />
      </Suspense>
    </main>
  );
}
