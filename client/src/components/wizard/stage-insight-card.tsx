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
    const totalTax = engine.taxA.incomeTax + engine.taxA.nationalInsurance + engine.taxB.incomeTax + engine.taxB.nationalInsurance;
    const totalNet = engine.taxA.net + engine.taxB.net;
    const monthlyHousehold = totalNet / 12;
    const effectiveRate = totalGross > 0 ? Math.round((totalTax / totalGross) * 100) : 0;

    slices = [
      { label: nameA, value: engine.taxA.net, color: chartTheme.color.a },
      { label: nameB, value: engine.taxB.net, color: chartTheme.color.b },
    ];

    stats = [
      { label: "Combined gross", value: fmtGbp(totalGross), color: chartTheme.color.gold, hint: "before tax & NI" },
      { label: "Effective tax + NI", value: `${effectiveRate}%`, color: chartTheme.color.pressure },
      { label: "Household take-home", value: `${fmtGbp(monthlyHousehold)}/mo`, color: chartTheme.color.sustain },
    ];

    sentence =
      totalNet > 0
        ? `That's the income side modelled. Next we'll model post-separation living costs to see whether each scenario stays affordable.`
        : `Income figures will power the sustainability side of the model. Add at least one income to see the take-home picture.`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: chartTheme.ease }}
      data-testid={`card-stage-insight-${stage}`}
    >
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
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
