import { getUncachableStripeClient } from './stripeClient';

async function seedProducts() {
  const stripe = await getUncachableStripeClient();

  const existing = await stripe.products.search({ query: "name:'Structured Financial Analysis'" });
  if (existing.data.length > 0) {
    console.log('Product already exists:', existing.data[0].id);
    const prices = await stripe.prices.list({ product: existing.data[0].id, active: true });
    console.log('Price:', prices.data[0]?.id, '- amount:', prices.data[0]?.unit_amount);
    return;
  }

  const product = await stripe.products.create({
    name: 'Structured Financial Analysis',
    description: 'Full structured financial modelling analysis for UK divorce proceedings. Includes scenario comparison, stability scoring, sensitivity testing, 12-month snapshots, 5-year projections, and downloadable Structured Financial Brief (PDF). Unlimited re-runs for 12 months.',
    metadata: {
      type: 'one_time_access',
      duration_months: '6',
    }
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
