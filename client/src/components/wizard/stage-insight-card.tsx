import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { chartTheme, fmtGbp } from "@/lib/chart-theme";

/**
 * StageInsightCard consumes engine outputs (`useEngine`) so the figures
 * shown here always match the rest of the modelling. Avoid duplicating
 * asset/income arithmetic from the store — pull from engine.intermediate,
 * engine.scenarios[0] (pensions), or engine.taxA / engine.taxB.
 */

interface StatFigure {
  label: string;
  value: string;
  color?: string;
  hint?: string;
}

interface StageInsightCardProps {
  stage: "afterAssets" | "afterIncome";
  onContinue: () => void;
}

function Donut({ slices }: { slices: { label: string; value: number; color: string }[] }) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const size = 140;
  const r = 56;
  const sw = 18;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(15,27,45,0.07)" strokeWidth={sw} />
        {slices.map((s, i) => {
          const frac = s.value / total;
          if (frac <= 0) return null;
          const dash = C * frac;
          const offset = -C * acc;
          const el = (
            <motion.circle
              key={s.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={sw}
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ opacity: 0, strokeDasharray: `0 ${C}` }}
              animate={{ opacity: 1, strokeDasharray: `${dash} ${C - dash}` }}
              transition={{ duration: 0.7, ease: chartTheme.ease, delay: i * 0.08 }}
            />
          );
          acc += frac;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p
          className="text-lg font-bold tabular-nums leading-none"
          style={{ color: chartTheme.color.gold, fontFamily: chartTheme.font.serif, letterSpacing: "-0.02em" }}
        >
          {fmtGbp(total)}
        </p>
        <p className="text-[9px] uppercase tracking-widest text-[#1a3357]/55 font-semibold mt-1">Total</p>
      </div>
    </div>
  );
}

export function StageInsightCard({ stage, onContinue }: StageInsightCardProps) {
  const { profile } = useAppStore();
  const engine = useEngine();
  const nameA = profile?.partyAName?.trim() || "Party A";
  const nameB = profile?.partyBName?.trim() || "Party B";
  const intent = profile?.calculationIntent;

  const stageNum = stage === "afterAssets" ? 1 : 2;
  const stageLabel = stage === "afterAssets" ? "Stage 1 complete · Your Assets" : "Stage 2 complete · Your Income";
  const headline = stage === "afterAssets" ? "Here's the asset picture so far." : "Here's the income picture so far.";

  let slices: { label: string; value: number; color: string }[] = [];
  let stats: StatFigure[] = [];
  let sentence = "";

  if (stage === "afterAssets") {
    // All figures consumed from engine outputs — single source of truth
    const propertyEquity = engine.intermediate.netHomeEquity;
    const liquid = engine.intermediate.totalLiquid;
    const pensions = engine.scenarios[0]
      ? (engine.scenarios[0].pensionA ?? 0) + (engine.scenarios[0].pensionB ?? 0)
      : 0;
    const otherDebts = Math.max(0, engine.intermediate.totalDebt - engine.intermediate.totalMortgage);
    const netSoFar = engine.netWorth.total;

    slices = [
      { label: "Property equity", value: propertyEquity, color: chartTheme.color.rose },
      { label: "Liquid assets", value: liquid, color: chartTheme.color.attention },
      { label: "Pensions", value: pensions, color: chartTheme.color.sustain },
    ];

    stats = [
      { label: "Property equity", value: fmtGbp(propertyEquity), color: chartTheme.color.rose, hint: "before sale costs" },
      { label: "Liquid assets", value: fmtGbp(liquid), color: chartTheme.color.attention, hint: "savings & investments" },
      {
        label: "Pensions",
        value: pensions > 0 ? fmtGbp(pensions) : "Next step",
        color: pensions > 0 ? chartTheme.color.sustain : "#94a3b8",
        hint: pensions > 0 ? "CETV totals" : "often the largest asset",
      },
    ];

    sentence =
      pensions > 0
        ? `Your estimated net asset position so far is ${fmtGbp(netSoFar)}. Income comes next — it powers the sustainability side of the model.`
        : propertyEquity > 0 || liquid > 0
        ? `Net asset position so far is ${fmtGbp(netSoFar)}. Pensions are added next — for many UK couples they're the single largest asset of all.`
        : `Pensions come next — for many UK couples they're the largest asset of all. Easy to overlook.`;
  } else {
    const grossA = engine.taxA.gross;
    const grossB = engine.taxB.gross;
    const totalGross = grossA + grossB;
    const totalNet = engine.taxA.net + engine.taxB.net;
    const monthlyA = engine.taxA.net / 12;
    const monthlyB = engine.taxB.net / 12;

    slices = [
      { label: nameA, value: engine.taxA.net, color: chartTheme.color.a },
      { label: nameB, value: engine.taxB.net, color: chartTheme.color.b },
    ];

    stats = [
      { label: "Combined gross", value: fmtGbp(totalGross), color: chartTheme.color.gold, hint: "before tax & NI" },
      {
        label: `${nameA} take-home`,
        value: grossA > 0 ? `${fmtGbp(monthlyA)}/mo` : "Not entered",
        color: chartTheme.color.a,
        hint: grossA > 0 ? "modelled net" : undefined,
      },
      {
        label: `${nameB} take-home`,
        value: grossB > 0 ? `${fmtGbp(monthlyB)}/mo` : "Not entered",
        color: chartTheme.color.b,
        hint: grossB > 0 ? "modelled net" : undefined,
      },
    ];

    sentence =
      totalNet > 0
        ? `That's the income side modelled using simplified UK tax/NI rules — take-home figures are illustrative, not payslip-accurate. Next we'll model post-separation living costs.`
        : `Income figures will power the sustainability side of the model. Add at least one income to see the take-home picture.`;
  }

  const intentNote =
    stage === "afterAssets" && intent === "offer_check"
      ? "When you reach the assumptions step, mirror the offer as closely as possible so the results can pressure-check the proposed split."
      : stage === "afterAssets" && intent === "fair_split"
      ? "When you reach the assumptions step, test 50/50 against alternative splits so you can see the practical difference."
      : stage === "afterAssets" && intent === "house_split"
      ? "The house lens will use this equity position to compare sale, buyout and keep-home pressure."
      : stage === "afterAssets" && intent === "children_housing"
      ? "Income and costs come next. Together they show whether a housing-focused scenario appears workable month to month."
      : stage === "afterAssets" && intent === "pension_impact"
      ? "Pensions are next. Adding CETV figures helps reveal whether property-heavy options hide a weaker long-term position."
      : stage === "afterAssets" && intent === "debt_pressure"
      ? "Debt can change the real position quickly. Make sure loans, cards and liabilities are added before comparing outcomes."
      : stage === "afterAssets" && intent === "protect_position"
      ? "Use the next steps to add debts, pensions and income so the report can highlight missing value and pressure points."
      : stage === "afterIncome" && intent === "offer_check"
      ? "The next step is post-separation spending, which shows whether the proposed offer is liveable month to month."
      : stage === "afterIncome" && intent === "fair_split"
      ? "Living costs come next. They show whether the same headline percentage creates very different monthly pressure."
      : stage === "afterIncome" && intent === "children_housing"
      ? "Living costs and child assumptions come next, then the model can compare housing pressure and monthly headroom."
      : stage === "afterIncome" && intent === "income_gap"
      ? "Expenses come next. That is where the income gap becomes visible as monthly surplus or shortfall."
      : stage === "afterIncome" && intent === "debt_pressure"
      ? "Living costs come next, then the results can show whether debts and monthly commitments leave either side exposed."
      : stage === "afterIncome" && intent === "protect_position"
      ? "Living costs come next. That is where left-short risk usually becomes visible."
      : stage === "afterIncome" && intent === "house_split"
      ? "Living costs come next, then the model can test whether keeping the home leaves enough monthly headroom."
      : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: chartTheme.ease }}
      data-testid={`card-stage-insight-${stage}`}
    >
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-lg shadow-primary/[0.06] overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#1a3357]">{stageLabel}</p>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h2
              className="text-2xl font-bold leading-tight"
              style={{ color: "#1a3357", fontFamily: chartTheme.font.serif, letterSpacing: "-0.01em" }}
            >
              {headline}
            </h2>
          </div>

          <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-center">
            <div className="flex justify-center sm:justify-start">
              <Donut slices={slices} />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-[#1a3357]/55 font-semibold leading-none">{s.label}</p>
                  <p className="text-lg font-bold tabular-nums mt-1.5" style={{ color: s.color ?? "#1a3357" }}>
                    {s.value}
                  </p>
                  {s.hint && <p className="text-[10px] text-[#1a3357]/45 mt-0.5 leading-snug">{s.hint}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
            <p className="text-sm text-[#1a3357]/85 leading-relaxed">{sentence}</p>
            {intentNote && (
              <p className="text-xs text-[#1a3357]/65 leading-relaxed mt-2 border-t border-slate-200 pt-2">
                {intentNote}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <p className="text-[11px] text-[#1a3357]/55 italic">
              Stage {stageNum} of 3 complete · {stage === "afterAssets" ? "Income next" : "Finishing up next"}
            </p>
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold/90 text-white font-semibold px-5 py-2.5 rounded-md transition-colors"
              data-testid="button-stage-continue"
            >
              Continue to next stage
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
