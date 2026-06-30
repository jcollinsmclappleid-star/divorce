#!/usr/bin/env node
/**
 * Create the £129 live Stripe product for report walkthrough support.
 * Run once after pasting STRIPE_SECRET_KEY into .env.cutover.
 *
 * Usage:
 *   npm run stripe:setup-support
 */

import Stripe from "stripe";
import fs from "fs";
import path from "path";

function loadCutoverEnv() {
  const file = path.resolve(process.cwd(), ".env.cutover");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadCutoverEnv();

const key = process.env.STRIPE_SECRET_KEY?.trim();
if (!key) {
  console.error("Set STRIPE_SECRET_KEY in .env.cutover first.");
  process.exit(1);
}

const stripe = new Stripe(key, { apiVersion: "2025-11-17.clover" });

const product = await stripe.products.create({
  name: "Report Walkthrough Support",
  description: "DivorceCalculatorUK — written email support to sense-check your report outputs (£129 one-off)",
  images: ["https://divorcecalculatoruk.co.uk/og-image.png"],
});

const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 12900,
  currency: "gbp",
});

console.log("");
console.log("£129 support product created. Add to .env.cutover:");
console.log("");
console.log(`STRIPE_SUPPORT_PRODUCT_ID=${product.id}`);
console.log(`STRIPE_SUPPORT_PRICE_ID=${price.id}`);
console.log("");
