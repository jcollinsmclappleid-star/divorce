import { Layout } from "@/components/layout";
import { useEngine, ScenarioResult } from "@/hooks/use-engine";
import { useAppStore } from "@/hooks/use-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Wallet, Landmark, ArrowRight, AlertTriangle, CheckCircle, Scale } from "lucide-react";

const SCENARIO_COLORS: Record<string, string> = {
  S1: '#2563EB',
  S2: '#10B981',
  S3: '#8B5CF6',
  S4: '#F59E0B',
};

export default function Dashboard() {
  const engine = useEngine();
  const { assumptions } = useAppStore();
  const { netWorth, liquidity, budget, taxA, taxB, cmsWeekly, cmsAnnual, scenarios, projections } = engine;

  const hasData = netWorth.total !== 0 || scenarios.length > 0;

  const pieData = [
    { name: 'Party A', value: Math.abs(netWorth.partyA) },
    { name: 'Party B', value: Math.abs(netWorth.partyB) },
  ].filter(d => d.value > 0);

  const firstScenario = scenarios[0];
  const firstProjection = firstScenario ? projections[firstScenario.id] : [];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground" data-testid="text-dashboard-title">Financial Overview</h1>
          <p className="text-muted-foreground mt-1">Current snapshot and scenario-based projections.</p>
        </div>

        {!hasData && (
          <Card>
            <CardContent className="py-12 text-center">
              <Scale className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Data Entered Yet</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Add your assets, debts, incomes, and expenses using the navigation above, then enable scenarios to see how different settlement options compare.
              </p>
            </CardContent>
          </Card>
        )}

        {hasData && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Net Worth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-net-worth">{formatCurrency(netWorth.total)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Combined marital wealth</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Party A Net</CardTitle>
                  <Wallet className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600" data-testid="text-party-a-net">{formatCurrency(netWorth.partyA)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Liquid: {formatCurrency(liquidity.partyA)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Party B Net</CardTitle>
                  <Landmark className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600" data-testid="text-party-b-net">{formatCurrency(netWorth.partyB)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Liquid: {formatCurrency(liquidity.partyB)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs text-muted-foreground">A surplus</span>
                      <span className={`text-sm font-bold ${budget.surplusA >= 0 ? 'text-blue-600' : 'text-red-500'}`} data-testid="text-surplus-a">
                        {formatCurrency(budget.surplusA / 12)}/mo
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs text-muted-foreground">B surplus</span>
                      <span className={`text-sm font-bold ${budget.surplusB >= 0 ? 'text-emerald-600' : 'text-red-500'}`} data-testid="text-surplus-b">
                        {formatCurrency(budget.surplusB / 12)}/mo
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {assumptions.includeTaxModel && (taxA.gross > 0 || taxB.gross > 0) && (
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Party A Tax Summary (Annual)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Gross Income</span>
                      <span className="text-right font-medium">{formatCurrency(taxA.gross)}</span>
                      <span className="text-muted-foreground">Income Tax</span>
                      <span className="text-right font-medium text-red-500">-{formatCurrency(taxA.incomeTax)}</span>
                      <span className="text-muted-foreground">National Insurance</span>
                      <span className="text-right font-medium text-red-500">-{formatCurrency(taxA.nationalInsurance)}</span>
                      <Separator className="col-span-2 my-1" />
                      <span className="font-semibold">Net Income</span>
                      <span className="text-right font-bold text-blue-600">{formatCurrency(taxA.net)}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Party B Tax Summary (Annual)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Gross Income</span>
                      <span className="text-right font-medium">{formatCurrency(taxB.gross)}</span>
                      <span className="text-muted-foreground">Income Tax</span>
                      <span className="text-right font-medium text-red-500">-{formatCurrency(taxB.incomeTax)}</span>
                      <span className="text-muted-foreground">National Insurance</span>
                      <span className="text-right font-medium text-red-500">-{formatCurrency(taxB.nationalInsurance)}</span>
                      <Separator className="col-span-2 my-1" />
                      <span className="font-semibold">Net Income</span>
                      <span className="text-right font-bold text-emerald-600">{formatCurrency(taxB.net)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {assumptions.includeCMSEstimate && cmsWeekly > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Child Maintenance Estimate (CMS-style)</CardTitle>
                  <CardDescription>Illustrative only. Use GOV.UK calculator for official figures.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Weekly</span>
                      <span className="ml-2 font-bold text-lg">{formatCurrency(cmsWeekly)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Annual</span>
                      <span className="ml-2 font-bold text-lg">{formatCurrency(cmsAnnual)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pieData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Current Asset Split</CardTitle>
                    <CardDescription>Before any settlement scenario applied</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#2563EB" />
                          <Cell fill="#10B981" />
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {firstProjection && firstProjection.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{assumptions.projectionYears}-Year Capital Projection</CardTitle>
                    <CardDescription>
                      Based on {firstScenario?.name || 'first active scenario'} with {(assumptions.inflationRate * 100).toFixed(0)}% growth
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={firstProjection}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} fontSize={12} />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          fontSize={12}
                          tickFormatter={(v) => v >= 1000000 ? `£${(v / 1000000).toFixed(1)}m` : v >= 1000 ? `£${(v / 1000).toFixed(0)}k` : `£${v}`}
                        />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                        <Line type="monotone" dataKey="capitalA" name="Party A" stroke="#2563EB" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="capitalB" name="Party B" stroke="#10B981" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>

            {scenarios.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-bold mb-4">Scenario Comparison</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {scenarios.map((sc) => (
                    <ScenarioCard key={sc.id} scenario={sc} color={SCENARIO_COLORS[sc.id] || '#666'} />
                  ))}
                </div>
              </div>
            )}

            {scenarios.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Total Position by Scenario</CardTitle>
                  <CardDescription>Including liquid capital and pensions</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={scenarios.map(sc => ({
                        name: sc.id,
                        'Party A': sc.totalA,
                        'Party B': sc.totalB,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        fontSize={12}
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

            {scenarios.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No scenarios are enabled. Go to <strong>Scenarios</strong> to enable comparisons.</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

function ScenarioCard({ scenario, color }: { scenario: ScenarioResult; color: string }) {
  return (
    <Card data-testid={`card-scenario-${scenario.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <CardTitle className="text-base">{scenario.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground block text-xs">Party A Liquid</span>
            <span className="font-bold text-blue-600">{formatCurrency(scenario.liquidStartA)}</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-xs">Party B Liquid</span>
            <span className="font-bold text-emerald-600">{formatCurrency(scenario.liquidStartB)}</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-xs">A Pension</span>
            <span className="font-medium">{formatCurrency(scenario.pensionA)}</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-xs">B Pension</span>
            <span className="font-medium">{formatCurrency(scenario.pensionB)}</span>
          </div>
          <Separator className="col-span-2" />
          <div>
            <span className="text-muted-foreground block text-xs">A Total Position</span>
            <span className="font-bold text-lg text-blue-600">{formatCurrency(scenario.totalA)}</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-xs">B Total Position</span>
            <span className="font-bold text-lg text-emerald-600">{formatCurrency(scenario.totalB)}</span>
          </div>
        </div>

        {scenario.buyoutAmount != null && (
          <div className="mt-3 p-3 bg-muted/50 rounded-md text-sm space-y-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-muted-foreground">Buyout Required</span>
              <span className="font-semibold">{formatCurrency(scenario.buyoutAmount)}</span>
            </div>
            {scenario.fundingGap != null && scenario.fundingGap > 0 && (
              <div className="flex items-center justify-between gap-1">
                <span className="text-muted-foreground">Funding Gap</span>
                <span className="font-semibold text-amber-600">{formatCurrency(scenario.fundingGap)}</span>
              </div>
            )}
            {scenario.affordable != null && (
              <div className="flex items-center gap-2 mt-1">
                {scenario.affordable ? (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                    <CheckCircle className="w-3 h-3 mr-1" /> Affordable
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                    <AlertTriangle className="w-3 h-3 mr-1" /> May not be affordable
                  </Badge>
                )}
              </div>
            )}
          </div>
        )}

        {scenario.projectedHomeValue != null && (
          <div className="mt-3 p-3 bg-muted/50 rounded-md text-sm space-y-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-muted-foreground">Home Value in {scenario.deferYears}yrs</span>
              <span className="font-semibold">{formatCurrency(scenario.projectedHomeValue)}</span>
            </div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-muted-foreground">Net Sale Equity</span>
              <span className="font-semibold">{formatCurrency(scenario.deferredEquity ?? 0)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
