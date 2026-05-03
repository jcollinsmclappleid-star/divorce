import { motion } from "framer-motion";
import { Columns3, Lock } from "lucide-react";
import { chartTheme, fmtK, gaugeColor } from "@/lib/chart-theme";
import type { ConsoleScenario } from "@/components/settlement-console";

export interface ScenarioLeaderboardProps {
  scenarios: ConsoleScenario[];
  partyAName?: string;
  partyBName?: string;
  /** When true, blurs numeric figures and shows a small unlock affordance */
  locked?: boolean;
  onUnlock?: () => void;
  /** Optional title override shown in the header */
  title?: string;
  /** Optional small caption shown next to the title */
  caption?: string;
  /** Optional footer note */
  footerText?: string;
  testId?: string;
}

/**
 * Side-by-side factual comparison of all settlement scenarios.
 * Deliberately not a ranking — scenarios are shown in input order
 * with the same three metrics so the user can read figures off
 * each row and form their own view.
 */
export function ScenarioLeaderboard({
  scenarios,
  partyAName = "Party A",
  partyBName = "Party B",
  locked = false,
  onUnlock,
  title = "Scenario Comparison",
  caption = "side-by-side figures",
  footerText,
  testId = "scenario-comparison",
}: ScenarioLeaderboardProps) {
  if (scenarios.length === 0) return null;

  // Scale bars relative to the largest absolute value across all scenarios
  // so widths are visually comparable but never imply a ranking.
  const enriched = scenarios.map((s) => ({
    ...s,
    totalCap: s.capitalA + s.capitalB,
    totalSur: s.surplusA + s.surplusB,
    minCri: Math.min(s.resilienceA, s.resilienceB),
  }));
  const maxCap = Math.max(...enriched.map((r) => r.totalCap), 1);
  const maxSur = Math.max(...enriched.map((r) => Math.abs(r.totalSur)), 1);
  const blur = locked ? "blur-[5px] select-none" : "";

  return (
    <div data-testid={testId}>
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Columns3 className="w-4 h-4 text-gold" />
            <p className="text-[12px] font-bold text-[#1a3357] tracking-tight">{title}</p>
            {caption && <span className="text-[10px] text-[#1a3357]/50 font-mono">{caption}</span>}
          </div>
          {locked && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300/60 px-2 py-0.5 rounded-full">
              <Lock className="w-2.5 h-2.5" /> Locked preview
            </span>
          )}
        </div>

        {/* Sub-header strip explaining what the figures mean */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100">
          <p className="text-[10px] text-slate-500 leading-snug">
            Each row shows the same three figures for one settlement option, calculated from the inputs you entered. No option is presented as recommended.
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
                data-testid={`${testId}-row-${s.id}`}
                className="grid grid-cols-[1fr_auto] gap-3 px-4 py-3 border-b border-slate-100 last:border-0 items-center"
              >
                {/* Scenario name + bars */}
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
                          className="h-full bg-violet-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${capPct}%` }}
                          transition={{ duration: 0.6, ease: chartTheme.ease, delay: i * 0.05 }}
                        />
                      </div>
                      <span className={`text-[10px] font-mono font-semibold text-[#1a3357] tabular-nums w-16 text-right ${blur}`}>
                        £{Math.round(s.totalCap / 1000)}k
                      </span>
                    </div>
                    {/* Surplus */}
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-500 w-14 shrink-0">Surplus</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          className={`h-full ${s.totalSur >= 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${surPct}%` }}
                          transition={{ duration: 0.6, ease: chartTheme.ease, delay: i * 0.05 + 0.05 }}
                        />
                      </div>
                      <span className={`text-[10px] font-mono font-semibold tabular-nums w-16 text-right ${s.totalSur >= 0 ? "text-emerald-700" : "text-rose-700"} ${blur}`}>
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
                      <span className={`text-[10px] font-mono font-semibold tabular-nums w-16 text-right ${blur}`} style={{ color: criColor.stroke }}>
                        {s.minCri}/100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Resilience band */}
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
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-[10px] text-[#1a3357]/70 font-medium">
              {footerText ?? "Bar widths are scaled to the largest figure across the four options for visual comparison only."}
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
            These are calculated facts from the figures entered — not a recommendation. The right settlement depends on factors this tool cannot model.
          </p>
        </div>
      </div>
    </div>
  );
}
