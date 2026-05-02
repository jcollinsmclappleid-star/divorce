import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Sliders, Lock, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { AnimatedNumber } from "@/components/charts/animated-number";
import { RadialGauge } from "@/components/charts/radial-gauge";
import { chartTheme, fmtK, fmtGbp, gaugeColor, densifyProjection, hashSeed } from "@/lib/chart-theme";

interface ScenarioModel {
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
  composition: { label: string; value: number; color: string }[];
  projection: number[];
  depletionYear?: number;
}

const SCENARIOS: ScenarioModel[] = [
  {
    id: "sell",   name: "Sell & Split",   shortName: "Sell & Split",   tag: "Balanced",     tagTone: "balanced",
    capitalA: 232500, capitalB: 172500, surplusA: 870, surplusB: 447, resilienceA: 78, resilienceB: 61,
    composition: [
      { label: "Property equity", value: 185000, color: chartTheme.color.violet },
      { label: "Pension (CETV)",  value: 142000, color: chartTheme.color.cyan   },
      { label: "Cash & savings",  value:  78000, color: chartTheme.color.gold   },
    ],
    projection: [232500, 244100, 256400, 269200, 282800, 297100],
  },
  {
    id: "akeeps", name: "A Keeps Home",   shortName: "A Keeps",        tag: "Sustainable",  tagTone: "sustain",
    capitalA: 249000, capitalB: 158000, surplusA: 412, surplusB: 689, resilienceA: 71, resilienceB: 76,
    composition: [
      { label: "Property equity", value: 220000, color: chartTheme.color.violet },
      { label: "Pension (CETV)",  value: 142000, color: chartTheme.color.cyan   },
      { label: "Cash & savings",  value:  45000, color: chartTheme.color.gold   },
    ],
    projection: [249000, 256900, 265100, 273800, 282900, 292400],
  },
  {
    id: "bkeeps", name: "B Keeps Home",   shortName: "B Keeps",        tag: "Stretched",    tagTone: "stretch",
    capitalA: 195000, capitalB: 215000, surplusA: 538, surplusB: -142, resilienceA: 68, resilienceB: 38,
    composition: [
      { label: "Property equity", value: 215000, color: chartTheme.color.violet },
      { label: "Pension (CETV)",  value: 138000, color: chartTheme.color.cyan   },
      { label: "Cash & savings",  value:  57000, color: chartTheme.color.gold   },
    ],
    projection: [195000, 198200, 200900, 203100, 204700, 205800],
    depletionYear: 4,
  },
  {
    id: "deferred", name: "Deferred Sale", shortName: "Deferred",       tag: "Complex",      tagTone: "complex",
    capitalA: 218000, capitalB: 185000, surplusA: 612, surplusB: 318, resilienceA: 65, resilienceB: 58,
    composition: [
      { label: "Property equity", value: 198000, color: chartTheme.color.violet },
      { label: "Pension (CETV)",  value: 142000, color: chartTheme.color.cyan   },
      { label: "Cash & savings",  value:  63000, color: chartTheme.color.gold   },
    ],
    projection: [218000, 226400, 235100, 244000, 253200, 262800],
  },
];

const TONE_CLS: Record<ScenarioModel["tagTone"], string> = {
  balanced: "bg-cyan-400/15 text-cyan-300 border-cyan-400/30",
  sustain:  "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  stretch:  "bg-amber-400/15 text-amber-300 border-amber-400/30",
  complex:  "bg-violet-400/15 text-violet-300 border-violet-400/30",
};

type StressKey = "rate" | "income" | "house";
const STRESS_LABELS: Record<StressKey, string> = {
  rate:   "Mortgage rate +1%",
  income: "Income −5%",
  house:  "House price −10%",
};

function applyStress(s: ScenarioModel, k: StressKey, on: boolean): ScenarioModel {
  if (!on) return s;
  if (k === "rate")   return { ...s, surplusA: s.surplusA - 154, surplusB: s.surplusB - 142, resilienceA: Math.max(0, s.resilienceA - 12), resilienceB: Math.max(0, s.resilienceB - 14) };
  if (k === "income") return { ...s, surplusA: s.surplusA - 160, surplusB: s.surplusB - 113, resilienceA: Math.max(0, s.resilienceA - 9),  resilienceB: Math.max(0, s.resilienceB - 11) };
  return                     { ...s, capitalA: Math.round(s.capitalA - 18500), capitalB: Math.round(s.capitalB - 18500), resilienceA: Math.max(0, s.resilienceA - 6), resilienceB: Math.max(0, s.resilienceB - 8) };
}

export function LandingCommandConsole() {
  const [active, setActive] = useState(0);
  const [stress, setStress] = useState<Record<StressKey, boolean>>({ rate: false, income: false, house: false });

  const base = SCENARIOS[active];
  const sc = useMemo(() => {
    let next = base;
    (Object.keys(stress) as StressKey[]).forEach(k => { next = applyStress(next, k, stress[k]); });
    return next;
  }, [base, stress]);

  const totalCapital = sc.capitalA + sc.capitalB;
  const compTotal = sc.composition.reduce((s, c) => s + c.value, 0);
  const minR = Math.min(sc.resilienceA, sc.resilienceB);
  const minRColor = gaugeColor(minR);

  return (
    <div className="relative w-full max-w-[640px] mx-auto isolate" data-testid="command-console">
      {/* Ambient gold glow behind the device — clipped to prevent overflow */}
      <div className="absolute -inset-6 rounded-[28px] bg-gold/[0.06] blur-2xl pointer-events-none -z-10" />

      {/* Device frame */}
      <div className="relative rounded-2xl bg-[#0B1220] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
            <Sparkles className="w-3 h-3 text-gold/70" />
            <span>Settlement Command Console — illustrative model</span>
          </div>
          <div className="w-12" />
        </div>

        {/* Scenario chips with arrow nav */}
        <div className="px-4 pt-4 pb-3 border-b border-white/5">
          <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/35 font-medium">Switch settlement scenario</p>
            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-gold bg-gold/15 border border-gold/30 px-2 py-0.5 rounded-full">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-gold"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              Live · click to try
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActive((i) => (i - 1 + SCENARIOS.length) % SCENARIOS.length)}
              data-testid="console-prev"
              aria-label="Previous scenario"
              className="shrink-0 w-7 h-7 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.10] hover:border-gold/40 flex items-center justify-center text-white/70 hover:text-gold transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="flex gap-1.5 flex-wrap flex-1 justify-center">
              {SCENARIOS.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    data-testid={`chip-scenario-${s.id}`}
                    aria-pressed={isActive}
                    className={`relative px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border ${
                      isActive
                        ? "bg-gold text-[#0B1220] border-gold shadow-[0_0_0_4px_rgba(201,168,76,0.18)]"
                        : "bg-white/[0.04] text-white/60 border-white/10 hover:bg-white/[0.08] hover:text-white/85"
                    }`}
                  >
                    {s.shortName}
                    {isActive && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold animate-pulse" />}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setActive((i) => (i + 1) % SCENARIOS.length)}
              data-testid="console-next"
              aria-label="Next scenario"
              className="shrink-0 w-7 h-7 rounded-full border border-gold/40 bg-gold/10 hover:bg-gold/25 flex items-center justify-center text-gold transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to ${s.shortName}`}
                data-testid={`console-dot-${s.id}`}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active + JSON.stringify(stress)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: chartTheme.ease }}
          >
            {/* Hero metrics */}
            <div className="grid grid-cols-3 gap-px bg-white/5">
              <Metric
                label="Net capital · combined"
                value={
                  <AnimatedNumber
                    value={totalCapital}
                    format={(v) => fmtGbp(v)}
                    className="text-2xl font-bold text-white tabular-nums"
                    testId="metric-capital"
                  />
                }
                sub={`Party A ${fmtK(sc.capitalA)} · Party B ${fmtK(sc.capitalB)}`}
              />
              <Metric
                label="Best monthly surplus"
                value={
                  <AnimatedNumber
                    value={Math.max(sc.surplusA, sc.surplusB)}
                    format={(v) => `${v >= 0 ? "+" : "−"}£${Math.abs(Math.round(v)).toLocaleString()}`}
                    className={`text-2xl font-bold tabular-nums ${Math.max(sc.surplusA, sc.surplusB) >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                    testId="metric-surplus"
                  />
                }
                sub={sc.surplusA >= sc.surplusB ? `Party A ${fmtMo(sc.surplusA)}` : `Party B ${fmtMo(sc.surplusB)}`}
                accent={Math.max(sc.surplusA, sc.surplusB) >= 0 ? "up" : "down"}
              />
              <Metric
                label="Lowest resilience score"
                value={
                  <span className="flex items-baseline gap-0.5">
                    <AnimatedNumber
                      value={minR}
                      format={(v) => `${Math.round(v)}`}
                      className="text-2xl font-bold tabular-nums"
                      testId="metric-resilience"
                    />
                    <span className="text-sm font-normal text-white/40">/100</span>
                  </span>
                }
                sub={minRColor.label}
                accentColor={minRColor.stroke}
              />
            </div>

            {/* Two-pane lower half */}
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-px bg-white/5">
              {/* Left: capital composition + projection sparkline */}
              <div className="bg-[#0B1220] p-4 space-y-4">
                {/* Composition bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Capital composition</p>
                    <p className="text-[10px] font-mono text-white/40">{fmtGbp(compTotal)}</p>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden bg-white/[0.04]">
                    {sc.composition.map((c, i) => {
                      const pct = (c.value / compTotal) * 100;
                      return (
                        <motion.div
                          key={c.label}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.7, ease: chartTheme.ease, delay: i * 0.06 }}
                          style={{ background: c.color }}
                          className="relative group"
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/15" />
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {sc.composition.map((c) => (
                      <div key={c.label} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: c.color }} />
                        <div className="min-w-0">
                          <p className="text-[10px] text-white/85 font-medium tabular-nums">{fmtK(c.value)}</p>
                          <p className="text-[9px] text-white/40 truncate">{c.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projection sparkline */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">5-year capital trajectory</p>
                    <p className="text-[10px] font-mono text-white/60">
                      Yr 5 <span className="text-emerald-400 font-semibold">{fmtK(sc.projection[5])}</span>
                    </p>
                  </div>
                  <Sparkline data={densifyProjection(sc.projection, hashSeed(sc.id))} depletionYear={sc.depletionYear !== undefined ? sc.depletionYear * 12 : undefined} />
                </div>
              </div>

              {/* Right: resilience gauge + party breakdown */}
              <div className="bg-[#0B1220] p-4 flex flex-col">
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium mb-2">Resilience · weakest party</p>
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-white/[0.03] rounded-xl px-4 py-2 border border-white/5">
                    <RadialGauge score={minR} size={150} label={minRColor.label.toUpperCase()} testId="gauge-resilience" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    { name: "Party A", score: sc.resilienceA },
                    { name: "Party B", score: sc.resilienceB },
                  ].map((p) => {
                    const c = gaugeColor(p.score);
                    return (
                      <div key={p.name} className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5 text-center">
                        <p className="text-[9px] text-white/40">{p.name}</p>
                        <p className="text-base font-bold tabular-nums" style={{ color: c.stroke }}>
                          {p.score}<span className="text-[9px] font-normal text-white/40">/100</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stress sliders */}
            <div className="px-4 py-3 border-t border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-2">
                <Sliders className="w-3 h-3 text-gold/70" />
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Stress test the assumptions</p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {(Object.keys(STRESS_LABELS) as StressKey[]).map((k) => {
                  const on = stress[k];
                  return (
                    <button
                      key={k}
                      onClick={() => setStress((s) => ({ ...s, [k]: !s[k] }))}
                      data-testid={`stress-${k}`}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all border ${
                        on
                          ? "bg-rose-500/20 text-rose-300 border-rose-400/40 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.2)]"
                          : "bg-white/[0.04] text-white/55 border-white/10 hover:bg-white/[0.08]"
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
                    className="px-2 py-1 rounded-md text-[10px] font-medium text-white/40 hover:text-white/70 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Locked footer */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-gold/[0.06] to-gold/[0.02] border-t border-gold/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-gold/70" />
            <span className="text-[10px] text-gold/75 font-medium">
              Full report · {SCENARIOS.length} scenarios · stress tests · PDF · sustainability scoring
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gold/60" />
        </div>
      </div>

      {/* Tag pill — floats above device, shows current scenario tag */}
      <div className="absolute -top-3 left-6">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur ${TONE_CLS[base.tagTone]}`}>
          {base.name} · {base.tag}
        </span>
      </div>
    </div>
  );
}

function fmtMo(v: number) { return `${v >= 0 ? "+" : "−"}£${Math.abs(Math.round(v)).toLocaleString()}/mo`; }

function Metric({ label, value, sub, accent, accentColor }: { label: string; value: React.ReactNode; sub: string; accent?: "up" | "down"; accentColor?: string }) {
  return (
    <div className="bg-[#0B1220] px-4 py-3 relative">
      <p className="text-[9px] uppercase tracking-wider text-white/35 font-medium mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5" style={accentColor ? { color: accentColor } : undefined}>
        {value}
        {accent === "up" && <TrendingUp className="w-3 h-3 text-emerald-400/60" />}
        {accent === "down" && <TrendingDown className="w-3 h-3 text-rose-400/60" />}
      </div>
      <p className="text-[10px] text-white/40 mt-0.5 truncate">{sub}</p>
    </div>
  );
}

function Sparkline({ data, depletionYear }: { data: number[]; depletionYear?: number }) {
  const W = 360, H = 70, P = 4;
  const min = Math.min(...data), max = Math.max(...data);
  const range = Math.max(1, max - min);
  const pts = data.map((v, i) => {
    const x = P + (i / (data.length - 1)) * (W - P * 2);
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
          <linearGradient id="spark-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor={chartTheme.color.gold} stopOpacity={0.35} />
            <stop offset="100%" stopColor={chartTheme.color.gold} stopOpacity={0} />
          </linearGradient>
        </defs>
        <motion.path d={area} fill="url(#spark-grad)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />
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
        <circle cx={last.x} cy={last.y} r={6} fill={chartTheme.color.gold} opacity={0.25}>
          <animate attributeName="r" values="3;9;3" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
        </circle>
        {depletionYear !== undefined && (
          <g>
            <line
              x1={pts[depletionYear].x} y1={H - P}
              x2={pts[depletionYear].x} y2={P}
              stroke={chartTheme.color.pressure} strokeDasharray="2 2" strokeWidth={1} opacity={0.6}
            />
            <text x={pts[depletionYear].x + 4} y={P + 8} fill={chartTheme.color.pressure} fontSize={9} fontFamily='"Inter", sans-serif'>
              Reserves stretch
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
