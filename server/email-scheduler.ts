import { db } from "./db";
import { emailLeads, purchases } from "@shared/schema";
import { and, eq, isNull, isNotNull, gte } from "drizzle-orm";
import { sendFollowUpEmail, sendPromoEmail, sendPensionInsightEmail, sendSustainabilityEmail, sendFinalNudgeEmail } from "./email";
import { log } from "./log";

const THIRTY_MIN_MS = 30 * 60 * 1000;
const BOOT_DELAY_MS = 20_000;

const DAY = 24 * 60 * 60 * 1000;

// Only enrol leads captured on or after this date.
// Leads before this date have already received emails — they are permanently excluded.
const CAMPAIGN_ACTIVE_FROM = new Date('2026-06-09T00:00:00Z');

// New spacing: one gentle email at a time, spread over 5 weeks
const FOLLOWUP1_DELAY_MS =  3 * DAY;   // Day 3  — gentle reminder
const PROMO_DELAY_MS      = 14 * DAY;  // Day 14 — discount offer (soft)
const FOLLOWUP2_DELAY_MS  =  7 * DAY;  // Day 7  — pension insight (educational)
const FOLLOWUP3_DELAY_MS  = 21 * DAY;  // Day 21 — sustainability / "will you be ok?"
const FOLLOWUP4_DELAY_MS  = 35 * DAY;  // Day 35 — final quiet sign-off

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

    const cutoff = (ms: number) => new Date(now.getTime() - ms);

    const eligibleLeads = await db
      .select()
      .from(emailLeads)
      .where(
        and(
          eq(emailLeads.verified, true),
          isNull(emailLeads.unsubscribedAt),
          gte(emailLeads.createdAt, CAMPAIGN_ACTIVE_FROM)
        )
      );

    let counts = { f1: 0, promo: 0, f2: 0, f3: 0, f4: 0 };

    for (const lead of eligibleLeads) {
      if (paidEmails.has(lead.email.toLowerCase())) continue;

      const cap = lead.createdAt ?? new Date(0);
      let sent = false;

      // One email per lead per scheduler run — check stages in order, send the first pending one only
      if (!lead.followup1SentAt && cap <= cutoff(FOLLOWUP1_DELAY_MS)) {
        await sendFollowUpEmail(lead.email, lead.assetPoolSnapshot ?? null);
        await db.update(emailLeads).set({ followup1SentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.f1++;
        sent = true;
      }

      if (!sent && !lead.followup2SentAt && cap <= cutoff(FOLLOWUP2_DELAY_MS)) {
        await sendPensionInsightEmail(lead.email, lead.id);
        await db.update(emailLeads).set({ followup2SentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.f2++;
        sent = true;
      }

      if (!sent && !lead.promoSentAt && cap <= cutoff(PROMO_DELAY_MS)) {
        await sendPromoEmail(lead.email, lead.id, lead.assetPoolSnapshot ?? null);
        await db.update(emailLeads).set({ promoSentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.promo++;
        sent = true;
      }

      if (!sent && !lead.followup3SentAt && cap <= cutoff(FOLLOWUP3_DELAY_MS)) {
        await sendSustainabilityEmail(lead.email, lead.id);
        await db.update(emailLeads).set({ followup3SentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.f3++;
        sent = true;
      }

      if (!sent && !lead.followup4SentAt && cap <= cutoff(FOLLOWUP4_DELAY_MS)) {
        await sendFinalNudgeEmail(lead.email, lead.id);
        await db.update(emailLeads).set({ followup4SentAt: now }).where(eq(emailLeads.id, lead.id));
        counts.f4++;
      }
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (total > 0) {
      log(
        `[scheduler] f1:${counts.f1} pension:${counts.f2} promo:${counts.promo} sustain:${counts.f3} final:${counts.f4}`,
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
