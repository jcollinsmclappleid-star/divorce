#!/usr/bin/env node
/** Verify £79 product/price IDs in .env.cutover against live Stripe account. */
import Stripe from "stripe";
import fs from "fs";
import path from "path";

function loadCutoverEnv() {
  const file = path.resolve(process.cwd(), ".env.cutover");
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
  console.error("STRIPE_SECRET_KEY missing in .env.cutover");
  process.exit(1);
}

const stripe = new Stripe(key, { apiVersion: "2025-11-17.clover" });
const productId = process.env.STRIPE_PRODUCT_ID;
const priceId = process.env.STRIPE_PRICE_ID;

try {
  const product = await stripe.products.retrieve(productId);
  const price = await stripe.prices.retrieve(priceId);
  console.log("£79 product OK:", product.name, "| price:", price.unit_amount, price.currency);
  if (price.unit_amount !== 7900) {
    console.warn("WARNING: price unit_amount is not 7900 (£79)");
  }
} catch (err) {
  console.error("£79 product/price check failed:", err.message);
  process.exit(1);
}
