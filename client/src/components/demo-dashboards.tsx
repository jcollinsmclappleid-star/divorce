import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ArrowRightLeft, Sliders, Activity,
  TrendingUp, TrendingDown, Sparkles, Heart, Home, Wallet,
  BarChart3,
} from "lucide-react";
import { RadialGauge } from "@/components/charts/radial-gauge";
import { chartTheme, fmtK, gaugeColor } from "@/lib/chart-theme";

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

// ─── Lab 1: Scenario Comparison (light theme — distinct from hero console) ───
function SettlementLab() {
  const enriched = SAMPLE_SCENARIOS.map((s) => ({
    ...s,
    totalCap: s.capA + s.capB,
    totalSur: s.surA + s.surB,
    minCri: Math.min(s.criA, s.criB),
  }));
  const maxCap = Math.max(...enriched.map((r) => r.totalCap), 1);
  const maxSur = Math.max(...enriched.map((r) => Math.abs(r.totalSur)), 1);

  return (
    <div className="relative" data-testid="lab1-comparison">
      <div className="absolute -inset-4 rounded-[24px] bg-gold/[0.12] blur-2xl pointer-events-none" />
      <div className="relative rounded-2xl bg-gradient-to-b from-[#FBF8F1] to-white border border-gold/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-gold/15 via-gold/8 to-transparent border-b border-gold/20 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gold" />
            <p className="text-[12px] font-bold text-[#1a3357] tracking-tight">Scenario Comparison</p>
            <span className="text-[10px] text-[#1a3357]/50 font-mono">all 4 side-by-side</span>
          </div>
          <InteractiveHint text="Sample figures — see your own after the wizard" />
        </div>

        {/* Sub-header */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100">
          <p className="text-[10px] text-slate-500 leading-snug">
            Each row shows the same three figures for one settlement option, calculated from the inputs entered. No option is presented as recommended.
          </p>
        </div>

        {/* Column header row */}
        <div className="bg-white">
          <div className="grid grid-cols-[1fr_auto] gap-3 px-4 py-2 border-b border-slate-100 bg-slate-50/60">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Settlement option</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold text-right">Resilience band</span>
          </div>

          {enriched.map((s, i) => {
            const capPct = (s.totalCap / maxCap) * 100;
            const surPct = (Math.abs(s.totalSur) / maxSur) * 100;
            const criColor = gaugeColor(s.minCri);

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                data-testid={`lab1-row-${s.id}`}
                className="grid grid-cols-[1fr_auto] gap-3 px-4 py-3 border-b border-slate-100 last:border-0 items-center"
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[12px] font-bold text-[#1a3357] truncate">{s.name}</p>
                    <span className="text-[9px] font-mono text-slate-400">A {fmtK(s.capA)} · B {fmtK(s.capB)}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-500 w-14 shrink-0">Capital</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-violet-400 to-violet-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${capPct}%` }}
                          transition={{ duration: 0.6, ease: chartTheme.ease, delay: i * 0.05 }}
                        />
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-[#1a3357] tabular-nums w-16 text-right">£{Math.round(s.totalCap / 1000)}k</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-500 w-14 shrink-0">Surplus</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          className={`h-full ${s.totalSur >= 0 ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : "bg-gradient-to-r from-rose-400 to-rose-500"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${surPct}%` }}
                          transition={{ duration: 0.6, ease: chartTheme.ease, delay: i * 0.05 + 0.05 }}
                        />
                      </div>
                      <span className={`text-[10px] font-mono font-semibold tabular-nums w-16 text-right ${s.totalSur >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                        {s.totalSur >= 0 ? "+" : "−"}£{Math.abs(s.totalSur).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-500 w-14 shrink-0">Resilience</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          className="h-full"
                          style={{ background: criColor.stroke }}
                          initial={{ width: 0 }}
                          animate={{ width: `${s.minCri}%` }}
                          transition={{ duration: 0.6, ease: chartTheme.ease, delay: i * 0.05 + 0.1 }}
                        />
                      </div>
                      <span className="text-[10px] font-mono font-semibold tabular-nums w-16 text-right" style={{ color: criColor.stroke }}>
                        {s.minCri}/100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold border ${
                      s.minCri >= 60
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : s.minCri >= 40
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {criColor.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-gold/[0.10] to-gold/[0.04] border-t border-gold/20 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-gold" />
              <span className="text-[10px] text-[#1a3357]/75 font-medium">
                Bar widths are scaled to the largest figure across the four options for visual comparison only
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gold/60" />
          </div>
          <p className="text-[9px] text-[#1a3357]/55 italic leading-snug">
            These are calculated facts from the figures entered — not a recommendation.
          </p>
        </div>
      </div>
    </div>
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
  { id: "settlement",  title: "Scenario Comparison",    subtitle: "All 4 scenarios side-by-side",         Comp: SettlementLab },
  { id: "split",       title: "Asset Split Ratio",      subtitle: "Drag to change the 50/50 starting point", Comp: SplitRatioLab },
  { id: "stress",      title: "Stress Test",            subtitle: "Toggle real-world shocks",              Comp: StressLab },
  { id: "maintenance", title: "Maintenance Bridge",     subtitle: "Move money between parties",            Comp: MaintenanceLab },
];

export function DemoCarousel({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const interactedRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const reduced = useReducedMotion();

  // Auto-advance every 6s — only while in view, paused on hover, stops
  // permanently once the user clicks an arrow / tab / dot.
  useEffect(() => {
    if (reduced) return;
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { inViewRef.current = e.isIntersecting; }),
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || interactedRef.current || paused) return;
    const id = window.setInterval(() => {
      if (interactedRef.current || !inViewRef.current) return;
      setIdx((i) => (i + 1) % LABS.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const stopAuto = () => { interactedRef.current = true; };
  const Lab = LABS[idx].Comp;
  const next = () => { stopAuto(); setIdx((i) => (i + 1) % LABS.length); };
  const prev = () => { stopAuto(); setIdx((i) => (i - 1 + LABS.length) % LABS.length); };
  const goTo = (i: number) => { stopAuto(); setIdx(i); };
  const dark = variant === "dark";

  // Theme-adaptive class sets
  const wrap   = dark ? "bg-white/[0.04] rounded-xl border border-white/10 backdrop-blur-sm overflow-hidden" : "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden";
  const head   = dark ? "flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/[0.03]" : "flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white";
  const title  = dark ? "text-[11px] font-bold uppercase tracking-wider text-white/85" : "text-[11px] font-bold uppercase tracking-wider text-gray-700";
  const count  = dark ? "text-[10px] text-white/40 ml-1" : "text-[10px] text-gray-400 ml-1";
  const prevBtn = dark ? "w-7 h-7 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.10] flex items-center justify-center text-white/70 transition-colors" : "w-7 h-7 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors";
  const tabsBg = dark ? "bg-white/10" : "bg-gray-100";
  const tabActiveBg   = dark ? "bg-white/[0.06]" : "bg-white";
  const tabInactiveBg = dark ? "bg-white/[0.02] hover:bg-white/[0.05]" : "bg-gray-50 hover:bg-white";
  const tabIdx        = (active: boolean) => active ? "text-gold" : (dark ? "text-white/40" : "text-gray-400");
  const tabTitle      = (active: boolean) => active ? (dark ? "text-white" : "text-gray-900") : (dark ? "text-white/70" : "text-gray-600");
  const tabSubtitle   = (active: boolean) => active ? (dark ? "text-white/55" : "text-gray-500") : (dark ? "text-white/40" : "text-gray-400");

  return (
    <div
      ref={wrapperRef}
      className="space-y-3"
      data-testid="demo-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDownCapture={stopAuto}
      onKeyDownCapture={stopAuto}
    >
      {/* Tab strip */}
      <div className={wrap}>
        <div className={head}>
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-gold" />
            <span className={title}>Try the dashboards</span>
            <span className={count}>{idx + 1} of {LABS.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              data-testid="carousel-prev"
              aria-label="Previous lab"
              className={prevBtn}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={next}
              data-testid="carousel-next"
              aria-label="Next lab"
              className="w-7 h-7 rounded-full border border-gold/40 bg-gold/15 hover:bg-gold/25 flex items-center justify-center text-gold transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-px ${tabsBg}`}>
          {LABS.map((lab, i) => {
            const isActive = i === idx;
            return (
              <button
                key={lab.id}
                type="button"
                onClick={() => goTo(i)}
                data-testid={`carousel-tab-${lab.id}`}
                aria-pressed={isActive}
                className={`relative px-3 py-2.5 text-left transition-all ${isActive ? tabActiveBg : tabInactiveBg}`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[9px] font-mono ${tabIdx(isActive)}`}>0{i + 1}</span>
                  <span className={`text-[11px] font-bold ${tabTitle(isActive)}`}>{lab.title}</span>
                </div>
                <p className={`text-[10px] leading-tight ${tabSubtitle(isActive)}`}>{lab.subtitle}</p>
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
            onClick={() => goTo(i)}
            aria-label={`Go to ${lab.title}`}
            data-testid={`carousel-dot-${lab.id}`}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-gold" : (dark ? "w-1.5 bg-white/20 hover:bg-white/40" : "w-1.5 bg-gray-300 hover:bg-gray-400")}`}
          />
        ))}
      </div>
    </div>
  );
}
