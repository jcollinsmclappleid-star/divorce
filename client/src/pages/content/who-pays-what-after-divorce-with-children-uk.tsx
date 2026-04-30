import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Banknote, Home, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "If I pay child maintenance, do I still have to pay towards holidays?",
    answer: "Child maintenance (via CMS) is intended to cover ongoing care costs. Holidays, school trips, and extras are separate — these should be agreed between the parents. Courts do not typically break down child maintenance into itemised expenses; the overall amount is designed to cover regular costs.",
  },
  {
    question: "Who pays children's medical or dental costs?",
    answer: "NHS services are free and both parents have equal responsibility. Private dental or medical costs are typically shared — proportionally to income if agreed, or equally if not. This should ideally be addressed in the separation agreement.",
  },
  {
    question: "Do I have to pay school fees if I was paying them during the marriage?",
    answer: "Not automatically. Courts can make school fees orders only where there is clear agreement and financial resource to support it. If one parent stops paying school fees during proceedings, the other may apply to court for a maintenance pending suit order covering fees.",
  },
  {
    question: "What if my ex refuses to contribute to the children's expenses?",
    answer: "Use the CMS for child maintenance — they have enforcement powers. For agreed extras (like school trips or clubs), you may need to negotiate or, in serious cases, return to court. Documenting agreed arrangements in a separation agreement reduces these disputes.",
  },
  {
    question: "Does child maintenance affect the capital settlement?",
    answer: "Child maintenance and capital settlement are separate. However, the housing settlement is heavily influenced by children — courts ensure the primary carer has adequate housing for the children. This can result in the primary carer receiving a larger share of equity or a deferred sale arrangement.",
  },
  {
    question: "When does child maintenance stop?",
    answer: "Child maintenance through the CMS normally continues until the child is 16, or up to 20 if in full-time non-advanced education. Private agreements can extend maintenance through university, though this requires specific agreement. Maintenance does not automatically extend to university costs unless agreed.",
  },
];

const relatedPages = [
  { title: "Child Maintenance vs Spousal Maintenance UK", description: "The key differences between these two types of maintenance.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
  { title: "Divorce Financial Settlement With Children UK", description: "How having children affects the overall financial settlement.", href: "/divorce-with-children-financial-settlement-uk", badge: "Children" },
  { title: "Does Having Children Change the Divorce Settlement?", description: "Specific ways children affect the financial outcome of divorce.", href: "/does-having-children-change-divorce-settlement-uk", badge: "Children" },
  { title: "Preview the Full Financial Report", description: "Model child maintenance, income, and cashflow for both parents.", href: "/unlock", badge: "Report" },
];

export default function WhoPaysAfterDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Who Pays What After Divorce With Children UK?"
      subtitle="After divorce with children, financial responsibilities are shared — but not always equally. Here is a clear breakdown of who typically pays for what, and how it is decided."
      documentTitle="Who Pays What After Divorce With Children UK? | DivorceCalculatorUK"
      metaDescription="Find out who pays for housing, school costs, child maintenance, and living expenses after divorce with children in England and Wales."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Who Pays What After Divorce With Children UK?", href: "/who-pays-what-after-divorce-with-children-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          After divorce with children, financial responsibilities continue — and need to be clearly understood and agreed. Both parents remain financially responsible for their children until they are at least 18 (or beyond if in higher education). Here is a breakdown of the main categories of financial responsibility.
        </p>

        <div className="space-y-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold">Child Maintenance</p>
              </div>
              <p className="text-sm text-muted-foreground">Paid by the non-resident parent (the parent the children don't primarily live with) to the resident parent. Calculated by the CMS based on the paying parent's gross income and the number of overnight stays. This is the primary ongoing financial transfer — designed to contribute to the everyday costs of raising the children (food, clothing, activities, bills).</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold">Housing Costs</p>
              </div>
              <p className="text-sm text-muted-foreground">Each parent is responsible for their own housing costs. However, the financial settlement — property equity, savings, pension sharing — is structured to ensure both can house themselves and the children adequately. Where one parent has insufficient income to house themselves and the children, spousal maintenance may supplement child maintenance.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold">School Costs and Activities</p>
              </div>
              <p className="text-sm text-muted-foreground">State school costs (uniforms, trips, equipment) are typically covered proportionally — the resident parent from day-to-day, with contributions agreed from the non-resident parent. Private school fees are complex: if both parents agreed to private schooling and there is financial capacity, courts may order contributions. Activities and clubs should be agreed between parents.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold">Spousal Maintenance</p>
              </div>
              <p className="text-sm text-muted-foreground">Separate from child maintenance — paid by the higher earner to the lower earner to address the income gap. In households with children, where the primary carer cannot work full-time, spousal maintenance bridges the gap between their income and their reasonable needs. It is not a child-related payment — it is a payment to the ex-spouse.</p>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Practical Example: Who Pays What</h2>
        <div className="p-5 bg-background rounded-lg border mb-6">
          <p className="text-sm font-semibold mb-3">Sophie and David (two children aged 8 and 11)</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>David earns £60,000/year gross. Sophie earns £22,000/year part-time (primary carer).</p>
            <p><strong>Child maintenance (CMS):</strong> David's liability is approximately 16% of gross income over £800/week for 2 children, reduced for overnight stays. Approximately £350–400/month.</p>
            <p><strong>Spousal maintenance:</strong> Courts may order David to pay Sophie £800–1,000/month for 5 years to bridge her income gap while the children are young and enable her to increase her working hours as they get older.</p>
            <p><strong>Housing:</strong> Sophie stays in the family home under a Mesher Order. When the youngest reaches 18, the property is sold and proceeds divided in Sophie's favour.</p>
            <p><strong>School activities:</strong> Both agreed to split extracurricular costs equally. School trips are split proportionally reflecting their income ratio.</p>
          </div>
          <p className="text-xs text-muted-foreground mt-3">This is illustrative only. Actual outcomes depend on the specific circumstances of each case.</p>
        </div>
        <InlineCTA label="Model Your Post-Divorce Finances" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures to Gather</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Gross income of both parents",
            "Number of overnight stays with each parent per year",
            "Monthly childcare costs (nursery, after-school clubs)",
            "School fees (if private) and associated costs",
            "Housing costs for both parents post-separation",
            "Children's ages and education stage",
            "Any benefits entitlement (Child Benefit, Child Tax Credit)",
            "Monthly essential outgoings for each parent",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Financial Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Childcare costs not factored into the overall picture", desc: "Childcare costs for younger children can run to £1,000–1,500/month in many areas. These significantly affect the income position of the primary carer and should be reflected in both the maintenance calculation and the overall capital settlement." },
            { label: "Child maintenance vs spousal maintenance overlap", desc: "There is often confusion about what child maintenance covers and whether spousal maintenance is also needed. CMS payments address the children's direct costs — they do not cover the primary carer's additional income shortfall from reduced working hours." },
            { label: "Housing needs creating capital tension", desc: "Courts prioritise housing for children. If the primary carer cannot rehouse adequately with an equal split, the settlement typically favours them in the capital division — sometimes leaving the non-resident parent with limited capital to rehouse themselves." },
            { label: "Post-18 financial support", desc: "Once children reach 18, most formal financial obligations end. But university costs, accommodation, and transition support are often not formally agreed. Planning ahead reduces conflict at this stage." },
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
            "The exact CMS child maintenance figure — this requires the paying parent's gross income and overnight stay data via the CMS calculator",
            "Whether spousal maintenance is appropriate in your specific circumstances",
            "How a court would divide capital between two parents with very different income positions",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Based on our income levels and childcare costs, would spousal maintenance be appropriate alongside child maintenance?</li>
          <li>How should childcare costs factor into the capital division?</li>
          <li>What housing arrangement would best meet the children's needs given both parents' incomes?</li>
          <li>Should we agree to a Mesher Order or is a clean sale and division more appropriate?</li>
          <li>How should school fee contributions be structured if we want to continue private schooling?</li>
        </ul>
        <InlineCTA label="Model Child Maintenance and Income for Both Parents" />
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
