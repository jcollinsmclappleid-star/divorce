import { getStripeSync, getUncachableStripeClient } from './stripeClient';
import { storage } from './storage';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
        'Received type: ' + typeof payload + '. ' +
        'Ensure webhook route is registered BEFORE app.use(express.json()).'
      );
    }

    const sync = await getStripeSync();
    await sync.processWebhook(payload, signature);

    try {
      const stripe = await getUncachableStripeClient();
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        '' // managed webhook handles signature verification
      );
    } catch {
      // Signature verification may fail without webhook secret
      // Parse the raw event directly for our app logic
    }

    try {
      const rawEvent = JSON.parse(payload.toString());
      
      if (rawEvent.type === 'checkout.session.completed') {
        const session = rawEvent.data?.object;
        if (session?.id && session?.payment_status === 'paid') {
          const purchase = await storage.getPurchaseByCheckoutSessionId(session.id);
          if (purchase && purchase.status !== 'paid') {
            await storage.markPurchasePaid(
              purchase.id,
              session.payment_intent as string || '',
              session.customer_details?.email ?? null
            );
            console.log(`Purchase ${purchase.id} marked paid via webhook`);
          }
        }
      }
    } catch (err: any) {
      console.error('App webhook handler error:', err.message);
    }
  }
}
