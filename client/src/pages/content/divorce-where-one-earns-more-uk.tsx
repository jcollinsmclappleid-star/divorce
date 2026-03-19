import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, TrendingUp } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const factors = [
  "The income disparity itself — the higher earner will generally have more capacity to rehouse independently",
  "Why the disparity exists — did one party sacrifice career progression to support the family?",
  "The length of the marriage — a bigger income gap matters more in a longer marriage",
  "Whether the lower earner can increase their income through retraining or return to work",
  "The children's needs and who is the primary carer",
  "The standard of living established during the marriage",
];

const faqItems = [
  {
    question: "Does the higher earner always pay spousal maintenance?",
    answer: "Not always. Spousal maintenance is not automatic — it depends on need and ability to pay. In shorter marriages or where both parties work, courts may prefer a clean break. In longer marriages where one party has a significantly lower income and reduced earning capacity, maintenance is more commonly ordered.",
  },
  {
    question: "Can the higher earner keep their pension because they earned it?",
    answer: "Not necessarily. Pension accrued during the marriage is treated as matrimonial — the fact that one party earned more and therefore built a larger pension does not automatically mean they keep it all. Courts balance the overall settlement and pension sharing is common in longer marriages.",
  },
  {
    question: "If my spouse earns nothing, do they get half of everything?",
    answer: "The starting point is still equal sharing of matrimonial assets — regardless of who earned more. However, courts may depart from equality where a shorter marriage means less entitlement, or where needs can be met with less than half. The zero-income spouse is not automatically entitled to half — but is also not automatically excluded from a substantial share.",
  },
  {
    question: "Can I protect my future earnings after separation?",
    answer: "Post-separation earnings are more protected than marital earnings. The longer the period between separation and the order, the more courts may treat post-separation earnings as personal rather than matrimonial. A clean break order permanently dismisses income claims.",
  },
];

const relatedPages = [
  { title: "How Much Maintenance After Divorce UK?", description: "How spousal maintenance amounts and durations are calculated.", href: "/how-much-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "Child Maintenance vs Spousal Maintenance UK", description: "Understanding the two types of maintenance and how they interact.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
  { title: "Divorce Financial Settlement Calculator UK", description: "Model post-divorce income for both parties including tax.", href: "/divorce-financial-settlement-calculator-uk", badge: "Calculator" },
];

export default function DivorceIncomeInequalityPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce Where One Earns More Than the Other UK"
      subtitle="Where there is a significant income gap between spouses, this shapes both the capital settlement and whether spousal maintenance is appropriate. The starting point is still equal sharing — but needs and earning capacity are central to the overall outcome."
      documentTitle="Divorce Where One Partner Earns More UK | DivorceCalculatorUK"
      metaDescription="Understand how a significant income disparity affects a UK divorce settlement — spousal maintenance, capital division, pension sharing, and long-term financial planning."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Divorce Where One Earns More UK", href: "/divorce-where-one-earns-more-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Income inequality between spouses is one of the most common drivers of financial complexity in divorce. When one party earns significantly more than the other, courts must balance two principles: the equal sharing of matrimonial assets built up during the marriage, and the priority of meeting both parties' financial needs — with particular weight given to the needs of the lower earner.
        </p>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-primary mb-2">Key Principle</p>
            <p className="text-sm text-muted-foreground">Courts start with equal sharing of matrimonial assets. Income inequality alone does not mean the higher earner gets more capital. What it means is that the lower earner's need for income support (maintenance) and their reduced ability to rehouse or meet their own needs independently are both taken into account when shaping the overall settlement.</p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How Income Disparity Affects the Settlement</h2>
        <ul className="space-y-2 mb-4">
          {factors.map((f, i) => (
            <li key={i} className="flex items-start gap-2 p-3 rounded-lg border text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Capital Settlement and Income Gap</h2>
        <p className="text-muted-foreground text-sm mb-4">In many cases, income gap is addressed through capital rather than maintenance — particularly where both parties want a clean break. If the higher earner receives more of the capital (including pension), they can provide a lump sum or larger home to the lower earner to support their ability to rehouse and meet their needs without ongoing maintenance payments.</p>

        <div className="p-5 bg-background rounded-lg border mb-6">
          <p className="text-sm font-semibold mb-2">Real-World Example</p>
          <p className="text-sm text-muted-foreground">Tom earns £85,000/year as a senior manager. Sarah earned £24,000/year as a part-time teacher while raising their two children (now 12 and 14). They married for 16 years. The starting point is equal division of their £220,000 net equity and total pensions of £180,000. Given the care role Sarah took and her significantly lower income, courts would typically award Sarah a larger share of the family home equity to ensure she can rehouse adequately, with spousal maintenance for a defined term (say 5 years) to allow her to transition. The pension split would also strongly favour Sarah to address the long-term income gap in retirement.</p>
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">When Spousal Maintenance Is Ordered</h2>
        <div className="space-y-3 mb-6">
          {[
            { title: "Long marriages with a career gap", desc: "Where one party stepped back from their career to support the family — particularly to raise children — they have a stronger claim for maintenance to bridge the gap back to financial independence." },
            { title: "Significant standard of living disparity", desc: "Where the lower earner's post-divorce standard of living would be dramatically reduced without income support, courts may order maintenance — particularly in long, high-income marriages." },
            { title: "Young children requiring full-time care", desc: "Where the primary carer of young children cannot work full-time due to childcare responsibilities, maintenance often supports the gap until the children are older." },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-1">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Post-Divorce Finances For Both Parties" />
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
