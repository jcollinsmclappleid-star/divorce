import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Banknote, Home } from "lucide-react";
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
];

const relatedPages = [
  { title: "Child Maintenance vs Spousal Maintenance UK", description: "The key differences between these two types of maintenance.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Maintenance" },
  { title: "Divorce Financial Settlement With Children UK", description: "How having children affects the overall financial settlement.", href: "/divorce-with-children-financial-settlement-uk", badge: "Children" },
  { title: "Does Having Children Change the Divorce Settlement?", description: "Specific ways children affect the financial outcome of divorce.", href: "/does-having-children-change-divorce-settlement-uk", badge: "Children" },
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
            <p>David earns £60,000/year gross (£3,871 gross weekly income). Sophie earns £22,000/year part-time (primary carer).</p>
            <p><strong>Child maintenance (CMS):</strong> David's liability is approximately 16% of gross income over £800/week for 2 children, reduced for overnight stays (every other weekend). Approximately £350–400/month.</p>
            <p><strong>Spousal maintenance:</strong> Courts may order David to pay Sophie £800–1,000/month for 5 years — enough to bridge her income gap while the children are young and enable her to increase her working hours as they get older.</p>
            <p><strong>Housing:</strong> Sophie stays in the family home under a Mesher Order. David rents elsewhere and contributes to the mortgage (included in the overall payment arrangement). When the youngest reaches 18, the property is sold and proceeds divided 40/60 in Sophie's favour.</p>
            <p><strong>School activities:</strong> Both agreed to split extracurricular costs equally. School trips are split proportionally (70% David, 30% Sophie reflecting their income ratio).</p>
          </div>
        </div>
        <InlineCTA label="Model Your Post-Divorce Finances" />
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
