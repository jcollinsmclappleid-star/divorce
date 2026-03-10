import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useAccess } from "@/hooks/use-access";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Check } from "lucide-react";
import { useEffect } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";

function BlurredSection({ title, height = "h-32" }: { title: string; height?: string }) {
  return (
    <div className="relative" data-testid={`blurred-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className={`${height} bg-muted/30 rounded-md overflow-hidden select-none pointer-events-none`}>
        <div className="p-4 space-y-2 filter blur-sm opacity-50">
          <div className="h-3 bg-muted-foreground/20 rounded w-3/4" />
          <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
          <div className="h-3 bg-muted-foreground/20 rounded w-2/3" />
          <div className="h-8 bg-muted-foreground/10 rounded w-full mt-2" />
          <div className="h-3 bg-muted-foreground/20 rounded w-5/6" />
          <div className="h-3 bg-muted-foreground/20 rounded w-1/3" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 rounded-md">
        <Lock className="w-5 h-5 text-muted-foreground mb-2" />
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Unlock to View</p>
      </div>
    </div>
  );
}

function fmt(v: number) { return formatCurrency(v); }

export default function PreviewPage() {
  useDocumentTitle("Your Divorce Financial Overview | DivorceCalculatorUK");
  useNoIndex();
  const [, navigate] = useLocation();
  const store = useAppStore();
  const engine = useEngine();
  const { hasAccess, isLoading } = useAccess();

  useEffect(() => {
    if (!isLoading && hasAccess) {
      navigate('/results');
    }
  }, [hasAccess, isLoading, navigate]);

  const hasData = store.assets.length > 0 || store.incomes.length > 0;
  if (!hasData) {
    navigate('/');
    return null;
  }

  const { intermediate } = engine;

  const combinedPool = intermediate.totalLiquid + intermediate.netHomeEquity;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/wizard" data-testid="button-edit-inputs-preview">Edit Inputs</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Logo href="/" size="lg" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-preview-title">
            Your Financial Position Has Been Modelled.
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            Your asset pool and capital position have been calculated under current assumptions.
            Unlock the full structured analysis to review scenario breakdowns, sustainability indicators, and 5-year projections.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card data-testid="card-net-equity">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Property Equity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tabular-nums" data-testid="value-net-equity">{fmt(intermediate.netHomeEquity)}</p>
              <p className="text-xs text-muted-foreground mt-1">Property value less outstanding mortgage and estimated realisation costs</p>
            </CardContent>
          </Card>

          <Card data-testid="card-asset-pool">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Combined Distributable Asset Pool</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tabular-nums" data-testid="value-asset-pool">{fmt(combinedPool)}</p>
              <p className="text-xs text-muted-foreground mt-1">Combined distributable asset pool (total assets less total liabilities)</p>
            </CardContent>
          </Card>

          <Card className="relative" data-testid="card-equal-split-locked">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scenario Allocation Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-muted-foreground/60">
                <Lock className="w-4 h-4 shrink-0" />
                <p className="text-sm">Available in full analysis</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Compare adjustable splits across multiple settlement structures</p>
            </CardContent>
          </Card>

          <Card className="relative" data-testid="card-stability-locked">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Financial Sustainability Indicator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-muted-foreground/60">
                <Lock className="w-4 h-4 shrink-0" />
                <p className="text-sm">Available in full analysis</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Indicator breakdown and sustainability drivers</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Full Analytical Pack Includes</h2>

          <BlurredSection title="Scenario Comparison Table" height="h-40" />
          <BlurredSection title="5-Year Capital Projection" height="h-36" />
          <BlurredSection title="Financial Sustainability Indicator Drivers" height="h-32" />
          <BlurredSection title="Housing Feasibility Benchmark" height="h-28" />
          <BlurredSection title="Sensitivity Snapshot" height="h-28" />
          <BlurredSection title="Structured Financial Brief (PDF)" height="h-24" />
        </div>

        <div className="space-y-6 py-4">
          <Card className="border-muted">
            <CardContent className="py-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  A single professional consultation can cost {"\u00A3"}250{"\u2013"}{"\u00A3"}400 per hour.
                </p>
                <p className="text-sm font-medium">
                  Structured financial clarity for {"\u00A3"}79 — one-time payment.
                </p>
                <p className="text-xs text-muted-foreground">
                  Includes 6 months unlimited scenario modelling. No subscription. No recurring fees.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <Button size="lg" className="px-8" onClick={() => navigate('/unlock')} data-testid="button-unlock-cta">
              <Lock className="w-4 h-4 mr-2" />
              Unlock Full Analysis — {"\u00A3"}79
            </Button>
            <p className="text-xs text-muted-foreground">
              Immediate access. Private. No subscription. 6-month access included.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-tier-free">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Free Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Net equity and asset pool summary</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Confirmation your model has been calculated</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30" data-testid="card-tier-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Full Structured Brief ({"\u00A3"}79)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">Scenario modelling (Sell / Retain)</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">Stability drivers explained</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">5-year capital projections</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">Mortgage benchmark analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">Sensitivity testing</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">Downloadable professional PDF</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">Unlimited re-runs for 6 months</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="py-4">
          <p className="text-xs text-muted-foreground text-center max-w-lg mx-auto leading-relaxed" data-testid="text-disclaimer-preview">
            This tool provides structured financial modelling and does not replace legal or regulated financial advice.
            It is designed to help you approach professional discussions with clarity.
          </p>
        </div>
      </main>
    </div>
  );
}
