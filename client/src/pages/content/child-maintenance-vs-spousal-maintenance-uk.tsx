import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Scale } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Can I agree a child maintenance amount privately without using the CMS?",
    answer: "Yes — for the first 12 months after the first CMS application, either party can apply to use a family-based arrangement. You can also never use the CMS and agree privately. However, either party can apply to the CMS at any time, overriding a private arrangement (subject to a 12-month bar after the first year of a CMS application). Courts cannot make long-term orders that oust CMS jurisdiction.",
  },
  {
    question: "Is spousal maintenance taxable?",
    answer: "Spousal maintenance payments are no longer eligible for the married couple's allowance tax relief (abolished in 2000 for new orders). Payments are made from post-tax income and are not deductible for the payer. The recipient does not pay income tax on spousal maintenance received.",
  },
  {
    question: "Can spousal maintenance be stopped if I remarry?",
    answer: "Spousal maintenance automatically ends on the recipient's remarriage. Cohabitation does not automatically end maintenance but is a ground to apply to court for a reduction or discharge. The payer must apply to court — it does not stop automatically on cohabitation.",
  },
  {
    question: "What if my ex refuses to pay child maintenance?",
    answer: "If you have a CMS assessment, the CMS has enforcement powers including deduction from earnings, deduction from bank accounts, removal of driving licence, and imprisonment as a last resort. If you have a private court order for child maintenance, you must enforce it through the courts.",
  },
];

const relatedPages = [
  { title: "How Much Maintenance After Divorce UK?", description: "How spousal maintenance amounts are calculated and for how long.", href: "/how-much-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "Who Pays What After Divorce With Children UK?", description: "A practical breakdown of all financial obligations after divorce.", href: "/who-pays-what-after-divorce-with-children-uk", badge: "Children" },
  { title: "Divorce Financial Settlement Calculator UK", description: "Model post-divorce finances including maintenance.", href: "/divorce-financial-settlement-calculator-uk", badge: "Calculator" },
];

export default function ChildVsSpousalMaintenancePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Child Maintenance vs Spousal Maintenance UK"
      subtitle="Child maintenance and spousal maintenance are two completely separate obligations after divorce — different purposes, different calculations, and different rules. Understanding the difference is essential."
      documentTitle="Child Maintenance vs Spousal Maintenance UK Explained | DivorceCalculatorUK"
      metaDescription="Understand the difference between child maintenance and spousal maintenance in UK divorce — how each is calculated, how long each lasts, and how they interact."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Child Maintenance vs Spousal Maintenance UK", href: "/child-maintenance-vs-spousal-maintenance-uk" },
      ]}
    >
      <ContentSection>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className="border-blue-200">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-sm">Child Maintenance</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Purpose:</strong> Financial support for the children, not the receiving parent</li>
                <li><strong>Calculated by:</strong> Child Maintenance Service (CMS) based on payer's gross income and overnight stays</li>
                <li><strong>Duration:</strong> Until each child leaves full-time secondary education (typically age 16–20)</li>
                <li><strong>Tax:</strong> Neither taxable for recipient nor deductible for payer</li>
                <li><strong>Jurisdiction:</strong> Primarily the CMS — courts cannot override CMS jurisdiction</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                <p className="font-semibold text-sm">Spousal Maintenance</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Purpose:</strong> Financial support for the financially weaker ex-spouse</li>
                <li><strong>Calculated by:</strong> Courts based on needs, resources, and sharing principles</li>
                <li><strong>Duration:</strong> For a fixed term, joint lives, or until remarriage/cohabitation</li>
                <li><strong>Tax:</strong> Not taxable income for recipient; not deductible for payer</li>
                <li><strong>Jurisdiction:</strong> Family Court — can be agreed by consent or ordered by a judge</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How Child Maintenance Is Calculated (CMS 2012 Scheme)</h2>
        <p className="text-muted-foreground text-sm mb-4">The CMS calculates child maintenance based on the paying parent's gross weekly income:</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse border">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-2 border text-xs">Gross Weekly Income</th>
                <th className="text-left p-2 border text-xs">1 Child</th>
                <th className="text-left p-2 border text-xs">2 Children</th>
                <th className="text-left p-2 border text-xs">3+ Children</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border text-muted-foreground">Up to £100</td><td className="p-2 border text-muted-foreground">Nil / £7</td><td className="p-2 border text-muted-foreground">Nil / £11</td><td className="p-2 border text-muted-foreground">Nil / £13</td></tr>
              <tr className="bg-muted/30"><td className="p-2 border text-muted-foreground">£100–£800</td><td className="p-2 border text-muted-foreground">12%</td><td className="p-2 border text-muted-foreground">16%</td><td className="p-2 border text-muted-foreground">19%</td></tr>
              <tr><td className="p-2 border text-muted-foreground">£800–£3,000</td><td className="p-2 border text-muted-foreground">9%</td><td className="p-2 border text-muted-foreground">12%</td><td className="p-2 border text-muted-foreground">15%</td></tr>
              <tr className="bg-muted/30"><td className="p-2 border text-muted-foreground">Over £3,000</td><td className="p-2 border text-muted-foreground">Court discretion</td><td className="p-2 border text-muted-foreground">Court discretion</td><td className="p-2 border text-muted-foreground">Court discretion</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mb-6">Figures are approximate and reduced for overnight stays (1/7 for each overnight stay per week). Collection fees apply if using the CMS Collect & Pay service.</p>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">How Spousal Maintenance Is Calculated</h2>
        <p className="text-muted-foreground text-sm mb-4">Unlike child maintenance, there is no formula for spousal maintenance. Courts calculate the amount based on:</p>
        <ul className="space-y-2 mb-6 text-sm text-muted-foreground list-disc list-inside ml-2">
          <li>The financially weaker party's income needs (reasonable monthly outgoings minus their income)</li>
          <li>The payer's ability to pay (after meeting their own reasonable needs)</li>
          <li>The length of the marriage and standard of living</li>
          <li>Whether the lower earner made career sacrifices</li>
          <li>Whether the lower earner's income could increase with retraining</li>
        </ul>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Can Both Be Paid at the Same Time?</h2>
        <p className="text-muted-foreground text-sm mb-4">Yes. Child maintenance and spousal maintenance are separate obligations. A non-resident parent may pay both simultaneously — child maintenance calculated by the CMS, and spousal maintenance agreed with the court.</p>
        <p className="text-sm text-muted-foreground mb-6">They are additive — the child maintenance calculation does not reduce the spousal maintenance and vice versa. However, the paying parent's overall affordability is relevant when the court considers spousal maintenance amounts.</p>
        <InlineCTA label="Model Both Types of Maintenance Together" />
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
