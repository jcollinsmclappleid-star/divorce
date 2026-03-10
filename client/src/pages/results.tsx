import { useState, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { useAppStore, StoreState } from "@/hooks/use-store";
import { useEngine, ScenarioResult, ProjectionYear, RunwayResult } from "@/hooks/use-engine";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { useAccess } from "@/hooks/use-access";
import { Logo } from "@/components/logo";
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

function DetailCollapsible({ title, summary, children, defaultOpen = false, testId }: { 
  title: string; 
  summary: React.ReactNode; 
  children: React.ReactNode; 
  defaultOpen?: boolean; 
  testId: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-md" data-testid={testId}>
      <button
        type="button"
        className="w-full flex items-start justify-between gap-3 p-3 text-left"
        onClick={() => setOpen(!open)}
        data-testid={`button-toggle-${testId}`}
      >
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold">{title}</h4>
          {!open && <div className="text-xs text-muted-foreground mt-0.5">{summary}</div>}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 mt-0.5 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-3 pb-3 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  useDocumentTitle("Divorce Financial Modelling Results | DivorceCalculatorUK");
  useNoIndex();
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
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20 flex items-center justify-center gap-3 flex-wrap" data-testid="text-disclaimer">
        <span>Illustrative modelling only. Not legal, tax or financial advice.</span>
        <AccessExpiryNotice />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Logo size="md" />
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

      <div className="sticky top-[57px] z-40 border-b bg-background border-border/40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label className="text-xs text-muted-foreground">Asset Split (A : B)</Label>
              <Slider
                value={[assumptions.splitRatio * 100]}
                onValueChange={([v]) => updateAssumptions({ splitRatio: v / 100 })}
                min={10} max={90} step={5}
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
                  Select a scenario below for detailed analysis — including capital allocation, source of funds breakdown, monthly financial position, and financial sustainability indicator.
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
                        <Bar dataKey="Party A" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Party B" fill="#0d9488" radius={[4, 4, 0, 0]} />
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
                  <CollapsibleSection title="Sensitivity Analysis" subtitle="How outcomes shift if key figures such as property value or interest rates change" icon={<Activity className="w-4 h-4" />} testId="collapsible-sensitivity">
                    <SensitivityPanel scenarios={displayScenarios} engine={engine} store={store} />
                  </CollapsibleSection>
                  <CollapsibleSection title="Sensitivity Snapshot" subtitle="A quick look at how outcomes change if key assumptions shift" icon={<Activity className="w-4 h-4" />} testId="collapsible-sensitivity-snapshot">
                    <SensitivitySnapshotPanel engine={engine} store={store} />
                  </CollapsibleSection>
                  <CollapsibleSection title="Stress Test Modelling" subtitle="Model the impact of interest rate and expenditure variations on scenario viability" icon={<AlertTriangle className="w-4 h-4" />} testId="collapsible-stress-test">
                    <StressTestPanel />
                  </CollapsibleSection>
                  <CollapsibleSection title="Assumption Review Prompts" subtitle="Structured reflection points to help evaluate the assumptions underpinning this analysis" icon={<Lightbulb className="w-4 h-4" />} testId="collapsible-assumption-prompts">
                    <AssumptionReviewPrompts engine={engine} store={store} />
                  </CollapsibleSection>
                </div>
              </div>

              <CollapsibleSection 
                title="Key Assumptions & Methodology" 
                subtitle="Parameters, exclusions, and methodology underpinning the analysis" 
                icon={<Info className="w-4 h-4" />} 
                testId="collapsible-assumptions-methodology"
              >
                <div className="text-xs text-muted-foreground space-y-2">
                  <p className="text-xs text-muted-foreground mb-2">The following parameters underpin all calculations presented above. Core settlement ratios are adjustable via the controls at the top of this page.</p>
                  <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                    <div className="flex justify-between gap-2"><span>Asset split (A : B)</span><span className="tabular-nums">{Math.round(assumptions.splitRatio * 100)}% : {Math.round((1 - assumptions.splitRatio) * 100)}%</span></div>
                    <div className="flex justify-between gap-2"><span>Pension split (A : B)</span><span className="tabular-nums">{Math.round(assumptions.splitPensionToA * 100)}% : {Math.round((1 - assumptions.splitPensionToA) * 100)}%</span></div>
                    <div className="flex justify-between gap-2"><span>Mortgage rate</span><span className="tabular-nums">{(assumptions.mortgageAPR * 100).toFixed(1)}%</span></div>
                    <div className="flex justify-between gap-2"><span>Mortgage term</span><span className="tabular-nums">{assumptions.mortgageTermYears} years</span></div>
                    <div className="flex justify-between gap-2"><span>Inflation rate</span><span className="tabular-nums">{(assumptions.inflationRate * 100).toFixed(1)}%</span></div>
                    <div className="flex justify-between gap-2"><span>Projection period</span><span className="tabular-nums">{assumptions.projectionYears} years</span></div>
                    <div className="flex justify-between gap-2"><span>Tax model</span><span>{assumptions.includeTaxModel ? "2025/26 UK rates" : "Disabled"}</span></div>
                    <div className="flex justify-between gap-2"><span>Child maintenance</span><span>{assumptions.includeCMSEstimate ? `CMS estimate (${engine.cmsYearsRemaining > 0 ? `~${engine.cmsYearsRemaining} yrs remaining` : "all children 16+"})` : "Not included"}</span></div>
                    {(assumptions.overrideNetIncomeA != null || assumptions.overrideNetIncomeB != null || assumptions.overrideCMSAnnual != null) && (
                      <div className="mt-2 pt-2 border-t border-muted space-y-1">
                        <p className="text-xs font-medium text-amber-600 dark:text-amber-400">User Overrides Applied:</p>
                        {assumptions.overrideNetIncomeA != null && assumptions.overrideNetIncomeA > 0 && (
                          <div className="flex justify-between gap-2 text-xs"><span>Party A take-home (override)</span><span className="tabular-nums">{formatCurrency(assumptions.overrideNetIncomeA)}/yr</span></div>
                        )}
                        {assumptions.overrideNetIncomeB != null && assumptions.overrideNetIncomeB > 0 && (
                          <div className="flex justify-between gap-2 text-xs"><span>Party B take-home (override)</span><span className="tabular-nums">{formatCurrency(assumptions.overrideNetIncomeB)}/yr</span></div>
                        )}
                        {assumptions.overrideCMSAnnual != null && assumptions.overrideCMSAnnual > 0 && (
                          <div className="flex justify-between gap-2 text-xs"><span>Child maintenance (override)</span><span className="tabular-nums">{formatCurrency(assumptions.overrideCMSAnnual)}/yr</span></div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 pt-2 border-t border-muted space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Tax Model Scope (2025/26):</p>
                    <p className="text-xs text-muted-foreground">The tax engine aggregates all entered income sources (salary, self-employment, rental, dividends, benefits) per party and applies a single income tax and employee Class 1 NI calculation. Personal allowance tapering above £100,000 is modelled.</p>
                    <p className="text-xs font-medium text-muted-foreground mt-1">The following are not separately modelled:</p>
                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                      <li>Dividend tax rates and the £1,000 dividend allowance</li>
                      <li>Savings income allowance and starting rate for savings</li>
                      <li>Capital Gains Tax on asset disposals</li>
                      <li>Scottish income tax rates (England/Wales/NI rates are applied)</li>
                      <li>Self-employed NI (Class 2 & Class 4) — employee Class 1 rates are used</li>
                      <li>High Income Child Benefit Charge (above £60,000)</li>
                      <li>Pension contribution tax relief</li>
                      <li>Student loan repayments</li>
                    </ul>
                    <p className="text-xs text-muted-foreground italic mt-1">Where these factors are material, actual net income may differ from the figures presented. Independent tax review may be warranted.</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-muted space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Other Exclusions & Assumptions:</p>
                    <p className="text-xs text-muted-foreground">Early repayment charges, stamp duty, legal transfer fees, moving costs, and spousal maintenance are not separately modelled. Pension values are treated as nominal CETV figures without actuarial adjustment. No CGT liability is modelled — the principal private residence exemption is assumed for the family home.</p>
                  </div>
                </div>
              </CollapsibleSection>
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
          <p>All outputs are estimates based on the information entered and standard assumptions. They must not be relied upon for decision-making. Lending capacity benchmarks are generalised income multiple illustrations and do not constitute a lending assessment, mortgage advice, or credit approval indication.</p>
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
    { id: "risk", label: "Sustainability & Projection", icon: Activity, description: "Financial Sustainability Indicator [liquidity sustainability and lending capacity benchmarks]" },
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
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-liquid-a"><>Party A — Liquid Capital at Month 12<InfoTip text="Starting liquid capital (cash, savings, investments allocated to Party A) minus 12 months of net outgoings (monthly expenses plus any mortgage payments, minus net monthly income after tax and NI). A negative figure indicates projected outgoings exceed available liquid reserves within the first year." /></></TableCell>
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
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-liquid-b"><>Party B — Liquid Capital at Month 12<InfoTip text="Starting liquid capital (cash, savings, investments allocated to Party B) minus 12 months of net outgoings (monthly expenses plus any mortgage payments, minus net monthly income after tax and NI). A negative figure indicates projected outgoings exceed available liquid reserves within the first year." /></></TableCell>
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
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-surplus-a"><>Party A — Monthly Surplus / (Deficit)<InfoTip text="The difference between net monthly income (after tax/NI) and total monthly outgoings (living expenses plus mortgage). A surplus means income exceeds outgoings; a deficit means outgoings exceed income, drawing down liquid reserves each month." /></></TableCell>
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
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-surplus-b"><>Party B — Monthly Surplus / (Deficit)<InfoTip text="The difference between net monthly income (after tax/NI) and total monthly outgoings (living expenses plus mortgage). A surplus means income exceeds outgoings; a deficit means outgoings exceed income, drawing down liquid reserves each month." /></></TableCell>
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
                <TableCell className="text-sm text-muted-foreground" data-testid="label-yr1-buffer-a"><>Party A — Months of Reserves Remaining<InfoTip text="If Party A has a monthly deficit, this shows how many months their starting liquid capital would last at that rate of drawdown. 99+ means income covers outgoings with no drawdown required. Below 12 months indicates limited financial buffer." /></></TableCell>
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

  const getComplexity = (s: ScenarioResult): { label: string; score: number; factors: string[] } => {
    let score = 0;
    const factors: string[] = [];

    if (s.id !== "S1") {
      score += 1;
      factors.push("Property transfer required");
    }
    if ((s.mortgageMonthlyA ?? 0) > 0 || (s.mortgageMonthlyB ?? 0) > 0) {
      score += 1;
      factors.push("Ongoing mortgage obligation");
    }
    if ((s.buyoutAmount ?? 0) > 0) {
      score += 1;
      factors.push("Equity transfer (buyout) payment");
    }
    if ((s.fundingGap ?? 0) > 0) {
      score += 2;
      factors.push("Funding shortfall — additional borrowing needed");
    }
    if (s.pensionA > 0 && s.pensionB > 0 && Math.abs(s.pensionA - s.pensionB) > 1000) {
      score += 1;
      factors.push("Pension sharing order required");
    }
    if (s.id === "S4") {
      score += 1;
      factors.push("Deferred settlement — ongoing legal arrangement");
    }

    const label = score <= 1 ? "Low" : score <= 3 ? "Medium" : "High";
    return { label, score, factors };
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
                <TableCell className="text-sm text-muted-foreground">Steps to Complete<InfoTip text="How many legal and financial steps are needed to put this scenario into effect. Factors include property transfers, mortgage obligations, buyout payments, pension sharing orders, and deferred arrangements. Low: 0-1 steps | Medium: 2-3 steps | High: 4+ steps" /></TableCell>
                {scenarios.map(s => {
                  const comp = getComplexity(s);
                  return (
                    <TableCell key={s.id} className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className={`cursor-help ${comp.label === "Low" ? "text-emerald-600 border-emerald-200 bg-emerald-50" : comp.label === "Medium" ? "text-amber-600 border-amber-200 bg-amber-50" : "text-red-600 border-red-200 bg-red-50"}`}>
                            {comp.label}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-xs">
                          <p className="font-semibold text-xs mb-1">Score: {comp.score} ({comp.label})</p>
                          {comp.factors.length > 0 ? (
                            <ul className="text-xs space-y-0.5">
                              {comp.factors.map((f, i) => <li key={i}>- {f}</li>)}
                            </ul>
                          ) : (
                            <p className="text-xs">No additional complexity factors</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
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
  store: StoreState;
}) {
  const { intermediate, budget } = engine;
  const scenario = scenarios[0];
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  if (!scenario) return null;

  const ranking = useMemo(() =>
    computeSensitivityRanking(
      scenario, store, budget.surplusA, budget.surplusB,
      intermediate.totalLiquid, intermediate.netHomeEquity, intermediate.totalMortgage,
    ),
    [scenario, store, budget, intermediate]
  );

  const rankIcons = ["1st", "2nd", "3rd", "4th"];

  return (
    <Card data-testid="card-sensitivity">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="w-4 h-4" /> Sensitivity Analysis
        </CardTitle>
        <CardDescription>
          Ranked assessment of which assumption changes have the greatest impact on financial outcomes. Each factor is tested independently.
          <InfoTip text="Each assumption is varied by a fixed amount while all other inputs remain unchanged. The resulting change in annual surplus is calculated and factors are ranked by total impact magnitude. Red = negative impact, Green = positive impact." />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {ranking.map((f, i) => (
            <div
              key={f.factor}
              className="p-3 rounded-md border cursor-pointer overflow-hidden"
              data-testid={`sensitivity-factor-${f.rank}`}
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                  {rankIcons[i] ?? `${i + 1}`}
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="space-y-1.5">
                    <span className="text-sm font-semibold block">{f.factor}</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="outline" className="text-xs whitespace-nowrap">{f.impactType}</Badge>
                      <Badge variant="outline" className="text-xs"><span className="line-clamp-1">{f.description}</span></Badge>
                    </div>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span>Party A:</span>
                      <span className={`tabular-nums font-medium ${f.impactValueA < 0 ? "text-red-600" : f.impactValueA > 0 ? "text-emerald-600" : ""}`}>
                        {f.impactLabelA}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>Party B:</span>
                      <span className={`tabular-nums font-medium ${f.impactValueB < 0 ? "text-red-600" : f.impactValueB > 0 ? "text-emerald-600" : ""}`}>
                        {f.impactLabelB}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                    <Info className="w-3 h-3" />
                    <span>{expandedIdx === i ? "Click to collapse" : "Click to see methodology"}</span>
                  </div>
                </div>
              </div>
              {expandedIdx === i && (
                <div className="mt-3 pt-3 border-t text-xs text-muted-foreground leading-relaxed" data-testid={`sensitivity-methodology-${f.rank}`}>
                  <p className="font-semibold text-foreground mb-1">Calculation methodology:</p>
                  <p>{f.methodology}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AssumptionReviewPrompts({
  engine,
  store,
}: {
  engine: ReturnType<typeof useEngine>;
  store: StoreState;
}) {
  const { budget, intermediate } = engine;
  const assumptions = store.assumptions;

  const prompts: { question: string; context: string }[] = [];

  const totalIncomeA = store.incomes.filter(i => i.owner === "A").reduce((s, i) => s + i.amountAnnualGross, 0);
  const totalIncomeB = store.incomes.filter(i => i.owner === "B").reduce((s, i) => s + i.amountAnnualGross, 0);

  prompts.push({
    question: "Are income projections stable?",
    context: totalIncomeA > 0 && totalIncomeB > 0
      ? `The model assumes Party A earns ${formatCurrency(totalIncomeA)}/yr and Party B earns ${formatCurrency(totalIncomeB)}/yr on an ongoing basis. Income stability over the projection period may warrant independent verification.`
      : totalIncomeA > 0
      ? `The model assumes Party A earns ${formatCurrency(totalIncomeA)}/yr. Income sustainability over the projection period may warrant independent verification.`
      : `The model assumes Party B earns ${formatCurrency(totalIncomeB)}/yr. Income sustainability over the projection period may warrant independent verification.`,
  });

  prompts.push({
    question: "Are expense projections conservative?",
    context: `Expenses are inflated at ${(assumptions.inflationRate * 100).toFixed(1)}% per year. Post-separation costs often differ from current spending patterns. The entered expenses may not fully reflect likely post-settlement outgoings.`,
  });

  const hasMortgage = intermediate.totalMortgage > 0;
  if (hasMortgage) {
    prompts.push({
      question: "Would a 1% interest rate increase materially affect comfort?",
      context: `The current model uses a ${(assumptions.mortgageAPR * 100).toFixed(1)}% mortgage rate. If rates increase, monthly obligations rise. Review the sensitivity analysis above to quantify this impact for your circumstances.`,
    });
  }

  if (assumptions.includeCMSEstimate && store.children.numChildren > 0) {
    prompts.push({
      question: "Are child maintenance assumptions realistic?",
      context: `The model estimates child maintenance based on CMS basic-rate calculations for ${store.children.numChildren} child${store.children.numChildren > 1 ? "ren" : ""}. Actual CMS assessments may differ based on shared care arrangements and other factors.`,
    });
  }

  prompts.push({
    question: "Have all material assets and liabilities been included?",
    context: `The model operates on the assets, debts, and incomes entered. There may be additional accounts, liabilities, or income sources that could be factored in for a more complete picture.`,
  });

  return (
    <Card data-testid="card-assumption-prompts">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Assumption Review Prompts
        </CardTitle>
        <CardDescription>
          Structured reflection points to evaluate the assumptions underlying this analysis. These are not recommendations — they are designed to encourage structured thinking about key inputs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prompts.map((p, i) => (
            <div key={i} className="p-3 rounded-md border space-y-1" data-testid={`assumption-prompt-${i}`}>
              <p className="text-sm font-semibold">{p.question}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.context}</p>
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
  store: StoreState;
  runways: Record<string, RunwayResult>;
}) {
  return (
    <Card data-testid="card-executive-table">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <PoundSterling className="w-4 h-4" />
          Executive Summary
        </CardTitle>
        <CardDescription>
          Comparative financial summary across all modelled scenarios. Each scenario reflects different implications for liquidity, leverage, and income variability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="hidden lg:block overflow-x-auto">
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
                <TableCell className="font-medium text-muted-foreground"><>5-Year Reserves — Party A<InfoTip text="Whether Party A's liquid capital is projected to sustain their outgoings for at least 5 years based on current income, expenditure, and mortgage obligations." /></></TableCell>
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
                <TableCell className="font-medium text-muted-foreground"><>5-Year Reserves — Party B<InfoTip text="Whether Party B's liquid capital is projected to sustain their outgoings for at least 5 years based on current income, expenditure, and mortgage obligations." /></></TableCell>
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
                <TableCell className="font-medium text-muted-foreground"><>Financial Sustainability — Party A<InfoTip text="Illustrative model output for Party A — incorporating cash buffer adequacy, monthly surplus/deficit, lending capacity benchmark, and reserve duration projection. This is not a suitability or lending assessment." /></></TableCell>
                {scenarios.map(s => {
                  const st = stabilityScores[s.id];
                  return (
                    <TableCell key={s.id} className="text-center">
                      <StabilityBadge score={st?.scoreA ?? 100} label={st?.labelA ?? "Higher Resilience (Modelled)"} />
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className={viewLens === "risk" ? "bg-primary/5" : ""}>
                <TableCell className="font-medium text-muted-foreground"><>Financial Sustainability — Party B<InfoTip text="Illustrative model output for Party B — incorporating cash buffer adequacy, monthly surplus/deficit, lending capacity benchmark, and reserve duration projection. This is not a suitability or lending assessment." /></></TableCell>
                {scenarios.map(s => {
                  const st = stabilityScores[s.id];
                  return (
                    <TableCell key={s.id} className="text-center">
                      <StabilityBadge score={st?.scoreB ?? 100} label={st?.labelB ?? "Higher Resilience (Modelled)"} />
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

        <div className="lg:hidden space-y-3" data-testid="mobile-executive-cards">
          {scenarios.map(s => {
            const st = stabilityScores[s.id];
            const rw = runways[s.id];
            const meta = SCENARIO_META[s.id];
            const annual = ((s.mortgageMonthlyA ?? 0) + (s.mortgageMonthlyB ?? 0)) * 12;
            return (
              <div key={s.id} className="p-4 border rounded-md space-y-2.5" data-testid={`mobile-card-${s.id}`}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: meta?.color }} />
                  <span className="text-sm font-semibold">{meta?.label ?? s.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="min-w-0">
                    <span className="text-muted-foreground block">Liquid Capital — A</span>
                    <span className="tabular-nums font-semibold text-blue-600">{formatCurrency(s.liquidStartA)}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block">Liquid Capital — B</span>
                    <span className="tabular-nums font-semibold text-emerald-600">{formatCurrency(s.liquidStartB)}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block">Reserves — A</span>
                    {rw?.partyA.sustained
                      ? <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-[10px]">Sustained</Badge>
                      : <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-[10px]">Yr {rw?.partyA.depletionYear}</Badge>}
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block">Reserves — B</span>
                    {rw?.partyB.sustained
                      ? <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-[10px]">Sustained</Badge>
                      : <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-[10px]">Yr {rw?.partyB.depletionYear}</Badge>}
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block">Sustainability — A</span>
                    <StabilityBadge score={st?.scoreA ?? 100} label={st?.labelA ?? "Higher Resilience"} compact />
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block">Sustainability — B</span>
                    <StabilityBadge score={st?.scoreB ?? 100} label={st?.labelB ?? "Higher Resilience"} compact />
                  </div>
                  {(s.fundingGap ?? 0) > 0 && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground block">Funding Shortfall</span>
                      <span className="tabular-nums font-semibold text-amber-600">{formatCurrency(s.fundingGap!)}</span>
                    </div>
                  )}
                  {annual > 0 && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground block">Annual Mortgage Obligation</span>
                      <span className="tabular-nums font-semibold text-amber-600">{formatCurrency(annual)}/yr</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground block">Total Net — A</span>
                    <span className="tabular-nums font-bold text-blue-600">{formatCurrency(s.totalA)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Total Net — B</span>
                    <span className="tabular-nums font-bold text-emerald-600">{formatCurrency(s.totalB)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function StabilityBadge({ score, label, compact }: { score: number; label: string; compact?: boolean }) {
  const colorClass = score >= 80
    ? "text-emerald-700 border-emerald-200 bg-emerald-50"
    : score >= 60
    ? "text-amber-700 border-amber-200 bg-amber-50"
    : "text-red-700 border-red-200 bg-red-50";

  const shortLabel = compact
    ? (score >= 80 ? "Higher Resilience" : score >= 60 ? "Moderate Resilience" : "Lower Resilience")
    : label;

  return (
    <Badge variant="outline" className={`${colorClass} max-w-full whitespace-nowrap`} data-testid={`badge-stability-${score}`}>
      <Shield className="w-3 h-3 mr-1 shrink-0" />
      <span className="truncate">{score} {compact ? shortLabel.replace("Resilience", "Res.") : shortLabel}</span>
    </Badge>
  );
}

function generateScenarioConsiderations(
  scenario: ScenarioResult,
  engine: ReturnType<typeof useEngine>,
  store: StoreState,
): string[] {
  const considerations: string[] = [];
  const { intermediate, budget } = engine;

  const totalA = scenario.totalA || 1;
  const totalB = scenario.totalB || 1;
  const propConcA = ((scenario.homeEquityA ?? 0) / totalA) * 100;
  const propConcB = ((scenario.homeEquityB ?? 0) / totalB) * 100;

  if (propConcA > 70 || propConcB > 70) {
    const party = propConcA > propConcB ? "Party A" : "Party B";
    const pct = Math.round(Math.max(propConcA, propConcB));
    considerations.push(
      `This scenario results in ${pct}% of ${party}'s net worth being held in property. Reduced liquidity may be a relevant consideration for short-term financial flexibility.`
    );
  }

  if ((scenario.fundingGap ?? 0) > 0) {
    considerations.push(
      `This scenario requires additional funding of ${formatCurrency(scenario.fundingGap!)}. This shortfall may require increased borrowing or alternative asset sources.`
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
          `Mortgage obligations represent ${ratio}% of the retaining party's net income. This proportion may warrant assessment of income sustainability over the next 3-5 years under varying conditions.`
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
      `Party A's liquid capital covers approximately ${months} month${months !== 1 ? "s" : ""} of expenses. Additional liquidity sources may need to be identified under current assumptions.`
    );
  }
  if (expenseB > 0 && liquidB < expenseB) {
    const months = Math.round((liquidB / expenseB) * 12);
    considerations.push(
      `Party B's liquid capital covers approximately ${months} month${months !== 1 ? "s" : ""} of expenses. Additional liquidity sources may need to be identified under current assumptions.`
    );
  }

  if (budget.surplusA < 0) {
    considerations.push(
      `Party A is projected to have a monthly deficit of ${formatCurrency(Math.abs(budget.surplusA / 12))}/month under this scenario. Expenditure adjustments or supplementary income sources may be relevant considerations.`
    );
  }
  if (budget.surplusB < 0) {
    considerations.push(
      `Party B is projected to have a monthly deficit of ${formatCurrency(Math.abs(budget.surplusB / 12))}/month under this scenario. Expenditure adjustments or supplementary income sources may be relevant considerations.`
    );
  }

  if (scenario.id === "S4") {
    considerations.push(
      `This scenario involves a deferred settlement structure, with the property arrangement remaining in place for an extended period. The practical implications of ongoing shared legal obligations and future market conditions may be relevant.`
    );
  }

  return considerations.slice(0, 5);
}

function ScenarioConsiderationsPanel({ considerations }: { considerations: string[] }) {
  if (considerations.length === 0) return null;

  return (
    <div className="space-y-2" data-testid="section-scenario-considerations">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <Lightbulb className="h-3.5 w-3.5" /> Scenario Considerations
      </h3>
      <div className="space-y-2">
        {considerations.map((c, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-muted/40 text-sm leading-relaxed" data-testid={`consideration-${i}`}>
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </div>
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
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
  store: StoreState;
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

  const considerations = useMemo(() =>
    generateScenarioConsiderations(scenario, engine, store),
    [scenario, engine, store]
  );

  const currentMortgagePayment = calcMortgagePayment(intermediate.totalMortgage, store.assumptions.mortgageAPR, store.assumptions.mortgageTermYears);
  const stressedMortgagePayment = calcMortgagePayment(intermediate.totalMortgage, store.assumptions.mortgageAPR + 0.01, store.assumptions.mortgageTermYears);
  const sensitivityMonthlyDiff = stressedMortgagePayment.monthlyPayment - currentMortgagePayment.monthlyPayment;
  const totalExpenses = store.expenses.reduce((s, e) => s + e.amountAnnual, 0);
  const tenPctExpenseImpact = Math.round(totalExpenses * 0.1);

  const expenseA = store.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const expenseB = store.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const liquidityRatioA = expenseA > 0 ? scenario.liquidStartA / expenseA : 0;
  const liquidityRatioB = expenseB > 0 ? scenario.liquidStartB / expenseB : 0;

  const runway = engine.runways[scenario.id];

  const lowestA = projection ? Math.min(...projection.map(p => p.capitalA)) : scenario.liquidStartA;
  const lowestB = projection ? Math.min(...projection.map(p => p.capitalB)) : scenario.liquidStartB;

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
          <div className="flex gap-2 flex-wrap">
            <StabilityBadge score={stabilityScore.scoreA} label={`A: ${stabilityScore.labelA}`} />
            <StabilityBadge score={stabilityScore.scoreB} label={`B: ${stabilityScore.labelB}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <NarrativeSection narrative={narrative} />

        <div className="space-y-4 p-4 bg-muted/20 rounded-md" data-testid="block-financial-sustainability">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Financial Sustainability Indicator</h3>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">Party A Index</span>
              <StabilityBadge score={stabilityScore.scoreA} label={stabilityScore.labelA} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">Party B Index</span>
              <StabilityBadge score={stabilityScore.scoreB} label={stabilityScore.labelB} />
            </div>
          </div>

          {runway && (
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Reserves — A</span>
                <Badge variant="outline" className={runway.partyA.sustained ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-amber-600 border-amber-200 bg-amber-50"}>
                  {runway.partyA.sustained ? "Sustained" : `Depletes Yr ${runway.partyA.depletionYear}`}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Reserves — B</span>
                <Badge variant="outline" className={runway.partyB.sustained ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-amber-600 border-amber-200 bg-amber-50"}>
                  {runway.partyB.sustained ? "Sustained" : `Depletes Yr ${runway.partyB.depletionYear}`}
                </Badge>
              </div>
            </div>
          )}

          {narrative.riskFlags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {narrative.riskFlags.slice(0, 3).map((f, i) => {
                const colorClass = f.severity === "ok"
                  ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                  : f.severity === "warn"
                  ? "text-amber-600 border-amber-200 bg-amber-50"
                  : "text-red-600 border-red-200 bg-red-50";
                return (
                  <Badge key={i} variant="outline" className={colorClass} data-testid={`badge-risk-${i}`}>
                    {f.severity === "ok" ? <Check className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                    {f.label}
                  </Badge>
                );
              })}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Liquidity Ratio — A</span>
              <span className={`tabular-nums font-medium ${liquidityRatioA < 1 ? "text-red-600" : liquidityRatioA < 2 ? "text-amber-600" : "text-emerald-600"}`}>
                {liquidityRatioA.toFixed(1)}x annual expenses
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Liquidity Ratio — B</span>
              <span className={`tabular-nums font-medium ${liquidityRatioB < 1 ? "text-red-600" : liquidityRatioB < 2 ? "text-amber-600" : "text-emerald-600"}`}>
                {liquidityRatioB.toFixed(1)}x annual expenses
              </span>
            </div>
          </div>
        </div>

        <DetailCollapsible
          title="Capital Position"
          summary={<span className="tabular-nums">Party A liquid: <span className="text-blue-600 font-medium">{formatCurrency(sourceOfFunds.A.netStartingLiquid)}</span> | Party B liquid: <span className="text-emerald-600 font-medium">{formatCurrency(sourceOfFunds.B.netStartingLiquid)}</span></span>}
          testId="detail-capital-position"
        >
          <div className="space-y-4">
            <SourceOfFundsTable sourceOfFunds={sourceOfFunds} scenario={scenario} />
            <CompositionChart scenario={scenario} />
          </div>
        </DetailCollapsible>

        {housingFeasibility && (
          <DetailCollapsible
            title="Housing Feasibility"
            summary={
              <Badge variant="outline" className={housingFeasibility.withinBenchmarkThresholds ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-amber-600 border-amber-200 bg-amber-50"}>
                {housingFeasibility.classification}
              </Badge>
            }
            testId="detail-housing-position"
          >
            <div>
              <p className="text-xs text-muted-foreground mb-3">Whether each party's income is likely to support the mortgage obligations under this settlement structure, based on generalised lending capacity benchmarks (non-lender specific).</p>
              <HousingFeasibilityPanel feasibility={housingFeasibility} scenarioId={scenario.id} />
            </div>
          </DetailCollapsible>
        )}

        {comparison && <ComparisonDeltaPanel delta={comparison} scenarioId={scenario.id} />}

        <DetailCollapsible
          title="Monthly Sustainability Snapshot"
          summary={
            <span className="tabular-nums">
              Party A: <span className={monthlySnapshot.surplusA < 0 ? "text-red-600 font-medium" : "text-emerald-600 font-medium"}>{monthlySnapshot.surplusA < 0 ? `(${formatCurrency(Math.abs(monthlySnapshot.surplusA))})` : formatCurrency(monthlySnapshot.surplusA)}/mo</span>
              {" | "}
              Party B: <span className={monthlySnapshot.surplusB < 0 ? "text-red-600 font-medium" : "text-emerald-600 font-medium"}>{monthlySnapshot.surplusB < 0 ? `(${formatCurrency(Math.abs(monthlySnapshot.surplusB))})` : formatCurrency(monthlySnapshot.surplusB)}/mo</span>
            </span>
          }
          testId="detail-monthly-snapshot"
        >
          <MonthlySnapshotSection snapshot={monthlySnapshot} />
        </DetailCollapsible>

        {projection && projection.length > 1 && (
          <DetailCollapsible
            title="5-Year Capital Projection"
            summary={
              <span className="tabular-nums">
                Lowest capital — A: <span className={`font-medium ${lowestA < 0 ? "text-red-600" : ""}`}>{formatCurrency(lowestA)}</span>
                {" | "}
                B: <span className={`font-medium ${lowestB < 0 ? "text-red-600" : ""}`}>{formatCurrency(lowestB)}</span>
              </span>
            }
            testId="detail-capital-projection"
          >
            <div>
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
                    <Line type="monotone" dataKey="capitalA" name="Party A" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="capitalB" name="Party B" stroke="#0d9488" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <CapitalRunwaySection runway={runway} />
            </div>
          </DetailCollapsible>
        )}

        <DetailCollapsible
          title="Sensitivity Snapshot"
          summary={
            <span className="tabular-nums">
              +1% rate: <span className="text-amber-600 font-medium">{formatCurrency(sensitivityMonthlyDiff)}/mo</span>
              {" | "}
              +10% costs: <span className="text-amber-600 font-medium">-{formatCurrency(tenPctExpenseImpact)}/yr combined</span>
            </span>
          }
          testId="detail-sensitivity-snapshot"
        >
          <div className="space-y-2">
            <div className="p-3 bg-muted/30 rounded-md space-y-1.5">
              <p className="text-sm font-medium">If interest rate increases by 1%:</p>
              <p className="text-xs text-muted-foreground">
                {scenario.id === "S1" ? "Combined" : scenario.id === "S2" ? "Party A" : scenario.id === "S3" ? "Party B" : "Combined"} mortgage payment increases by <span className="tabular-nums font-semibold text-amber-600">{formatCurrency(sensitivityMonthlyDiff)}/mo</span>
              </p>
            </div>
            <div className="p-3 bg-muted/30 rounded-md space-y-1.5">
              <p className="text-sm font-medium">If expenses increase by 10%:</p>
              <div className="grid gap-1 sm:grid-cols-2 text-xs text-muted-foreground">
                <p>Party A surplus changes by <span className="tabular-nums font-semibold text-amber-600">-{formatCurrency(Math.round(expenseA * 0.1))}/yr</span></p>
                <p>Party B surplus changes by <span className="tabular-nums font-semibold text-amber-600">-{formatCurrency(Math.round(expenseB * 0.1))}/yr</span></p>
              </div>
            </div>
          </div>
        </DetailCollapsible>

        {negotiationLevers.length > 0 && (
          <DetailCollapsible
            title="Negotiation Levers"
            summary={<span>{negotiationLevers.length} suggestion{negotiationLevers.length !== 1 ? "s" : ""} available</span>}
            testId="detail-negotiation-levers"
          >
            <NegotiationLeversPanel levers={negotiationLevers} />
          </DetailCollapsible>
        )}

        {considerations.length > 0 && (
          <DetailCollapsible
            title="Scenario Considerations"
            summary={<span>Key considerations available</span>}
            testId="detail-scenario-considerations"
          >
            <ScenarioConsiderationsPanel considerations={considerations} />
          </DetailCollapsible>
        )}

        <DetailCollapsible
          title="Financial Sustainability Indicator Detail"
          summary={<span>View scoring breakdown and assessment drivers</span>}
          testId="detail-stability-assessment"
        >
          <StabilitySection score={stabilityScore} />
        </DetailCollapsible>

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
  const [showDetail, setShowDetail] = useState(false);
  
  return (
    <div className="space-y-3" data-testid="section-source-of-funds">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Source of Funds</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetail(!showDetail)}
          data-testid="button-toggle-funds-detail"
        >
          {showDetail ? "Hide Detail" : "Show Detail"}
          <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${showDetail ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div className="space-y-1.5">
        {(scenario.homeEquityA ?? 0) > 0 || (scenario.homeEquityB ?? 0) > 0 ? (
          <div className="flex items-center justify-between text-sm gap-2">
            <span className="text-muted-foreground">Net Property Equity</span>
            <span className="tabular-nums font-medium">
              A: <span className="text-blue-600">{formatCurrency(scenario.homeEquityA ?? 0)}</span>
              {" / "}
              B: <span className="text-emerald-600">{formatCurrency(scenario.homeEquityB ?? 0)}</span>
            </span>
          </div>
        ) : null}
        <div className="flex items-center justify-between text-sm gap-2">
          <span className="text-muted-foreground">Net Liquid Capital</span>
          <span className="tabular-nums font-medium">
            A: <span className="text-blue-600">{formatCurrency(sourceOfFunds.A.netStartingLiquid)}</span>
            {" / "}
            B: <span className="text-emerald-600">{formatCurrency(sourceOfFunds.B.netStartingLiquid)}</span>
          </span>
        </div>
        {(sourceOfFunds.pension.A_after > 0 || sourceOfFunds.pension.B_after > 0) && (
          <div className="flex items-center justify-between text-sm gap-2">
            <span className="text-muted-foreground">Pension Position (separate)</span>
            <span className="tabular-nums font-medium">
              A: {formatCurrency(sourceOfFunds.pension.A_after)}
              {" / "}
              B: {formatCurrency(sourceOfFunds.pension.B_after)}
            </span>
          </div>
        )}
        <Separator className="my-1" />
        <div className="flex items-center justify-between text-sm font-bold gap-2">
          <span>Total Allocated Net Position</span>
          <span className="tabular-nums" data-testid="text-total-allocated-net">{formatCurrency(scenario.liquidStartA + scenario.liquidStartB)}</span>
        </div>
      </div>

      {showDetail && (
        <div className="pt-2 border-t space-y-4">
          <p className="text-xs text-muted-foreground">Expand any line for detailed composition</p>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CapitalRunwaySection({ runway }: { runway?: RunwayResult }) {
  if (!runway) return null;
  return (
    <div className="space-y-3" data-testid="section-capital-runway">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <TrendingUp className="w-3.5 h-3.5" /> Reserve Duration (5-Year Projection)
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

function ScoreBar({ score }: { score: number }) {
  const barColor = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="bg-muted rounded-full h-2 mt-1">
      <div className={`${barColor} h-2 rounded-full transition-all`} style={{ width: `${Math.min(100, score)}%` }} />
    </div>
  );
}

function StabilitySection({ score }: { score: StabilityResult }) {
  return (
    <div className="space-y-3" data-testid="section-stability">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <Shield className="w-3.5 h-3.5" /> Financial Sustainability Indicator (Illustrative Model Output)
      </h3>
      <p className="text-[10px] text-muted-foreground/70 italic">Model-generated composite metric. Not a suitability assessment, risk profile, or financial recommendation.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-primary uppercase">Party A</span>
            <StabilityBadge score={score.scoreA} label={score.labelA} />
          </div>
          <ScoreBar score={score.scoreA} />
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
            <span className="text-xs font-semibold text-teal-600 uppercase">Party B</span>
            <StabilityBadge score={score.scoreB} label={score.labelB} />
          </div>
          <ScoreBar score={score.scoreB} />
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
  const [showDetail, setShowDetail] = useState(false);
  
  const totalOutgoingsA = snapshot.lines.filter(l => l.amountA < 0).reduce((s, l) => s + l.amountA, 0);
  const totalOutgoingsB = snapshot.lines.filter(l => l.amountB < 0).reduce((s, l) => s + l.amountB, 0);
  
  return (
    <div className="space-y-3" data-testid="section-monthly-snapshot">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Monthly Financial Position</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetail(!showDetail)}
          data-testid="button-toggle-monthly-detail"
        >
          {showDetail ? "Hide Detail" : "Show Detail"}
          <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${showDetail ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm gap-2">
          <span className="text-muted-foreground">Net Monthly Income</span>
          <span className="tabular-nums font-medium">
            A: <span className="text-blue-600">{formatCurrency(snapshot.netMonthlyIncomeA)}</span>
            {" / "}
            B: <span className="text-emerald-600">{formatCurrency(snapshot.netMonthlyIncomeB)}</span>
          </span>
        </div>
        <div className="flex items-center justify-between text-sm gap-2">
          <span className="text-muted-foreground">Total Monthly Outgoings</span>
          <span className="tabular-nums font-medium">
            A: <span className="text-red-500">{formatCurrency(Math.abs(totalOutgoingsA))}</span>
            {" / "}
            B: <span className="text-red-500">{formatCurrency(Math.abs(totalOutgoingsB))}</span>
          </span>
        </div>
        <Separator className="my-1" />
        <div className="flex items-center justify-between text-sm font-bold gap-2">
          <span>Net Surplus / (Deficit)</span>
          <span className="tabular-nums">
            A: <span className={snapshot.surplusA < 0 ? "text-red-600" : "text-emerald-600"}>{snapshot.surplusA < 0 ? `(${formatCurrency(Math.abs(snapshot.surplusA))})` : formatCurrency(snapshot.surplusA)}</span>
            {" / "}
            B: <span className={snapshot.surplusB < 0 ? "text-red-600" : "text-emerald-600"}>{snapshot.surplusB < 0 ? `(${formatCurrency(Math.abs(snapshot.surplusB))})` : formatCurrency(snapshot.surplusB)}</span>
          </span>
        </div>
      </div>

      {showDetail && (
        <div className="pt-2 border-t">
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
      )}
    </div>
  );
}

function HousingFeasibilityPanel({ feasibility, scenarioId }: { feasibility: HousingFeasibility; scenarioId: string }) {
  const keeper = scenarioId === "S2" ? "A" : "B";
  const ratioDisplay = feasibility.mortgageToNetIncomeRatio === null
    ? "N/A"
    : `${feasibility.mortgageToNetIncomeRatio.toFixed(1)}%`;
  return (
    <div className="space-y-3" data-testid="section-housing-feasibility">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <Building2 className="w-3.5 h-3.5" /> Indicative Lending Capacity Benchmark (Non-Lender Specific) — Party {keeper}
        <InfoTip text="This is a generalised income multiple illustration and does not constitute a lending assessment, mortgage advice, or credit approval indication." />
      </h3>
      <p className="text-[10px] text-muted-foreground/70 italic">Generalised income multiple illustration only. Does not constitute a lending assessment or credit approval indication.</p>
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
    <div className="space-y-3" data-testid="section-negotiation-levers">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <Lightbulb className="w-3.5 h-3.5" /> Potential Negotiation Considerations
      </h3>
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

function SensitivitySnapshotPanel({ engine, store }: { engine: ReturnType<typeof useEngine>; store: StoreState }) {
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

  const expenseA = store.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const expenseB = store.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);

  return (
    <Card data-testid="card-sensitivity-snapshot">
      <CardContent className="pt-4 space-y-3">
        <div className="space-y-2">
          <div className="p-3 bg-muted/30 rounded-md space-y-1.5">
            <p className="text-sm font-medium">If interest rate increases by 1%:</p>
            <p className="text-xs text-muted-foreground">
              Mortgage payment increases by <span className="tabular-nums font-semibold text-amber-600">{formatCurrency(monthlyDiff)}/mo</span> for the party retaining the mortgage
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-md space-y-1.5">
            <p className="text-sm font-medium">If expenses increase by 10%:</p>
            <div className="grid gap-1 sm:grid-cols-2 text-xs text-muted-foreground">
              <p>Party A surplus changes by <span className="tabular-nums font-semibold text-amber-600">-{formatCurrency(Math.round(expenseA * 0.1))}/yr</span></p>
              <p>Party B surplus changes by <span className="tabular-nums font-semibold text-amber-600">-{formatCurrency(Math.round(expenseB * 0.1))}/yr</span></p>
            </div>
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

function AccessExpiryNotice() {
  const { expiresAt } = useAccess();
  if (!expiresAt) return null;

  const expiry = new Date(expiresAt);
  const now = new Date();
  const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const formatted = expiry.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  if (daysLeft <= 14) {
    return (
      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-[10px]" data-testid="badge-expiry-warning">
        Access expires {formatted}
      </Badge>
    );
  }

  return (
    <span className="text-[10px] opacity-70" data-testid="text-expiry-date">
      Access valid until {formatted}
    </span>
  );
}

