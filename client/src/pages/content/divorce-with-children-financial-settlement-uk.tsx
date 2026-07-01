import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Home } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const priorities = [
  "The child's welfare is the court's first priority in any arrangement affecting them",
  "Housing for the primary carer and children typically takes precedence over an equal asset split",
  "Courts may defer the sale of the family home (Mesher Order) to avoid disrupting children",
  "The primary carer's ability to house and support the children affects the overall settlement",
  "Child maintenance is calculated separately through CMS but may be considered alongside spousal maintenance",
];

const faqItems = [
  {
    question: "Do children change the asset and housing picture?",
    answer: "Not automatically by a fixed percentage, but children's housing and childcare needs can be important. If one route is designed around keeping children housed, property, equity, income and affordability all need to be modelled and reviewed with a solicitor.",
  },
  {
    question: "Who pays for the children financially after divorce?",
    answer: "Both parents are financially responsible for their children. Child maintenance is the mechanism by which the non-resident parent contributes financially — calculated by the Child Maintenance Service (CMS) based on income and overnight stays. The parent the children live with also provides financially through day-to-day expenses.",
  },
  {
    question: "Can I include child maintenance in the divorce settlement?",
    answer: "Child maintenance can be agreed by consent (a child maintenance order) but must be reviewed or replaced every 12 months if either party applies to the CMS. You can agree a figure, but either party can later use the CMS — courts cannot permanently exclude CMS jurisdiction over child maintenance.",
  },
  {
    question: "Can care arrangements affect the financial model?",
    answer: "Care arrangements and financial settlements are separate issues, but care patterns can affect housing and childcare cost assumptions. Keep the model focused on needs, resources, costs and cashflow, and take advice where care arrangements are disputed.",
  },
  {
    question: "What is a school fees order?",
    answer: "Courts can make orders requiring a party to pay school fees — but only if both parties agreed to private schooling and there is sufficient financial resource. Courts do not impose private schooling — they can only maintain an arrangement that already exists.",
  },
];

const relatedPages = [
  { title: "Child Maintenance vs Spousal Maintenance UK", description: "The difference between the two types of maintenance after divorce.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
  { title: "Does Having Children Change the Divorce Settlement?", description: "How children affect the financial outcome of divorce.", href: "/does-having-children-change-divorce-settlement-uk", badge: "Children" },
  { title: "How Does Child Custody Affect Financial Settlement UK?", description: "How care arrangements feed into the financial settlement.", href: "/how-does-child-custody-affect-financial-settlement-uk", badge: "Children" },
  { title: "Preview the Full Financial Report", description: "Model income, maintenance, and housing with children.", href: "/unlock", badge: "Report" },
];

export default function DivorceWithChildrenPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce Financial Settlement With Children UK"
      subtitle="Where children are involved, their welfare and housing needs are the court's primary concern. This fundamentally shapes how assets are divided — often resulting in a significant departure from equal sharing."
      documentTitle="Divorce Financial Settlement With Children UK | DivorceCalculatorUK"
      metaDescription="Understand how having children affects a divorce financial settlement in England and Wales — housing priority, Mesher Orders, child maintenance, and departures from equal sharing."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Divorce Financial Settlement With Children UK", href: "/divorce-with-children-financial-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The presence of children — particularly children who are under 18 or in education — has a significant impact on how courts approach a divorce financial settlement. Children's welfare is the court's first and paramount consideration, and this shapes almost every decision: from who stays in the family home, to how assets are divided, to whether spousal maintenance is appropriate.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How Children Shape the Financial Settlement</h2>
        <ul className="space-y-2 mb-4">
          {priorities.map((item, i) => (
            <li key={i} className="flex items-start gap-2 p-3 rounded-lg border text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">The Family Home and Children</h2>
        <p className="text-muted-foreground text-sm mb-4">The family home question is often the central issue in divorces with children. Courts have three main approaches:</p>
        <div className="space-y-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Primary carer keeps the home outright</p>
              </div>
              <p className="text-sm text-muted-foreground">If affordable and the equity split is manageable, the primary carer takes the home and compensates the other party through savings, pension sharing, or reduced maintenance. This provides maximum stability for the children.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Mesher Order — deferred sale</p>
              </div>
              <p className="text-sm text-muted-foreground">The home is held jointly but one party (usually the primary carer) occupies it until a trigger event — the youngest child reaching 18, leaving education, the resident parent remarrying or cohabiting. At that point, the property is sold and proceeds divided as per the order. This gives the children stability but both parties retain a stake in the property.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Immediate sale and both parties rehouse</p>
              </div>
              <p className="text-sm text-muted-foreground">Both parties sell up, divide the equity, and rehouse separately. More disruptive for children but sometimes the only viable option if neither party can afford to keep the home or the equity must be released to house both parents adequately.</p>
            </CardContent>
          </Card>
        </div>

        <div className="p-5 bg-background rounded-lg border mb-4">
          <p className="text-sm font-semibold mb-2">Illustrative Example (not a prediction)</p>
          <p className="text-sm text-muted-foreground">Diane and James have two children aged 6 and 9. The family home is worth £320,000 with £150,000 outstanding mortgage (equity £170,000). Diane earns part-time and is the primary carer. James earns full-time. A 50/50 split would leave Diane with £85,000 — not enough to rehouse in the area near their school. In practice, courts often consider the primary carer's housing needs first, which may result in a larger share for that party, or a Mesher Order allowing them to remain in the home until the youngest child reaches 18, with the other party retaining a greater pension share. Every case turns on its specific facts — this example is illustrative only.</p>
        </div>
        <InlineCTA label="Model Your Settlement Including Children's Impact" />
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
