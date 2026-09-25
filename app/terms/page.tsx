import { createMetadata } from "@/lib/seo";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms governing use of ${SITE_NAME}, a public encyclopedia of internet culture.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      description={`These terms govern your use of ${SITE_NAME}. By using the site, you agree to them.`}
      lastUpdated="2026-09-25"
    >
      <LegalSection title="The service">
        <p>
          {SITE_NAME} provides encyclopedia-style articles about memes, slang,
          people, events, trends, and related internet culture. Content is for
          general information and cultural documentation. It is not legal,
          medical, financial, or professional advice.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Attempt to disrupt, scrape abusively, or overload the service</li>
          <li>Use the site to harass, defraud, or violate applicable law</li>
          <li>
            Misrepresent affiliation with {SITE_NAME} or present our content as
            official statements by third parties
          </li>
          <li>Bypass security or access internal/admin tooling without authorization</li>
        </ul>
      </LegalSection>

      <LegalSection title="Public API (Culture Graph API)">
        <p>
          We offer a paid API (Starter and Pro plans) providing programmatic access to
          encyclopedia data and derived cultural-intelligence signals. Use of the API is
          additionally governed by these terms:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            You are responsible for keeping your API key confidential. Keys must not be
            shared, published, or embedded in publicly accessible client-side code.
          </li>
          <li>
            Requests are subject to the rate limits and monthly quotas described on our{" "}
            <Link
              href="/docs/api"
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              API documentation
            </Link>{" "}
            page. We may throttle or suspend keys that exceed their plan or that we
            reasonably believe are being abused or shared.
          </li>
          <li>
            Fields such as <code>velocityIndex</code>, <code>decayTracker</code>,{" "}
            <code>originMapping</code>, and <code>templateData</code> are derived signals
            computed from our own editorial scoring and tracked metadata. They are
            estimates for informational and creative-planning purposes, not verified
            third-party telemetry, and should not be the sole basis for material business
            decisions.
          </li>
          <li>
            Billing for paid plans is handled by Stripe. See our{" "}
            <Link
              href="/refunds"
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              Refund Policy
            </Link>{" "}
            for cancellation and refund terms.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          Site design, original writing, and compilation of the encyclopedia are
          protected by applicable intellectual property laws. Third-party media,
          trademarks, and quoted material remain the property of their owners
          and are used under fair use, license, or similar exceptions where
          applicable. See our{" "}
          <Link
            href="/attribution"
            className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
          >
            Attribution Guidelines
          </Link>{" "}
          and{" "}
          <Link
            href="/dmca"
            className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
          >
            Copyright / DMCA Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Accuracy">
        <p>
          Internet culture moves quickly. We strive for sourced, careful
          entries, but we do not guarantee completeness or that every claim is
          error-free. Editorial scores (relevance, brainrot, cringe, and
          similar) are subjective estimates, not measured traffic or rankings.
        </p>
      </LegalSection>

      <LegalSection title="Third-party links and media">
        <p>
          Articles may link to external sites or embed media hosted elsewhere.
          We are not responsible for third-party content, availability, or
          policies.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer of warranties">
        <p>
          The site is provided “as is” and “as available” without warranties of
          any kind, express or implied, including merchantability, fitness for a
          particular purpose, and non-infringement, to the fullest extent
          permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, {SITE_NAME} and its operators
          are not liable for indirect, incidental, special, consequential, or
          punitive damages, or any loss of data, profits, or goodwill, arising
          from your use of the site.
        </p>
      </LegalSection>

      <LegalSection title="Changes and termination">
        <p>
          We may update these terms, change features, or discontinue parts of
          the service. Continued use after changes constitutes acceptance. We
          may restrict access for abuse or legal risk.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms: see the{" "}
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
