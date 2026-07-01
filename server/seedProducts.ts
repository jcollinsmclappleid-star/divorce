import { getUncachableStripeClient } from './stripeClient';
import { STRIPE_CHECKOUT_LOGO_URL, STRIPE_MAIN_PRODUCT } from '@shared/stripe-product-copy';

async function seedProducts() {
  const stripe = await getUncachableStripeClient();

  const existing = await stripe.products.search({ query: `name:'${STRIPE_MAIN_PRODUCT.name}'` });
  if (existing.data.length > 0) {
    console.log('Product already exists:', existing.data[0].id);
    const prices = await stripe.prices.list({ product: existing.data[0].id, active: true });
    console.log('Price:', prices.data[0]?.id, '- amount:', prices.data[0]?.unit_amount);
    return;
  }

  const product = await stripe.products.create({
    name: STRIPE_MAIN_PRODUCT.name,
    description: STRIPE_MAIN_PRODUCT.description,
    images: [STRIPE_CHECKOUT_LOGO_URL],
    metadata: { ...STRIPE_MAIN_PRODUCT.metadata },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 7900,
    currency: 'gbp',
  });

  console.log('Created product:', product.id);
  console.log('Created price:', price.id, '- £79.00');
}

seedProducts().catch(console.error);
