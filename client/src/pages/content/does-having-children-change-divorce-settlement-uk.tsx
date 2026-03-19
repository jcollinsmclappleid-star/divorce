import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "If we have no children, does that mean we split everything 50/50?",
    answer: "Equal sharing is still the starting point, but courts can depart from it based on other Section 25 factors — short marriages, pre-marital assets, specific contributions, or significant earning differences. No children simply means this particular factor does not push the outcome away from equality.",
  },
  {
    question: "At what age do children stop affecting the settlement?",
    answer: "Courts focus primarily on children under 18 (or in education). As children get older, the resident parent's need to stay in the family home or receive additional support reduces. When the youngest child reaches 18, a Mesher Order typically triggers a sale, and maintenance may reduce or end.",
  },
  {
    question: "Does having children mean I get more than half?",
    answer: "Not automatically. The primary carer often receives more of the property to ensure adequate housing for the children — but courts balance this against the other party's housing needs too. The overall settlement reflects the specific circumstances of each family.",
  },
  {
    question: "Are children's financial needs included in the divorce settlement?",
    answer: "Children's financial needs are addressed through two mechanisms: the capital settlement (ensuring both parents can house them) and child maintenance (ongoing income support). Children's specific future financial needs — such as university costs — are not typically addressed in the divorce settlement.",
  },
];

const relatedPages = [
  { title: "Divorce Financial Settlement With Children UK", description: "The comprehensive guide to settlements involving children.", href: "/divorce-with-children-financial-settlement-uk", badge: "Children" },
  { title: "How Does Child Custody Affect Financial Settlement?", description: "How care arrangements feed into the financial settlement.", href: "/how-does-child-custody-affect-financial-settlement-uk", badge: "Children" },
  { title: "Child Maintenance vs Spousal Maintenance UK", description: "Understanding both types of maintenance payment.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
];

export default function ChildrenChangeSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Does Having Children Change the Divorce Settlement UK?"
      subtitle="Children fundamentally change the financial settlement. Their welfare is the court's primary concern, and this directly shapes how property, savings, and income are divided — often resulting in a significant departure from equal sharing."
      documentTitle="Does Having Children Change the Divorce Settlement UK? | DivorceCalculatorUK"
      metaDescription="Find out exactly how having children changes the divorce financial settlement in England and Wales — housing priority, Mesher Orders, deferred sale, and income support."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Does Having Children Change Divorce Settlement UK?", href: "/does-having-children-change-divorce-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Yes — significantly. In England and Wales, having children is one of the most powerful factors in a divorce financial settlement. Section 25 of the Matrimonial Causes Act 1973 requires courts to give first consideration to the welfare of any children of the family under 18. This shapes almost everything: where the children will live, what they need to be housed and supported, and which parent needs more financial resources to provide that support.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Five Ways Children Change the Settlement</h2>
        <div className="space-y-4 mb-6">
          {[
            { title: "Housing priority for the primary carer", desc: "The parent the children primarily live with typically needs to stay in the family home (or rehouse locally to maintain school continuity). This often means they receive a greater share of the property equity — even if that means the overall capital split is unequal." },
            { title: "Possibility of a deferred sale (Mesher Order)", desc: "Rather than selling immediately, the court may order that the family home is retained for the children until they reach 18 or leave education. The non-resident parent retains an interest but cannot access their equity until the trigger event occurs." },
            { title: "Greater need for income support (spousal maintenance)", desc: "If the primary carer cannot work full-time because of childcare responsibilities, they may receive spousal maintenance — in addition to child maintenance — to bridge the income gap. The presence of young children significantly strengthens the case for maintenance." },
            { title: "Child maintenance is a separate ongoing obligation", desc: "The non-resident parent pays child maintenance (through the CMS) on top of the capital settlement. This is an ongoing cash flow that affects both parties' financial positions for years." },
            { title: "Needs-based departure from equality", desc: "The standard principle of equal sharing may be overridden by the children's welfare. If meeting the children's housing and day-to-day needs requires an unequal capital split, courts will order it." },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What if Both Parents Have Substantial Housing Needs?</h2>
        <p className="text-muted-foreground text-sm mb-4">Where neither parent can comfortably rehouse independently with the children, courts face a genuine dilemma. Solutions include:</p>
        <div className="space-y-3 mb-6 text-sm text-muted-foreground">
          <div className="p-3 rounded-lg border bg-background flex items-start gap-2">
            <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            A Mesher Order — deferring the sale to give the primary carer stability while the non-resident parent waits for their equity share
          </div>
          <div className="p-3 rounded-lg border bg-background flex items-start gap-2">
            <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            Higher spousal maintenance to enable the lower earner to rent or access a shared ownership property
          </div>
          <div className="p-3 rounded-lg border bg-background flex items-start gap-2">
            <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            Involving family financial support — recognising that parents or family members may assist with housing costs
          </div>
        </div>
        <InlineCTA label="Model Your Settlement With and Without Children" />
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
