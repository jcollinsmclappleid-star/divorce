import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const aspects = [
  { title: "Live with order", desc: "Specifies who the child lives with — one parent, both parents (shared), or another suitable person. Replaces the old terminology of 'residence' under the previous Children Act regime." },
  { title: "Spend time with order", desc: "Sets out the time the child spends with the parent they don't primarily live with — including overnights, weekends, holidays and special occasions. Replaces the old terminology of 'contact'." },
  { title: "Welfare checklist", desc: "The court applies the s.1(3) Children Act welfare checklist — the child's wishes (with age-appropriate weight), needs, the likely effect of any change, age and background, harm risk, and capability of each parent." },
  { title: "No-order principle", desc: "The court will not make an order unless it would be better for the child than no order at all. Where parents agree arrangements, a court order is often unnecessary." },
  { title: "MIAM requirement", desc: "Most applicants must attend a Mediation Information and Assessment Meeting (MIAM) before applying to court — to consider whether mediation could resolve the dispute without litigation." },
  { title: "Specific issue and prohibited steps orders", desc: "Sit alongside Child Arrangements Orders. A specific issue order resolves a particular dispute (e.g. school choice). A prohibited steps order prevents one parent from doing something specific (e.g. removing the child from the country)." },
];

const faqItems = [
  {
    question: "What is a Child Arrangements Order?",
    answer: "A Child Arrangements Order (CAO) is the court order that sets out who a child lives with and who they spend time with after parents separate. It replaced the older 'residence' and 'contact' orders in 2014. The court only makes such an order if it is satisfied that doing so would be better for the child than not making one.",
  },
  {
    question: "Do separating parents need to apply for a Child Arrangements Order?",
    answer: "Not necessarily. Where parents agree arrangements between themselves, a court order is often unnecessary. A CAO is typically applied for where parents cannot agree, or where one parent wants the certainty of a court order — for example to prevent the other parent unilaterally changing arrangements.",
  },
  {
    question: "How does the court decide arrangements?",
    answer: "The court applies the welfare principle — the child's welfare is paramount. It works through the welfare checklist in s.1(3) of the Children Act 1989, which covers the child's wishes (taking age into account), needs, the impact of any change, age, sex and background, any harm or risk of harm, and how capable each parent is of meeting the child's needs.",
  },
  {
    question: "What's the difference between this and a financial settlement?",
    answer: "Child arrangements (where the child lives, who they spend time with) and the financial settlement (assets, maintenance, the family home) are legally separate processes. They often run alongside each other. Child maintenance is normally handled separately by the Child Maintenance Service (CMS).",
  },
  {
    question: "Do I have to try mediation before applying to court?",
    answer: "In most cases yes — applicants must attend a Mediation Information and Assessment Meeting (MIAM) before applying to court for a CAO. There are exemptions, including for cases involving domestic abuse, urgency, or child protection concerns.",
  },
  {
    question: "Can a Child Arrangements Order be changed?",
    answer: "Yes — either parent can apply to vary a CAO if circumstances have changed. The court applies the welfare principle again. Significant changes (e.g. a parent's relocation, a child's developing needs, a serious change in either parent's circumstances) are typical triggers.",
  },
];

const relatedPages = [
  { title: "Divorce With Children: Financial Settlement", description: "How child arrangements feed into the financial picture.", href: "/divorce-with-children-financial-settlement-uk", badge: "Children" },
  { title: "How Does Child Custody Affect Settlement?", description: "Linking living arrangements to housing and income decisions.", href: "/how-does-child-custody-affect-financial-settlement-uk", badge: "Children" },
  { title: "Child Maintenance vs Spousal Maintenance", description: "Two different types of ongoing payment — how they differ.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
  { title: "Preview the Full Financial Report", description: "Model the financial side of the children's arrangements.", href: "/unlock", badge: "Report" },
];

export default function ChildArrangementsOrderPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Child Arrangements Order UK: How They Work"
      subtitle="A Child Arrangements Order sets out who your child lives with and who they spend time with after separation. Here's how the process works — and how it sits alongside the financial settlement."
      documentTitle="Child Arrangements Order UK | DivorceCalculatorUK"
      metaDescription="A clear UK guide to Child Arrangements Orders — who lives with, who spends time with, the welfare checklist, MIAMs, and how arrangements link to the financial settlement."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Child Arrangements Order UK", href: "/child-arrangements-order-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          When parents separate, the question of where the children live and how they spend time with each parent is legally separate from the financial settlement — but the two are closely linked in practice. A Child Arrangements Order (CAO) is the court order that records the arrangements where parents cannot agree (or want a court order even where they can). The driving principle throughout is the welfare of the child.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">This guide covers child arrangements in outline only. It does not provide legal advice. A qualified family solicitor should be involved in any dispute about a child's living or contact arrangements — particularly where there are concerns about safety or wellbeing.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">How a Child Arrangements Order Works</h2>
        <div className="space-y-4 mb-6">
          {aspects.map((a, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{a.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model the Financial Picture Around the Arrangements" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Number of children and their ages",
            "Proposed pattern of overnights with each parent",
            "Each parent's monthly child-related costs (clothes, activities, school)",
            "Childcare costs each parent will incur",
            "Estimated CMS payment from the non-resident parent",
            "Each parent's monthly housing cost for child-suitable accommodation",
            "Number of bedrooms required by each parent",
            "Travel/transport costs associated with the arrangements",
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Linking arrangements to housing", desc: "The parent the children live with most of the time typically needs accommodation suitable for them. This often shapes who keeps the family home or how a buyout/Mesher order is structured." },
            { label: "Shared care complexities", desc: "Where the children effectively split time between two homes, both parents need child-suitable accommodation. This can put significant pressure on the matrimonial pot." },
            { label: "Changing arrangements as children grow", desc: "Arrangements that work for primary-school-aged children often need adjustment for teenagers. Building in flexibility avoids returning to court." },
            { label: "Cross-border / relocation issues", desc: "If one parent wants to relocate (within the UK or abroad) with the children, this typically requires either the other parent's consent or a court order. Specialist advice is essential." },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-lg border">
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
            "What arrangements may need specialist advice in light of your child's welfare",
            "Whether to ask a solicitor about a CAO or an informal arrangement",
            "How safeguarding or harm concerns should be raised with a qualified professional",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What arrangement would best meet our child's welfare needs?</li>
          <li>Do we need a Child Arrangements Order or is an informal agreement enough?</li>
          <li>How should the arrangements link to the financial settlement and housing?</li>
          <li>What does shared care mean for child maintenance through CMS?</li>
          <li>How can we build flexibility into the arrangements as the children grow?</li>
        </ul>
        <InlineCTA label="Model the Financial Picture Around the Arrangements" />
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
