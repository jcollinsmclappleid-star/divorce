import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  X, ArrowRight, AlertTriangle, TrendingUp, TrendingDown, Sparkles,
  BookOpen, AlertCircle, FileSearch, Scale, Home, PiggyBank,
  Wallet, Users, List, ChevronDown, ChevronUp, Sliders, Activity,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { RadialGauge } from "@/components/charts/radial-gauge";
import { chartTheme, fmtK, gaugeColor, densifyProjection, hashSeed } from "@/lib/chart-theme";
import { DemoCarousel } from "@/components/demo-dashboards";
import { ScenarioLeaderboard } from "@/components/scenario-leaderboard";
import type { ConsoleScenario } from "@/components/settlement-console";

interface ReportPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

function SampleBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
      Sample report — fictional figures
    </div>
  );
}

function SectionHeader({ title, accent, description }: { title: string; accent?: string; description?: string }) {
  return (
    <div className="flex items-stretch gap-0 mb-4 rounded-lg overflow-hidden shadow-sm">
      <div className="w-1.5 shrink-0" style={{ background: accent ?? "#1e3a5f" }} />
      <div className="flex-1 bg-gradient-to-r from-[hsl(220_52%_20%)] to-[hsl(220_52%_16%)] px-5 py-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h3>
        {description && <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">{description}</p>}
      </div>
    </div>
  );
}

function Row({ label, value, sub, bold, red, green }: {
  label: string; value: string; sub?: string; bold?: boolean; red?: boolean; green?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 py-1.5 border-b border-gray-100 last:border-0 ${bold ? "font-semibold" : ""}`}>
      <span className="text-sm text-gray-600 flex-1">{label}{sub && <span className="text-xs text-gray-400 ml-1">({sub})</span>}</span>
      <span className={`text-sm tabular-nums shrink-0 ${bold ? (green ? "text-emerald-700" : red ? "text-rose-600" : "text-gray-900") : red ? "text-rose-600" : green ? "text-emerald-700" : "text-gray-800"}`}>{value}</span>
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-gray-100 pt-2 mt-2">
      <button
        type="button"
        className="w-full flex items-center justify-between py-1 text-left"
        onClick={() => setOpen(v => !v)}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</span>
        {open
          ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
          : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

// ─── Sample executive dashboard (visual showcase at top of preview) ───
const SAMPLE_SCENARIOS = [
  { id: "S1", name: "Sell & Split",  short: "Sell & Split", capA: 89_750, capB: 89_750, surA: 2656, surB:  652, criA: 78, criB: 63, projection: [179_500, 188_900, 198_700, 208_200, 217_400, 226_800] },
  { id: "S2", name: "A Keeps Home",  short: "A Keeps",      capA: 18_250, capB: 89_750, surA: 1026, surB:  652, criA: 52, criB: 71, projection: [108_000, 119_300, 131_800, 144_100, 156_700, 169_300] },
  { id: "S3", name: "B Keeps Home",  short: "B Keeps",      capA: 89_750, capB: 18_250, surA: 2656, surB: -978, criA: 82, criB: 22, projection: [108_000, 102_000,  85_500,  69_400,  53_200,  37_500] },
  { id: "S4", name: "Deferred Sale", short: "Deferred",     capA: 54_000, capB: 54_000, surA: 2666, surB:  662, criA: 71, criB: 54, projection: [108_000, 117_400, 127_500, 138_000, 149_100, 160_700] },
];

const SAMPLE_COMPOSITION = [
  { label: "Property equity", value: 71_500,  color: "#A78BFA" },
  { label: "Pension (CETV)",  value: 60_000,  color: "#22D3EE" },
  { label: "Cash & savings",  value: 108_000, color: "#C9A84C" },
];

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

function SampleDashboard() {
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
    <div className="relative">
      <div className="relative rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-900/10 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" /><div className="w-2.5 h-2.5 rounded-full bg-slate-300" /><div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
            <Activity className="w-3 h-3 text-gold/70" />
            <span>Settlement Command Console — sample</span>
          </div>
          <div className="w-12" />
        </div>

        {/* Scenario chips */}
        <div className="px-4 pt-3 pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
            <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400 font-medium">Switch settlement scenario</p>
            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Live · click to try
            </span>
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
                  data-testid={`sample-chip-${s.id}`}
                  aria-pressed={isActive}
                  className={`relative px-3 py-1.5 rounded-full text-[11px] font-medium transition-all border ${
                    isActive
                      ? "bg-gold text-white border-gold"
                      : isHinted
                      ? "bg-amber-50 text-slate-800 border-gold/50"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {s.short}
                </button>
              );
            })}
          </div>
          {!interacted && (
            <p className="text-[10px] text-gold/80 mt-2 italic flex items-center gap-1">
              <ArrowRight className="w-2.5 h-2.5" /> Tap a different scenario to see how every figure changes
            </p>
          )}
        </div>

        {/* Hero metrics */}
        <div className="grid grid-cols-3 gap-px bg-slate-200">
          <div className="bg-white px-4 py-3">
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1">Net capital · combined</p>
            <p className="text-2xl font-bold text-[#1a3357] tabular-nums">£{totalCap.toLocaleString()}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">A {fmtK(sc.capA)} · B {fmtK(sc.capB)}</p>
          </div>
          <div className="bg-white px-4 py-3">
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1">Best monthly surplus</p>
            <p className={`text-2xl font-bold tabular-nums flex items-center gap-1 ${bestSurplus >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {bestSurplus >= 0 ? "+" : "−"}£{Math.abs(bestSurplus).toLocaleString()}
              {bestSurplus >= 0 ? <TrendingUp className="w-3 h-3 text-emerald-600/70" /> : <TrendingDown className="w-3 h-3 text-rose-600/70" />}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">{sc.surA >= sc.surB ? "Party A" : "Party B"} strongest</p>
          </div>
          <div className="bg-white px-4 py-3">
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1">Lowest resilience score</p>
            <p className="text-2xl font-bold tabular-nums" style={{ color: minRColor.stroke }}>
              {minR}<span className="text-sm font-normal text-slate-400">/100</span>
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">{minRColor.label}</p>
          </div>
        </div>

        {/* Lower panes */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-px bg-slate-200">
          {/* Composition + trajectory */}
          <div className="bg-white p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Capital composition</p>
                <p className="text-[10px] font-mono text-slate-500">£{compTotal.toLocaleString()}</p>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
                {SAMPLE_COMPOSITION.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.value / compTotal) * 100}%` }}
                    transition={{ duration: 0.7, ease: chartTheme.ease, delay: i * 0.08 }}
                    style={{ background: c.color }}
                  />
                ))}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {SAMPLE_COMPOSITION.map((c) => (
                  <div key={c.label} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: c.color }} />
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-700 font-medium tabular-nums">{fmtK(c.value)}</p>
                      <p className="text-[9px] text-slate-500 truncate">{c.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">5-year capital trajectory</p>
                <p className="text-[10px] font-mono text-slate-600">
                  Yr 5 <span className="text-emerald-600 font-semibold">{fmtK(sc.projection[5])}</span>
                </p>
              </div>
              <MiniSparkline data={denseTraj} height={70} gradId={`sample-spark-${sc.id}`} />
            </div>
          </div>

          {/* Twin gauges */}
          <div className="bg-white p-4 flex flex-col">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-2">Resilience · weakest party</p>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
                <RadialGauge score={minR} size={140} label={minRColor.label.toUpperCase()} testId={`sample-gauge-${sc.id}`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {[
                { name: "Party A", score: sc.criA },
                { name: "Party B", score: sc.criB },
              ].map((p) => {
                const g = gaugeColor(p.score);
                return (
                  <div key={p.name} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-center">
                    <p className="text-[9px] text-slate-500">{p.name}</p>
                    <p className="text-base font-bold tabular-nums" style={{ color: g.stroke }}>
                      {p.score}<span className="text-[9px] font-normal text-slate-400">/100</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stress-test row (visual only) */}
        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50 flex items-center gap-2 flex-wrap">
          <Sliders className="w-3 h-3 text-gold/70" />
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mr-1">Stress tests</span>
          {["Mortgage rate +1%", "Income −5%", "House price −10%"].map((s) => (
            <span key={s} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white text-slate-600 border border-slate-200">{s}</span>
          ))}
          <span className="text-[10px] text-slate-400 ml-auto">Interactive in the unlocked report</span>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-gold/70" />
            <span className="text-[10px] text-gold/80 font-medium">Sample dashboard · the live version is wired to your figures</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-gold/60" />
        </div>
      </div>
    </div>
  );
}

function StatStrip({ items, color }: { items: { label: string; value: string; warn?: boolean }[]; color: string }) {
  return (
    <div className="rounded-lg p-3 flex flex-wrap gap-5 mb-4" style={{ background: `${color}10`, borderLeft: `3px solid ${color}` }}>
      {items.map(({ label, value, warn }) => (
        <div key={label}>
          <p className="text-[9px] text-gray-400 uppercase tracking-wider">{label}</p>
          <p className={`text-sm font-bold tabular-nums ${warn ? "text-rose-600" : "text-gray-800"}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}

const TOC_ITEMS = [
  { num: "",   label: "Executive Overview" },
  { num: "",   label: "Guided Intelligence Report" },
  { num: "1.", label: "Financial Position" },
  { num: "2.", label: "Income & Taxation" },
  { num: "3.", label: "Projected Expenses" },
  { num: "4.", label: "Scenario Comparison" },
  { num: "5.", label: "Sell & Split — Detail" },
  { num: "6.", label: "A Keeps Home — Detail" },
  { num: "",   label: "Assumption Review" },
  { num: "",   label: "Assumptions & Methodology" },
  { num: "",   label: "Glossary" },
];

export function ReportPreviewModal({ open, onClose }: ReportPreviewModalProps) {
  const [, setLocation] = useLocation();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleStart = () => {
    onClose();
    scrollTop();
    setLocation("/wizard");
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Sample divorce financial report"
    >
      <div className="relative w-full max-w-3xl bg-[#f8f9fb] rounded-2xl shadow-2xl overflow-hidden" data-testid="modal-sample-report">

        {/* Sticky close bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-white/95 backdrop-blur border-b border-gray-100">
          <SampleBadge />
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Close sample report"
            data-testid="button-close-sample-report"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-8 space-y-8">

          {/* ── Cover ── */}
          <div className="bg-gradient-to-br from-primary via-[hsl(220_52%_22%)] to-[hsl(220_52%_16%)] rounded-2xl px-7 py-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.03] rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-gold/[0.06] rounded-full translate-y-8 -translate-x-6" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-0.5">DivorceCalculatorUK</p>
                  <p className="text-[10px] text-white/35 uppercase tracking-wider">Financial Modelling</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/35 uppercase tracking-widest">Report generated</p>
                  <p className="text-xs text-white/70 font-medium mt-0.5">April 2026</p>
                  <p className="text-[10px] text-white/30 mt-0.5">UK 2026/27 Tax Rules</p>
                </div>
              </div>
              <div className="border-t border-white/15 pt-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-6 bg-gold rounded-full" />
                  <h1 className="text-2xl font-bold text-white tracking-tight">Divorce Financial Report</h1>
                </div>
                <p className="text-sm text-white/50 ml-3">Illustrative modelling · England & Wales · 4 scenarios analysed</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Total Assets",    value: "£843,000", color: "text-cyan-300" },
                  { label: "Net Worth",        value: "£253,000", color: "text-gold" },
                  { label: "Scenarios",        value: "4",        color: "text-emerald-300" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white/8 border border-white/10 rounded-xl px-3 py-2.5">
                    <p className="text-[9px] text-white/35 uppercase tracking-wider mb-1">{label}</p>
                    <p className={`text-base font-bold tabular-nums ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
              {/* Two-product badge strip */}
              <div className="mt-5 flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-cyan-400/15 border border-cyan-400/25 text-cyan-300 text-[10px] font-semibold px-3 py-1 rounded-full">
                  <BookOpen className="w-3 h-3" /> Settlement Analyser
                </div>
                <div className="flex items-center gap-1.5 bg-gold/15 border border-gold/25 text-gold text-[10px] font-semibold px-3 py-1 rounded-full">
                  <FileSearch className="w-3 h-3" /> Guided Intelligence Report
                </div>
              </div>
            </div>
          </div>

          {/* ── Sample Scenario Comparison (light, all-at-once view) ── */}
          <ScenarioLeaderboard
            scenarios={SAMPLE_SCENARIOS.map<ConsoleScenario>((s) => ({
              id: s.id,
              name: s.name,
              shortName: s.short,
              tag: "Balanced",
              tagTone: "balanced",
              capitalA: s.capA,
              capitalB: s.capB,
              surplusA: s.surA,
              surplusB: s.surB,
              resilienceA: s.criA,
              resilienceB: s.criB,
              projection: s.projection,
            }))}
            title="Sample Scenario Comparison"
            caption="all 4 scenarios side-by-side"
            footerText="In your real report this is calculated from your own figures"
            testId="modal-sample-comparison"
          />

          {/* ── Interactive demo carousel ── */}
          <DemoCarousel />

          {/* ── Disclaimer ── */}
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-3">
            <span className="text-amber-600 font-bold shrink-0 mt-0.5 text-[10px] uppercase tracking-wider">Important</span>
            <p>This document provides illustrative financial modelling only and does not constitute legal, tax, or financial advice. All figures are estimates based on fictional inputs. Lending capacity benchmarks are generalised income multiple illustrations — not a lending assessment, mortgage advice, or credit approval indication.</p>
          </div>

          {/* ── Table of Contents ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3 border-b border-gray-100 bg-gray-50/60">
              <List className="w-3.5 h-3.5 text-primary/60 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Contents</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-0.5">
              {TOC_ITEMS.map(({ num, label }) => (
                <div key={label} className="flex items-baseline gap-1.5 py-0.5 text-xs text-gray-500">
                  {num && <span className="text-[10px] text-gray-400 w-5 shrink-0 tabular-nums">{num}</span>}
                  <span className={`leading-snug ${!num ? "pl-5" : ""}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Executive Overview ── */}
          <section>
            <SectionHeader title="Executive Overview" description="A plain-English summary of the estate, income position, and what the modelling shows across all settlement options." />
            {/* At a Glance */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: Wallet,   label: "Distributable pool",  value: "£179,500",             sub: "Property equity + liquid assets",      color: "text-cyan-600",   bg: "bg-cyan-50",   border: "border-cyan-100" },
                { icon: Users,    label: "Gross income split",  value: "£126,000 vs £60,000",  sub: "Party A vs Party B (annual)",          color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
                { icon: TrendingUp, label: "Take-home pay",     value: "£6,518/mo · £3,690/mo", sub: "After estimated tax & NI",            color: "text-emerald-600",bg: "bg-emerald-50",border: "border-emerald-100" },
                { icon: Home,     label: "Property LTV",        value: "87%",                  sub: "High — affects transfer options",      color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-100" },
              ].map(({ icon: Icon, label, value, sub, color, bg, border }) => (
                <div key={label} className={`rounded-lg border ${border} ${bg} px-3.5 py-3`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3 h-3 ${color} shrink-0`} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{label}</span>
                  </div>
                  <p className={`text-sm font-bold tabular-nums ${color} leading-snug`}>{value}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
            {/* Qualitative executive summary */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              {[
                {
                  heading: "Estate Overview",
                  body: "This report presents an illustrative financial analysis of a marital estate comprising £843,000 in total assets, offset by £590,000 in liabilities, producing a combined net worth of £253,000. The primary residence, valued at £675,000, carries an outstanding mortgage of £590,000, leaving a net equity of only £71,500 after estimated sale costs. This represents approximately 80% of total assets and is the single largest component of the estate. Pension provision totals £60,000 by Cash Equivalent Transfer Value (CETV) and is treated separately from liquid assets within the modelling.",
                },
                {
                  heading: "Income & Tax Position",
                  body: "Combined gross household income is £186,000 per annum. Party A earns 2.1× the income of Party B (£126,000 versus £60,000 gross), resulting in a material income disparity that affects post-separation sustainability. After applying estimated 2026/27 UK income tax and National Insurance, net incomes are £78,220 (Party A) and £44,284 (Party B) per annum. Child maintenance obligations, estimated at £4,944 per annum using the CMS formula, are factored into the projection model for approximately 7 further years.",
                },
                {
                  heading: "Scenario Analysis",
                  body: "The analysis models 4 settlement scenarios under a 50/50 asset division assumption. Under Sell & Split, both parties receive equal liquid capital of £89,750 and maintain positive monthly cashflows. Scenarios involving one party retaining the home introduce asymmetric capital positions — with the retaining party typically receiving significantly less liquid capital at settlement. The model indicates Party A's estimated solo borrowing capacity (4.5× gross income = £567,000) falls slightly short of the outstanding mortgage balance (£590,000), which may present a practical challenge in keep-home scenarios.",
                },
                {
                  heading: "Basis of Preparation",
                  body: "Figures are based on the fictional data shown and standard modelling assumptions, including 2026/27 UK tax rates, a 4.5% mortgage interest rate over a 25-year term, 2.0% inflation, and 2% estimated property sale costs. This analysis is illustrative only and does not constitute legal, tax, or financial advice.",
                },
              ].map((s, si) => (
                <div key={si} className={si > 0 ? "pt-3 border-t border-gray-100" : ""}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{s.heading}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── GIR separator ── */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-dashed border-gray-200" />
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Guided Intelligence Report
            </div>
            <div className="flex-1 border-t border-dashed border-gray-200" />
          </div>

          {/* ── Guided Intelligence Report ── */}
          <section>
            <div className="bg-gradient-to-r from-[hsl(220_52%_22%)] to-[hsl(220_52%_16%)] rounded-xl px-5 py-4 mb-5 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Guided Intelligence Report</h3>
                  <p className="text-[10px] text-white/40 mt-0.5">Intelligently generated plain-English interpretation of your figures</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full shrink-0">Confidence: Medium</span>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">

              <div className="border-l-4 border-l-blue-800/40 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Plain-English Overview</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The combined estate is dominated by the family home (£675,000), but the outstanding mortgage of £590,000 — representing an 87% loan-to-value ratio — means the net equity available for division is only £71,500 after estimated sale costs. When combined with liquid savings of £108,000, the total distributable pool is £179,500. The most financially balanced outcome appears to be Sell & Split, where both parties receive equal capital and maintain positive monthly cashflows. Scenarios involving one party retaining the home introduce significant pressure due to the high mortgage relative to individual incomes.
                </p>
                <p className="text-xs text-gray-400 italic mt-2">Note: This is an illustrative summary based on fictional figures. Not legal, tax, or financial advice.</p>
              </div>

              <div className="border-l-4 border-l-yellow-500/50 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">What Stands Out</p>
                <ul className="space-y-2">
                  {[
                    "The outstanding mortgage of £590,000 on a £675,000 property represents an 87% loan-to-value ratio — leaving net equity of only £71,500 after estimated sale costs. Both parties start from a significantly weaker capital position than the headline asset value of £843,000 suggests.",
                    "Party A earns more than twice Party B's gross income (£126,000 vs £60,000). This income disparity materially affects each party's ability to sustain housing costs and monthly outgoings after settlement.",
                    "Party A's estimated solo borrowing capacity (4.5× gross = £567,000) falls £23,000 short of the outstanding mortgage balance (£590,000). A sole transfer to Party A's name may require a capital reduction or additional income evidence before lender approval.",
                    "The pension values entered differ significantly (£42,000 for Party A vs £18,000 for Party B). The £24,000 gap may warrant review by a pension specialist, particularly if either pension is a defined benefit scheme where CETVs can understate true value.",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-yellow-500/70 shrink-0 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-l-rose-400/60 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Pressure Points</p>
                <ul className="space-y-2">
                  {[
                    "Under 'B Keeps Home', Party B faces an estimated monthly deficit of £978 — meaning outgoings exceed net income each month. With only £18,250 in liquid capital, the model projects capital depletion within approximately 2 years. This scenario appears financially unsustainable without an additional income source or significant reduction in outgoings.",
                    "Under 'A Keeps Home', Party A retains only £18,250 in liquid capital after funding the buyout — approximately 2.8 months of net income. This leaves very limited buffer for unexpected costs, legal fees, or early repayment charges.",
                    "The mortgage balance slightly exceeds Party A's standard solo borrowing capacity. Lender affordability would need to be formally assessed before agreeing any keep-home arrangement.",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-rose-400 shrink-0 mt-0.5 font-bold">!</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-l-cyan-400/50 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Questions for Professionals</p>
                <div className="space-y-5">
                  {[
                    {
                      icon: Scale, color: "text-primary/60", label: "Solicitor / Mediator",
                      questions: [
                        "Under 'B Keeps Home', Party B faces a projected monthly deficit of £978 and capital depletion within approximately 2 years. Should any negotiated settlement include a minimum capital floor to protect against this outcome?",
                        "The income disparity between parties (£126,000 vs £60,000 gross) is significant. Should spousal maintenance be considered alongside the capital settlement — and if so, what factors typically influence the amount and duration in cases with this income profile?",
                        "Party A's pension CETV of £42,000 is more than double Party B's (£18,000). Would pension sharing or pension offsetting be more appropriate given the modest overall estate?",
                      ],
                    },
                    {
                      icon: Home, color: "text-emerald-600", label: "Mortgage Broker",
                      questions: [
                        "Party A earns £126,000 gross — suggesting a solo borrowing capacity of approximately £567,000 (4.5× income). The outstanding balance is £590,000, which is £23,000 above this threshold. What options exist to bring the mortgage within a standard lending multiple?",
                        "If the property is sold and Party B receives £89,750 in capital (Sell & Split), what would that support in terms of an independent purchase, and at what property value and loan-to-value?",
                        "Does the existing mortgage carry an early repayment charge, and if so, how should this be factored into the net equity figure before settlement is finalised?",
                      ],
                    },
                    {
                      icon: PiggyBank, color: "text-violet-600", label: "Pension Expert",
                      questions: [
                        "The CETVs entered are £42,000 (Party A) and £18,000 (Party B). Are these figures recent and do they represent the full actuarial value? If either pension is a defined benefit scheme, the CETV may significantly understate the true long-term benefit.",
                        "Given the £24,000 gap in pension values, would pension offsetting or a pension sharing order produce a more practical and tax-efficient outcome?",
                      ],
                    },
                  ].map(g => (
                    <div key={g.label}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <g.icon className={`w-3.5 h-3.5 ${g.color}`} />
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{g.label}</p>
                      </div>
                      <ol className="space-y-2">
                        {g.questions.map((q, qi) => (
                          <li key={qi} className="flex gap-2.5 text-sm text-gray-700">
                            <span className="text-primary/40 shrink-0 font-semibold tabular-nums">{qi + 1}.</span>
                            <span className="leading-relaxed">{q}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-l-amber-400/60 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Missing Information & Model Confidence</p>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-amber-400 text-amber-700 bg-amber-50 inline-block mb-2">Confidence: Medium</span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This sample model has medium confidence. Core income, property equity, liquid savings, and pension CETVs are included. However, the following are not modelled: transaction costs beyond the 2% sale cost estimate (legal fees, stamp duty on a new purchase, moving costs, early repayment charges), childcare costs beyond what was entered, and any actuarial pension assessment. The pension CETV figures are nominal values only — pension type, scheme rules, and normal retirement age are not assessed.
                </p>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic mt-3">
              This guided summary is illustrative only. It is not legal, tax, or financial advice. Always consult qualified professionals before making financial decisions.
            </p>
          </section>

          {/* Product 1 label */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-200 text-cyan-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <BookOpen className="w-3 h-3" /> Settlement Analyser
            </div>
            <div className="flex-1 border-t border-dashed border-gray-200" />
          </div>

          {/* ── 1. Financial Position ── */}
          <section>
            <SectionHeader title="1. Financial Position Summary" description="All assets and liabilities that make up the combined estate, and how they net against each other." />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Assets</p>
                  <Row label="Family Home" value="£675,000" sub="primary residence" />
                  <Row label="Party A Pension (CETV)" value="£42,000" />
                  <Row label="Party B Pension (CETV)" value="£18,000" />
                  <Row label="Joint Savings" value="£58,000" />
                  <Row label="Investments (ISA)" value="£50,000" />
                  <Row label="Total Assets" value="£843,000" bold />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Liabilities & Net Position</p>
                  <Row label="Outstanding Mortgage" value="(£590,000)" red />
                  <Row label="Total Liabilities" value="(£590,000)" bold red />
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <Row label="Combined Net Worth" value="£253,000" bold />
                    <Row label="Net Property Equity (est. 2% sale costs)" value="£71,500" />
                    <Row label="Distributable Settlement Pool" value="£179,500" bold sub="equity + liquid savings" green />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. Income & Taxation ── */}
          <section>
            <SectionHeader title="2. Income & Taxation Summary" description="Estimated take-home pay after income tax and National Insurance, based on 2026/27 rates." />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: "Party A", gross: "£126,000", allowance: "£0", note: "tapered — income above £125,140", tax: "(£40,232)", ni: "(£7,548)", net: "£78,220", monthly: "≈ £6,518" },
                  { label: "Party B", gross: "£60,000",  allowance: "£12,570", note: "", tax: "(£11,432)", ni: "(£4,284)", net: "£44,284", monthly: "≈ £3,690" },
                ].map(col => (
                  <div key={col.label}>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">{col.label}</p>
                    <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 px-3 text-gray-600">Gross Annual Income</td>
                            <td className="py-2 px-3 text-right font-medium text-gray-800">{col.gross}</td>
                          </tr>
                          <tr className="border-b border-gray-100 bg-white">
                            <td className="py-2 px-3 text-gray-500">Personal Allowance</td>
                            <td className="py-2 px-3 text-right text-gray-600">{col.allowance}{col.note && <span className="text-[10px] text-gray-400 ml-1">({col.note})</span>}</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 px-3 text-gray-500">Income Tax Liability</td>
                            <td className="py-2 px-3 text-right text-rose-600 font-medium">{col.tax}</td>
                          </tr>
                          <tr className="border-b border-gray-100 bg-white">
                            <td className="py-2 px-3 text-gray-500">National Insurance</td>
                            <td className="py-2 px-3 text-right text-rose-600 font-medium">{col.ni}</td>
                          </tr>
                          <tr className="bg-primary/5 border-t-2 border-primary/20">
                            <td className="py-2.5 px-3 font-semibold text-gray-800">Take-Home Pay (annual)</td>
                            <td className="py-2.5 px-3 text-right font-bold text-emerald-700">{col.net}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5 text-right">{col.monthly}/mo net income</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 italic mt-3">Child maintenance estimated at £4,944/yr (£412/mo) using the CMS formula for 2 children. ~7 years remaining based on children's ages.</p>
            </div>
          </section>

          {/* ── 3. Projected Monthly Expenditure ── */}
          <section>
            <SectionHeader title="3. Projected Monthly Expenditure" description="The expense figures entered, used to calculate monthly surplus or deficit in each scenario." />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Expense</th>
                    <th className="text-left py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Owner</th>
                    <th className="text-right py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Monthly</th>
                    <th className="text-right py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Annual</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Rent / housing (est.)",     owner: "Party A",  mo: "£1,650", yr: "£19,800" },
                    { name: "Rent / housing (est.)",     owner: "Party B",  mo: "£1,650", yr: "£19,800" },
                    { name: "Daily living & food",       owner: "Party A",  mo: "£900",   yr: "£10,800" },
                    { name: "Daily living & food",       owner: "Party B",  mo: "£800",   yr: "£9,600" },
                    { name: "Transport",                 owner: "Party A",  mo: "£350",   yr: "£4,200" },
                    { name: "Transport",                 owner: "Party B",  mo: "£250",   yr: "£3,000" },
                    { name: "Utilities",                 owner: "Shared",   mo: "£220",   yr: "£2,640" },
                    { name: "Childcare (school-age)",    owner: "Party A",  mo: "£500",   yr: "£6,000" },
                    { name: "Misc / contingency",        owner: "Party A",  mo: "£200",   yr: "£2,400" },
                    { name: "Misc / contingency",        owner: "Party B",  mo: "£200",   yr: "£2,400" },
                  ].map((e, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-1.5 text-gray-600">{e.name}</td>
                      <td className="py-1.5 text-gray-400 text-xs">{e.owner}</td>
                      <td className="py-1.5 text-right tabular-nums text-gray-700">{e.mo}</td>
                      <td className="py-1.5 text-right tabular-nums text-gray-700">{e.yr}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-300 font-semibold">
                    <td className="py-1.5" colSpan={2}>Total</td>
                    <td className="py-1.5 text-right tabular-nums">£6,720</td>
                    <td className="py-1.5 text-right tabular-nums">£80,640</td>
                  </tr>
                </tfoot>
              </table>
              <p className="text-[10px] text-gray-400 italic mt-3">Expenses inflated at 2.0% per year in projection model. Shared expenses split 50/50 between parties.</p>
            </div>
          </section>

          {/* ── 4. Scenario Comparison ── */}
          <section>
            <SectionHeader title="4. Scenario Comparison — Executive Summary" description="Side-by-side view of all settlement options: capital each party receives, mortgage obligations, and 5-year reserve sustainability." />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-500 mb-4">Split assumption: 50% / 50%. Pension split: 50% / 50%. Sale costs estimated at 2% of property value.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[540px]">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 rounded-tl">Metric</th>
                      {[
                        { label: "Sell & Split",  color: "#2563EB" },
                        { label: "A Keeps Home",  color: "#10B981" },
                        { label: "B Keeps Home",  color: "#8B5CF6" },
                        { label: "Deferred Sale", color: "#F59E0B" },
                      ].map(sc => (
                        <th key={sc.label} className="text-right py-2 px-2 text-[10px] font-bold text-white" style={{ background: sc.color }}>
                          {sc.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Liquid Capital — A",      values: ["£89,750",   "£18,250",    "£89,750",    "£54,000"] },
                      { label: "Liquid Capital — B",      values: ["£89,750",   "£89,750",    "£18,250",    "£54,000"] },
                      { label: "Pension (CETV) — A",      values: ["£30,000",   "£30,000",    "£30,000",    "£30,000"] },
                      { label: "Pension (CETV) — B",      values: ["£30,000",   "£30,000",    "£30,000",    "£30,000"] },
                      { label: "Total Net Position — A",  values: ["£119,750",  "£133,250†",  "£119,750",   "£140,000‡"], bold: true },
                      { label: "Total Net Position — B",  values: ["£119,750",  "£119,750",   "£133,250†",  "£140,000‡"], bold: true },
                      { label: "Monthly Mortgage — A",    values: ["None",      "£3,280",     "None",       "£1,640"] },
                      { label: "Monthly Mortgage — B",    values: ["None",      "None",       "£3,280",     "£1,640"] },
                      { label: "Monthly Surplus — A",     values: ["+£2,656",   "+£1,026",    "+£2,656",    "+£2,666"], green: true },
                      { label: "Monthly Surplus — B",     values: ["+£652",     "+£652",      "(£978)",     "+£662"],   mixed: true },
                      { label: "CRI Score — A",           values: ["78/100",    "52/100",     "82/100",     "71/100"] },
                      { label: "CRI Score — B",           values: ["63/100",    "71/100",     "22/100",     "54/100"] },
                      { label: "5-Yr Reserves — A",       values: ["Sustained", "Sustained",  "Sustained",  "Sustained"], sustain: true },
                      { label: "5-Yr Reserves — B",       values: ["Sustained", "Sustained",  "Yr 2 depletion", "Sustained"], sustainMixed: true },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 ${row.bold ? "bg-gray-50" : i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                        <td className={`py-1.5 px-2 text-gray-600 ${row.bold ? "font-semibold" : ""}`}>{row.label}</td>
                        {row.values.map((v, vi) => (
                          <td key={vi} className={`py-1.5 px-2 text-right tabular-nums ${row.bold ? "font-semibold" : ""} ${
                            row.green ? "text-emerald-700" :
                            row.mixed ? (v.startsWith("(") ? "text-rose-600" : "text-emerald-700") :
                            row.sustain ? "text-emerald-600" :
                            row.sustainMixed ? (v.includes("Yr") ? "text-amber-600" : "text-emerald-600") :
                            ""
                          }`}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-gray-400 mt-3">
                † Includes £85,000 gross home equity (property value minus mortgage balance, before sale). ‡ Includes estimated deferred equity of ~£56,000 each after 3-year Mesher Order (2% annual growth assumed).
              </p>
            </div>
          </section>

          {/* ── 5. Sell & Split — Detail ── */}
          <section>
            <SectionHeader title="5. Sell & Split — Detail" accent="#2563EB" description="A full breakdown of this settlement option: starting positions, monthly cashflow, sustainability, and key indicators." />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <StatStrip color="#2563EB" items={[
                { label: "A — Starting Capital", value: "£89,750" },
                { label: "B — Starting Capital", value: "£89,750" },
                { label: "A — Monthly Surplus",  value: "+£2,656/mo" },
                { label: "B — Monthly Surplus",  value: "+£652/mo" },
                { label: "A CRI Score",           value: "78/100" },
                { label: "B CRI Score",           value: "63/100" },
              ]} />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Summary</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Under Sell & Split, the property is sold and net proceeds are divided equally. Both parties receive equal liquid capital (£89,750 each) and neither retains a mortgage. Both parties maintain a positive monthly surplus. Party A's significantly higher income produces a much stronger cash position (+£2,656/mo vs +£652/mo), but Party B's surplus, while smaller, remains positive throughout the projection period.
                </p>
              </div>
              <Collapsible title="Source of Funds Breakdown" defaultOpen>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Party A", color: "text-blue-600",
                      rows: [
                        { l: "Share of property equity (50%)", v: "£35,750" },
                        { l: "Share of joint savings (50%)",   v: "£29,000" },
                        { l: "Share of ISA (50%)",             v: "£25,000" },
                        { l: "Pension (CETV — 50%)",           v: "£30,000" },
                      ],
                      net: "£89,750",
                    },
                    {
                      label: "Party B", color: "text-emerald-600",
                      rows: [
                        { l: "Share of property equity (50%)", v: "£35,750" },
                        { l: "Share of joint savings (50%)",   v: "£29,000" },
                        { l: "Share of ISA (50%)",             v: "£25,000" },
                        { l: "Pension (CETV — 50%)",           v: "£30,000" },
                      ],
                      net: "£89,750",
                    },
                  ].map(col => (
                    <div key={col.label}>
                      <p className="text-xs font-semibold text-gray-500 mb-1">{col.label}</p>
                      <table className="w-full text-sm">
                        <tbody>
                          {col.rows.map(r => (
                            <tr key={r.l} className="border-b border-gray-100">
                              <td className="py-0.5 text-gray-600">{r.l}</td>
                              <td className="py-0.5 text-right tabular-nums font-medium">{r.v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-between text-sm font-semibold mt-1 pt-1 border-t border-gray-200">
                        <span>Net Liquid Capital</span><span className={col.color}>{col.net}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Collapsible>
              <Collapsible title="Monthly Financial Position">
                <div className="grid sm:grid-cols-2 gap-6 text-sm">
                  {[
                    { label: "Party A", net: "£6,518/mo", cms: "Payable: (£412/mo)", expenses: "(£3,600/mo)", surplus: "+£2,656/mo", green: true },
                    { label: "Party B", net: "£3,690/mo", cms: "Received: +£412/mo", expenses: "(£3,450/mo)", surplus: "+£652/mo", green: true },
                  ].map(p => (
                    <div key={p.label}>
                      <p className="font-medium text-gray-700 mb-1">{p.label}</p>
                      <p className="text-gray-500">Net Monthly Income: {p.net}</p>
                      <p className="text-gray-500">Child Maintenance: {p.cms}</p>
                      <p className="text-gray-500">Total Expenses: {p.expenses}</p>
                      <p className={`font-semibold ${p.green ? "text-emerald-600" : "text-rose-600"}`}>Monthly Surplus / (Deficit): {p.surplus}</p>
                    </div>
                  ))}
                </div>
              </Collapsible>
              <Collapsible title="Reserve Duration (5-Year Projection)">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {[
                    { label: "Party A", start: "£89,750", lowest: "£89,750", status: "Sustained", green: true },
                    { label: "Party B", start: "£89,750", lowest: "£89,750", status: "Sustained", green: true },
                  ].map(p => (
                    <div key={p.label}>
                      <p className="font-medium text-gray-700 mb-1">{p.label}</p>
                      <div className="text-xs space-y-0.5">
                        <div className="flex justify-between"><span className="text-gray-500">Starting Liquid Capital</span><span className="tabular-nums font-medium">{p.start}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Lowest Projected Capital</span><span className="tabular-nums font-medium">{p.lowest}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Year of Depletion</span><span className={`font-medium ${p.green ? "text-emerald-600" : "text-amber-600"}`}>{p.status}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Collapsible>
            </div>
          </section>

          {/* ── 6. A Keeps Home — Detail ── */}
          <section>
            <SectionHeader title="6. A Keeps Home — Detail" accent="#10B981" description="A full breakdown of this settlement option: starting positions, monthly cashflow, sustainability, and key indicators." />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <StatStrip color="#10B981" items={[
                { label: "A — Starting Capital", value: "£18,250" },
                { label: "B — Starting Capital", value: "£89,750" },
                { label: "A — Monthly Surplus",  value: "+£1,026/mo" },
                { label: "B — Monthly Surplus",  value: "+£652/mo" },
                { label: "A CRI Score",           value: "52/100" },
                { label: "B CRI Score",           value: "71/100" },
              ]} />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Summary</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Party A retains the family home and funds a buyout of Party B's 50% equity share (£35,750) from liquid assets. After the buyout, Party A is left with £18,250 in cash — approximately 2.8 months of net income. The monthly mortgage of approximately £3,280 represents 50% of Party A's net monthly income. The model indicates the mortgage balance (£590,000) slightly exceeds Party A's estimated solo borrowing capacity (4.5× gross = £567,000), which may present a challenge when applying to transfer the mortgage into sole name.
                </p>
              </div>
              <Collapsible title="Source of Funds Breakdown" defaultOpen>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Party A", color: "text-emerald-600",
                      rows: [
                        { l: "Share of liquid assets (50%)",        v: "£54,000" },
                        { l: "Buyout payable to B (equity share)",   v: "(£35,750)", red: true },
                        { l: "Home equity retained (in property)",   v: "£71,500", note: true },
                        { l: "Pension (CETV — 50%)",                 v: "£30,000" },
                      ],
                      net: "£18,250",
                    },
                    {
                      label: "Party B", color: "text-blue-600",
                      rows: [
                        { l: "Share of liquid assets (50%)", v: "£54,000" },
                        { l: "Buyout received from A",       v: "£35,750", green: true },
                        { l: "Pension (CETV — 50%)",         v: "£30,000" },
                      ],
                      net: "£89,750",
                    },
                  ].map(col => (
                    <div key={col.label}>
                      <p className="text-xs font-semibold text-gray-500 mb-1">{col.label}</p>
                      <table className="w-full text-sm">
                        <tbody>
                          {col.rows.map(row => {
                            const r = row as { l: string; v: string; red?: boolean; green?: boolean; note?: boolean };
                            return (
                            <tr key={r.l} className="border-b border-gray-100">
                              <td className="py-0.5 text-gray-600">{r.l}{r.note && <span className="text-[10px] text-gray-400 ml-1">(not liquid)</span>}</td>
                              <td className={`py-0.5 text-right tabular-nums font-medium ${r.red ? "text-rose-600" : r.green ? "text-emerald-600" : ""}`}>{r.v}</td>
                            </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="flex justify-between text-sm font-semibold mt-1 pt-1 border-t border-gray-200">
                        <span>Net Liquid Capital</span><span className={col.color}>{col.net}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Collapsible>
              <Collapsible title="Cashflow Resilience Indicator (CRI)">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    {
                      label: "Party A", score: 52, color: "#F59E0B",
                      drivers: [
                        { label: "Mortgage-to-net-income ratio",   value: "50% (£3,280 of £6,518)", status: "warn" },
                        { label: "Liquid capital post-settlement", value: "Low (£18,250 = 2.8mo)", status: "warn" },
                        { label: "Monthly surplus",                value: "+£1,026/mo",             status: "pass" },
                        { label: "5-year reserve duration",        value: "Sustained",              status: "pass" },
                      ],
                    },
                    {
                      label: "Party B", score: 71, color: "#10B981",
                      drivers: [
                        { label: "Housing cost (renting)",         value: "Manageable",             status: "pass" },
                        { label: "Liquid capital post-settlement", value: "Strong (£89,750)",        status: "pass" },
                        { label: "Monthly surplus",                value: "+£652/mo",               status: "pass" },
                        { label: "5-year reserve duration",        value: "Sustained",              status: "pass" },
                      ],
                    },
                  ].map(party => (
                    <div key={party.label}>
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-xs text-gray-500 font-medium">{party.label}</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${party.score}%`, background: party.color }} />
                          </div>
                          <span className="text-sm font-bold tabular-nums" style={{ color: party.color }}>{party.score}/100</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {party.drivers.map(d => (
                          <div key={d.label} className="flex justify-between text-xs gap-2">
                            <span className="text-gray-500">{d.label}</span>
                            <span className={`font-medium ${d.status === "pass" ? "text-emerald-600" : d.status === "warn" ? "text-amber-600" : "text-rose-600"}`}>{d.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 italic mt-3">Illustrative model output. Not a suitability or lending assessment.</p>
              </Collapsible>
              <Collapsible title="Reserve Duration (5-Year Projection)">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {[
                    { label: "Party A", start: "£18,250", lowest: "£18,250", status: "Sustained", note: "Capital grows slowly from a low base. An unexpected cost in Year 1 or 2 could place significant pressure on finances.", green: true },
                    { label: "Party B", start: "£89,750", lowest: "£89,750", status: "Sustained", note: "Positive trajectory throughout. Monthly surplus allows for continued capital growth.", green: true },
                  ].map(p => (
                    <div key={p.label}>
                      <p className="font-medium text-gray-700 mb-1">{p.label}</p>
                      <div className="text-xs space-y-0.5 mb-1">
                        <div className="flex justify-between"><span className="text-gray-500">Starting Liquid Capital</span><span className="tabular-nums font-medium">{p.start}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Lowest Projected Capital</span><span className="tabular-nums font-medium">{p.lowest}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Year of Depletion</span><span className={`font-medium ${p.green ? "text-emerald-600" : "text-amber-600"}`}>{p.status}</span></div>
                      </div>
                      <p className="text-[10px] text-gray-400 italic">{p.note}</p>
                    </div>
                  ))}
                </div>
              </Collapsible>
              <Collapsible title="Monthly Financial Position">
                <div className="grid sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Party A</p>
                    <p className="text-gray-500">Net Monthly Income: £6,518/mo</p>
                    <p className="text-gray-500">Mortgage Obligation: £3,280/mo</p>
                    <p className="text-gray-500">Child Maintenance (payable): (£412/mo)</p>
                    <p className="text-gray-500">Total Expenses (non-housing): (£1,800/mo)</p>
                    <p className="font-semibold text-emerald-600">Monthly Surplus: +£1,026/mo</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Party B</p>
                    <p className="text-gray-500">Net Monthly Income: £3,690/mo</p>
                    <p className="text-gray-500">Child Maintenance (received): +£412/mo</p>
                    <p className="text-gray-500">Rent (estimated): (£1,650/mo)</p>
                    <p className="text-gray-500">Total Expenses (non-housing): (£1,800/mo)</p>
                    <p className="font-semibold text-emerald-600">Monthly Surplus: +£652/mo</p>
                  </div>
                </div>
              </Collapsible>
              <Collapsible title="Indicative Lending Capacity Benchmark">
                <div className="text-sm text-gray-600 space-y-0.5">
                  <p className="text-amber-600 font-medium">Borderline — approaching lending threshold</p>
                  <p>Mortgage Requirement: £590,000</p>
                  <p>Income Multiple: 4.7× <span className="text-xs text-gray-400">(benchmark: 4.5× max)</span></p>
                  <p>Available Deposit: £71,500 (11%)</p>
                  <p>Mortgage-to-Net-Income Ratio: 50%</p>
                  <p className="text-xs text-gray-400 mt-1">Party A's gross income of £126,000 supports an estimated solo borrowing capacity of approximately £567,000. The outstanding balance of £590,000 exceeds this threshold by approximately £23,000. A capital reduction or additional income evidence may be required before lender approval of a sole transfer.</p>
                  <p className="text-xs text-gray-400 italic mt-1">Generalised income multiple illustration only. Not a lending assessment, mortgage advice, or credit approval indication.</p>
                </div>
              </Collapsible>
              <div className="pt-1 border-t border-gray-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Scenario Considerations</h4>
                <p className="text-[10px] text-gray-400 italic mb-2">Structured reflection points based on modelled outputs. Not recommendations or advice.</p>
                <ul className="space-y-1">
                  {[
                    "Mortgage obligations represent 50% of Party A's net monthly income. Income sustainability over the next 3–5 years may warrant further assessment.",
                    "Party A's liquid capital of £18,250 covers approximately 2.8 months of net income. Contingency planning may warrant further assessment.",
                    "The mortgage balance slightly exceeds Party A's estimated solo borrowing capacity by £23,000. Formal lender affordability assessment would be required before agreeing this arrangement.",
                    "Party A's total net worth is concentrated primarily in property (85%). Reduced liquidity may be a relevant consideration for short-term financial flexibility.",
                  ].map((c, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                      <span className="text-gray-400 mt-0.5 shrink-0">{i + 1}.</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Assumption Review Prompts ── */}
          <section>
            <SectionHeader title="Assumption Review Prompts" description="Questions to help stress-test the key assumptions — not recommendations, just structured prompts." />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
              {[
                { q: "Are income projections stable?", a: "The model assumes Party A earns £126,000/yr and Party B earns £60,000/yr. Income stability over the projection period may warrant independent verification." },
                { q: "Are expense projections conservative?", a: "Expenses are inflated at 2.0% per year. Post-separation costs often differ materially from current spending patterns — particularly for the party moving into rented accommodation." },
                { q: "Would a 1% interest rate increase materially affect comfort?", a: "The current model uses a 4.5% mortgage rate. Under A Keeps Home, a 1% rate rise would increase the monthly mortgage to approximately £3,560/mo — reducing Party A's monthly surplus to approximately £746/mo." },
                { q: "Have all material assets and liabilities been included?", a: "Additional accounts, liabilities, or income sources not included in this model may be relevant to the overall financial position. Early repayment charges on the mortgage are not separately modelled." },
              ].map(({ q, a }) => (
                <div key={q} className="text-sm text-gray-600">
                  <p className="font-medium text-gray-700 mb-0.5">{q}</p>
                  <p className="text-xs text-gray-500">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Assumptions & Methodology ── */}
          <section>
            <SectionHeader title="Assumptions & Methodology" description="The specific rates and parameters used in this model — provided for reference and professional review." />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0.5">
                {[
                  ["Asset Settlement Ratio",        "50% / 50%"],
                  ["Pension Settlement Ratio",       "50% / 50%"],
                  ["Mortgage Interest Rate",         "4.5% p.a."],
                  ["Mortgage Term",                  "25 years remaining"],
                  ["Monthly Repayment (£590k)",      "≈ £3,280/mo"],
                  ["Projection Period",              "10 years"],
                  ["Inflation / Growth Rate",        "2.0% p.a."],
                  ["Tax Model",                      "UK 2026/27 (HMRC)"],
                  ["Sale Costs Estimate",            "2% of property value"],
                  ["Income Multiple (affordability)", "4.5× gross income"],
                  ["Child Maintenance",              "CMS 2-child rate applied"],
                  ["Deferred Sale Growth Period",    "3 years (Mesher Order)"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500 text-xs">{label}</span>
                    <span className="text-gray-800 text-xs font-medium tabular-nums">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Glossary ── */}
          <section>
            <SectionHeader title="Glossary of Key Terms" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 grid gap-2 text-xs">
              {[
                ["Liquid Capital",                       "Cash, savings, ISAs, and investments that can be accessed or realised within a short timeframe."],
                ["Net Equity",                           "The value of property after deducting the outstanding mortgage balance and estimated selling costs."],
                ["Equity Transfer Obligation",           "The lump sum payable by the party retaining the property to compensate the departing party for their share of net equity."],
                ["Reserve Duration",                     "The projected period for which liquid reserves can sustain expenditure, measured in years."],
                ["Cashflow Resilience Indicator (CRI)",  "A composite indicator reflecting cashflow sustainability and lending capacity benchmarks. Not a suitability or lending assessment."],
                ["CETV",                                 "Cash Equivalent Transfer Value — the estimated lump sum value of a pension for comparison and division purposes."],
                ["Income Multiple",                      "The ratio of mortgage required to gross annual income, used as a generalised lending capacity benchmark."],
              ].map(([term, def]) => (
                <div key={term}><span className="font-semibold text-gray-800">{term}:</span> <span className="text-gray-600">{def}</span></div>
              ))}
            </div>
          </section>

        </div>

        {/* Sticky CTA footer */}
        <div className="sticky bottom-0 border-t border-gray-100 bg-white/97 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Ready to model your actual figures?</p>
            <p className="text-xs text-gray-500">Your real report uses your numbers, not these fictional ones. Free to start — no sign-up needed.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={onClose} data-testid="button-close-modal-footer">
              Close preview
            </Button>
            <Button
              onClick={handleStart}
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-md shadow-gold/20"
              data-testid="button-start-from-modal"
            >
              Start my report — free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
