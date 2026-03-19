import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Shield, AlertTriangle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Is there a 5-year time limit on financial claims after divorce?",
    answer: "No — there is no 5-year limit. This is a common myth. In England and Wales, financial claims after divorce have no statutory time limit. The Wyatt v Vince case (2015) confirmed that claims can be made more than 20 years after a divorce if no clean break order has been made.",
  },
  {
    question: "Does time passing weaken a financial claim?",
    answer: "Yes — delay is a factor courts consider. The longer the period between divorce and a financial application, the harder it typically becomes to succeed. Courts look at why the claim was not made earlier and whether the delay is prejudicial. However, delay alone does not extinguish a claim.",
  },
  {
    question: "What if I am the one making a late claim?",
    answer: "If you did not make a financial application at the time of divorce and want to now, you must obtain permission (leave) from the court to proceed out of time. The court will consider the reason for delay, the strength of the claim, and whether it would be just to allow it to proceed.",
  },
  {
    question: "Does the clean break protect against child maintenance claims too?",
    answer: "No. Child maintenance can never be permanently barred through a clean break order — the Child Maintenance Service can always be applied to. The clean break protects only financial claims between the former spouses themselves.",
  },
];

const relatedPages = [
  { title: "Can I Divorce Without a Financial Settlement UK?", description: "Why divorcing without a financial order leaves you permanently exposed.", href: "/can-i-divorce-without-financial-settlement-uk", badge: "Process" },
  { title: "What is a Clean Break Order UK?", description: "The most effective protection against future financial claims.", href: "/what-is-a-clean-break-order-uk", badge: "Legal Orders" },
  { title: "Can I Reopen a Divorce Settlement UK?", description: "The grounds on which settled cases can be challenged.", href: "/can-i-reopen-divorce-settlement-uk", badge: "Legal" },
];

export default function FinancialClaimsAfterDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="How Long After Divorce Can Financial Claims Be Made UK?"
      subtitle="There is no time limit on financial claims after divorce in England and Wales. Claims can be made years or even decades later — unless a clean break consent order is in place. This is one of the most important facts about UK divorce law."
      documentTitle="How Long After Divorce Can Financial Claims Be Made UK? | DivorceCalculatorUK"
      metaDescription="Find out the time limits on financial claims after divorce in England and Wales — why there is no statutory limit without a clean break order, and how to protect yourself."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "How Long After Divorce Can Financial Claims Be Made UK?", href: "/how-long-after-divorce-can-financial-claims-be-made-uk" },
      ]}
    >
      <ContentSection>
        <Card className="border-red-200 bg-red-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800 mb-1">The Short Answer</p>
                <p className="text-sm text-red-700">Without a clean break consent order, financial claims can be made indefinitely — there is no time limit in English law. The only certain protection is a court-approved clean break consent order that permanently dismisses all claims.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-muted-foreground leading-relaxed mb-6">
          English divorce law does not impose a limitation period on financial applications between former spouses. Section 23, 24, and 25 of the Matrimonial Causes Act 1973 allows either party to apply for financial orders at any time after the divorce is finalised — unless those claims have been formally dismissed by a court order.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Real-World Example: Wyatt v Vince [2015]</h2>
        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground">Kathleen Wyatt and Dale Vince divorced in 1992. Both were penniless. No financial order was made. Over the following years, Vince became a multimillionaire through his green energy business. In 2011 — 19 years after the divorce — Wyatt applied for a financial settlement. The case reached the Supreme Court, which ruled she had the right to proceed with her claim despite the extraordinary delay. The case highlighted that the risk of future financial claims is real and permanent without a clean break order.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">The Impact of Delay on Claims</h2>
        <p className="text-muted-foreground text-sm mb-4">Although there is no time limit, delay is not irrelevant. Courts consider:</p>
        <div className="space-y-3 mb-6">
          {[
            { icon: Clock, title: "Why no claim was made at the time", desc: "Was there a good reason for not applying? Were the parties genuinely without assets then? Did they informally agree?" },
            { icon: Clock, title: "What has changed", desc: "Has the applicant's need increased? Has the other party's wealth grown substantially?" },
            { icon: Clock, title: "Prejudice from delay", desc: "Has the other party reorganised their affairs reasonably assuming the relationship was financially concluded? Have they remarried? Do they have other dependants?" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-background">
              <item.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-0.5">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">The Only Certain Solution: A Clean Break Consent Order</h2>
        <div className="flex items-start gap-3 p-4 rounded-lg border bg-background mb-6">
          <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">A clean break consent order, approved by the Family Court, permanently dismisses all financial claims between the parties. Once made, neither party can ever make further claims — regardless of how much time passes or how much either party's fortunes change. This is the only definitive protection.</p>
        </div>

        <InlineCTA label="Understand Your Settlement Before It's Too Late" />
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
