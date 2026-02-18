import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "wouter";
import { useAccess, useSessionToken } from "@/hooks/use-access";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, CheckCircle, Loader2,
  BarChart3, TrendingUp, Calculator, FileText, Sliders, Search, Scale
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Logo } from "@/components/logo";
import { useNoIndex } from "@/hooks/use-noindex";

const VALUE_ITEMS = [
  { icon: Scale, text: "Compare alternative settlement structures side-by-side" },
  { icon: Sliders, text: "Model how allocation ratios affect indicative stability" },
  { icon: TrendingUp, text: "Assess projected capital sustainability over 5 years" },
  { icon: Calculator, text: "Quantify where settlement capital originates and how it is allocated" },
  { icon: BarChart3, text: "Evaluate structural implications of each scenario" },
  { icon: Search, text: "Identify which assumptions have the greatest sensitivity impact" },
  { icon: FileText, text: "Generate a structured financial brief suitable for professional discussions (PDF)" },
];

const INCLUDES_ITEMS = [
  "Unlimited scenario reruns for 6 months",
  "Adjustable settlement structure modelling",
  "Financial sustainability indicator with driver analysis",
  "Monthly financial position snapshot",
  "5-year capital sustainability projection",
  "Structured Financial Brief (PDF)",
];

export default function UnlockPage() {
  useDocumentTitle("Unlock Full Analysis | DivorceCalculatorUK");
  useNoIndex();
  const [, navigate] = useLocation();
  const sessionToken = useSessionToken();
  const { hasAccess, isLoading } = useAccess();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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
          <Logo size="sm" />
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
          <h1 className="text-3xl font-bold tracking-tight leading-tight font-display">
            Structured Modelling for Informed Conversations.
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Your preliminary financial position has been modelled. Unlock the complete structured analysis to compare alternative settlement structures and assess indicative sustainability.
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
          <h2 className="text-xl font-semibold">Private Exploration Before Public Decisions</h2>
          <div className="text-sm text-muted-foreground space-y-3 max-w-lg mx-auto leading-relaxed text-left">
            <p>Financial decisions involving significant assets benefit from structured modelling before professional discussions.</p>
            <p>This platform allows you to:</p>
            <ul className="space-y-1.5 ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                <span>Approach discussions informed by quantified assumptions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                <span>Identify areas of lower resilience under current assumptions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                <span>Ask more focused, structured questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                <span>Reduce time spent clarifying baseline financial position</span>
              </li>
            </ul>
            <p className="pt-2">
              A single professional consultation can cost £250–£400 per hour.
              <br />
              Structured financial modelling: £59.
            </p>
            <p className="text-xs text-muted-foreground/70">
              This tool does not replace professional advice. It supports more informed conversations.
            </p>
          </div>
        </section>

        <section className="flex justify-center" data-testid="section-pricing">
          <Card className="max-w-sm w-full">
            <CardContent className="pt-8 pb-8 space-y-6 text-center">
              <div>
                <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3" data-testid="badge-access-duration">
                  Launch Phase Access
                </div>
                <div className="text-4xl font-bold tracking-tight" data-testid="text-price">£59</div>
                <div className="text-sm text-muted-foreground mt-1">Six Months Unlimited Access</div>
                <div className="text-xs text-muted-foreground/60 mt-1">Standard access price: £79</div>
              </div>

              <ul className="text-sm text-left space-y-2">
                {INCLUDES_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer select-none" data-testid="label-terms-acceptance">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 shrink-0"
                  data-testid="checkbox-terms-acceptance"
                />
                <span className="leading-relaxed">
                  I confirm that I understand this tool provides illustrative financial modelling only. It does not constitute legal, tax, or financial advice and I will seek independent professional advice before making financial decisions. I have read and accept the{" "}
                  <Link href="/terms" className="underline text-primary">Terms of Use</Link>.
                </span>
              </label>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={checkoutLoading || !termsAccepted}
                data-testid="button-checkout"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redirecting to payment...
                  </>
                ) : (
                  "Unlock Full Analysis — £59"
                )}
              </Button>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>One-time payment. No subscription. Six months unlimited access.</p>
                <p className="mt-1">
                  Already purchased? <Link href="/recover" className="underline text-primary" data-testid="link-recover">Recover your access</Link>
                </p>
                <p className="text-[10px] text-muted-foreground/70 leading-relaxed mt-2">
                  By proceeding, you acknowledge that this tool provides illustrative financial modelling only and does not constitute legal, tax, or regulated financial advice. No advisory relationship is created. Outputs should not be relied upon for decision-making without independent professional advice.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center space-y-3 pb-8" data-testid="section-reinforcement">
          <h2 className="text-lg font-semibold">Your Assumptions Are Already Entered.</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Unlock the full structured analysis now to review the complete financial model while your assumptions are current.
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
