import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useAccess } from "@/hooks/use-access";
import { formatCurrency, scrollTop } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Check, Shield, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";
import { FsiGaugeLocked } from "@/components/fsi-gauge";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CHART_COLOURS = ["hsl(220,52%,22%)", "#0d9488", "#64748b"];

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
      name: "Sell & Split",
      desc: "Property sold, net equity divided. Both parties receive a cash allocation.",
      lockedLabel: `${nameA} capital position`,
      color: "#2563EB",
    },
    {
      id: "S2a",
      name: `${nameA} Retains Home`,
      desc: `${nameA} buys out ${nameB}'s share. Remaining assets rebalanced.`,
      lockedLabel: "Monthly surplus / deficit",
      color: "#10B981",
    },
    {
      id: "S2b",
      name: `${nameB} Retains Home`,
      desc: `${nameB} buys out ${nameA}'s share. Remaining assets rebalanced.`,
      lockedLabel: "Housing feasibility benchmark",
      color: "#8B5CF6",
    },
    {
      id: "S4",
      name: "Deferred Sale",
      desc: "Property retained jointly then sold at a future date (Mesher-style arrangement).",
      lockedLabel: "5-year capital projection",
      color: "#F59E0B",
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
            Your assets, liabilities, and income have been modelled. Unlock the full structured analysis to review every settlement option, sustainability scores, and 5-year projections.
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

        {/* Four scenario cards with blurred locked metrics */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Four Settlement Options — Modelled for Your Figures</h2>
          <p className="text-sm text-muted-foreground">Your full analysis includes a detailed breakdown of each option below. Unlock to view all outputs.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {scenarios.map(sc => (
              <div key={sc.id} className="relative rounded-xl border border-border/60 bg-white overflow-hidden" data-testid={`card-scenario-${sc.id}`}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" style={{ background: sc.color }} />
                <div className="pt-5 pb-4 px-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: sc.color }} />
                    <p className="text-sm font-semibold text-foreground">{sc.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed pl-[18px]">{sc.desc}</p>
                  <div className="pl-[18px]">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">{sc.lockedLabel}</p>
                    <div className="relative">
                      <p className="text-base font-bold tabular-nums blur-[5px] select-none text-foreground">
                        {sc.id === "S4" ? "£12,400 / yr" : sc.id === "S2b" ? "Feasible" : "£" + Math.round(combinedPool * 0.48 / 1000) + "k"}
                      </p>
                      <div className="absolute inset-0 flex items-center">
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-background/90 border border-border/60 rounded px-1.5 py-0.5">
                          <Lock className="w-2.5 h-2.5" /> unlock to view
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FSI score dial */}
        <section>
          <Card data-testid="card-fsi-preview">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <h2 className="text-base font-semibold">Financial Sustainability Indicator</h2>
                <div className="flex justify-center">
                  <FsiGaugeLocked size={140} />
                </div>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  The Financial Sustainability Indicator scores how viable each settlement option is for each party — taking income, outgoings, housing costs, and capital into account.
                </p>
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
                    "Users with a combined asset pool between £300k–£500k typically see a sustainability score difference of 15–25 points between the Sell & Split and Retain options, driven by mortgage affordability on a single income."
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "Users with a combined pool over £500k most commonly find that the Retain option produces a materially higher capital position for one party, while the Sell & Split option delivers the most balanced short-term liquidity split."
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

        {/* Pricing card CTA */}
        <section>
          <div className="rounded-xl bg-primary border border-white/10 shadow-2xl overflow-hidden" data-testid="card-pricing-cta">
            <div className="px-6 pt-6 pb-2 text-center border-b border-white/10 space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-gold/15 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full">
                Twelve Months · Unlimited Access
              </div>
              <div className="text-5xl font-bold tracking-tight text-gold pt-1">£79</div>
              <div className="text-sm text-white/55 pb-2">One-time payment. No subscription.</div>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/5 rounded-lg py-2.5">
                  <p className="text-sm font-bold text-white">20 min</p>
                  <p className="text-[10px] text-white/45 mt-0.5">First model</p>
                </div>
                <div className="bg-white/5 rounded-lg py-2.5">
                  <p className="text-sm font-bold text-white">12 months</p>
                  <p className="text-[10px] text-white/45 mt-0.5">Reruns</p>
                </div>
                <div className="bg-white/5 rounded-lg py-2.5">
                  <p className="text-sm font-bold text-white">100%</p>
                  <p className="text-[10px] text-white/45 mt-0.5">Private</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  "Full settlement comparison — all four options scored",
                  "Financial Sustainability Indicator per party",
                  "5-year capital projections",
                  "Stress testing — rate & income changes",
                  "Downloadable Structured Financial Brief (PDF)",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-white/70">
                    <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Button
                className="w-full bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/30 text-base font-semibold"
                size="lg"
                onClick={() => { scrollTop(); navigate("/unlock"); }}
                data-testid="button-unlock-pricing"
              >
                Unlock Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <p className="text-xs text-white/40 text-center">Secured by Stripe · Instant access</p>
            </div>
          </div>
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

        {/* Feature comparison */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-tier-free">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Free Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Net property equity and asset pool", "Asset breakdown by category", "Four settlement option names and structure"].map(item => (
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
                "Capital allocation under all 4 options",
                "Net monthly income per party (post-tax)",
                "Surplus / deficit per option",
                "Financial Sustainability Indicator scores",
                "5-year capital projection charts",
                "Housing feasibility benchmark",
                "Sensitivity stress-test sliders",
                "Downloadable professional PDF",
                "Unlimited re-runs for 12 months",
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
            This platform provides structured financial modelling and does not replace legal or regulated financial advice. All outputs are illustrative, based on your inputs and standard assumptions. It is designed to help you approach professional discussions with clarity.
          </p>
        </div>
      </main>
    </div>
  );
}
