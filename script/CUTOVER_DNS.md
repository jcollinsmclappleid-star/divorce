# DNS cutover: Replit → Vercel

Do this **after** Vercel deploy succeeds and you've tested on the `.vercel.app` preview URL.

## 1. Add domain in Vercel

1. Vercel project → **Settings** → **Domains**
2. Add `divorcecalculatoruk.co.uk` and `www.divorcecalculatoruk.co.uk`
3. Vercel shows DNS records to add (usually A record or CNAME)

## 2. Update DNS at your registrar

| Record | Type | Value |
|--------|------|-------|
| `@` (apex) | A | `76.76.21.21` (Vercel apex IP — confirm in Vercel dashboard) |
| `www` | CNAME | `cname.vercel-dns.com` |

Remove or lower TTL on old Replit DNS records before cutover so propagation is fast.

## 3. Stripe webhook (live)

Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**

- URL: `https://divorcecalculatoruk.co.uk/api/stripe/webhook`
- Event: `checkout.session.completed`
- Copy signing secret → `STRIPE_WEBHOOK_SECRET` in `.env.cutover` → re-run `npm run vercel:deploy`

Remove the old Replit webhook endpoint once Vercel is confirmed working.

## 4. Resend DNS (if not already verified)

Resend dashboard → **Domains** → `divorcecalculatoruk.co.uk`

Ensure SPF and DKIM records are in DNS. Emails won't deliver reliably until verified.

## 5. Verify after DNS propagates

- [ ] `https://divorcecalculatoruk.co.uk/api/health` → `{ "ok": true, "db": "connected" }`
- [ ] Homepage loads, wizard works
- [ ] One live £79 test purchase (refund after)
- [ ] Purchase confirmation email arrives
- [ ] Magic link from `/recover` works

## 6. Decommission Replit

Keep Replit running **48 hours** after DNS cutover for rollback. Do **not** change Replit secrets until Vercel is confirmed stable.

Then remove Replit deployment or point it at a parked page.
