/**
 * scripts/manage-user.ts
 *
 * Admin CLI for customer-account operations against Upstash Redis and Stripe.
 * Supersedes scripts/delete-user.ts (delete is now `--action delete`).
 *
 * Usage:
 *   npx tsx scripts/manage-user.ts <email> --action delete       [--confirm]
 *   npx tsx scripts/manage-user.ts <email> --action refund       [--confirm]
 *   npx tsx scripts/manage-user.ts <email> --action reset-quota  [--confirm]
 *   npx tsx scripts/manage-user.ts --email <email> --action ...  (flag form also accepted)
 *
 * Actions:
 *   delete       Cancels active Stripe subscriptions (best-effort), revokes the
 *                API key, purges usage history, revokes every login session,
 *                and deletes the customer record. Irreversible.
 *   refund       Looks up the customer's latest Stripe charge, issues a FULL
 *                refund, cancels active subscriptions, and revokes API access.
 *                The customer record is kept (for audit); the key is dead.
 *   reset-quota  Resets this month's request counter to zero.
 *
 * SAFETY: every action is a dry run (prints what it WOULD do) unless
 * --confirm is passed on the command line.
 *
 * Environment: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN and
 * STRIPE_SECRET_KEY are read from .env.local (falling back to .env) by a tiny
 * built-in parser — this runs standalone via tsx, not through Next.js.
 *
 * Exit code: 0 on success / dry run / nothing to do, 1 on any failure.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

type Action = "delete" | "refund" | "reset-quota";
const ACTIONS: readonly Action[] = ["delete", "refund", "reset-quota"];

const ok = (msg: string) => console.log(`\x1b[32m✔\x1b[0m ${msg}`);
const info = (msg: string) => console.log(`\x1b[36mℹ\x1b[0m ${msg}`);
const warn = (msg: string) => console.warn(`\x1b[33m⚠\x1b[0m ${msg}`);
const fail = (msg: string, err?: unknown) => {
  console.error(`\x1b[31m✖\x1b[0m ${msg}`);
  if (err !== undefined) console.error(err instanceof Error ? `  ${err.message}` : err);
  process.exitCode = 1;
};

function printUsageAndExit(reason?: string): never {
  if (reason) console.error(`\x1b[31mError:\x1b[0m ${reason}\n`);
  console.error(
    [
      "Usage:",
      "  npx tsx scripts/manage-user.ts <email> --action <delete|refund|reset-quota> [--confirm]",
      "",
      "Actions:",
      "  delete       remove user, API key, sessions and usage history; cancel subscriptions",
      "  refund       fully refund the latest Stripe charge and revoke API access",
      "  reset-quota  reset this month's request counter",
      "",
      "Without --confirm, nothing is changed (dry run).",
    ].join("\n"),
  );
  process.exit(1);
}

/** Minimal KEY=VALUE .env parser. Never overrides variables already in the real environment. */
function loadEnvFile(path: string): void {
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
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function loadLocalEnv(): void {
  const envLocalPath = resolve(process.cwd(), ".env.local");
  const envPath = resolve(process.cwd(), ".env");
  if (existsSync(envLocalPath)) {
    info(`Loaded environment from ${envLocalPath}`);
    loadEnvFile(envLocalPath);
  } else if (existsSync(envPath)) {
    info(`.env.local not found — loaded environment from ${envPath}`);
    loadEnvFile(envPath);
  } else {
    warn("No .env.local or .env found — relying on the shell environment.");
  }
}

function parseArgs(argv: string[]): { email: string; action: Action; confirmed: boolean } {
  let email: string | undefined;
  let action: string | undefined;
  let confirmed = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--confirm") confirmed = true;
    else if (arg === "--action") action = argv[++i];
    else if (arg.startsWith("--action=")) action = arg.slice("--action=".length);
    else if (arg === "--email") email = argv[++i];
    else if (arg.startsWith("--email=")) email = arg.slice("--email=".length);
    else if (arg.startsWith("--")) printUsageAndExit(`Unknown flag "${arg}".`);
    else if (!email) email = arg;
    else printUsageAndExit(`Unexpected extra argument "${arg}".`);
  }

  if (!email) printUsageAndExit("Missing email.");
  if (!action) printUsageAndExit("Missing --action.");
  if (!(ACTIONS as readonly string[]).includes(action)) {
    printUsageAndExit(`Invalid --action "${action}". Expected one of: ${ACTIONS.join(", ")}.`);
  }
  if (!email.includes("@")) printUsageAndExit(`"${email}" does not look like an email address.`);

  return { email: email.trim().toLowerCase(), action: action as Action, confirmed };
}

type CustomerRecord = NonNullable<Awaited<ReturnType<typeof import("@/lib/customer/store").getCustomerRecord>>>;

function describeCustomer(customer: CustomerRecord): void {
  info("Account found:");
  console.log(`    email:            ${customer.email}`);
  console.log(`    tier:             ${customer.tier}`);
  console.log(`    stripeCustomerId: ${customer.stripeCustomerId}`);
  console.log(`    key (last 4):     ${customer.keyLastFour}`);
  console.log(`    created:          ${customer.createdAt}`);
}

async function cancelActiveSubscriptions(stripeCustomerId: string, label: string): Promise<void> {
  try {
    const { getStripeClient } = await import("@/lib/stripe/client");
    const stripe = getStripeClient();
    const subs = await stripe.subscriptions.list({ customer: stripeCustomerId, status: "active" });
    if (subs.data.length === 0) {
      ok(`${label} No active subscriptions to cancel.`);
      return;
    }
    await Promise.all(subs.data.map((sub) => stripe.subscriptions.cancel(sub.id)));
    ok(`${label} Cancelled ${subs.data.length} active subscription(s).`);
  } catch (err) {
    warn(`${label} Stripe subscription cancellation failed — continuing.`);
    console.error(err instanceof Error ? `  ${err.message}` : err);
  }
}

async function runDelete(customer: CustomerRecord, confirmed: boolean): Promise<void> {
  if (!confirmed) {
    info(
      "DRY RUN — would: (1) cancel active Stripe subscriptions, (2) revoke the API key, " +
        "(3) purge usage history, (4) revoke all sessions, (5) delete the customer record.",
    );
    info(`Re-run with --confirm to apply:  npx tsx scripts/manage-user.ts ${customer.email} --action delete --confirm`);
    return;
  }

  const { revokeApiKey } = await import("@/lib/api/keys");
  const { purgeUsageMetrics } = await import("@/lib/api/metrics");
  const { revokeAllSessions } = await import("@/lib/customerAuth/session");
  const { deleteCustomerRecord } = await import("@/lib/customer/store");

  await cancelActiveSubscriptions(customer.stripeCustomerId, "[1/5]");

  try {
    await revokeApiKey(customer.hashedKey);
    ok("[2/5] API key revoked.");
  } catch (err) {
    fail("[2/5] Failed to revoke API key.", err);
  }

  try {
    await purgeUsageMetrics(customer.hashedKey);
    ok("[3/5] Usage history purged.");
  } catch (err) {
    fail("[3/5] Failed to purge usage history.", err);
  }

  try {
    await revokeAllSessions(customer.email);
    ok("[4/5] All sessions revoked.");
  } catch (err) {
    fail("[4/5] Failed to revoke sessions.", err);
  }

  try {
    await deleteCustomerRecord(customer.email);
    ok("[5/5] Customer record deleted.");
  } catch (err) {
    fail("[5/5] Failed to delete customer record.", err);
  }

  if (process.exitCode === 1) warn(`Finished with errors — "${customer.email}" may be partially deleted.`);
  else ok(`Done — "${customer.email}" and all associated data have been deleted.`);
}

async function runRefund(customer: CustomerRecord, confirmed: boolean): Promise<void> {
  const { getStripeClient } = await import("@/lib/stripe/client");
  let stripe: ReturnType<typeof getStripeClient>;
  try {
    stripe = getStripeClient();
  } catch (err) {
    fail("Stripe is not configured — cannot look up or refund charges.", err);
    return;
  }

  info("Looking up latest Stripe charge...");
  let latestCharge;
  try {
    const charges = await stripe.charges.list({ customer: customer.stripeCustomerId, limit: 1 });
    latestCharge = charges.data[0];
  } catch (err) {
    fail("Could not list Stripe charges.", err);
    return;
  }

  if (!latestCharge) {
    warn(`No charges found for Stripe customer ${customer.stripeCustomerId} — nothing to refund.`);
    return;
  }

  const amount = `${(latestCharge.amount / 100).toFixed(2)} ${latestCharge.currency.toUpperCase()}`;
  console.log(`    charge:   ${latestCharge.id}`);
  console.log(`    amount:   ${amount}`);
  console.log(`    created:  ${new Date(latestCharge.created * 1000).toISOString()}`);
  console.log(`    refunded: ${latestCharge.refunded ? "yes" : "no"}`);

  if (latestCharge.refunded) {
    warn("Latest charge is already fully refunded — skipping the refund.");
  }

  if (!confirmed) {
    info(
      `DRY RUN — would: ${latestCharge.refunded ? "" : `fully refund ${amount}, `}` +
        "cancel active subscriptions, and revoke API access (customer record kept).",
    );
    info(`Re-run with --confirm to apply:  npx tsx scripts/manage-user.ts ${customer.email} --action refund --confirm`);
    return;
  }

  await cancelActiveSubscriptions(customer.stripeCustomerId, "[1/3]");

  if (!latestCharge.refunded) {
    try {
      const refund = await stripe.refunds.create({ charge: latestCharge.id });
      ok(`[2/3] Refund ${refund.id} created (${amount}, status: ${refund.status}).`);
    } catch (err) {
      fail("[2/3] Stripe refund failed — API access NOT revoked so you can retry.", err);
      return;
    }
  } else {
    info("[2/3] Refund skipped (already refunded).");
  }

  try {
    const { revokeApiKey } = await import("@/lib/api/keys");
    await revokeApiKey(customer.hashedKey);
    ok("[3/3] API access revoked.");
  } catch (err) {
    fail("[3/3] Refund succeeded but revoking the API key failed — revoke it manually.", err);
  }
}

async function runResetQuota(customer: CustomerRecord, confirmed: boolean): Promise<void> {
  const { peekMonthlyUsage, resetMonthlyQuota } = await import("@/lib/api/monthlyQuota");
  const { TIER_MONTHLY_QUOTAS } = await import("@/lib/api/keys");

  const limit = TIER_MONTHLY_QUOTAS[customer.tier];
  const before = await peekMonthlyUsage(customer.hashedKey, limit);
  info(`Current month usage: ${before.used.toLocaleString()} / ${limit === null ? "unlimited" : limit.toLocaleString()}`);

  if (!confirmed) {
    info("DRY RUN — would reset this month's request count to 0.");
    info(`Re-run with --confirm to apply:  npx tsx scripts/manage-user.ts ${customer.email} --action reset-quota --confirm`);
    return;
  }

  await resetMonthlyQuota(customer.hashedKey);
  const after = await peekMonthlyUsage(customer.hashedKey, limit);
  ok(`Monthly quota reset (${before.used.toLocaleString()} → ${after.used.toLocaleString()}).`);
}

async function main(): Promise<void> {
  const { email, action, confirmed } = parseArgs(process.argv.slice(2));
  loadLocalEnv();

  // Imported after env is loaded so the lazy Redis/Stripe clients see the right values.
  const { getCustomerRecord } = await import("@/lib/customer/store");

  info(`Action: ${action}${confirmed ? " (--confirm)" : " (dry run)"} · target: ${email}`);

  const customer = await getCustomerRecord(email);
  if (!customer) {
    warn(`No account found for "${email}" — nothing to do.`);
    return;
  }
  describeCustomer(customer);

  switch (action) {
    case "delete":
      return runDelete(customer, confirmed);
    case "refund":
      return runRefund(customer, confirmed);
    case "reset-quota":
      return runResetQuota(customer, confirmed);
  }
}

main().catch((err) => {
  fail("Unexpected error.", err);
});
