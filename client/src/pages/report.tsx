import { useState, useMemo, Fragment } from "react";
import { Link } from "wouter";
import { useAppStore, StoreState } from "@/hooks/use-store";
import type { GuidedSummary } from "@/lib/guided-summary/types";
import { useEngine, ScenarioResult, ProjectionYear, RunwayResult } from "@/hooks/use-engine";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, ChevronDown } from "lucide-react";
import {
  generateScenarioNarrative,
  buildSourceOfFunds,
  computeStabilityScore,
  compareToSell,
  buildMonthlySnapshot,
  computeHousingFeasibility,
} from "@/lib/insights";
import type {
  SourceOfFunds, StabilityResult, MonthlySnapshotResult, HousingFeasibility,
} from "@/lib/insights";
import type { StabilityDriver } from "@/lib/insights/computeStabilityScore";
import { LogoPrint } from "@/components/logo";
import { FsiGauge } from "@/components/fsi-gauge";

const SCENARIO_META: Record<string, { label: string; shortLabel: string; color: string }> = {
  S1: { label: "Sell & Split", shortLabel: "Sell & Split", color: "#2563EB" },
  S2: { label: "A Keeps House", shortLabel: "A Keeps", color: "#10B981" },
  S3: { label: "B Keeps House", shortLabel: "B Keeps", color: "#8B5CF6" },
  S4: { label: "Deferred Sale", shortLabel: "Deferred", color: "#F59E0B" },
};

function fmt(v: number) { return formatCurrency(v); }
function pct(v: number) { return `${Math.round(v * 100)}%`; }

interface ExecSummarySection {
  heading: string;
  paragraphs: string[];
}

function buildQualitativeExecutiveSummary(
  engine: ReturnType<typeof useEngine>,
  store: StoreState,
  scenarioData: { sc: ScenarioResult; narrative: ReturnType<typeof generateScenarioNarrative>; stability: StabilityResult; housing: HousingFeasibility | null }[],
): ExecSummarySection[] {
  const sections: ExecSummarySection[] = [];
  const { intermediate } = engine;
  const totalAssets = store.assets.reduce((s, a) => s + a.currentValue, 0);
  const totalLiab = store.liabilities.reduce((s, l) => s + l.balance, 0);
  const hasHome = store.assets.some(a => a.category === "primary_home" && a.currentValue > 0);
  const homeValue = store.assets.find(a => a.category === "primary_home")?.currentValue ?? 0;
  const hasPension = store.assets.some(a => a.category === "pension");
  const totalPensionCETV = store.assets.filter(a => a.category === "pension").reduce((s, p) => s + (p.cetv ?? p.currentValue), 0);
  const splitPct = Math.round(store.assumptions.splitRatio * 100);
  const otherPct = 100 - splitPct;
  const incomeA = engine.taxA.gross;
  const incomeB = engine.taxB.gross;

  const estateParts: string[] = [];
  estateParts.push(`This report presents an illustrative financial analysis of the marital estate, comprising ${fmt(totalAssets)} in total assets${totalLiab > 0 ? ` offset by ${fmt(totalLiab)} in liabilities` : ""}, producing a combined net worth of ${fmt(engine.netWorth.total)}.`);
  if (hasHome) {
    const equityPct = totalAssets > 0 ? Math.round((homeValue / totalAssets) * 100) : 0;
    estateParts.push(`The primary residence, valued at ${fmt(homeValue)} with ${fmt(intermediate.netHomeEquity)} in net equity after sale costs, represents approximately ${equityPct}% of total assets and is the single largest component of the estate.`);
  }
  if (hasPension && totalPensionCETV > 0) {
    estateParts.push(`Pension provision totals ${fmt(totalPensionCETV)} by Cash Equivalent Transfer Value (CETV) and is treated separately from liquid assets within the modelling.`);
  }
  sections.push({ heading: "Estate Overview", paragraphs: [estateParts.join(" ")] });

  const incomeParts: string[] = [];
  if (incomeA > 0 || incomeB > 0) {
    incomeParts.push(`Combined gross household income is ${fmt(incomeA + incomeB)} per annum.`);
    if (incomeA > 0 && incomeB > 0) {
      const higherParty = incomeA >= incomeB ? "A" : "B";
      const higherAmt = Math.max(incomeA, incomeB);
      const lowerAmt = Math.min(incomeA, incomeB);
      const ratio = lowerAmt > 0 ? (higherAmt / lowerAmt).toFixed(1) : "significantly higher";
      incomeParts.push(`Party ${higherParty} earns ${typeof ratio === "string" ? ratio : ratio + "x"} the income of the other party (${fmt(higherAmt)} versus ${fmt(lowerAmt)} gross), resulting in a material income disparity that affects post-separation sustainability.`);
    } else {
      const earner = incomeA > 0 ? "A" : "B";
      incomeParts.push(`Only Party ${earner} has declared income, which represents a single-income dependency across all modelled scenarios.`);
    }
    const netALabel = store.assumptions.overrideNetIncomeA != null && store.assumptions.overrideNetIncomeA > 0
      ? `${fmt(engine.taxA.net)} (Party A, user-provided override)`
      : `${fmt(engine.taxA.net)} (Party A)`;
    const netBLabel = store.assumptions.overrideNetIncomeB != null && store.assumptions.overrideNetIncomeB > 0
      ? `${fmt(engine.taxB.net)} (Party B, user-provided override)`
      : `${fmt(engine.taxB.net)} (Party B)`;
    incomeParts.push(`After applying estimated 2026/27 UK income tax and National Insurance, net incomes are ${netALabel} and ${netBLabel} per annum.`);
    if (engine.cmsAnnual > 0) {
      const cmsSource = store.assumptions.overrideCMSAnnual != null && store.assumptions.overrideCMSAnnual > 0
        ? "a user-provided override" : "the CMS formula";
      const cmsDuration = engine.cmsYearsRemaining > 0 ? ` Payments are modelled for approximately ${engine.cmsYearsRemaining} further year${engine.cmsYearsRemaining !== 1 ? "s" : ""}, based on the ages of the children entered.` : "";
      incomeParts.push(`Child maintenance obligations, estimated at ${fmt(engine.cmsAnnual)} per annum using ${cmsSource}, are factored into the projection model.${cmsDuration}`);
    }
    sections.push({ heading: "Income & Tax Position", paragraphs: [incomeParts.join(" ")] });
  }

  const scCount = scenarioData.length;
  const scenarioIntro = `The analysis models ${scCount} settlement scenario${scCount !== 1 ? "s" : ""} under a ${splitPct}/${otherPct} asset division assumption${store.assumptions.splitPensionToA !== store.assumptions.splitRatio ? `, with pensions split ${Math.round(store.assumptions.splitPensionToA * 100)}/${Math.round((1 - store.assumptions.splitPensionToA) * 100)}` : ""}.`;
  const scenarioParas: string[] = [scenarioIntro];

  for (const { sc, narrative, stability, housing } of scenarioData) {
    const meta = SCENARIO_META[sc.id];
    const label = meta?.label ?? sc.name;
    const parts: string[] = [];
    parts.push(`Under the "${label}" scenario, Party A receives a total net asset position of ${fmt(sc.totalA)} and Party B receives ${fmt(sc.totalB)}.`);

    if (sc.id !== "S1" && sc.buyoutAmount && sc.buyoutAmount > 0) {
      parts.push(`This requires a buyout payment (equity transfer obligation) of ${fmt(sc.buyoutAmount)}.`);
    }

    if (sc.fundingGap && sc.fundingGap > 0) {
      parts.push(`A funding shortfall of ${fmt(sc.fundingGap)} is identified, indicating that additional borrowing or asset liquidation may be required.`);
    }

    const runway = engine.runways[sc.id];
    if (runway) {
      const aStatus = runway.partyA.sustained ? "sustained over the projection period" : `projected to deplete by year ${runway.partyA.depletionYear}`;
      const bStatus = runway.partyB.sustained ? "sustained over the projection period" : `projected to deplete by year ${runway.partyB.depletionYear}`;
      parts.push(`Reserve duration analysis indicates that Party A's liquid reserves are ${aStatus}, while Party B's are ${bStatus}.`);
    }

    const scoreLabel = stability.labelA.includes("Lower") || stability.labelB.includes("Lower")
      ? "lower resilience under current assumptions"
      : stability.labelA.includes("Moderate") || stability.labelB.includes("Moderate")
      ? "moderate sustainability indicators"
      : "financial stability within the modelled parameters";
    parts.push(`The financial sustainability indicator reflects ${scoreLabel} (Party A: ${stability.scoreA}/100, Party B: ${stability.scoreB}/100). This indicator reflects liquidity sustainability and lending capacity benchmarks under current modelling assumptions and is not a lending or credit assessment.`);

    if (housing) {
      parts.push(`Lending capacity benchmarking classifies this scenario as "${housing.classification.toLowerCase()}" based on standard income multiple and payment-to-income ratio analysis.`);
    }

    scenarioParas.push(parts.join(" "));
  }
  sections.push({ heading: "Scenario Analysis", paragraphs: scenarioParas });

  const closingParts: string[] = [];
  closingParts.push("The figures presented in this report are based on the data provided and standard modelling assumptions, including current UK 2026/27 tax and National Insurance rates.");
  closingParts.push(`All projections use an assumed inflation rate of ${(store.assumptions.inflationRate * 100).toFixed(1)}% and a mortgage interest rate of ${(store.assumptions.mortgageAPR * 100).toFixed(1)}% over a ${store.assumptions.mortgageTermYears}-year term.`);
  closingParts.push("This analysis is illustrative only and does not constitute legal, tax, or financial advice. The scenarios modelled represent potential outcomes under specified assumptions and are not predictions or recommendations. Independent professional review may be warranted before making any financial decisions relating to separation or divorce.");
  sections.push({ heading: "Basis of Preparation", paragraphs: [closingParts.join(" ")] });

  return sections;
}

function computeAllScenarios(engine: ReturnType<typeof useEngine>): ScenarioResult[] {
  const all: ScenarioResult[] = [];
  for (const s of engine.scenarios) {
    if (s.id === "S1" || s.id === "S2" || s.id === "S3") all.push(s);
  }
  return all.length > 0 ? all : engine.scenarios;
}

export default function ReportPage() {
  useDocumentTitle("Structured Divorce Financial Brief | DivorceCalculatorUK");
  useNoIndex();
  const store = useAppStore();
  const engine = useEngine();
  const allScenarios = computeAllScenarios(engine);
  const s1 = allScenarios.find(s => s.id === "S1");

  const scenarioData = useMemo(() => {
    const { intermediate } = engine;
    return allScenarios.map(sc => {
      const narrative = generateScenarioNarrative(
        sc, store,
        intermediate.netHomeEquity, intermediate.totalLiquid, intermediate.totalDebt, intermediate.homeSaleCosts,
      );
      const sourceOfFunds = buildSourceOfFunds(
        sc, store,
        intermediate.netHomeEquity, intermediate.totalLiquid, intermediate.homeSaleCosts,
      );
      const stability = computeStabilityScore(sc, engine.projections[sc.id], store);
      const snapshot = buildMonthlySnapshot(sc, store, engine.taxA, engine.taxB, engine.cmsAnnual);
      const comparison = sc.id !== "S1" && s1 ? compareToSell(sc, s1, engine.projections[sc.id], engine.projections["S1"]) : null;

      let housing: HousingFeasibility | null = null;
      if (sc.id === "S2" || sc.id === "S3") {
        const isA = sc.id === "S2";
        const keeperGross = isA ? engine.taxA.gross : engine.taxB.gross;
        const keeperNet = isA ? engine.taxA.net : engine.taxB.net;
        housing = computeHousingFeasibility(sc, keeperGross, keeperNet, intermediate.homeValue, intermediate.totalMortgage);
      }

      return { sc, narrative, sourceOfFunds, stability, snapshot, comparison, housing };
    });
  }, [allScenarios, engine, store, s1]);

  const hasData = store.assets.length > 0 || store.incomes.length > 0;

  if (!hasData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-600">No financial data to report. Please complete the wizard first.</p>
          <Link href="/wizard"><Button data-testid="button-go-wizard">Go to Wizard</Button></Link>
        </div>
      </div>
    );
  }

  const totalAssets = store.assets.reduce((s, a) => s + a.currentValue, 0);
  const netWorthTotal = engine.netWorth.total;

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-900">
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <Link href="/results">
            <Button variant="outline" size="sm" data-testid="button-back-results">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Results
            </Button>
          </Link>
          <Button onClick={() => window.print()} className="bg-primary text-white hover:bg-primary/90" data-testid="button-print-report">
            <Printer className="w-4 h-4 mr-1" /> Download / Print
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 print:px-0 print:py-0" data-testid="report-content">
        <header className="mb-10" data-testid="report-header">
          {/* Cover header */}
          <div className="bg-gradient-to-br from-primary via-[hsl(220_52%_22%)] to-[hsl(220_52%_16%)] rounded-2xl px-8 py-8 mb-4 print:rounded-none print:px-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.03] rounded-full -translate-y-12 translate-x-12" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/[0.06] rounded-full translate-y-10 -translate-x-8" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                <LogoPrint white />
                <div className="text-right">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Report generated</p>
                  <p className="text-sm text-white/80 font-medium mt-0.5">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <p className="text-[10px] text-white/30 mt-1">UK {store.config.taxYear} Tax Rules</p>
                </div>
              </div>
              <div className="border-t border-white/15 pt-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-6 bg-gold rounded-full" />
                  <h1 className="text-3xl font-bold tracking-tight text-white" data-testid="text-report-title">Divorce Financial Report</h1>
                </div>
                <p className="text-sm text-white/55 ml-3">Illustrative financial modelling · England & Wales · {allScenarios.length} scenarios analysed</p>
              </div>
              {/* Key stats strip */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Total Assets", value: fmt(totalAssets), color: "text-cyan-300" },
                  { label: "Combined Net Worth", value: fmt(netWorthTotal), color: "text-gold" },
                  { label: "Scenarios Modelled", value: String(allScenarios.length), color: "text-emerald-300" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{label}</p>
                    <p className={`text-lg font-bold tabular-nums ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Disclaimer */}
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-3">
            <span className="text-amber-600 font-bold shrink-0 mt-0.5 text-[10px] uppercase tracking-wider">Important</span>
            <p>
              This document provides illustrative financial modelling only and does not constitute legal, tax, or financial advice. All figures are estimates based on the information entered and standard assumptions. Lending capacity benchmarks are generalised income multiple illustrations and do not constitute a lending assessment, mortgage advice, or credit approval indication. Independent professional review may be warranted before making any financial decisions.
            </p>
          </div>
        </header>

        <ReportSection title="Executive Summary">
          {buildQualitativeExecutiveSummary(engine, store, scenarioData).map((section, si) => (
            <div key={si} className={si > 0 ? "mt-4 pt-3 border-t border-gray-100" : ""}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{section.heading}</h4>
              {section.paragraphs.map((para, pi) => (
                <p key={pi} className="text-sm text-gray-700 leading-relaxed mb-2 last:mb-0">{para}</p>
              ))}
            </div>
          ))}
          <p className="text-sm text-gray-600 italic mt-4 pt-2 border-t border-gray-200">
            Financial modelling highlights trade-offs. Each scenario reflects different implications for liquidity, leverage, and income variability.
          </p>
        </ReportSection>

        <ReportSection title="1. Financial Position Summary">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Assets & Investments</h4>
              <table className="w-full text-sm">
                <tbody>
                  {store.assets.map(a => (
                    <tr key={a.id} className="border-b border-gray-100">
                      <td className="py-1 text-gray-600">{a.name} <span className="text-xs text-gray-400">({a.owner})</span></td>
                      <td className="py-1 text-right tabular-nums font-medium">{fmt(a.currentValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Liabilities</h4>
              <table className="w-full text-sm">
                <tbody>
                  {store.liabilities.map(l => (
                    <tr key={l.id} className="border-b border-gray-100">
                      <td className="py-1 text-gray-600">{l.name} <span className="text-xs text-gray-400">({l.owner})</span></td>
                      <td className="py-1 text-right tabular-nums font-medium text-red-600">({fmt(l.balance)})</td>
                    </tr>
                  ))}
                  {store.liabilities.length === 0 && (
                    <tr><td className="py-1 text-gray-400 text-xs" colSpan={2}>No liabilities entered</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-sm font-semibold">
            <span>Combined Net Worth [total assets less total liabilities]</span>
            <span className="tabular-nums">{fmt(engine.netWorth.total)}</span>
          </div>
        </ReportSection>

        <ReportSection title="2. Income & Taxation Summary">
          <div className="grid grid-cols-2 gap-8">
            <TaxSummaryColumn label="Party A" tax={engine.taxA} />
            <TaxSummaryColumn label="Party B" tax={engine.taxB} />
          </div>
          {engine.cmsAnnual > 0 && (
            <div className="mt-3 pt-2 border-t border-gray-200 text-sm">
              <span className="text-gray-600">Estimated Child Maintenance (CMS Calculation): </span>
              <span className="font-semibold tabular-nums">{fmt(engine.cmsAnnual)}/yr</span>
              <span className="text-gray-400 text-xs ml-2">({fmt(engine.cmsWeekly)}/wk)</span>
              {engine.cmsYearsRemaining > 0 && (
                <span className="text-gray-400 text-xs ml-2">| ~{engine.cmsYearsRemaining} yr{engine.cmsYearsRemaining !== 1 ? "s" : ""} remaining based on child ages</span>
              )}
            </div>
          )}
          <p className="text-xs text-gray-400 italic mt-3">Tax figures are based on a simplified 2026/27 UK model and may not reflect individual circumstances.</p>
        </ReportSection>

        <ReportSection title="3. Projected Monthly Expenditure">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Expense</th>
                <th className="text-left py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Owner</th>
                <th className="text-right py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Monthly</th>
                <th className="text-right py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Annual</th>
              </tr>
            </thead>
            <tbody>
              {store.expenses.map(e => (
                <tr key={e.id} className="border-b border-gray-100">
                  <td className="py-1 text-gray-600">{e.name}</td>
                  <td className="py-1 text-gray-400 text-xs">{e.owner}</td>
                  <td className="py-1 text-right tabular-nums">{fmt(e.amountAnnual / 12)}</td>
                  <td className="py-1 text-right tabular-nums">{fmt(e.amountAnnual)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-300 font-semibold">
                <td className="py-1" colSpan={2}>Total</td>
                <td className="py-1 text-right tabular-nums">{fmt(store.expenses.reduce((s, e) => s + e.amountAnnual, 0) / 12)}</td>
                <td className="py-1 text-right tabular-nums">{fmt(store.expenses.reduce((s, e) => s + e.amountAnnual, 0))}</td>
              </tr>
            </tfoot>
          </table>
        </ReportSection>

        <ReportSection title="4. Scenario Comparison — Executive Summary">
          <p className="text-xs text-gray-500 mb-3">
            Split assumption: {pct(store.assumptions.splitRatio)} to Party A, {pct(1 - store.assumptions.splitRatio)} to Party B.
            Pension split: {pct(store.assumptions.splitPensionToA)} to A, {pct(1 - store.assumptions.splitPensionToA)} to B.
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Metric</th>
                {allScenarios.map(sc => (
                  <th
                    key={sc.id}
                    className="text-right py-2 px-2 text-xs font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: SCENARIO_META[sc.id]?.color }}
                  >
                    {SCENARIO_META[sc.id]?.shortLabel ?? sc.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <ComparisonRow label="Liquid Capital — Party A" values={allScenarios.map(s => s.liquidStartA)} />
              <ComparisonRow label="Liquid Capital — Party B" values={allScenarios.map(s => s.liquidStartB)} />
              <ComparisonRow label="Pension Valuation — Party A" values={allScenarios.map(s => s.pensionA)} />
              <ComparisonRow label="Pension Valuation — Party B" values={allScenarios.map(s => s.pensionB)} />
              <ComparisonRow label="Total Net Asset Position — Party A" values={allScenarios.map(s => s.totalA)} bold />
              <ComparisonRow label="Total Net Asset Position — Party B" values={allScenarios.map(s => s.totalB)} bold />
              <ComparisonRow label="Monthly Mortgage Obligation — Party A" values={allScenarios.map(s => s.mortgageMonthlyA ?? 0)} />
              <ComparisonRow label="Monthly Mortgage Obligation — Party B" values={allScenarios.map(s => s.mortgageMonthlyB ?? 0)} />
              {allScenarios.map((_, i) => i === 0 ? (
                <tr key="runway-header" className="border-b border-gray-200">
                  <td className="py-1 text-gray-600 text-xs font-semibold" colSpan={allScenarios.length + 1}>5-Year Reserve Duration</td>
                </tr>
              ) : null)}
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-600">5-Year Reserves — Party A</td>
                {allScenarios.map(s => {
                  const rw = engine.runways[s.id];
                  return (
                    <td key={s.id} className="py-1 text-right tabular-nums text-sm">
                      {rw?.partyA.sustained
                        ? <span className="text-green-600 font-medium">Sustained</span>
                        : <span className="text-amber-600 font-medium">Yr {rw?.partyA.depletionYear} depletion</span>}
                    </td>
                  );
                })}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1 text-gray-600">5-Year Reserves — Party B</td>
                {allScenarios.map(s => {
                  const rw = engine.runways[s.id];
                  return (
                    <td key={s.id} className="py-1 text-right tabular-nums text-sm">
                      {rw?.partyB.sustained
                        ? <span className="text-green-600 font-medium">Sustained</span>
                        : <span className="text-amber-600 font-medium">Yr {rw?.partyB.depletionYear} depletion</span>}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </ReportSection>

        {scenarioData.map(({ sc, narrative, sourceOfFunds, stability, snapshot, comparison, housing }, idx) => (
          <ReportSection key={sc.id} title={`${5 + idx}. ${SCENARIO_META[sc.id]?.label ?? sc.name} — Detail`} accentColor={SCENARIO_META[sc.id]?.color}>
            <div className="space-y-5">
              {/* Scenario stat strip */}
              <div className="rounded-lg p-3 flex flex-wrap gap-4 mb-1" style={{ background: `${SCENARIO_META[sc.id]?.color}12`, borderLeft: `3px solid ${SCENARIO_META[sc.id]?.color}` }}>
                {[
                  { label: "A Starting Position", value: fmt(sc.liquidStartA) },
                  { label: "B Starting Position", value: fmt(sc.liquidStartB) },
                  { label: "A FSI", value: `${stability.scoreA}/100` },
                  { label: "B FSI", value: `${stability.scoreB}/100` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-bold text-gray-800 tabular-nums">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Executive Narrative Summary</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{narrative.headline}</p>
                {narrative.keyDrivers.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {narrative.keyDrivers.map((d, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                        <span className="text-gray-400 mt-0.5">-</span>{d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <ReportCollapsible title="Source of Funds Breakdown">
                <div className="grid grid-cols-2 gap-6">
                  <FundsColumn label="Party A" funds={sourceOfFunds.A} color="text-blue-600" />
                  <FundsColumn label="Party B" funds={sourceOfFunds.B} color="text-emerald-600" />
                </div>
                <div className="mt-3 pt-2 border-t border-gray-300 flex items-center justify-between text-sm font-bold">
                  <span>Total Allocated Net Position</span>
                  <span className="tabular-nums">{fmt(sc.liquidStartA + sc.liquidStartB)}</span>
                </div>
              </ReportCollapsible>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Financial Sustainability Indicator (Illustrative Model Output)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Party A</p>
                    <FsiGauge score={stability.scoreA} size={100} />
                    <div className="text-xs text-gray-500 mt-2">
                      {stability.reasonsA.slice(0, 3).map((r: { label: string; points: number }, i: number) => (
                        <span key={i} className="block">{r.label}: {r.points > 0 ? "+" : ""}{r.points} pts</span>
                      ))}
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-semibold">Assessment Drivers:</p>
                      {stability.driversA.map((d: StabilityDriver, i: number) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span>{d.label}:</span>
                          <span className={d.status === "pass" ? "text-green-600" : d.status === "warn" ? "text-amber-600" : "text-red-600"}>{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Party B</p>
                    <FsiGauge score={stability.scoreB} size={100} />
                    <div className="text-xs text-gray-500 mt-2">
                      {stability.reasonsB.slice(0, 3).map((r: { label: string; points: number }, i: number) => (
                        <span key={i} className="block">{r.label}: {r.points > 0 ? "+" : ""}{r.points} pts</span>
                      ))}
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-semibold">Assessment Drivers:</p>
                      {stability.driversB.map((d: StabilityDriver, i: number) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span>{d.label}:</span>
                          <span className={d.status === "pass" ? "text-green-600" : d.status === "warn" ? "text-amber-600" : "text-red-600"}>{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {(() => {
                const runway = engine.runways[sc.id];
                if (!runway) return null;
                return (
                  <ReportCollapsible title="Reserve Duration (5-Year Projection)">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Party A</p>
                        <div className="text-xs space-y-0.5">
                          <div className="flex justify-between"><span className="text-gray-500">Starting Liquid Capital</span><span className="tabular-nums font-medium">{fmt(runway.partyA.startingCapital)}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Lowest Projected Capital</span><span className={`tabular-nums font-medium ${runway.partyA.lowestProjectedCapital < 0 ? "text-red-600" : ""}`}>{fmt(runway.partyA.lowestProjectedCapital)}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Year of Depletion</span><span className={`font-medium ${runway.partyA.sustained ? "text-green-600" : "text-amber-600"}`}>{runway.partyA.sustained ? "Sustained" : `Yr ${runway.partyA.depletionYear}`}</span></div>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Party B</p>
                        <div className="text-xs space-y-0.5">
                          <div className="flex justify-between"><span className="text-gray-500">Starting Liquid Capital</span><span className="tabular-nums font-medium">{fmt(runway.partyB.startingCapital)}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Lowest Projected Capital</span><span className={`tabular-nums font-medium ${runway.partyB.lowestProjectedCapital < 0 ? "text-red-600" : ""}`}>{fmt(runway.partyB.lowestProjectedCapital)}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Year of Depletion</span><span className={`font-medium ${runway.partyB.sustained ? "text-green-600" : "text-amber-600"}`}>{runway.partyB.sustained ? "Sustained" : `Yr ${runway.partyB.depletionYear}`}</span></div>
                        </div>
                      </div>
                    </div>
                  </ReportCollapsible>
                );
              })()}

              <ReportCollapsible title="Monthly Financial Position">
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Party A</p>
                    <p className="text-gray-500">Net Monthly Income: {fmt(snapshot.netMonthlyIncomeA)}/mo</p>
                    {(sc.mortgageMonthlyA ?? 0) > 0 && <p className="text-gray-500">Mortgage Obligation: {fmt(sc.mortgageMonthlyA!)}/mo</p>}
                    <p className={`font-semibold ${snapshot.surplusA >= 0 ? "text-green-600" : "text-red-600"}`}>
                      Monthly Surplus / (Deficit): {fmt(snapshot.surplusA)}/mo
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Party B</p>
                    <p className="text-gray-500">Net Monthly Income: {fmt(snapshot.netMonthlyIncomeB)}/mo</p>
                    {(sc.mortgageMonthlyB ?? 0) > 0 && <p className="text-gray-500">Mortgage Obligation: {fmt(sc.mortgageMonthlyB!)}/mo</p>}
                    <p className={`font-semibold ${snapshot.surplusB >= 0 ? "text-green-600" : "text-red-600"}`}>
                      Monthly Surplus / (Deficit): {fmt(snapshot.surplusB)}/mo
                    </p>
                  </div>
                </div>
              </ReportCollapsible>

              {housing && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Indicative Lending Capacity Benchmark (Non-Lender Specific)</h4>
                  <div className="text-sm text-gray-600 space-y-0.5">
                    <p className={housing.withinBenchmarkThresholds ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                      {housing.classification}
                    </p>
                    <p>Mortgage Requirement: {fmt(housing.mortgageRequired)}</p>
                    <p>Income Multiple: {housing.incomeMultiple.toFixed(1)}x <span className="text-xs text-gray-400">(benchmark: {housing.typicalMaxMultiple}x max)</span></p>
                    <p>Available Deposit: {fmt(housing.availableDeposit)} ({pct(housing.depositPercentage)})</p>
                    <p>Mortgage-to-Net-Income Ratio: {housing.mortgageToNetIncomeRatio === null ? "N/A" : `${housing.mortgageToNetIncomeRatio.toFixed(1)}%`}</p>
                    {housing.notes.map((n: string, ni: number) => (
                      <p key={ni} className="text-xs text-gray-400">{n}</p>
                    ))}
                    <p className="text-xs text-gray-400 italic mt-1">This is a generalised income multiple illustration and does not constitute a lending assessment, mortgage advice, or credit approval indication.</p>
                  </div>
                </div>
              )}

              {comparison && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Comparison to Sale & Distribution Scenario</h4>
                  <div className="text-sm text-gray-600 space-y-0.5">
                    <p>Liquid Capital Variance — Party A: <DeltaValue v={comparison.deltaLiquidA} /></p>
                    <p>Liquid Capital Variance — Party B: <DeltaValue v={comparison.deltaLiquidB} /></p>
                    <p>Net Worth Variance — Party A: <DeltaValue v={comparison.deltaNetWorthA} /></p>
                    <p>Net Worth Variance — Party B: <DeltaValue v={comparison.deltaNetWorthB} /></p>
                    {comparison.notes.map((n: string, ni: number) => (
                      <p key={ni} className="text-xs text-gray-400">{n}</p>
                    ))}
                  </div>
                </div>
              )}

              {narrative.riskFlags.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-1">Risk Indicators</h4>
                  <ul className="space-y-1">
                    {narrative.riskFlags.map((rf, i) => (
                      <li key={i} className="text-sm flex items-start gap-1.5" style={{ color: rf.severity === "risk" ? "#EF4444" : rf.severity === "warn" ? "#F59E0B" : "#6B7280" }}>
                        <span className="mt-0.5">{rf.severity === "risk" ? "!" : rf.severity === "warn" ? "~" : "-"}</span>
                        <span><strong>{rf.label}:</strong> {rf.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ReportScenarioConsiderations scenario={sc} engine={engine} store={store} />
            </div>
          </ReportSection>
        ))}

        <ReportSection title={`${5 + scenarioData.length}. Assumption Review Prompts`}>
          <p className="text-xs text-gray-400 italic mb-3">Structured reflection points to evaluate the assumptions underpinning this analysis. These are not recommendations — they are provided to encourage structured review.</p>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-0.5">Are income projections stable?</p>
              <p className="text-xs text-gray-500">
                {(() => {
                  const totalIncomeA = store.incomes.filter(i => i.owner === "A").reduce((s, i) => s + i.amountAnnualGross, 0);
                  const totalIncomeB = store.incomes.filter(i => i.owner === "B").reduce((s, i) => s + i.amountAnnualGross, 0);
                  return totalIncomeA > 0 && totalIncomeB > 0
                    ? `The model assumes Party A earns ${fmt(totalIncomeA)}/yr and Party B earns ${fmt(totalIncomeB)}/yr. Income stability over the projection period may warrant independent verification.`
                    : totalIncomeA > 0
                    ? `The model assumes Party A earns ${fmt(totalIncomeA)}/yr. Income sustainability over the projection period may warrant independent verification.`
                    : `The model assumes Party B earns ${fmt(totalIncomeB)}/yr. Income sustainability over the projection period may warrant independent verification.`;
                })()}
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-0.5">Are expense projections conservative?</p>
              <p className="text-xs text-gray-500">
                Expenses are inflated at {(store.assumptions.inflationRate * 100).toFixed(1)}% per year. Post-separation costs often differ from current spending patterns.
              </p>
            </div>
            {engine.intermediate.totalMortgage > 0 && (
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-700 mb-0.5">Would a 1% interest rate increase materially affect comfort?</p>
                <p className="text-xs text-gray-500">
                  The current model uses a {(store.assumptions.mortgageAPR * 100).toFixed(1)}% mortgage rate. Review the sensitivity analysis to quantify the impact of rate increases.
                </p>
              </div>
            )}
            {store.assumptions.includeCMSEstimate && store.children.numChildren > 0 && (
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-700 mb-0.5">Are child maintenance assumptions realistic?</p>
                <p className="text-xs text-gray-500">
                  The model estimates child maintenance based on CMS basic-rate calculations for {store.children.numChildren} child{store.children.numChildren > 1 ? "ren" : ""}. Actual CMS assessments may differ based on shared care arrangements and other factors.
                </p>
              </div>
            )}
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-0.5">Have all material assets and liabilities been included?</p>
              <p className="text-xs text-gray-500">
                Additional accounts, liabilities, or income sources not included in this model may be relevant to the overall financial position.
              </p>
            </div>
          </div>
        </ReportSection>

        <ReportSection title={`${6 + scenarioData.length}. Assumptions & Methodology`}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            <AssumptionRow label="Asset Settlement Ratio" value={`${pct(store.assumptions.splitRatio)} / ${pct(1 - store.assumptions.splitRatio)}`} />
            <AssumptionRow label="Pension Settlement Ratio" value={`${pct(store.assumptions.splitPensionToA)} / ${pct(1 - store.assumptions.splitPensionToA)}`} />
            <AssumptionRow label="Assumed Mortgage Interest Rate" value={`${(store.assumptions.mortgageAPR * 100).toFixed(1)}%`} />
            <AssumptionRow label="Mortgage Term" value={`${store.assumptions.mortgageTermYears} years`} />
            <AssumptionRow label="Projection Period" value={`${store.assumptions.projectionYears} years`} />
            <AssumptionRow label="Assumed Inflation Rate" value={`${(store.assumptions.inflationRate * 100).toFixed(1)}%`} />
            <AssumptionRow label="Tax Model Applied" value={store.assumptions.includeTaxModel ? "UK 2026/27" : "Off"} />
            <AssumptionRow label="Child Maintenance (CMS)" value={store.assumptions.includeCMSEstimate ? `Included (${engine.cmsYearsRemaining > 0 ? `~${engine.cmsYearsRemaining} yrs remaining` : "all children 16+"})` : "Excluded"} />
            {store.children.numChildren > 0 && (
              <>
                <AssumptionRow label="Dependent Children" value={`${store.children.numChildren}`} />
                <AssumptionRow label="Overnight Stays with Party A" value={`${store.children.nightsWithA}`} />
              </>
            )}
            {(store.assumptions.overrideNetIncomeA != null && store.assumptions.overrideNetIncomeA > 0) && (
              <AssumptionRow label="Party A Net Income Override" value={fmt(store.assumptions.overrideNetIncomeA)} />
            )}
            {(store.assumptions.overrideNetIncomeB != null && store.assumptions.overrideNetIncomeB > 0) && (
              <AssumptionRow label="Party B Net Income Override" value={fmt(store.assumptions.overrideNetIncomeB)} />
            )}
            {(store.assumptions.overrideCMSAnnual != null && store.assumptions.overrideCMSAnnual > 0) && (
              <AssumptionRow label="Child Maintenance Override" value={`${fmt(store.assumptions.overrideCMSAnnual)}/yr`} />
            )}
          </div>
          <div className="mt-4 pt-3 border-t">
            <ReportCollapsible title="Tax Model Scope (2026/27)">
            <div className="text-xs text-gray-600 space-y-2">
              <p>The tax engine aggregates all entered income sources (salary, self-employment, rental, dividends, benefits) per party and applies a single income tax and employee Class 1 NI calculation. Personal allowance tapering above £100,000 is modelled.</p>
              <p className="font-medium text-gray-700">The following are not separately modelled:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Dividend tax rates (8.75% / 33.75% / 39.35%) and the £1,000 dividend allowance — dividends are taxed at standard income tax rates</li>
                <li>Savings income allowance (£1,000 basic / £500 higher rate) and starting rate for savings</li>
                <li>Capital Gains Tax on disposal of investments, second properties, or business assets</li>
                <li>Scottish income tax rates — England, Wales, and Northern Ireland rates are applied to all parties</li>
                <li>Self-employed National Insurance (Class 2 and Class 4) — employee Class 1 rates are used for all income</li>
                <li>High Income Child Benefit Charge (income above £60,000)</li>
                <li>Pension contribution tax relief (salary sacrifice or relief at source)</li>
                <li>Student loan repayments (Plan 1, Plan 2, Plan 4, or Postgraduate)</li>
              </ul>
              <p className="italic">Where these factors are material to either party, actual net income may differ from the figures presented. Independent tax review may be warranted.</p>
            </div>
            </ReportCollapsible>
          </div>
          <div className="mt-3 pt-3 border-t">
            <ReportCollapsible title="Limitations & Exclusions">
            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
              <li>All figures are estimates based on the information entered and may differ from actual outcomes.</li>
              <li>Lending capacity benchmarks are generalised income multiple illustrations and do not constitute a lending assessment, mortgage advice, or credit approval indication.</li>
              <li>Property valuations, pension transfer values, and other asset values should be independently verified.</li>
              <li>This analysis does not account for potential changes in legislation, tax rates, or personal circumstances.</li>
            </ul>
            </ReportCollapsible>
          </div>
          <div className="mt-3 pt-3 border-t">
            <ReportCollapsible title="Explicit Assumption Statements">
            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
              <li><span className="font-medium">Transaction costs:</span> Estimated selling costs (agent fees, conveyancing) are deducted from net equity in sale scenarios. Early repayment charges, stamp duty on purchase, legal fees for transfers, and moving costs are not separately modelled. Independent estimates for these items may be warranted.</li>
              <li><span className="font-medium">Pension valuations:</span> Pension values are entered by the user and treated as nominal CETV figures. No adjustment is made for pension type (defined benefit vs defined contribution), tax on drawdown, or actuarial factors. Pension sharing orders may result in different actual values.</li>
              <li><span className="font-medium">Capital gains tax:</span> No CGT liability is modelled on the disposal of investments or assets. The principal private residence exemption is assumed to apply to the family home. Independent tax review may be warranted where significant investment portfolios are involved.</li>
              <li><span className="font-medium">Spousal maintenance:</span> Periodic spousal maintenance payments are not included in the model. Where spousal maintenance is applicable, net income and surplus figures may require adjustment to reflect those payments.</li>
            </ul>
            </ReportCollapsible>
          </div>
        </ReportSection>

        <section className="mb-6 page-break" data-testid="section-report-glossary">
          <h3 className="text-lg font-bold mb-3 border-b pb-1">Glossary of Key Terms</h3>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div><span className="font-semibold">Liquid Capital:</span> <span className="text-gray-600">Cash, savings, ISAs, and investments that can be accessed or realised within a short timeframe.</span></div>
            <div><span className="font-semibold">Net Equity:</span> <span className="text-gray-600">The value of property after deducting the outstanding mortgage balance and estimated selling costs.</span></div>
            <div><span className="font-semibold">Equity Transfer Obligation:</span> <span className="text-gray-600">The lump sum payable by the party retaining the property to compensate the departing party for their share of net equity.</span></div>
            <div><span className="font-semibold">Reserve Duration:</span> <span className="text-gray-600">The projected period for which liquid reserves can sustain expenditure, measured in months or years.</span></div>
            <div><span className="font-semibold">Financial Sustainability Indicator (Illustrative Model Output):</span> <span className="text-gray-600">A composite indicator reflecting liquidity sustainability and lending capacity benchmarks under current modelling assumptions. It is not a suitability or lending assessment.</span></div>
            <div><span className="font-semibold">CETV (Cash Equivalent Transfer Value):</span> <span className="text-gray-600">The estimated lump sum value of a pension, used for comparison and division purposes.</span></div>
            <div><span className="font-semibold">CMS (Child Maintenance Service):</span> <span className="text-gray-600">The UK government service that calculates child maintenance obligations based on income and overnight stays.</span></div>
            <div><span className="font-semibold">Income Multiple:</span> <span className="text-gray-600">The ratio of mortgage required to gross annual income, used as a generalised lending capacity benchmark.</span></div>
          </div>
        </section>

        {store.guidedSummary && store.guidedSummaryStatus === "done" && (
          <GuidedSummaryReportSection summary={store.guidedSummary} />
        )}

        <footer className="mt-12 pt-6 border-t border-gray-300 text-center space-y-2 pb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <LogoPrint className="h-6" />
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed max-w-lg mx-auto">
            Illustrative modelling only — not legal, tax, or financial advice.
            All outputs are estimates based on the information entered and standard assumptions. They must not be relied upon for decision-making. Lending capacity benchmarks are generalised income multiple illustrations and do not constitute a lending assessment, mortgage advice, or credit approval indication.
          </p>
        </footer>
      </div>
    </div>
  );
}

function GuidedSummaryReportSection({ summary }: { summary: GuidedSummary }) {
  const hasProperty = summary.questions_for_professionals.mortgage_broker?.length > 0;
  const hasPension = summary.questions_for_professionals.pension_expert?.length > 0;

  const confidenceStyle =
    summary.confidence === "High"
      ? "border-emerald-400 text-emerald-700 bg-emerald-50"
      : summary.confidence === "Medium"
      ? "border-amber-400 text-amber-700 bg-amber-50"
      : "border-rose-400 text-rose-700 bg-rose-50";

  const GSBLOCKS = [
    { title: "Plain-English Overview",   content: summary.overview,               border: "border-l-blue-800/40" },
    { title: "What Stands Out",          content: summary.what_stands_out,        border: "border-l-yellow-500/50" },
    { title: "Scenario Interpretation",  content: summary.scenario_interpretation, border: "border-l-cyan-500/50" },
    { title: "Pressure Points",          content: summary.pressure_points,        border: "border-l-rose-400/60" },
    { title: "Missing Information & Model Confidence", content: summary.missing_information, border: "border-l-amber-400/60" },
  ];

  const proGroups = [
    { label: "Solicitor / Mediator", questions: summary.questions_for_professionals.solicitor_mediator, show: true },
    { label: "Mortgage Broker",       questions: summary.questions_for_professionals.mortgage_broker,    show: hasProperty && (summary.questions_for_professionals.mortgage_broker?.length ?? 0) > 0 },
    { label: "Pension Expert",        questions: summary.questions_for_professionals.pension_expert,     show: hasPension  && (summary.questions_for_professionals.pension_expert?.length  ?? 0) > 0 },
  ].filter(g => g.show);

  return (
    <section className="mb-8 break-inside-avoid" data-testid="section-report-guided-summary">
      {/* Premium header */}
      <div className="bg-gradient-to-r from-[hsl(220_52%_22%)] to-[hsl(220_52%_16%)] rounded-xl px-5 py-4 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
            <span className="text-gold text-sm font-bold">✦</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Guided Report Summary</h2>
            <p className="text-[10px] text-white/45 mt-0.5">Plain-English analysis of your modelled figures</p>
          </div>
        </div>
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${confidenceStyle}`}>
          Confidence: {summary.confidence}
        </span>
      </div>

      <div className="space-y-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        {GSBLOCKS.map(b => (
          <div key={b.title} className={`border-l-4 ${b.border} pl-4 py-1`}>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">{b.title}</h4>
            <div className="text-sm text-gray-700 space-y-1.5 leading-relaxed">
              {b.content.split("\n").filter(Boolean).map((line, i) => (
                <p key={i}>{line.startsWith("- ") || line.startsWith("• ") ? (
                  <span className="flex gap-2"><span className="text-gray-400 shrink-0 mt-0.5">•</span><span>{line.replace(/^[-•]\s*/, "")}</span></span>
                ) : line}</p>
              ))}
            </div>
          </div>
        ))}

        <div className="border-l-4 border-l-cyan-400/50 pl-4 py-1">
          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Questions for Professionals</h4>
          <div className="space-y-4">
            {proGroups.map(g => (
              <div key={g.label}>
                <p className="text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block" />
                  {g.label}
                </p>
                <ol className="list-decimal list-inside space-y-1">
                  {(g.questions ?? []).map((q, i) => (
                    <li key={i} className="text-sm text-gray-700 leading-relaxed">{q}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 italic mt-3">
        This guided summary is illustrative and generated from the figures entered. It is not legal, tax, or financial advice.
        Generated: {new Date(summary.generatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.
      </p>
    </section>
  );
}

function ReportSection({ title, children, accentColor }: { title: string; children: React.ReactNode; accentColor?: string }) {
  return (
    <section className="mb-8 break-inside-avoid" data-testid={`section-report-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-stretch gap-0 mb-5 rounded-lg overflow-hidden shadow-sm">
        <div className="w-1.5 shrink-0" style={{ background: accentColor ?? "#1e3a5f" }} />
        <div className="flex-1 bg-gradient-to-r from-[hsl(220_52%_20%)] to-[hsl(220_52%_16%)] px-5 py-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h2>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        {children}
      </div>
    </section>
  );
}

function ReportCollapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="print:hidden w-full flex items-center justify-between gap-2 py-1 text-left"
        onClick={() => setOpen(!open)}
      >
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</h4>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <h4 className="hidden print:block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{title}</h4>
      <div className={open ? "" : "hidden print:block"}>
        {children}
      </div>
    </div>
  );
}

function TaxSummaryColumn({ label, tax }: { label: string; tax: { gross: number; personalAllowance: number; incomeTax: number; nationalInsurance: number; net: number } }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{label}</h4>
      <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2 px-3 text-gray-600">Gross Annual Income</td>
              <td className="py-2 px-3 text-right tabular-nums font-medium text-gray-800">{fmt(tax.gross)}</td>
            </tr>
            <tr className="border-b border-gray-100 bg-white">
              <td className="py-2 px-3 text-gray-500">Personal Allowance</td>
              <td className="py-2 px-3 text-right tabular-nums text-gray-600">{fmt(tax.personalAllowance)}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 px-3 text-gray-500">Income Tax Liability</td>
              <td className="py-2 px-3 text-right tabular-nums text-rose-600 font-medium">({fmt(tax.incomeTax)})</td>
            </tr>
            <tr className="border-b border-gray-100 bg-white">
              <td className="py-2 px-3 text-gray-500">National Insurance</td>
              <td className="py-2 px-3 text-right tabular-nums text-rose-600 font-medium">({fmt(tax.nationalInsurance)})</td>
            </tr>
            <tr className="bg-primary/5 border-t-2 border-primary/20">
              <td className="py-2.5 px-3 font-semibold text-gray-800">Take-Home Pay (annual)</td>
              <td className="py-2.5 px-3 text-right tabular-nums font-bold text-emerald-700">{fmt(tax.net)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FundsColumn({ label, funds, color }: { label: string; funds: { rows: { label: string; amount: number; subItems?: { label: string; amount: number }[] }[]; netStartingLiquid: number }; color: string }) {
  return (
    <div>
      <h5 className="text-xs font-semibold text-gray-500 mb-1">{label}</h5>
      <table className="w-full text-sm">
        <tbody>
          {funds.rows.map((r, i) => (
            <Fragment key={i}>
              <tr className="border-b border-gray-100">
                <td className={`py-0.5 text-gray-600 ${r.label.toLowerCase().includes("total") ? "font-bold" : ""}`}>{r.label}</td>
                <td className={`py-0.5 text-right tabular-nums ${r.amount < 0 ? "text-red-500" : ""} ${r.label.toLowerCase().includes("total") ? "font-bold" : ""}`}>
                  {r.amount < 0 ? `(${fmt(Math.abs(r.amount))})` : fmt(r.amount)}
                </td>
              </tr>
              {r.subItems?.map((sub, si) => (
                <tr key={`${i}-${si}`} className="text-xs text-gray-400">
                  <td className="py-0 pl-3">{sub.label}</td>
                  <td className={`py-0 text-right tabular-nums ${sub.amount < 0 ? "text-red-400" : ""}`}>
                    {sub.amount < 0 ? `(${fmt(Math.abs(sub.amount))})` : fmt(sub.amount)}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      <div className="mt-1 pt-1 border-t border-gray-200 flex items-center justify-between text-sm font-semibold">
        <span>Net Liquid Capital</span>
        <span className={`tabular-nums ${color}`}>{fmt(funds.netStartingLiquid)}</span>
      </div>
    </div>
  );
}

function ComparisonRow({ label, values, bold }: { label: string; values: number[]; bold?: boolean }) {
  return (
    <tr className={`border-b border-gray-100 premium-table-row-alt ${bold ? "font-semibold bg-gray-50" : ""}`}>
      <td className="py-1.5 px-2 text-gray-600 text-xs">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={`py-1.5 px-2 text-right tabular-nums text-xs ${v < 0 ? "text-red-500" : v > 0 ? "text-gray-800" : "text-gray-400"}`}>
          {v === 0 ? "—" : v < 0 ? `(${fmt(Math.abs(v))})` : fmt(v)}
        </td>
      ))}
    </tr>
  );
}

function DeltaValue({ v }: { v: number }) {
  if (Math.abs(v) < 1) return <span className="text-gray-400">—</span>;
  return (
    <span className={v > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
      {v > 0 ? "+" : ""}{fmt(v)}
    </span>
  );
}

function ReportScenarioConsiderations({
  scenario,
  engine,
  store,
}: {
  scenario: ScenarioResult;
  engine: ReturnType<typeof useEngine>;
  store: StoreState;
}) {
  const considerations: string[] = [];
  const { intermediate, budget } = engine;

  const totalA = scenario.totalA || 1;
  const totalB = scenario.totalB || 1;
  const propConcA = ((scenario.homeEquityA ?? 0) / totalA) * 100;
  const propConcB = ((scenario.homeEquityB ?? 0) / totalB) * 100;

  if (propConcA > 70 || propConcB > 70) {
    const party = propConcA > propConcB ? "Party A" : "Party B";
    const pct_val = Math.round(Math.max(propConcA, propConcB));
    considerations.push(
      `This scenario results in ${pct_val}% of ${party}'s net worth being held in property. Reduced liquidity may be a relevant consideration for short-term financial flexibility.`
    );
  }

  if ((scenario.fundingGap ?? 0) > 0) {
    considerations.push(
      `This scenario requires additional funding of ${fmt(scenario.fundingGap!)}. This shortfall may require increased borrowing or alternative asset sources.`
    );
  }

  const hasMortgageA = (scenario.mortgageMonthlyA ?? 0) > 0;
  const hasMortgageB = (scenario.mortgageMonthlyB ?? 0) > 0;
  if (hasMortgageA || hasMortgageB) {
    const keeperNet = hasMortgageA ? engine.taxA.net : engine.taxB.net;
    const keeperMortgage = hasMortgageA ? (scenario.mortgageMonthlyA ?? 0) * 12 : (scenario.mortgageMonthlyB ?? 0) * 12;
    if (keeperNet > 0) {
      const ratio = Math.round((keeperMortgage / keeperNet) * 100);
      if (ratio > 35) {
        considerations.push(
          `Mortgage obligations represent ${ratio}% of net income. Income sustainability over the next 3-5 years may warrant further assessment.`
        );
      }
    }
  }

  const liquidA = scenario.liquidStartA ?? 0;
  const liquidB = scenario.liquidStartB ?? 0;
  const expenseA = store.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const expenseB = store.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);

  if (expenseA > 0 && liquidA < expenseA) {
    const months = Math.round((liquidA / expenseA) * 12);
    considerations.push(
      `Party A's liquid capital covers approximately ${months} month${months !== 1 ? "s" : ""} of expenses. Contingency planning may warrant further assessment.`
    );
  }
  if (expenseB > 0 && liquidB < expenseB) {
    const months = Math.round((liquidB / expenseB) * 12);
    considerations.push(
      `Party B's liquid capital covers approximately ${months} month${months !== 1 ? "s" : ""} of expenses. Contingency planning may warrant further assessment.`
    );
  }

  if (engine.budget.surplusA < 0) {
    considerations.push(
      `Party A is projected to have a monthly deficit of ${fmt(Math.abs(engine.budget.surplusA / 12))}/month. Expenditure adjustments or supplementary income sources may warrant further assessment.`
    );
  }
  if (engine.budget.surplusB < 0) {
    considerations.push(
      `Party B is projected to have a monthly deficit of ${fmt(Math.abs(engine.budget.surplusB / 12))}/month. Expenditure adjustments or supplementary income sources may warrant further assessment.`
    );
  }

  if (scenario.id === "S4") {
    considerations.push(
      `This scenario involves a deferred settlement, meaning the property arrangement remains in place for an extended period. Ongoing shared legal obligations and future market conditions may be relevant considerations.`
    );
  }

  const limited = considerations.slice(0, 5);
  if (limited.length === 0) return null;

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Scenario Considerations</h4>
      <p className="text-[10px] text-gray-400 italic mb-2">Structured reflection points based on modelled outputs. Not recommendations or advice.</p>
      <ul className="space-y-1">
        {limited.map((c, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
            <span className="text-gray-400 mt-0.5">{i + 1}.</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AssumptionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-0.5 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className="tabular-nums font-medium text-gray-800">{value}</span>
    </div>
  );
}
