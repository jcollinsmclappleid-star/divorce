import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRightLeft, PiggyBank, BarChart3, AlertTriangle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "What is a pension sharing order?",
    answer: "A pension sharing order is a court order that transfers a defined percentage of one party's pension to a new pension fund in the other party's name. The receiving party then holds those pension rights independently. A pension sharing order provides a clean break — the parties' pension provision is separated at the point of the order, with no ongoing financial connection through the pension.",
  },
  {
    question: "How is the pension sharing percentage determined?",
    answer: "There is no fixed formula. The percentage is negotiated between the parties (or determined by the court) based on the overall settlement objective — typically ensuring that both parties have an adequate pension provision at retirement or that the pension allocation balances other asset disparities. Modelling different percentages (e.g. 30%, 40%, 50%) and comparing the resulting asset distributions can clarify the implications of different assumptions.",
  },
  {
    question: "Can a pension sharing order be applied to any pension?",
    answer: "Most occupational, personal, and workplace pensions can be subject to a pension sharing order. Exceptions include the State Pension (which cannot be shared) and some unfunded public sector pensions which have specific rules. The pension scheme administrator must be notified and will charge implementation fees, which vary by scheme.",
  },
  {
    question: "Does pension sharing affect the paying party's pension?",
    answer: "Yes. The paying party's pension fund is reduced by the transfer amount. This means lower projected retirement income for the paying party. The net effect depends on the size of the transfer relative to the total pension, the age of both parties, and future contribution levels. Modelling the long-term income implications is relevant when evaluating pension sharing percentages.",
  },
  {
    question: "What are the implementation costs of a pension sharing order?",
    answer: "Pension scheme administrators charge implementation fees for processing a pension sharing order. These fees vary widely by scheme — typically £500–£2,000, though some public sector schemes charge significantly more. Fees are often split between the parties or allocated by agreement. They should be factored into the overall settlement cost when evaluating pension sharing as an option.",
  },
];

const relatedPages = [
  { title: "Divorce Pension Calculator UK", description: "Overview of all three approaches to pension division.", href: "/divorce-pension-calculator", badge: "Pensions" },
  { title: "Pension Offsetting Calculator", description: "Model pension offsetting against property equity.", href: "/pension-offsetting-calculator-divorce", badge: "Pensions" },
  { title: "Divorce Pension Split Calculator", description: "Compare pension sharing and offsetting side by side.", href: "/divorce-pension-split-calculator-uk", badge: "Tool" },
  { title: "How Are Pensions Divided in Divorce?", description: "The full legal and practical overview.", href: "/how-are-pensions-divided-in-divorce-uk", badge: "Guide" },
  { title: "CETV Explained for Divorce", description: "Understanding Cash Equivalent Transfer Values.", href: "/cetv-explained-divorce-uk", badge: "Guide" },
  { title: "Preview the Full Financial Report", description: "Model pension sharing in your full settlement.", href: "/unlock", badge: "Report" },
];

export default function PensionSharingCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Pension Sharing Calculator — Divorce UK"
      subtitle="Model the impact of different pension sharing percentages on overall asset distribution and long-term financial position. Compare pension sharing assumptions alongside property, savings, and income scenarios."
      documentTitle="Pension Sharing Calculator Divorce UK | DivorceCalculatorUK"
      metaDescription="Model pension sharing order percentages in UK divorce. Compare how different pension transfer assumptions affect asset distribution and long-term financial outcomes for both parties."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Pension Sharing Calculator — Divorce", href: "/pension-sharing-calculator-divorce" },
      ]}
    >
      <ContentSection>
        <Card className="border-amber-200 bg-amber-50 mb-6" data-testid="card-pension-advice-disclaimer">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">
              Pension values used in this calculator are not pension or financial advice. CETV figures are the scheme's estimated transfer value and may not fully reflect the economic value of defined benefit pension income. Independent actuarial or pension advice may be warranted for complex or large pension assets.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-how-sharing-works">
          How Pension Sharing Works
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          A pension sharing order specifies a percentage of the pension fund to be transferred. The key variables that affect the modelling outcome are the CETV, the transfer percentage, and how the transferred value interacts with the other assets in the settlement.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Card data-testid="card-cetv">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <PiggyBank className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">CETV input</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">The current CETV from the pension provider — the base figure for calculating the transfer amount under any percentage assumption.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-percentage">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <ArrowRightLeft className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Sharing percentage</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">The proportion to be transferred — anywhere from 1% to 100%. Different percentages can be modelled to compare their effect on overall asset distribution.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-net-effect">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Net distribution</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">How the transfer affects the overall asset pool allocation, combining pension, property, savings, and other assets for each party.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model pension sharing percentages" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-illustrative-example">
          Illustrative Example
        </h2>
        <Card data-testid="card-example">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-4">
              Party A pension CETV: £240,000 — Party B pension CETV: £30,000
            </p>
            <div className="space-y-3 text-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-1">No sharing (offsetting instead)</p>
                  <p className="text-muted-foreground text-xs">Party A keeps full £240k pension; Party B receives a larger share of property equity to compensate. Total pension disparity: £210k CETV.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">50% pension sharing order</p>
                  <p className="text-muted-foreground text-xs">Party A pension after order: £120k CETV. Party B pension after order: £30k + £120k received = £150k CETV. Pension gap substantially reduced.</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">Illustrative only. CETVs for defined benefit pensions may understate true economic value. These figures do not constitute pension advice.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
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
