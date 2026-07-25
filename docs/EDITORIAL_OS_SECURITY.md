# Editorial OS / Admin security (internal / experimental tooling)

> Internal Admin lives under `/admin`. It is **not** part of the public
> encyclopedia and must never auto-change live content.

## Status

**Session authentication is required** (Auth.js / NextAuth v5).

Unauthenticated visitors who hit `/admin` or any experimental path receive
**404 Not Found** — never a branded login redirect that reveals the admin system.

## Isolation measures

| Control | Status |
|---------|--------|
| Not linked from public Header / Footer / nav | ✓ |
| Public chrome hidden on editorial paths (`SiteChrome`) | ✓ |
| `robots.txt` disallow `/admin/` (+ legacy prefixes) | ✓ |
| `robots: noindex` on `(admin)` layout | ✓ |
| Sitemap excludes admin URLs | ✓ |
| `X-Robots-Tag: noindex, nofollow, noarchive` via `proxy.ts` | ✓ |
| Session auth (Auth.js) + admin email allowlist | ✓ |
| Production fail-closed when auth unset | ✓ 404 |
| Unauthenticated → 404 (not login page) | ✓ |

## Configure auth (required in production)

Set in Vercel / `.env.local` (never commit secrets):

```bash
AUTH_SECRET=          # openssl rand -base64 32
ADMIN_EMAIL=you@example.com
# Either plain password (dev) or bcrypt hash (preferred):
ADMIN_PASSWORD=       # long random password
# ADMIN_PASSWORD_HASH= # bcrypt hash of the password

# Optional Google OAuth (same email must be in ADMIN_EMAIL / ADMIN_EMAILS):
# AUTH_GOOGLE_ID=
# AUTH_GOOGLE_SECRET=
```

Sign in at the unlisted path **`/admin/access`** (not linked publicly).
After sign-in you land on `/admin`.

**Development:** if auth env is unset, admin routes stay open for local tooling.
**Production:** if auth env is unset, admin routes return **404**.

## Content safety

- Maintenance **Refresh** only proposes changes.
- The live catalog changes only after explicit **Apply** (and your deploy/commit).
- Draft Studio **Publish** is explicit — never automatic.

## Remaining notes

- Server actions under maintenance also call `requireAdminSession()`.
- Prefer `ADMIN_PASSWORD_HASH` (bcrypt) over plain `ADMIN_PASSWORD` in production.
- Until multiple admins are needed, keep a single email in `ADMIN_EMAIL`.
