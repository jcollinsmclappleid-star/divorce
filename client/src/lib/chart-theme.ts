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
