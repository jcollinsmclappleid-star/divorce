import { useState, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine, ScenarioResult, ProjectionYear } from "@/hooks/use-engine";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import {
  Calculator, ChevronLeft, Check, X, AlertTriangle,
  TrendingUp, Edit, Shield, ArrowDown, ArrowUp, Minus,
  DollarSign, Home, Info
} from "lucide-react";
import {
  generateScenarioNarrative,
  buildSourceOfFunds,
  computeStabilityScore,
  compareToSell,
  buildMonthlySnapshot,
} from "@/lib/insights";
import type { ScenarioNarrative, SourceOfFunds, StabilityResult, ComparisonDelta, MonthlySnapshotResult } from "@/lib/insights";

const SCENARIO_META: Record<string, { label: string; shortLabel: string; color: string; description: string }> = {
  S1: { label: "Sell & Split", shortLabel: "Sell & Split", color: "#2563EB", description: "Home is sold, proceeds divided" },
  S2: { label: "A Keeps Home", shortLabel: "A Keeps", color: "#10B981", description: "Party A retains the family home" },
  S3: { label: "B Keeps Home", shortLabel: "B Keeps", color: "#8B5CF6", description: "Party B retains the family home" },
  S4: { label: "Deferred Sale", shortLabel: "Deferred", color: "#F59E0B", description: "Home sold at a later date" },
};

export default function ResultsPage() {
  const store = useAppStore();
  const { assumptions, updateAssumptions } = store;
  const engine = useEngine();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [stressInterest, setStressInterest] = useState(false);
  const [stressCosts, setStressCosts] = useState(false);

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
          <Link href="/">
            <Button variant="outline" size="sm" data-testid="button-edit-inputs">
              <Edit className="w-4 h-4 mr-1" /> Edit Inputs
            </Button>
          </Link>
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

      <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-results-title">
              Settlement Comparison
            </h1>
            <p className="text-muted-foreground mt-1">
              Compare how different settlement options affect both parties. Adjust the sliders above to explore different splits.
            </p>
          </div>

          {displayScenarios.length > 0 ? (
            <>
              <ExecutiveTable
                scenarios={displayScenarios}
                projections={engine.projections}
                stabilityScores={stabilityScores}
              />

              <div>
                <h2 className="text-xl font-display font-bold mb-3">Scenario Analysis</h2>
                <p className="text-sm text-muted-foreground mb-4">Select a scenario to see a detailed breakdown of where the money comes from, risk analysis, and projections.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {allScenarios.map(s => (
                    <Button
                      key={s.id}
                      variant={activeTab === s.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab(activeTab === s.id ? null : s.id)}
                      data-testid={`button-tab-${s.id}`}
                    >
                      <div className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: SCENARIO_META[s.id]?.color }} />
                      {SCENARIO_META[s.id]?.label ?? s.name}
                    </Button>
                  ))}
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
                    stressInterest={stressInterest}
                    stressCosts={stressCosts}
                  />
                )}
              </div>

              <StressTestPanel
                stressInterest={stressInterest}
                setStressInterest={setStressInterest}
                stressCosts={stressCosts}
                setStressCosts={setStressCosts}
              />

              {allScenarios.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Total Position by Scenario</CardTitle>
                    <CardDescription>Net worth including liquid capital, home equity, and pensions</CardDescription>
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
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="Party A" fill="#2563EB" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Party B" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No scenario data to display. Please go back and enter your financial details.</p>
                <Link href="/"><Button className="mt-4" data-testid="button-go-back"><ChevronLeft className="w-4 h-4 mr-1" /> Go Back to Wizard</Button></Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="border-t py-6 mt-auto bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-xs space-y-1">
          <p className="font-medium">Illustrative modelling only. Not legal, tax or financial advice.</p>
          <p>Data is stored locally in your browser unless explicitly saved.</p>
        </div>
      </footer>
    </div>
  );
}

function ExecutiveTable({
  scenarios,
  projections,
  stabilityScores,
}: {
  scenarios: ScenarioResult[];
  projections: Record<string, ProjectionYear[]>;
  stabilityScores: Record<string, StabilityResult>;
}) {
  return (
    <Card data-testid="card-executive-table">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Executive Summary
        </CardTitle>
        <CardDescription>At-a-glance comparison across all scenarios</CardDescription>
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
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">Party A liquid cash</TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums font-semibold text-blue-600">{formatCurrency(s.liquidStartA)}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">Party B liquid cash</TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums font-semibold text-emerald-600">{formatCurrency(s.liquidStartB)}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">Buyout required</TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums">
                    {s.buyoutAmount != null && s.buyoutAmount > 0 ? formatCurrency(s.buyoutAmount) : <span className="text-muted-foreground">N/A</span>}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">Funding gap</TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums">
                    {s.fundingGap != null && s.fundingGap > 0
                      ? <span className="text-amber-600 font-semibold">{formatCurrency(s.fundingGap)}</span>
                      : s.fundingGap != null ? <span className="text-emerald-600">None</span> : <span className="text-muted-foreground">N/A</span>}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">Annual mortgage cost</TableCell>
                {scenarios.map(s => {
                  const annual = ((s.mortgageMonthlyA ?? 0) + (s.mortgageMonthlyB ?? 0)) * 12;
                  return (
                    <TableCell key={s.id} className="text-center tabular-nums">
                      {annual > 0 ? <span className="text-amber-600">{formatCurrency(annual)}/yr</span> : <span className="text-muted-foreground">None</span>}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">5-year runway</TableCell>
                {scenarios.map(s => {
                  const runway = getRunway(projections[s.id]);
                  return (
                    <TableCell key={s.id} className="text-center">
                      {runway.ok
                        ? <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50"><Check className="w-3 h-3 mr-1" /> OK</Badge>
                        : <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50"><AlertTriangle className="w-3 h-3 mr-1" /> Yr {runway.hitYear}</Badge>}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">Stability (A)</TableCell>
                {scenarios.map(s => {
                  const st = stabilityScores[s.id];
                  return (
                    <TableCell key={s.id} className="text-center">
                      <StabilityBadge score={st?.scoreA ?? 100} label={st?.labelA ?? "Stable"} />
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-muted-foreground">Stability (B)</TableCell>
                {scenarios.map(s => {
                  const st = stabilityScores[s.id];
                  return (
                    <TableCell key={s.id} className="text-center">
                      <StabilityBadge score={st?.scoreB ?? 100} label={st?.labelB ?? "Stable"} />
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className="font-bold">
                <TableCell className="text-foreground">Net worth (A)</TableCell>
                {scenarios.map(s => (
                  <TableCell key={s.id} className="text-center tabular-nums text-blue-600 text-base">{formatCurrency(s.totalA)}</TableCell>
                ))}
              </TableRow>
              <TableRow className="font-bold">
                <TableCell className="text-foreground">Net worth (B)</TableCell>
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
  stressInterest,
  stressCosts,
}: {
  scenario: ScenarioResult;
  projection: ProjectionYear[] | null | undefined;
  engine: ReturnType<typeof useEngine>;
  store: ReturnType<typeof useAppStore>;
  stabilityScore: StabilityResult;
  sellScenario?: ScenarioResult;
  sellProjection?: ProjectionYear[];
  stressInterest: boolean;
  stressCosts: boolean;
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

  return (
    <Card data-testid={`card-detail-${scenario.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
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

        <div className="grid gap-6 lg:grid-cols-2">
          <StabilitySection score={stabilityScore} />
          <MonthlySnapshotSection snapshot={monthlySnapshot} />
        </div>

        {comparison && <ComparisonDeltaPanel delta={comparison} scenarioId={scenario.id} />}

        {projection && projection.length > 1 && (
          <div>
            <h3 className="text-sm font-semibold mb-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Liquid Cash Projection
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              Cash position over time, after mortgage payments and living costs.
              {((scenario.homeEquityA ?? 0) > 0 || (scenario.homeEquityB ?? 0) > 0) && " Home equity is not included (illiquid)."}
            </p>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projection}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} fontSize={11} />
                  <YAxis axisLine={false} tickLine={false} fontSize={11} tickFormatter={(v) => v >= 1000000 ? `\u00A3${(v / 1000000).toFixed(1)}m` : `\u00A3${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
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

function SourceOfFundsTable({ sourceOfFunds, scenario }: { sourceOfFunds: SourceOfFunds; scenario: ScenarioResult }) {
  return (
    <div className="space-y-3" data-testid="section-source-of-funds">
      <h3 className="text-sm font-semibold">Source of Funds</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Party A</h4>
          {sourceOfFunds.A.rows.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-sm gap-2">
              <span className="text-muted-foreground">{r.label}</span>
              <span className={`tabular-nums font-medium ${r.amount < 0 ? "text-red-500" : ""}`}>
                {r.amount < 0 ? `(${formatCurrency(Math.abs(r.amount))})` : formatCurrency(r.amount)}
              </span>
            </div>
          ))}
          <Separator className="my-1" />
          <div className="flex items-center justify-between text-sm font-semibold gap-2">
            <span>Net liquid capital</span>
            <span className="tabular-nums text-blue-600">{formatCurrency(sourceOfFunds.A.netStartingLiquid)}</span>
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
            <div key={i} className="flex items-center justify-between text-sm gap-2">
              <span className="text-muted-foreground">{r.label}</span>
              <span className={`tabular-nums font-medium ${r.amount < 0 ? "text-red-500" : ""}`}>
                {r.amount < 0 ? `(${formatCurrency(Math.abs(r.amount))})` : formatCurrency(r.amount)}
              </span>
            </div>
          ))}
          <Separator className="my-1" />
          <div className="flex items-center justify-between text-sm font-semibold gap-2">
            <span>Net liquid capital</span>
            <span className="tabular-nums text-emerald-600">{formatCurrency(sourceOfFunds.B.netStartingLiquid)}</span>
          </div>
          {sourceOfFunds.pension.B_after > 0 && (
            <div className="flex items-center justify-between text-xs text-muted-foreground gap-2">
              <span>Pension (separate)</span>
              <span className="tabular-nums">{formatCurrency(sourceOfFunds.pension.B_after)}</span>
            </div>
          )}
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
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
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
        <Shield className="w-3.5 h-3.5" /> Stability Analysis
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
        </div>
      </div>
    </div>
  );
}

function MonthlySnapshotSection({ snapshot }: { snapshot: MonthlySnapshotResult }) {
  return (
    <div className="space-y-3" data-testid="section-monthly-snapshot">
      <h3 className="text-sm font-semibold">Monthly Budget Snapshot</h3>
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
            <TableCell className="text-xs py-1.5">Monthly surplus / deficit</TableCell>
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

function ComparisonDeltaPanel({ delta, scenarioId }: { delta: ComparisonDelta; scenarioId: string }) {
  const keeper = scenarioId === "S2" ? "A" : "B";
  return (
    <div className="p-4 bg-muted/30 rounded-md space-y-2" data-testid="section-comparison-delta">
      <h3 className="text-sm font-semibold flex items-center gap-1.5">
        <TrendingUp className="w-3.5 h-3.5" /> Compared to Selling
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

function StressTestPanel({
  stressInterest,
  setStressInterest,
  stressCosts,
  setStressCosts,
}: {
  stressInterest: boolean;
  setStressInterest: (v: boolean) => void;
  stressCosts: boolean;
  setStressCosts: (v: boolean) => void;
}) {
  const { assumptions, updateAssumptions } = useAppStore();

  const toggleInterest = (checked: boolean) => {
    setStressInterest(checked);
    if (checked) {
      updateAssumptions({ mortgageAPR: assumptions.mortgageAPR + 0.015 });
    } else {
      updateAssumptions({ mortgageAPR: Math.max(0.01, assumptions.mortgageAPR - 0.015) });
    }
  };

  const toggleCosts = (checked: boolean) => {
    setStressCosts(checked);
    const store = useAppStore.getState();
    const factor = checked ? 1.1 : 1 / 1.1;
    store.expenses.forEach(e => {
      store.updateExpense(e.id, { amountAnnual: Math.round(e.amountAnnual * factor) });
    });
  };

  return (
    <Card data-testid="card-stress-test">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> What If?
        </CardTitle>
        <CardDescription>Stress test your scenarios with different assumptions. Changes are applied live and reversible.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <Switch checked={stressInterest} onCheckedChange={toggleInterest} data-testid="switch-stress-interest" />
            <div>
              <Label className="text-sm">Interest rate +1.5%</Label>
              <p className="text-xs text-muted-foreground">Test higher mortgage costs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={stressCosts} onCheckedChange={toggleCosts} data-testid="switch-stress-costs" />
            <div>
              <Label className="text-sm">Living costs +10%</Label>
              <p className="text-xs text-muted-foreground">Test inflation impact</p>
            </div>
          </div>
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

function getRunway(projection?: ProjectionYear[] | null): { ok: boolean; hitYear?: number } {
  if (!projection || projection.length === 0) return { ok: true };
  const fiveYearSlice = projection.slice(0, 6);
  for (const p of fiveYearSlice) {
    if (p.capitalA <= 0 || p.capitalB <= 0) {
      return { ok: false, hitYear: p.year };
    }
  }
  return { ok: true };
}
