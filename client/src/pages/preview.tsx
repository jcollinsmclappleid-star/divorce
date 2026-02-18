import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useAccess } from "@/hooks/use-access";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, ShieldCheck, BarChart3, FileText, TrendingUp, Calculator, Sliders } from "lucide-react";
import { useEffect } from "react";

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
        <p className="text-xs text-muted-foreground/70 mt-1">Available in Full Structured Analysis</p>
      </div>
    </div>
  );
}

function fmt(v: number) { return formatCurrency(v); }

export default function PreviewPage() {
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
  const s1 = engine.scenarios.find(s => s.id === "S1");

  const stabilityTease = s1 ? Math.floor(Math.random() * 10) + 50 : 60;
  const stabilityFirstDigit = Math.floor(stabilityTease / 10);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">Financial Modeller</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/wizard" data-testid="button-edit-inputs-preview">Edit Inputs</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-preview-title">Preliminary Financial Summary</h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Based on the information provided, the following represents a summary of the preliminary financial position.
            Unlock the full structured analysis for comprehensive scenario modelling, stability assessment, and a downloadable Structured Financial Brief.
          </p>
          <p className="text-xs text-muted-foreground mt-2" data-testid="text-preview-disclaimer">
            All figures are indicative estimates based on the information provided. They do not constitute financial, legal, or tax advice.
          </p>
        </div>

        <div className="p-4 rounded-md border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800">
          <p className="text-sm text-amber-900 dark:text-amber-200" data-testid="text-disclaimer-preview">
            This tool provides illustrative modelling only. It does not constitute legal, tax, or financial advice.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card data-testid="card-net-equity">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Equity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tabular-nums">{fmt(intermediate.netHomeEquity)}</p>
              <p className="text-xs text-muted-foreground mt-1">Property value less outstanding mortgage and estimated realisation costs</p>
            </CardContent>
          </Card>

          <Card data-testid="card-asset-pool">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Combined Net Asset Pool</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tabular-nums">{fmt(intermediate.totalLiquid + intermediate.netHomeEquity)}</p>
              <p className="text-xs text-muted-foreground mt-1">Combined distributable asset pool [total assets less total liabilities]</p>
            </CardContent>
          </Card>

          <Card data-testid="card-equal-split">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Illustrative Equal Split</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tabular-nums">{fmt((intermediate.totalLiquid + intermediate.netHomeEquity) / 2)}</p>
              <p className="text-xs text-muted-foreground mt-1">Illustrative 50/50 distribution (adjustable in full analysis)</p>
            </CardContent>
          </Card>
        </div>

        <Card data-testid="card-stability-tease">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Preliminary Stability Assessment</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Detailed stability breakdown available in full analysis</p>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-bold tabular-nums">{stabilityFirstDigit}</span>
                <span className="text-3xl font-bold tabular-nums filter blur-sm select-none">X</span>
                <span className="text-lg text-muted-foreground ml-1">/ 100</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Full Analytical Pack Includes</h2>

          <BlurredSection title="Scenario Comparison — Sale vs Retention" height="h-40" />
          <BlurredSection title="Source of Funds Breakdown" height="h-32" />
          <BlurredSection title="12-Month Capital Position" height="h-28" />
          <BlurredSection title="Multi-Year Capital Projection" height="h-36" />
          <BlurredSection title="Sensitivity Analysis" height="h-28" />
          <BlurredSection title="Structured Financial Brief (PDF Report)" height="h-24" />
        </div>

        <div className="text-center space-y-4 py-6">
          <p className="text-sm text-muted-foreground">
            Settlement ratio adjustment and detailed modelling parameters are available in the full structured analysis.
          </p>
          <Button size="lg" className="px-8" onClick={() => navigate('/unlock')} data-testid="button-unlock-cta">
            <Lock className="w-4 h-4 mr-2" />
            Unlock Full Structured Analysis
          </Button>
        </div>
      </main>
    </div>
  );
}
