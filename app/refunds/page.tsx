import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { CONTACT_EMAIL } from "@/lib/siteContact";
import { SITE_NAME } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Refund Policy",
  description: `Refund policy for Culture Graph API subscriptions on ${SITE_NAME}.`,
  path: "/refunds",
});

export default function RefundsPage() {
  return (
    <LegalPageShell
      title="Refund Policy"
      description="This policy covers paid subscriptions to the Culture Graph API (Starter and Pro plans)."
      lastUpdated="2026-09-25"
    >
      <LegalSection title="Cancel anytime">
        <p>
          You can cancel your subscription at any time. Cancelling stops future billing;
          your API key remains active for the remainder of the current billing period,
          then access ends. There are no cancellation fees.
        </p>
      </LegalSection>

      <LegalSection title="7-day refund guarantee">
        <p>
          If you are not satisfied, you may request a full refund within 7 days of your
          initial charge, provided your account has used less than 5% of that billing
          period&apos;s monthly request quota (1,250 requests on Starter, 12,500 on Pro).
          This is meant to give you room to evaluate the API without limiting genuine
          production use.
        </p>
        <p>
          Refund requests outside the 7-day window, or after exceeding the 5% usage
          threshold, are reviewed on a case-by-case basis but are not guaranteed.
        </p>
      </LegalSection>

      <LegalSection title="How to request a refund">
        <p>
          Email{" "}
          {CONTACT_EMAIL ? (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          ) : (
            <Link
              href="/contact"
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              our contact page
            </Link>
          )}{" "}
          with the email address used at checkout. Approved refunds are processed to the
          original payment method via Stripe, typically within 5–10 business days.
        </p>
      </LegalSection>

      <LegalSection title="Renewals">
        <p>
          Subscriptions renew automatically each billing period unless cancelled before
          the renewal date. The 7-day refund window applies to your initial charge, not
          to subsequent renewal charges.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about billing or refunds:{" "}
          <Link
            href="/contact"
            className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
          >
            Contact
          </Link>{" "}
          page.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
