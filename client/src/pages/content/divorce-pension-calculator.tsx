import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PiggyBank, Lock, BarChart3, AlertTriangle, ArrowRightLeft } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  ExternalLinkButton,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Are pensions always included in a UK divorce settlement?",
    answer: "Pensions are financial assets and must be disclosed as part of financial remedy proceedings. Whether and how they are divided depends on the overall settlement. In some cases, one party retains the pension while the other receives a larger share of other assets (offsetting). In others, a pension sharing order transfers a defined percentage to the other party. Ignoring pensions entirely can lead to significant financial inequality, particularly at retirement.",
  },
  {
    question: "What is a CETV (Cash Equivalent Transfer Value)?",
    answer: "A CETV is the pension scheme's estimate of the capital value needed to replicate the pension's benefits if transferred to another provider. For defined contribution schemes, this is broadly the fund value. For defined benefit (final salary) schemes, the CETV is a calculated figure that may significantly understate the true economic value of the pension income entitlement.",
  },
  {
    question: "Can the State Pension be divided in divorce?",
    answer: "No. The State Pension cannot be shared or offset in divorce proceedings. Each spouse builds their own State Pension entitlement through their National Insurance record. Since April 2016, the 'new State Pension' is calculated individually — you cannot inherit or share your spouse's entitlement. This can be factored into the broader settlement as context, but it is not a divisible asset.",
  },
  {
    question: "Is pension sharing or offsetting better?",
    answer: "Neither is universally better — it depends on the specific circumstances. Pension sharing provides each party with their own pension pot and a clean break. Offsetting (trading pension value against other assets like property equity) preserves the pension structure but requires comparing unlike assets — pension and property have very different tax treatment, accessibility, and growth characteristics. Modelling both approaches can help illustrate the trade-offs.",
  },
  {
    question: "Do I need an actuary to value the pension?",
    answer: "For defined benefit (final salary) pensions, the CETV may not accurately reflect the true economic value of the pension income. An independent pension actuary or pension on divorce expert (PODE) can provide a more nuanced assessment. For large or complex defined benefit pensions, actuarial advice is commonly recommended. The calculator uses CETV values as entered — it does not independently value pension benefits.",
  },
];

const relatedPages = [
  { title: "Divorce Pension Split Calculator", description: "Compare pension sharing and offsetting scenarios side by side.", href: "/divorce-pension-split-calculator-uk", badge: "Tool" },
  { title: "Pension Sharing Calculator", description: "Model specific pension sharing percentage assumptions.", href: "/pension-sharing-calculator-divorce", badge: "Pensions" },
  { title: "Pension Offsetting Calculator", description: "Model pension offsetting against property equity.", href: "/pension-offsetting-calculator-divorce", badge: "Pensions" },
  { title: "How Are Pensions Divided in Divorce?", description: "The full overview of pension division in UK divorce.", href: "/how-are-pensions-divided-in-divorce-uk", badge: "Guide" },
  { title: "CETV Explained", description: "What a Cash Equivalent Transfer Value means for divorce.", href: "/cetv-explained-divorce-uk", badge: "Guide" },
  { title: "Preview the Full Financial Report", description: "Model pension scenarios alongside your full settlement.", href: "/unlock", badge: "Report" },
];

export default function DivorcePensionCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce Pension Calculator UK"
      subtitle="Model how pension assets could be handled in a UK divorce settlement. Compare pension sharing and offsetting scenarios alongside property and savings to understand the full financial picture."
      documentTitle="Divorce Pension Calculator UK | DivorceCalculatorUK"
      metaDescription="UK divorce pension calculator — model pension sharing, offsetting and division scenarios. Compare how different pension allocation assumptions affect the overall settlement for both parties."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Divorce Pension Calculator UK", href: "/divorce-pension-calculator" },
      ]}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-why-pensions-matter">
          Why Pensions Matter in Divorce
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          For many couples, pension assets represent the largest single item of wealth — sometimes exceeding the value of the family home. Overlooking or undervaluing pension rights can result in a materially incomplete settlement. Pension values are not equivalent to cash or property: they are illiquid, tax-advantaged, and unavailable until minimum pension age.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6" data-testid="card-pension-disclaimer">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">
              Pension values used in this calculator are not pension or financial advice. CETV figures are the scheme's estimated transfer value and may not reflect the true economic benefit of pension income — particularly for defined benefit schemes. Independent professional review may be warranted for significant pension assets.
            </p>
          </CardContent>
        </Card>
        <InlineCTA label="Model your pension scenarios" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-three-approaches">
          Three Approaches to Pension Division
        </h2>
        <div className="space-y-3">
          <Card data-testid="card-sharing">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <ArrowRightLeft className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Pension sharing order</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">A defined percentage of one party's pension is transferred to a new pension in the other party's name. Provides a clean break on pension assets. Both parties then have their own independent pension provision.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-offsetting">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Pension offsetting</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">One party retains their pension while the other receives a larger share of property equity or savings to compensate. Simpler to implement but requires comparing unlike assets — pension and property have fundamentally different characteristics.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-attachment">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Pension attachment (earmarking)</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">A share of pension income or lump sum is redirected to the other party when the pension is drawn. Rarely used — not a clean break, and dependent on the pension holder's decisions about when to retire.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-5">
          <ExternalLinkButton href="https://www.gov.uk/government/publications/pension-sharing-on-divorce-or-dissolution">
            GOV.UK: Pension Sharing on Divorce
          </ExternalLinkButton>
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-pension-types">
          Pension Types and Their Complexity
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-dc">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <PiggyBank className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Defined Contribution (DC)</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">Modern workplace pensions and SIPPs. Fund value broadly equals CETV. Simpler to value and share. Most personal and auto-enrolment pensions are DC.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-db">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Defined Benefit (DB)</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">Final salary or career average schemes (NHS, teachers, civil service, police, armed forces). CETV may understate true value. More complex to assess — independent actuarial review may be relevant.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Compare pension and settlement scenarios" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-faq">
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
