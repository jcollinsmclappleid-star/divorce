import { db, pool } from "./db";
import { magicLinks, emailLeads, purchases, sessions } from "@shared/schema";
import { lt, and, eq, isNotNull } from "drizzle-orm";
import { log } from "./index";

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const BOOT_DELAY_MS = 15_000;

export async function runRetentionCleanup() {
  try {
    const now = new Date();

    const expiredMagicLinks = await db
      .delete(magicLinks)
      .where(lt(magicLinks.expiresAt, now))
      .returning({ id: magicLinks.id });

    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const unverifiedLeads = await db
      .delete(emailLeads)
      .where(and(eq(emailLeads.verified, false), lt(emailLeads.createdAt, thirtyDaysAgo)))
      .returning({ id: emailLeads.id });

    const twentyFourMonthsAgo = new Date(now);
    twentyFourMonthsAgo.setMonth(twentyFourMonthsAgo.getMonth() - 24);
    const expiredLeads = await db
      .delete(emailLeads)
      .where(and(eq(emailLeads.verified, true), lt(emailLeads.createdAt, twentyFourMonthsAgo)))
      .returning({ id: emailLeads.id });

    // Backfill: NULL any historic asset_pool_snapshot values. The column is
    // retired (no code path writes to it now), so this is a one-off backfill
    // for legacy rows and a no-op on every subsequent run.
    await pool.query(
      `UPDATE email_leads SET asset_pool_snapshot = NULL WHERE asset_pool_snapshot IS NOT NULL`
    );

    const sevenYearsAgo = new Date(now);
    sevenYearsAgo.setFullYear(sevenYearsAgo.getFullYear() - 7);
    const anonymisedPurchases = await db
      .update(purchases)
      .set({ email: null })
      .where(and(isNotNull(purchases.email), lt(purchases.createdAt, sevenYearsAgo)))
      .returning({ id: purchases.id });

    const twelveMonthsAgo = new Date(now);
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    const oldSessions = await db
      .delete(sessions)
      .where(lt(sessions.updatedAt, twelveMonthsAgo))
      .returning({ id: sessions.id });

    log(
      `[retention] magic_links:${expiredMagicLinks.length} unverified_leads:${unverifiedLeads.length} expired_leads:${expiredLeads.length} anonymised_purchases:${anonymisedPurchases.length} old_sessions:${oldSessions.length}`,
      'cleanup'
    );
  } catch (err) {
    console.error('[retention] Cleanup error:', err);
  }
}

export function startRetentionCleanup() {
  setTimeout(() => {
    runRetentionCleanup();
    setInterval(runRetentionCleanup, SIX_HOURS_MS);
  }, BOOT_DELAY_MS);
}

