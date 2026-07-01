import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const steps = [
  { step: "1", title: "Reach agreement", desc: "Both parties agree on terms through solicitor negotiation, mediation, or direct discussion." },
  { step: "2", title: "Instruct a solicitor to draft the order", desc: "A consent order must be drafted in the correct legal format. Both parties should ideally have independent legal advice before signing." },
  { step: "3", title: "Submit to court with Form D81", desc: "The consent order is submitted to the Family Court along with a Statement of Information (Form D81). You do not need to attend court for this." },
  { step: "4", title: "Court approves the order", desc: "A judge reviews the paperwork. If satisfied the order is fair and reasonable, they approve it — typically within 4–8 weeks." },
];

const includes = [
  "Property division — who gets the family home and on what terms",
  "Mortgage transfers or sale of property",
  "Pension sharing or pension attachment orders",
  "Lump sum payments between the parties",
  "Spousal maintenance (including how long it will be paid)",
  "A clean break clause — preventing any further financial claims",
  "Child-related financial arrangements (where appropriate)",
];

const faqItems = [
  {
    question: "How much does a consent order cost in the UK?",
    answer: "Solicitor-drafted consent orders typically cost £500–£2,000 including legal fees. Some online services offer simpler consent orders more cheaply. There is also a court fee of £53 when submitting.",
  },
  {
    question: "Can I write my own consent order?",
    answer: "You can attempt to draft your own, but it must be in the exact legal format required by the court. Any errors may mean it is rejected. Given the sums at stake, professional drafting is important to consider.",
  },
  {
    question: "Can a consent order be changed after it is approved?",
    answer: "Very rarely. Once approved by the court, a consent order can only be set aside on very limited grounds — such as fraud, material non-disclosure, or a fundamental change in circumstances that the order did not anticipate. It is not possible to simply change your mind.",
  },
  {
    question: "Do I need a consent order if we have already agreed everything?",
    answer: "Yes. An agreement between the parties, even a written one, is not legally binding in divorce financial matters. Only a court-approved consent order provides the protection you need.",
  },
  {
    question: "What if my ex refuses to comply with the consent order?",
    answer: "You can return to court to enforce the order. Courts have various powers of enforcement including charging orders, attachment of earnings orders, and committal for contempt of court in serious cases.",
  },
];

const relatedPages = [
  { title: "What is a Clean Break Order UK?", description: "How to permanently end all financial ties after divorce.", href: "/what-is-a-clean-break-order-uk", badge: "Legal Orders" },
  { title: "When is a Divorce Financial Settlement Legally Binding?", description: "Understand exactly when your agreement becomes enforceable.", href: "/when-is-divorce-financial-settlement-legally-binding-uk", badge: "Legal" },
  { title: "Financial Disclosure in UK Divorce", description: "What you must disclose before a consent order can be approved.", href: "/financial-disclosure-divorce-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Understand what your consent order should cover financially.", href: "/unlock", badge: "Report" },
];

export default function ConsentOrderPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="What is a Consent Order in UK Divorce?"
      subtitle="A consent order is the legal document that turns your financial agreement into an enforceable court order. Without one, your settlement has no legal force — and future claims remain open."
      documentTitle="What is a Consent Order in UK Divorce? A Plain-English Guide | DivorceCalculatorUK"
      metaDescription="Learn what a consent order is in UK divorce, why you need one, what it covers, and how to get one approved by the Family Court in England and Wales."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "What is a Consent Order in UK Divorce?", href: "/what-is-a-consent-order-uk-divorce" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A consent order is a legally binding court document that formally records your financial agreement with your spouse following divorce. In England and Wales, a consent order is the mechanism that turns a private agreement into an enforceable court order. Without one, your financial settlement has no legal force, and your ex-spouse could make further financial claims against you in the future.
        </p>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-primary mb-2">Why a Consent Order is Necessary</p>
            <p className="text-sm text-muted-foreground">Many couples agree on how to divide their finances without going to court — and that is a good outcome. But an agreement made between solicitors, written down in correspondence, or even signed by both parties is <strong>not legally binding</strong> in the context of divorce law. Only a court-approved consent order creates the legal certainty needed to prevent future financial claims after divorce.</p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What Does a Consent Order Include?</h2>
        <ul className="space-y-2 mb-6">
          {includes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">How to Get a Consent Order: Four Steps</h2>
        <div className="space-y-4 mb-6">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-4 p-4 bg-background rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                {s.step}
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 bg-background rounded-lg border mb-4">
          <p className="text-sm font-semibold mb-2">Real-World Example</p>
          <p className="text-sm text-muted-foreground">Rachel and Ben agree that their marital home will be sold and proceeds split 55/45 in Rachel's favour, reflecting her primary care of their daughter. Ben's pension will be shared (a 30% transfer to Rachel). No spousal maintenance will be paid — they both work full-time. Their solicitors draft a consent order capturing these terms. The court approves it. The pension sharing order is sent to the pension provider. The property is then sold and proceeds divided. Neither party can make further financial claims.</p>
        </div>

        <InlineCTA label="Model Your Settlement Before Drafting" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Consent Order vs Court Order: What's the Difference?</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">A consent order is agreed by both parties and submitted to court. A court order (also called a Financial Remedy Order) is imposed by a judge after contested proceedings where the parties could not agree. Both are equally legally binding once approved or made by the court — the difference is how you got there.</p>

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
