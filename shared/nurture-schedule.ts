/** Nurture v2 — per-lead schedule anchored on nurtureEnrolledAt. */

/** First calendar day nurture emails may send (Europe/London midnight). Override via NURTURE_V2_START env. */
export const NURTURE_V2_START_ISO = "2026-07-02T00:00:00+01:00";

export const NURTURE_V2_VERSION = 2;

/** Local send window for scheduled nurture emails. */
export const NURTURE_SEND_TIMEZONE = "Europe/London";
export const NURTURE_SEND_HOUR = 8;
export const NURTURE_SEND_MINUTE = 0;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Days after nurtureEnrolledAt for each scheduled email. */
export const NURTURE_V2_STAGES = {
  /** Day 3 — gentle re-engage */
  reengage: 3 * DAY_MS,
  /** Day 7 — share / what each path leaves you with */
  share: 7 * DAY_MS,
  /** Day 14 — monthly headroom / will the money last */
  headroom: 14 * DAY_MS,
  /** Day 21 — questions before you agree */
  questions: 21 * DAY_MS,
  /** Day 35 — warm sign-off */
  final: 35 * DAY_MS,
} as const;

export type NurtureV2Stage = keyof typeof NURTURE_V2_STAGES;

export const SUMMARY_LEAD_SOURCES = ["wizard_preview", "preview_page"] as const;

function getConfiguredSendHour(): number {
  const raw = process.env.NURTURE_SEND_HOUR?.trim();
  if (!raw) return NURTURE_SEND_HOUR;
  const hour = Number(raw);
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw new Error(`Invalid NURTURE_SEND_HOUR: ${raw}`);
  }
  return hour;
}

function getConfiguredSendMinute(): number {
  const raw = process.env.NURTURE_SEND_MINUTE?.trim();
  if (!raw) return NURTURE_SEND_MINUTE;
  const minute = Number(raw);
  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new Error(`Invalid NURTURE_SEND_MINUTE: ${raw}`);
  }
  return minute;
}

function getConfiguredTimezone(): string {
  return process.env.NURTURE_SEND_TIMEZONE?.trim() || NURTURE_SEND_TIMEZONE;
}

/** Calendar date (YYYY-MM-DD) for an instant in the nurture send timezone. */
export function formatLocalYmd(date: Date, timeZone = getConfiguredTimezone()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function addCalendarDaysYmd(ymd: string, days: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d));
  utc.setUTCDate(utc.getUTCDate() + days);
  return utc.toISOString().slice(0, 10);
}

function readLocalParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");

  return {
    y: pick("year"),
    m: pick("month"),
    d: pick("day"),
    hour: pick("hour"),
    minute: pick("minute"),
  };
}

/** Wall-clock time in the nurture timezone → UTC Date. */
export function localWallClockToUtc(
  ymd: string,
  hour: number,
  minute: number,
  timeZone = getConfiguredTimezone(),
): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  const target = y * 10_000 + m * 100 + d;
  const targetMinutes = hour * 60 + minute;

  let lo = Date.UTC(y, m - 1, d - 1, 0, 0);
  let hi = Date.UTC(y, m - 1, d + 1, 23, 59);

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const parts = readLocalParts(new Date(mid), timeZone);
    const current = parts.y * 10_000 + parts.m * 100 + parts.d;
    const currentMinutes = parts.hour * 60 + parts.minute;

    if (current < target || (current === target && currentMinutes < targetMinutes)) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return new Date(lo);
}

/** When a nurture stage should send: 08:00 Europe/London on anchor date + N calendar days. */
export function nurtureStageSendAt(anchor: Date, stageDelayMs: number): Date {
  const dayOffset = Math.round(stageDelayMs / DAY_MS);
  const timeZone = getConfiguredTimezone();
  const anchorYmd = formatLocalYmd(anchor, timeZone);
  const targetYmd = addCalendarDaysYmd(anchorYmd, dayOffset);
  return localWallClockToUtc(
    targetYmd,
    getConfiguredSendHour(),
    getConfiguredSendMinute(),
    timeZone,
  );
}

export function parseNurtureV2Start(): Date {
  const raw = process.env.NURTURE_V2_START?.trim() || NURTURE_V2_START_ISO;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid NURTURE_V2_START: ${raw}`);
  }
  return parsed;
}

export function isNurtureV2Live(now = new Date()): boolean {
  return now.getTime() >= parseNurtureV2Start().getTime();
}

export function isNetNewNurtureLead(createdAt: Date | null | undefined, now = new Date()): boolean {
  if (!createdAt) return false;
  return createdAt.getTime() >= parseNurtureV2Start().getTime();
}

/** Lead received at least one email from the previous nurture sequence. */
export function receivedLegacyNurtureEmail(lead: {
  followup1SentAt?: Date | null;
  followup2SentAt?: Date | null;
  promoSentAt?: Date | null;
  followup3SentAt?: Date | null;
  followup4SentAt?: Date | null;
}): boolean {
  return Boolean(
    lead.followup1SentAt ||
      lead.followup2SentAt ||
      lead.promoSentAt ||
      lead.followup3SentAt ||
      lead.followup4SentAt,
  );
}

export function nurtureStageDue(
  anchor: Date,
  stageDelayMs: number,
  now = new Date(),
): boolean {
  const stageSendAt = nurtureStageSendAt(anchor, stageDelayMs);
  if (now.getTime() < stageSendAt.getTime()) return false;

  const timeZone = getConfiguredTimezone();
  const sendHour = getConfiguredSendHour();
  const { hour } = readLocalParts(now, timeZone);
  return hour >= sendHour;
}
