import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ChevronUp, X, Home, Wallet, Landmark, Check } from "lucide-react";
import { useAppStore } from "@/hooks/use-store";
import { chartTheme } from "@/lib/chart-theme";

interface LivePoolConsoleProps {
  currentStep: number;
  stages: { label: string; steps: number[]; stageNum: number }[];
}

function fmtPool(n: number) {
  if (n <= 0) return "—";
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(2)}m`;
  if (n >= 1000) return `£${Math.round(n / 1000)}k`;
  return `£${Math.round(n)}`;
}

function fmtFull(n: number) {
  if (n <= 0) return "£0";
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

function usePoolFigures() {
  const { assets, liabilities } = useAppStore();
  return useMemo(() => {
    const propertyValue = assets
      .filter((a) => a.category === "primary_home" || a.category === "other_property")
      .reduce((s, a) => s + (a.currentValue ?? 0), 0);
    const mortgageBalance = liabilities
      .filter((l) => l.category === "mortgage")
      .reduce((s, l) => s + (l.balance ?? 0), 0);
    const propertyEquity = Math.max(0, propertyValue - mortgageBalance);
    const liquidAssets = assets
      .filter((a) => !["primary_home", "other_property", "pension"].includes(a.category))
      .reduce((s, a) => s + (a.currentValue ?? 0), 0);
    const pensions = assets
      .filter((a) => a.category === "pension")
      .reduce((s, a) => s + (a.cetv ?? a.currentValue ?? 0), 0);
    const otherDebts = liabilities
      .filter((l) => l.category !== "mortgage")
      .reduce((s, l) => s + (l.balance ?? 0), 0);
    const combinedPool = propertyEquity + liquidAssets + pensions - otherDebts;
    return { propertyEquity, liquidAssets, pensions, otherDebts, combinedPool };
  }, [assets, liabilities]);
}

function PoolDial({ value, max }: { value: number; max: number }) {
  const safeMax = Math.max(max, 100_000);
  const pct = Math.min(1, Math.max(0, value / safeMax));
  const size = 132;
  const cx = size / 2;
  const cy = size / 2 + size * 0.06;
  const r = size * 0.4;
  const sw = size * 0.09;
  const startA = Math.PI * 0.85;
  const endA = Math.PI * 2.15;
  const sweep = endA - startA;
  const fillA = startA + sweep * pct;

  const arc = (from: number, to: number) => {
    const sx = cx + r * Math.cos(from);
    const sy = cy + r * Math.sin(from);
    const ex = cx + r * Math.cos(to);
    const ey = cy + r * Math.sin(to);
    const large = Math.abs(to - from) > Math.PI ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size * 0.78} viewBox={`0 0 ${size} ${size * 0.78}`}>
        <defs>
          <linearGradient id="pool-dial-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={chartTheme.color.gold} stopOpacity={0.5} />
            <stop offset="100%" stopColor={chartTheme.color.gold} stopOpacity={1} />
          </linearGradient>
        </defs>
        <path d={arc(startA, endA)} stroke="rgba(15,27,45,0.07)" strokeWidth={sw} fill="none" strokeLinecap="round" />
        <motion.path
          d={arc(startA, fillA)}
          stroke="url(#pool-dial-grad)"
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: chartTheme.ease }}
          style={{ filter: "drop-shadow(0 0 6px rgba(201,168,76,0.35))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <p
          className="text-xl font-bold tabular-nums leading-none"
          style={{ color: chartTheme.color.gold, fontFamily: chartTheme.font.serif, letterSpacing: "-0.02em" }}
          data-testid="text-pool-total"
        >
          {fmtPool(value)}
        </p>
        <p className="text-[9px] uppercase tracking-widest text-[#1a3357]/60 font-semibold mt-1">Combined pool</p>
      </div>
    </div>
  );
}

function CategoryBar({ label, value, max, icon: Icon, color }: { label: string; value: number; max: number; icon: typeof Home; color: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] text-[#1a3357]/70 font-medium flex items-center gap-1">
          <Icon className="w-2.5 h-2.5" style={{ color }} />
          {label}
        </span>
        <span className="text-[10px] font-mono font-semibold text-[#1a3357] tabular-nums">{fmtPool(value)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.55, ease: chartTheme.ease }}
        />
      </div>
    </div>
  );
}

function StagesStrip({ currentStep, stages }: { currentStep: number; stages: LivePoolConsoleProps["stages"] }) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {stages.map((s) => {
        const complete = s.steps.every((step) => step < currentStep);
        const active = s.steps.includes(currentStep);
        return (
          <div
            key={s.stageNum}
            className={`relative rounded-md border px-1.5 py-1 text-center transition-all ${
              complete
                ? "bg-gold/10 border-gold/40"
                : active
                ? "bg-white border-gold shadow-[0_0_0_2px_rgba(201,168,76,0.18)]"
                : "bg-white/40 border-slate-200"
            }`}
          >
            {complete && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold flex items-center justify-center">
                <Check className="w-2 h-2 text-white" strokeWidth={3} />
              </span>
            )}
            <p className={`text-[8px] uppercase tracking-wider font-bold ${active ? "text-gold" : complete ? "text-[#1a3357]" : "text-slate-400"}`}>
              Stage {s.stageNum}
            </p>
            <p className={`text-[9px] mt-0.5 leading-tight ${active || complete ? "text-[#1a3357]/80" : "text-slate-400"}`}>
              {s.label.replace("Your ", "")}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ConsoleBody({ currentStep, stages }: LivePoolConsoleProps) {
  const fig = usePoolFigures();
  const max = Math.max(fig.propertyEquity, fig.liquidAssets, fig.pensions, 1);

  return (
    <div className="space-y-3">
      <PoolDial value={fig.combinedPool} max={fig.combinedPool * 1.3 || 100_000} />

      <div className="space-y-2 pt-1">
        <CategoryBar label="Property equity" value={fig.propertyEquity} max={max} icon={Home} color="#F43F5E" />
        <CategoryBar label="Liquid assets" value={fig.liquidAssets} max={max} icon={Wallet} color="#F59E0B" />
        <CategoryBar label="Pensions" value={fig.pensions} max={max} icon={Landmark} color="#10B981" />
        {fig.otherDebts > 0 && (
          <div className="flex items-center justify-between text-[10px] pt-0.5 border-t border-slate-100">
            <span className="text-[#1a3357]/60">Other debts</span>
            <span className="font-mono font-semibold text-rose-600 tabular-nums">−{fmtPool(fig.otherDebts)}</span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-slate-100">
        <p className="text-[9px] uppercase tracking-widest text-[#1a3357]/55 font-semibold mb-1.5">Progress</p>
        <StagesStrip currentStep={currentStep} stages={stages} />
      </div>

      <p className="text-[9px] text-[#1a3357]/45 italic leading-snug pt-1">
        Live running estimate — recalculates as you type.
      </p>
    </div>
  );
}

export function LivePoolConsole({ currentStep, stages }: LivePoolConsoleProps) {
  return (
    <aside
      className="hidden lg:block w-[280px] shrink-0"
      data-testid="aside-pool-console"
    >
      <div className="sticky top-24">
        <div className="relative">
          <div className="absolute -inset-3 rounded-[18px] bg-gold/[0.07] blur-2xl pointer-events-none" />
          <div className="relative rounded-2xl bg-gradient-to-b from-[#FBF8F1] to-white border border-gold/30 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.18)] overflow-hidden">
            <div className="px-3.5 py-2.5 bg-gradient-to-r from-gold/15 via-gold/8 to-transparent border-b border-gold/20 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-gold" />
              <p className="text-[11px] font-bold text-[#1a3357] tracking-tight">Your financial pool</p>
            </div>
            <div className="p-3.5">
              <ConsoleBody currentStep={currentStep} stages={stages} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobilePoolChip({ currentStep, stages }: LivePoolConsoleProps) {
  const [open, setOpen] = useState(false);
  const fig = usePoolFigures();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white border border-gold/40 shadow-lg rounded-full px-4 py-2 active:scale-[0.98] transition-transform"
        data-testid="button-pool-chip"
      >
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="text-xs font-semibold text-[#1a3357]">Pool</span>
        <span className="text-sm font-bold tabular-nums" style={{ color: chartTheme.color.gold }}>
          {fmtFull(fig.combinedPool)}
        </span>
        <ChevronUp className="w-3.5 h-3.5 text-[#1a3357]/60" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-b from-[#FBF8F1] to-white border-t border-gold/30 rounded-t-2xl shadow-2xl p-4 max-h-[80vh] overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: chartTheme.ease }}
              data-testid="sheet-pool-mobile"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  <p className="text-sm font-bold text-[#1a3357]">Your financial pool</p>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 text-[#1a3357]/60 hover:text-[#1a3357]" data-testid="button-pool-close">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ConsoleBody currentStep={currentStep} stages={stages} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
