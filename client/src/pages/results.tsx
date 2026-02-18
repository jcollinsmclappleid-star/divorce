import { useState, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine, ScenarioResult, ProjectionYear, RunwayResult } from "@/hooks/use-engine";
import { calcMortgagePayment } from "@/lib/engine/calc/mortgage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend
} from "recharts";
import {
  Calculator, ChevronLeft, ChevronRight, ChevronDown, Check, X, AlertTriangle,
  TrendingUp, Edit, Shield, ArrowDown, ArrowUp, Minus,
  PoundSterling, Home, Info, Lightbulb, BarChart3, Eye,
  Target, Activity, Building2, FileText
} from "lucide-react";
import {
  generateScenarioNarrative,
  buildSourceOfFunds,
  computeStabilityScore,
  compareToSell,
  buildMonthlySnapshot,
  generateNegotiationLevers,
  computeSensitivityRanking,
  computeHousingFeasibility,
} from "@/lib/insights";
import type {
  ScenarioNarrative, SourceOfFunds, StabilityResult, ComparisonDelta, MonthlySnapshotResult,
  NegotiationLever, SensitivityFactor, HousingFeasibility,
} from "@/lib/insights";

type ViewLens = "liquidity" | "networth" | "risk";

const SCENARIO_META: Record<string, { label: string; shortLabel: string; color: string; description: string }> = {
  S1: { label: "Sell & Split", shortLabel: "Sell & Split", color: "#2563EB", description: "Property sold; net proceeds distributed between parties" },
  S2: { label: "A Keeps House", shortLabel: "A Keeps House", color: "#10B981", description: "Party A retains the family property" },
  S3: { label: "B Keeps House", shortLabel: "B Keeps House", color: "#8B5CF6", description: "Party B retains the family property" },
  S4: { label: "Deferred Sale", shortLabel: "Deferred", color: "#F59E0B", description: "Property sale deferred to a future date" },
};

function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center ml-1 text-muted-foreground/60 hover:text-muted-foreground cursor-help"
          data-testid="button-info-tip"
          onClick={(e) => { e.preventDefault(); setOpen(o => !o); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[250px] text-xs">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function CollapsibleSection({ title, subtitle, icon, children, defaultOpen = false, testId }: { title: string; subtitle: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; testId: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-md overflow-visible" data-testid={testId}>
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover-elevate"
        onClick={() => setOpen(!open)}
        data-testid={`button-toggle-${testId}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const store = useAppStore();
  const { assumptions, updateAssumptions } = store;
  const engine = useEngine();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [viewLens, setViewLens] = useState<ViewLens>("liquidity");

  const allScenarios = computeAllScenarios(engine);
  const displayScenarios = allScenarios.filter(s => s.id !== "S4");

  const activeScenario = activeTab ? allScenarios.find(s => s.id === activeTab) : null;
  const activeProjection = activeTab ? engine.projections[activeTab] : null;

  const s1 = allScenarios.find(s => s.id === "S1");

  const stabilityScores = useMemo(() => {
    const scores: Record<string, StabilityResult> = {};
    for (const sc of allScenarios) {
      scores[sc.id] = computeStabilityScore(sc, engine.projections[sc.id], store);
    }
    return scores;
  }, [allScenarios, engine.projections, store]);

  const setPreset = (split: number, pension: number) => {
    updateAssumptions({ splitRatio: split, splitPensionToA: pension });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20" data-testid="text-disclaimer">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-bold tracking-tight hidden sm:inline-block">
              DivorceModeller<span className="text-primary">.UK</span>
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/report">
              <Button variant="outline" size="sm" data-testid="button-download-report">
                <FileText className="w-4 h-4 mr-1" /> Download Report
              </Button>
            </Link>
            <Link href="/wizard">
              <Button variant="outline" size="sm" data-testid="button-edit-inputs">
                <Edit className="w-4 h-4 mr-1" /> Edit Inputs
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="sticky top-[57px] z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label className="text-xs text-muted-foreground">Asset Split (A : B)</Label>
              <Slider
                value={[assumptions.splitRatio * 100]}
                onValueChange={([v]) => updateAssumptions({ splitRatio: v / 100 })}
                min={30} max={70} step={5}
                data-testid="slider-split-ratio"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>{Math.round(assumptions.splitRatio * 100)}%</span>
                <span>{Math.round((1 - assumptions.splitRatio) * 100)}%</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label className="text-xs text-muted-foreground">Pension Split (A : B)</Label>
              <Slider
                value={[assumptions.splitPensionToA * 100]}
                onValueChange={([v]) => updateAssumptions({ splitPensionToA: v / 100 })}
                min={0} max={100} step={5}
                data-testid="slider-pension-split"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>{Math.round(assumptions.splitPensionToA * 100)}%</span>
                <span>{Math.round((1 - assumptions.splitPensionToA) * 100)}%</span>
              </div>
            </div>
            <div className="flex gap-1.5">
              <Button variant={assumptions.splitRatio === 0.5 ? "default" : "outline"} size="sm" onClick={() => setPreset(0.5, 0.5)} data-testid="button-preset-equal">50/50</Button>
              <Button variant={assumptions.splitRatio === 0.6 ? "default" : "outline"} size="sm" onClick={() => setPreset(0.6, 0.6)} data-testid="button-preset-needs">60/40</Button>
              <Button variant={assumptions.splitRatio === 0.7 ? "default" : "outline"} size="sm" onClick={() => setPreset(0.7, 0.7)} data-testid="button-preset-strong">70/30</Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-10">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight" data-testid="text-results-title">
                Structured Financial Brief
              </h1>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed max-w-2xl">
                Compare post-settlement financial positions under each scenario. Adjust the settlement ratio using the controls above. Select an analytical lens below to prioritise the relevant metrics.
              </p>
            </div>

            <DecisionLensToggle viewLens={viewLens} setViewLens={setViewLens} />

            <div className="p-4 rounded-md border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed" data-testid="text-guidance-callout">
                <Info className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                The table below compares the allocated capital position for each party under each settlement scenario. Select the <span className="inline-flex items-center"><Info className="w-3 h-3 mx-0.5" /></span> information icons for supplementary definitions. Use the settlement ratio controls to model alternative distributions.
              </p>
            </div>
          </div>

          {displayScenarios.length > 0 ? (
            <>
              <ExecutiveTable
                scenarios={displayScenarios}
                projections={engine.projections}
                stabilityScores={stabilityScores}
                viewLens={viewLens}
                engine={engine}
                store={store}
                runways={engine.runways}
              />

              <div>
                <h2 className="text-xl font-display font-bold mb-1 tracking-tight">Scenario Analysis</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Select a scenario below for detailed analysis — including capital allocation, source of funds breakdown, monthly financial position, and stability assessment.
                </p>
                <div className="grid gap-3 sm:grid-cols-3 mb-6">
                  {allScenarios.map(s => {
                    const meta = SCENARIO_META[s.id];
                    const isActive = activeTab === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        className={`text-left p-4 rounded-md border-2 transition-colors ${isActive ? "border-primary bg-primary/5" : "border-border hover-elevate"}`}
                        onClick={() => setActiveTab(isActive ? null : s.id)}
                        data-testid={`button-tab-${s.id}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: meta?.color }} />
                          <span className="text-sm font-semibold">{meta?.label ?? s.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{meta?.description}</p>
                        {isActive && <p className="text-xs text-primary font-medium mt-2">Showing breakdown below</p>}
                      </button>
                    );
                  })}
                </div>

                {activeScenario && (
                  <ScenarioDetailCard
                    scenario={activeScenario}
                    projection={activeProjection}
                    engine={engine}
                    store={store}
                    stabilityScore={stabilityScores[activeScenario.id]}
                    sellScenario={s1}
                    sellProjection={s1 ? engine.projections["S1"] : undefined}
                  />
                )}
                {!activeScenario && (
                  <div className="p-8 text-center border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground text-sm">Select one of the scenarios above to see its detailed breakdown</p>
                  </div>
                )}
              </div>

              {allScenarios.length > 1 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" /> Final Allocated Capital Position
                    </CardTitle>
                    <CardDescription>Total net asset allocation per party, comprising liquid capital, property equity, and pension valuations</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={allScenarios.map(sc => ({
                          name: SCENARIO_META[sc.id]?.shortLabel ?? sc.id,
                          'Party A': sc.totalA,
                          'Party B': sc.totalB,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                        <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(v) => v >= 1000000 ? `\u00A3${(v / 1000000).toFixed(1)}m` : `\u00A3${(v / 1000).toFixed(0)}k`} />
                        <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="Party A" fill="#2563EB" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Party B" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-3">
                <h2 className="text-lg font-display font-bold tracking-tight flex items-center gap-2">
                  Supplementary Analysis
                </h2>
                <p className="text-sm text-muted-foreground">Expand any section below for additional analytical detail.</p>
                <div className="space-y-2">
                  <CollapsibleSection title="Structural Comparison" subtitle="Qualitative structural assessment across modelled scenarios" icon={<BarChart3 className="w-4 h-4" />} testId="collapsible-structure">
                    <ScenarioStructureTable scenarios={displayScenarios} engine={engine} />
                  </CollapsibleSection>
                  <CollapsibleSection title="12-Month Financial Position" subtitle="Projected capital position following 12 months under each scenario" icon={<Activity className="w-4 h-4" />} testId="collapsible-12-month">
                    <TwelveMonthSnapshot scenarios={displayScenarios} projections={engine.projections} engine={engine} />
                  </CollapsibleSection>
                  <CollapsibleSection title="Sensitivity Analysis" subtitle="Ranked impact of assumption variations on financial outcomes" icon={<Activity className="w-4 h-4" />} testId="collapsible-sensitivity">
                    <SensitivityPanel scenarios={displayScenarios} engine={engine} store={store} />
                  </CollapsibleSection>
                  <CollapsibleSection title="Sensitivity Snapshot" subtitle="Quick-reference impact of key assumption changes on financial outcomes" icon={<Activity className="w-4 h-4" />} testId="collapsible-sensitivity-snapshot">
                    <SensitivitySnapshotPanel engine={engine} store={store} />
                  </CollapsibleSection>
                  <CollapsibleSection title="Stress Test Modelling" subtitle="Model the impact of interest rate and expenditure variations on scenario viability" icon={<AlertTriangle className="w-4 h-4" />} testId="collapsible-stress-test">
                    <StressTestPanel />
                  </CollapsibleSection>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-md text-xs text-muted-foreground space-y-2" data-testid="section-assumptions-appendix">
                <h3 className="text-sm font-semibold text-foreground">Key Assumptions & Parameters</h3>
                <p className="text-xs text-muted-foreground mb-2">The following parameters underpin all calculations presented above. Core settlement ratios are adjustable via the controls at the top of this page.</p>
                <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                  <div className="flex justify-between gap-2"><span>Asset split (A : B)</span><span className="tabular-nums">{Math.round(assumptions.splitRatio * 100)}% : {Math.round((1 - assumptions.splitRatio) * 100)}%</span></div>
                  <div className="flex justify-between gap-2"><span>Pension split (A : B)</span><span className="tabular-nums">{Math.round(assumptions.splitPensionToA * 100)}% : {Math.round((1 - assumptions.splitPensionToA) * 100)}%</span></div>
                  <div className="flex justify-between gap-2"><span>Mortgage rate</span><span className="tabular-nums">{(assumptions.mortgageAPR * 100).toFixed(1)}%</span></div>
                  <div className="flex justify-between gap-2"><span>Mortgage term</span><span className="tabular-nums">{assumptions.mortgageTermYears} years</span></div>
                  <div className="flex justify-between gap-2"><span>Inflation rate</span><span className="tabular-nums">{(assumptions.inflationRate * 100).toFixed(1)}%</span></div>
                  <div className="flex justify-between gap-2"><span>Projection period</span><span className="tabular-nums">{assumptions.projectionYears} years</span></div>
                  <div className="flex justify-between gap-2"><span>Tax model</span><span>{assumptions.includeTaxModel ? "2025/26 UK rates" : "Disabled"}</span></div>
                  <div className="flex justify-between gap-2"><span>Child maintenance</span><span>{assumptions.includeCMSEstimate ? "CMS estimate" : "Not included"}</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">Tax figures are based on a simplified 2025/26 UK model and may not reflect individual circumstances.</p>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No scenario data to display. Please go back and enter your financial details.</p>
                <Link href="/wizard"><Button className="mt-4" data-testid="button-go-back"><ChevronLeft className="w-4 h-4 mr-1" /> Go Back to Wizard</Button></Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="border-t py-8 mt-auto bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-xs space-y-1.5">
          <p className="font-medium">Illustrative modelling only — not legal, tax, or financial advice.</p>
          <p>All outputs are estimates based on the information entered and standard assumptions. They should not be relied upon for decision-making without independent professional advice. Affordability indicators are benchmarked against typical market heuristics and do not represent a mortgage offer or credit assessment.</p>
          <p>All calculations are performed locally in your browser. No financial data is transmitted to any external server.</p>
        </div>
      </footer>
    </div>
  );
}

function DecisionLensToggle({ viewLens, setViewLens }: { viewLens: ViewLens; setViewLens: (v: ViewLens) => void }) {
  const lenses: { id: ViewLens; label: string; icon: typeof PoundSterling; description: string }[] = [
    { id: "liquidity", label: "Liquidity Analysis", icon: PoundSterling, description: "Liquid Capital [cash and realisable investments available immediately]" },
    { id: "networth", label: "Net Worth Analysis", icon: Target, description: "Total Net Asset Position [liquid capital, property equity, and pension valuations]" },
    { id: "risk", label: "Stability & Projection", icon: Activity, description: "Composite Stability Assessment [financial resilience over projected period]" },
  ];

  return (
    <div className="flex flex-wrap gap-2" data-testid="section-decision-lens">
      <Label className="text-xs text-muted-foreground w-full flex items-center gap-1.5">
        <Eye className="w-3 h-3" /> Analytical Lens
      </Label>
      {lenses.map(l => (
        <Button
          key={l.id}
          variant={viewLens === l.id ? "default" : "outline"}
          size="sm"
          onClick={() => setViewLens(l.id)}
          data-testid={`button-lens-${l.id}`}
        >
          <l.icon className="w-3.5 h-3.5 mr-1.5" />
          {l.label}
        </Button>
      ))}
    </div>
  );
}

function TwelveMonthSnapshot({
  scenarios,
  projections,
  engine,
}: {
  scenarios: ScenarioResult[];
  projections: Record<string, ProjectionYear[]>;
  engine: ReturnType<typeof useEngine>;
}) {
  return (
    <Card data-testid="card-12-month-snapshot">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="w-4 h-4" /> 12-Month Capital Position
        </CardTitle>
        <CardDescription>Projected liquid capital position for each party following 12 months under each scenario</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]"></TableHead>
                {scenarios.map(s => (
                  <TableHead key={s.id} className="text-center min-w-[130px]">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SCENARIO_META[s.id]?.color }} />
                      <span className="text-xs">{SCENARIO_META[s.id]?.shortLabel ?? s.name}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-liquid-a">Party A — Liquid Capital at Month 12</TableCell>
                {scenarios.map(s => {
                  const proj = projections[s.id];
                  const yr1 = proj && proj.length > 1 ? proj[1] : null;
                  return (
                    <TableCell key={s.id} className="text-center tabular-nums text-sm" data-testid={`value-yr1-liquid-a-${s.id}`}>
                      {yr1 ? <span className={yr1.capitalA < 0 ? "text-red-600 font-semibold" : "text-blue-600 font-semibold"}>{formatCurrency(yr1.capitalA)}</span> : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-liquid-b">Party B — Liquid Capital at Month 12</TableCell>
                {scenarios.map(s => {
                  const proj = projections[s.id];
                  const yr1 = proj && proj.length > 1 ? proj[1] : null;
                  return (
                    <TableCell key={s.id} className="text-center tabular-nums text-sm" data-testid={`value-yr1-liquid-b-${s.id}`}>
                      {yr1 ? <span className={yr1.capitalB < 0 ? "text-red-600 font-semibold" : "text-emerald-600 font-semibold"}>{formatCurrency(yr1.capitalB)}</span> : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-surplus-a">Party A — Monthly Surplus / (Deficit)</TableCell>
                {scenarios.map(s => {
                  const proj = projections[s.id];
                  const yr0Capital = proj && proj.length > 0 ? proj[0].capitalA : s.liquidStartA;
                  const yr1Capital = proj && proj.length > 1 ? proj[1].capitalA : yr0Capital;
                  const annualCashFlow = yr1Capital - yr0Capital;
                  const surplus = Math.round(annualCashFlow / 12);
                  return (
                    <TableCell key={s.id} className="text-center tabular-nums text-sm" data-testid={`value-yr1-surplus-a-${s.id}`}>
                      <span className={surplus < 0 ? "text-red-600" : "text-emerald-600"}>{surplus < 0 ? `(${formatCurrency(Math.abs(surplus))})` : formatCurrency(surplus)}/mo</span>
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-surplus-b">Party B — Monthly Surplus / (Deficit)</TableCell>
                {scenarios.map(s => {
                  const proj = projections[s.id];
                  const yr0Capital = proj && proj.length > 0 ? proj[0].capitalB : s.liquidStartB;
                  const yr1Capital = proj && proj.length > 1 ? proj[1].capitalB : yr0Capital;
                  const annualCashFlow = yr1Capital - yr0Capital;
                  const surplus = Math.round(annualCashFlow / 12);
                  return (
                    <TableCell key={s.id} className="text-center tabular-nums text-sm" data-testid={`value-yr1-surplus-b-${s.id}`}>
                      <span className={surplus < 0 ? "text-red-600" : "text-emerald-600"}>{surplus < 0 ? `(${formatCurrency(Math.abs(surplus))})` : formatCurrency(surplus)}/mo</span>
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-buffer-a">Party A — Capital Runway [months]</TableCell>
                {scenarios.map(s => {
                  const proj = projections[s.id];
                  const yr0Cap = proj && proj.length > 0 ? proj[0].capitalA : s.liquidStartA;
                  const yr1Cap = proj && proj.length > 1 ? proj[1].capitalA : yr0Cap;
                  const annualCashFlow = yr1Cap - yr0Cap;
                  const monthlyBurn = annualCashFlow < 0 ? Math.abs(annualCashFlow) / 12 : 0;
                  const bufferMonths = monthlyBurn > 0 ? Math.round(yr0Cap / monthlyBurn) : yr0Cap > 0 ? 99 : 0;
                  const displayBuffer = Math.min(bufferMonths, 99);
                  return (
                    <TableCell key={s.id} className="text-center tabular-nums text-sm" data-testid={`value-yr1-buffer-a-${s.id}`}>
                      <span className={displayBuffer < 6 ? "text-red-600" : displayBuffer < 12 ? "text-amber-600" : "text-emerald-600"}>
                        {displayBuffer >= 99 ? "99+" : displayBuffer} months
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function ScenarioStructureTable({
  scenarios,
  engine,
}: {
  scenarios: ScenarioResult[];
  engine: ReturnType<typeof useEngine>;
}) {
  const { intermediate } = engine;

  const getImmediateLiquidity = (s: ScenarioResult): string => {
    const totalLiq = s.liquidStartA + s.liquidStartB;
    if (totalLiq > 200000) return "High";
    if (totalLiq > 50000) return "Medium";
    return "Low";
  };

  const getLiquidityColor = (label: string) => {
    if (label === "High") return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (label === "Medium") return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const hasMortgage = (s: ScenarioResult) => ((s.mortgageMonthlyA ?? 0) + (s.mortgageMonthlyB ?? 0)) > 0;

  const propertyConcentration = (s: ScenarioResult) => {
    const totalA = s.totalA || 1;
    const totalB = s.totalB || 1;
    const propA = ((s.homeEquityA ?? 0) / totalA * 100);
    const propB = ((s.homeEquityB ?? 0) / totalB * 100);
    return { A: Math.round(propA), B: Math.round(propB) };
  };

  const getComplexity = (s: ScenarioResult): string => {
    if (s.id === "S1") return "Low";
    if ((s.fundingGap ?? 0) > 0) return "High";
    return "Medium";
  };

  return (
    <Card data-testid="card-scenario-structure">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="w-4 h-4" /> Scenario Structure Comparison
        </CardTitle>
        <CardDescription>Qualitative comparison of key structural features across scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">Feature</TableHead>
                {scenarios.map(s => (
                  <TableHead key={s.id} className="text-center min-w-[120px]">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SCENARIO_META[s.id]?.color }} />
                      <span className="text-xs">{SCENARIO_META[s.id]?.shortLabel ?? s.name}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground">Immediate Liquidity [cash available on completion]</TableCell>
                {scenarios.map(s => {
                  const label = getImmediateLiquidity(s);
                  return (
                    <TableCell key={s.id} className="text-center">
                      <Badge variant="outline" className={getLiquidityColor(label)}>{label}</Badge>
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground">Mortgage Obligation Required</TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center text-sm">
                    {hasMortgage(s)
                      ? <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Yes</Badge>
                      : <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">None</Badge>}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground">Property Concentration [% of net worth held in property]</TableCell>
                {scenarios.map(s => {
                  const conc = propertyConcentration(s);
                  return (
                    <TableCell key={s.id} className="text-center text-xs tabular-nums">
                      {conc.A > 0 || conc.B > 0 ? (
                        <span>A: {conc.A}% / B: {conc.B}%</span>
                      ) : <span className="text-muted-foreground">None</span>}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground">Pension Concentration [% of net worth held in pension]</TableCell>
                {scenarios.map(s => {
                  const totalA = s.totalA || 1;
                  const totalB = s.totalB || 1;
                  const penA = Math.round(s.pensionA / totalA * 100);
                  const penB = Math.round(s.pensionB / totalB * 100);
                  return (
                    <TableCell key={s.id} className="text-center text-xs tabular-nums">
                      {penA > 0 || penB > 0 ? <span>A: {penA}% / B: {penB}%</span> : <span className="text-muted-foreground">None</span>}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="text-sm text-muted-foreground">Implementation Complexity</TableCell>
                {scenarios.map(s => {
                  const comp = getComplexity(s);
                  return (
                    <TableCell key={s.id} className="text-center">
                      <Badge variant="outline" className={comp === "Low" ? "text-emerald-600 border-emerald-200 bg-emerald-50" : comp === "Medium" ? "text-amber-600 border-amber-200 bg-amber-50" : "text-red-600 border-red-200 bg-red-50"}>
                        {comp}
                      </Badge>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function SensitivityPanel({
  scenarios,
  engine,
  store,
}: {
  scenarios: ScenarioResult[];
  engine: ReturnType<typeof useEngine>;
  store: ReturnType<typeof useAppStore>;
}) {
  const { intermediate, budget } = engine;
  const scenario = scenarios[0];
  if (!scenario) return null;

  const ranking = useMemo(() =>
    computeSensitivityRanking(
      scenario, store, budget.surplusA, budget.surplusB,
      intermediate.totalLiquid, intermediate.netHomeEquity, intermediate.totalMortgage,
    ),
    [scenario, store, budget, intermediate]
  );

  const rankIcons = ["1st", "2nd", "3rd"];

  return (
    <Card data-testid="card-sensitivity">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="w-4 h-4" /> Sensitivity Analysis
        </CardTitle>
        <CardDescription>
          Ranked assessment of which assumption variations have the greatest impact on financial outcomes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ranking.map((f, i) => (
            <div key={f.factor} className="flex items-start gap-4 p-3 rounded-md border" data-testid={`sensitivity-factor-${f.rank}`}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                {rankIcons[i] ?? `${i + 1}`}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-sm font-semibold">{f.factor}</span>
                  <Badge variant="outline" className="text-xs">{f.description}</Badge>
                </div>
                <div className="grid gap-1 sm:grid-cols-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span>Impact on Party A surplus:</span>
                    <span className={`tabular-nums font-medium ${f.impactOnSurplusA < 0 ? "text-red-600" : f.impactOnSurplusA > 0 ? "text-emerald-600" : ""}`}>
                      {f.impactOnSurplusA > 0 ? "+" : ""}{formatCurrency(f.impactOnSurplusA)}/yr
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>Impact on Party B surplus:</span>
                    <span className={`tabular-nums font-medium ${f.impactOnSurplusB < 0 ? "text-red-600" : f.impactOnSurplusB > 0 ? "text-emerald-600" : ""}`}>
                      {f.impactOnSurplusB > 0 ? "+" : ""}{formatCurrency(f.impactOnSurplusB)}/yr
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ExecutiveTable({
  scenarios,
  projections,
  stabilityScores,
  viewLens,
  engine,
  store,
  runways,
}: {
  scenarios: ScenarioResult[];
  projections: Record<string, ProjectionYear[]>;
  stabilityScores: Record<string, StabilityResult>;
  viewLens: ViewLens;
  engine: ReturnType<typeof useEngine>;
  store: ReturnType<typeof useAppStore>;
  runways: Record<string, RunwayResult>;
}) {
  return (
    <Card data-testid="card-executive-table">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <PoundSterling className="w-4 h-4" />
          Executive Summary
        </CardTitle>
        <CardDescription>Comparative financial summary across all modelled scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]"></TableHead>
                {scenarios.map(s => (
                  <TableHead key={s.id} className="text-center min-w-[130px]">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SCENARIO_META[s.id]?.color }} />
                      <span>{SCENARIO_META[s.id]?.shortLabel ?? s.name}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className={viewLens === "liquidity" ? "bg-primary/5" : ""}>
                <TableCell className="font-medium text-muted-foreground"><>Liquid Capital — Party A<InfoTip text="Liquid capital represents funds Party A can access immediately — bank accounts, savings, ISAs, and realisable investments." /></></TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums font-semibold text-blue-600">{formatCurrency(s.liquidStartA)}</TableCell>
                ))}
              </TableRow>
              <TableRow className={viewLens === "liquidity" ? "bg-primary/5" : ""}>
                <TableCell className="font-medium text-muted-foreground"><>Liquid Capital — Party B<InfoTip text="Liquid capital represents funds Party B can access immediately — bank accounts, savings, ISAs, and realisable investments." /></></TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums font-semibold text-emerald-600">{formatCurrency(s.liquidStartB)}</TableCell>
                ))}
              </TableRow>
              <TableRow className={viewLens === "risk" ? "bg-primary/5" : ""}>
                <TableCell className="font-medium text-muted-foreground"><>Equity Transfer Obligation<InfoTip text="The lump sum payable by the party retaining the property to compensate the departing party for their share of net equity." /></></TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums">
                    {s.buyoutAmount != null && s.buyoutAmount > 0 ? formatCurrency(s.buyoutAmount) : <span className="text-muted-foreground">N/A</span>}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className={viewLens === "risk" ? "bg-primary/5" : ""}>
                <TableCell className="font-medium text-muted-foreground"><>Funding Requirement<InfoTip text="Where the retaining party's liquid capital is insufficient to meet the equity transfer obligation, this represents the additional capital required — typically funded through an increased mortgage." /></></TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums">
                    {s.fundingGap != null && s.fundingGap > 0
                      ? <span className="text-amber-600 font-semibold">{formatCurrency(s.fundingGap)}</span>
                      : s.fundingGap != null ? <span className="text-emerald-600">None</span> : <span className="text-muted-foreground">N/A</span>}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground"><>Annual Mortgage Obligation<InfoTip text="Total annual mortgage repayments. In property retention scenarios, this may include an increased mortgage to fund the equity transfer." /></></TableCell>
                {scenarios.map(s => {
                  const annual = ((s.mortgageMonthlyA ?? 0) + (s.mortgageMonthlyB ?? 0)) * 12;
                  return (
                    <TableCell key={s.id} className="text-center tabular-nums">
                      {annual > 0 ? <span className="text-amber-600">{formatCurrency(annual)}/yr</span> : <span className="text-muted-foreground">None</span>}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className={viewLens === "liquidity" ? "bg-primary/5" : ""}>
                <TableCell className="font-medium text-muted-foreground"><>5-Year Runway — Party A<InfoTip text="Whether Party A's liquid capital is projected to sustain their outgoings for at least 5 years based on current income, expenditure, and mortgage obligations." /></></TableCell>
                {scenarios.map(s => {
                  const rw = runways[s.id];
                  return (
                    <TableCell key={s.id} className="text-center">
                      {rw?.partyA.sustained
                        ? <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50"><Check className="w-3 h-3 mr-1" /> Sustained</Badge>
                        : <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50"><AlertTriangle className="w-3 h-3 mr-1" /> Yr {rw?.partyA.depletionYear} depletion</Badge>}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className={viewLens === "liquidity" ? "bg-primary/5" : ""}>
                <TableCell className="font-medium text-muted-foreground"><>5-Year Runway — Party B<InfoTip text="Whether Party B's liquid capital is projected to sustain their outgoings for at least 5 years based on current income, expenditure, and mortgage obligations." /></></TableCell>
                {scenarios.map(s => {
                  const rw = runways[s.id];
                  return (
                    <TableCell key={s.id} className="text-center">
                      {rw?.partyB.sustained
                        ? <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50"><Check className="w-3 h-3 mr-1" /> Sustained</Badge>
                        : <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50"><AlertTriangle className="w-3 h-3 mr-1" /> Yr {rw?.partyB.depletionYear} depletion</Badge>}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className={viewLens === "risk" ? "bg-primary/5" : ""}>
                <TableCell className="font-medium text-muted-foreground"><>Stability Assessment — Party A<InfoTip text="Composite financial resilience indicator for Party A — incorporating cash buffer adequacy, monthly surplus/deficit, mortgage burden ratio, and capital runway projection." /></></TableCell>
                {scenarios.map(s => {
                  const st = stabilityScores[s.id];
                  return (
                    <TableCell key={s.id} className="text-center">
                      <StabilityBadge score={st?.scoreA ?? 100} label={st?.labelA ?? "Financially Stable (Modelled)"} />
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className={viewLens === "risk" ? "bg-primary/5" : ""}>
                <TableCell className="font-medium text-muted-foreground"><>Stability Assessment — Party B<InfoTip text="Composite financial resilience indicator for Party B — incorporating cash buffer adequacy, monthly surplus/deficit, mortgage burden ratio, and capital runway projection." /></></TableCell>
                {scenarios.map(s => {
                  const st = stabilityScores[s.id];
                  return (
                    <TableCell key={s.id} className="text-center">
                      <StabilityBadge score={st?.scoreB ?? 100} label={st?.labelB ?? "Financially Stable (Modelled)"} />
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className={`font-bold ${viewLens === "networth" ? "bg-primary/5" : ""}`}>
                <TableCell className="text-foreground"><>Total Net Asset Position — Party A<InfoTip text="Party A's combined net asset position — comprising liquid capital, allocated property equity, and pension valuations. Not all components are immediately realisable." /></></TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums text-blue-600 text-base">{formatCurrency(s.totalA)}</TableCell>
                ))}
              </TableRow>
              <TableRow className={`font-bold ${viewLens === "networth" ? "bg-primary/5" : ""}`}>
                <TableCell className="text-foreground"><>Total Net Asset Position — Party B<InfoTip text="Party B's combined net asset position — comprising liquid capital, allocated property equity, and pension valuations. Not all components are immediately realisable." /></></TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums text-emerald-600 text-base">{formatCurrency(s.totalB)}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function StabilityBadge({ score, label }: { score: number; label: string }) {
  const colorClass = score >= 80
    ? "text-emerald-600 border-emerald-200 bg-emerald-50"
    : score >= 60
    ? "text-amber-600 border-amber-200 bg-amber-50"
    : "text-red-600 border-red-200 bg-red-50";

  return (
    <Badge variant="outline" className={colorClass} data-testid={`badge-stability-${score}`}>
      <Shield className="w-3 h-3 mr-1" />
      {score} {label}
    </Badge>
  );
}

function ScenarioDetailCard({
  scenario,
  projection,
  engine,
  store,
  stabilityScore,
  sellScenario,
  sellProjection,
}: {
  scenario: ScenarioResult;
  projection: ProjectionYear[] | null | undefined;
  engine: ReturnType<typeof useEngine>;
  store: ReturnType<typeof useAppStore>;
  stabilityScore: StabilityResult;
  sellScenario?: ScenarioResult;
  sellProjection?: ProjectionYear[];
}) {
  const { intermediate } = engine;

  const narrative = useMemo(() =>
    generateScenarioNarrative(scenario, store, intermediate.netHomeEquity, intermediate.totalLiquid, intermediate.totalDebt, intermediate.homeSaleCosts),
    [scenario, store, intermediate]
  );

  const sourceOfFunds = useMemo(() =>
    buildSourceOfFunds(scenario, store, intermediate.netHomeEquity, intermediate.totalLiquid, intermediate.homeSaleCosts),
    [scenario, store, intermediate]
  );

  const monthlySnapshot = useMemo(() =>
    buildMonthlySnapshot(scenario, store, engine.taxA, engine.taxB, engine.cmsAnnual),
    [scenario, store, engine.taxA, engine.taxB, engine.cmsAnnual]
  );

  const comparison = useMemo(() => {
    if (scenario.id === "S1" || !sellScenario || scenario.id === "S4") return null;
    try {
      return compareToSell(scenario, sellScenario, projection ?? undefined, sellProjection);
    } catch {
      return null;
    }
  }, [scenario, sellScenario, projection, sellProjection]);

  const housingFeasibility = useMemo(() => {
    const isKeeperA = scenario.id === "S2";
    const keeperGross = isKeeperA ? engine.taxA.gross : engine.taxB.gross;
    const keeperNet = isKeeperA ? engine.taxA.net : engine.taxB.net;
    return computeHousingFeasibility(scenario, keeperGross, keeperNet, intermediate.homeValue, intermediate.totalMortgage);
  }, [scenario, engine.taxA, engine.taxB, intermediate]);

  const negotiationLevers = useMemo(() =>
    generateNegotiationLevers(
      scenario, store, projection ?? undefined,
      engine.budget.surplusA, engine.budget.surplusB,
      intermediate.totalLiquid, intermediate.netHomeEquity, intermediate.totalMortgage,
    ),
    [scenario, store, projection, engine.budget, intermediate]
  );

  return (
    <Card data-testid={`card-detail-${scenario.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SCENARIO_META[scenario.id]?.color }} />
              {SCENARIO_META[scenario.id]?.label ?? scenario.name}
            </CardTitle>
            <CardDescription className="mt-1">{SCENARIO_META[scenario.id]?.description}</CardDescription>
          </div>
          <div className="flex gap-2 shrink-0">
            <StabilityBadge score={stabilityScore.scoreA} label={`A: ${stabilityScore.labelA}`} />
            <StabilityBadge score={stabilityScore.scoreB} label={`B: ${stabilityScore.labelB}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <NarrativeSection narrative={narrative} />

        <div className="grid gap-6 lg:grid-cols-2">
          <SourceOfFundsTable sourceOfFunds={sourceOfFunds} scenario={scenario} />
          <CompositionChart scenario={scenario} />
        </div>

        {housingFeasibility && <HousingFeasibilityPanel feasibility={housingFeasibility} scenarioId={scenario.id} />}

        <CapitalRunwaySection runway={engine.runways[scenario.id]} />

        <div className="grid gap-6 lg:grid-cols-2">
          <StabilitySection score={stabilityScore} />
          <MonthlySnapshotSection snapshot={monthlySnapshot} />
        </div>

        {comparison && <ComparisonDeltaPanel delta={comparison} scenarioId={scenario.id} />}

        {negotiationLevers.length > 0 && <NegotiationLeversPanel levers={negotiationLevers} />}

        {projection && projection.length > 1 && (
          <div>
            <h3 className="text-sm font-semibold mb-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Liquid Capital Projection
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              Projected liquid capital trajectory for each party over the modelling period. Annual balance reflects: opening capital + net income - expenditure - mortgage obligations. Property equity is excluded as it is not immediately realisable. A line falling below zero indicates a projected capital shortfall.
            </p>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projection}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} fontSize={11} />
                  <YAxis axisLine={false} tickLine={false} fontSize={11} tickFormatter={(v) => v >= 1000000 ? `\u00A3${(v / 1000000).toFixed(1)}m` : `\u00A3${(v / 1000).toFixed(0)}k`} />
                  <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="capitalA" name="Party A" stroke="#2563EB" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="capitalB" name="Party B" stroke="#10B981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="p-3 bg-muted/30 rounded-md text-xs text-muted-foreground italic" data-testid="text-reassurance">
          {narrative.reassurance}
        </div>
      </CardContent>
    </Card>
  );
}

function NarrativeSection({ narrative }: { narrative: ScenarioNarrative }) {
  return (
    <div className="space-y-4" data-testid="section-narrative">
      <div>
        <h3 className="text-base font-semibold mb-2">{narrative.headline}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{narrative.summaryParagraph}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Drivers</h4>
          <ul className="space-y-1">
            {narrative.keyDrivers.map((d, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <Check className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trade-offs</h4>
          <ul className="space-y-1">
            {narrative.tradeOffs.map((t, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <Info className="w-3.5 h-3.5 mt-0.5 text-blue-500 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {narrative.riskFlags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {narrative.riskFlags.map((f, i) => {
            const colorClass = f.severity === "ok"
              ? "text-emerald-600 border-emerald-200 bg-emerald-50"
              : f.severity === "warn"
              ? "text-amber-600 border-amber-200 bg-amber-50"
              : "text-red-600 border-red-200 bg-red-50";
            return (
              <div key={i} className={`flex items-start gap-2 p-2.5 rounded-md border text-xs ${colorClass}`} data-testid={`risk-flag-${f.severity}-${i}`}>
                {f.severity === "ok" ? <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
                <div>
                  <span className="font-semibold">{f.label}</span>
                  <p className="mt-0.5 opacity-80">{f.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FundRowItem({ row, index }: { row: { label: string; amount: number; subItems?: { label: string; amount: number }[] }; index: string | number }) {
  const [expanded, setExpanded] = useState(false);
  const hasSubs = row.subItems && row.subItems.length > 0;

  return (
    <div data-testid={`fund-row-${index}`}>
      <button
        type="button"
        className={`flex items-center justify-between text-sm gap-2 w-full text-left ${hasSubs ? "cursor-pointer" : ""}`}
        onClick={() => hasSubs && setExpanded(!expanded)}
        data-testid={`button-expand-fund-${index}`}
      >
        <span className={`text-muted-foreground flex items-center gap-1 ${row.label.toLowerCase().includes("total") ? "font-bold text-foreground" : ""}`}>
          {hasSubs && (
            <ChevronRight className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`} />
          )}
          {row.label}
        </span>
        <span className={`tabular-nums font-medium ${row.amount < 0 ? "text-red-500" : ""} ${row.label.toLowerCase().includes("total") ? "font-bold" : ""}`}>
          {row.amount < 0 ? `(${formatCurrency(Math.abs(row.amount))})` : formatCurrency(row.amount)}
        </span>
      </button>
      {expanded && row.subItems && (
        <div className="ml-4 mt-1 mb-1.5 space-y-0.5 border-l-2 border-border pl-3" data-testid={`fund-subitems-${index}`}>
          {row.subItems.map((sub, si) => (
            <div key={si} className="flex items-center justify-between text-xs gap-2">
              <span className="text-muted-foreground/80">{sub.label}</span>
              <span className={`tabular-nums ${sub.amount < 0 ? "text-red-400" : "text-muted-foreground"}`}>
                {sub.amount < 0 ? `(${formatCurrency(Math.abs(sub.amount))})` : formatCurrency(sub.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SourceOfFundsTable({ sourceOfFunds, scenario }: { sourceOfFunds: SourceOfFunds; scenario: ScenarioResult }) {
  return (
    <div className="space-y-3" data-testid="section-source-of-funds">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        Source of Funds Breakdown
        <span className="text-xs font-normal text-muted-foreground">(expand any line for detailed composition)</span>
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Party A</h4>
          {sourceOfFunds.A.rows.map((r, i) => (
            <FundRowItem key={i} row={r} index={`a-${i}`} />
          ))}
          <Separator className="my-1" />
          <div className="flex items-center justify-between text-sm font-semibold gap-2">
            <span>Net Liquid Capital</span>
            <span className="tabular-nums text-blue-600" data-testid="text-net-liquid-a">{formatCurrency(sourceOfFunds.A.netStartingLiquid)}</span>
          </div>
          {sourceOfFunds.pension.A_after > 0 && (
            <div className="flex items-center justify-between text-xs text-muted-foreground gap-2">
              <span>Pension (separate)</span>
              <span className="tabular-nums">{formatCurrency(sourceOfFunds.pension.A_after)}</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Party B</h4>
          {sourceOfFunds.B.rows.map((r, i) => (
            <FundRowItem key={i} row={r} index={`b-${i}`} />
          ))}
          <Separator className="my-1" />
          <div className="flex items-center justify-between text-sm font-semibold gap-2">
            <span>Net Liquid Capital</span>
            <span className="tabular-nums text-emerald-600" data-testid="text-net-liquid-b">{formatCurrency(sourceOfFunds.B.netStartingLiquid)}</span>
          </div>
          {sourceOfFunds.pension.B_after > 0 && (
            <div className="flex items-center justify-between text-xs text-muted-foreground gap-2">
              <span>Pension (separate)</span>
              <span className="tabular-nums">{formatCurrency(sourceOfFunds.pension.B_after)}</span>
            </div>
          )}
        </div>
      </div>
      <Separator className="my-2" />
      <div className="flex items-center justify-between text-sm font-bold gap-2">
        <span>Total Allocated Net Position</span>
        <span className="tabular-nums" data-testid="text-total-allocated-net">{formatCurrency(scenario.liquidStartA + scenario.liquidStartB)}</span>
      </div>
    </div>
  );
}

function CapitalRunwaySection({ runway }: { runway?: RunwayResult }) {
  if (!runway) return null;
  return (
    <div className="p-4 border rounded-md space-y-3" data-testid="section-capital-runway">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <TrendingUp className="w-3.5 h-3.5" /> Capital Runway (5-Year Projection)
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Party A</h4>
          <div className="space-y-0.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Starting Liquid Capital</span>
              <span className="tabular-nums font-medium">{formatCurrency(runway.partyA.startingCapital)}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Lowest Projected Capital</span>
              <span className={`tabular-nums font-medium ${runway.partyA.lowestProjectedCapital < 0 ? "text-red-600" : ""}`}>{formatCurrency(runway.partyA.lowestProjectedCapital)}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Year of Depletion</span>
              <Badge variant="outline" className={runway.partyA.sustained ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-amber-600 border-amber-200 bg-amber-50"}>
                {runway.partyA.sustained ? "Sustained" : `Yr ${runway.partyA.depletionYear}`}
              </Badge>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Party B</h4>
          <div className="space-y-0.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Starting Liquid Capital</span>
              <span className="tabular-nums font-medium">{formatCurrency(runway.partyB.startingCapital)}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Lowest Projected Capital</span>
              <span className={`tabular-nums font-medium ${runway.partyB.lowestProjectedCapital < 0 ? "text-red-600" : ""}`}>{formatCurrency(runway.partyB.lowestProjectedCapital)}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Year of Depletion</span>
              <Badge variant="outline" className={runway.partyB.sustained ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-amber-600 border-amber-200 bg-amber-50"}>
                {runway.partyB.sustained ? "Sustained" : `Yr ${runway.partyB.depletionYear}`}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompositionChart({ scenario }: { scenario: ScenarioResult }) {
  const data = [
    {
      name: "Party A",
      Liquid: scenario.liquidStartA,
      "Home Equity": scenario.homeEquityA ?? 0,
      Pension: scenario.pensionA,
    },
    {
      name: "Party B",
      Liquid: scenario.liquidStartB,
      "Home Equity": scenario.homeEquityB ?? 0,
      Pension: scenario.pensionB,
    },
  ];

  return (
    <div className="space-y-3" data-testid="section-composition-chart">
      <h3 className="text-sm font-semibold">Net Worth Composition</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={28}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
            <XAxis type="number" axisLine={false} tickLine={false} fontSize={11} tickFormatter={(v) => v >= 1000000 ? `\u00A3${(v / 1000000).toFixed(1)}m` : `\u00A3${(v / 1000).toFixed(0)}k`} />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} fontSize={12} width={60} />
            <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="Liquid" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Home Equity" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Pension" stackId="a" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StabilitySection({ score }: { score: StabilityResult }) {
  return (
    <div className="space-y-3" data-testid="section-stability">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <Shield className="w-3.5 h-3.5" /> Stability Assessment
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-blue-600 uppercase">Party A</span>
            <StabilityBadge score={score.scoreA} label={score.labelA} />
          </div>
          <ul className="space-y-0.5">
            {score.reasonsA.map((r, i) => (
              <li key={i} className="text-xs flex items-center justify-between gap-2">
                <span className="text-muted-foreground">{r.label}</span>
                {r.points !== 0 && <span className={r.points < 0 ? "text-red-500 font-medium" : "text-emerald-600 font-medium"}>{r.points}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">Assessment Drivers:</p>
            {score.driversA.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{d.label}:</span>
                <span className={d.status === "pass" ? "text-green-600" : d.status === "warn" ? "text-amber-600" : "text-red-600"}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-emerald-600 uppercase">Party B</span>
            <StabilityBadge score={score.scoreB} label={score.labelB} />
          </div>
          <ul className="space-y-0.5">
            {score.reasonsB.map((r, i) => (
              <li key={i} className="text-xs flex items-center justify-between gap-2">
                <span className="text-muted-foreground">{r.label}</span>
                {r.points !== 0 && <span className={r.points < 0 ? "text-red-500 font-medium" : "text-emerald-600 font-medium"}>{r.points}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">Assessment Drivers:</p>
            {score.driversB.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{d.label}:</span>
                <span className={d.status === "pass" ? "text-green-600" : d.status === "warn" ? "text-amber-600" : "text-red-600"}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthlySnapshotSection({ snapshot }: { snapshot: MonthlySnapshotResult }) {
  return (
    <div className="space-y-3" data-testid="section-monthly-snapshot">
      <h3 className="text-sm font-semibold">Monthly Financial Position</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="text-right text-blue-600 text-xs">Party A</TableHead>
            <TableHead className="text-right text-emerald-600 text-xs">Party B</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {snapshot.lines.map((line, i) => (
            <TableRow key={i}>
              <TableCell className="text-xs text-muted-foreground py-1.5">{line.label}</TableCell>
              <TableCell className={`text-right tabular-nums text-xs py-1.5 ${line.amountA < 0 ? "text-red-500" : ""}`}>
                {line.amountA < 0 ? `(${formatCurrency(Math.abs(line.amountA))})` : formatCurrency(line.amountA)}
              </TableCell>
              <TableCell className={`text-right tabular-nums text-xs py-1.5 ${line.amountB < 0 ? "text-red-500" : ""}`}>
                {line.amountB < 0 ? `(${formatCurrency(Math.abs(line.amountB))})` : formatCurrency(line.amountB)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="font-semibold border-t-2">
            <TableCell className="text-xs py-1.5">Net Monthly Surplus / (Deficit)</TableCell>
            <TableCell className={`text-right tabular-nums text-xs py-1.5 font-bold ${snapshot.surplusA < 0 ? "text-red-600" : "text-emerald-600"}`}>
              {snapshot.surplusA < 0 ? `(${formatCurrency(Math.abs(snapshot.surplusA))})` : formatCurrency(snapshot.surplusA)}
            </TableCell>
            <TableCell className={`text-right tabular-nums text-xs py-1.5 font-bold ${snapshot.surplusB < 0 ? "text-red-600" : "text-emerald-600"}`}>
              {snapshot.surplusB < 0 ? `(${formatCurrency(Math.abs(snapshot.surplusB))})` : formatCurrency(snapshot.surplusB)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function HousingFeasibilityPanel({ feasibility, scenarioId }: { feasibility: HousingFeasibility; scenarioId: string }) {
  const keeper = scenarioId === "S2" ? "A" : "B";
  const ratioDisplay = feasibility.mortgageToNetIncomeRatio === null
    ? "N/A"
    : `${feasibility.mortgageToNetIncomeRatio.toFixed(1)}%`;
  return (
    <div className="p-4 border rounded-md space-y-3" data-testid="section-housing-feasibility">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <Building2 className="w-3.5 h-3.5" /> Affordability Benchmark Assessment (Modelled) — Party {keeper}
        <InfoTip text="Benchmarks are illustrative modelling references only and do not represent actual credit or affordability decisions." />
      </h3>
      <div className="flex items-center gap-2 mb-1">
        <Badge variant="outline" className={feasibility.withinBenchmarkThresholds ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-amber-600 border-amber-200 bg-amber-50"}>
          {feasibility.classification}
        </Badge>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-0.5">
          <span className="text-xs text-muted-foreground">Mortgage Requirement</span>
          <p className="text-sm font-semibold tabular-nums" data-testid="text-hf-mortgage-required">{formatCurrency(feasibility.mortgageRequired)}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs text-muted-foreground">Estimated Monthly Repayment</span>
          <p className="text-sm font-semibold tabular-nums" data-testid="text-hf-monthly-payment">{formatCurrency(feasibility.estimatedMonthlyPayment)}/mo</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs text-muted-foreground">Income Multiple</span>
          <p className={`text-sm font-semibold tabular-nums ${feasibility.withinBenchmarkThresholds ? "text-emerald-600" : "text-red-600"}`} data-testid="text-hf-income-multiple">
            {feasibility.incomeMultiple.toFixed(1)}x
            <span className="text-xs text-muted-foreground font-normal ml-1">(benchmark {feasibility.typicalMaxMultiple}x)</span>
          </p>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs text-muted-foreground">Available Deposit Capital</span>
          <p className="text-sm font-semibold tabular-nums" data-testid="text-hf-available-capital">{formatCurrency(feasibility.availableDeposit)}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs text-muted-foreground">Loan-to-Value Position</span>
          <p className="text-sm font-semibold tabular-nums" data-testid="text-hf-equity-position">{feasibility.depositPercentage.toFixed(0)}%</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs text-muted-foreground">Mortgage-to-Net-Income Ratio</span>
          <p className={`text-sm font-semibold tabular-nums ${feasibility.mortgageToNetIncomeRatio !== null && feasibility.mortgageToNetIncomeRatio > 35 ? "text-amber-600" : "text-emerald-600"}`} data-testid="text-hf-payment-pct">
            {ratioDisplay}
          </p>
        </div>
      </div>
      {feasibility.notes.length > 0 && (
        <ul className="space-y-1 mt-2">
          {feasibility.notes.map((note, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <Info className="w-3 h-3 mt-0.5 shrink-0 text-blue-500" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NegotiationLeversPanel({ levers }: { levers: NegotiationLever[] }) {
  return (
    <div className="p-4 border rounded-md space-y-3" data-testid="section-negotiation-levers">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <Lightbulb className="w-3.5 h-3.5" /> Potential Negotiation Considerations
      </h3>
      <p className="text-xs text-muted-foreground">
        Illustrative adjustments that may influence the settlement position. Actual impact is subject to full recalculation.
      </p>
      <div className="space-y-2">
        {levers.map((lever, i) => (
          <div key={i} className="flex items-start gap-3 p-2.5 rounded-md bg-muted/30" data-testid={`negotiation-lever-${i}`}>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-sm font-medium">{lever.title}</p>
              <p className="text-xs text-muted-foreground">{lever.impact}</p>
              <Badge variant="outline" className="text-xs mt-0.5">
                Benefits Party {lever.beneficiary === "both" ? "A & B" : lever.beneficiary}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonDeltaPanel({ delta, scenarioId }: { delta: ComparisonDelta; scenarioId: string }) {
  const keeper = scenarioId === "S2" ? "A" : "B";
  return (
    <div className="p-4 bg-muted/30 rounded-md space-y-2" data-testid="section-comparison-delta">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <TrendingUp className="w-3.5 h-3.5" /> Comparison to Sale & Distribution Scenario
      </h3>
      <ul className="space-y-1.5">
        {delta.notes.map((note, i) => (
          <li key={i} className="text-sm flex items-start gap-2">
            {note.includes("less") || note.includes("obligation")
              ? <ArrowDown className="w-3.5 h-3.5 mt-0.5 text-amber-600 shrink-0" />
              : note.includes("more")
              ? <ArrowUp className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" />
              : <Minus className="w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0" />
            }
            <span className="text-muted-foreground">{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SensitivitySnapshotPanel({ engine, store }: { engine: ReturnType<typeof useEngine>; store: ReturnType<typeof useAppStore> }) {
  const { assumptions } = store;
  const { intermediate, budget } = engine;

  const currentMortgagePayment = calcMortgagePayment(
    intermediate.totalMortgage,
    assumptions.mortgageAPR,
    assumptions.mortgageTermYears
  );
  const stressedMortgagePayment = calcMortgagePayment(
    intermediate.totalMortgage,
    assumptions.mortgageAPR + 0.01,
    assumptions.mortgageTermYears
  );
  const monthlyDiff = stressedMortgagePayment.monthlyPayment - currentMortgagePayment.monthlyPayment;

  const totalExpenses = store.expenses.reduce((s, e) => s + e.amountAnnual, 0);
  const tenPctExpenseImpact = Math.round(totalExpenses * 0.1);

  return (
    <Card data-testid="card-sensitivity-snapshot">
      <CardContent className="pt-4 space-y-3">
        <div className="space-y-2">
          <div className="p-3 bg-muted/30 rounded-md space-y-1">
            <p className="text-sm font-medium">If interest rate increases by 1%:</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Monthly payment changes by <span className="tabular-nums font-semibold text-amber-600">{formatCurrency(monthlyDiff)}/mo</span>
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-md space-y-1">
            <p className="text-sm font-medium">If expenses increase by 10%:</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Annual surplus changes by <span className="tabular-nums font-semibold text-amber-600">-{formatCurrency(tenPctExpenseImpact)}/yr</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StressTestPanel() {
  const { assumptions, updateAssumptions, expenses, updateExpense } = useAppStore();
  const mortgageRatePct = Math.round(assumptions.mortgageAPR * 1000) / 10;
  const [costAdjustPct, setCostAdjustPct] = useState(0);
  const baseCostsRef = useMemo(() => {
    return expenses.map(e => ({ id: e.id, base: e.amountAnnual }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses.length]);

  const applyCostAdjustment = (pct: number) => {
    const factor = 1 + pct / 100;
    baseCostsRef.forEach(({ id, base }) => {
      updateExpense(id, { amountAnnual: Math.round(base * factor) });
    });
    setCostAdjustPct(pct);
  };

  return (
    <Card data-testid="card-stress-test">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Stress Test Modelling
        </CardTitle>
        <CardDescription>
          Adjust the parameters below to model the impact of interest rate and expenditure variations on all scenarios above. Changes are applied in real time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-sm font-medium">Mortgage Interest Rate</Label>
              <span className="text-sm font-bold tabular-nums text-primary" data-testid="text-mortgage-rate">{mortgageRatePct.toFixed(1)}%</span>
            </div>
            <Slider
              value={[mortgageRatePct * 10]}
              onValueChange={([v]) => updateAssumptions({ mortgageAPR: v / 1000 })}
              min={10} max={100} step={5}
              data-testid="slider-mortgage-rate"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1%</span>
              <span>10%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              The assumed interest rate applied to mortgage obligations in property retention scenarios. Increase to model the impact of potential rate rises.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-sm font-medium">Expenditure Adjustment</Label>
              <span className="text-sm font-bold tabular-nums text-primary" data-testid="text-cost-adjustment">
                {costAdjustPct > 0 ? `+${costAdjustPct}%` : costAdjustPct === 0 ? "Baseline" : `${costAdjustPct}%`}
              </span>
            </div>
            <Slider
              value={[costAdjustPct]}
              onValueChange={([v]) => applyCostAdjustment(v)}
              min={-20} max={30} step={5}
              data-testid="slider-cost-adjustment"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-20%</span>
              <span>+30%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Applies a percentage adjustment to all entered expenditure items. Use to model the impact of inflationary pressure on monthly sustainability.
            </p>
          </div>
        </div>

        <div className="p-3 bg-muted/30 rounded-md text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">How projections work</p>
          <p>
            Each year, the model takes each party's starting liquid capital and adds their annual surplus (net income minus living costs minus mortgage payments). 
            If the surplus is negative, savings are drawn down. The projection chart shows when (if ever) liquid capital runs out, 
            helping you assess long-term sustainability of each scenario.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function computeAllScenarios(engine: ReturnType<typeof useEngine>): ScenarioResult[] {
  const allEnabled: ScenarioResult[] = [];
  const s1 = engine.scenarios.find(s => s.id === "S1");
  const s2 = engine.scenarios.find(s => s.id === "S2");
  const s3 = engine.scenarios.find(s => s.id === "S3");
  const s4 = engine.scenarios.find(s => s.id === "S4");

  if (!s1 && !s2 && !s3) return engine.scenarios;

  if (s1) allEnabled.push(s1);
  if (s2) allEnabled.push(s2);
  if (s3) allEnabled.push(s3);
  if (s4) allEnabled.push(s4);

  return allEnabled.length > 0 ? allEnabled : engine.scenarios;
}

