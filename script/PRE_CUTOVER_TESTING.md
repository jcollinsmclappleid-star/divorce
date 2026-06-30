# Pre-cutover testing (no production impact)

Test Stripe checkout, webhooks, and Resend email **locally** against the Neon **staging** database. Replit production stays exactly as it is.

## Why this is safe

| | Replit production (live) | Your local `.env.test` |
|--|--------------------------|-------------------------|
| Database | East Neon (or Replit Postgres) | Neon **staging** branch (west copy) |
| Stripe | Replit connector → **live** keys | **Test** keys (`sk_test_`) — separate sandbox |
| Resend | Whatever Replit has (if any) | Your key locally only |
| Customers | Real traffic | Only you |

Nothing you set in `.env.test` changes Replit secrets. Live checkout on divorcecalculatoruk.co.uk is untouched.

---

## One-time setup

### 1. Create `.env.test`

```bash
cp .env.test.example .env.test
```

Use the **staging** `DATABASE_URL` from your Neon dashboard (branch `staging`, us-west-2).

### 2. Stripe test keys

1. [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) — toggle **Test mode** (top right)
2. Copy **Secret key** → `STRIPE_SECRET_KEY=sk_test_...`
3. Copy **Publishable key** → `STRIPE_PUBLISHABLE_KEY=pk_test_...`
4. Create test product:

```bash
npm run stripe:setup-test-product
```

Paste the printed `STRIPE_PRODUCT_ID` and `STRIPE_PRICE_ID` into `.env.test`.

### 3. Stripe webhooks (local)

Install [Stripe CLI](https://stripe.com/docs/stripe-cli), then in a **second terminal**:

```bash
npm run stripe:listen
```

Copy the `whsec_...` secret into `.env.test` as `STRIPE_WEBHOOK_SECRET`.

### 4. Resend

1. [Resend API keys](https://resend.com/api-keys) — create or reuse a key → `RESEND_API_KEY=re_...`

**Before DNS is verified on the new host:**

- `RESEND_FROM_EMAIL=onboarding@resend.dev` — delivers only to the email on your Resend account (fine for smoke tests)

**After domain verified** (SPF/DKIM on divorcecalculatoruk.co.uk):

- `RESEND_FROM_EMAIL=noreply@divorcecalculatoruk.co.uk`

Using Resend locally does not disable or change email on Replit.

### 5. Paywall mode

- `DEV_BYPASS_PAYWALL=false` — test full checkout → payment-success → results → report → email
- `DEV_BYPASS_PAYWALL=true` — skip payment; test wizard/report UI only

---

## Run tests

```bash
# Terminal 1
npm run dev:test

# Terminal 2 (while testing checkout)
npm run stripe:listen
```

### Checklist

- [ ] `http://localhost:5000/api/health` → `{ "ok": true, "db": "connected" }`
- [ ] Startup log: `Stripe: environment variables` (not Replit connector)
- [ ] Wizard → preview → unlock → Stripe checkout (test card `4242 4242 4242 4242`)
- [ ] `/payment-success` → results unlocked
- [ ] Purchase confirmation email received (check spam)
- [ ] `/recover` magic link email (if Resend configured)
- [ ] Settlement Reality Check Report generates

---

## When ready for real cutover

On **new hosting** (or Replit when you deliberately switch):

1. Neon west `DATABASE_URL` (staging → then promote to main)
2. **Live** Stripe keys (`sk_live_`, `pk_live_`) + live product/price IDs
3. Live webhook → `https://divorcecalculatoruk.co.uk/api/stripe/webhook`
4. `RESEND_*` with verified domain
5. `APP_URL=https://divorcecalculatoruk.co.uk`
6. **Remove** `DEV_BYPASS_PAYWALL`

Until that day, keep Replit secrets unchanged.
