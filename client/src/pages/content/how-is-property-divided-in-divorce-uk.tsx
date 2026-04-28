import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, Scale, Users, PiggyBank, ArrowRight } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const outcomes = [
  { icon: Home, label: "Sale and division", desc: "Property sold, equity divided after mortgage and fees." },
  { icon: ArrowRight, label: "One party buys out", desc: "One spouse pays the other's share and takes sole ownership." },
  { icon: Scale, label: "Mesher Order", desc: "Sale deferred until the youngest child turns 18 or finishes education." },
  { icon: Users, label: "Martin Order", desc: "One spouse has the right to remain in the property for their lifetime." },
];

const factors = [
  "The welfare of any children under 18 — the first consideration",
  "Income, earning capacity, and financial resources of each spouse",
  "Financial needs, obligations, and responsibilities of each party",
  "Standard of living enjoyed during the marriage",
  "Age of each party and length of the marriage",
  "Physical or mental disability of either spouse",
  "Contributions made to the family's welfare, including non-financial contributions like childcare",
  "Conduct, in exceptional cases where it would be inequitable to disregard it",
  "The value of any benefit (such as a pension) either party will lose as a result of the divorce",
];

const faqItems = [
  {
    question: "Is property always split 50/50 in divorce in the UK?",
    answer: "No. Courts start from an equal division but will depart from it based on factors including financial need, children's welfare, earning capacity, and contributions made. Short marriages often result in different splits.",
  },
  {
    question: "Can my spouse claim the house if it was in my name before we married?",
    answer: "Possibly. Pre-marital property is not automatically excluded. Courts consider the full picture, and in a long marriage with a financially weaker spouse or children to house, a court may include pre-marital property in the settlement.",
  },
  {
    question: "What if we cannot agree on how to divide property?",
    answer: "If you cannot reach agreement through negotiation or mediation, either party can apply to court for a Financial Remedy Order. A judge will then decide the division based on the Section 25 factors.",
  },
  {
    question: "Does it matter who is at fault for the divorce?",
    answer: "Rarely. Under the current law (and especially since no-fault divorce was introduced in 2022), conduct is only considered in exceptional circumstances where it would be clearly inequitable to ignore it.",
  },
  {
    question: "How long does it take to divide property in a divorce?",
    answer: "An agreed settlement can be formalised in a consent order within a few months of reaching agreement. Contested financial proceedings can take 12–24 months or longer.",
  },
  {
    question: "Do I need a solicitor to divide property in a divorce?",
    answer: "You are not legally required to use a solicitor, but given the sums involved and the legal complexity, independent legal advice is strongly recommended. At minimum, any agreement should be formalised in a court-approved consent order.",
  },
];

const relatedPages = [
  { title: "What is a Consent Order in UK Divorce?", description: "How to make your property agreement legally binding.", href: "/what-is-a-consent-order-uk-divorce", badge: "Legal Orders" },
  { title: "Both Names on Mortgage in Divorce UK", description: "Options when both spouses are on the mortgage.", href: "/both-names-on-mortgage-divorce-uk", badge: "Property" },
  { title: "Divorce Financial Settlement Calculator UK", description: "Model your property and pension trade-offs.", href: "/divorce-financial-settlement-calculator-uk", badge: "Calculator" },
];

export default function HowIsPropertyDividedPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="How is Property Divided in Divorce UK?"
      subtitle="A complete guide to how courts divide the family home and other property in England and Wales — including the four possible outcomes for your home."
      documentTitle="How is Property Divided in Divorce UK? | DivorceCalculatorUK"
      metaDescription="Learn exactly how property is divided in divorce in England and Wales. No automatic 50/50 — courts weigh children's welfare, needs, contributions, and more."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "How is Property Divided in Divorce UK?", href: "/how-is-property-divided-in-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          When a marriage ends, one of the most pressing questions is: how is property divided in divorce UK? There is no automatic 50/50 split. Under English and Welsh law, courts aim for a 'fair' division, which takes into account a wide range of factors including the length of your marriage, each person's financial needs, contributions made, and the welfare of any children.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What Counts as Matrimonial Property?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">Before dividing assets, courts consider what falls within the scope of a divorce financial settlement.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <Badge variant="outline">Typically Included</Badge>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>The family home, even if only one person is on the mortgage</li>
                <li>Savings and bank accounts built up during the marriage</li>
                <li>Pensions accumulated during the marriage</li>
                <li>Investments and shares</li>
                <li>Business interests</li>
                <li>Vehicles</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <Badge variant="outline">May Be Treated Differently</Badge>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Inheritance received before or during the marriage</li>
                <li>Gifts from third parties</li>
                <li>Assets owned outright before the marriage</li>
              </ul>
              <p className="text-xs text-muted-foreground">Whether pre-marital or inherited assets are included depends on the length of the marriage and financial need.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How Courts Decide</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">English and Welsh courts use Section 25 of the Matrimonial Causes Act 1973 as their framework. Judges consider:</p>
        <ul className="space-y-2 mb-6">
          {factors.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <PiggyBank className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-medium text-primary mb-1">The Starting Point: Equal Shares</p>
            <p className="text-sm text-muted-foreground">Courts in England and Wales typically start from an assumption of equal division when it comes to matrimonial assets (White v White [2000]). However, the final division can depart from 50/50 based on the factors above — particularly where there are significant differences in earning capacity or where one party has primary care of children.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Four Outcomes for the Family Home</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {outcomes.map((o) => (
            <Card key={o.label}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <o.icon className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-sm">{o.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{o.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-5 bg-background rounded-lg border">
          <p className="text-sm font-semibold mb-2">Illustrative Example (not a prediction)</p>
          <p className="text-sm text-muted-foreground">Sarah and James have been married for 14 years. Their family home is worth £400,000 with an outstanding mortgage of £150,000, leaving equity of £250,000. Sarah works part-time due to caring for their two children (ages 8 and 11). James earns significantly more. In circumstances like these, courts often weigh the children's housing needs as a first consideration. In practice, the primary carer may receive a larger share of the equity to allow them to rehouse locally, or the home may be deferred via a Mesher Order until the children finish school. Every case turns on its specific facts — this example is illustrative only.</p>
        </div>

        <InlineCTA label="Model Your Property Settlement" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Pensions and Property Division</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">Pensions are often overlooked but can be the second-largest asset in a marriage. Pension rights accumulated during the marriage are generally treated as a matrimonial asset. There are three main approaches: pension sharing (a percentage is transferred immediately), pension offsetting (one party keeps the pension but gets less of other assets), or pension attachment (payments from the pension are directed to the other party on retirement).</p>
        <p className="text-muted-foreground leading-relaxed mb-4">Using a divorce financial settlement calculator that includes pension valuations can help you understand the trade-offs between keeping the house versus taking a pension share.</p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Frequently Asked Questions</h2>
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
