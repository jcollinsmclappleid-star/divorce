import { getStripeSync, getUncachableStripeClient, usesReplitStripeConnector } from './stripeClient';
import { storage } from './storage';
import { sendReportSupportConfirmationEmail, sendAdminNotification } from './email';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
        'Received type: ' + typeof payload + '. ' +
        'Ensure webhook route is registered BEFORE app.use(express.json()).'
      );
    }

    if (usesReplitStripeConnector()) {
      const sync = await getStripeSync();
      await sync.processWebhook(payload, signature);
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.warn('[webhook] STRIPE_WEBHOOK_SECRET not set — app-level purchase fulfillment is disabled. Set this secret to enable server-side payment confirmation.');
      return;
    }

    let rawEvent: any;
    try {
      const stripe = await getUncachableStripeClient();
      rawEvent = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      console.error('[webhook] Signature verification failed:', err.message);
      throw new Error('Webhook signature verification failed');
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
          } else {
            const support = await storage.getReportSupportByCheckoutSessionId(session.id);
            if (support && support.status !== 'paid') {
              const email = session.customer_details?.email ?? null;
              await storage.markReportSupportPaid(
                support.id,
                session.payment_intent as string || '',
                email,
              );
              if (email) {
                sendReportSupportConfirmationEmail(email).catch(() => {});
                sendAdminNotification('Report walkthrough support (webhook)', [
                  { label: 'Customer email', value: email },
                  { label: 'Support purchase ID', value: support.id },
                  { label: 'Amount', value: '£129' },
                ], 'report_support').catch(() => {});
              }
              console.log('[webhook] Report support marked paid via webhook');
            }
          }
        }
      }
    } catch (err: any) {
      console.error('[webhook] App handler error:', err.message);
    }
  }
}
