import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { CONTACT_EMAIL } from "@/lib/siteContact";
import { SITE_NAME } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Refund Policy",
  description: `Strict no-refund policy for Culture Graph API subscriptions on ${SITE_NAME}, with a narrow exception for verified server-side defects.`,
  path: "/refunds",
});

export default function RefundsPage() {
  const contact = CONTACT_EMAIL ? (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white">
      {CONTACT_EMAIL}
    </a>
  ) : (
    <Link href="/contact" className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white">
      our contact page
    </Link>
  );

  return (
    <LegalPageShell
      title="Refund Policy"
      description="This policy applies to all paid subscriptions to the Culture Graph API (Starter and Scale plans). By purchasing, you agree to it."
      lastUpdated="2026-10-20"
    >
      <LegalSection title="1. All sales are final">
        <p>
          All API subscription purchases and usage fees are <strong>final and non-refundable</strong>.
          We do not issue refunds, credits, or prorated amounts for buyer&apos;s remorse, change of
          mind, user error, accidental purchases, or failure to use some or all of your allocated
          API quota. This applies to the initial charge and to every renewal charge.
        </p>
      </LegalSection>

      <LegalSection title="2. Cancelling">
        <p>
          You can cancel at any time from your dashboard (Billing). Cancelling stops{" "}
          <em>future</em> billing only; it does not entitle you to a refund of any amount already
          charged. Your API key stays active until the end of the billing period you already paid
          for, and access ends after that. You are responsible for cancelling before the renewal
          date.
        </p>
      </LegalSection>

      <LegalSection title="3. Exception: verified service defect">
        <p>
          A refund will be considered only in the rare case of a <strong>verified software defect
          or prolonged outage on our server side</strong> in which the API failed to deliver
          functional responses according to its published specification. Problems caused by your own
          code, network, configuration, exceeded rate limits or quotas, misuse of the API, or
          third-party services are not defects.
        </p>
      </LegalSection>

      <LegalSection title="4. How to claim, and what proof is required">
        <p>
          To request review of a defect-based refund you must submit a formal written request
          to {contact} <strong>within 7 days of the incident</strong>. Requests made after that
          window will not be reviewed. Your request must include verifiable proof:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Specific API endpoint request logs, with timestamps (including time zone).</li>
          <li>The HTTP response status codes and error payloads you received.</li>
          <li>
            The associated API key identifier (the last four characters shown in your dashboard —
            never send the full key) and your account identifier (the email address used at
            checkout).
          </li>
        </ul>
        <p>Incomplete requests may be closed without review.</p>
      </LegalSection>

      <LegalSection title="5. Review and sole discretion">
        <p>
          Defect claims are investigated against our server logs. Whether to approve any refund,
          and in what amount, is at the <strong>sole discretion of our technical review team</strong>,
          and its decision is final. Submitting a claim does not guarantee a refund. Approved refunds
          are returned to the original payment method through Stripe; your bank may take several
          business days to post them.
        </p>
      </LegalSection>

      <LegalSection title="6. Chargebacks">
        <p>
          Please contact us before disputing a charge with your bank or card issuer. We may suspend
          access for accounts with an open dispute and will submit our logs and this policy as
          evidence in response to any dispute.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          Billing questions:{" "}
          <Link href="/contact" className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white">
            Contact
          </Link>{" "}
          page. See also our{" "}
          <Link href="/terms" className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
