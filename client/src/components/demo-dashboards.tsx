import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ArrowRightLeft, Sliders, Activity,
  TrendingUp, TrendingDown, Sparkles, Heart, Home, Wallet,
} from "lucide-react";
import { RadialGauge } from "@/components/charts/radial-gauge";
import { chartTheme, fmtK, gaugeColor, densifyProjection, hashSeed } from "@/lib/chart-theme";

// ─── Shared sample data ────────────────────────────────────────────────
const POOL = 179_500;
const LIQUID = 108_000;
const PROPERTY_EQUITY = 71_500;
const PENSION = 60_000;
const NET_A = 6_518;
const NET_B = 3_690;
const EXP_A = 3_600;
const EXP_B = 3_450;

const SAMPLE_SCENARIOS = [
  { id: "S1", name: "Sell & Split",  short: "Sell & Split", capA: 89_750, capB: 89_750, surA: 2656, surB:  652, criA: 78, criB: 63, projection: [179_500, 188_900, 198_700, 208_200, 217_400, 226_800] },
  { id: "S2", name: "A Keeps Home",  short: "A Keeps",      capA: 18_250, capB: 89_750, surA: 1026, surB:  652, criA: 52, criB: 71, projection: [108_000, 119_300, 131_800, 144_100, 156_700, 169_300] },
  { id: "S3", name: "B Keeps Home",  short: "B Keeps",      capA: 89_750, capB: 18_250, surA: 2656, surB: -978, criA: 82, criB: 22, projection: [108_000, 102_000,  85_500,  69_400,  53_200,  37_500] },
  { id: "S4", name: "Deferred Sale", short: "Deferred",     capA: 54_000, capB: 54_000, surA: 2666, surB:  662, criA: 71, criB: 54, projection: [108_000, 117_400, 127_500, 138_000, 149_100, 160_700] },
];

const SAMPLE_COMPOSITION = [
  { label: "Property equity", value: PROPERTY_EQUITY, color: "#A78BFA" },
  { label: "Pension (CETV)",  value: PENSION,         color: "#22D3EE" },
  { label: "Cash & savings",  value: LIQUID,          color: "#C9A84C" },
];

// ─── Tiny shared primitives ────────────────────────────────────────────
function MiniSparkline({ data, color = chartTheme.color.gold, height = 36, gradId = "mini-spark" }: { data: number[]; color?: string; height?: number; gradId?: string }) {
  const W = 220, H = height, P = 3;
  const min = Math.min(...data), max = Math.max(...data);
  const range = Math.max(1, max - min);
  const pts = data.map((v, i) => ({
    x: P + (i / (data.length - 1)) * (W - P * 2),
    y: H - P - ((v - min) / range) * (H - P * 2),
  }));
  const path = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  const area = `${path} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity={0.32} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={path} fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChromeWindow({ title, children, footer }: { title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[24px] bg-gold/[0.06] blur-2xl pointer-events-none" />
      <div className="relative rounded-2xl bg-[#0B1220] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" /><div className="w-2.5 h-2.5 rounded-full bg-white/20" /><div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
            <Activity className="w-3 h-3 text-gold/70" />
            <span>{title}</span>
          </div>
          <div className="w-12" />
        </div>
        {children}
        {footer ?? (
          <div className="px-4 py-2.5 bg-gradient-to-r from-gold/[0.08] to-gold/[0.02] border-t border-gold/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-gold/70" />
              <span className="text-[10px] text-gold/80 font-medium">Sample dashboard · the live version uses your figures</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gold/60" />
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveHint({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-gold bg-gold/15 border border-gold/30 px-2 py-0.5 rounded-full">
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-gold"
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {text}
    </span>
  );
}

// ─── Lab 1: Settlement Command Console ─────────────────────────────────
function SettlementLab() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const sc = SAMPLE_SCENARIOS[active];
  const totalCap = sc.capA + sc.capB;
  const compTotal = SAMPLE_COMPOSITION.reduce((s, c) => s + c.value, 0);
  const minR = Math.min(sc.criA, sc.criB);
  const minRColor = gaugeColor(minR);
  const bestSurplus = Math.max(sc.surA, sc.surB);
  const denseTraj = densifyProjection(sc.projection, hashSeed(sc.id));

  return (
    <ChromeWindow title="Lab 1 · Settlement Command Console">
      <div className="px-4 pt-3 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/35 font-medium">Switch settlement scenario</p>
          <InteractiveHint text="Live · click any chip" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {SAMPLE_SCENARIOS.map((s, i) => {
            const isActive = i === active;
            const isHinted = !interacted && i === 1;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => { setActive(i); setInteracted(true); }}
                aria-pressed={isActive}
                data-testid={`lab1-chip-${s.id}`}
                className={`relative px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border ${
                  isActive
                    ? "bg-gold text-[#0B1220] border-gold shadow-[0_0_0_3px_rgba(201,168,76,0.18)]"
                    : isHinted
                    ? "bg-white/[0.08] text-white/85 border-gold/40 shadow-[0_0_0_3px_rgba(201,168,76,0.10)] animate-pulse"
                    : "bg-white/[0.04] text-white/60 border-white/10 hover:bg-white/[0.08]"
                }`}
              >
                {s.short}
                {isHinted && <motion.span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />}
              </button>
            );
          })}
        </div>
        {!interacted && (
          <p className="text-[10px] text-gold/70 mt-2 italic flex items-center gap-1">
            <ArrowRight className="w-2.5 h-2.5" /> Tap a different scenario to see how every figure changes
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-px bg-white/5">
        <div className="bg-[#0B1220] px-4 py-3">
          <p className="text-[9px] uppercase tracking-wider text-white/35 font-medium mb-1">Net capital · combined</p>
          <p className="text-2xl font-bold text-white tabular-nums">£{totalCap.toLocaleString()}</p>
          <p className="text-[10px] text-white/40 mt-0.5">A {fmtK(sc.capA)} · B {fmtK(sc.capB)}</p>
        </div>
        <div className="bg-[#0B1220] px-4 py-3">
          <p className="text-[9px] uppercase tracking-wider text-white/35 font-medium mb-1">Best monthly surplus</p>
          <p className={`text-2xl font-bold tabular-nums flex items-center gap-1 ${bestSurplus >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {bestSurplus >= 0 ? "+" : "−"}£{Math.abs(bestSurplus).toLocaleString()}
            {bestSurplus >= 0 ? <TrendingUp className="w-3 h-3 text-emerald-400/60" /> : <TrendingDown className="w-3 h-3 text-rose-400/60" />}
          </p>
          <p className="text-[10px] text-white/40 mt-0.5">{sc.surA >= sc.surB ? "Party A" : "Party B"} strongest</p>
        </div>
        <div className="bg-[#0B1220] px-4 py-3">
          <p className="text-[9px] uppercase tracking-wider text-white/35 font-medium mb-1">Lowest resilience</p>
          <p className="text-2xl font-bold tabular-nums" style={{ color: minRColor.stroke }}>
            {minR}<span className="text-sm font-normal text-white/40">/100</span>
          </p>
          <p className="text-[10px] text-white/40 mt-0.5">{minRColor.label}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-px bg-white/5">
        <div className="bg-[#0B1220] p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Capital composition</p>
              <p className="text-[10px] font-mono text-white/40">£{compTotal.toLocaleString()}</p>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-white/[0.04]">
              {SAMPLE_COMPOSITION.map((c, i) => (
                <motion.div key={c.label} initial={{ width: 0 }} animate={{ width: `${(c.value / compTotal) * 100}%` }} transition={{ duration: 0.7, ease: chartTheme.ease, delay: i * 0.08 }} style={{ background: c.color }} />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {SAMPLE_COMPOSITION.map((c) => (
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

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">5-year capital trajectory</p>
              <p className="text-[10px] font-mono text-white/60">Yr 5 <span className="text-emerald-400 font-semibold">{fmtK(sc.projection[5])}</span></p>
            </div>
            <MiniSparkline data={denseTraj} height={70} gradId={`lab1-spark-${sc.id}`} />
          </div>
        </div>

        <div className="bg-[#0B1220] p-4 flex flex-col">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium mb-2">Resilience · weakest party</p>
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white/[0.03] rounded-xl px-4 py-2 border border-white/5">
              <RadialGauge score={minR} size={140} label={minRColor.label.toUpperCase()} testId={`lab1-gauge-${sc.id}`} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[{ name: "Party A", score: sc.criA }, { name: "Party B", score: sc.criB }].map((p) => {
              const g = gaugeColor(p.score);
              return (
                <div key={p.name} className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5 text-center">
                  <p className="text-[9px] text-white/40">{p.name}</p>
                  <p className="text-base font-bold tabular-nums" style={{ color: g.stroke }}>
                    {p.score}<span className="text-[9px] font-normal text-white/40">/100</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ChromeWindow>
  );
}

// ─── Lab 2: Asset Split Ratio Lab ──────────────────────────────────────
function SplitRatioLab() {
  const [share, setShare] = useState(50); // % to A
  const [interacted, setInteracted] = useState(false);

  const capA = Math.round(POOL * (share / 100));
  const capB = POOL - capA;
  // Simple CRI model: 100 at £100k+, scaled down linearly
  const cri = (cap: number) => Math.max(0, Math.min(100, Math.round(20 + (cap / 130_000) * 80)));
  const criA = cri(capA);
  const criB = cri(capB);
  const colA = gaugeColor(criA);
  const colB = gaugeColor(criB);

  return (
    <ChromeWindow title="Lab 2 · Asset Split Ratio">
      <div className="px-4 pt-3 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/35 font-medium">Drag to change the split</p>
          <InteractiveHint text="Live · drag the slider" />
        </div>
        <p className="text-[11px] text-white/55">A starting point of 50/50 is common — but circumstances often push it.</p>
      </div>

      <div className="p-5 space-y-5 bg-[#0B1220]">
        {/* Share bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-blue-300">Party A · {share}%</span>
            <span className="text-[10px] text-white/40 font-mono">£{POOL.toLocaleString()} pool</span>
            <span className="text-[11px] font-semibold text-emerald-300">{100 - share}% · Party B</span>
          </div>
          <div className="flex h-7 rounded-full overflow-hidden bg-white/[0.04] border border-white/10">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-end pr-2"
              animate={{ width: `${share}%` }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <span className="text-[10px] font-bold text-white tabular-nums">£{capA.toLocaleString()}</span>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center pl-2"
              animate={{ width: `${100 - share}%` }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <span className="text-[10px] font-bold text-white tabular-nums">£{capB.toLocaleString()}</span>
            </motion.div>
          </div>

          <div className="relative mt-4">
            <label htmlFor="lab2-slider" className="sr-only">Party A share of the asset pool, percentage</label>
            <input
              id="lab2-slider"
              type="range"
              min={0}
              max={100}
              step={1}
              value={share}
              onChange={(e) => { setShare(Number(e.target.value)); setInteracted(true); }}
              data-testid="lab2-slider"
              aria-label={`Party A share: ${share} percent. Party A receives £${capA.toLocaleString()}, Party B receives £${capB.toLocaleString()}.`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={share}
              aria-valuetext={`${share}% to Party A`}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-gold"
              style={{ background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${share}%, #10b981 ${share}%, #10b981 100%)` }}
            />
            <div className="flex justify-between mt-1.5 text-[9px] text-white/35 font-mono">
              <span>0% A</span><span>50/50</span><span>100% A</span>
            </div>
          </div>

          {/* Preset buttons */}
          <div className="flex gap-1.5 mt-3 justify-center flex-wrap">
            {[40, 50, 55, 60, 65].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => { setShare(p); setInteracted(true); }}
                data-testid={`lab2-preset-${p}`}
                className={`px-2 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                  share === p
                    ? "bg-gold text-[#0B1220] border-gold"
                    : "bg-white/[0.04] text-white/55 border-white/10 hover:bg-white/[0.08]"
                }`}
              >
                {p}/{100 - p}
              </button>
            ))}
          </div>
        </div>

        {/* Twin gauges + commentary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: "Party A", cap: capA, score: criA, c: colA, accent: "text-blue-300" },
            { name: "Party B", cap: capB, score: criB, c: colB, accent: "text-emerald-300" },
          ].map((p) => (
            <div key={p.name} className="bg-white/[0.03] rounded-xl border border-white/10 p-4 flex items-center gap-4">
              <RadialGauge score={p.score} size={90} label={p.c.label.toUpperCase()} testId={`lab2-gauge-${p.name}`} />
              <div className="min-w-0 flex-1">
                <p className={`text-[10px] uppercase tracking-wider ${p.accent} font-semibold`}>{p.name}</p>
                <p className="text-xl font-bold text-white tabular-nums">£{p.cap.toLocaleString()}</p>
                <p className="text-[10px] text-white/45 mt-0.5">{p.c.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Commentary */}
        <div className="bg-gradient-to-br from-gold/[0.08] to-transparent border border-gold/20 rounded-xl px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-gold/80 font-semibold mb-1">What this means</p>
          <p className="text-[12px] text-white/75 leading-relaxed">
            {share === 50
              ? "An equal 50/50 split — both parties leave with the same liquid capital. This is the default starting point in most negotiations."
              : share > 50
              ? `Party A leaves with £${(capA - capB).toLocaleString()} more than Party B. ${criB < 40 ? "Party B's resilience drops into the red zone — likely to need top-up support or a different settlement." : "Both parties remain above the resilience floor."}`
              : `Party B leaves with £${(capB - capA).toLocaleString()} more than Party A. ${criA < 40 ? "Party A's resilience drops into the red zone — likely to need top-up support or a different settlement." : "Both parties remain above the resilience floor."}`}
          </p>
        </div>
      </div>
    </ChromeWindow>
  );
}

// ─── Lab 3: Stress Test Lab ────────────────────────────────────────────
const STRESS_DEFS = [
  { key: "rate"   as const, label: "Mortgage rate +1%", icon: TrendingUp,    surA: -154, surB: -142, criA: -12, criB: -14 },
  { key: "income" as const, label: "Income −5%",        icon: TrendingDown,  surA: -160, surB: -113, criA:  -9, criB: -11 },
  { key: "house"  as const, label: "House price −10%",  icon: Home,          surA:    0, surB:    0, criA:  -6, criB:  -8 },
];

function StressLab() {
  const [stress, setStress] = useState({ rate: false, income: false, house: false });
  const [interacted, setInteracted] = useState(false);

  // Baseline = Sell & Split
  const base = { surA: 2656, surB: 652, criA: 78, criB: 63 };
  let surA = base.surA, surB = base.surB, criA = base.criA, criB = base.criB;
  STRESS_DEFS.forEach(d => {
    if (stress[d.key]) { surA += d.surA; surB += d.surB; criA += d.criA; criB += d.criB; }
  });
  criA = Math.max(0, criA); criB = Math.max(0, criB);
  const activeCount = (stress.rate ? 1 : 0) + (stress.income ? 1 : 0) + (stress.house ? 1 : 0);
  const minR = Math.min(criA, criB);

  return (
    <ChromeWindow title="Lab 3 · Stress Test">
      <div className="px-4 pt-3 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/35 font-medium">Toggle real-world shocks</p>
          <InteractiveHint text="Live · toggle any shock" />
        </div>
        <p className="text-[11px] text-white/55">See who fails first when the unexpected hits.</p>
      </div>

      <div className="p-5 space-y-4 bg-[#0B1220]">
        <div className="flex flex-wrap gap-2">
          {STRESS_DEFS.map((d) => {
            const on = stress[d.key];
            const Icon = d.icon;
            const isHinted = !interacted && d.key === "rate";
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => { setStress(s => ({ ...s, [d.key]: !s[d.key] })); setInteracted(true); }}
                data-testid={`lab3-stress-${d.key}`}
                aria-pressed={on}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                  on
                    ? "bg-rose-500/20 text-rose-200 border-rose-400/40 shadow-[0_0_0_3px_rgba(244,63,94,0.10)]"
                    : isHinted
                    ? "bg-white/[0.08] text-white/85 border-gold/40 animate-pulse"
                    : "bg-white/[0.04] text-white/60 border-white/10 hover:bg-white/[0.08]"
                }`}
              >
                <Icon className="w-3 h-3" />
                {d.label}
                {on && <span className="ml-0.5 text-rose-300">●</span>}
              </button>
            );
          })}
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => { setStress({ rate: false, income: false, house: false }); }}
              className="text-[10px] text-white/40 hover:text-white/70 px-2 underline"
              data-testid="lab3-reset"
            >
              Reset
            </button>
          )}
        </div>

        {/* Big gauge */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-3 items-center">
          <div className="bg-white/[0.03] rounded-xl border border-white/10 p-3 flex flex-col items-center">
            <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-1">Weakest party resilience</p>
            <RadialGauge score={minR} size={140} label={gaugeColor(minR).label.toUpperCase()} testId="lab3-gauge" />
            <p className="text-[10px] text-white/45 mt-1">
              {activeCount === 0 ? "Baseline · no shocks applied" : `${activeCount} shock${activeCount > 1 ? "s" : ""} applied`}
            </p>
          </div>

          {/* Before / After table */}
          <div className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 text-[10px] uppercase tracking-wider text-white/40 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
              <span>Metric</span>
              <span className="text-right">Baseline</span>
              <span className="text-right">After shocks</span>
            </div>
            {[
              { label: "Surplus · Party A", base: base.surA, now: surA, isCash: true },
              { label: "Surplus · Party B", base: base.surB, now: surB, isCash: true },
              { label: "Resilience · A",    base: base.criA, now: criA, isCash: false },
              { label: "Resilience · B",    base: base.criB, now: criB, isCash: false },
            ].map((row) => {
              const delta = row.now - row.base;
              const worse = delta < 0;
              return (
                <div key={row.label} className="grid grid-cols-3 px-3 py-1.5 text-[11px] border-b border-white/5 last:border-0">
                  <span className="text-white/65">{row.label}</span>
                  <span className="text-right tabular-nums text-white/45">
                    {row.isCash ? `${row.base >= 0 ? "+" : "−"}£${Math.abs(row.base).toLocaleString()}` : `${row.base}/100`}
                  </span>
                  <span className={`text-right tabular-nums font-semibold flex items-center justify-end gap-1 ${worse ? "text-rose-300" : "text-white/85"}`}>
                    {row.isCash ? `${row.now >= 0 ? "+" : "−"}£${Math.abs(row.now).toLocaleString()}` : `${row.now}/100`}
                    {delta !== 0 && (
                      <span className="text-[9px] opacity-70">
                        ({delta > 0 ? "+" : ""}{row.isCash ? `£${delta}` : delta})
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-500/[0.06] to-transparent border border-rose-400/20 rounded-xl px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-rose-300/80 font-semibold mb-1">What this means</p>
          <p className="text-[12px] text-white/75 leading-relaxed">
            {activeCount === 0
              ? "No shocks applied. Both parties are above the resilience threshold — but real life rarely stays still."
              : criB < 40 || criA < 40
              ? `Under ${activeCount} stress${activeCount > 1 ? "es" : ""}, ${criA < criB ? "Party A" : "Party B"} drops below the resilience floor. A settlement that survives shocks needs a buffer.`
              : `Both parties stay above the resilience floor under ${activeCount} stress${activeCount > 1 ? "es" : ""} — but margins are tighter.`}
          </p>
        </div>
      </div>
    </ChromeWindow>
  );
}

// ─── Lab 4: Spousal Maintenance Lab ────────────────────────────────────
function MaintenanceLab() {
  const [amount, setAmount] = useState(0);
  const [interacted, setInteracted] = useState(false);

  // Sell & Split baseline. A → B transfer reduces A surplus, increases B surplus.
  const baseSurA = NET_A - EXP_A - 412; // CMS
  const baseSurB = NET_B - EXP_B + 412;
  const surA = baseSurA - amount;
  const surB = baseSurB + amount;
  const aPasses = surA >= 0;
  const bPasses = surB >= 0;

  // Y axis range for visual bars
  const maxAbs = Math.max(Math.abs(baseSurA), Math.abs(baseSurB), 3000);
  const pctA = Math.min(100, (Math.abs(surA) / maxAbs) * 100);
  const pctB = Math.min(100, (Math.abs(surB) / maxAbs) * 100);

  return (
    <ChromeWindow title="Lab 4 · Spousal Maintenance Bridge">
      <div className="px-4 pt-3 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/35 font-medium">Adjust the monthly transfer</p>
          <InteractiveHint text="Live · drag the dial" />
        </div>
        <p className="text-[11px] text-white/55">Spousal maintenance is an income transfer — each £1 paid by A is £1 received by B.</p>
      </div>

      <div className="p-5 space-y-4 bg-[#0B1220]">
        <div className="bg-white/[0.03] rounded-xl border border-white/10 p-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Wallet className="w-4 h-4 text-blue-300" />
            <ArrowRightLeft className="w-4 h-4 text-gold animate-pulse" />
            <Heart className="w-4 h-4 text-emerald-300" />
            <p className="text-2xl font-bold text-white tabular-nums">£{amount.toLocaleString()}<span className="text-sm font-normal text-white/45">/mo</span></p>
          </div>
          <label htmlFor="lab4-slider" className="sr-only">Spousal maintenance amount, pounds per month</label>
          <input
            id="lab4-slider"
            type="range"
            min={0}
            max={2000}
            step={50}
            value={amount}
            onChange={(e) => { setAmount(Number(e.target.value)); setInteracted(true); }}
            data-testid="lab4-slider"
            aria-label={`Spousal maintenance: £${amount} per month. Party A surplus £${Math.round(surA)}, Party B surplus £${Math.round(surB)}.`}
            aria-valuemin={0}
            aria-valuemax={2000}
            aria-valuenow={amount}
            aria-valuetext={`£${amount} per month`}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-gold"
            style={{ background: `linear-gradient(to right, #C9A84C 0%, #C9A84C ${(amount / 2000) * 100}%, rgba(255,255,255,0.1) ${(amount / 2000) * 100}%, rgba(255,255,255,0.1) 100%)` }}
          />
          <div className="flex justify-between mt-1.5 text-[9px] text-white/35 font-mono">
            <span>£0</span><span>£500</span><span>£1,000</span><span>£1,500</span><span>£2,000</span>
          </div>
          <div className="flex gap-1.5 mt-3 justify-center flex-wrap">
            {[0, 500, 1000, 1500, 2000].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => { setAmount(v); setInteracted(true); }}
                data-testid={`lab4-preset-${v}`}
                className={`px-2 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                  amount === v
                    ? "bg-gold text-[#0B1220] border-gold"
                    : "bg-white/[0.04] text-white/55 border-white/10 hover:bg-white/[0.08]"
                }`}
              >
                £{v}
              </button>
            ))}
          </div>
        </div>

        {/* Surplus bars */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Party A · pays", val: surA, base: baseSurA, color: "blue", pct: pctA, passes: aPasses },
            { name: "Party B · receives", val: surB, base: baseSurB, color: "emerald", pct: pctB, passes: bPasses },
          ].map((p) => (
            <div key={p.name} className="bg-white/[0.03] rounded-xl border border-white/10 p-3">
              <div className="flex items-center justify-between mb-1">
                <p className={`text-[10px] uppercase tracking-wider font-semibold ${p.color === "blue" ? "text-blue-300" : "text-emerald-300"}`}>{p.name}</p>
                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${p.passes ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
                  {p.passes ? "Sustains" : "Deficit"}
                </span>
              </div>
              <p className={`text-2xl font-bold tabular-nums ${p.val >= 0 ? "text-white" : "text-rose-400"}`}>
                {p.val >= 0 ? "+" : "−"}£{Math.abs(Math.round(p.val)).toLocaleString()}
                <span className="text-[10px] font-normal text-white/40">/mo</span>
              </p>
              <div className="mt-2 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  className={`h-full ${p.val >= 0 ? (p.color === "blue" ? "bg-blue-400" : "bg-emerald-400") : "bg-rose-500"}`}
                  animate={{ width: `${p.pct}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>
              <p className="text-[10px] text-white/40 mt-1">
                Baseline {p.base >= 0 ? "+" : "−"}£{Math.abs(p.base).toLocaleString()} → {p.val >= p.base ? "↑" : "↓"} £{Math.abs(p.val - p.base).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-emerald-500/[0.05] to-transparent border border-emerald-400/20 rounded-xl px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-emerald-300/80 font-semibold mb-1">What this means</p>
          <p className="text-[12px] text-white/75 leading-relaxed">
            {amount === 0
              ? "No spousal maintenance applied. Party B's surplus relies solely on their own income and any child maintenance received."
              : aPasses && bPasses
              ? `A £${amount.toLocaleString()}/mo transfer keeps both parties in surplus — Party A retains buffer, Party B gains cushion.`
              : !aPasses
              ? `A £${amount.toLocaleString()}/mo transfer pushes Party A into deficit. The court would weigh affordability against need.`
              : `Even with £${amount.toLocaleString()}/mo, Party B still falls short. A larger transfer or different capital settlement may be needed.`}
          </p>
        </div>
      </div>
    </ChromeWindow>
  );
}

// ─── Carousel container ────────────────────────────────────────────────
const LABS = [
  { id: "settlement",  title: "Settlement Console",     subtitle: "Compare 4 settlement scenarios",       Comp: SettlementLab },
  { id: "split",       title: "Asset Split Ratio",      subtitle: "Drag to change the 50/50 starting point", Comp: SplitRatioLab },
  { id: "stress",      title: "Stress Test",            subtitle: "Toggle real-world shocks",              Comp: StressLab },
  { id: "maintenance", title: "Maintenance Bridge",     subtitle: "Move money between parties",            Comp: MaintenanceLab },
];

export function DemoCarousel() {
  const [idx, setIdx] = useState(0);
  const Lab = LABS[idx].Comp;
  const next = () => setIdx((i) => (i + 1) % LABS.length);
  const prev = () => setIdx((i) => (i - 1 + LABS.length) % LABS.length);

  return (
    <div className="space-y-3" data-testid="demo-carousel">
      {/* Tab strip */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Try the dashboards</span>
            <span className="text-[10px] text-gray-400 ml-1">{idx + 1} of {LABS.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              data-testid="carousel-prev"
              aria-label="Previous lab"
              className="w-7 h-7 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={next}
              data-testid="carousel-next"
              aria-label="Next lab"
              className="w-7 h-7 rounded-full border border-gold/40 bg-gold/10 hover:bg-gold/20 flex items-center justify-center text-gold transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100">
          {LABS.map((lab, i) => {
            const isActive = i === idx;
            return (
              <button
                key={lab.id}
                type="button"
                onClick={() => setIdx(i)}
                data-testid={`carousel-tab-${lab.id}`}
                aria-pressed={isActive}
                className={`relative px-3 py-2.5 text-left transition-all ${
                  isActive
                    ? "bg-white"
                    : "bg-gray-50 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[9px] font-mono ${isActive ? "text-gold" : "text-gray-400"}`}>0{i + 1}</span>
                  <span className={`text-[11px] font-bold ${isActive ? "text-gray-900" : "text-gray-600"}`}>{lab.title}</span>
                </div>
                <p className={`text-[10px] leading-tight ${isActive ? "text-gray-500" : "text-gray-400"}`}>{lab.subtitle}</p>
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active lab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={LABS[idx].id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.3, ease: chartTheme.ease }}
        >
          <Lab />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {LABS.map((lab, i) => (
          <button
            key={lab.id}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Go to ${lab.title}`}
            data-testid={`carousel-dot-${lab.id}`}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-gold" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
