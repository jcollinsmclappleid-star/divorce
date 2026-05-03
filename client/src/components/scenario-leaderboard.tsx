import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Award, BarChart3, Crown, Lock } from "lucide-react";
import { chartTheme, fmtK, gaugeColor } from "@/lib/chart-theme";
import type { ConsoleScenario } from "@/components/settlement-console";

type SortKey = "capital" | "surplus" | "resilience";

const SORT_LABELS: Record<SortKey, string> = {
  capital: "Combined capital",
  surplus: "Combined surplus",
  resilience: "Weakest resilience",
};

export interface ScenarioLeaderboardProps {
  scenarios: ConsoleScenario[];
  partyAName?: string;
  partyBName?: string;
  /** When true, blurs numeric figures and shows a small unlock affordance */
  locked?: boolean;
  onUnlock?: () => void;
  /** Optional title override shown in the gold header */
  title?: string;
  /** Optional small caption shown next to the title */
  caption?: string;
  /** Optional footer note */
  footerText?: string;
  testId?: string;
}

export function ScenarioLeaderboard({
  scenarios,
  partyAName = "Party A",
  partyBName = "Party B",
  locked = false,
  onUnlock,
  title = "Scenario Leaderboard",
  caption = "all scenarios at once",
  footerText,
  testId = "scenario-leaderboard",
}: ScenarioLeaderboardProps) {
  const [sortBy, setSortBy] = useState<SortKey>("capital");

  const ranked = useMemo(() => {
    const enriched = scenarios.map((s) => ({
      ...s,
      totalCap: s.capitalA + s.capitalB,
      totalSur: s.surplusA + s.surplusB,
      minCri: Math.min(s.resilienceA, s.resilienceB),
    }));
    return [...enriched].sort((a, b) => {
      if (sortBy === "capital") return b.totalCap - a.totalCap;
      if (sortBy === "surplus") return b.totalSur - a.totalSur;
      return b.minCri - a.minCri;
    });
  }, [scenarios, sortBy]);

  if (ranked.length === 0) return null;

  const winner = ranked[0];
  const maxCap = Math.max(...ranked.map((r) => r.totalCap), 1);
  const maxSur = Math.max(...ranked.map((r) => Math.abs(r.totalSur)), 1);
  const blur = locked ? "blur-[5px] select-none" : "";

  return (
    <div className="relative" data-testid={testId}>
      <div className="absolute -inset-4 rounded-[24px] bg-gold/[0.08] blur-2xl pointer-events-none" />
      <div className="relative rounded-2xl bg-gradient-to-b from-[#FBF8F1] to-white border border-gold/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-gold/15 via-gold/8 to-transparent border-b border-gold/20 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gold" />
            <p className="text-[12px] font-bold text-[#1a3357] tracking-tight">{title}</p>
            {caption && <span className="text-[10px] text-[#1a3357]/50 font-mono">{caption}</span>}
          </div>
          {locked && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300/60 px-2 py-0.5 rounded-full">
              <Lock className="w-2.5 h-2.5" /> Locked preview
            </span>
          )}
        </div>

        {/* Sort tabs */}
        <div className="px-4 pt-3 pb-2 bg-white border-b border-slate-100">
          <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">Rank scenarios by</p>
          <div className="flex gap-1.5 flex-wrap">
            {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => {
              const isActive = sortBy === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSortBy(k)}
                  aria-pressed={isActive}
                  data-testid={`${testId}-sort-${k}`}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all border ${
                    isActive
                      ? "bg-[#1a3357] text-white border-[#1a3357] shadow-md"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {SORT_LABELS[k]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Winner callout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`winner-${winner.id}-${sortBy}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="px-4 py-3 bg-gradient-to-r from-emerald-50 via-emerald-50/60 to-transparent border-b border-emerald-200/60"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/30 shrink-0">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold">Highest on · {SORT_LABELS[sortBy]}</p>
                <p className="text-sm font-bold text-[#1a3357]">
                  {winner.name}
                  <span className={`text-[11px] font-normal text-slate-500 ml-2 tabular-nums ${blur}`}>
                    {sortBy === "capital" && `£${winner.totalCap.toLocaleString()} combined`}
                    {sortBy === "surplus" && `${winner.totalSur >= 0 ? "+" : "−"}£${Math.abs(winner.totalSur).toLocaleString()}/mo combined`}
                    {sortBy === "resilience" && `${winner.minCri}/100 weakest party`}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Header row */}
        <div className="bg-white">
          <div className="grid grid-cols-[28px_1fr_auto] gap-3 px-4 py-2 border-b border-slate-100 bg-slate-50/60">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">#</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Scenario</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold text-right">Outcome</span>
          </div>

          <AnimatePresence>
            {ranked.map((s, i) => {
              const capPct = (s.totalCap / maxCap) * 100;
              const surPct = (Math.abs(s.totalSur) / maxSur) * 100;
              const criColor = gaugeColor(s.minCri);
              const isWinner = i === 0;
              const rankIcons = [Crown, Medal, Award, BarChart3];
              const RankIcon = rankIcons[Math.min(i, 3)];
              const rankColors = [
                "bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md shadow-amber-400/30",
                "bg-gradient-to-br from-slate-300 to-slate-400 text-white",
                "bg-gradient-to-br from-orange-300 to-orange-400 text-white",
                "bg-slate-100 text-slate-400",
              ];

              return (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  data-testid={`${testId}-row-${s.id}`}
                  className={`grid grid-cols-[28px_1fr_auto] gap-3 px-4 py-3 border-b border-slate-100 last:border-0 items-center ${
                    isWinner ? "bg-gradient-to-r from-emerald-50/40 to-transparent" : ""
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${rankColors[Math.min(i, 3)]}`}>
                    <RankIcon className="w-3.5 h-3.5" />
                  </div>

                  <div className="min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[12px] font-bold text-[#1a3357] truncate">{s.name}</p>
                      <span className={`text-[9px] font-mono text-slate-400 ${blur}`}>
                        {partyAName.split(" ")[0]} {fmtK(s.capitalA)} · {partyBName.split(" ")[0]} {fmtK(s.capitalB)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {/* Capital */}
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
                        <span className={`text-[10px] font-mono font-semibold text-[#1a3357] tabular-nums w-14 text-right ${blur}`}>
                          £{Math.round(s.totalCap / 1000)}k
                        </span>
                      </div>
                      {/* Surplus */}
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
                        <span className={`text-[10px] font-mono font-semibold tabular-nums w-14 text-right ${s.totalSur >= 0 ? "text-emerald-700" : "text-rose-700"} ${blur}`}>
                          {s.totalSur >= 0 ? "+" : "−"}£{Math.abs(s.totalSur).toLocaleString()}
                        </span>
                      </div>
                      {/* Resilience */}
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
                        <span className={`text-[10px] font-mono font-semibold tabular-nums w-14 text-right ${blur}`} style={{ color: criColor.stroke }}>
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
                    {isWinner && (
                      <span className="text-[9px] font-bold text-emerald-700 flex items-center gap-0.5">
                        Highest on {SORT_LABELS[sortBy].toLowerCase()}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-gold/[0.10] to-gold/[0.04] border-t border-gold/20 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-[10px] text-[#1a3357]/70 font-medium">
              {footerText ?? "Re-rank by capital, monthly surplus, or weakest party's resilience."}
            </p>
            {locked && onUnlock && (
              <button
                type="button"
                onClick={onUnlock}
                className="text-[10px] font-bold text-gold hover:text-gold/80 underline underline-offset-2"
                data-testid={`${testId}-unlock`}
              >
                Unlock to reveal exact figures →
              </button>
            )}
          </div>
          <p className="text-[9px] text-[#1a3357]/55 italic leading-snug">
            Ranking is descriptive only — it shows which option scores highest on the chosen metric, not which one you should choose. The right settlement depends on factors this tool cannot model.
          </p>
        </div>
      </div>
    </div>
  );
}
