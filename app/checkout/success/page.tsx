import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import { CheckoutSuccessContent } from "@/components/pricing/CheckoutSuccessContent";

export const metadata = createMetadata({
  title: "Subscription confirmed",
  description: "Your Culture Graph API key.",
  path: "/checkout/success",
  robots: { index: false, follow: false },
});

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-page text-2xl font-bold tracking-tight text-white sm:text-3xl">
        You&apos;re subscribed
      </h1>
      <p className="font-page mt-3 text-sm leading-relaxed text-zinc-400">
        Thanks for subscribing to the Culture Graph API. Your key is below.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
          <CheckoutSuccessContent />
        </Suspense>
      </div>
    </main>
  );
}
