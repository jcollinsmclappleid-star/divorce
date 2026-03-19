import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Scale } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const grounds = [
  { title: "Material non-disclosure or fraud", desc: "If one party concealed assets or provided false information at the time of the settlement, the consent order can be set aside. This is the most common ground for reopening. The deception must be material — i.e. it would have made a difference to the settlement outcome." },
  { title: "Fundamental change in circumstances (Barder events)", desc: "Following the House of Lords case Barder v Barder [1988], a consent order can be challenged where a fundamental supervening event has occurred that makes it manifestly unjust to uphold the original order. This must be unforeseeable and must have occurred shortly after the order." },
  { title: "Undue influence or duress", desc: "If one party was pressured into signing the consent order without genuinely free consent, the order may be challenged. This requires clear evidence of undue pressure — regret alone is not sufficient." },
  { title: "Failure of the basis of the order", desc: "If the consent order was made on the basis of a fundamental assumption that has since proved incorrect, and the assumption was shared by both parties, there may be grounds to challenge." },
];

const faqItems = [
  {
    question: "Can I reopen a settlement if my ex has won the lottery?",
    answer: "This depends on timing. The Barder principle requires the supervening event to be unforeseeable and to occur shortly after the order. A lottery win years after a final order is very unlikely to be grounds to reopen. However, if the lottery win occurred within months of the order and dramatically changes the position, there may be grounds. Each case turns on its specific facts.",
  },
  {
    question: "My ex hid assets — can I reopen the settlement years later?",
    answer: "Yes, potentially. There is no absolute time limit for challenging a consent order on grounds of fraud or non-disclosure. However, delay in bringing the application weakens it — act as quickly as possible once you discover the concealment. The concealment must have been material — i.e. it would have led to a different settlement.",
  },
  {
    question: "Can maintenance orders be varied?",
    answer: "Yes — periodical payments (maintenance) orders can be varied if there is a material change in circumstances. This applies to both increases and decreases. A clean break order cannot be varied, but a joint lives maintenance order can. This is a separate process from challenging the original consent order.",
  },
  {
    question: "What if I simply agreed to a bad deal?",
    answer: "Regret, or the realisation that you agreed to unfavourable terms, is not grounds to set aside a consent order. Courts place great weight on the finality of agreed settlements. The system depends on parties being able to reach final resolutions without fear of reopening.",
  },
];

const relatedPages = [
  { title: "When is a Divorce Financial Settlement Legally Binding?", description: "When your agreement becomes final and enforceable.", href: "/when-is-divorce-financial-settlement-legally-binding-uk", badge: "Legal" },
  { title: "How Long After Divorce Can Financial Claims Be Made UK?", description: "Time limits (and lack of them) for financial claims after divorce.", href: "/how-long-after-divorce-can-financial-claims-be-made-uk", badge: "Legal" },
  { title: "Can I Hide Assets in Divorce UK?", description: "The consequences of non-disclosure — including reopening settlements.", href: "/can-i-hide-assets-in-divorce-uk", badge: "Disclosure" },
];

export default function ReopenDivorceSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Can I Reopen a Divorce Settlement UK?"
      subtitle="Once a consent order has been approved by the court, reopening it is extremely difficult. Courts strongly favour finality. But there are limited grounds — including fraud, non-disclosure, and Barder events — where challenge is possible."
      documentTitle="Can I Reopen a Divorce Settlement UK? | DivorceCalculatorUK"
      metaDescription="Understand when and how a divorce financial settlement can be reopened in England and Wales — fraud, Barder events, non-disclosure, and the limits of finality."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Can I Reopen a Divorce Settlement UK?", href: "/can-i-reopen-divorce-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Courts in England and Wales strongly favour the finality of divorce financial settlements. Once a consent order has been approved, both parties should be able to move forward with certainty. However, the law does recognise limited circumstances where it would be manifestly unjust to hold parties to an order — and provides grounds to challenge or set it aside.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Reopening a consent order is an exceptional remedy. Courts will not reopen settlements simply because one party is dissatisfied or got a poor deal. The threshold is high, and applications that fail often result in adverse cost orders against the applicant.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Grounds for Challenging a Consent Order</h2>
        <div className="space-y-4 mb-6">
          {grounds.map((g, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">{g.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{g.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Grounds That Are NOT Sufficient</h2>
        <ul className="space-y-2 mb-6">
          {[
            "Simply regretting the terms agreed",
            "Your financial position worsening after the order (unless this is a Barder-level event)",
            "Your ex becoming wealthier after the order (unless very shortly after and unforeseeable)",
            "Discovering that a different settlement would have been more favourable",
            "Changes in tax law or property values after the order",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <InlineCTA label="Get the Settlement Right Before It's Final" />
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
