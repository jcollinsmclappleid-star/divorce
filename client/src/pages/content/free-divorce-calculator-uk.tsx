import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calculator, CheckCircle2, Lock, BarChart3, TrendingUp } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const whatItModels = [
  "Net asset pool after deducting outstanding mortgage and liabilities",
  "Multiple settlement scenarios side-by-side (sell & split, one party retains property, deferred sale)",
  "Post-tax net monthly income for both parties under each scenario",
  "Pension allocation impact on overall asset distribution",
  "Optional spousal maintenance income transfer and its cashflow effect",
  "Mortgage sustainability stress-test against rate changes",
];

const faqItems = [
  {
    question: "Is this divorce calculator really free to use?",
    answer: "The wizard and financial modelling are free to run. You can enter your figures and explore scenarios at no cost. A one-time payment unlocks the full downloadable report with detailed scenario breakdowns, guided summary, and projection charts.",
  },
  {
    question: "What information do I need to use the calculator?",
    answer: "You will need approximate values for: the family home (current estimated value and outstanding mortgage), savings and investments, pension values (Cash Equivalent Transfer Values if available), gross annual income for both parties, and your main monthly outgoings. Exact figures are not required — estimates are fine for modelling purposes.",
  },
  {
    question: "Does the calculator give legal advice?",
    answer: "No. This is a financial modelling tool, not a legal or financial advice service. It illustrates what different settlement assumptions would look like numerically. Outputs should not be treated as legal rights analysis or predictions of legal outcomes.",
  },
  {
    question: "Can both parties use the same calculator?",
    answer: "Yes — the wizard is designed for one user to input figures for both parties. You can use names to personalise the model (e.g. your own name and your spouse's name). The scenario comparison then shows outcomes for each party side by side.",
  },
  {
    question: "Is my data saved or shared?",
    answer: "All financial modelling happens in your browser. Your figures are not sent to a server or stored. Only your email address is collected if you choose to purchase a report or receive updates. Full details are in the privacy policy.",
  },
];

const relatedPages = [
  { title: "Divorce Financial Settlement Calculator", description: "Comprehensive asset division scenario modelling.", href: "/divorce-financial-settlement-calculator-uk", badge: "Tool" },
  { title: "50/50 Split Calculator UK", description: "Model equal asset division scenarios numerically.", href: "/divorce-50-50-split-calculator-uk", badge: "Asset Division" },
  { title: "Divorce House Buyout Calculator", description: "Model the implications of retaining the family home.", href: "/divorce-house-buyout-calculator-uk", badge: "Property" },
  { title: "Divorce Financial Modelling Guide", description: "How structured scenario modelling works and what to expect.", href: "/divorce-financial-modelling", badge: "Pillar Guide" },
  { title: "Preview the Full Financial Report", description: "See what the paid report includes before purchasing.", href: "/unlock", badge: "Report" },
];

export default function FreeDivorceCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      showProductShowcase
      title="Free Divorce Calculator UK"
      subtitle="Model the financial implications of different divorce settlements at no cost. Enter your figures, compare scenarios, and understand the numbers before making any decisions."
      documentTitle="Free Divorce Calculator UK | DivorceCalculatorUK"
      metaDescription="Free UK divorce calculator — model asset splits, property scenarios, pension division, and monthly income under different settlement assumptions. No signup required to start."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Free Divorce Calculator UK", href: "/free-divorce-calculator-uk" },
      ]}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-what-it-models">
          What the Calculator Models
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The calculator runs entirely in your browser. No signup is required to start modelling.
        </p>
        <div className="space-y-2 mb-8">
          {whatItModels.map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <InlineCTA label="Start the free calculator" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-free-vs-paid">
          Free Modelling vs Full Report
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The free calculator lets you model your own scenario and explore the numbers. The full paid report adds detailed scenario breakdowns, a guided written summary, and downloadable outputs.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-free-tier">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">Free</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /><span>Full wizard — all asset, income, and expense fields</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /><span>Scenario overview — net assets and monthly income</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /><span>Preview of scenario comparison</span></div>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-paid-tier">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge>Full Report</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /><span>Complete scenario cards with per-party breakdowns</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /><span>Guided written summary of findings</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /><span>Stress test sliders and projection charts</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /><span>Downloadable PDF report</span></div>
                <div className="flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" /><span>One-time payment, 12-month access</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-illustrative-scenario">
          Illustrative Scenario
        </h2>
        <Card data-testid="card-example-scenario">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-3">Example: Property £380,000 — Mortgage £120,000 — Savings £45,000 — Pensions £180,000</p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Net asset pool:</strong> approximately £485,000 after deducting mortgage balance and estimated sale costs</span>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">50/50 scenario:</strong> each party receives approximately £242,500 — but one may receive primarily property equity while the other receives pensions and savings, producing materially different liquidity positions</span>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Scenario comparison:</strong> modelling illustrates how the composition of each party's allocation affects immediate access to cash and long-term financial sustainability</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">This is illustrative. Actual outcomes depend on the specific circumstances of each case.</p>
          </CardContent>
        </Card>
        <InlineCTA label="Model your own figures" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-how-it-works">
          How the Calculator Works
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The multi-step wizard collects your figures across five areas: property and mortgage, savings and investments, pensions, income, and monthly outgoings. The engine then calculates net equity, applies UK income tax and National Insurance to gross incomes, and computes post-separation monthly income under each settlement scenario.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card data-testid="card-step-enter">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Calculator className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Enter your figures</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Assets, debts, incomes, and outgoings for both parties.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-step-model">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Compare scenarios</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">See sell & split, buyout, and deferred sale side by side.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-step-report">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Unlock full report</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Download a detailed scenario report for preparation and negotiation.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-faq-heading">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="text-xs text-muted-foreground mt-8 leading-relaxed border-t pt-4">
          DivorceCalculatorUK is an assumption-based financial modelling tool. It does not provide legal, financial, tax, pension, mortgage or investment advice and does not predict court outcomes.
        </p>
      </ContentSection>
    </ContentPageLayout>
  );
}
