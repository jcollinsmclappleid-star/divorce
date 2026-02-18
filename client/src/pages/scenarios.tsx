import { Layout } from "@/components/layout";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { AlertCircle, CheckCircle, AlertTriangle, Settings2, Users, TrendingUp } from "lucide-react";

const SCENARIO_COLORS: Record<string, string> = {
  S1: '#2563EB',
  S2: '#10B981',
  S3: '#8B5CF6',
  S4: '#F59E0B',
};

const scenarioList = [
  {
    id: "S1_Sell_Split" as const,
    code: "S1",
    title: "Clean Break (Sell & Split)",
    description: "Sell all major assets including the family home and split the total proceeds.",
  },
  {
    id: "S2_A_Keeps_Home" as const,
    code: "S2",
    title: "Party A Retains Home",
    description: "Party A keeps the primary residence and buys out Party B's share. B receives liquid assets or cash.",
  },
  {
    id: "S3_B_Keeps_Home" as const,
    code: "S3",
    title: "Party B Retains Home",
    description: "Party B keeps the primary residence and buys out Party A's share. A receives liquid assets or cash.",
  },
  {
    id: "S4_Joint_Then_Sell" as const,
    code: "S4",
    title: "Mesher Order (Deferred Sale)",
    description: "Property remains in joint names until a trigger event (e.g. youngest child turns 18), then sold and split.",
  }
];

export default function ScenariosPage() {
  const { scenarios, toggleScenario, assumptions, updateAssumptions, children, updateChildren } = useAppStore();
  const engine = useEngine();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold" data-testid="text-scenarios-title">Scenario Planning</h1>
          <p className="text-muted-foreground mt-1">Compare different financial settlement outcomes.</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Settings2 className="h-4 w-4" /> Assumptions & Settings
            </CardTitle>
            <CardDescription>These settings affect all scenario calculations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-sm">Asset Split Ratio (A : B)</Label>
                <Slider
                  value={[assumptions.splitRatio * 100]}
                  onValueChange={([v]) => updateAssumptions({ splitRatio: v / 100 })}
                  min={0}
                  max={100}
                  step={5}
                  data-testid="slider-split-ratio"
                />
                <p className="text-xs text-muted-foreground text-center">{Math.round(assumptions.splitRatio * 100)}% / {Math.round((1 - assumptions.splitRatio) * 100)}%</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Property Split to A</Label>
                <Slider
                  value={[assumptions.splitPropertyToA * 100]}
                  onValueChange={([v]) => updateAssumptions({ splitPropertyToA: v / 100 })}
                  min={0}
                  max={100}
                  step={5}
                  data-testid="slider-property-split"
                />
                <p className="text-xs text-muted-foreground text-center">{Math.round(assumptions.splitPropertyToA * 100)}% / {Math.round((1 - assumptions.splitPropertyToA) * 100)}%</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Pension Split to A</Label>
                <Slider
                  value={[assumptions.splitPensionToA * 100]}
                  onValueChange={([v]) => updateAssumptions({ splitPensionToA: v / 100 })}
                  min={0}
                  max={100}
                  step={5}
                  data-testid="slider-pension-split"
                />
                <p className="text-xs text-muted-foreground text-center">{Math.round(assumptions.splitPensionToA * 100)}% / {Math.round((1 - assumptions.splitPensionToA) * 100)}%</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Projection Years</Label>
                <Input
                  type="number"
                  min={1}
                  max={30}
                  value={assumptions.projectionYears}
                  onChange={(e) => updateAssumptions({ projectionYears: parseInt(e.target.value) || 10 })}
                  data-testid="input-projection-years"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Inflation / Growth Rate (%)</Label>
                <Input
                  type="number"
                  step={0.5}
                  min={-5}
                  max={20}
                  value={(assumptions.inflationRate * 100).toFixed(1)}
                  onChange={(e) => updateAssumptions({ inflationRate: parseFloat(e.target.value) / 100 || 0.02 })}
                  data-testid="input-inflation-rate"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={assumptions.includeTaxModel}
                    onCheckedChange={(v) => updateAssumptions({ includeTaxModel: v })}
                    data-testid="switch-tax-model"
                  />
                  <Label className="text-sm">UK Tax / NI Model</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={assumptions.includeCMSEstimate}
                    onCheckedChange={(v) => updateAssumptions({ includeCMSEstimate: v })}
                    data-testid="switch-cms"
                  />
                  <Label className="text-sm">CMS Maintenance Est.</Label>
                </div>
              </div>
            </div>

            {assumptions.includeCMSEstimate && (
              <>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4" /> Children Details
                  </Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Number of Children</Label>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        value={children.numChildren}
                        onChange={(e) => updateChildren({ numChildren: parseInt(e.target.value) || 0 })}
                        data-testid="input-num-children"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Nights/year with A</Label>
                      <Input
                        type="number"
                        min={0}
                        max={365}
                        value={children.nightsWithA}
                        onChange={(e) => {
                          const n = parseInt(e.target.value) || 0;
                          updateChildren({ nightsWithA: n, nightsWithB: Math.max(0, 365 - n) });
                        }}
                        data-testid="input-nights-a"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Nights/year with B</Label>
                      <Input
                        type="number"
                        min={0}
                        max={365}
                        value={children.nightsWithB}
                        disabled
                        data-testid="input-nights-b"
                      />
                    </div>
                  </div>
                  {engine.cmsWeekly > 0 && (
                    <p className="text-sm mt-2">
                      Estimated CMS: <strong>{formatCurrency(engine.cmsWeekly)}/week</strong> ({formatCurrency(engine.cmsAnnual)}/year)
                    </p>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {scenarioList.map((s) => {
            const isEnabled = scenarios[s.id]?.enabled;
            const result = engine.scenarios.find(r => r.id === s.code);
            const projection = result ? engine.projections[result.id] : null;

            return (
              <Card
                key={s.id}
                className={`transition-all ${isEnabled ? 'ring-2 ring-primary/50' : 'opacity-75'}`}
                data-testid={`card-scenario-toggle-${s.code}`}
              >
                <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                  <div className="space-y-1 min-w-0 flex-1">
                    <CardTitle className="text-lg flex items-center gap-2 flex-wrap">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: SCENARIO_COLORS[s.code] }} />
                      {s.title}
                      {isEnabled && <Badge variant="default" className="ml-1">Active</Badge>}
                    </CardTitle>
                    <CardDescription>{s.description}</CardDescription>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => toggleScenario(s.id, checked)}
                    data-testid={`switch-scenario-${s.code}`}
                  />
                </CardHeader>

                {isEnabled && result && (
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Financial Outcome</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-muted-foreground">A Liquid Capital</span>
                          <span className="text-right font-semibold text-blue-600">{formatCurrency(result.liquidStartA)}</span>
                          <span className="text-muted-foreground">B Liquid Capital</span>
                          <span className="text-right font-semibold text-emerald-600">{formatCurrency(result.liquidStartB)}</span>
                          <span className="text-muted-foreground">A Pension</span>
                          <span className="text-right font-medium">{formatCurrency(result.pensionA)}</span>
                          <span className="text-muted-foreground">B Pension</span>
                          <span className="text-right font-medium">{formatCurrency(result.pensionB)}</span>
                          <Separator className="col-span-2 my-1" />
                          <span className="font-semibold">A Total</span>
                          <span className="text-right font-bold text-blue-600">{formatCurrency(result.totalA)}</span>
                          <span className="font-semibold">B Total</span>
                          <span className="text-right font-bold text-emerald-600">{formatCurrency(result.totalB)}</span>
                        </div>

                        {result.buyoutAmount != null && (
                          <div className="p-3 bg-muted/50 rounded-md text-sm space-y-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-muted-foreground">Buyout Required</span>
                              <span className="font-semibold">{formatCurrency(result.buyoutAmount)}</span>
                            </div>
                            {result.fundingGap != null && result.fundingGap > 0 && (
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-muted-foreground">Funding Gap</span>
                                <span className="font-semibold text-amber-600">{formatCurrency(result.fundingGap)}</span>
                              </div>
                            )}
                            {result.mortgageCapacity != null && (
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-muted-foreground">Mortgage Capacity</span>
                                <span className="font-semibold">{formatCurrency(result.mortgageCapacity)}</span>
                              </div>
                            )}
                            {result.affordable != null && (
                              <div className="mt-1">
                                {result.affordable ? (
                                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                                    <CheckCircle className="w-3 h-3 mr-1" /> Mortgage Affordable
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                                    <AlertTriangle className="w-3 h-3 mr-1" /> May Not Be Affordable
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {result.projectedHomeValue != null && (
                          <div className="p-3 bg-muted/50 rounded-md text-sm space-y-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-muted-foreground">Home Value in {result.deferYears} years</span>
                              <span className="font-semibold">{formatCurrency(result.projectedHomeValue)}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-muted-foreground">Net Sale Equity</span>
                              <span className="font-semibold">{formatCurrency(result.deferredEquity ?? 0)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {projection && projection.length > 1 && (
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> {assumptions.projectionYears}-Year Projection
                          </h4>
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={projection}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} fontSize={11} />
                                <YAxis
                                  axisLine={false}
                                  tickLine={false}
                                  fontSize={11}
                                  tickFormatter={(v) => v >= 1000000 ? `£${(v / 1000000).toFixed(1)}m` : `£${(v / 1000).toFixed(0)}k`}
                                />
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <Line type="monotone" dataKey="capitalA" name="Party A" stroke="#2563EB" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="capitalB" name="Party B" stroke="#10B981" strokeWidth={2} dot={false} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}

                {!isEnabled && (
                  <CardContent className="pt-0">
                    <div className="text-sm text-muted-foreground flex items-center gap-2 opacity-60">
                      <AlertCircle className="w-4 h-4" /> Enable this scenario to see financial projections.
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
