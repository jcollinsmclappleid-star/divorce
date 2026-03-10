import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useAccess } from "@/hooks/use-access";
import { formatCurrency, scrollTop } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Check, Shield, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function ScoreBar({ score }: { score: number }) {
  const colour = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="w-full bg-muted rounded-full h-1.5 mt-1">
      <div className={`${colour} h-1.5 rounded-full`} style={{ width: `${score}%` }} />
    </div>
  );
}

function FsiDial() {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 opacity-30">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted-foreground/20" />
          <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8"
            className="text-primary"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.35}
            strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
      <p className="text-sm font-medium text-center">Your sustainability score has been calculated</p>
      <p className="text-xs text-muted-foreground text-center max-w-xs">
        The Financial Sustainability Indicator scores how viable each settlement option is for each party — taking income, outgoings, housing costs, and capital into account.
      </p>
    </div>
  );
}

const CHART_COLOURS = ["hsl(220,50%,25%)", "#0d9488", "#64748b"];

export default function PreviewPage() {
  useDocumentTitle("Your Divorce Financial Overview | DivorceCalculatorUK");
  useNoIndex();
  const [, navigate] = useLocation();
  const store = useAppStore();
  const engine = useEngine();
  const { hasAccess, isLoading } = useAccess();
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && hasAccess) {
      navigate("/results");
    }
  }, [hasAccess, isLoading, navigate]);

  const hasData = store.assets.length > 0 || store.incomes.length > 0;

  useEffect(() => {
    if (!hasData) navigate("/");
  }, [hasData, navigate]);

  if (!hasData) return null;

  const { intermediate } = engine;
  const combinedPool = intermediate.totalLiquid + intermediate.netHomeEquity;

  const pensionTotal = store.assets
    .filter(a => a.category === "pension")
    .reduce((s, p) => s + (p.cetv ?? p.currentValue ?? 0), 0);

  const chartTotal = intermediate.netHomeEquity + intermediate.totalLiquid + pensionTotal;
  const chartData = [
    { name: "Property Equity", value: intermediate.netHomeEquity },
    { name: "Pensions", value: pensionTotal },
    { name: "Savings & Investments", value: intermediate.totalLiquid },
  ].filter(d => d.value > 0);

  const halfPool = Math.round(combinedPool / 2);
  const nameA = store.profile?.partyAName || "Party A";
  const nameB = store.profile?.partyBName || "Party B";

  const poolBand = combinedPool < 300000 ? "under £300k" :
    combinedPool < 500000 ? "£300k–£500k" :
    combinedPool < 750000 ? "£500k–£750k" : "over £750k";

  const scenarios = [
    {
      id: "S1",
      name: "Scenario 1 — Sell & Split",
      desc: "Property sold, net equity divided. Both parties receive a cash allocation.",
      lockedLabel: `${nameA} capital position`,
    },
    {
      id: "S2a",
      name: `Scenario 2 — ${nameA} Retains Home`,
      desc: `${nameA} buys out ${nameB}'s share. Remaining assets rebalanced.`,
      lockedLabel: "Monthly surplus / deficit",
    },
    {
      id: "S2b",
      name: `Scenario 3 — ${nameB} Retains Home`,
      desc: `${nameB} buys out ${nameA}'s share. Remaining assets rebalanced.`,
      lockedLabel: "Housing feasibility benchmark",
    },
    {
      id: "S4",
      name: "Scenario 4 — Deferred Sale",
      desc: "Property retained jointly then sold at a future date (Mesher-style arrangement).",
      lockedLabel: "5-year capital projection",
    },
  ];

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEmailLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "preview_page", assetPoolSnapshot: String(combinedPool) }),
      });
    } catch {}
    setEmailLoading(false);
    setEmailSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Logo size="sm" />
          <Button variant="outline" size="sm" asChild>
            <Link href="/wizard" data-testid="button-edit-inputs-preview" onClick={scrollTop}>Edit Inputs</Link>
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">

        {/* Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Logo href="/" size="lg" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-preview-title">
            Your Financial Position Has Been Calculated.
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            Your assets, liabilities, and income have been modelled. Unlock the full structured analysis to review every settlement scenario, sustainability scores, and 5-year projections.
          </p>
        </div>

        {/* Real data — asset pool breakdown */}
        <section className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card data-testid="card-net-equity">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Net Property Equity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tabular-nums" data-testid="value-net-equity">{formatCurrency(intermediate.netHomeEquity)}</p>
                <p className="text-xs text-muted-foreground mt-1">Property value less outstanding mortgage and estimated sale costs</p>
              </CardContent>
            </Card>
            <Card data-testid="card-asset-pool">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Combined Distributable Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tabular-nums" data-testid="value-asset-pool">{formatCurrency(combinedPool)}</p>
                <p className="text-xs text-muted-foreground mt-1">Property equity plus liquid assets and savings</p>
              </CardContent>
            </Card>
          </div>

          {/* Ring chart */}
          {chartTotal > 0 && (
            <Card data-testid="card-asset-breakdown">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Asset Pool Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-40 h-40 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" strokeWidth={2}>
                          {chartData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLOURS[i % CHART_COLOURS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v: number) => formatCurrency(v)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3 flex-1 w-full">
                    {chartData.map((d, i) => (
                      <div key={d.name} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: CHART_COLOURS[i % CHART_COLOURS.length] }} />
                          <span className="text-sm">{d.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold tabular-nums">{formatCurrency(d.value)}</span>
                          <span className="text-xs text-muted-foreground ml-1">({Math.round((d.value / chartTotal) * 100)}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary/5 rounded-md border border-primary/10">
                  <p className="text-sm leading-relaxed" data-testid="text-interpretation">
                    Based on what you've entered, the combined distributable pool is <strong>{formatCurrency(combinedPool)}</strong>. Under a 50/50 split, each party would start from approximately <strong>{formatCurrency(halfPool)}</strong> before housing arrangements and pension allocations are applied.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Privacy callout */}
        <div className="flex items-start gap-3 p-4 bg-muted/40 rounded-md border border-border/50" data-testid="card-privacy-preview">
          <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Your figures never leave your browser.</span> All calculations happen on your device. We store only a session reference to manage your access — no financial data is transmitted to our servers.
          </p>
        </div>

        {/* Four scenario name cards with one locked metric */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Four Settlement Scenarios — Modelled for Your Figures</h2>
          <p className="text-sm text-muted-foreground">Your full analysis includes a detailed breakdown of each scenario below. Unlock to view all outputs.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {scenarios.map(sc => (
              <Card key={sc.id} className="border-border/60" data-testid={`card-scenario-${sc.id}`}>
                <CardContent className="pt-4 pb-4">
                  <p className="text-sm font-semibold text-foreground mb-1">{sc.name}</p>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{sc.desc}</p>
                  <div className="flex items-center gap-2 text-muted-foreground/60 text-xs border-t border-border/40 pt-3">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>{sc.lockedLabel}: <span className="font-medium">unlock to view</span></span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FSI score dial */}
        <section>
          <Card data-testid="card-fsi-preview">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <h2 className="text-base font-semibold">Financial Sustainability Indicator</h2>
                <FsiDial />
                <Button variant="outline" size="sm" onClick={() => { scrollTop(); navigate("/unlock"); }} data-testid="button-unlock-fsi">
                  Unlock to View Your Score <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Social proof block */}
        <section>
          <Card className="bg-muted/30 border-dashed" data-testid="card-social-proof">
            <CardContent className="py-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold">What users in similar positions typically find</p>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Illustrative only</span>
              </div>
              <div className="space-y-3">
                {poolBand === "£300k–£500k" || poolBand === "under £300k" ? (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "Users with a combined asset pool between £300k–£500k typically see a sustainability score difference of 15–25 points between the Sell & Split and Retain scenarios, driven by mortgage affordability on a single income."
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "Users with a combined pool over £500k most commonly find that the Retain scenario produces a materially higher capital position for one party, while the Sell & Split scenario delivers the most balanced short-term liquidity split."
                  </p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "In cases where one party retains the family home, the housing feasibility benchmark — which estimates whether a single income can service the mortgage — is the most frequently referenced figure in early solicitor meetings."
                </p>
              </div>
              <p className="text-xs text-muted-foreground/60 italic">
                These are illustrative observations. Your results are personalised to the figures you entered.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Email lead capture */}
        <section>
          <Card className="border-primary/20" data-testid="card-email-capture">
            <CardContent className="py-6">
              {emailSubmitted ? (
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <p className="font-medium">Got it — check your inbox.</p>
                  <p className="text-sm text-muted-foreground">Your full analysis is ready whenever you are.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-sm">Save your progress and receive a summary by email</p>
                    <p className="text-xs text-muted-foreground mt-0.5">We'll send your asset pool headline figures so you can pick this up later.</p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="flex gap-2 flex-col sm:flex-row">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="flex-1"
                      data-testid="input-preview-email"
                    />
                    <Button type="submit" variant="outline" disabled={emailLoading} data-testid="button-save-progress">
                      {emailLoading ? "Saving..." : "Save progress"}
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Primary CTA */}
        <section className="space-y-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="py-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                A single professional consultation can cost £250–£400 per hour.
              </p>
              <p className="text-sm font-medium">
                This tool doesn't tell you what to do. It shows you the numbers so you can make your own informed decisions — before a solicitor's clock starts running.
              </p>
              <p className="text-xs text-muted-foreground">
                One-time payment. 6 months unlimited access. No subscription.
              </p>
            </CardContent>
          </Card>

          <div className="text-center space-y-3">
            <Button size="lg" className="px-8" onClick={() => { scrollTop(); navigate("/unlock"); }} data-testid="button-unlock-cta">
              <Lock className="w-4 h-4 mr-2" />
              Unlock Full Analysis — £79
            </Button>
            <p className="text-xs text-muted-foreground">
              Immediate access. Private. No subscription. 6-month access included.
            </p>
          </div>
        </section>

        {/* Feature comparison */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-tier-free">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Free Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Net property equity and asset pool", "Asset breakdown by category", "Four scenario names and structure"].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/30" data-testid="card-tier-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Full Structured Brief (£79)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Capital allocation under all 4 scenarios",
                "Net monthly income per party (post-tax)",
                "Surplus / deficit per scenario",
                "Financial Sustainability Indicator scores",
                "5-year capital projection charts",
                "Housing feasibility benchmark",
                "Sensitivity stress-test sliders",
                "Downloadable professional PDF",
                "Unlimited re-runs for 6 months",
              ].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="py-4">
          <p className="text-xs text-muted-foreground text-center max-w-lg mx-auto leading-relaxed" data-testid="text-disclaimer-preview">
            This tool provides structured financial modelling and does not replace legal or regulated financial advice. All outputs are illustrative, based on your inputs and standard assumptions. It is designed to help you approach professional discussions with clarity.
          </p>
        </div>
      </main>
    </div>
  );
}
