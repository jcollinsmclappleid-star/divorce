import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Clock } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const covers = [
  "Dismissal of all capital claims (property, savings, investments, inheritance)",
  "Dismissal of all income claims (spousal maintenance)",
  "Dismissal of all pension claims",
  "A bar on any future claims by either party",
];

const notCovers = [
  "Child maintenance — which is always variable regardless of any court order",
  "Financial arrangements already in place under the order",
];

const faqItems = [
  {
    question: "Can I get a clean break if my ex won't agree?",
    answer: "Courts can impose a clean break even if one party disagrees, if they are satisfied both parties can meet their needs independently. However, if one party genuinely cannot meet their needs without maintenance, a clean break may not be appropriate.",
  },
  {
    question: "Does a clean break order affect children?",
    answer: "No. Child maintenance is separate and always remains variable through the Child Maintenance Service. A clean break order only applies to financial claims between the former spouses.",
  },
  {
    question: "Is a clean break order always suitable?",
    answer: "Not necessarily. If there is a significant income gap, an immediate clean break may leave one party genuinely unable to meet their needs. In those cases, maintenance followed by a deferred clean break may need legal review.",
  },
  {
    question: "How does a clean break affect pensions?",
    answer: "A clean break order dismisses pension claims — meaning any pension the other party accrues after the order cannot be claimed. However, pension sharing orders already made as part of the settlement are not affected.",
  },
  {
    question: "Can I get a clean break if I am still paying maintenance?",
    answer: "Yes — through a deferred clean break. You can agree to pay maintenance for a fixed period, at the end of which the clean break takes effect and all future claims are dismissed.",
  },
];

const relatedPages = [
  { title: "What is a Consent Order in UK Divorce?", description: "How the consent order document works and what it includes.", href: "/what-is-a-consent-order-uk-divorce", badge: "Legal Orders" },
  { title: "Consent Order vs Clean Break Order UK", description: "Clear explanation of the difference between these two terms.", href: "/consent-order-vs-clean-break-order-uk", badge: "Legal" },
  { title: "Can I Divorce Without a Financial Settlement UK?", description: "Why divorcing without a settlement is financially dangerous.", href: "/can-i-divorce-without-financial-settlement-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Model whether a clean break is achievable in your situation.", href: "/unlock", badge: "Report" },
];

export default function CleanBreakOrderPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="What is a Clean Break Order UK?"
      subtitle="A clean break order permanently severs all financial links between former spouses. Once made, neither party can ever make further financial claims against the other."
      documentTitle="What is a Clean Break Order UK? | DivorceCalculatorUK"
      metaDescription="Understand what a clean break order is in UK divorce, what it covers, when it is possible, and why it is the most effective way to protect your financial future."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "What is a Clean Break Order UK?", href: "/what-is-a-clean-break-order-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A clean break order is a court order that permanently severs all financial links between former spouses. Once a clean break order is in place, neither party can make any further financial claims against the other — ever. In UK divorce law (England and Wales), a clean break order is the most effective way to protect yourself from future financial claims and to achieve genuine financial independence after your marriage ends.
        </p>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary mb-1">The Wyatt v Vince Warning</p>
                <p className="text-sm text-muted-foreground">The landmark case of Wyatt v Vince [2015] illustrates the risk perfectly. Kathleen Wyatt successfully argued she could make financial claims against Dale Vince more than 20 years after their divorce, as no clean break order had been made when the marriage ended. He had since become a millionaire. The case reached the Supreme Court. Without a clean break order, financial claims can be made years or even decades after divorce.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What a Clean Break Order Covers</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-semibold text-green-700">What It Covers</p>
              <ul className="space-y-2">
                {covers.map((c, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">What It Does NOT Cover</p>
              <ul className="space-y-2">
                {notCovers.map((c, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5">✗</span>
                    {c}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Immediate vs Deferred Clean Break</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">Immediate Clean Break</span>
              </div>
              <p className="text-sm text-muted-foreground">Possible when both parties are financially self-sufficient and any financial imbalance can be addressed through a capital payment or property adjustment. Common in shorter marriages where both parties work full-time.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">Deferred Clean Break</span>
              </div>
              <p className="text-sm text-muted-foreground">Where one party needs spousal maintenance for a period, a clean break can be deferred. Maintenance is paid for an agreed term (say, 3–5 years), after which the clean break takes effect automatically. Common in medium-length marriages with a career gap to recover from.</p>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground mb-4">A divorce financial settlement calculator can help you model whether a clean break is achievable — whether both parties can genuinely meet their needs from a capital settlement without ongoing maintenance. This calculation is the key to deciding between an immediate clean break and a deferred one.</p>

        <InlineCTA label="Model Whether a Clean Break Is Achievable" />
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
