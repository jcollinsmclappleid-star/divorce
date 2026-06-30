#!/usr/bin/env bash
# Push .env.cutover to Vercel production environment, then deploy.
#
# Prerequisites:
#   1. Fill in .env.cutover (all required fields)
#   2. vercel login && vercel link
#
# Usage:
#   ./script/push-vercel-env.sh
#   npm run vercel:deploy

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env.cutover"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env.cutover — copy from .env.cutover.example and paste your keys."
  exit 1
fi

required=(DATABASE_URL SESSION_SECRET APP_URL STRIPE_SECRET_KEY STRIPE_PRICE_ID STRIPE_SUPPORT_PRICE_ID OPENAI_API_KEY RESEND_API_KEY)

missing=()
for key in "${required[@]}"; do
  val="$(grep -E "^${key}=" "$ENV_FILE" | head -1 | cut -d= -f2- || true)"
  if [[ -z "${val// }" ]]; then
    missing+=("$key")
  fi
done

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "Fill in these fields in .env.cutover before deploying:"
  printf '  - %s\n' "${missing[@]}"
  exit 1
fi

if ! command -v vercel >/dev/null 2>&1 && ! command -v npx >/dev/null 2>&1; then
  echo "Install Vercel CLI: npm i -g vercel"
  exit 1
fi

VC="npx vercel --scope jcollinsmclappleid-stars-projects"

if [[ "${SKIP_VERCEL_ENV:-}" == "1" ]]; then
  echo "Skipping env push (SKIP_VERCEL_ENV=1). Deploy only."
else
  echo "Pushing environment variables to Vercel (production)..."
  echo "(Each key is a separate CLI call — ~30s each. Use SKIP_VERCEL_ENV=1 to deploy only.)"
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "$line" || "$line" =~ ^# ]] && continue
    key="${line%%=*}"
    val="${line#*=}"
    [[ -z "$key" ]] && continue
    [[ -z "${val// }" ]] && continue
    echo "  → $key"
    printf '%s' "$val" | $VC env add "$key" production --force 2>/dev/null || \
      printf '%s' "$val" | $VC env add "$key" production
  done < "$ENV_FILE"
fi

echo ""
echo "Deploying to Vercel production..."
cd "$ROOT"
$VC --prod --yes

echo ""
echo "Done. Next steps:"
echo "  1. Note your Vercel URL from the output above"
echo "  2. Stripe Dashboard → Webhooks → https://divorcecalculatoruk.co.uk/api/stripe/webhook"
echo "  3. Add STRIPE_WEBHOOK_SECRET to .env.cutover and re-run this script if not set yet"
echo "  4. Point DNS to Vercel (see script/CUTOVER_DNS.md)"
echo "  5. After DNS propagates, decommission Replit"
