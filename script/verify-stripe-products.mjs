#!/usr/bin/env node
/** Verify £79 and £249 product/price IDs in .env.cutover against Stripe account. */
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

async function verifyProduct(label, productId, priceId, expectedAmount) {
  const product = await stripe.products.retrieve(productId);
  const price = await stripe.prices.retrieve(priceId);
  console.log(`${label} OK:`, product.name, "| price:", price.unit_amount, price.currency);
  if (price.unit_amount !== expectedAmount) {
    console.warn(`WARNING: ${label} price unit_amount is not ${expectedAmount}`);
  }
  if (!product.images?.length) {
    console.warn(`WARNING: ${label} product has no logo image`);
  }
}

try {
  await verifyProduct("£79 product", process.env.STRIPE_PRODUCT_ID, process.env.STRIPE_PRICE_ID, 7900);
  const expertProductId =
    process.env.STRIPE_EXPERT_REVIEW_PRODUCT_ID?.trim()
    || process.env.STRIPE_SUPPORT_PRODUCT_ID?.trim();
  const expertPriceId =
    process.env.STRIPE_EXPERT_REVIEW_PRICE_ID?.trim()
    || process.env.STRIPE_SUPPORT_PRICE_ID?.trim();
  await verifyProduct(
    "£249 expert review product",
    expertProductId,
    expertPriceId,
    24900,
  );
} catch (err) {
  console.error("Product/price check failed:", err.message);
  process.exit(1);
}
