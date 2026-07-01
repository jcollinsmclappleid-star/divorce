import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrendingUp, AlertTriangle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const approaches = [
  { name: "Pension sharing order", desc: "A percentage of the pension fund is transferred to a new pension in the other spouse's name. Available for most pension types including occupational, personal, and SIPPs — but NOT the State Pension.", pros: ["Clean break", "Both parties have their own pension", "No ongoing financial link"], cons: ["Complex to implement for defined benefit schemes", "Requires pension fund valuation (CETV)", "Administration fees charged by pension provider"] },
  { name: "Pension attachment order (earmarking)", desc: "A portion of the pension income (when drawn) or lump sum is redirected to the other party. Available for court orders but rarely used.", pros: ["Possible for some types of pension", "No immediate transfer required"], cons: ["Not a clean break — depends on ex drawing pension", "Ends on remarriage of receiving party", "Pension holder controls when to retire"] },
  { name: "Pension offsetting", desc: "The pension is kept by one party but balanced by the other party receiving a larger share of a different asset — typically property.", pros: ["Simpler to implement", "No pension transfer required", "Useful when one party needs immediate housing"], cons: ["Pension and property are not directly comparable assets", "Tax treatment differs significantly", "Risk if other assets fall in value"] },
];

const faqItems = [
  {
    question: "How is the pension valued for divorce purposes?",
    answer: "Most pensions are valued using the Cash Equivalent Transfer Value (CETV) — the amount it would cost to transfer the pension to another provider. For defined contribution schemes this is broadly the fund value. For defined benefit (final salary) schemes, the CETV is a notional figure calculated by the scheme actuary. The CETV can significantly understate the real value of defined benefit pensions, so some financial advisers recommend an independent actuarial valuation.",
  },
  {
    question: "Can the State Pension be divided in divorce?",
    answer: "No — the State Pension cannot be shared or offset in divorce proceedings. However, it can be taken into account in the broader settlement. Since April 2016, each spouse's State Pension is calculated individually based on their own National Insurance record. You may be able to build up your NI record through NI credits during the marriage.",
  },
  {
    question: "Is pension offsetting suitable in every case?",
    answer: "Not necessarily. Property and pension have very different tax treatment: property is generally accessible now, while pension income is taxed in retirement. Offsetting £100,000 of pension against £100,000 of equity in the family home may not be an equal exchange in real terms. Pension sharing is often used where possible, but offsetting can still be appropriate after modelling both routes.",
  },
  {
    question: "Do I need a financial adviser for pension sharing?",
    answer: "For complex pensions — particularly defined benefit (final salary) pensions — advice from a pension specialist or independent financial adviser is important to consider. The CETV for a defined benefit pension can significantly undervalue the true benefit, and the actuarial complexities require expertise.",
  },
];

const relatedPages = [
  { title: "How Are Pensions Divided in Divorce?", description: "The full overview of pension sharing in UK divorce.", href: "/how-are-pensions-divided-in-divorce-uk", badge: "Pensions" },
  { title: "Divorce Pension Split Calculator", description: "Model pension sharing assumptions alongside your other assets.", href: "/divorce-pension-split-calculator-uk", badge: "Tool" },
  { title: "Divorce Financial Settlement Calculator", description: "Model the full financial settlement including pension.", href: "/divorce-financial-settlement-calculator-uk", badge: "Tool" },
  { title: "Preview the Full Financial Report", description: "Model pension offsetting against property in the calculator.", href: "/unlock", badge: "Report" },
];

export default function PensionOffsettingPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Pension Offsetting vs Pension Sharing in UK Divorce"
      subtitle="Pensions are often the most valuable asset in a divorce — sometimes worth more than the family home. Understanding the three approaches to dividing pensions is essential for reaching a fair settlement."
      documentTitle="Pension Offsetting vs Pension Sharing UK Divorce | DivorceCalculatorUK"
      metaDescription="Understand pension offsetting, pension sharing orders, and pension attachment in UK divorce — the key differences, pros, cons, and how courts decide which approach to use."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Pension Offsetting vs Pension Sharing UK Divorce", href: "/divorce-pension-offsetting-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          In England and Wales, all pension assets accumulated during the marriage — and sometimes before it — are considered by the court when deciding the financial settlement. Courts have three main tools for dealing with pensions: pension sharing orders, pension attachment orders, and pension offsetting. Each has different implications for both parties.
        </p>

        <Card className="bg-amber-50 border-amber-200 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Pension values at the time of valuation may not reflect their true long-term worth — particularly for defined benefit (final salary) pensions. The CETV can significantly understate the actual retirement income the pension would provide. Independent actuarial advice is commonly used for significant defined benefit pensions.</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">The Three Approaches Compared</h2>
        <div className="space-y-6 mb-6">
          {approaches.map((a, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <p className="font-semibold text-sm">{a.name}</p>
                </div>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-green-700 mb-1">Advantages</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {a.pros.map((p, j) => <li key={j}>• {p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-700 mb-1">Disadvantages</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {a.cons.map((c, j) => <li key={j}>• {c}</li>)}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Pension in the Settlement Calculator" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative Example: Offsetting vs Sharing</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Scenario: £400,000 family home (no mortgage) and a £300,000 CETV pension</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">Option A — Pension offsetting</p>
                <p>Party A keeps pension (CETV £300k) + £50k cash</p>
                <p>Party B keeps house (£400k) - £50k equity</p>
                <p className="text-xs text-amber-700 mt-2">Note: £300k pension ≠ £300k house equity in real terms due to tax and access differences</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Option B — Pension sharing</p>
                <p>House sold, proceeds split 50/50 (£200k each)</p>
                <p>Pension sharing order: 50% each (£150k CETV each)</p>
                <p className="text-xs text-green-700 mt-2">Clean break — each party builds their own post-divorce financial position</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <InlineCTA label="Try the Settlement Calculator with Your Own Figures" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentSection>
    </ContentPageLayout>
  );
}
