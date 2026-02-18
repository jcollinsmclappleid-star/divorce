import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useAccess, useSessionToken } from "@/hooks/use-access";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, ArrowLeft, CheckCircle, Loader2,
  BarChart3, TrendingUp, Calculator, FileText, Sliders, Search, Scale
} from "lucide-react";
import { useEffect } from "react";

const VALUE_ITEMS = [
  { icon: Scale, text: "Compare Sell vs Retain scenarios side-by-side" },
  { icon: Sliders, text: "Understand how settlement ratios change your financial stability" },
  { icon: TrendingUp, text: "See how long your capital may realistically last" },
  { icon: Calculator, text: "Identify funding requirements before committing" },
  { icon: BarChart3, text: "Evaluate mortgage affordability with structured assessment" },
  { icon: Search, text: "Model different proposals as discussions evolve" },
  { icon: FileText, text: "Download a Structured Financial Brief (professional PDF)" },
];

const INCLUDES_ITEMS = [
  "Unlimited re-runs for 6 months",
  "Adjustable settlement modelling",
  "Financial health scoring",
  "Monthly sustainability snapshot",
  "5-year projection analysis",
  "Structured Financial Brief (PDF)",
];

export default function UnlockPage() {
  const [, navigate] = useLocation();
  const sessionToken = useSessionToken();
  const { hasAccess, isLoading } = useAccess();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && hasAccess) {
      navigate('/results');
    }
  }, [hasAccess, isLoading, navigate]);

  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">Financial Modeller</span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/preview" data-testid="button-back-to-preview">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Preview
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-4" data-testid="section-hero">
          <h1 className="text-3xl font-bold tracking-tight leading-tight">
            See the Full Financial Picture<br />Before You Make Decisions.
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Understand your position clearly and confidently — before committing to costly conversations or irreversible choices.
          </p>
          <p className="text-sm text-muted-foreground/80 max-w-lg mx-auto leading-relaxed">
            You have already seen your core financial position. Unlock the complete structured modelling analysis to understand how your decisions affect liquidity, stability, and long-term sustainability.
          </p>
        </section>

        <section className="space-y-6" data-testid="section-value">
          <h2 className="text-xl font-semibold text-center">What Full Access Provides</h2>
          <div className="space-y-3">
            {VALUE_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 text-center" data-testid="section-decision">
          <h2 className="text-xl font-semibold">Clarity First. Conversations Second.</h2>
          <div className="text-sm text-muted-foreground space-y-3 max-w-lg mx-auto leading-relaxed text-left">
            <p>Financial decisions involving six-figure assets should not rely on rough estimates.</p>
            <p>This structured modelling allows you to:</p>
            <ul className="space-y-1.5 ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                <span>Enter discussions prepared and organised</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                <span>Identify financial pressure points early</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                <span>Ask better, more focused questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                <span>Avoid spending professional time clarifying basic numbers</span>
              </li>
            </ul>
            <p className="pt-2">
              A single legal consultation can cost £250–£400 per hour.
              <br />
              Structured financial clarity costs £79.
            </p>
            <p className="text-xs text-muted-foreground/70">
              This tool does not replace professional advice. It helps you use it more effectively.
            </p>
          </div>
        </section>

        <section className="flex justify-center" data-testid="section-pricing">
          <Card className="max-w-sm w-full">
            <CardContent className="pt-8 pb-8 space-y-6 text-center">
              <div>
                <div className="text-4xl font-bold tracking-tight">£79</div>
                <div className="text-sm text-muted-foreground mt-1">One-Time Access</div>
              </div>

              <ul className="text-sm text-left space-y-2">
                {INCLUDES_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={checkoutLoading}
                data-testid="button-checkout"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redirecting to payment...
                  </>
                ) : (
                  "Unlock Full Structured Analysis — £79"
                )}
              </Button>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>Private access. No subscription. Immediate unlock.</p>
                <p>Access remains available for 6 months to model evolving discussions.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center space-y-3 pb-8" data-testid="section-reinforcement">
          <h2 className="text-lg font-semibold">You have Already Done the Hard Part.</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Your financial inputs are complete. Unlock the full analysis now to see the complete picture while everything is fresh and accurate.
          </p>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs text-muted-foreground text-center">
            This tool provides illustrative, scenario-based financial modelling only. It does not provide legal, tax, or financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
