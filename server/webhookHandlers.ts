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

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let rawEvent: any;

    if (webhookSecret) {
      try {
        const stripe = await getUncachableStripeClient();
        const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        rawEvent = event;
      } catch (err: any) {
        console.error('[webhook] Signature verification failed:', err.message);
        throw new Error('Webhook signature verification failed');
      }
    } else {
      try {
        rawEvent = JSON.parse(payload.toString());
      } catch (err: any) {
        console.error('[webhook] Failed to parse raw event payload:', err.message);
        throw new Error('Failed to parse webhook payload');
      }
    }

    try {
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
            console.log('[webhook] Purchase marked paid via webhook');
          }
        }
      }
    } catch (err: any) {
      console.error('[webhook] App handler error:', err.message);
    }
  }
}
