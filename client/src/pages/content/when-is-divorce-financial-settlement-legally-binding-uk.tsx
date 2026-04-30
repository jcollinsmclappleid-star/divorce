import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const stages = [
  { title: "Verbal agreement", legal: false, desc: "Not legally binding at all. Either party can walk away at any time." },
  { title: "Written agreement between parties", legal: false, desc: "Not legally binding. A written document signed by both parties is evidence of agreement but does not constitute a court order." },
  { title: "Solicitors' correspondence agreeing terms", legal: false, desc: "Not legally binding as a financial order. Evidence of the agreement but can be resiled from — this has been confirmed repeatedly by courts." },
  { title: "Consent order approved by the court", legal: true, desc: "Legally binding. Once approved, it is a court order with full enforcement powers." },
  { title: "Financial Remedy Order made by a judge", legal: true, desc: "Legally binding. A judge's final decision is immediately effective as a court order." },
];

const faqItems = [
  {
    question: "Is a solicitor's 'heads of terms' document legally binding?",
    answer: "No. Heads of terms summarise the agreed terms but are not a consent order. They need to be converted into a formal consent order and approved by the court to become legally binding. Until that point, either party could change their position.",
  },
  {
    question: "What if we both signed an agreement but did not submit it to court?",
    answer: "The agreement remains non-binding. Either party can apply to court for a different settlement. However, courts do take signed agreements into account and will want to understand why one party wants to depart from what was agreed. Significant cost orders may be made if a party backs out unreasonably.",
  },
  {
    question: "When does the consent order take effect?",
    answer: "A consent order takes effect from the date it is made by the court (i.e., approved by the judge). Different provisions within the order may take effect at different times — for example, a pension sharing order takes effect when sent to the pension provider; a property transfer takes effect on completion of the legal transfer.",
  },
  {
    question: "Can I change my mind after a consent order is approved?",
    answer: "Very rarely. Once approved, a consent order can only be set aside on very limited grounds — fraud, non-disclosure, Barder events. You cannot change your mind because you regret the terms or think you could have done better.",
  },
];

const relatedPages = [
  { title: "What is a Consent Order in UK Divorce?", description: "How a consent order works and what the approval process involves.", href: "/what-is-a-consent-order-uk-divorce", badge: "Legal Orders" },
  { title: "Can I Divorce Without a Financial Settlement UK?", description: "Why informal agreements are insufficient legal protection.", href: "/can-i-divorce-without-financial-settlement-uk", badge: "Process" },
  { title: "Can I Reopen a Divorce Settlement UK?", description: "The limited circumstances where a final order can be challenged.", href: "/can-i-reopen-divorce-settlement-uk", badge: "Legal" },
  { title: "Preview the Full Financial Report", description: "Model your settlement before it becomes final.", href: "/unlock", badge: "Report" },
];

export default function LegallyBindingSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="When is a Divorce Financial Settlement Legally Binding UK?"
      subtitle="A divorce financial settlement is only legally binding when a court approves it as a consent order. An informal agreement, a written document, or even a solicitor's letter is not enough."
      documentTitle="When is a Divorce Financial Settlement Legally Binding UK? | DivorceCalculatorUK"
      metaDescription="Understand exactly when a divorce financial settlement becomes legally binding in England and Wales — and why anything short of a court-approved consent order is not sufficient."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "When is a Divorce Financial Settlement Legally Binding UK?", href: "/when-is-divorce-financial-settlement-legally-binding-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This is one of the most misunderstood aspects of UK divorce law. Many people believe that because they have agreed with their spouse, signed something, or had solicitors exchange letters, the settlement is done. It is not. In England and Wales, a financial settlement is only legally binding when a court has approved it in the form of a consent order (or a judge has imposed it as a financial remedy order).
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What Makes an Agreement Legally Binding?</h2>
        <div className="space-y-3 mb-6">
          {stages.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
              {s.legal ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold">{s.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.legal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {s.legal ? 'Legally binding' : 'NOT legally binding'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">The Consent Order Process</h2>
        <p className="text-muted-foreground text-sm mb-4">To make your settlement legally binding, the following must happen:</p>
        <div className="space-y-3 mb-6">
          {[
            "Both parties complete full financial disclosure (Form D81 — Statement of Information)",
            "A solicitor drafts the consent order in the correct legal format",
            "Both parties sign the consent order",
            "The signed consent order and Form D81 are submitted to the Family Court",
            "A judge reviews the paperwork and confirms it is fair and appropriate",
            "The judge approves the consent order — it becomes a binding court order from that date",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-background">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <p className="text-sm text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">This process typically takes 4–8 weeks from submission. There is a court fee of £53. You do not need to attend court — the judge considers the paperwork without a hearing in most cases. The process is designed to be accessible and most applications are approved without difficulty where the terms are reasonable.</p>
            </div>
          </CardContent>
        </Card>

        <InlineCTA label="Understand Your Settlement Before Formalising It" />
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
