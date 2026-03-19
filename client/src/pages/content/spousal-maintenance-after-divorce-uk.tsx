import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DollarSign, Clock } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const factors = [
  { label: "Length of the marriage", desc: "Longer marriages typically result in longer maintenance awards. Short marriages (under 5 years) often result in limited maintenance unless there are children." },
  { label: "Financial need of the recipient", desc: "Courts focus on what the receiving party needs to maintain a reasonable standard of living — based on reasonable outgoings, not the marital standard." },
  { label: "Ability to pay", desc: "The paying party must be able to afford the maintenance after meeting their own reasonable needs. Courts look at net income after tax and essential outgoings." },
  { label: "Child care responsibilities", desc: "Where the receiving party is the primary carer for children, maintenance is more likely to reflect the additional financial burden of care and reduced earning capacity." },
  { label: "Steps to become financially independent", desc: "Courts increasingly prefer time-limited maintenance to encourage both parties to become self-sufficient. A clean break is generally preferred where achievable." },
  { label: "Age and health", desc: "Older recipients or those with health conditions limiting employment may receive longer or more open-ended maintenance where a clean break is not realistic." },
];

const faqItems = [
  {
    question: "What is the difference between spousal maintenance and child maintenance?",
    answer: "Spousal maintenance (also called periodical payments) is paid by one ex-spouse to the other to meet their ongoing financial needs. Child maintenance is paid to support the children's living costs and is calculated by the Child Maintenance Service (CMS) based on a formula. These are separate payments and should not be confused — child maintenance is not a substitute for spousal maintenance.",
  },
  {
    question: "Does spousal maintenance end if I remarry?",
    answer: "Yes — spousal maintenance automatically ends on remarriage of the receiving party. It does not automatically end on cohabitation, but the paying party can apply to the court to vary or end the payments if the recipient is cohabiting with a new partner, as their financial needs may have changed.",
  },
  {
    question: "Can I get a clean break instead of maintenance?",
    answer: "A clean break order ends all future financial claims between the parties. Where one party needs income support, this is sometimes achieved through a capitalised lump sum payment (offsetting future maintenance into a one-off payment) rather than ongoing periodical payments. Whether this is possible depends on the assets available and the financial needs of both parties.",
  },
  {
    question: "Can spousal maintenance be changed after it is agreed?",
    answer: "Yes — either party can apply to the court to vary the maintenance if circumstances change significantly. Common reasons include the payer losing their job, the recipient's financial needs changing, or one party retiring. The court has wide discretion to vary, suspend, or capitalise maintenance at any time.",
  },
];

const relatedPages = [
  { title: "How Much Maintenance After Divorce?", description: "How courts calculate spousal maintenance — the factors, range, and duration.", href: "/how-much-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "Child Maintenance vs Spousal Maintenance", description: "The key differences between CMS child support and court-ordered spousal maintenance.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
  { title: "Clean Break Order UK", description: "How a clean break ends all future financial claims between parties.", href: "/what-is-a-clean-break-order-uk", badge: "Orders" },
];

export default function SpousalMaintenancePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Spousal Maintenance After Divorce UK: A Complete Guide"
      subtitle="Spousal maintenance — sometimes called periodical payments — is an ongoing payment from one former spouse to the other. Courts consider it when a clean break is not appropriate. Here is how it works."
      documentTitle="Spousal Maintenance After Divorce UK | DivorceCalculatorUK"
      metaDescription="Understand spousal maintenance after divorce in England and Wales — how it is calculated, how long it lasts, when it can be changed, and what a clean break alternative looks like."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Spousal Maintenance After Divorce UK", href: "/spousal-maintenance-after-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Spousal maintenance is an ongoing payment from one former spouse to the other, intended to meet the recipient's reasonable financial needs when they cannot achieve financial independence at the time of the settlement. It is separate from child maintenance and is ordered by the court (or agreed between the parties) as part of the financial settlement.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Key Factors Courts Consider</h2>
        <div className="space-y-3 mb-6">
          {factors.map((f, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-lg border">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold mb-1">{f.label}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Model Spousal Maintenance in the Settlement Calculator" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative Example</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Scenario: 12-year marriage, one partner has significantly higher income</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-primary" /><span>Paying party net income: £5,000/month — reasonable own outgoings: £2,800/month — surplus: £2,200/month</span></div>
              <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-primary" /><span>Receiving party net income: £1,200/month — reasonable outgoings: £2,200/month — shortfall: £1,000/month</span></div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /><span>Illustrative outcome: Courts may consider maintenance of around £1,000/month for a transitional period (e.g. 3–5 years) to allow the recipient to increase their own income through additional work or retraining.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">This is illustrative only. Actual outcomes depend heavily on the specific circumstances of each case.</p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Duration of Spousal Maintenance</h2>
        <div className="space-y-3 mb-6">
          {[
            { period: "Short-term maintenance", desc: "A fixed term (e.g. 2–5 years) to allow the recipient time to become financially independent. Increasingly preferred by courts." },
            { period: "Joint lives maintenance", desc: "Continues until one party dies or the recipient remarries. Now rare except in cases of long marriages where independence is genuinely not achievable." },
            { period: "Defined event maintenance", desc: "Continues until a specific trigger — e.g. until the youngest child reaches 18, or until the recipient completes a retraining course." },
          ].map((d, i) => (
            <div key={i} className="p-4 rounded-lg border text-sm">
              <p className="font-medium mb-1">{d.period}</p>
              <p className="text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>
        <InlineCTA label="Include Maintenance in Your Financial Settlement Model" />
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
