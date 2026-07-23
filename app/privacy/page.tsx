import { createMetadata } from "@/lib/seo";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { CONTACT_EMAIL } from "@/lib/siteContact";
import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects information when you visit the encyclopedia.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      description={`This policy explains what information ${SITE_NAME} collects and how it is used. We aim to keep the encyclopedia useful without unnecessary tracking.`}
      lastUpdated="2026-07-22"
    >
      <LegalSection title="Who we are">
        <p>
          {SITE_NAME} is a public encyclopedia of internet culture (memes, slang,
          creators, events, and related topics). This site is operated for
          informational purposes.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>We may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-zinc-300">Usage data</strong> — pages
            visited, search queries (truncated where applicable), referral paths,
            approximate region, browser type, and device category. This is
            collected through analytics tools described below.
          </li>
          <li>
            <strong className="text-zinc-300">Technical logs</strong> — standard
            server or hosting logs (IP address, timestamps, request paths) used
            for security, abuse prevention, and reliability.
          </li>
          <li>
            <strong className="text-zinc-300">Voluntary contact</strong> — if you
            email us, we receive whatever you include in that message.
          </li>
        </ul>
        <p>
          We do not require accounts to browse the encyclopedia. We do not sell
          personal information.
        </p>
      </LegalSection>

      <LegalSection title="Analytics">
        <p>
          We may use privacy-minded analytics to understand which articles and
          searches are useful:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Vercel Analytics and Vercel Speed Insights (hosting platform)</li>
          <li>
            Google Analytics 4, when a measurement ID is configured in
            production
          </li>
        </ul>
        <p>
          These tools help us improve content and performance. Event names used
          for product measurement (for example article views or search) are
          anonymous and do not include email addresses or account IDs.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and similar technology">
        <p>
          Analytics providers may set cookies or use local storage where
          required by their services. You can control cookies through your
          browser settings. Blocking cookies may limit some measurement but
          will not prevent reading articles.
        </p>
      </LegalSection>

      <LegalSection title="How we use information">
        <ul className="list-disc space-y-2 pl-5">
          <li>Operate, secure, and improve the website</li>
          <li>Understand content demand and search gaps</li>
          <li>Respond to legal, copyright, or support requests</li>
          <li>Comply with applicable law</li>
        </ul>
      </LegalSection>

      <LegalSection title="Sharing">
        <p>
          We share data with service providers who help run the site (for
          example hosting and analytics), only as needed to provide those
          services. We may disclose information if required by law or to protect
          the site and its users from abuse.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          Analytics and logs are retained according to the defaults of our
          hosting and analytics providers, or for as long as needed for security
          and legal compliance.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          The encyclopedia describes internet culture that may include mature
          themes. It is not directed at children under 13, and we do not
          knowingly collect personal information from children under 13.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          You may use browser controls to limit cookies, use private browsing,
          or contact us about a privacy request. Depending on where you live,
          you may have rights to access, correct, or delete personal
          information we hold about you.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        {CONTACT_EMAIL ? (
          <p>
            Privacy questions:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        ) : (
          <p>
            Privacy questions: use the{" "}
            <Link
              href="/contact"
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              Contact
            </Link>{" "}
            page. A dedicated inbox will be published when the production domain
            email is configured.
          </p>
        )}
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this policy as the site evolves. The “Last updated”
          date at the top reflects the latest revision. Continued use of the
          site after changes means you accept the updated policy.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
