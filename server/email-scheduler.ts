import { db } from "./db";
import { emailLeads, purchases } from "@shared/schema";
import { and, eq, isNull, lt, isNotNull } from "drizzle-orm";
import { sendFollowUpEmail, sendPromoEmail } from "./email";
import { log } from "./index";

const THIRTY_MIN_MS = 30 * 60 * 1000;
const BOOT_DELAY_MS = 20_000;

const FOLLOWUP1_DELAY_MS = 24 * 60 * 60 * 1000;
const PROMO_DELAY_MS = 72 * 60 * 60 * 1000;

async function getPaidEmails(): Promise<Set<string>> {
  const now = new Date();
  const paid = await db
    .select({ email: purchases.email })
    .from(purchases)
    .where(and(eq(purchases.status, "paid"), isNotNull(purchases.email)));
  return new Set(paid.map((p) => p.email!.toLowerCase()));
}

export async function runEmailScheduler(): Promise<void> {
  try {
    const now = new Date();
    const paidEmails = await getPaidEmails();

    const followup1Cutoff = new Date(now.getTime() - FOLLOWUP1_DELAY_MS);
    const promoCutoff = new Date(now.getTime() - PROMO_DELAY_MS);

    const eligibleLeads = await db
      .select()
      .from(emailLeads)
      .where(
        and(
          eq(emailLeads.verified, true),
          isNull(emailLeads.unsubscribedAt)
        )
      );

    let followupsSent = 0;
    let promosSent = 0;

    for (const lead of eligibleLeads) {
      if (paidEmails.has(lead.email.toLowerCase())) continue;

      const capturedAt = lead.createdAt ?? new Date(0);

      if (!lead.followup1SentAt && capturedAt <= followup1Cutoff) {
        await sendFollowUpEmail(lead.email, lead.assetPoolSnapshot ?? null);
        await db
          .update(emailLeads)
          .set({ followup1SentAt: now })
          .where(eq(emailLeads.id, lead.id));
        followupsSent++;
      }

      if (!lead.promoSentAt && capturedAt <= promoCutoff) {
        await sendPromoEmail(lead.email, lead.id, lead.assetPoolSnapshot ?? null);
        await db
          .update(emailLeads)
          .set({ promoSentAt: now })
          .where(eq(emailLeads.id, lead.id));
        promosSent++;
      }
    }

    if (followupsSent > 0 || promosSent > 0) {
      log(`[scheduler] followups:${followupsSent} promos:${promosSent}`, 'email-scheduler');
    }
  } catch (err) {
    console.error('[email-scheduler] Error:', err);
  }
}

export function startEmailScheduler(): void {
  setTimeout(() => {
    runEmailScheduler();
    setInterval(runEmailScheduler, THIRTY_MIN_MS);
  }, BOOT_DELAY_MS);
}
