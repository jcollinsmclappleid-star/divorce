import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-store";
import { SiteNav } from "@/components/site-nav";

const FAQ_CATEGORIES = [
  {
    category: "About the platform",
    items: [
      {
        q: "What is Divorce Calculator UK?",
        a: "Divorce Calculator UK is a financial clarity platform — not a legal tool or advice service. It models the financial structure of different divorce settlement options based on your actual assets, debts, income, and expenses. The goal is to help you understand what each settlement option looks like in practice, before you spend thousands on preliminary solicitor consultations.",
      },
      {
        q: "Is this financial or legal advice?",
        a: "No. This platform provides illustrative financial analysis only. It is not authorised or regulated by the FCA, SRA, or any other professional body. The outputs are illustrative models, not predictions, recommendations, or legal assessments. Independent professional advice may be warranted before making any decisions.",
      },
      {
        q: "Does this predict what I will receive in court?",
        a: "No. This platform does not predict court outcomes, judicial discretion, legal entitlement, or settlement fairness. It shows the financial structure of each settlement option only. A court considers a wide range of factors — including needs, contributions, and the welfare of children — that are beyond the scope of any financial model.",
      },
      {
        q: "How accurate are the tax calculations?",
        a: "The tax engine applies UK income tax and employee Class 1 National Insurance calculations based on published HMRC 2026/27 rates for England and Wales. It excludes dividend rates, Scottish rates, self-employed NI, Capital Gains Tax, pension relief, and other reliefs. Full details are available on the Methodology page.",
      },
      {
        q: "What do the lending capacity benchmarks mean?",
        a: "These are generalised income multiple illustrations (typically 4–4.5x gross income) and do not constitute a lending assessment, mortgage advice, or credit approval indication. Actual lending decisions depend on individual creditworthiness, lender criteria, and other factors beyond what this platform models.",
      },
    ],
  },
  {
    category: "Your settlement",
    items: [
      {
        q: "Is divorce always split 50/50 in England and Wales?",
        a: "No. The law requires a fair outcome, not an equal one. Courts consider a wide range of factors under the Matrimonial Causes Act 1973 — including housing needs, income and earning capacity, the welfare of children, the length of the marriage, and each party's contributions. In many cases where one party has significantly lower income or primary caring responsibilities, a 50/50 split of assets would not produce a fair result. The starting point for long marriages is often equality, but the outcome regularly departs from it.",
      },
      {
        q: "How is the family home treated in a divorce settlement?",
        a: "The family home is typically the largest asset. Courts prioritise the welfare of any children when deciding what happens to it. Options include selling and splitting the proceeds, one party buying the other out, or a deferred sale — where one party stays in the property until the children are older, then the home is sold and the proceeds divided. This platform models all of these options side by side.",
      },
      {
        q: "Are pensions included in a divorce settlement?",
        a: "Yes, in most cases. Pensions are considered a marital asset in England and Wales and may be shared, offset against other assets, or attached to future payments. Pensions are often the second-largest asset after the family home — and sometimes the largest. They are frequently underestimated or overlooked entirely. This platform includes pension values in the total asset pool and shows how they are allocated under each settlement option.",
      },
      {
        q: "What debts are taken into account in a divorce?",
        a: "Joint debts — including joint mortgages, credit cards, loans, and other shared obligations — are generally treated as shared liabilities. Sole debts may or may not be considered depending on how they were incurred. Courts look at the full financial picture, including debts, when deciding what a fair settlement looks like. You can enter all debts in the platform and see exactly how they affect each party's net position under every settlement option.",
      },
      {
        q: "Can I keep the house after divorce?",
        a: "It depends on affordability, the needs of any children, and whether the other party can be fairly bought out. Keeping the house requires a remortgage in your name alone — which depends on your income and the lender's criteria. If you cannot afford the mortgage independently, or cannot raise enough equity to make the buyout fair, keeping the house may not be viable. This platform shows you a dedicated 'you retain the home' settlement option — with a sustainability score and five-year projection — so you can see clearly whether it works for you.",
      },
      {
        q: "What is a clean break order?",
        a: "A clean break order is a court order that legally ends any future financial claims between two parties. Once made, neither party can make claims against the other — even years after the divorce. Clean break orders provide certainty and finality. Not all settlements result in a clean break — for example, if one party receives ongoing maintenance payments, a full clean break may not be possible. A consent order is the document that records the agreed financial terms and is approved by the court.",
      },
      {
        q: "How long does a financial settlement take?",
        a: "Financial settlements in England and Wales typically take between nine months and two years to resolve, depending on whether the parties reach agreement or require court proceedings. Mediated or negotiated settlements are faster and significantly cheaper. Court proceedings — known as financial remedy hearings — can take twelve to twenty-four months. A consent order, once agreed, must be approved by the court to become legally binding. Starting with a clear financial picture often shortens the process considerably.",
      },
    ],
  },
  {
    category: "Understanding your results",
    items: [
      {
        q: "What does the Cashflow Resilience Indicator mean?",
        a: "The Cashflow Resilience Indicator (CRI) is a score from 0 to 100 that reflects how viable each settlement option looks over a five-year horizon — based on income, outgoings, housing costs, and capital position. It does not constitute financial advice, risk profiling, or a suitability assessment. Green (70+) indicates sustainability under current assumptions. Amber (40–69) warrants attention. Red (below 40) indicates financial stress.",
      },
      {
        q: "What do the 5-year projections show?",
        a: "The five-year projection charts show how the capital position of each settlement option is expected to evolve over time, given your current assumptions about income, expenses, mortgage payments, and asset values. They are illustrative — they do not account for future changes in employment, interest rates, or personal circumstances beyond the stress test sliders.",
      },
      {
        q: "What is the stress test feature?",
        a: "The stress test tool lets you adjust key financial assumptions — such as interest rates, monthly expenses, or house price changes — and immediately see how those changes affect each settlement option's CRI score and cashflow. It is designed to help you understand how resilient each option is to realistic changes in your circumstances.",
      },
      {
        q: "What is the Settlement Reality Check PDF?",
        a: "The Settlement Reality Check PDF is a downloadable summary of your full analysis. It includes your asset pool breakdown, the net position for each settlement option, monthly surplus/deficit figures, CRI scores, pressure points and professional questions. It is designed to be a useful reference document for discussions with solicitors, mediators, or your own planning — not a formal financial statement.",
      },
    ],
  },
  {
    category: "Data & security",
    items: [
      {
        q: "Is my data safe?",
        a: "All core financial calculations are performed locally in your web browser. No names or contact details are ever included in any processing. Your session is stored in your browser's local storage. Payment processing is handled securely by Stripe — we never store card details.",
      },
      {
        q: "How do I access my analysis again after closing my browser?",
        a: "Your session is stored locally in your browser. If you clear your browser data or switch devices, you will need to use the 'Sign In' recovery feature to retrieve your session by email — this works only if you provided an email address during your session. Your session token gives you access to the platform's analysis tools for the duration of your 12-month access period.",
      },
    ],
  },
  {
    category: "Payment & access",
    items: [
      {
        q: "How much does the full analysis cost?",
        a: "The full analysis costs £79 as a one-time payment. There is no subscription or recurring charge. Payment is processed securely via Stripe. Once paid, you have 12 months of unlimited access to your full analysis — you can return, adjust your figures, and re-run the model as many times as you like.",
      },
      {
        q: "What does the free version include?",
        a: "The free version includes the full 9-step financial wizard, entry of all assets and liabilities, and a preview of your total marital asset pool as a ring chart. The full settlement analysis — including CRI scores, monthly cashflow, stress testing, projections, and the Settlement Reality Check PDF — requires a one-time payment of £79.",
      },
      {
        q: "What support is available after purchase?",
        a: "Email support is available at support@divorcecalculatoruk.co.uk. Our support covers: how to use the platform and its features, understanding what the figures and scores on screen mean, recovering access to your account, and billing or technical issues. We are not able to provide financial advice, legal advice, tax advice, or guidance on what settlement you should accept — those questions require a qualified solicitor or regulated financial adviser.",
      },
    ],
  },
];

function FaqAccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-border/40 last:border-b-0"
      data-testid={`faq-item-${index}`}
    >
      <button
        className="w-full flex items-start justify-between gap-4 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        data-testid={`button-faq-toggle-${index}`}
      >
        <span className="text-sm font-medium text-foreground leading-snug">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        )}
      </button>
      {open && (
        <p className="text-sm text-muted-foreground leading-relaxed pb-4 pr-8">{a}</p>
      )}
    </div>
  );
}

function useFaqJsonLd() {
  useEffect(() => {
    const allItems = FAQ_CATEGORIES.flatMap((c) => c.items);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allItems.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a,
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);
}

export default function FaqPage() {
  const [, setLocation] = useLocation();
  const reset = useAppStore((s) => s.reset);

  useDocumentTitle("UK Divorce Settlement FAQ | DivorceCalculatorUK");
  useMetaTags({
    description: "Answers about divorce financial settlements in England and Wales — how assets are split, what happens to the house and pensions, child maintenance, and how the calculator works.",
    canonical: "https://divorcecalculatoruk.co.uk/faq",
    ogTitle: "UK Divorce Settlement FAQ — Common Questions Answered",
    ogDescription: "How are assets split? What happens to the house and pensions? Answers for England and Wales divorces — and how this tool works.",
    ogUrl: "https://divorcecalculatoruk.co.uk/faq",
    ogType: "website",
  });
  useFaqJsonLd();

  const startFresh = () => {
    reset();
    scrollTop();
    setLocation("/wizard");
  };

  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20" data-testid="text-disclaimer">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <SiteNav onStartClick={startFresh} />

      <section className="py-14 md:py-20 bg-primary" data-testid="section-faq-hero">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-4">
          <p className="text-gold text-sm font-semibold tracking-wide uppercase">FAQ</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight" data-testid="text-faq-headline">
            Your questions answered
          </h1>
          <p className="text-primary-foreground/80 text-base leading-relaxed">
            Questions about the platform, your settlement, data security, and what you get for £79.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background" data-testid="section-faq-content">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="space-y-10">
            {FAQ_CATEGORIES.map((cat, ci) => (
              <div key={ci} data-testid={`faq-category-${ci}`}>
                <h2 className="text-base font-semibold text-foreground mb-1">{cat.category}</h2>
                <p className="text-xs text-muted-foreground mb-4">{cat.items.length} questions</p>
                <div className="rounded-xl border border-border px-5">
                  {cat.items.map((item) => {
                    const idx = globalIndex++;
                    return (
                      <FaqAccordionItem key={idx} q={item.q} a={item.a} index={idx} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border text-center space-y-4">
            <p className="text-sm font-semibold text-foreground">Still have a question?</p>
            <p className="text-xs text-muted-foreground">
              Email us at{" "}
              <a href="mailto:support@divorcecalculatoruk.co.uk" className="text-primary underline hover:no-underline">
                support@divorcecalculatoruk.co.uk
              </a>
              {" "}and we'll get back to you within one business day. We can help with how the platform works, account access, and billing. We cannot provide financial, legal, or tax advice.
            </p>
            <Button
              onClick={startFresh}
              data-testid="button-faq-cta"
              className="bg-gold hover:bg-gold/90 text-white border-0"
            >
              Get My Financial Picture — Free
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="pt-10 pb-8 bg-primary border-t border-primary/20" data-testid="section-footer">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Logo href="/" size="sm" showBrandName className="brightness-0 invert" />
            <div className="flex flex-wrap gap-4 text-xs text-primary-foreground/60">
              <a href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-primary-foreground transition-colors">Terms</a>
              <a href="/methodology" className="hover:text-primary-foreground transition-colors">Methodology</a>
              <a href="/contact" className="hover:text-primary-foreground transition-colors">Contact</a>
              <a href="/how-it-works" className="hover:text-primary-foreground transition-colors">How It Works</a>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/40 max-w-2xl leading-relaxed">
            This platform provides illustrative financial modelling only. It is not financial, legal, or tax advice and is not regulated by the FCA or SRA. For advice on your specific situation, consult a qualified family solicitor or regulated financial adviser.
          </p>
        </div>
      </footer>
    </div>
  );
}
