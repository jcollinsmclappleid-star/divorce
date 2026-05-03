import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Sliders, Lock, Sparkles, ChevronRight, Eye } from "lucide-react";
import { AnimatedNumber } from "@/components/charts/animated-number";
import { RadialGauge } from "@/components/charts/radial-gauge";
import { chartTheme, fmtK, fmtGbp, gaugeColor, densifyProjection, hashSeed } from "@/lib/chart-theme";

export interface ConsoleScenario {
  id: string;
  name: string;
  shortName: string;
  tag: string;
  tagTone: "balanced" | "sustain" | "stretch" | "complex";
  capitalA: number;
  capitalB: number;
  surplusA: number;
  surplusB: number;
  resilienceA: number;
  resilienceB: number;
  projection: number[]; // 6 entries (year 0..5) of combined or weakest party capital
  depletionYear?: number;
}

export interface SettlementConsoleProps {
  scenarios: ConsoleScenario[];
  composition: { label: string; value: number; color: string }[];
  partyAName?: string;
  partyBName?: string;
  /** When true, blurs key metrics and shows an unlock overlay */
  locked?: boolean;
  onUnlock?: () => void;
  /** Optional caption shown in the window chrome */
  chromeCaption?: string;
  /** Optional footer text override */
  footerText?: string;
  /** Hide stress test panel */
  hideStress?: boolean;
  testId?: string;
}

const TONE_CLS: Record<ConsoleScenario["tagTone"], string> = {
  balanced: "bg-cyan-400/15 text-cyan-700 border-cyan-400/30",
  sustain:  "bg-emerald-400/15 text-emerald-700 border-emerald-400/30",
  stretch:  "bg-amber-400/15 text-amber-700 border-amber-400/30",
  complex:  "bg-violet-400/15 text-violet-700 border-violet-400/30",
};

type StressKey = "rate" | "income" | "house";
const STRESS_LABELS: Record<StressKey, string> = {
  rate:   "Mortgage rate +1%",
  income: "Income −5%",
  house:  "House price −10%",
};

function applyStress(s: ConsoleScenario, k: StressKey, on: boolean): ConsoleScenario {
  if (!on) return s;
  if (k === "rate")
    return { ...s, surplusA: s.surplusA - 154, surplusB: s.surplusB - 142, resilienceA: Math.max(0, s.resilienceA - 12), resilienceB: Math.max(0, s.resilienceB - 14) };
  if (k === "income")
    return { ...s, surplusA: s.surplusA - 160, surplusB: s.surplusB - 113, resilienceA: Math.max(0, s.resilienceA - 9),  resilienceB: Math.max(0, s.resilienceB - 11) };
  return    { ...s, capitalA: Math.round(s.capitalA - 18500), capitalB: Math.round(s.capitalB - 18500), resilienceA: Math.max(0, s.resilienceA - 6), resilienceB: Math.max(0, s.resilienceB - 8) };
}

export function SettlementConsole({
  scenarios,
  composition,
  partyAName = "Party A",
  partyBName = "Party B",
  locked = false,
  onUnlock,
  chromeCaption = "Settlement Command Console",
  footerText,
  hideStress = false,
  testId = "settlement-console",
}: SettlementConsoleProps) {
  const [active, setActive] = useState(0);
  const [stress, setStress] = useState<Record<StressKey, boolean>>({ rate: false, income: false, house: false });
  const stressKey = `${stress.rate ? 1 : 0}-${stress.income ? 1 : 0}-${stress.house ? 1 : 0}`;

  const safeScenarios = scenarios.length > 0 ? scenarios : [];
  const base = safeScenarios[Math.min(active, Math.max(0, safeScenarios.length - 1))];
  const sc = useMemo(() => {
    if (!base) return null;
    let next = base;
    (Object.keys(stress) as StressKey[]).forEach(k => { next = applyStress(next, k, stress[k]); });
    return next;
  }, [base, stress]);

  if (!base || !sc) return null;

  const totalCapital = sc.capitalA + sc.capitalB;
  const compTotal = composition.reduce((s, c) => s + c.value, 0) || 1;
  const minR = Math.min(sc.resilienceA, sc.resilienceB);
  const minRColor = gaugeColor(minR);
  const bestSurplus = Math.max(sc.surplusA, sc.surplusB);
  const bestSurplusName = sc.surplusA >= sc.surplusB ? partyAName : partyBName;

  return (
    <div className="relative w-full max-w-[700px] mx-auto" data-testid={testId}>
      {/* Ambient gold glow behind the device */}

      <div className="relative rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-900/10 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            {locked ? <Eye className="w-3 h-3 text-gold/70" /> : <Sparkles className="w-3 h-3 text-gold/70" />}
            <span>{chromeCaption}{locked ? " — preview" : ""}</span>
          </div>
          <div className="w-12" />
        </div>

        {/* Scenario chips */}
        <div className="px-4 pt-4 pb-3 border-b border-slate-100">
          <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400 font-medium mb-2">Switch settlement scenario</p>
          <div className="flex gap-1.5 flex-wrap">
            {safeScenarios.map((s, i) => {
              const isActive = i === Math.min(active, safeScenarios.length - 1);
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  data-testid={`chip-scenario-${s.id}`}
                  aria-pressed={isActive}
                  className={`relative px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border ${
                    isActive
                      ? "bg-gold text-[#0B1220] border-gold "
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700"
                  }`}
                >
                  {s.shortName}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${stressKey}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: chartTheme.ease }}
          >
            {/* Hero metrics */}
            <div className="grid grid-cols-3 gap-px bg-slate-100 relative">
              <Metric
                label="Net capital · combined"
                locked={locked}
                value={
                  <AnimatedNumber
                    value={totalCapital}
                    format={(v) => fmtGbp(v)}
                    className="text-2xl font-bold text-[#1a3357] tabular-nums"
                    testId="metric-capital"
                  />
                }
                sub={`${partyAName} ${fmtK(sc.capitalA)} · ${partyBName} ${fmtK(sc.capitalB)}`}
              />
              <Metric
                label="Best monthly surplus"
                locked={locked}
                value={
                  <AnimatedNumber
                    value={bestSurplus}
                    format={(v) => `${v >= 0 ? "+" : "−"}£${Math.abs(Math.round(v)).toLocaleString()}`}
                    className={`text-2xl font-bold tabular-nums ${bestSurplus >= 0 ? "text-emerald-600" : "text-rose-600"}`}
                    testId="metric-surplus"
                  />
                }
                sub={`${bestSurplusName} ${fmtMo(bestSurplus)}`}
                accent={bestSurplus >= 0 ? "up" : "down"}
              />
              <Metric
                label="Lowest resilience score"
                locked={locked}
                value={
                  <span className="flex items-baseline gap-0.5">
                    <AnimatedNumber
                      value={minR}
                      format={(v) => `${Math.round(v)}`}
                      className="text-2xl font-bold tabular-nums"
                      testId="metric-resilience"
                    />
                    <span className="text-sm font-normal text-slate-400">/100</span>
                  </span>
                }
                sub={minRColor.label}
                accentColor={minRColor.stroke}
              />
            </div>

            {/* Two-pane lower half */}
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-px bg-slate-100">
              {/* Left: capital composition + projection sparkline */}
              <div className="bg-white p-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Capital composition</p>
                    <p className="text-[10px] font-mono text-slate-400">{fmtGbp(compTotal)}</p>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden bg-slate-50">
                    {composition.map((c, i) => {
                      const pct = (c.value / compTotal) * 100;
                      return (
                        <motion.div
                          key={c.label}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.7, ease: chartTheme.ease, delay: i * 0.06 }}
                          style={{ background: c.color }}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {composition.slice(0, 3).map((c) => (
                      <div key={c.label} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: c.color }} />
                        <div className="min-w-0">
                          <p className={`text-[10px] text-slate-700 font-medium tabular-nums ${locked ? "blur-[5px] select-none" : ""}`}>{fmtK(c.value)}</p>
                          <p className="text-[9px] text-slate-400 truncate">{c.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">5-year capital trajectory</p>
                    <p className="text-[10px] font-mono text-slate-500">
                      Yr 5 <span className={`text-emerald-600 font-semibold ${locked ? "blur-[4px] select-none" : ""}`}>{fmtK(sc.projection[sc.projection.length - 1] ?? 0)}</span>
                    </p>
                  </div>
                  <Sparkline data={densifyProjection(sc.projection, hashSeed(sc.id))} depletionYear={sc.depletionYear !== undefined ? sc.depletionYear * 12 : undefined} />
                </div>
              </div>

              {/* Right: resilience gauge + party breakdown */}
              <div className="bg-white p-4 flex flex-col">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-2">Resilience · weakest party</p>
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-slate-50 rounded-xl px-4 py-2 border border-slate-100">
                    <RadialGauge score={minR} size={150} label={minRColor.label.toUpperCase()} testId="gauge-resilience" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    { name: partyAName, score: sc.resilienceA },
                    { name: partyBName, score: sc.resilienceB },
                  ].map((p) => {
                    const c = gaugeColor(p.score);
                    return (
                      <div key={p.name} className="rounded-lg border border-slate-100 bg-slate-50/60 px-2 py-1.5 text-center">
                        <p className="text-[9px] text-slate-400 truncate">{p.name}</p>
                        <p className="text-base font-bold tabular-nums" style={{ color: c.stroke }}>
                          {p.score}<span className="text-[9px] font-normal text-slate-400">/100</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {!hideStress && (
              <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/60">
                <div className="flex items-center gap-2 mb-2">
                  <Sliders className="w-3 h-3 text-gold/70" />
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Stress test the assumptions</p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(Object.keys(STRESS_LABELS) as StressKey[]).map((k) => {
                    const on = stress[k];
                    return (
                      <button
                        key={k}
                        onClick={() => setStress((s) => ({ ...s, [k]: !s[k] }))}
                        data-testid={`stress-${k}`}
                        aria-pressed={on}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all border ${
                          on
                            ? "bg-rose-500/20 text-rose-700 border-rose-400/40"
                            : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {on && <span className="mr-1">●</span>}
                        {STRESS_LABELS[k]}
                      </button>
                    );
                  })}
                  {(stress.rate || stress.income || stress.house) && (
                    <button
                      onClick={() => setStress({ rate: false, income: false, house: false })}
                      className="px-2 py-1 rounded-md text-[10px] font-medium text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Locked overlay CTA */}
        {locked && (
          <button
            type="button"
            onClick={onUnlock}
            className="absolute left-1/2 -translate-x-1/2 top-[42%] z-20 group"
            data-testid="button-console-unlock"
          >
            <span className="flex items-center gap-2 bg-white border border-gold/50 shadow-md rounded-xl px-5 py-3 text-sm font-semibold text-[#0B1220] hover:bg-amber-50 transition-colors">
              <Lock className="w-4 h-4 text-gold" />
              Unlock the live console — £79
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        )}

        {/* Footer strip */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {locked ? <Lock className="w-3 h-3 text-gold/70" /> : <Sparkles className="w-3 h-3 text-gold/70" />}
            <span className="text-[10px] text-gold/75 font-medium">
              {footerText ?? `${safeScenarios.length} scenarios · stress tests · 5-year projection · sustainability scoring`}
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gold/60" />
        </div>
      </div>

      {/* Tag pill */}
      <div className="absolute -top-3 left-6">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur ${TONE_CLS[base.tagTone]}`}>
          {base.name} · {base.tag}
        </span>
      </div>
    </div>
  );
}

function fmtMo(v: number) { return `${v >= 0 ? "+" : "−"}£${Math.abs(Math.round(v)).toLocaleString()}/mo`; }

function Metric({ label, value, sub, accent, accentColor, locked }: { label: string; value: React.ReactNode; sub: string; accent?: "up" | "down"; accentColor?: string; locked?: boolean }) {
  return (
    <div className="bg-white px-4 py-3 relative">
      <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1">{label}</p>
      <div className={`flex items-baseline gap-1.5 ${locked ? "blur-[6px] select-none pointer-events-none" : ""}`} style={accentColor ? { color: accentColor } : undefined}>
        {value}
        {accent === "up" && <TrendingUp className="w-3 h-3 text-emerald-600/60" />}
        {accent === "down" && <TrendingDown className="w-3 h-3 text-rose-600/60" />}
      </div>
      <p className={`text-[10px] text-slate-400 mt-0.5 truncate ${locked ? "blur-[3px] select-none" : ""}`}>{sub}</p>
    </div>
  );
}

function Sparkline({ data, depletionYear }: { data: number[]; depletionYear?: number }) {
  const W = 360, H = 70, P = 4;
  const safe = data.length >= 2 ? data : [0, 0];
  const min = Math.min(...safe), max = Math.max(...safe);
  const range = Math.max(1, max - min);
  const pts = safe.map((v, i) => {
    const x = P + (i / (safe.length - 1)) * (W - P * 2);
    const y = H - P - ((v - min) / range) * (H - P * 2);
    return { x, y };
  });
  const path = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  const area = `${path} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;
  const last = pts[pts.length - 1];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[70px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="spark-grad-sc" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor={chartTheme.color.gold} stopOpacity={0.35} />
            <stop offset="100%" stopColor={chartTheme.color.gold} stopOpacity={0} />
          </linearGradient>
        </defs>
        <motion.path d={area} fill="url(#spark-grad-sc)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />
        <motion.path
          d={path}
          fill="none"
          stroke={chartTheme.color.gold}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: chartTheme.ease }}
        />
        <circle cx={last.x} cy={last.y} r={3} fill={chartTheme.color.gold} />
        {depletionYear !== undefined && depletionYear >= 0 && depletionYear < pts.length && (
          <g>
            <line x1={pts[depletionYear].x} y1={H - P} x2={pts[depletionYear].x} y2={P} stroke={chartTheme.color.pressure} strokeDasharray="2 2" strokeWidth={1} opacity={0.6} />
            <text x={pts[depletionYear].x + 4} y={P + 8} fill={chartTheme.color.pressure} fontSize={9} fontFamily='"Inter", sans-serif'>Reserves stretch</text>
          </g>
        )}
      </svg>
    </div>
  );
}

// ─── Helper: build ConsoleScenario[] from engine outputs ────────────────
export interface BuildScenarioInput {
  id: string;
  name: string;
  shortName: string;
  totalA: number;
  totalB: number;
  surplusA: number;
  surplusB: number;
  resilienceA: number;
  resilienceB: number;
  projection: { capitalA: number; capitalB: number }[];
}

export function buildConsoleScenarios(items: BuildScenarioInput[]): ConsoleScenario[] {
  return items.map((it) => {
    const minR = Math.min(it.resilienceA, it.resilienceB);
    let tone: ConsoleScenario["tagTone"] = "balanced";
    let tag = "Balanced";
    if (minR >= 75)      { tone = "sustain";  tag = "Sustainable"; }
    else if (minR >= 55) { tone = "balanced"; tag = "Balanced"; }
    else if (minR >= 35) { tone = "stretch";  tag = "Stretched"; }
    else                 { tone = "complex";  tag = "Fragile"; }

    // Build a 6-point projection of combined capital across years 0..5
    const traj: number[] = [];
    for (let y = 0; y <= 5; y++) {
      const p = it.projection[y];
      if (p) traj.push(p.capitalA + p.capitalB);
      else traj.push((it.totalA + it.totalB) * (1 + y * 0.025));
    }
    let depletionYear: number | undefined;
    for (let y = 0; y < traj.length; y++) {
      if (traj[y] <= 0 && depletionYear === undefined) depletionYear = y;
    }

    return {
      id: it.id,
      name: it.name,
      shortName: it.shortName,
      tag,
      tagTone: tone,
      capitalA: it.totalA,
      capitalB: it.totalB,
      surplusA: it.surplusA,
      surplusB: it.surplusB,
      resilienceA: it.resilienceA,
      resilienceB: it.resilienceB,
      projection: traj,
      depletionYear,
    };
  });
}
