/**
 * scripts/delete-user.ts
 *
 * Standalone cleanup CLI — permanently deletes a customer account and
 * everything associated with it (API key, active sessions, usage
 * analytics, customer record), mirroring exactly what
 * app/api/customer/account/route.ts's DELETE handler does for a
 * self-service account deletion, just run from a terminal against any
 * email instead of requiring that customer to be logged in.
 *
 * Usage:
 *   npx tsx scripts/delete-user.ts                          # dry run, defaults to edisonpatel@gmail.com
 *   npx tsx scripts/delete-user.ts someone@example.com       # dry run, different email
 *   npx tsx scripts/delete-user.ts someone@example.com --confirm   # actually deletes
 *
 * SAFETY: this is destructive and irreversible (it also cancels any active
 * Stripe subscription), so it does nothing but print what it WOULD do
 * unless you pass --confirm explicitly. There is no interactive prompt to
 * accidentally mash through — you have to type --confirm on the command
 * line on purpose.
 *
 * Steps, same order and same reasoning as the account-deletion API route:
 *   1. Look up the customer record — if none exists, there's nothing to do.
 *   2. Cancel any active Stripe subscription (best-effort; a Stripe hiccup
 *      doesn't block the rest of the cleanup).
 *   3. Revoke the API key (lib/api/keys.ts).
 *   4. Purge usage analytics (lib/api/metrics.ts).
 *   5. Revoke all outstanding sessions for this email
 *      (lib/customerAuth/session.ts) — the account route only clears the
 *      calling browser's own cookie via destroySession(), since it's
 *      deleting the account the caller is themselves logged into; this
 *      script has no "current session" to clear, so it explicitly revokes
 *      every session instead, which is the correct analogue here.
 *   6. Delete the customer record itself (lib/customer/store.ts).
 *
 * Reads UPSTASH_REDIS_REST_URL/TOKEN and STRIPE_SECRET_KEY from .env.local
 * (falling back to .env) via the same tiny built-in parser as
 * scripts/test-resend.ts — this runs standalone via `tsx`, not through
 * Next.js's dev server, so nothing loads those files automatically.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const DEFAULT_TARGET_EMAIL = "edisonpatel@gmail.com";

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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
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

  const args = process.argv.slice(2);
  const confirmed = args.includes("--confirm");
  const email = (args.find((a) => !a.startsWith("--")) || DEFAULT_TARGET_EMAIL).trim().toLowerCase();

  // Imported after env is loaded, so these modules' own lazy Redis/Stripe
  // clients read the right values the first time they're actually used.
  const { getCustomerRecord, deleteCustomerRecord } = await import("@/lib/customer/store");
  const { revokeApiKey } = await import("@/lib/api/keys");
  const { purgeUsageMetrics } = await import("@/lib/api/metrics");
  const { revokeAllSessions } = await import("@/lib/customerAuth/session");
  const { getStripeClient } = await import("@/lib/stripe/client");

  console.log(`\nLooking up customer record for "${email}"...`);
  const customer = await getCustomerRecord(email);

  if (!customer) {
    console.log(`No account found for "${email}" — nothing to delete.`);
    process.exitCode = 0;
    return;
  }

  console.log("Found account:");
  console.log(`  email:            ${customer.email}`);
  console.log(`  tier:             ${customer.tier}`);
  console.log(`  stripeCustomerId: ${customer.stripeCustomerId}`);
  console.log(`  key (hash):       ${customer.hashedKey.slice(0, 12)}…`);
  console.log(`  key (last 4):     ${customer.keyLastFour}`);
  console.log(`  created:          ${customer.createdAt}`);

  if (!confirmed) {
    console.log(
      "\nDRY RUN — nothing has been deleted. This would:\n" +
        "  1. Cancel any active Stripe subscription for this customer\n" +
        "  2. Revoke their API key\n" +
        "  3. Purge their usage analytics\n" +
        "  4. Revoke every active login session for this email\n" +
        "  5. Delete the customer record\n\n" +
        `Re-run with --confirm to actually do this:\n  npx tsx scripts/delete-user.ts ${email} --confirm\n`,
    );
    process.exitCode = 0;
    return;
  }

  console.log("\n--confirm passed — proceeding with deletion.\n");

  // --- Step 1: cancel Stripe subscriptions (best-effort) ---
  try {
    console.log("[1/5] Cancelling active Stripe subscriptions...");
    const stripe = getStripeClient();
    const activeSubscriptions = await stripe.subscriptions.list({
      customer: customer.stripeCustomerId,
      status: "active",
    });
    if (activeSubscriptions.data.length === 0) {
      console.log("[1/5] No active subscriptions found.");
    } else {
      await Promise.all(activeSubscriptions.data.map((sub) => stripe.subscriptions.cancel(sub.id)));
      console.log(`[1/5] Cancelled ${activeSubscriptions.data.length} active subscription(s).`);
    }
  } catch (err) {
    console.error("[1/5] Stripe cancellation failed — continuing anyway:", err);
  }

  // --- Step 2: revoke the API key ---
  try {
    console.log("[2/5] Revoking API key...");
    await revokeApiKey(customer.hashedKey);
    console.log("[2/5] API key revoked.");
  } catch (err) {
    console.error("[2/5] Failed to revoke API key:", err);
    process.exitCode = 1;
  }

  // --- Step 3: purge usage analytics ---
  try {
    console.log("[3/5] Purging usage analytics...");
    await purgeUsageMetrics(customer.hashedKey);
    console.log("[3/5] Usage analytics purged.");
  } catch (err) {
    console.error("[3/5] Failed to purge usage analytics:", err);
    process.exitCode = 1;
  }

  // --- Step 4: revoke all sessions ---
  try {
    console.log("[4/5] Revoking all active sessions...");
    await revokeAllSessions(email);
    console.log("[4/5] All sessions revoked.");
  } catch (err) {
    console.error("[4/5] Failed to revoke sessions:", err);
    process.exitCode = 1;
  }

  // --- Step 5: delete the customer record ---
  try {
    console.log("[5/5] Deleting customer record...");
    await deleteCustomerRecord(email);
    console.log("[5/5] Customer record deleted.");
  } catch (err) {
    console.error("[5/5] Failed to delete customer record:", err);
    process.exitCode = 1;
  }

  if (process.exitCode === 1) {
    console.log(`\nFinished with errors — "${email}" may be partially deleted. See the steps above.`);
  } else {
    console.log(`\nDone — "${email}" and all associated data have been deleted.`);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exitCode = 1;
});
