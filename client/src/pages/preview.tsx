import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useAccess, useSessionToken } from "@/hooks/use-access";
import { formatCurrency, scrollTop } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lock, Check, Shield, ArrowRight, Loader2,
  TrendingUp, AlertCircle, Eye, ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";
import { FsiGaugeLocked } from "@/components/fsi-gauge";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis,
} from "recharts";

const CHART_COLOURS = ["hsl(220,52%,22%)", "#0d9488", "#64748b"];

export default function PreviewPage() {
  useDocumentTitle("Your Divorce Financial Overview | DivorceCalculatorUK");
  useNoIndex();
  const [, navigate] = useLocation();
  const store = useAppStore();
  const engine = useEngine();
  const { hasAccess, isLoading } = useAccess();
  const sessionToken = useSessionToken();
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(() => !!store.profile?.capturedEmail);
  const [emailLoading, setEmailLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && hasAccess) navigate("/results");
  }, [hasAccess, isLoading, navigate]);

  const hasData = store.assets.length > 0 || store.incomes.length > 0;
  useEffect(() => { if (!hasData) navigate("/"); }, [hasData, navigate]);
  if (!hasData) return null;

  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment page failed to load. Please try again.");
        setCheckoutLoading(false);
      }
    } catch {
      alert("An error occurred. Please try again.");
      setCheckoutLoading(false);
    }
  }

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

  // Scenario teaser data — approximate indicative values for preview bar chart
  const scenarioBarData = [
    { name: "Sell & Split",       value: Math.round(combinedPool * 0.50), color: "#2563EB" },
    { name: `${nameA} Keeps`,     value: Math.round(combinedPool * 0.44), color: "#10B981" },
    { name: `${nameB} Keeps`,     value: Math.round(combinedPool * 0.55), color: "#8B5CF6" },
    { name: "Deferred Sale",      value: Math.round(combinedPool * 0.48), color: "#F59E0B" },
  ];

  const scenarios = [
    {
      id: "S1", name: "Sell & Split", color: "#2563EB",
      desc: "Property sold, net equity divided. Both parties receive a cash allocation.",
      lockedMetrics: ["Capital position after costs", "Monthly surplus / deficit", "5-yr projection"],
    },
    {
      id: "S2a", name: `${nameA} Retains Home`, color: "#10B981",
      desc: `${nameA} buys out ${nameB}'s share. Remaining assets rebalanced.`,
      lockedMetrics: ["Housing feasibility score", "Equity release required", "Mortgage affordability"],
    },
    {
      id: "S2b", name: `${nameB} Retains Home`, color: "#8B5CF6",
      desc: `${nameB} buys out ${nameA}'s share. Remaining assets rebalanced.`,
      lockedMetrics: ["Housing feasibility score", "Equity release required", "Mortgage affordability"],
    },
    {
      id: "S4", name: "Deferred Sale", color: "#F59E0B",
      desc: "Property retained jointly then sold at a future date (Mesher-style arrangement).",
      lockedMetrics: ["Annual running cost", "5-year capital gain", "Exit value estimate"],
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

  const UnlockButton = ({ size = "lg", className = "", label = "Unlock My Full Analysis — £79" }: { size?: "lg" | "sm"; className?: string; label?: string }) => (
    <Button
      size={size}
      onClick={handleCheckout}
      disabled={checkoutLoading}
      className={`bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 btn-shimmer font-semibold ${className}`}
      data-testid="button-unlock-pricing"
    >
      {checkoutLoading ? (
        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Redirecting…</>
      ) : (
        <>{label} <ArrowRight className="w-4 h-4 ml-1.5" /></>
      )}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/wizard" data-testid="button-edit-inputs-preview" onClick={scrollTop}>Edit Inputs</Link>
            </Button>
            <UnlockButton size="sm" label="Unlock — £79" className="text-sm px-4 py-2 h-8" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">

        {/* ── Hero ── */}
        <section className="rounded-2xl bg-primary text-white px-6 py-8 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full">
                <Check className="w-3 h-3" /> Analysis complete
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight mb-2" data-testid="text-preview-title">
              Your financial picture is ready.<br className="hidden sm:block" />
              <span className="text-gold">One step away from the full picture.</span>
            </h1>
            <p className="text-white/65 text-sm max-w-xl leading-relaxed mb-6">
              You've entered your assets, income, and situation. Your combined pool has been calculated. Unlock the full structured analysis to see every settlement option scored, ranked, and projected over 5 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <UnlockButton label="Unlock Full Analysis — £79" />
              <p className="text-xs text-white/40 self-center">Secured by Stripe · Instant access · Questions? We'll help</p>
            </div>
          </div>
        </section>

        {/* ── What you can see ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-full">
              <Eye className="w-3 h-3" /> Your figures
            </span>
            <h2 className="text-base font-semibold text-foreground">Combined asset pool — calculated from your inputs</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card data-testid="card-net-equity" className="border-t-4 border-t-cyan-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Net Property Equity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tabular-nums text-foreground" data-testid="value-net-equity">{formatCurrency(intermediate.netHomeEquity)}</p>
                <p className="text-xs text-muted-foreground mt-1">Property value less mortgage and estimated sale costs</p>
              </CardContent>
            </Card>
            <Card data-testid="card-asset-pool" className="border-t-4 border-t-violet-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Combined Distributable Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tabular-nums text-foreground" data-testid="value-asset-pool">{formatCurrency(combinedPool)}</p>
                <p className="text-xs text-muted-foreground mt-1">Property equity plus liquid assets and savings</p>
              </CardContent>
            </Card>
          </div>

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
                    Based on what you've entered, the combined distributable pool is <strong>{formatCurrency(combinedPool)}</strong>. Under a 50/50 split, each party would start from approximately <strong>{formatCurrency(halfPool)}</strong> — before housing arrangements and pension allocations are applied.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* ── Teaser: Settlement scenario comparison bar chart ── */}
        <section>
          <Card className="overflow-hidden border-2 border-dashed border-border/60" data-testid="card-scenario-chart-teaser">
            <CardContent className="p-0">
              <div className="px-5 pt-5 pb-3 border-b border-border/40">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm font-semibold">Settlement scenario comparison</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Indicative capital position under each of your 4 settlement options</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium shrink-0">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                </div>
              </div>
              <div className="relative px-4 pt-4 pb-2">
                {/* The actual chart — visible but Y-axis values hidden */}
                <div className="pointer-events-none select-none">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={scenarioBarData} barCategoryGap="35%" margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {scenarioBarData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} fillOpacity={0.65} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Value labels blurred */}
                <div className="absolute inset-0 flex items-start justify-around pt-3 px-8 pointer-events-none">
                  {scenarioBarData.map((s) => (
                    <div key={s.name} className="flex flex-col items-center">
                      <span
                        className="text-xs font-bold tabular-nums blur-[5px] select-none"
                        style={{ color: s.color }}
                      >
                        {formatCurrency(s.value)}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Lock CTA overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-background/30 to-background/60 rounded-b-xl">
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="flex items-center gap-2 bg-white/90 backdrop-blur border border-border shadow-lg rounded-xl px-5 py-3 text-sm font-semibold hover:bg-white transition-all hover:shadow-xl"
                    data-testid="button-unlock-chart"
                  >
                    <Lock className="w-4 h-4 text-amber-500" />
                    Unlock exact figures for all 4 scenarios
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="px-5 pb-4 pt-1">
                <p className="text-[11px] text-muted-foreground/60 italic">
                  Chart shows relative scenario positions. Exact figures, sustainability scores, and 5-year projections unlock after payment.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Privacy callout ── */}
        <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-md border border-emerald-200/60" data-testid="card-privacy-preview">
          <Shield className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <p className="text-xs text-emerald-800 leading-relaxed">
            <span className="font-semibold">Your figures never leave your browser.</span> All calculations happen on your device. We store only a session reference — no financial data is transmitted to our servers.
          </p>
        </div>

        {/* ── Four scenario cards ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
              <Lock className="w-3 h-3" /> Locked
            </span>
            <h2 className="text-base font-semibold">Four settlement options — modelled for your figures</h2>
          </div>
          <p className="text-sm text-muted-foreground">Your full analysis scores each option across capital position, monthly sustainability, and 5-year outlook. Unlock to see every figure.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {scenarios.map(sc => (
              <div
                key={sc.id}
                className="relative rounded-xl border border-border/60 bg-white overflow-hidden cursor-pointer hover:border-border hover:shadow-md transition-all"
                onClick={handleCheckout}
                data-testid={`card-scenario-${sc.id}`}
              >
                <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: sc.color }} />
                <div className="pt-5 pb-4 px-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: sc.color }} />
                    <p className="text-sm font-semibold text-foreground">{sc.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed pl-[18px]">{sc.desc}</p>
                  {/* Multiple blurred metrics */}
                  <div className="pl-[18px] space-y-2">
                    {sc.lockedMetrics.map((metric, mi) => (
                      <div key={metric} className="flex items-center justify-between">
                        <p className="text-[11px] text-muted-foreground/70">{metric}</p>
                        <div className="relative">
                          <p className="text-sm font-bold tabular-nums blur-[5px] select-none" style={{ color: sc.color }}>
                            £{Math.round(combinedPool * [0.48, 0.12, 0.05][mi % 3] / 1000)}k
                          </p>
                          <div className="absolute inset-0 flex items-center justify-end">
                            <Lock className="w-3 h-3 text-muted-foreground/50" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FSI score dial ── */}
        <section>
          <Card className="border-2 border-dashed border-border/60 overflow-hidden" data-testid="card-fsi-preview">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <h2 className="text-base font-semibold">Financial Sustainability Indicator</h2>
                </div>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  The FSI scores how financially viable each scenario is for each party — combining income, outgoings, housing costs, and capital. Scores below 40 signal significant strain; above 70 indicates sustainable.
                </p>
                <div className="flex justify-center">
                  <FsiGaugeLocked size={140} />
                </div>
                <p className="text-xs font-medium text-amber-600">Your FSI scores across all 4 scenarios are ready — unlock to view.</p>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary/70 transition-colors"
                  data-testid="button-unlock-fsi"
                >
                  <Lock className="w-3.5 h-3.5" /> Unlock to view your sustainability scores
                </button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Pricing CTA ── */}
        <section>
          <div className="rounded-2xl bg-primary border border-white/10 shadow-2xl overflow-hidden" data-testid="card-pricing-cta">
            <div className="px-6 pt-6 pb-3 text-center border-b border-white/10 space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-gold/15 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full">
                Twelve Months · Unlimited Access
              </div>
              <div className="text-5xl font-bold tracking-tight text-gold pt-1" data-testid="text-price">£79</div>
              <div className="text-sm text-white/55 pb-1">One-time payment. No subscription.</div>
              <p className="text-xs text-white/40 italic">A single solicitor hour costs £250–£400. This gives you the clarity to walk in prepared.</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { stat: "20 min", label: "First model" },
                  { stat: "12 months", label: "Reruns" },
                  { stat: "100%", label: "Private" },
                ].map(({ stat, label }) => (
                  <div key={label} className="bg-white/5 rounded-lg py-2.5">
                    <p className="text-sm font-bold text-white">{stat}</p>
                    <p className="text-[10px] text-white/45 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  "Full settlement comparison — all four options scored",
                  "Financial Sustainability Indicator per party",
                  "5-year capital projections with charts",
                  "Stress testing — rate & income changes",
                  "Downloadable Structured Financial Brief (PDF)",
                  "Unlimited re-runs — update as negotiations progress",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-white/75">
                    <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <UnlockButton className="w-full text-base font-semibold" />
              <p className="text-xs text-white/40 text-center">Secured by Stripe · Instant access · Questions? We'll help</p>
              <p className="text-xs text-white/35 text-center">
                Already purchased?{" "}
                <Link href="/recover" className="underline underline-offset-2 hover:text-white transition-colors" data-testid="link-recover-access-preview">
                  Recover access →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── Email lead capture ── */}
        <section>
          <Card className="border-primary/20" data-testid="card-email-capture">
            <CardContent className="py-6">
              {emailSubmitted ? (
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <p className="font-medium">Got it — check your inbox.</p>
                  <p className="text-sm text-muted-foreground">Your full analysis is ready whenever you are.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-sm">Email me my figures</p>
                    <p className="text-xs text-muted-foreground mt-0.5">We'll send your combined pool total straight to your inbox — no verification step, no spam.</p>
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
                      {emailLoading ? "Sending..." : "Send summary"}
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* ── Free vs Paid comparison ── */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-tier-free">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Free Preview (you're here)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Net property equity and asset pool",
                "Asset breakdown by category",
                "Four settlement option names and structure",
              ].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-gold/30 bg-gold/5" data-testid="card-tier-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gold">Full Structured Analysis (£79)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Capital allocation under all 4 options",
                "Net monthly income per party (post-tax)",
                "Monthly surplus / deficit per scenario",
                "Financial Sustainability Indicator scores",
                "5-year capital projection charts",
                "Housing feasibility benchmark",
                "Sensitivity stress-test sliders",
                "Downloadable professional PDF",
                "Unlimited re-runs for 12 months",
              ].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── Disclaimer ── */}
        <div className="py-4">
          <p className="text-xs text-muted-foreground text-center max-w-lg mx-auto leading-relaxed" data-testid="text-disclaimer-preview">
            This platform provides structured financial modelling and does not replace legal or regulated financial advice. All outputs are illustrative, based on your inputs and standard assumptions. It is designed to help you approach professional discussions with clarity.
          </p>
        </div>
      </main>
    </div>
  );
}
