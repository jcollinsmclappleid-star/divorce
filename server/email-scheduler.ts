import { db } from "./db";
import { emailLeads, purchases } from "@shared/schema";
import { and, eq, isNull, isNotNull } from "drizzle-orm";
import {
  sendNurtureReengageEmail,
  sendNurtureShareEmail,
  sendNurtureHeadroomEmail,
  sendNurtureQuestionsEmail,
  sendNurtureFinalEmail,
} from "./email";
import { log } from "./log";
import {
  NURTURE_V2_STAGES,
  NURTURE_V2_VERSION,
  NURTURE_SEND_HOUR,
  NURTURE_SEND_TIMEZONE,
  isNurtureV2Live,
  getNurtureMaxSendsPerRun,
  nurtureStageStatus,
  parseNurtureV2Start,
} from "@shared/nurture-schedule";

const THIRTY_MIN_MS = 30 * 60 * 1000;
const BOOT_DELAY_MS = 20_000;

async function getPaidEmails(): Promise<Set<string>> {
  const paid = await db
    .select({ email: purchases.email })
    .from(purchases)
    .where(and(eq(purchases.status, "paid"), isNotNull(purchases.email)));
  return new Set(paid.map((p) => p.email!.toLowerCase()));
}

type StageKey = "reengage" | "share" | "headroom" | "questions" | "final";

const STAGE_ORDER: {
  key: StageKey;
  delayMs: number;
  sentField: "followup1SentAt" | "followup2SentAt" | "promoSentAt" | "followup3SentAt" | "followup4SentAt";
  send: (email: string, leadId: string, assetPoolSnapshot: string | null) => Promise<void>;
}[] = [
  {
    key: "reengage",
    delayMs: NURTURE_V2_STAGES.reengage,
    sentField: "followup1SentAt",
    send: (email, leadId, pool) => sendNurtureReengageEmail(email, leadId, pool),
  },
  {
    key: "share",
    delayMs: NURTURE_V2_STAGES.share,
    sentField: "followup2SentAt",
    send: (email, leadId) => sendNurtureShareEmail(email, leadId),
  },
  {
    key: "headroom",
    delayMs: NURTURE_V2_STAGES.headroom,
    sentField: "promoSentAt",
    send: (email, leadId) => sendNurtureHeadroomEmail(email, leadId),
  },
  {
    key: "questions",
    delayMs: NURTURE_V2_STAGES.questions,
    sentField: "followup3SentAt",
    send: (email, leadId) => sendNurtureQuestionsEmail(email, leadId),
  },
  {
    key: "final",
    delayMs: NURTURE_V2_STAGES.final,
    sentField: "followup4SentAt",
    send: (email, leadId) => sendNurtureFinalEmail(email, leadId),
  },
];

export async function runEmailScheduler(): Promise<void> {
  try {
    const now = new Date();

    if (!isNurtureV2Live(now)) {
      return;
    }

    const paidEmails = await getPaidEmails();

    const eligibleLeads = await db
      .select()
      .from(emailLeads)
      .where(
        and(
          eq(emailLeads.nurtureVersion, NURTURE_V2_VERSION),
          isNotNull(emailLeads.nurtureEnrolledAt),
          eq(emailLeads.verified, true),
          isNull(emailLeads.unsubscribedAt),
        ),
      );

    const counts: Record<StageKey, number> = {
      reengage: 0,
      share: 0,
      headroom: 0,
      questions: 0,
      final: 0,
    };
    let skippedMissed = 0;
    const maxSends = getNurtureMaxSendsPerRun();
    let totalSent = 0;

    for (const lead of eligibleLeads) {
      if (totalSent >= maxSends) break;
      if (paidEmails.has(lead.email.toLowerCase())) continue;

      const anchor = lead.nurtureEnrolledAt!;
      if (anchor.getTime() > now.getTime()) continue;

      const leadState = { ...lead };

      for (const stage of STAGE_ORDER) {
        if (leadState[stage.sentField]) continue;

        const status = nurtureStageStatus(anchor, stage.delayMs, now);
        if (status === "wait") break;

        if (status === "missed") {
          await db
            .update(emailLeads)
            .set({ [stage.sentField]: now })
            .where(eq(emailLeads.id, lead.id));
          leadState[stage.sentField] = now;
          skippedMissed++;
          continue;
        }

        if (totalSent >= maxSends) break;

        await stage.send(lead.email, lead.id, lead.assetPoolSnapshot ?? null);
        await db
          .update(emailLeads)
          .set({ [stage.sentField]: now })
          .where(eq(emailLeads.id, lead.id));
        counts[stage.key]++;
        totalSent++;
        break;
      }
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (total > 0 || skippedMissed > 0) {
      log(
        `[scheduler] nurture-v2 sent:${total} skipped_missed:${skippedMissed} cap:${maxSends} reengage:${counts.reengage} share:${counts.share} headroom:${counts.headroom} questions:${counts.questions} final:${counts.final}`,
        "email-scheduler",
      );
    }
  } catch (err) {
    console.error("[email-scheduler] Error:", err);
  }
}

export function startEmailScheduler(): void {
  const startAt = parseNurtureV2Start();
  log(
    `[email-scheduler] Nurture v2 idle until ${startAt.toISOString()}; sends at ${String(NURTURE_SEND_HOUR).padStart(2, "0")}:00 ${NURTURE_SEND_TIMEZONE} per lead (from nurtureEnrolledAt + day offset)`,
    "email-scheduler",
  );

  setTimeout(() => {
    runEmailScheduler();
    setInterval(runEmailScheduler, THIRTY_MIN_MS);
  }, BOOT_DELAY_MS);
}
