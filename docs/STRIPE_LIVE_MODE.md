# Stripe live mode — setup and behaviour

## Plans (edit only `lib/config/subscriptions.ts`)
| Tier id   | Shown as | Price   | Quota / month | Burst    | Stripe Price env           |
|-----------|----------|---------|---------------|----------|----------------------------|
| `starter` | Starter  | $19.99  | 25,000        | 60/min   | `STRIPE_PRICE_ID_STARTER`  |
| `pro`     | Scale    | $50     | 100,000       | 120/min  | `STRIPE_PRICE_ID_PRO`      |
| `free`    | (hidden) | —       | 1,000         | 10/min   | admin-issued keys only     |

The Scale quota (100,000 / 120 per min) is a product decision — change it in the config file.
The Stripe Price itself must be $19.99 / $50 recurring monthly in the Stripe Dashboard; the
code only displays the price, Stripe charges whatever the Price ID says.

## Required production environment (Vercel → Production)
`STRIPE_SECRET_KEY` (sk_live_…), `STRIPE_WEBHOOK_SECRET` (live endpoint's whsec_…),
`STRIPE_PRICE_ID_STARTER`, `STRIPE_PRICE_ID_PRO`, `NEXT_PUBLIC_SITE_URL` (checkout redirects
use it in production), plus the existing Upstash / Resend / AUTH_SECRET vars.
In production the app logs a warning if `STRIPE_SECRET_KEY` is a test key, and the webhook
ignores any event with `livemode: false`.

## Webhook endpoint (Stripe Dashboard → Developers → Webhooks, LIVE mode)
URL `https://<domain>/api/webhooks/stripe`. Subscribe to:
`checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`,
`customer.subscription.deleted`, `invoice.payment_succeeded`
(+ `checkout.session.async_payment_succeeded` only if you enable delayed payment methods).

## What each event does
- `checkout.session.completed` — the only place a paid key is issued; requires a subscription
  session with `payment_status=paid`. Idempotent per Checkout Session.
- `customer.subscription.created` — records nothing if no account exists yet (it normally
  arrives first). Never provisions.
- `customer.subscription.updated` — stores status; plan change → same key re-tiered;
  `canceled`/`unpaid`/`incomplete_expired` → key revoked; `past_due` → key stays, dashboard warns.
- `customer.subscription.deleted` — key revoked, account marked cancelled.
- `invoice.payment_succeeded` — records `lastPaymentAt`, clears `past_due`.

A cancelled/unpaid account cannot mint keys from the dashboard (regenerate-key returns 403).
If an unpaid account pays up, the cancelled flag clears and the customer regenerates a key.

## Customer portal
Dashboard → Billing opens the Stripe Billing Portal. In the Stripe Dashboard
(Settings → Billing → Customer portal) enable cancellation and, if you want self-serve plan
changes, add both Prices as switchable products. Plan changes are picked up automatically.
