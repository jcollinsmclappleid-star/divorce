import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Pension sharing order — clean break, separate benefits", desc: "A percentage of the member's CETV is transferred to the receiving party as their own pension benefit. The receiving party gets a separate pot they control independently. Most settlements use sharing orders." },
  { title: "Pension attachment order — share of payments", desc: "Also called 'earmarking'. When the member's pension comes into payment, a defined share is paid to the receiving party. The benefit remains the member's; the receiving party only gets paid when (and if) the member draws the pension." },
  { title: "Attachment ties the parties together", desc: "Attachment orders prevent a clean break. The receiving party depends on the member to draw the pension and stays tied to them financially for life. They also typically end on the receiving party's remarriage or the member's death." },
  { title: "Sharing achieves a clean break", desc: "Sharing creates two independent pension benefits. Each party can draw their share at the appropriate retirement age, regardless of what the other does. There are no remarriage forfeiture provisions for the share." },
  { title: "Sharing dominates modern practice", desc: "Pension sharing was introduced in 2000 and quickly became the standard. Attachment orders are now rare and usually only considered where sharing is unavailable (e.g. some overseas schemes) or where there are very specific tactical reasons." },
  { title: "Both require a court order", desc: "Both pension sharing orders and attachment orders are made by the court as part of the financial remedy process. Both must be served on the pension scheme. Both can be made by consent or after a contested hearing." },
];

const figures = [
  "Latest CETV statement",
  "Scheme rules — does the scheme accept sharing orders?",
  "Member's age and normal pension age",
  "Receiving party's age and current pension provision",
  "Whether the receiving party is likely to remarry",
  "Tax position of both parties (pension income tax)",
  "Whether the pension is in payment or deferred",
  "Survivor benefit terms in the scheme",
];

const faqItems = [
  { question: "What's the difference between a pension sharing order and an attachment order?", answer: "A pension sharing order transfers a percentage of the pension to the receiving party as their own benefit — a clean break. An attachment order earmarks a share of the member's pension to be paid to the receiving party when the pension comes into payment — keeping the parties tied together financially. Sharing is now the standard; attachment is rare." },
  { question: "Why is pension sharing usually preferred?", answer: "Because it creates a clean break. The receiving party has their own pension benefit they control; they do not depend on the member to draw the pension; remarriage does not forfeit the benefit; and on the member's death they keep their share rather than losing future payments. Sharing is generally more certain than attachment." },
  { question: "When is an attachment order used?", answer: "Rarely. Attachment may be considered where the pension scheme is overseas and does not accept UK pension sharing orders, where there are very specific tax or scheme-rule advantages, or where the parties want to delay any change of benefit ownership for personal reasons. In most cases sharing is preferable." },
  { question: "Can attachment orders include lump sums?", answer: "Yes. An attachment order can apply to the member's pension income, the tax-free lump sum at retirement, or both. Lump sum attachment orders end on the receiving party's death and are usually replaced in modern practice by lump sum payments out of the matrimonial pot." },
  { question: "What happens to an attachment order if my ex remarries?", answer: "Attachment orders for pension income typically end on the receiving party's remarriage. This is a major reason why attachment is now rarely used — the receiving party loses those payments permanently if they remarry. Pension sharing has no equivalent forfeiture." },
  { question: "Can we mix sharing and attachment in one settlement?", answer: "Theoretically yes — different orders can apply to different schemes — but it is uncommon. Most modern financial settlements use pension sharing for all relevant pensions, with attachment reserved for unusual cases where sharing is unavailable." },
];

const relatedPages = [
  { title: "Pension Sharing vs Offsetting UK", description: "Choosing between sharing and offsetting.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "CETV Explained Divorce UK", description: "How pensions are valued for sharing.", href: "/cetv-explained-divorce-uk", badge: "Pensions" },
  { title: "Final Salary Pension on Divorce UK", description: "DB pensions and sharing orders.", href: "/final-salary-pension-on-divorce-uk", badge: "Pensions" },
  { title: "Preview the Full Financial Report", description: "Model pension order options.", href: "/unlock", badge: "Report" },
];

export default function PensionAttachmentVsSharingPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Pension Attachment Order vs Pension Sharing Order UK"
      subtitle="The two pension orders available in UK divorce work very differently. Sharing creates a clean break with separate benefits. Attachment ties the parties together financially for life. Sharing is now the standard."
      documentTitle="Pension Attachment vs Sharing Order UK | DivorceCalculatorUK"
      metaDescription="Pension attachment order vs pension sharing order UK explained. Clean break sharing, attachment earmarking, remarriage forfeiture, and why sharing dominates modern practice."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Pension Attachment vs Sharing Order UK", href: "/pension-attachment-order-vs-sharing-order-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          UK divorce law provides two distinct types of pension order: pension sharing orders (introduced in 2000) and pension attachment orders (also called 'earmarking', dating from the 1990s). They work in fundamentally different ways. Sharing creates a clean break by transferring a percentage of the CETV to the receiving party as their own benefit. Attachment leaves the pension with the member but earmarks a share of payments when they begin. Sharing is now the standard route in nearly all cases — but the distinction still matters where attachment crops up.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Attachment orders typically end on the receiving party's remarriage and on the member's death — major risks that pension sharing avoids entirely. Where sharing is available, it is almost always the better choice.</p>
          </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things to Know About the Two Orders</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <PiggyBank className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Pension Order Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Will Need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {figures.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Remarriage forfeiture risk", desc: "Attachment for income ends if the receiving party remarries — even decades after the divorce. This is a permanent loss with no compensation. Sharing has no equivalent risk." },
            { label: "Member's lifestyle controlling outcomes", desc: "Under attachment the receiving party only gets paid if/when the member draws the pension. Choices about retirement age, drawdown vs annuity, and even continued employment all affect when (and how much) the receiving party gets." },
            { label: "Dependence on member's survival", desc: "Attachment for pension income typically ends on the member's death. The receiving party may be left with nothing after years of expectation. Sharing creates an independent benefit unaffected by the member's death." },
            { label: "Overseas pensions", desc: "Some overseas schemes do not recognise UK pension sharing orders. Where a UK divorce involves an overseas pension, attachment may be the only available route — and the limitations need to be carefully understood." },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <p className="text-sm font-semibold mb-1">{p.label}</p>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the Calculator Cannot Decide</h2>
        <div className="space-y-3 mb-6">
          {[
            "Whether sharing or attachment is right for your specific scheme",
            "Whether the receiving party's circumstances make remarriage forfeiture a real risk",
            "How an overseas pension should be addressed in your settlement",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Does the scheme accept pension sharing orders?</li>
          <li>Are there any reasons to prefer attachment over sharing?</li>
          <li>What happens to the receiving party's benefit on remarriage or member's death?</li>
          <li>Are there overseas pensions that need a different approach?</li>
          <li>How is the member's pension drawdown choice protected if attachment is used?</li>
        </ul>
        <InlineCTA label="Compare Settlement Scenarios" />
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
