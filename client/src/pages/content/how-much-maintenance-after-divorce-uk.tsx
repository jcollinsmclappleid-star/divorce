import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Banknote, Scale, Clock } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const factors = [
  "The recipient's monthly income needs — all reasonable outgoings including housing, bills, food, transport, childcare",
  "The recipient's actual income and earning capacity",
  "The payer's income and their own reasonable monthly needs",
  "The length of the marriage and the standard of living established",
  "Any career sacrifices made during the marriage and how long to recover earning capacity",
  "Age and health of both parties",
  "Whether there are children and childcare responsibilities that affect earning capacity",
];

const faqItems = [
  {
    question: "Is there a formula for calculating spousal maintenance in the UK?",
    answer: "No. Unlike child maintenance (which uses the CMS formula), spousal maintenance has no fixed formula. It is calculated based on needs and resources in each specific case. Courts exercise broad discretion.",
  },
  {
    question: "How long does spousal maintenance last?",
    answer: "Courts prefer a clean break where possible, so maintenance is increasingly ordered for a fixed term rather than for life. Terms typically range from 2–7 years, giving the recipient time to become financially independent. In longer marriages where the recipient cannot realistically become fully self-sufficient (e.g. due to age or health), longer terms or joint-life maintenance may be appropriate.",
  },
  {
    question: "Can maintenance be varied after it is ordered?",
    answer: "Yes — periodical payments (maintenance) orders can be varied if there is a material change in circumstances for either party. Either party can apply to vary — upwards if need increases, downwards if the payer's income falls or the recipient's income rises.",
  },
  {
    question: "What happens to maintenance if I remarry?",
    answer: "Spousal maintenance automatically ends on the recipient's remarriage. If you are the recipient, remarrying ends the maintenance order. The payer does not need to apply to court — the obligation ceases automatically.",
  },
  {
    question: "Can maintenance be exchanged for a capital payment instead?",
    answer: "Yes — this is a common approach called 'capitalisation' of maintenance. The present value of the maintenance stream is calculated and a lump sum is paid instead. This achieves a clean break while compensating the lower earner. A specialist report by a forensic accountant typically calculates the appropriate capitalised figure.",
  },
];

const relatedPages = [
  { title: "Child Maintenance vs Spousal Maintenance UK", description: "Understanding the difference between these two types of payments.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
  { title: "Divorce Where One Earns More UK", description: "How income inequality shapes the financial settlement.", href: "/divorce-where-one-earns-more-uk", badge: "Income" },
  { title: "Divorce Financial Settlement Calculator UK", description: "Model post-divorce income including maintenance for both parties.", href: "/divorce-financial-settlement-calculator-uk", badge: "Calculator" },
  { title: "Preview the Full Financial Report", description: "Model maintenance amounts and cashflow impact.", href: "/unlock", badge: "Report" },
];

export default function MaintenanceAmountPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="How Much Maintenance After Divorce UK?"
      subtitle="Spousal maintenance has no formula in English law — it is calculated based on needs and resources. Understanding how courts approach the calculation helps you negotiate effectively and plan your finances."
      documentTitle="How Much Maintenance After Divorce UK? | DivorceCalculatorUK"
      metaDescription="Understand how spousal maintenance amounts are calculated after divorce in England and Wales — the needs and resources test, typical amounts, duration, and how maintenance can be varied."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "How Much Maintenance After Divorce UK?", href: "/how-much-maintenance-after-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Spousal maintenance (also called periodical payments) is income paid by the higher-earning spouse to the lower-earning spouse after divorce. Unlike child maintenance, there is no formula — courts exercise broad discretion based on the specific circumstances of each case, particularly the recipient's needs and the payer's ability to pay.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How Courts Calculate the Amount</h2>
        <p className="text-muted-foreground text-sm mb-4">The starting point is a budget exercise:</p>
        <div className="p-4 rounded-lg border bg-primary/5 mb-4">
          <p className="text-sm font-mono text-muted-foreground">Maintenance = Recipient's reasonable monthly needs − Recipient's monthly income (after tax)</p>
        </div>
        <p className="text-sm text-muted-foreground mb-4">But this is subject to the payer being able to afford the payment after meeting their own reasonable needs — and courts consider much more than just the raw budget:</p>
        <ul className="space-y-2 mb-6">
          {factors.map((f, i) => (
            <li key={i} className="flex items-start gap-2 p-3 rounded-lg border text-sm text-muted-foreground">
              <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative Maintenance Scenarios</h2>
        <div className="space-y-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Short marriage, both working</p>
              </div>
              <p className="text-sm text-muted-foreground">Three-year marriage, no children, both employed. Clean break likely. Maintenance may not be ordered at all — any imbalance addressed through capital.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Medium marriage, one parent took career break</p>
              </div>
              <p className="text-sm text-muted-foreground">10-year marriage, two children, primary carer earning £24,000 part-time. Higher earner on £65,000. Illustrative maintenance: £800–1,200/month for a fixed term of 3–5 years, reducing as children become more independent and earning capacity recovers.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Long marriage, significant career sacrifice</p>
              </div>
              <p className="text-sm text-muted-foreground">25-year marriage, recipient gave up professional career to raise children and support partner's career. Now aged 55 with very limited earning capacity. Higher earner on £120,000. Illustrative maintenance: £2,000–3,000/month with longer term or joint-life order. Clean break likely unachievable without capitalisation.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <Banknote className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">These are illustrative figures only — actual maintenance is determined by the specific facts of each case. A divorce financial modeller can help you project post-divorce income, understand the realistic income gap, and see what maintenance payment would be needed to bridge it.</p>
            </div>
          </CardContent>
        </Card>

        <InlineCTA label="Model Post-Divorce Income Including Maintenance" />
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
