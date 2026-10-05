/**
 * scripts/test-resend.ts
 *
 * Standalone local diagnostic — sends one real test email via Resend,
 * completely outside the Next.js app, so you can tell in isolation
 * whether a problem is "Resend/my API key/my domain" vs "something in the
 * route handler." If this script fails, the route handlers will too, for
 * the same reason printed below; if this script succeeds but the app
 * still doesn't send mail, the bug is in the app's code path, not Resend.
 *
 * Usage:
 *   npx tsx scripts/test-resend.ts you@example.com
 *
 * Recipient resolution, in order: a CLI argument, then TEST_EMAIL_RECIPIENT,
 * then FEEDBACK_TO_EMAIL (already used elsewhere in this repo as a
 * "send it to me" inbox) — if none of those are set, prints usage and exits.
 *
 * Reads RESEND_API_KEY / RESEND_FROM_EMAIL from .env.local (falling back to
 * .env if .env.local doesn't exist) via a tiny built-in parser below —
 * this script runs standalone via `tsx`, not through Next.js's dev server,
 * so nothing automatically loads those files the way `next dev` does.
 *
 * Exit code 0 on a confirmed successful send, 1 on any failure — safe to
 * use in a pre-deploy check if you want one.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Resend } from "resend";
import { resolveFromAddress, describeResendError, readEnv } from "@/lib/email/resendSender";

/** Minimal KEY=VALUE .env parser — no new dependency for a script this small. Never overrides a variable already set in the real environment. */
function loadEnvFile(path: string): void {
  if (!existsSync(path)) return;

  const contents = readFileSync(path, "utf8");
  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function loadLocalEnv(): void {
  const envLocalPath = resolve(process.cwd(), ".env.local");
  const envPath = resolve(process.cwd(), ".env");

  if (existsSync(envLocalPath)) {
    console.log(`Loaded environment from ${envLocalPath}`);
    loadEnvFile(envLocalPath);
  } else if (existsSync(envPath)) {
    console.log(`.env.local not found — loaded environment from ${envPath} instead`);
    loadEnvFile(envPath);
  } else {
    console.warn("No .env.local or .env file found — relying on whatever is already in the shell environment.");
  }
}

async function main(): Promise<void> {
  loadLocalEnv();

  const recipient = process.argv[2] || readEnv("TEST_EMAIL_RECIPIENT") || readEnv("FEEDBACK_TO_EMAIL");
  if (!recipient) {
    console.error(
      "No recipient address given.\n\n" +
        "Usage:\n" +
        "  npx tsx scripts/test-resend.ts you@example.com\n\n" +
        "Or set TEST_EMAIL_RECIPIENT (or FEEDBACK_TO_EMAIL) in .env.local.",
    );
    process.exitCode = 1;
    return;
  }

  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set.\n\n" +
        "Add it to .env.local:\n" +
        "  RESEND_API_KEY=re_xxxxxxxx\n\n" +
        "Get a key at https://resend.com/api-keys",
    );
    process.exitCode = 1;
    return;
  }

  console.log(`Using RESEND_API_KEY: ${apiKey.slice(0, 6)}${"*".repeat(Math.max(apiKey.length - 6, 0))}`);

  const from = resolveFromAddress("scripts/test-resend", recipient);
  console.log(`From:      ${from}`);
  console.log(`To:        ${recipient}`);
  console.log("Sending test email via Resend...\n");

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [recipient],
      subject: "Culture Graph API — Resend test email",
      text:
        "This is a test email from scripts/test-resend.ts, confirming your Resend configuration " +
        "(RESEND_API_KEY + RESEND_FROM_EMAIL) can successfully send mail outside of the Next.js app.\n\n" +
        `Sent at: ${new Date().toISOString()}`,
      html:
        "<p>This is a test email from <code>scripts/test-resend.ts</code>, confirming your Resend " +
        "configuration (<code>RESEND_API_KEY</code> + <code>RESEND_FROM_EMAIL</code>) can successfully " +
        "send mail outside of the Next.js app.</p>" +
        `<p style="color:#666;font-size:13px">Sent at: ${new Date().toISOString()}</p>`,
    });

    if (error) {
      const { code, message } = describeResendError(error);
      console.error("RESEND SDK ERROR:", error);
      console.error(`\n✗ Send failed — code: ${code}, message: ${message}`);
      console.error("\nFull error object:", JSON.stringify(error, null, 2));
      process.exitCode = 1;
      return;
    }

    console.log("✓ Sent successfully.");
    console.log("\nFull Resend response:", JSON.stringify(data, null, 2));
    process.exitCode = 0;
  } catch (err) {
    console.error("RESEND SDK ERROR:", err);
    const { code, message } = describeResendError(err);
    console.error(`\n✗ Send failed (thrown, not returned) — code: ${code}, message: ${message}`);
    process.exitCode = 1;
  }
}

main();
