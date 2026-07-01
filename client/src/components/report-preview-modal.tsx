import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  X, ArrowRight, AlertTriangle, TrendingUp, TrendingDown, Sparkles,
  BookOpen, AlertCircle, FileSearch, Scale, Home, PiggyBank,
  Wallet, Users, List, ChevronDown, ChevronUp, Sliders, Activity, Shield,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { RadialGauge } from "@/components/charts/radial-gauge";
import { chartTheme, fmtK, gaugeColor, densifyProjection, hashSeed } from "@/lib/chart-theme";
import { DemoCarousel } from "@/components/demo-dashboards";
import { ScenarioLeaderboard } from "@/components/scenario-leaderboard";
import type { ConsoleScenario } from "@/components/settlement-console";
import { PRODUCT_NAMES } from "@/lib/product-copy";
import { REPORT_FACTOR_TEASERS } from "@/lib/settlement-factors";

interface ReportPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

function SampleBadge() {
  return (
    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
        Sample: Reports 1 &amp; 2 · fictional figures
      </div>
      <span className="text-[10px] text-muted-foreground sm:max-w-[14rem] leading-snug">
        {PRODUCT_NAMES.layerBeforeAgree} not included in this sample
      </span>
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
  { id: "S1", name: "Sell & Split",  short: "Sell & Split", capA: 190_553, capB: 232_897, surA: 1333, surB: -500, criA: 76, criB: 48, projection: [220_450, 214_600, 207_800, 198_900, 188_400, 176_900] },
  { id: "S2", name: "A Keeps Home",  short: "A Keeps",      capA: 264_350, capB: 232_897, surA: -491, surB: -500, criA: 32, criB: 48, projection: [121_247, 96_400, 70_800, 45_200, 20_100, -4_800] },
  { id: "S3", name: "B Keeps Home",  short: "B Keeps",      capA: 190_553, capB: 284_650, surA: 1333, surB: -2324, criA: 76, criB: 18, projection: [99_203, 83_700, 66_900, 49_200, 30_100, 9_400] },
  { id: "S4", name: "Deferred Sale", short: "Deferred",     capA: 205_000, capB: 250_000, surA: 1333, surB: -980, criA: 70, criB: 38, projection: [136_000, 124_500, 111_700, 98_400, 83_600, 67_800] },
];

const SAMPLE_COMPOSITION = [
  { label: "Property equity", value: 158_450, color: "#A78BFA" },
  { label: "Pension (CETV)",  value: 203_000, color: "#22D3EE" },
  { label: "Cash & savings",  value: 62_000,  color: "#C9A84C" },
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
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} preserveAspectRatio="none">
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
  { num: "", label: "Executive Overview", layer: "analyser" as const },
  { num: "", label: PRODUCT_NAMES.layerScenarios, layer: "analyser" as const },
  { num: "1.", label: "Financial Position", layer: "analyser" as const },
  { num: "2.", label: "Income & Taxation", layer: "analyser" as const },
  { num: "3.", label: "Projected Expenses", layer: "analyser" as const },
  { num: "4.", label: "Scenario Comparison", layer: "analyser" as const },
  { num: "5.", label: "Sell & Split — Detail", layer: "analyser" as const },
  { num: "6.", label: "A Keeps Home — Detail", layer: "analyser" as const },
  { num: "", label: PRODUCT_NAMES.layerStandsOut, layer: "narrative" as const },
  { num: "", label: PRODUCT_NAMES.layerBeforeAgree, layer: "prep" as const, locked: true },
  { num: "", label: "Assumption Review", layer: "analyser" as const },
  { num: "", label: "Assumptions & Methodology", layer: "analyser" as const },
  { num: "", label: "Glossary", layer: "analyser" as const },
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
                  { label: "Total Assets",    value: "£750,000", color: "text-cyan-300" },
                  { label: "Net Worth",        value: "£422,500", color: "text-gold" },
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
                  <BookOpen className="w-3 h-3" /> {PRODUCT_NAMES.layerScenarios}
                </div>
                <div className="flex items-center gap-1.5 bg-gold/15 border border-gold/25 text-gold text-[10px] font-semibold px-3 py-1 rounded-full">
                  <FileSearch className="w-3 h-3" /> {PRODUCT_NAMES.layerStandsOut}
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
              {TOC_ITEMS.map(({ num, label, locked }) => (
                <div key={label} className={`flex items-baseline gap-1.5 py-0.5 text-xs ${locked ? "text-amber-700/80" : "text-gray-500"}`}>
                  {num && <span className="text-[10px] text-gray-400 w-5 shrink-0 tabular-nums">{num}</span>}
                  <span className={`leading-snug ${!num ? "pl-5" : ""} ${locked ? "italic" : ""}`}>
                    {label}
                    {locked ? " · topics visible, detail locked in sample" : ""}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-1">
                {PRODUCT_NAMES.layerBeforeAgree} — not included in this sample
              </p>
              <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                Answers the questions in your head — how much your share may be, what to verify, and what to ask before agreeing — personalised from your figures when you unlock.
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700/80 mb-2">
                Topic headings only (detail locked)
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {REPORT_FACTOR_TEASERS.map((topic) => (
                  <li key={topic} className="text-[10px] text-gray-500 flex gap-1.5">
                    <span className="text-amber-500 shrink-0">◦</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Executive Overview ── */}
          <section>
            <SectionHeader title="Executive Overview" description="A plain-English summary of the estate, income position, and what the modelling shows across all settlement options." />
            {/* At a Glance */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: Wallet,   label: "Non-pension pool",    value: "£220,450",             sub: "Net home equity + liquid assets",      color: "text-cyan-600",   bg: "bg-cyan-50",   border: "border-cyan-100" },
                { icon: Users,    label: "Gross income split",  value: "£78,000 vs £34,000",   sub: "Party A vs Party B (annual)",          color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
                { icon: TrendingUp, label: "Take-home pay",     value: "£6,518/mo · £3,690/mo", sub: "After estimated tax & NI",            color: "text-emerald-600",bg: "bg-emerald-50",border: "border-emerald-100" },
                { icon: Home,     label: "Property LTV",        value: "64%",                  sub: "Manageable, but affordability still matters", color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-100" },
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
                  body: "This report presents an illustrative financial analysis of a marital estate comprising £750,000 in total assets, offset by £327,500 in liabilities, producing a combined net worth of £422,500. The primary residence, valued at £485,000, carries an outstanding mortgage of £312,000, leaving net equity of £158,450 after estimated sale costs. Liquid savings and investments add £62,000, creating a non-pension settlement pool of £220,450. Pension provision totals £203,000 by Cash Equivalent Transfer Value (CETV) and is treated separately from immediately available capital.",
                },
                {
                  heading: "Income & Tax Position",
                  body: "Combined gross household income is £112,000 per annum. Party A earns more than twice Party B's income (£78,000 versus £34,000 gross), creating a material difference in borrowing capacity and monthly resilience. Net incomes used in this sample are £55,000 (Party A) and £28,000 (Party B) per annum. Child maintenance is estimated at £168.25 per week and should be checked against the final care pattern and income evidence.",
                },
                {
                  heading: "Scenario Analysis",
                  body: "The analysis models settlement scenarios under a 45/55 non-pension asset division assumption, with the larger share directed to Party B. Under Sell & Split, Party A receives £99,203 liquid capital and Party B receives £121,247. Keep-home scenarios create stronger pressure: Party A faces a £59,248 buyout funding gap, while Party B's estimated solo borrowing capacity (£153,000) is well below the £312,000 mortgage balance.",
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
              <Sparkles className="w-3 h-3" /> {PRODUCT_NAMES.layerStandsOut}
            </div>
            <div className="flex-1 border-t border-dashed border-gray-200" />
          </div>

          {/* ── Settlement Reality Check Report ── */}
          <section>
            <div className="bg-gradient-to-r from-[hsl(220_52%_22%)] to-[hsl(220_52%_16%)] rounded-xl px-5 py-4 mb-5 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">{PRODUCT_NAMES.layerStandsOut}</h3>
                  <p className="text-[10px] text-white/40 mt-0.5">Plain-English position check generated from your modelled figures</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full shrink-0">Confidence: Medium</span>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">

              <div className="border-l-4 border-l-blue-800/40 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Plain-English Overview</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The total assets in this model amount to £750,000 with liabilities of £327,500, leaving net home equity of £158,450 after sale costs. Liquid assets before selling the home total £62,000, creating a non-pension settlement pool of £220,450. Party A has a higher income (£78,000 gross) compared to Party B (£34,000 gross), and the model shows that keeping the home can quickly create cashflow and funding pressure despite the property having real equity.
                </p>
                <p className="text-xs text-gray-400 italic mt-2">Note: This is an illustrative summary based on fictional figures. Not legal, tax, or financial advice.</p>
              </div>

              <div className="border-l-4 border-l-yellow-500/50 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">What Stands Out</p>
                <ul className="space-y-2">
                  {[
                    "The outstanding mortgage is £312,000 on a £485,000 property, producing a 64% loan-to-value ratio and £158,450 of net equity after estimated sale costs.",
                    "Party A's net monthly income is approximately £4,583, significantly higher than Party B's £2,333.",
                    "Party B starts with a negative monthly budget position of around £500 before any mortgage costs, while Party A has a positive surplus of around £1,333.",
                    "Pension CETVs differ materially: £155,000 for Party A versus £48,000 for Party B, before the modelled pension split.",
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
                    "Party B faces a £37,203 funding gap to keep the home and the £1,824 monthly mortgage exceeds their estimated solo borrowing capacity.",
                    "Party A can support the existing mortgage on a simple income-multiple check, but keeping the home still creates a £59,248 buyout funding gap and modelled reserve depletion in year 1.",
                    "Party B's reserves deplete in year 8 under Sell & Split and in year 1 if Party B keeps the home, showing how a larger headline asset position can still leave cashflow pressure.",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-rose-400 shrink-0 mt-0.5 font-bold">!</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-l-yellow-500/50 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-yellow-600" /> {PRODUCT_NAMES.layerBeforeAgree}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Missing values",
                      items: [
                        "More precise post-separation expense details to replace starting estimates.",
                        "Verification of property sale costs, transfer fees, credit-card and car-finance repayment plans.",
                      ],
                    },
                    {
                      label: "Left-short risk",
                      items: [
                        "Party B's reserves deplete by year 8 or year 1 depending on the scenario.",
                        "Party A's reserves deplete in year 1 if they keep the home because the buyout and mortgage remove the cash buffer.",
                      ],
                    },
                    {
                      label: "Offer trade-offs",
                      items: [
                        "Party A trades liquid capital for home equity if keeping the property.",
                        "Party B receives a larger modelled pension/capital allocation, but mortgage affordability and monthly deficit remain pressure points.",
                      ],
                    },
                    {
                      label: "Questions before agreeing",
                      items: [
                        "Can the buyout funding gaps (£59,248 for Party A, £37,203 for Party B) be realistically covered?",
                        "How will child maintenance, actual living costs and debt repayments affect the monthly budgets?",
                      ],
                    },
                  ].map(group => (
                    <div key={group.label} className="rounded-lg border border-gray-100 bg-gray-50/70 p-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1.5">{group.label}</p>
                      <ul className="space-y-1">
                        {group.items.map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                            <span className="text-yellow-600 shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-l-cyan-400/50 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Questions for Professionals</p>
                <div className="space-y-5">
                  {[
                    {
                      icon: Scale, color: "text-primary/60", label: "Solicitor / Mediator",
                      questions: [
                        "Given Party A's gross income of £78,000 and Party B's £34,000, how might the income disparity affect maintenance or settlement discussions?",
                        "How should the pension CETVs (£155,000 for Party A and £48,000 for Party B) be considered alongside the capital split?",
                        "How can the buyout funding gaps of £59,248 and £37,203 be addressed legally and practically?",
                      ],
                    },
                    {
                      icon: Home, color: "text-emerald-600", label: "Mortgage Broker",
                      questions: [
                        "Is Party A's estimated borrowing capacity of around £351,000 enough to cover the £312,000 mortgage plus any buyout borrowing?",
                        "Given Party B's estimated borrowing capacity of around £153,000, what realistic mortgage options exist if they want to keep or rehouse?",
                        "How sustainable is a £1,824 monthly mortgage payment against net monthly incomes of £4,583 and £2,333?",
                      ],
                    },
                    {
                      icon: PiggyBank, color: "text-violet-600", label: "Pension Expert",
                      questions: [
                        "How can pension CETVs of £155,000 for Party A and £48,000 for Party B be divided or offset alongside housing needs?",
                        "Are there alternative pension sharing options that improve Party B's long-term position without worsening short-term cashflow?",
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
                  This sample model has medium confidence. Core property value, mortgage balance, incomes and pension CETVs are included, but post-separation expenses use starting estimates rather than actual figures. Credit-card and car-finance repayment plans, precise transaction costs, and the full effect of child maintenance should be checked before relying on the runway and affordability figures.
                </p>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic mt-3">
              This {PRODUCT_NAMES.layerStandsOut} is illustrative only. It is not legal, tax, or financial advice. Always consult qualified professionals before making financial decisions.
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
                  <Row label="Family Home" value="£485,000" sub="primary residence" />
                  <Row label="Party A Pension (CETV)" value="£155,000" />
                  <Row label="Party B Pension (CETV)" value="£48,000" />
                  <Row label="Joint Savings" value="£38,000" />
                  <Row label="Investments (ISA)" value="£24,000" />
                  <Row label="Total Assets" value="£750,000" bold />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Liabilities & Net Position</p>
                  <Row label="Outstanding Mortgage" value="(£312,000)" red />
                  <Row label="Credit Cards & Car Finance" value="(£15,500)" red />
                  <Row label="Total Liabilities" value="(£327,500)" bold red />
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <Row label="Combined Net Worth" value="£422,500" bold />
                    <Row label="Net Property Equity (est. sale costs)" value="£158,450" />
                    <Row label="Non-Pension Settlement Pool" value="£220,450" bold sub="equity + liquid savings" green />
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
                  { label: "Party A", gross: "£78,000", allowance: "£12,570", note: "", tax: "(est.)", ni: "(est.)", net: "£55,000", monthly: "≈ £4,583" },
                  { label: "Party B", gross: "£34,000", allowance: "£12,570", note: "", tax: "(est.)", ni: "(est.)", net: "£28,000", monthly: "≈ £2,333" },
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
            <SectionHeader title="4. Scenario Comparison — Executive Summary" description="Side-by-side view of all settlement options: capital each party receives, mortgage obligations, and 10-year reserve sustainability." />
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
                      { label: "Liquid Capital — A",      values: ["£99,203",   "£0",         "£99,203",    "£74,000"] },
                      { label: "Liquid Capital — B",      values: ["£121,247",  "£121,247",   "£0",         "£62,000"] },
                      { label: "Pension (CETV) — A",      values: ["£91,350",   "£91,350",    "£91,350",    "£91,350"] },
                      { label: "Pension (CETV) — B",      values: ["£111,650",  "£111,650",   "£111,650",   "£111,650"] },
                      { label: "Total Net Position — A",  values: ["£190,553",  "£264,350†",  "£190,553",   "£205,000‡"], bold: true },
                      { label: "Total Net Position — B",  values: ["£232,897",  "£232,897",   "£284,650†",  "£250,000‡"], bold: true },
                      { label: "Monthly Mortgage — A",    values: ["None",      "£1,824",     "None",       "None"] },
                      { label: "Monthly Mortgage — B",    values: ["None",      "None",       "£1,824",     "£1,824"] },
                      { label: "Monthly Surplus — A",     values: ["+£1,333",   "(£491)",     "+£1,333",    "+£1,333"], mixed: true },
                      { label: "Monthly Surplus — B",     values: ["(£500)",    "(£500)",     "(£2,324)",   "(£980)"],  mixed: true },
                      { label: "CRI Score — A",           values: ["76/100",    "32/100",     "76/100",     "70/100"] },
                      { label: "CRI Score — B",           values: ["48/100",    "48/100",     "18/100",     "38/100"] },
                      { label: "10-Yr Reserves — A",      values: ["Sustained", "Yr 1 depletion", "Sustained", "Sustained"], sustainMixed: true },
                      { label: "10-Yr Reserves — B",      values: ["Yr 8 depletion", "Yr 8 depletion", "Yr 1 depletion", "Yr 4 depletion"], sustainMixed: true },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 ${row.bold ? "bg-gray-50" : i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                        <td className={`py-1.5 px-2 text-gray-600 ${row.bold ? "font-semibold" : ""}`}>{row.label}</td>
                        {row.values.map((v, vi) => (
                          <td key={vi} className={`py-1.5 px-2 text-right tabular-nums ${row.bold ? "font-semibold" : ""} ${
                            ("green" in row && row.green) ? "text-emerald-700" :
                            ("mixed" in row && row.mixed) ? (v.startsWith("(") ? "text-rose-600" : "text-emerald-700") :
                            ("sustain" in row && row.sustain) ? "text-emerald-600" :
                            ("sustainMixed" in row && row.sustainMixed) ? (v.includes("Yr") ? "text-amber-600" : "text-emerald-600") :
                            ""
                          }`}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-gray-400 mt-3">
                † Includes £173,000 gross home equity before sale costs. ‡ Illustrative deferred-sale values are estimated for display only.
              </p>
            </div>
          </section>

          {/* ── 5. Sell & Split — Detail ── */}
          <section>
            <SectionHeader title="5. Sell & Split — Detail" accent="#2563EB" description="A full breakdown of this settlement option: starting positions, monthly cashflow, sustainability, and key indicators." />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
              <StatStrip color="#2563EB" items={[
                { label: "A — Starting Capital", value: "£99,203" },
                { label: "B — Starting Capital", value: "£121,247" },
                { label: "A — Monthly Surplus",  value: "+£1,333/mo" },
                { label: "B — Monthly Surplus",  value: "(£500/mo)" },
                { label: "A CRI Score",           value: "76/100" },
                { label: "B CRI Score",           value: "48/100" },
              ]} />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Summary</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Under Sell & Split, the property is sold and the non-pension settlement pool is split 45/55. Party A receives £99,203 of liquid capital and Party B receives £121,247, with neither party retaining the mortgage. Party A's income supports a monthly surplus, but Party B remains around £500 short each month before any further adjustments, which is why the report flags this as a useful negotiation and professional-advice point.
                </p>
              </div>
              <Collapsible title="Source of Funds Breakdown" defaultOpen>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Party A", color: "text-blue-600",
                      rows: [
                        { l: "Share of net home equity (45%)", v: "£71,303" },
                        { l: "Share of liquid assets (45%)",   v: "£27,900" },
                        { l: "Pension allocation",             v: "£91,350" },
                      ],
                      net: "£99,203",
                    },
                    {
                      label: "Party B", color: "text-emerald-600",
                      rows: [
                        { l: "Share of net home equity (55%)", v: "£87,148" },
                        { l: "Share of liquid assets (55%)",   v: "£34,100" },
                        { l: "Pension allocation",             v: "£111,650" },
                      ],
                      net: "£121,247",
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
                    { label: "Party A", net: "£4,583/mo", cms: "Payable: estimated", expenses: "(£3,250/mo)", surplus: "+£1,333/mo", green: true },
                    { label: "Party B", net: "£2,333/mo", cms: "Received: estimated", expenses: "(£2,833/mo)", surplus: "(£500/mo)", green: false },
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
              <Collapsible title="Reserve Duration (10-Year Projection)">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {[
                    { label: "Party A", start: "£99,203", lowest: "£99,203", status: "Sustained", green: true },
                    { label: "Party B", start: "£121,247", lowest: "£0", status: "Yr 8 depletion", green: false },
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
                { label: "A — Starting Capital", value: "£0" },
                { label: "B — Starting Capital", value: "£121,247" },
                { label: "A — Monthly Surplus",  value: "(£491/mo)" },
                { label: "B — Monthly Surplus",  value: "(£500/mo)" },
                { label: "A CRI Score",           value: "32/100" },
                { label: "B CRI Score",           value: "48/100" },
              ]} />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Summary</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Party A keeps the family home, retains £173,000 of gross home equity and takes on the £1,824 monthly mortgage. The headline net position looks higher for Party A, but the model shows no liquid capital left after the buyout and a £59,248 funding gap. This is exactly the kind of option that can look attractive on paper while creating early reserve depletion.
                </p>
              </div>
              <Collapsible title="Source of Funds Breakdown" defaultOpen>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Party A", color: "text-emerald-600",
                      rows: [
                        { l: "Liquid assets after buyout",           v: "£0" },
                        { l: "Buyout funding gap",                   v: "(£59,248)", red: true },
                        { l: "Home equity retained (in property)",   v: "£173,000", note: true },
                        { l: "Pension allocation",                   v: "£91,350" },
                      ],
                      net: "£0",
                    },
                    {
                      label: "Party B", color: "text-blue-600",
                      rows: [
                        { l: "Liquid capital received",      v: "£121,247" },
                        { l: "Pension allocation",           v: "£111,650" },
                      ],
                      net: "£121,247",
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
                      label: "Party A", score: 32, color: "#F43F5E",
                      drivers: [
                        { label: "Mortgage-to-net-income ratio",   value: "40% (£1,824 of £4,583)", status: "warn" },
                        { label: "Liquid capital post-settlement", value: "None after buyout",      status: "fail" },
                        { label: "Monthly surplus",                value: "(£491/mo)",              status: "fail" },
                        { label: "10-year reserve duration",       value: "Yr 1 depletion",         status: "fail" },
                      ],
                    },
                    {
                      label: "Party B", score: 48, color: "#F59E0B",
                      drivers: [
                        { label: "Housing cost (renting)",         value: "Needs testing",          status: "warn" },
                        { label: "Liquid capital post-settlement", value: "£121,247",               status: "pass" },
                        { label: "Monthly surplus",                value: "(£500/mo)",              status: "fail" },
                        { label: "10-year reserve duration",       value: "Yr 8 depletion",         status: "warn" },
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
              <Collapsible title="Reserve Duration (10-Year Projection)">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {[
                    { label: "Party A", start: "£0", lowest: "(£4,800)", status: "Yr 1 depletion", note: "The property is retained, but liquid reserves are effectively exhausted immediately.", green: false },
                    { label: "Party B", start: "£121,247", lowest: "£0", status: "Yr 8 depletion", note: "Capital lasts longer, but the monthly deficit steadily erodes the cash buffer.", green: false },
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
                    <p className="text-gray-500">Net Monthly Income: £4,583/mo</p>
                    <p className="text-gray-500">Mortgage Obligation: £1,824/mo</p>
                    <p className="text-gray-500">Child Maintenance: estimated separately</p>
                    <p className="text-gray-500">Total Expenses: (£3,250/mo)</p>
                    <p className="font-semibold text-rose-600">Monthly Surplus: (£491/mo)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Party B</p>
                    <p className="text-gray-500">Net Monthly Income: £2,333/mo</p>
                    <p className="text-gray-500">Child Maintenance: estimated separately</p>
                    <p className="text-gray-500">Rent / housing: to confirm</p>
                    <p className="text-gray-500">Total Expenses: (£2,833/mo)</p>
                    <p className="font-semibold text-rose-600">Monthly Surplus: (£500/mo)</p>
                  </div>
                </div>
              </Collapsible>
              <Collapsible title="Indicative Lending Capacity Benchmark">
                <div className="text-sm text-gray-600 space-y-0.5">
                  <p className="text-amber-600 font-medium">Mortgage plausible, buyout funding not solved</p>
                  <p>Mortgage Requirement: £312,000</p>
                  <p>Income Multiple: 4.0× <span className="text-xs text-gray-400">(benchmark: 4.5× max)</span></p>
                  <p>Buyout Funding Gap: £59,248</p>
                  <p>Mortgage-to-Net-Income Ratio: 40%</p>
                  <p className="text-xs text-gray-400 mt-1">Party A's gross income of £78,000 supports an estimated borrowing capacity of approximately £351,000, which covers the existing mortgage but may not cover the mortgage plus buyout funding. Formal lender assessment would be needed.</p>
                  <p className="text-xs text-gray-400 italic mt-1">Generalised income multiple illustration only. Not a lending assessment, mortgage advice, or credit approval indication.</p>
                </div>
              </Collapsible>
              <div className="pt-1 border-t border-gray-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Scenario Considerations</h4>
                <p className="text-[10px] text-gray-400 italic mb-2">Structured reflection points based on modelled outputs. Not recommendations or advice.</p>
                <ul className="space-y-1">
                  {[
                    "Mortgage obligations represent around 40% of Party A's net monthly income before other costs.",
                    "Party A has no liquid capital left after the buyout in this sample, so contingency planning becomes central.",
                    "The existing mortgage may be supportable, but the £59,248 buyout funding gap needs a realistic source.",
                    "Party A's value is concentrated in the property, reducing short-term flexibility even where total net position looks higher.",
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
                { q: "Are income projections stable?", a: "The model assumes Party A earns £78,000/yr and Party B earns £34,000/yr. Income stability over the projection period may warrant independent verification." },
                { q: "Are expense projections conservative?", a: "Expenses are inflated at 2.0% per year. Post-separation costs often differ materially from current spending patterns — particularly for the party moving into rented accommodation." },
                { q: "Would a 1% interest rate increase materially affect comfort?", a: "The current model uses a 4.5% mortgage rate. Under A Keeps Home, a 1% rate rise would increase the monthly mortgage and deepen Party A's projected deficit." },
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
                  ["Asset Settlement Ratio",        "45% / 55%"],
                  ["Pension Settlement Ratio",       "45% / 55%"],
                  ["Mortgage Interest Rate",         "4.5% p.a."],
                  ["Mortgage Term",                  "25 years remaining"],
                  ["Monthly Repayment (£312k)",      "≈ £1,824/mo"],
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
