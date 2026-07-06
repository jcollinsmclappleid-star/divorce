import type Stripe from "stripe";
import {
  STRIPE_CHECKOUT_LOGO_URL,
  STRIPE_MAIN_PRODUCT,
  STRIPE_EXPERT_REVIEW_PRODUCT,
} from "@shared/stripe-product-copy";

type ProductKind = "main" | "expert_review";

const COPY_BY_KIND: Record<ProductKind, { name: string; description: string; metadata: Record<string, string> }> = {
  main: {
    name: STRIPE_MAIN_PRODUCT.name,
    description: STRIPE_MAIN_PRODUCT.description,
    metadata: { ...STRIPE_MAIN_PRODUCT.metadata },
  },
  expert_review: {
    name: STRIPE_EXPERT_REVIEW_PRODUCT.name,
    description: STRIPE_EXPERT_REVIEW_PRODUCT.description,
    metadata: { ...STRIPE_EXPERT_REVIEW_PRODUCT.metadata },
  },
};

/** Keep Stripe product name, description and logo aligned with current positioning. */
export async function ensureStripeProductPresentation(
  stripe: Stripe,
  productId: string,
  kind: ProductKind,
): Promise<void> {
  const copy = COPY_BY_KIND[kind];
  const product = await stripe.products.retrieve(productId);

  const needsName = product.name !== copy.name;
  const needsDescription = product.description !== copy.description;
  const needsImage =
    !product.images?.length || !product.images.includes(STRIPE_CHECKOUT_LOGO_URL);

  if (!needsName && !needsDescription && !needsImage) return;

  await stripe.products.update(productId, {
    ...(needsName ? { name: copy.name } : {}),
    ...(needsDescription ? { description: copy.description } : {}),
    ...(needsImage ? { images: [STRIPE_CHECKOUT_LOGO_URL] } : {}),
    metadata: { ...product.metadata, ...copy.metadata },
  });
}

export async function ensureStripeProductPresentationForPrice(
  stripe: Stripe,
  priceId: string,
  kind: ProductKind,
): Promise<void> {
  const price = await stripe.prices.retrieve(priceId);
  const productId = typeof price.product === "string" ? price.product : price.product.id;
  await ensureStripeProductPresentation(stripe, productId, kind);
}
