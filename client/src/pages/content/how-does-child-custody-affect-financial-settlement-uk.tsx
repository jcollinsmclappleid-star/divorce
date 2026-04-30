import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Home, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Does getting more time with the children mean I pay less maintenance?",
    answer: "Overnight stays do affect the Child Maintenance Service's calculation. The CMS reduces the non-resident parent's liability based on the number of nights the children stay with them. More overnight stays = lower weekly maintenance. This is a separate calculation from the capital settlement.",
  },
  {
    question: "If we share care 50/50, does that mean we split assets 50/50?",
    answer: "Not necessarily — capital division follows the Section 25 framework regardless of care arrangements. However, with 50/50 care, both parents have equal housing needs for the children, which affects how the court approaches the housing settlement. Both parents may need similar-sized accommodation.",
  },
  {
    question: "Can my ex use custody as a tactic to get more money?",
    answer: "Courts are alive to this risk. Arrangements for children are decided separately from financial matters and based on the children's welfare, not financial leverage. A pattern of using contact or custody as financial leverage can reflect poorly on a parent in court.",
  },
  {
    question: "What happens to maintenance when children turn 18?",
    answer: "Child maintenance via CMS typically ends when a child leaves full-time secondary education. Spousal maintenance is a separate matter and continues according to the order terms regardless of children's ages. If the primary carer's maintenance was partially based on their childcare role, they may be able to return to full-time work as children get older — this can be a basis for reviewing maintenance.",
  },
  {
    question: "Can the divorce settlement calculator model child maintenance?",
    answer: "Yes — the calculator includes an optional child maintenance estimate based on CMS rates and overnight-stay bands. This feeds into the monthly cashflow model for both parties, helping you see the full income picture alongside the capital settlement.",
  },
  {
    question: "Does the number of children affect the capital settlement?",
    answer: "Indirectly. More children typically means a larger housing requirement for the primary carer and higher ongoing childcare costs. This can strengthen the case for the primary carer receiving a greater share of the property equity — but there is no formula. Each case is assessed on its own facts.",
  },
];

const relatedPages = [
  { title: "Divorce Financial Settlement With Children UK", description: "The full picture of how children shape a divorce financial settlement.", href: "/divorce-with-children-financial-settlement-uk", badge: "Children" },
  { title: "Child Maintenance vs Spousal Maintenance UK", description: "The key differences between child and spousal maintenance.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
  { title: "Who Pays What After Divorce With Children UK?", description: "A practical breakdown of financial responsibilities after divorce.", href: "/who-pays-what-after-divorce-with-children-uk", badge: "Children" },
  { title: "Preview the Full Financial Report", description: "See what the settlement calculator models across property, income and cashflow.", href: "/unlock", badge: "Report" },
];

export default function CustodyFinancialSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="How Does Child Custody Affect Financial Settlement UK?"
      subtitle="Care arrangements and the financial settlement are decided in separate processes — but they are deeply interconnected. Where children live determines housing needs, which directly shapes how assets are divided."
      documentTitle="How Does Child Custody Affect Financial Settlement UK? | DivorceCalculatorUK"
      metaDescription="Understand how child care arrangements affect the divorce financial settlement in England and Wales — housing needs, child maintenance calculations, and spousal maintenance."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "How Child Custody Affects Financial Settlement UK", href: "/how-does-child-custody-affect-financial-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Care arrangements and financial settlements are decided in separate processes — but they are closely linked. Where children live primarily affects the financial settlement in two key ways: it determines housing needs (the primary carer typically needs a home large enough for the children), and it affects child maintenance calculations. Understanding this interplay is essential before modelling your financial position.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How Care Arrangements Feed Into the Financial Settlement</h2>
        <div className="space-y-4 mb-6">
          {[
            { icon: Home, title: "Housing need", desc: "The parent the children primarily live with needs a home large enough to house them. This often means they need to stay in the family home or access sufficient equity to buy or rent a property of similar size in the same area (to maintain school continuity). Courts prioritise this housing need — it can result in the primary carer receiving a greater share of property equity." },
            { icon: Users, title: "Income gap and earning capacity", desc: "The primary carer's ability to earn is constrained by childcare responsibilities. If they have younger children or a reduced earning capacity due to career sacrifices made during the marriage, courts may award spousal maintenance in addition to child maintenance to bridge the income gap." },
            { icon: Users, title: "Child maintenance calculation", desc: "Child maintenance is calculated separately through the Child Maintenance Service (CMS) based on the non-resident parent's gross income and the number of overnight stays. This is not part of the divorce financial settlement — but it is a significant cash flow for the primary carer and affects their overall financial position." },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What Happens With Shared Care (50/50)?</h2>
        <p className="text-muted-foreground text-sm mb-4">Where care is genuinely shared equally, both parents have equal housing needs. Neither parent has a stronger claim to the family home purely based on the children living with them. Courts approach 50/50 care differently:</p>
        <div className="space-y-3 mb-6">
          <div className="p-3 rounded-lg border bg-background text-sm text-muted-foreground">Both parties need adequate housing for the children — this may mean the equity must be divided in a way that allows both to rehouse appropriately</div>
          <div className="p-3 rounded-lg border bg-background text-sm text-muted-foreground">Child maintenance reduces (or may not be payable) in genuine 50/50 arrangements, as each parent provides equally</div>
          <div className="p-3 rounded-lg border bg-background text-sm text-muted-foreground">Spousal maintenance may still apply based on the income disparity, regardless of the care split</div>
        </div>
        <InlineCTA label="Model Your Financial Position With Children" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures That May Be Relevant to Model</h2>
        <p className="text-sm text-muted-foreground mb-4">When modelling a settlement where children are involved, the following figures are typically needed:</p>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {[
            "Gross income of both parties (before tax)",
            "Number of overnight stays per week with each parent",
            "Ages of each child",
            "Property value and outstanding mortgage",
            "Pension CETV (cash equivalent transfer value) for each party",
            "Monthly childcare costs (nursery, wraparound care)",
            "Current monthly housing costs (mortgage or rent)",
            "Savings and liquid assets available to both parties",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border bg-background">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Common Financial Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Housing affordability for the primary carer", desc: "If the primary carer cannot sustain the mortgage on a single income, they may face a choice between a deferred sale and rehousing — each with different cashflow pressures." },
            { label: "Child maintenance reducing take-home pay", desc: "CMS payments reduce the non-resident parent's available income significantly. On a gross income of £40,000, the basic CMS rate for two children is approximately £266/month before overnight-stay reductions." },
            { label: "Pension imbalance between parties", desc: "Where one party sacrificed career progression for childcare, pension CETVs may be significantly unequal. This is often invisible until modelled alongside the capital settlement." },
            { label: "Income gap after separation", desc: "Where one party earned significantly more during the marriage, the lower earner may face an immediate income shortfall — particularly if childcare costs prevent a return to full-time work." },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-lg border bg-background">
              <p className="text-sm font-semibold mb-1">{p.label}</p>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the Calculator Cannot Decide</h2>
        <div className="space-y-3 mb-6">
          {[
            "What care arrangement courts would order — custody decisions are made in separate proceedings based on the children's welfare",
            "Whether spousal maintenance is appropriate in your circumstances — this depends on facts specific to your case",
            "What level of housing the court would consider adequate for the children",
            "Whether a Mesher Order (deferred sale) or immediate sale is more appropriate for your situation",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>How does the number of agreed overnight stays affect the CMS calculation in our specific situation?</li>
          <li>Would a Mesher Order (deferred sale) be appropriate given the children's ages and the available equity?</li>
          <li>Could spousal maintenance be relevant alongside child maintenance in our case?</li>
          <li>What pension provision, if any, should be considered alongside the property settlement?</li>
          <li>How should childcare costs be factored into the overall cashflow assessment?</li>
        </ul>
        <InlineCTA label="Compare Scenarios Including Maintenance in the Calculator" />
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
