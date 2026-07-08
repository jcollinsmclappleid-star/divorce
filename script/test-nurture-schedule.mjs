#!/usr/bin/env node
/**
 * Anti-backlog checks for nurture v2 scheduling.
 * Run: node script/test-nurture-schedule.mjs
 */
import {
  nurtureStageSendAt,
  nurtureStageStatus,
  NURTURE_V2_STAGES,
  getNurtureMaxSendsPerRun,
} from "../shared/nurture-schedule.ts";

const anchor = new Date("2026-07-02T08:00:00+01:00");
const reengageDelay = NURTURE_V2_STAGES.reengage;

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

// Day 3 scheduled send — before 08:00 London on that day → wait
const day3Early = new Date("2026-07-05T06:30:00+01:00");
assert(nurtureStageStatus(anchor, reengageDelay, day3Early) === "wait", "before send hour on scheduled day");

// Day 3 at 09:00 London → due
const day3Due = new Date("2026-07-05T09:00:00+01:00");
assert(nurtureStageStatus(anchor, reengageDelay, day3Due) === "due", "on scheduled day after send hour");

// Day 4 — missed (deploy catch-up must not send)
const day4Missed = new Date("2026-07-06T09:00:00+01:00");
assert(nurtureStageStatus(anchor, reengageDelay, day4Missed) === "missed", "day after scheduled send is missed");

// Day 2 — wait (not yet scheduled)
const day2 = new Date("2026-07-04T09:00:00+01:00");
assert(nurtureStageStatus(anchor, reengageDelay, day2) === "wait", "before scheduled day");

const sendAt = nurtureStageSendAt(anchor, reengageDelay);
assert(sendAt.toISOString().includes("2026-07-05"), `reengage send date is day 3: ${sendAt.toISOString()}`);

assert(getNurtureMaxSendsPerRun() === 25, "default per-run cap is 25");

console.log("nurture-schedule anti-backlog checks passed");
