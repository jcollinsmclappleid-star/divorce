#!/usr/bin/env node
/**
 * Enrol legacy nurture recipients into nurture v2 without sending any emails.
 *
 * Eligible for re-enrolment (continuing cohort):
 *   - Received at least one legacy nurture email (followup1–4 or promo)
 *   - Not unsubscribed, not a paid customer, not already on nurture v2
 *
 * Existing sent timestamps are preserved so the scheduler does not re-send
 * stages they already received. Only nurture_enrolled_at / nurture_version are set.
 *
 * Net-new leads from NURTURE_V2_START are enrolled automatically at capture time.
 *
 * Usage:
 *   node --env-file=.env.cutover script/enroll-nurture-v2.mjs           # dry run
 *   node --env-file=.env.cutover script/enroll-nurture-v2.mjs --apply   # write to DB
 */

import pg from "pg";

const APPLY = process.argv.includes("--apply");
const V2_START = process.env.NURTURE_V2_START?.trim() || "2026-07-02T00:00:00+01:00";
const DATABASE_URL = process.env.DATABASE_URL?.trim();

if (!DATABASE_URL) {
  console.error("DATABASE_URL required (e.g. node --env-file=.env.cutover ...)");
  process.exit(1);
}

const client = new pg.Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
await client.connect();

const preview = await client.query(`
  SELECT el.id, el.email, el.source, el.created_at,
         el.followup1_sent_at, el.followup2_sent_at, el.promo_sent_at,
         el.followup3_sent_at, el.followup4_sent_at
  FROM email_leads el
  WHERE el.unsubscribed_at IS NULL
    AND (el.nurture_version IS NULL OR el.nurture_version = 0)
    AND (
      el.followup1_sent_at IS NOT NULL
      OR el.followup2_sent_at IS NOT NULL
      OR el.promo_sent_at IS NOT NULL
      OR el.followup3_sent_at IS NOT NULL
      OR el.followup4_sent_at IS NOT NULL
    )
    AND NOT EXISTS (
      SELECT 1 FROM purchases p
      WHERE p.status = 'paid'
        AND p.email IS NOT NULL
        AND lower(p.email) = lower(el.email)
    )
  ORDER BY el.created_at ASC
`);

console.log(`Nurture v2 start anchor: ${V2_START}`);
console.log(`Send time: 08:00 Europe/London on each scheduled day (per lead)`);
console.log(`Mode: ${APPLY ? "APPLY (will update DB)" : "DRY RUN (no changes)"}`);
console.log(`Legacy nurture recipients to re-enrol: ${preview.rowCount}`);
console.log("");

for (const row of preview.rows) {
  console.log(`  ${row.email} · created ${row.created_at?.toISOString?.() ?? row.created_at}`);
}

if (!APPLY) {
  console.log("\nRe-run with --apply to enrol these leads. No emails are sent by this script.");
  await client.end();
  process.exit(0);
}

const result = await client.query(`
  UPDATE email_leads el
  SET nurture_enrolled_at = $1::timestamptz,
      nurture_version = 2
  WHERE el.unsubscribed_at IS NULL
    AND (el.nurture_version IS NULL OR el.nurture_version = 0)
    AND (
      el.followup1_sent_at IS NOT NULL
      OR el.followup2_sent_at IS NOT NULL
      OR el.promo_sent_at IS NOT NULL
      OR el.followup3_sent_at IS NOT NULL
      OR el.followup4_sent_at IS NOT NULL
    )
    AND NOT EXISTS (
      SELECT 1 FROM purchases p
      WHERE p.status = 'paid'
        AND p.email IS NOT NULL
        AND lower(p.email) = lower(el.email)
    )
`, [V2_START]);

console.log(`\nEnrolled ${result.rowCount} leads into nurture v2 (schedule anchor: ${V2_START}).`);
console.log("Existing follow-up sent timestamps were kept — no duplicate nurture on deploy.");
console.log("Nurture emails send only on their scheduled calendar day (08:00 London), not as catch-up.");

await client.end();
