# Production migration: Replit → Neon + new hosting

**Replit production stays live until DNS cutover.** Do not set `STRIPE_SECRET_KEY` on Replit until you switch.

## Order of work (Stripe last)

| Step | What | Stripe | Replit prod |
|------|------|--------|-------------|
| 1 | Local dev on Neon copy | Skip | Unchanged |
| 2 | Staging deploy (Render/Railway) | Skip | Unchanged |
| 3 | Test wizard, report, emails on staging | Skip | Unchanged |
| 4 | Cutover DNS + live Stripe keys | **Last** | Decommission after 48h |

---

## Phase 1 — Local (now)

1. `.env` → Neon **dev** branch (`DATABASE_URL`)
2. `OPENAI_API_KEY`, optional `RESEND_API_KEY`
3. `DEV_BYPASS_PAYWALL=true` for full UI/report testing without payment
4. `npm run dev` → Stripe logs: `not configured` (expected)
5. Optional: `./script/copy-production-to-neon.sh` (read-only export from prod)

**Do not add live Stripe keys locally** unless you want real charges.

---

## Phase 2 — Staging deploy (no Stripe)

**Status (2026-06-30):**

- Neon **`staging`** branch created from `main` (project `divorce-calculator-uk`, us-west-2)
- Production data copied read-only from live DB → staging: **17** email leads, **66** purchases, **21** sessions
- Replit production **unchanged** (export was read-only)
- Local smoke test: `npm run build && PORT=5001 node --env-file=.env.staging dist/index.cjs` → `/api/health` OK
- **Next:** one Render dashboard step to go public (see below)

Refresh staging data anytime:

```bash
npm run db:copy:staging
```

Best fit for this app: **Render** or **Railway** (long-running Node + `npm run start`).

### Render (blueprint included)

1. [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint** → connect GitHub repo `jcollinsmclappleid-star/divorce`
2. Render reads `render.yaml` and creates `divorce-calculator-uk-staging`
3. In the new service → **Environment**, paste from your local `.env.staging`:
   - `DATABASE_URL` (Neon staging branch)
   - `SESSION_SECRET`
   - `OPENAI_API_KEY`
   - `APP_URL` = the Render URL after first deploy (e.g. `https://divorce-calculator-uk-staging.onrender.com`)
   - `DEV_BYPASS_PAYWALL=true`
   - Leave `STRIPE_*` and `RESEND_*` unset until cutover
4. Deploy — health check: `GET /api/health` → `{ "ok": true, "db": "connected" }`
5. Update `APP_URL` env var if the auto-assigned hostname differs, then redeploy once

### Staging env (minimum)

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | Neon staging branch |
| `SESSION_SECRET` | Yes | Unique random string |
| `APP_URL` | Yes | Staging public URL |
| `OPENAI_API_KEY` | Yes | Report generation |
| `RESEND_API_KEY` | Recommended | Magic links / emails |
| `DEV_BYPASS_PAYWALL` | Staging only | `true` — test paid UI without checkout |
| `STRIPE_*` | **No** | Add at cutover only |

### Staging test checklist

- [ ] `/api/health` returns 200
- [ ] Wizard → preview → results (via bypass)
- [ ] Settlement Reality Check Report generates
- [ ] Magic link email from `/recover` (if Resend configured)
- [ ] No `STRIPE_SECRET_KEY` set — Replit checkout still handles live payments

---

## Phase 3 — Cutover (Stripe last)

Only when staging passes and you are ready to move traffic:

1. Neon production branch (final data sync if needed)
2. New hosting **production** env vars:
   - `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRODUCT_ID`, `STRIPE_PRICE_ID` (£79 = `unit_amount` **7900** in Stripe API)
   - `APP_URL=https://divorcecalculatoruk.co.uk`
   - **Remove** `DEV_BYPASS_PAYWALL`
3. Stripe webhook → `https://divorcecalculatoruk.co.uk/api/stripe/webhook`
4. One live £79 test purchase
5. DNS → new hosting
6. Keep Replit 48h for rollback

---

## How dual-mode Stripe works (safe for Replit)

| Environment | `STRIPE_SECRET_KEY` | Behaviour |
|-------------|---------------------|-----------|
| Replit prod (today) | **Not set** | Replit connector + sync (unchanged) |
| Staging / new host | Not set until cutover | Checkout disabled; use bypass on staging |
| New host cutover | Live key set | Direct Stripe API |

---

## £129 report walkthrough

Post-purchase optional service on `/results` — mailto for now. Stripe product later (`unit_amount` **12900** = £129.00).

---

## Files reference

- `.env.example` — local dev template
- `.env.staging.example` — staging without Stripe
- `render.yaml` — Render blueprint (staging)
- `script/copy-production-to-neon.sh` — pg_dump copy (needs libpq)
- `script/copy-production-to-neon.mjs` — Node copy (no pg_dump; used by `npm run db:copy:staging`)
