import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "If my ex received inheritance after we separated, can I claim it?",
    answer: "Inheritance received after a clear separation date is more likely to be excluded from the matrimonial pot — but courts have discretion. If no clean break order exists, financial claims remain open. A clean break consent order provides permanent protection against future claims.",
  },
  {
    question: "Does keeping inheritance in a separate account protect it?",
    answer: "Keeping inherited funds in a sole account that was never mixed with joint funds provides a stronger argument for ring-fencing — particularly in shorter marriages. However, courts consider all circumstances and there is no absolute protection.",
  },
  {
    question: "What is 'mingling' of inheritance funds?",
    answer: "Mingling refers to mixing inherited funds with joint matrimonial funds — for example, paying inheritance into a joint account, using it to pay off the joint mortgage, or investing it in joint assets. Once funds are mingled, it becomes very difficult to argue they are non-matrimonial.",
  },
  {
    question: "Is future expected inheritance taken into account?",
    answer: "Courts can take into account expected inheritance under Section 25 of the Matrimonial Causes Act 1973 as a financial resource — but they are cautious about speculative future inheritances. A clear and imminent expected inheritance is more likely to be relevant than a distant or uncertain one.",
  },
];

const relatedPages = [
  { title: "Can My Ex Claim My Inheritance in UK Divorce?", description: "When your ex can and cannot claim your inheritance.", href: "/can-ex-claim-inheritance-uk-divorce", badge: "Assets" },
  { title: "How Are Savings Split in Divorce UK?", description: "How courts treat pre-marital savings and gifts alongside matrimonial savings.", href: "/how-are-savings-split-in-divorce-uk", badge: "Assets" },
  { title: "What is a Clean Break Order UK?", description: "How to permanently close all financial claims after divorce.", href: "/what-is-a-clean-break-order-uk", badge: "Legal Orders" },
];

export default function InheritanceSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Is Inheritance Included in Divorce Settlement UK?"
      subtitle="Courts in England and Wales can include inheritance in a divorce settlement, but they do not do so automatically. The answer depends on when it was received, how it was used, the length of your marriage, and financial need."
      documentTitle="Is Inheritance Included in Divorce Settlement UK? | DivorceCalculatorUK"
      metaDescription="Find out whether inheritance is included in a UK divorce settlement. Learn the legal framework, when inheritance can be ring-fenced, and when courts include it."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Is Inheritance Included in Divorce Settlement UK?", href: "/is-inheritance-included-in-divorce-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Courts in England and Wales can include inheritance in a divorce settlement, but they do not do so automatically. The Matrimonial Causes Act 1973, Section 25, gives courts very wide powers. It requires them to consider 'all the circumstances' when deciding a financial settlement. Inheritance is specifically mentioned as a resource that courts can take into account — but so is the history of how assets were obtained.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">The Legal Framework</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">The starting principle is that matrimonial assets — built up during the marriage from the efforts of either spouse — are shared equally. Non-matrimonial assets (including inheritance) may be excluded, but this is not guaranteed.</p>

        <div className="space-y-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-semibold">Long marriages</p>
              <p className="text-sm text-muted-foreground">In a long marriage, the distinction between matrimonial and non-matrimonial assets tends to erode over time. Courts are more likely to treat an inheritance received 15 years into a 20-year marriage as part of the overall matrimonial pot, particularly if it was used for joint benefit.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-semibold">Where the inheritance was 'mingled' with joint funds</p>
              <p className="text-sm text-muted-foreground">If you inherited money and paid it into a joint account, used it to pay off the joint mortgage, or invested it in the family home, it has almost certainly become a matrimonial asset. Courts look at whether the inheritance retained its separate identity — if it is mixed with joint funds, ring-fencing becomes very difficult.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-semibold">Where financial need requires it</p>
              <p className="text-sm text-muted-foreground">If meeting the other party's reasonable financial needs — particularly housing needs for a parent with children — cannot be achieved without including the inheritance, courts may do so. The needs of the financially weaker party, especially where children are involved, can override the argument for protecting an inheritance.</p>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">When Inheritance Is More Likely to Be Protected</h2>
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg border bg-background">
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Short marriages</p>
            </div>
            <p className="text-sm text-muted-foreground">In a short marriage (broadly under 5 years), courts are more willing to return each party to their pre-marital financial position. An inheritance received before or during a short marriage that was kept entirely separate has a stronger argument for ring-fencing.</p>
          </div>
          <div className="p-4 rounded-lg border bg-background">
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Inherited property kept entirely separate</p>
            </div>
            <p className="text-sm text-muted-foreground">If you inherited a property, kept it in your sole name, never used it for joint purposes, and your marriage was of medium or shorter length, you have a reasonable argument that it is non-matrimonial. The key is that it was never 'merged' into the marital finances.</p>
          </div>
          <div className="p-4 rounded-lg border bg-background">
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Very recent inheritances</p>
            </div>
            <p className="text-sm text-muted-foreground">An inheritance received close to or after separation is more likely to be treated as a personal asset rather than a matrimonial one — particularly if the couple had already separated when it was received.</p>
          </div>
        </div>
        <InlineCTA label="Model Your Settlement Including Inheritance" />
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
