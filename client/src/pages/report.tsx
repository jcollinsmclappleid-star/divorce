import { useMemo, Fragment } from "react";
import { Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine, ScenarioResult, ProjectionYear } from "@/hooks/use-engine";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
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

const SCENARIO_META: Record<string, { label: string; color: string }> = {
  S1: { label: "Sell & Split", color: "#2563EB" },
  S2: { label: "A Keeps Home", color: "#10B981" },
  S3: { label: "B Keeps Home", color: "#8B5CF6" },
  S4: { label: "Deferred Sale", color: "#F59E0B" },
};

function fmt(v: number) { return formatCurrency(v); }
function pct(v: number) { return `${Math.round(v * 100)}%`; }

function computeAllScenarios(engine: ReturnType<typeof useEngine>): ScenarioResult[] {
  const all: ScenarioResult[] = [];
  for (const s of engine.scenarios) {
    if (s.id === "S1" || s.id === "S2" || s.id === "S3") all.push(s);
  }
  return all.length > 0 ? all : engine.scenarios;
}

export default function ReportPage() {
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="print:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <Link href="/results">
            <Button variant="outline" size="sm" data-testid="button-back-results">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Results
            </Button>
          </Link>
          <Button onClick={() => window.print()} data-testid="button-print-report">
            <Printer className="w-4 h-4 mr-1" /> Download / Print
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-10 print:px-0 print:py-0" data-testid="report-content">
        <header className="mb-10 pb-6 border-b-2 border-gray-800">
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-report-title">Structured Financial Brief</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generated {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} &middot; UK {store.config.taxYear} Tax Rules
          </p>
          <p className="text-xs text-gray-400 mt-3 italic">
            Illustrative modelling only. This is not legal, tax or financial advice. All figures are estimates based on the inputs provided and current UK tax/NI rules.
          </p>
        </header>

        <ReportSection title="1. Starting Position">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Assets</h4>
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
            <span>Combined Net Worth</span>
            <span className="tabular-nums">{fmt(engine.netWorth.total)}</span>
          </div>
        </ReportSection>

        <ReportSection title="2. Income & Tax Summary">
          <div className="grid grid-cols-2 gap-8">
            <TaxSummaryColumn label="Party A" tax={engine.taxA} />
            <TaxSummaryColumn label="Party B" tax={engine.taxB} />
          </div>
          {engine.cmsAnnual > 0 && (
            <div className="mt-3 pt-2 border-t border-gray-200 text-sm">
              <span className="text-gray-600">Estimated Child Maintenance (CMS): </span>
              <span className="font-semibold tabular-nums">{fmt(engine.cmsAnnual)}/yr</span>
              <span className="text-gray-400 text-xs ml-2">({fmt(engine.cmsWeekly)}/wk)</span>
            </div>
          )}
        </ReportSection>

        <ReportSection title="3. Monthly Living Costs">
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

        <ReportSection title="4. Scenario Comparison">
          <p className="text-xs text-gray-500 mb-3">
            Split assumption: {pct(store.assumptions.splitRatio)} to Party A, {pct(1 - store.assumptions.splitRatio)} to Party B.
            Pension split: {pct(store.assumptions.splitPensionToA)} to A, {pct(1 - store.assumptions.splitPensionToA)} to B.
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Metric</th>
                {allScenarios.map(sc => (
                  <th key={sc.id} className="text-right py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: SCENARIO_META[sc.id]?.color }}>
                    {SCENARIO_META[sc.id]?.label ?? sc.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <ComparisonRow label="Liquid Cash — A" values={allScenarios.map(s => s.liquidStartA)} />
              <ComparisonRow label="Liquid Cash — B" values={allScenarios.map(s => s.liquidStartB)} />
              <ComparisonRow label="Pension — A" values={allScenarios.map(s => s.pensionA)} />
              <ComparisonRow label="Pension — B" values={allScenarios.map(s => s.pensionB)} />
              <ComparisonRow label="Total — A" values={allScenarios.map(s => s.totalA)} bold />
              <ComparisonRow label="Total — B" values={allScenarios.map(s => s.totalB)} bold />
              <ComparisonRow label="Monthly Mortgage — A" values={allScenarios.map(s => s.mortgageMonthlyA ?? 0)} />
              <ComparisonRow label="Monthly Mortgage — B" values={allScenarios.map(s => s.mortgageMonthlyB ?? 0)} />
            </tbody>
          </table>
        </ReportSection>

        {scenarioData.map(({ sc, narrative, sourceOfFunds, stability, snapshot, comparison, housing }, idx) => (
          <ReportSection key={sc.id} title={`${5 + idx}. ${SCENARIO_META[sc.id]?.label ?? sc.name} — Detail`}>
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Summary</h4>
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

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Source of Funds</h4>
                <div className="grid grid-cols-2 gap-6">
                  <FundsColumn label="Party A" funds={sourceOfFunds.A} color="text-blue-600" />
                  <FundsColumn label="Party B" funds={sourceOfFunds.B} color="text-emerald-600" />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Stability Score</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Party A</p>
                    <div className="text-xl font-bold tabular-nums" style={{ color: stability.scoreA >= 60 ? "#10B981" : stability.scoreA >= 35 ? "#F59E0B" : "#EF4444" }}>
                      {stability.scoreA}/100 <span className="text-xs font-normal text-gray-400">{stability.labelA}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {stability.reasonsA.slice(0, 3).map((r: { label: string; points: number }, i: number) => (
                        <span key={i} className="block">{r.label}: {r.points > 0 ? "+" : ""}{r.points} pts</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Party B</p>
                    <div className="text-xl font-bold tabular-nums" style={{ color: stability.scoreB >= 60 ? "#10B981" : stability.scoreB >= 35 ? "#F59E0B" : "#EF4444" }}>
                      {stability.scoreB}/100 <span className="text-xs font-normal text-gray-400">{stability.labelB}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {stability.reasonsB.slice(0, 3).map((r: { label: string; points: number }, i: number) => (
                        <span key={i} className="block">{r.label}: {r.points > 0 ? "+" : ""}{r.points} pts</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Monthly Budget Snapshot</h4>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Party A</p>
                    <p className="text-gray-500">Net income: {fmt(snapshot.netMonthlyIncomeA)}/mo</p>
                    {(sc.mortgageMonthlyA ?? 0) > 0 && <p className="text-gray-500">Mortgage: {fmt(sc.mortgageMonthlyA!)}/mo</p>}
                    <p className={`font-semibold ${snapshot.surplusA >= 0 ? "text-green-600" : "text-red-600"}`}>
                      Surplus: {fmt(snapshot.surplusA)}/mo
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Party B</p>
                    <p className="text-gray-500">Net income: {fmt(snapshot.netMonthlyIncomeB)}/mo</p>
                    {(sc.mortgageMonthlyB ?? 0) > 0 && <p className="text-gray-500">Mortgage: {fmt(sc.mortgageMonthlyB!)}/mo</p>}
                    <p className={`font-semibold ${snapshot.surplusB >= 0 ? "text-green-600" : "text-red-600"}`}>
                      Surplus: {fmt(snapshot.surplusB)}/mo
                    </p>
                  </div>
                </div>
              </div>

              {housing && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Housing Feasibility</h4>
                  <div className="text-sm text-gray-600 space-y-0.5">
                    <p>Mortgage required: {fmt(housing.mortgageRequired)}</p>
                    <p>Income multiple: {housing.incomeMultiple.toFixed(1)}x <span className="text-xs text-gray-400">(UK standard: {housing.typicalMaxMultiple}x max)</span></p>
                    <p>Deposit: {fmt(housing.availableDeposit)} ({pct(housing.depositPercentage)})</p>
                    <p>Payment as % of net income: {pct(housing.monthlyPaymentAsPercentOfNetIncome)}</p>
                    <p className={housing.withinLendingCriteria ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                      {housing.withinLendingCriteria ? "Likely within lending criteria" : "Likely stretched or outside lending criteria"}
                    </p>
                    {housing.notes.map((n: string, ni: number) => (
                      <p key={ni} className="text-xs text-gray-400">{n}</p>
                    ))}
                  </div>
                </div>
              )}

              {comparison && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Compared to Sell & Split</h4>
                  <div className="text-sm text-gray-600 space-y-0.5">
                    <p>Liquid capital change — A: <DeltaValue v={comparison.deltaLiquidA} /></p>
                    <p>Liquid capital change — B: <DeltaValue v={comparison.deltaLiquidB} /></p>
                    <p>Net worth change — A: <DeltaValue v={comparison.deltaNetWorthA} /></p>
                    <p>Net worth change — B: <DeltaValue v={comparison.deltaNetWorthB} /></p>
                    {comparison.notes.map((n: string, ni: number) => (
                      <p key={ni} className="text-xs text-gray-400">{n}</p>
                    ))}
                  </div>
                </div>
              )}

              {narrative.riskFlags.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-1">Risk Flags</h4>
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
            </div>
          </ReportSection>
        ))}

        <ReportSection title={`${5 + scenarioData.length}. Key Assumptions`}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            <AssumptionRow label="Asset split" value={`${pct(store.assumptions.splitRatio)} / ${pct(1 - store.assumptions.splitRatio)}`} />
            <AssumptionRow label="Pension split" value={`${pct(store.assumptions.splitPensionToA)} / ${pct(1 - store.assumptions.splitPensionToA)}`} />
            <AssumptionRow label="Mortgage APR" value={`${(store.assumptions.mortgageAPR * 100).toFixed(1)}%`} />
            <AssumptionRow label="Mortgage term" value={`${store.assumptions.mortgageTermYears} years`} />
            <AssumptionRow label="Projection period" value={`${store.assumptions.projectionYears} years`} />
            <AssumptionRow label="Inflation rate" value={`${(store.assumptions.inflationRate * 100).toFixed(1)}%`} />
            <AssumptionRow label="Tax model" value={store.assumptions.includeTaxModel ? "UK 2025/26" : "Off"} />
            <AssumptionRow label="CMS estimate" value={store.assumptions.includeCMSEstimate ? "Included" : "Excluded"} />
            {store.children.numChildren > 0 && (
              <>
                <AssumptionRow label="Children" value={`${store.children.numChildren}`} />
                <AssumptionRow label="Nights with A" value={`${store.children.nightsWithA}`} />
              </>
            )}
          </div>
        </ReportSection>

        <footer className="mt-12 pt-6 border-t border-gray-300 text-center space-y-2 pb-10">
          <p className="text-xs text-gray-400 font-semibold">DivorceModeller.UK</p>
          <p className="text-[10px] text-gray-400 leading-relaxed max-w-lg mx-auto">
            This document is an illustrative financial model and does not constitute legal, tax, or financial advice.
            It is based on the inputs you provided and current UK tax/NI rules. You should seek independent professional
            advice before making any financial decisions related to divorce or separation.
          </p>
        </footer>
      </div>
    </div>
  );
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 break-inside-avoid" data-testid={`section-report-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">{title}</h2>
      {children}
    </section>
  );
}

function TaxSummaryColumn({ label, tax }: { label: string; tax: { gross: number; personalAllowance: number; incomeTax: number; nationalInsurance: number; net: number } }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{label}</h4>
      <table className="w-full text-sm">
        <tbody>
          <tr className="border-b border-gray-100"><td className="py-1 text-gray-600">Gross income</td><td className="py-1 text-right tabular-nums">{fmt(tax.gross)}</td></tr>
          <tr className="border-b border-gray-100"><td className="py-1 text-gray-600">Personal allowance</td><td className="py-1 text-right tabular-nums">{fmt(tax.personalAllowance)}</td></tr>
          <tr className="border-b border-gray-100"><td className="py-1 text-gray-600">Income tax</td><td className="py-1 text-right tabular-nums text-red-600">({fmt(tax.incomeTax)})</td></tr>
          <tr className="border-b border-gray-100"><td className="py-1 text-gray-600">National Insurance</td><td className="py-1 text-right tabular-nums text-red-600">({fmt(tax.nationalInsurance)})</td></tr>
          <tr className="font-semibold"><td className="py-1">Net income</td><td className="py-1 text-right tabular-nums">{fmt(tax.net)}</td></tr>
        </tbody>
      </table>
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
                <td className="py-0.5 text-gray-600">{r.label}</td>
                <td className={`py-0.5 text-right tabular-nums ${r.amount < 0 ? "text-red-500" : ""}`}>
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
        <span>Net liquid capital</span>
        <span className={`tabular-nums ${color}`}>{fmt(funds.netStartingLiquid)}</span>
      </div>
    </div>
  );
}

function ComparisonRow({ label, values, bold }: { label: string; values: number[]; bold?: boolean }) {
  return (
    <tr className={`border-b border-gray-100 ${bold ? "font-semibold" : ""}`}>
      <td className="py-1 text-gray-600">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={`py-1 text-right tabular-nums ${v < 0 ? "text-red-500" : ""}`}>
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

function AssumptionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-0.5 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className="tabular-nums font-medium text-gray-800">{value}</span>
    </div>
  );
}
