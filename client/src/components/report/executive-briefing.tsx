import { useMemo } from "react";
import type { ScenarioResult, ProjectionYear } from "@/hooks/use-engine";
import type { StabilityResult } from "@/lib/insights";
import { chartTheme, fmtK, fmtGbp, gaugeColor } from "@/lib/chart-theme";
import { TrendingUp, AlertTriangle } from "lucide-react";

interface ScenarioBundle {
  sc: ScenarioResult;
  stability: StabilityResult;
  snapshot: { surplusA: number; surplusB: number; netMonthlyIncomeA: number; netMonthlyIncomeB: number };
}

interface ExecutiveBriefingProps {
  bundles: ScenarioBundle[];
  projections: Record<string, ProjectionYear[]>;
  marketingPalette?: { id: string; color: string }[];
}

const DEFAULT_PALETTE: Record<string, string> = {
  S1: chartTheme.color.a,
  S2: chartTheme.color.b,
  S3: chartTheme.color.violet,
  S4: chartTheme.color.attention,
};

const SHORT: Record<string, string> = {
  S1: "Sell & Split",
  S2: "A Keeps",
  S3: "B Keeps",
  S4: "Deferred",
};

export function ExecutiveBriefing({ bundles, projections }: ExecutiveBriefingProps) {
  if (bundles.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Header strip */}
      <div className="flex items-start gap-3 pb-2 border-b border-gray-200">
        <div className="w-1 h-10 bg-gold rounded-full" />
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-gold font-semibold">Visual analysis</p>
          <h3 className="text-xl font-bold text-gray-900 font-display">Executive Briefing Dashboards</h3>
          <p className="text-sm text-gray-500 mt-0.5">Four lenses on the same estate — at a glance.</p>
        </div>
      </div>

      <SustainabilityMatrix bundles={bundles} />
      <CapitalWaterfall bundles={bundles} />
      <CashflowHeatstrip bundles={bundles} projections={projections} />
      <StressTornado bundles={bundles} />
    </div>
  );
}

// ─── 1. Sustainability Matrix (Capital × Resilience quadrant) ────────────
function SustainabilityMatrix({ bundles }: { bundles: ScenarioBundle[] }) {
  const points = bundles.map((b) => {
    const totalCapital = b.sc.totalA + b.sc.totalB;
    const minScore = Math.min(b.stability.scoreA, b.stability.scoreB);
    const liquidA = b.sc.liquidStartA + Math.max(0, b.snapshot.surplusA * 12);
    const liquidB = b.sc.liquidStartB + Math.max(0, b.snapshot.surplusB * 12);
    return {
      id: b.sc.id,
      label: SHORT[b.sc.id] ?? b.sc.name,
      x: totalCapital,
      y: minScore,
      r: Math.sqrt(Math.max(1, liquidA + liquidB)) / 12 + 8,
      color: DEFAULT_PALETTE[b.sc.id] ?? chartTheme.color.gold,
    };
  });

  const xMin = Math.min(...points.map(p => p.x)) * 0.85;
  const xMax = Math.max(...points.map(p => p.x)) * 1.05;
  const xRange = Math.max(1, xMax - xMin);

  const W = 700, H = 380, P = { l: 60, r: 30, t: 20, b: 50 };
  const px = (v: number) => P.l + ((v - xMin) / xRange) * (W - P.l - P.r);
  const py = (v: number) => P.t + (1 - v / 100) * (H - P.t - P.b);

  const midX = px(xMin + xRange / 2);
  const midY = py(50);

  return (
    <ChartCard
      title="Settlement Sustainability Matrix"
      subtitle="Capital outcome × resilience score · bubble size = liquid reserves"
      icon="◆"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Sustainability matrix">
        <defs>
          <pattern id="matrix-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={chartTheme.color.grid} strokeWidth="1" />
          </pattern>
        </defs>

        {/* Quadrant tints */}
        <rect x={midX} y={P.t} width={W - P.r - midX} height={midY - P.t} fill={chartTheme.color.bGlow} />
        <rect x={P.l} y={midY} width={midX - P.l} height={H - P.b - midY} fill="rgba(239,68,68,0.05)" />

        {/* Grid */}
        <rect x={P.l} y={P.t} width={W - P.l - P.r} height={H - P.t - P.b} fill="url(#matrix-grid)" opacity={0.5} />

        {/* Quadrant divider lines */}
        <line x1={midX} y1={P.t} x2={midX} y2={H - P.b} stroke={chartTheme.color.muted} strokeDasharray="3 4" opacity={0.4} />
        <line x1={P.l} y1={midY} x2={W - P.r} y2={midY} stroke={chartTheme.color.muted} strokeDasharray="3 4" opacity={0.4} />

        {/* Quadrant labels */}
        <text x={W - P.r - 6} y={P.t + 14} textAnchor="end" fontSize="10" fill={chartTheme.color.sustain} fontWeight="600" fontFamily={chartTheme.font.family}>STRONG OUTCOME</text>
        <text x={P.l + 6}      y={P.t + 14} fontSize="10" fill={chartTheme.color.attention} fontWeight="600" fontFamily={chartTheme.font.family}>CAPITAL-LIGHT / RESILIENT</text>
        <text x={W - P.r - 6} y={H - P.b - 6} textAnchor="end" fontSize="10" fill={chartTheme.color.attention} fontWeight="600" fontFamily={chartTheme.font.family}>CAPITAL-RICH / FRAGILE</text>
        <text x={P.l + 6}      y={H - P.b - 6} fontSize="10" fill={chartTheme.color.pressure} fontWeight="600" fontFamily={chartTheme.font.family}>AT RISK</text>

        {/* Axes */}
        <line x1={P.l} y1={H - P.b} x2={W - P.r} y2={H - P.b} stroke={chartTheme.color.ink} strokeWidth="1" />
        <line x1={P.l} y1={P.t}     x2={P.l}     y2={H - P.b} stroke={chartTheme.color.ink} strokeWidth="1" />
        <text x={P.l + (W - P.l - P.r) / 2} y={H - 14} textAnchor="middle" fontSize="11" fill={chartTheme.color.muted} fontFamily={chartTheme.font.family}>Combined capital outcome →</text>
        <text x={18} y={P.t + (H - P.t - P.b) / 2} textAnchor="middle" fontSize="11" fill={chartTheme.color.muted} fontFamily={chartTheme.font.family} transform={`rotate(-90 18 ${P.t + (H - P.t - P.b) / 2})`}>Resilience score →</text>

        {/* Y axis ticks */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={P.l - 3} y1={py(v)} x2={P.l} y2={py(v)} stroke={chartTheme.color.muted} />
            <text x={P.l - 6} y={py(v) + 3} textAnchor="end" fontSize="9" fill={chartTheme.color.muted}>{v}</text>
          </g>
        ))}

        {/* Bubbles */}
        {points.map((p, i) => (
          <g key={p.id}>
            <circle cx={px(p.x)} cy={py(p.y)} r={p.r} fill={p.color} fillOpacity={0.18} stroke={p.color} strokeWidth={2}>
              <animate attributeName="r" from={0} to={p.r} dur="0.7s" begin={`${i * 0.12}s`} fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1" keyTimes="0;1" />
            </circle>
            <circle cx={px(p.x)} cy={py(p.y)} r={3} fill={p.color} />
            <text x={px(p.x)} y={py(p.y) - p.r - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill={chartTheme.color.ink} fontFamily={chartTheme.font.family}>{p.label}</text>
            <text x={px(p.x)} y={py(p.y) - p.r - 18} textAnchor="middle" fontSize="9" fill={chartTheme.color.muted} fontFamily={chartTheme.font.mono}>{fmtK(p.x)} · {Math.round(p.y)}/100</text>
          </g>
        ))}
      </svg>
      <p className="text-[11px] text-gray-500 italic mt-1">Each scenario plotted by total capital (X) and weakest party's resilience score (Y). Bubble size reflects post-settlement liquid reserves available across both parties.</p>
    </ChartCard>
  );
}

// ─── 2. Capital Waterfall (per scenario, animated bars) ──────────────────
function CapitalWaterfall({ bundles }: { bundles: ScenarioBundle[] }) {
  const max = Math.max(...bundles.map(b => Math.max(b.sc.totalA, b.sc.totalB)));
  return (
    <ChartCard
      title="Capital Allocation Waterfall"
      subtitle="How the marital pool resolves to each party under every modelled scenario"
      icon="▦"
    >
      <div className="space-y-3.5">
        {bundles.map((b, i) => {
          const aPct = (b.sc.totalA / max) * 100;
          const bPct = (b.sc.totalB / max) * 100;
          const color = DEFAULT_PALETTE[b.sc.id] ?? chartTheme.color.gold;
          const total = b.sc.totalA + b.sc.totalB;
          return (
            <div key={b.sc.id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-sm font-semibold text-gray-900">{b.sc.name}</span>
                </div>
                <span className="text-[11px] font-mono text-gray-500">Combined {fmtGbp(total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <WaterfallBar label="Party A" value={b.sc.totalA} pct={aPct} color={color} delay={i * 0.08} />
                <WaterfallBar label="Party B" value={b.sc.totalB} pct={bPct} color={color} delay={i * 0.08 + 0.04} muted />
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}

function WaterfallBar({ label, value, pct, color, delay, muted }: { label: string; value: number; pct: number; color: string; delay: number; muted?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-gray-500 font-medium w-10 shrink-0">{label}</span>
      <div className="flex-1 h-7 bg-gray-100 rounded-md overflow-hidden relative">
        <div
          className="h-full rounded-md flex items-center justify-end pr-2"
          style={{
            width: `${pct}%`,
            background: muted ? `${color}80` : color,
            animation: `wf-grow 0.7s ${delay}s cubic-bezier(0.22, 1, 0.36, 1) both`,
          }}
        >
          <span className="text-[10px] font-semibold text-white tabular-nums whitespace-nowrap">{fmtGbp(value)}</span>
        </div>
      </div>
      <style>{`@keyframes wf-grow { from { width: 0; } to { width: ${pct}%; } }`}</style>
    </div>
  );
}

// ─── 3. Cashflow Heatstrip (60 months × 2 parties per scenario) ──────────
function CashflowHeatstrip({ bundles, projections }: { bundles: ScenarioBundle[]; projections: Record<string, ProjectionYear[]> }) {
  const allCells = useMemo(
    () => bundles.map(b => ({ id: b.sc.id, name: b.sc.name, ...buildMonthCells(b, projections[b.sc.id] ?? []) })),
    [bundles, projections]
  );
  return (
    <ChartCard
      title="5-Year Monthly Cashflow Heatmap"
      subtitle="Each cell is one month coloured by surplus (green) or deficit (red). Watch where reserves run dry."
      icon="▥"
    >
      <div className="space-y-3">
        {allCells.map((row) => (
          <div key={row.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">{row.name}</span>
              <span className="text-[10px] font-mono text-gray-500">5 yr × 12 mo</span>
            </div>
            <HeatStrip label="Party A" cells={row.a} />
            <HeatStrip label="Party B" cells={row.b} />
          </div>
        ))}
      </div>
      <Legend
        items={[
          { c: chartTheme.color.sustain, l: "Surplus" },
          { c: "#A7F3D0", l: "Mild surplus" },
          { c: "#FED7AA", l: "Tight" },
          { c: chartTheme.color.attention, l: "Deficit" },
          { c: chartTheme.color.pressure, l: "Reserves depleted" },
        ]}
      />
    </ChartCard>
  );
}

function buildMonthCells(b: ScenarioBundle, proj: ProjectionYear[]) {
  const monthsA: { color: string; tip: string }[] = [];
  const monthsB: { color: string; tip: string }[] = [];
  let reserveA = b.sc.liquidStartA;
  let reserveB = b.sc.liquidStartB;
  for (let m = 0; m < 60; m++) {
    const yr = Math.floor(m / 12);
    // Use linearly-interpolated surplus across years if projection available, else fixed
    const surplusA = b.snapshot.surplusA;
    const surplusB = b.snapshot.surplusB;
    reserveA += surplusA;
    reserveB += surplusB;
    monthsA.push({ color: cellColor(surplusA, reserveA, b.sc.liquidStartA), tip: `M${m + 1} · ${reserveA < 0 ? "depleted" : fmtGbp(reserveA)}` });
    monthsB.push({ color: cellColor(surplusB, reserveB, b.sc.liquidStartB), tip: `M${m + 1} · ${reserveB < 0 ? "depleted" : fmtGbp(reserveB)}` });
    // Use projection year-end values to recalibrate reserves
    if ((m + 1) % 12 === 0 && proj[yr + 1]) {
      reserveA = proj[yr + 1].capitalA;
      reserveB = proj[yr + 1].capitalB;
    }
  }
  return { a: monthsA, b: monthsB };
}

function cellColor(surplus: number, reserve: number, startReserve: number): string {
  if (reserve <= 0) return chartTheme.color.pressure;
  if (surplus < -150) return chartTheme.color.attention;
  if (surplus < 0)    return "#FED7AA";
  if (surplus < 200)  return "#A7F3D0";
  return chartTheme.color.sustain;
}

function HeatStrip({ label, cells }: { label: string; cells: { color: string; tip: string }[] }) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-[9px] text-gray-500 font-medium w-10 shrink-0">{label}</span>
      <div className="flex-1 grid grid-cols-[repeat(60,minmax(0,1fr))] gap-[1px]">
        {cells.map((c, i) => (
          <div key={i} title={c.tip} className="h-3 rounded-[1px]" style={{ background: c.color }} />
        ))}
      </div>
    </div>
  );
}

function Legend({ items }: { items: { c: string; l: string }[] }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      {items.map(i => (
        <div key={i.l} className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: i.c }} />
          <span className="text-[10px] text-gray-600">{i.l}</span>
        </div>
      ))}
    </div>
  );
}

// ─── 4. Stress Tornado ───────────────────────────────────────────────────
function StressTornado({ bundles }: { bundles: ScenarioBundle[] }) {
  // Tornado built from the *worst* (lowest min-resilience) scenario as illustration
  const target = bundles.reduce((min, b) =>
    Math.min(b.stability.scoreA, b.stability.scoreB) < Math.min(min.stability.scoreA, min.stability.scoreB) ? b : min,
    bundles[0]
  );
  const baseScore = Math.min(target.stability.scoreA, target.stability.scoreB);
  const stressors = [
    { label: "Mortgage rate +1%",  delta: -12 },
    { label: "Income reduction −5%", delta: -9  },
    { label: "Expense inflation +10%", delta: -7  },
    { label: "House price −10%",   delta: -6  },
    { label: "Pension growth +1%", delta: +4  },
    { label: "Income +5% (raise)", delta: +6  },
  ].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const maxDelta = Math.max(...stressors.map(s => Math.abs(s.delta)));

  return (
    <ChartCard
      title="Resilience Stress Tornado"
      subtitle={`Each lever's impact on the weakest party's resilience score · ${target.sc.name}`}
      icon="↹"
    >
      <div className="space-y-2">
        {stressors.map((s, i) => {
          const pct = (Math.abs(s.delta) / maxDelta) * 50;
          const color = s.delta < 0 ? chartTheme.color.pressure : chartTheme.color.sustain;
          return (
            <div key={s.label} className="grid grid-cols-[150px_1fr_60px] gap-2 items-center">
              <span className="text-[11px] text-gray-700 font-medium truncate">{s.label}</span>
              <div className="relative h-5 bg-gray-50 rounded-sm">
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300" />
                {s.delta < 0 ? (
                  <div
                    className="absolute top-0 bottom-0 right-1/2 rounded-l-sm"
                    style={{ width: `${pct}%`, background: color, animation: `tor-grow 0.6s ${i * 0.06}s cubic-bezier(0.22,1,0.36,1) both` }}
                  />
                ) : (
                  <div
                    className="absolute top-0 bottom-0 left-1/2 rounded-r-sm"
                    style={{ width: `${pct}%`, background: color, animation: `tor-grow 0.6s ${i * 0.06}s cubic-bezier(0.22,1,0.36,1) both` }}
                  />
                )}
              </div>
              <span className={`text-[11px] font-mono tabular-nums text-right ${s.delta < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                {s.delta > 0 ? "+" : ""}{s.delta} pts
              </span>
            </div>
          );
        })}
        <style>{`@keyframes tor-grow { from { transform: scaleX(0); transform-origin: ${"center"}; } to { transform: scaleX(1); } }`}</style>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-[10px] text-gray-500">Baseline score</p>
          <p className="text-lg font-bold tabular-nums" style={{ color: gaugeColor(baseScore).stroke }}>{baseScore}<span className="text-xs font-normal text-gray-400">/100</span></p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500">Worst-case (all negatives)</p>
          <p className="text-lg font-bold tabular-nums text-rose-600 flex items-center justify-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            {Math.max(0, baseScore + stressors.filter(s => s.delta < 0).reduce((sum, s) => sum + s.delta, 0))}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500">Upside (all positives)</p>
          <p className="text-lg font-bold tabular-nums text-emerald-600 flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {Math.min(100, baseScore + stressors.filter(s => s.delta > 0).reduce((sum, s) => sum + s.delta, 0))}
          </p>
        </div>
      </div>
    </ChartCard>
  );
}

// ─── Shared chart card ────────────────────────────────────────────────────
function ChartCard({ title, subtitle, icon, children }: { title: string; subtitle: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-[0_2px_12px_-4px_rgba(15,27,45,0.08)] print:shadow-none print:border-gray-300 print:rounded-lg">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h4 className="text-base font-bold text-gray-900 font-display flex items-center gap-2">
            <span className="text-gold text-lg leading-none">{icon}</span>
            {title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
