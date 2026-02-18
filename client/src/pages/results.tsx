import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine, ScenarioResult, ProjectionYear } from "@/hooks/use-engine";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import {
  Calculator, ChevronLeft, Check, X, AlertTriangle,
  TrendingUp, Edit
} from "lucide-react";

const SCENARIO_META: Record<string, { label: string; shortLabel: string; color: string }> = {
  S1: { label: "Sell & Split", shortLabel: "Sell & Split", color: "#2563EB" },
  S2: { label: "A Keeps Home", shortLabel: "A Keeps", color: "#10B981" },
  S3: { label: "B Keeps Home", shortLabel: "B Keeps", color: "#8B5CF6" },
  S4: { label: "Deferred Sale", shortLabel: "Deferred", color: "#F59E0B" },
};

export default function ResultsPage() {
  const { assumptions, updateAssumptions } = useAppStore();
  const engine = useEngine();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const allScenarios = computeAllScenarios(engine);
  const displayScenarios = allScenarios.filter(s => s.id !== "S4");

  const activeScenario = activeTab
    ? allScenarios.find(s => s.id === activeTab)
    : null;
  const activeProjection = activeTab ? engine.projections[activeTab] : null;

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
                min={30}
                max={70}
                step={5}
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
                min={0}
                max={100}
                step={5}
                data-testid="slider-pension-split"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>{Math.round(assumptions.splitPensionToA * 100)}%</span>
                <span>{Math.round((1 - assumptions.splitPensionToA) * 100)}%</span>
              </div>
            </div>

            <div className="flex gap-1.5">
              <Button
                variant={assumptions.splitRatio === 0.5 ? "default" : "outline"}
                size="sm"
                onClick={() => setPreset(0.5, 0.5)}
                data-testid="button-preset-equal"
              >
                50/50
              </Button>
              <Button
                variant={assumptions.splitRatio === 0.6 ? "default" : "outline"}
                size="sm"
                onClick={() => setPreset(0.6, 0.6)}
                data-testid="button-preset-needs"
              >
                60/40
              </Button>
              <Button
                variant={assumptions.splitRatio === 0.7 ? "default" : "outline"}
                size="sm"
                onClick={() => setPreset(0.7, 0.7)}
                data-testid="button-preset-strong"
              >
                70/30
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-results-title">
              Settlement Comparison
            </h1>
            <p className="text-muted-foreground mt-1">
              How different settlement options compare based on your inputs.
              Adjust the sliders above to see how different splits affect the outcomes.
            </p>
          </div>

          {displayScenarios.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]"></TableHead>
                    {displayScenarios.map(s => (
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
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums font-semibold text-blue-600">
                        {formatCurrency(s.liquidStartA)}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Party B liquid cash</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums font-semibold text-emerald-600">
                        {formatCurrency(s.liquidStartB)}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Home equity retained (A)</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums">
                        {(s.homeEquityA ?? 0) > 0
                          ? <span className="text-blue-600">{formatCurrency(s.homeEquityA!)}</span>
                          : <span className="text-muted-foreground">--</span>}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Home equity retained (B)</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums">
                        {(s.homeEquityB ?? 0) > 0
                          ? <span className="text-emerald-600">{formatCurrency(s.homeEquityB!)}</span>
                          : <span className="text-muted-foreground">--</span>}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Monthly mortgage cost</TableCell>
                    {displayScenarios.map(s => {
                      const mtg = (s.mortgageMonthlyA ?? 0) + (s.mortgageMonthlyB ?? 0);
                      return (
                        <TableCell key={s.id} className="text-center tabular-nums">
                          {mtg > 0
                            ? <span className="text-amber-600">{formatCurrency(mtg)}/mo</span>
                            : <span className="text-muted-foreground">None</span>}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Buyout payment</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums">
                        {s.buyoutAmount != null ? formatCurrency(s.buyoutAmount) : <span className="text-muted-foreground">N/A</span>}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Funding gap</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums">
                        {s.fundingGap != null && s.fundingGap > 0
                          ? <span className="text-amber-600 font-semibold">{formatCurrency(s.fundingGap)}</span>
                          : s.fundingGap != null
                          ? <span className="text-emerald-600">None</span>
                          : <span className="text-muted-foreground">N/A</span>}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Mortgage affordable</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center">
                        {s.affordable != null
                          ? s.affordable
                            ? <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50"><Check className="w-3 h-3 mr-1" /> Yes</Badge>
                            : <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50"><X className="w-3 h-3 mr-1" /> No</Badge>
                          : <span className="text-muted-foreground text-sm">N/A</span>}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">5-year runway</TableCell>
                    {displayScenarios.map(s => {
                      const projection = engine.projections[s.id];
                      const runway = getRunway(projection);
                      return (
                        <TableCell key={s.id} className="text-center">
                          {runway.ok
                            ? <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50"><Check className="w-3 h-3 mr-1" /> OK</Badge>
                            : <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50"><AlertTriangle className="w-3 h-3 mr-1" /> Year {runway.hitYear}</Badge>}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Pension after split (A)</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums">{formatCurrency(s.pensionA)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Pension after split (B)</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums">{formatCurrency(s.pensionB)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold">
                    <TableCell className="text-foreground">Net worth snapshot (A)</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums text-blue-600 text-base">{formatCurrency(s.totalA)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold">
                    <TableCell className="text-foreground">Net worth snapshot (B)</TableCell>
                    {displayScenarios.map(s => (
                      <TableCell key={s.id} className="text-center tabular-nums text-emerald-600 text-base">{formatCurrency(s.totalB)}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No scenario data to display. Please go back and enter your financial details.
                </p>
                <Link href="/">
                  <Button className="mt-4" data-testid="button-go-back">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Go Back to Wizard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {displayScenarios.length > 0 && (
            <>
              <div>
                <h2 className="text-xl font-display font-bold mb-3">Scenario Details</h2>
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
                  <Card data-testid={`card-detail-${activeScenario.id}`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SCENARIO_META[activeScenario.id]?.color }} />
                        {SCENARIO_META[activeScenario.id]?.label ?? activeScenario.name}
                      </CardTitle>
                      <CardDescription>Detailed breakdown and projections</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                          <h3 className="text-sm font-semibold">Financial Outcome</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-muted-foreground">A Liquid Cash</span>
                            <span className="text-right font-semibold text-blue-600">{formatCurrency(activeScenario.liquidStartA)}</span>
                            <span className="text-muted-foreground">B Liquid Cash</span>
                            <span className="text-right font-semibold text-emerald-600">{formatCurrency(activeScenario.liquidStartB)}</span>
                            {(activeScenario.homeEquityA ?? 0) > 0 && (
                              <>
                                <span className="text-muted-foreground">A Home Equity (illiquid)</span>
                                <span className="text-right font-medium text-blue-600">{formatCurrency(activeScenario.homeEquityA!)}</span>
                              </>
                            )}
                            {(activeScenario.homeEquityB ?? 0) > 0 && (
                              <>
                                <span className="text-muted-foreground">B Home Equity (illiquid)</span>
                                <span className="text-right font-medium text-emerald-600">{formatCurrency(activeScenario.homeEquityB!)}</span>
                              </>
                            )}
                            <span className="text-muted-foreground">A Pension</span>
                            <span className="text-right font-medium">{formatCurrency(activeScenario.pensionA)}</span>
                            <span className="text-muted-foreground">B Pension</span>
                            <span className="text-right font-medium">{formatCurrency(activeScenario.pensionB)}</span>
                            {((activeScenario.mortgageMonthlyA ?? 0) > 0 || (activeScenario.mortgageMonthlyB ?? 0) > 0) && (
                              <>
                                <Separator className="col-span-2 my-1" />
                                {(activeScenario.mortgageMonthlyA ?? 0) > 0 && (
                                  <>
                                    <span className="text-muted-foreground">A Mortgage Payment</span>
                                    <span className="text-right font-medium text-amber-600">{formatCurrency(activeScenario.mortgageMonthlyA!)}/mo</span>
                                  </>
                                )}
                                {(activeScenario.mortgageMonthlyB ?? 0) > 0 && (
                                  <>
                                    <span className="text-muted-foreground">B Mortgage Payment</span>
                                    <span className="text-right font-medium text-amber-600">{formatCurrency(activeScenario.mortgageMonthlyB!)}/mo</span>
                                  </>
                                )}
                              </>
                            )}
                            <Separator className="col-span-2 my-1" />
                            <span className="font-semibold">A Total Position</span>
                            <span className="text-right font-bold text-blue-600 text-lg">{formatCurrency(activeScenario.totalA)}</span>
                            <span className="font-semibold">B Total Position</span>
                            <span className="text-right font-bold text-emerald-600 text-lg">{formatCurrency(activeScenario.totalB)}</span>
                          </div>

                          {activeScenario.buyoutAmount != null && (
                            <div className="p-3 bg-muted/50 rounded-md text-sm space-y-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-muted-foreground">Buyout Required</span>
                                <span className="font-semibold">{formatCurrency(activeScenario.buyoutAmount)}</span>
                              </div>
                              {activeScenario.fundingGap != null && activeScenario.fundingGap > 0 && (
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-muted-foreground">Funding Gap</span>
                                  <span className="font-semibold text-amber-600">{formatCurrency(activeScenario.fundingGap)}</span>
                                </div>
                              )}
                            </div>
                          )}

                          <StabilityIndicators scenario={activeScenario} projection={activeProjection} />
                        </div>

                        {activeProjection && activeProjection.length > 1 && (
                          <div>
                            <h3 className="text-sm font-semibold mb-1 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" /> Liquid Cash Projection
                            </h3>
                            <p className="text-xs text-muted-foreground mb-2">
                              Cash position over time, after mortgage payments and living costs.
                              {((activeScenario.homeEquityA ?? 0) > 0 || (activeScenario.homeEquityB ?? 0) > 0) && " Home equity is not included (illiquid)."}
                            </p>
                            <div className="h-[260px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={activeProjection}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                  <XAxis dataKey="year" axisLine={false} tickLine={false} fontSize={11} />
                                  <YAxis
                                    axisLine={false} tickLine={false} fontSize={11}
                                    tickFormatter={(v) => v >= 1000000 ? `£${(v / 1000000).toFixed(1)}m` : `£${(v / 1000).toFixed(0)}k`}
                                  />
                                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                  <Legend />
                                  <Line type="monotone" dataKey="capitalA" name="Party A" stroke="#2563EB" strokeWidth={2} dot={false} />
                                  <Line type="monotone" dataKey="capitalB" name="Party B" stroke="#10B981" strokeWidth={2} dot={false} />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {allScenarios.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Total Position by Scenario</CardTitle>
                    <CardDescription>Net worth including liquid capital and pensions</CardDescription>
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
                        <YAxis
                          axisLine={false} tickLine={false} fontSize={12}
                          tickFormatter={(v) => v >= 1000000 ? `£${(v / 1000000).toFixed(1)}m` : `£${(v / 1000).toFixed(0)}k`}
                        />
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
          )}
        </div>
      </main>

      <footer className="border-t py-6 mt-auto bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-xs">
          <p>Illustrative modelling only. Not legal, tax or financial advice.</p>
          <p className="mt-1">Data is stored locally in your browser unless explicitly saved.</p>
        </div>
      </footer>
    </div>
  );
}

function StabilityIndicators({ scenario, projection }: { scenario: ScenarioResult; projection?: ProjectionYear[] | null }) {
  const runway = getRunway(projection);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Stability Check</h3>
      <div className="flex flex-wrap gap-2">
        {scenario.affordable != null && (
          scenario.affordable ? (
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
              <Check className="w-3 h-3 mr-1" /> Affordability passed
            </Badge>
          ) : (
            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
              <X className="w-3 h-3 mr-1" /> Affordability failed
            </Badge>
          )
        )}

        {scenario.fundingGap != null && (
          scenario.fundingGap <= 0 ? (
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
              <Check className="w-3 h-3 mr-1" /> No funding gap
            </Badge>
          ) : (
            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
              <AlertTriangle className="w-3 h-3 mr-1" /> Gap: {formatCurrency(scenario.fundingGap)}
            </Badge>
          )
        )}

        {runway.ok ? (
          <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
            <Check className="w-3 h-3 mr-1" /> Runway OK
          </Badge>
        ) : (
          <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
            <AlertTriangle className="w-3 h-3 mr-1" /> Hits £0 in year {runway.hitYear}
          </Badge>
        )}
      </div>
    </div>
  );
}

function computeAllScenarios(engine: ReturnType<typeof useEngine>): ScenarioResult[] {
  const store = useAppStore.getState();
  const allEnabled: ScenarioResult[] = [];

  const s1 = engine.scenarios.find(s => s.id === "S1");
  const s2 = engine.scenarios.find(s => s.id === "S2");
  const s3 = engine.scenarios.find(s => s.id === "S3");
  const s4 = engine.scenarios.find(s => s.id === "S4");

  if (!s1 && !s2 && !s3) {
    return engine.scenarios;
  }

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
