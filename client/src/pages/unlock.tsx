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
  "12 months unlimited access to update and re-run",
];

const TRUST_SIGNALS = [
  { icon: Lock, text: "All calculations in your browser — your data stays private" },
  { icon: Shield, text: "Built on UK 2025/26 HMRC tax rules" },
  { icon: Zap, text: "Instant access after payment" },
];

const FAQ_ITEMS = [
  {
    question: "What happens after I pay?",
    answer: "You'll get immediate access to your full financial analysis, including all scenarios, projections, charts, and a downloadable report. Your access lasts 12 months.",
  },
  {
    question: "Is my data safe?",
    answer: "All financial calculations happen in your browser. Your sensitive financial data is never sent to or stored on our servers.",
  },
  {
    question: "Can I update my figures later?",
    answer: "Yes. During your 12-month access period, you can update your inputs and re-run the analysis as many times as you need.",
  },
  {
    question: "How does this compare to a professional consultation?",
    answer: "A single professional consultation could cost £250–£400 per hour. This tool provides structured financial modelling for £79, allowing you to approach professional discussions with quantified assumptions already prepared.",
  },
];

export default function UnlockPage() {
  useDocumentTitle("Unlock Full Analysis | DivorceCalculatorUK");
  useNoIndex();
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
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout failed:', data.message || 'Unknown error');
        alert('Payment page failed to load. Please try again.');
        setCheckoutLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred. Please try again.');
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
              Unlock the complete structured analysis to compare settlement scenarios and assess indicative sustainability. Your data is already entered — instant access after payment.
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

            <div
              className="rounded-xl bg-primary border border-white/10 shadow-2xl overflow-hidden"
              data-testid="section-pricing"
            >
              <div className="px-6 pt-6 pb-2 text-center border-b border-white/10 space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-gold/15 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full" data-testid="badge-access-duration">
                  Twelve Months · Unlimited Access
                </div>
                <div className="text-5xl font-bold tracking-tight text-gold pt-1" data-testid="text-price">£79</div>
                <div className="text-sm text-white/55 pb-2">One-time payment. No subscription.</div>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/5 rounded-lg py-2.5">
                    <p className="text-sm font-bold text-white">15 min</p>
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

                <Button
                  className="w-full bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/30 text-base font-semibold"
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
                    "Unlock Full Analysis — £79"
                  )}
                </Button>

                <p className="text-xs text-white/40 text-center">
                  Secured by Stripe
                </p>

                <div className="text-xs text-white/35 text-center space-y-1 border-t border-white/10 pt-3">
                  <p>Illustrative modelling only. Not legal or financial advice. See <Link href="/terms" className="underline text-white/55 hover:text-white transition-colors" data-testid="link-refund-terms">Terms</Link>.</p>
                  <p>
                    Already purchased? <Link href="/recover" className="underline text-white/55 hover:text-white transition-colors" data-testid="link-recover">Recover your access</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center py-4 border-y" data-testid="section-trust-signals">
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
          <p className="text-sm font-medium">Ready to see your scenarios?</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Unlock now to review all settlement scenarios side-by-side with 5-year projections. Your inputs are saved — access lasts 12 months.
          </p>
          <Button
            size="lg"
            onClick={handleCheckout}
            disabled={checkoutLoading}
            data-testid="button-checkout-secondary"
          >
            {checkoutLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Redirecting to payment...
              </>
            ) : (
              "Unlock Full Analysis — £79"
            )}
          </Button>
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
