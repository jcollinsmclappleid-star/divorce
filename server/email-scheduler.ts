import { db } from "./db";
import { emailLeads, purchases } from "@shared/schema";
import { and, eq, isNull, isNotNull } from "drizzle-orm";
import { sendFollowUpEmail, sendPromoEmail, sendPensionInsightEmail, sendSustainabilityEmail, sendFinalNudgeEmail } from "./email";
import { log } from "./index";

const THIRTY_MIN_MS = 30 * 60 * 1000;
const BOOT_DELAY_MS = 20_000;

const DAY = 24 * 60 * 60 * 1000;
const FOLLOWUP1_DELAY_MS =  1 * DAY;
const PROMO_DELAY_MS      =  3 * DAY;
const FOLLOWUP2_DELAY_MS  =  5 * DAY;
const FOLLOWUP3_DELAY_MS  =  8 * DAY;
const FOLLOWUP4_DELAY_MS  = 12 * DAY;

async function getPaidEmails(): Promise<Set<string>> {
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

    const cutoff = (days: number) => new Date(now.getTime() - days * DAY);
    const f1Cut  = cutoff(1);
    const proCut = cutoff(3);
    const f2Cut  = cutoff(5);
    const f3Cut  = cutoff(8);
    const f4Cut  = cutoff(12);

    const eligibleLeads = await db
      .select()
      .from(emailLeads)
      .where(and(eq(emailLeads.verified, true), isNull(emailLeads.unsubscribedAt)));

    let counts = { f1: 0, promo: 0, f2: 0, f3: 0, f4: 0 };

    for (const lead of eligibleLeads) {
      if (paidEmails.has(lead.email.toLowerCase())) continue;

      const cap = lead.createdAt ?? new Date(0);

      if (!lead.followup1SentAt && cap <= f1Cut) {
        await sendFollowUpEmail(lead.email, lead.assetPoolSnapshot ?? null);
        await db.update(emailLeads).set({ followup1SentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.f1++;
      }

      if (!lead.promoSentAt && cap <= proCut) {
        await sendPromoEmail(lead.email, lead.id, lead.assetPoolSnapshot ?? null);
        await db.update(emailLeads).set({ promoSentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.promo++;
      }

      if (!lead.followup2SentAt && cap <= f2Cut) {
        await sendPensionInsightEmail(lead.email, lead.id);
        await db.update(emailLeads).set({ followup2SentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.f2++;
      }

      if (!lead.followup3SentAt && cap <= f3Cut) {
        await sendSustainabilityEmail(lead.email, lead.id);
        await db.update(emailLeads).set({ followup3SentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.f3++;
      }

      if (!lead.followup4SentAt && cap <= f4Cut) {
        await sendFinalNudgeEmail(lead.email, lead.id);
        await db.update(emailLeads).set({ followup4SentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.f4++;
      }
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (total > 0) {
      log(
        `[scheduler] f1:${counts.f1} promo:${counts.promo} f2:${counts.f2} f3:${counts.f3} f4:${counts.f4}`,
        'email-scheduler'
      );
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
