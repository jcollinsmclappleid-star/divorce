#!/usr/bin/env node
/**
 * Create a £79 test-mode Stripe product for pre-cutover checkout testing.
 * Refuses live keys. Does not touch Replit or production Stripe.
 *
 * Usage:
 *   node --env-file=.env.test script/create-stripe-test-product.mjs
 */

import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY?.trim();
if (!key) {
  console.error("Set STRIPE_SECRET_KEY in .env.test (must be sk_test_...)");
  process.exit(1);
}
if (key.startsWith("sk_live_")) {
  console.error("Refusing live key. Use sk_test_... for pre-cutover testing.");
  process.exit(1);
}

const stripe = new Stripe(key, { apiVersion: "2025-11-17.clover" });

const product = await stripe.products.create({
  name: "Your Full Divorce Position",
  description:
    "Three reports + PDF from your figures: what each settlement path leaves you with (capital and monthly headroom), what stands out in your case, and what to check before you agree. 12 months access. Illustrative modelling only — not legal, tax or financial advice. (TEST)",
  images: ["https://divorcecalculatoruk.co.uk/og-image.png"],
  metadata: { type: "one_time_access", duration_months: "12" },
});

const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 7900,
  currency: "gbp",
});

console.log("");
console.log("Stripe TEST product created. Add to .env.test:");
console.log("");
console.log(`STRIPE_PRODUCT_ID=${product.id}`);
console.log(`STRIPE_PRICE_ID=${price.id}`);
console.log("");
console.log("Test card: 4242 4242 4242 4242, any future expiry, any CVC.");
