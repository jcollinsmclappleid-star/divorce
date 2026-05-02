export const chartTheme = {
  font: {
    family: '"Inter", system-ui, sans-serif',
    serif: '"Fraunces", Georgia, serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  color: {
    gold: "#C9A84C",
    goldSoft: "#E0C77C",
    goldGlow: "rgba(201,168,76,0.18)",
    ink: "#0F1B2D",
    inkSoft: "#1E2A40",
    paper: "#FFFFFF",
    paperWarm: "#FAF7F0",
    grid: "rgba(15,27,45,0.06)",
    gridDark: "rgba(255,255,255,0.08)",
    muted: "#6B7280",
    mutedDark: "rgba(255,255,255,0.4)",
    a: "#2563EB",
    aSoft: "#60A5FA",
    aGlow: "rgba(37,99,235,0.18)",
    b: "#10B981",
    bSoft: "#34D399",
    bGlow: "rgba(16,185,129,0.18)",
    sustain: "#10B981",
    attention: "#F59E0B",
    pressure: "#EF4444",
    violet: "#8B5CF6",
    rose: "#F43F5E",
    cyan: "#06B6D4",
  },
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  duration: { fast: 0.25, base: 0.55, slow: 0.9 },
};

export function gaugeColor(score: number) {
  if (score >= 70) return { stroke: chartTheme.color.sustain, label: "Sustainable",      tone: "emerald" as const };
  if (score >= 40) return { stroke: chartTheme.color.attention, label: "Attention needed", tone: "amber"   as const };
  return                  { stroke: chartTheme.color.pressure, label: "Under pressure",  tone: "red"     as const };
}

export function fmtK(v: number) {
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `£${(v / 1_000_000).toFixed(1)}m`;
  if (abs >= 1000)      return `£${Math.round(v / 1000)}k`;
  return `£${Math.round(v)}`;
}

export function fmtGbp(v: number) { return `£${Math.abs(Math.round(v)).toLocaleString()}`; }

/**
 * Convert a coarse yearly trajectory into a realistic monthly trajectory
 * with deterministic, scenario-specific noise (market wobble, life events).
 * Returns ~61 monthly points (months 0..60) interpolated through the yearly
 * anchors, plus pseudo-random monthly variability of ±~1.2% and a couple of
 * gentle "shock" dips so the line looks like a real life trajectory rather
 * than a smooth straight ramp.
 *
 * `seed` should be a stable scenario id hash so the same scenario always
 * renders the same shape across re-renders.
 */
export function densifyProjection(yearly: number[], seed = 1): number[] {
  if (yearly.length < 2) return yearly.slice();
  // Tiny seeded PRNG (mulberry32-style) so output is stable per scenario
  let s = (seed * 2654435761) >>> 0;
  const rand = () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const monthsPerYear = 12;
  const totalMonths = (yearly.length - 1) * monthsPerYear;
  const out: number[] = [];

  // Decide on 1–2 shock months (e.g. boiler blow-up, market dip) per scenario
  const shockA = 6 + Math.floor(rand() * 12);              // somewhere in yr 1
  const shockB = 24 + Math.floor(rand() * 18);             // somewhere in yr 2–3
  const shockMagA = -0.012 - rand() * 0.018;               // -1.2% to -3.0%
  const shockMagB = -0.008 - rand() * 0.014;               // -0.8% to -2.2%

  for (let m = 0; m <= totalMonths; m++) {
    const yearIdxF = m / monthsPerYear;
    const y0 = Math.floor(yearIdxF);
    const y1 = Math.min(y0 + 1, yearly.length - 1);
    const t = yearIdxF - y0;
    // Smoothstep between yearly anchors for a natural curve
    const ts = t * t * (3 - 2 * t);
    const trend = yearly[y0] + (yearly[y1] - yearly[y0]) * ts;

    // Multi-frequency wobble — looks like real markets / cashflow
    const wob =
      Math.sin(m * 0.55 + seed * 0.3) * 0.006 +
      Math.sin(m * 1.31 + seed * 0.7) * 0.004 +
      (rand() - 0.5) * 0.006;

    let shock = 0;
    if (m === shockA || m === shockA + 1) shock += shockMagA;
    if (m === shockB) shock += shockMagB;

    out.push(trend * (1 + wob + shock));
  }
  return out;
}

/** Stable hash for short ids like "S1", "S2" → integer seed */
export function hashSeed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
