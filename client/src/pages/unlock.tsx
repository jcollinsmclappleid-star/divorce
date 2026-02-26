import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "wouter";
import { useAccess, useSessionToken } from "@/hooks/use-access";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, CheckCircle, Loader2, Check,
  Shield, Lock, Zap
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Logo } from "@/components/logo";
import { useNoIndex } from "@/hooks/use-noindex";

const INCLUDES_ITEMS = [
  "Compare alternative settlement structures side-by-side",
  "5-year capital sustainability projections",
  "Financial sustainability indicators with driver analysis",
  "Monthly financial position snapshot per scenario",
  "Sensitivity analysis — see which assumptions matter most",
  "Downloadable Structured Financial Brief (PDF)",
  "6 months unlimited access to update and re-run",
];

const TRUST_SIGNALS = [
  { icon: Lock, text: "All calculations in your browser — your data stays private" },
  { icon: Shield, text: "Built on UK 2025/26 HMRC tax rules" },
  { icon: Zap, text: "Instant access after payment" },
];

const FAQ_ITEMS = [
  {
    question: "What happens after I pay?",
    answer: "You'll get immediate access to your full financial analysis, including all scenarios, projections, charts, and a downloadable report. Your access lasts 6 months.",
  },
  {
    question: "Is my data safe?",
    answer: "All financial calculations happen in your browser. Your sensitive financial data is never sent to or stored on our servers.",
  },
  {
    question: "Can I update my figures later?",
    answer: "Yes. During your 6-month access period, you can update your inputs and re-run the analysis as many times as you need.",
  },
  {
    question: "How does this compare to a professional consultation?",
    answer: "A single professional consultation typically costs £250–£400 per hour. This tool provides structured financial modelling for £59, allowing you to approach professional discussions with quantified assumptions already prepared.",
  },
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
      <header className="border-b bg-background">
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

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-12">
        <section className="space-y-8" data-testid="section-hero">
          <div className="text-center space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight font-display">
              Your Financial Position Has Been Modelled.
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Unlock the complete structured analysis to compare settlement scenarios and assess indicative sustainability.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div className="space-y-3" data-testid="section-value-proposition">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">What You Get</h2>
              <ul className="space-y-2.5">
                {INCLUDES_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5" data-testid={`text-value-prop-${i}`}>
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card data-testid="section-pricing">
              <CardContent className="pt-6 pb-6 space-y-5">
                <div className="text-center">
                  <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2" data-testid="badge-access-duration">
                    Launch Phase Access
                  </div>
                  <div className="text-4xl font-bold tracking-tight" data-testid="text-price">£59</div>
                  <div className="text-sm text-muted-foreground mt-1">Six months unlimited access</div>
                  <div className="text-xs text-muted-foreground/60 mt-0.5">Standard price: £79</div>
                </div>

                <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer select-none" data-testid="label-terms-acceptance">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 shrink-0"
                    data-testid="checkbox-terms-acceptance"
                  />
                  <span className="leading-relaxed">
                    I understand this tool provides illustrative financial modelling only and does not constitute legal, tax, or financial advice. I have read and accept the{" "}
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

                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p>One-time payment. No subscription.</p>
                  <p>14-day cooling-off period under the Consumer Rights Act 2015. See <Link href="/terms" className="underline text-primary" data-testid="link-refund-terms">Terms</Link> for details.</p>
                  <p>
                    Already purchased? <Link href="/recover" className="underline text-primary" data-testid="link-recover">Recover your access</Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="flex justify-center" data-testid="section-trust-signals">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {TRUST_SIGNALS.map((signal, i) => (
              <div key={i} className="flex items-center gap-2" data-testid={`text-trust-signal-${i}`}>
                <signal.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">{signal.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 max-w-lg mx-auto" data-testid="section-faq">
          <h2 className="text-lg font-semibold text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left" data-testid={`button-faq-${i}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-faq-answer-${i}`}>
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="text-center space-y-4 pb-8" data-testid="section-reinforcement">
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Your assumptions are already entered. Unlock now to review the complete financial model while your inputs are current.
          </p>
          <Button
            size="lg"
            onClick={handleCheckout}
            disabled={checkoutLoading || !termsAccepted}
            data-testid="button-checkout-secondary"
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
          {!termsAccepted && (
            <p className="text-xs text-muted-foreground/60">Accept the terms above to proceed</p>
          )}
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            This tool provides illustrative, scenario-based financial modelling only. It does not provide legal, tax, or financial advice. No advisory relationship is created.
          </p>
        </div>
      </footer>
    </div>
  );
}
