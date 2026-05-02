import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Users } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "For unmarried parents — children's needs", desc: "Schedule 1 of the Children Act 1989 allows financial applications for the benefit of children whose parents were never married (or who were married but the divorce financial provisions don't apply, e.g. children of a previous relationship)." },
  { title: "Five types of order", desc: "The court can order: (1) periodical payments to the parent for the child, (2) lump sum payments, (3) settlement of property for the child's benefit, (4) transfer of property for the child's benefit, and (5) maintenance for school fees." },
  { title: "Property usually held until child reaches majority", desc: "Schedule 1 property settlements typically provide a home for the child until they finish education (usually 18 or end of full-time tertiary education). The property then reverts to the paying parent. The receiving parent does not own the property outright." },
  { title: "Lump sums to cover specific needs", desc: "Lump sums can be ordered for specific identified needs — typically a deposit for housing, a car for the carer, school fees, or one-off expenses linked to the child's welfare. Repeated lump sum applications are possible." },
  { title: "Periodical payments alongside CMS", desc: "The Child Maintenance Service has primary jurisdiction over routine child maintenance. Schedule 1 periodical payments are typically used for 'top-up' maintenance above CMS levels (where the paying parent's gross income exceeds the £156k CMS cap) or for specific needs not covered by CMS." },
  { title: "Court considers the parents' resources", desc: "Schedule 1 awards depend on the actual resources available, including income, capital and earning capacity. Wealthy paying parents may face substantial Schedule 1 awards; awards against modest-income parents are correspondingly modest." },
];

const figures = [
  "Children's ages and dependency status",
  "Schedule of the resident parent's income, assets and needs",
  "Schedule of the paying parent's income, assets and capacity",
  "Current housing situation for the children",
  "Schools, fees and any specific child-related costs",
  "Any CMS calculation already in place",
  "Property options if a settlement of property is sought",
  "Any relevant prior agreements between the parents",
];

const faqItems = [
  { question: "What is Schedule 1 of the Children Act 1989?", answer: "Schedule 1 allows financial applications for the benefit of children — primarily where the parents were not married (so the divorce financial framework doesn't apply) or where the divorce framework is not available. Orders include periodical payments, lump sums, settlement and transfer of property, and school fee maintenance. Applications are made by the parent or guardian on behalf of the child." },
  { question: "Can I get a house for the children under Schedule 1?", answer: "Often yes, in a 'settlement of property' order. The court can require the wealthier parent to provide a property to be held on trust for the benefit of the children — typically until they finish full-time education (often 18, sometimes through university). The property usually reverts to the paying parent at that point. The receiving parent does not own the property outright." },
  { question: "Is Schedule 1 the same as child maintenance?", answer: "No. Routine child maintenance is generally handled by the Child Maintenance Service (CMS) using its statutory formula. Schedule 1 is used for additional financial provision the CMS cannot or does not address — particularly 'top-up' maintenance for higher earners (above the £156,000 CMS gross income cap), school fees, lump sums and property provision." },
  { question: "Does Schedule 1 give the resident parent any rights?", answer: "No — that's a critical limitation. Schedule 1 awards are for the children's benefit. The resident parent does not get assets transferred to them in their own right. A property settlement order provides a home but reverts to the paying parent when the children finish education. There is no equivalent of the divorce 'sharing' principle." },
  { question: "Can Schedule 1 be used against a wealthy ex-partner?", answer: "Yes — and is increasingly used for high-earning unmarried fathers. Substantial property settlements, school fee orders, and 'top-up' maintenance awards have been made in cases involving very wealthy paying parents. The award depends on the children's reasonable needs assessed against the paying parent's resources, not on a sharing principle." },
  { question: "How long do Schedule 1 orders last?", answer: "Periodical payments typically last until the child reaches majority or finishes full-time tertiary education. Property settlements typically end at the same point, with the property reverting to the paying parent. Lump sums are one-off but further lump sum applications are not barred. School fee orders typically last while the child is in fee-paying education." },
];

const relatedPages = [
  { title: "Common Law Marriage UK Myth", description: "Why unmarried couples have limited rights.", href: "/common-law-marriage-uk-myth", badge: "Cohabitation" },
  { title: "TOLATA Claim Cohabitation UK", description: "Property disputes between unmarried partners.", href: "/tolata-claim-cohabitation-uk", badge: "Property" },
  { title: "Child Maintenance vs Spousal Maintenance UK", description: "How CMS works for routine child maintenance.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Children" },
  { title: "Preview the Full Financial Report", description: "Model financial scenarios for children.", href: "/unlock", badge: "Report" },
];

export default function Schedule1Page() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Schedule 1 Children Act UK — Financial Provision for Children of Unmarried Parents"
      subtitle="Schedule 1 allows financial applications for children's benefit — periodical payments, lump sums, property settlements and school fees — where the parents were not married. Used heavily for high-earning unmarried fathers."
      documentTitle="Schedule 1 Children Act UK | DivorceCalculatorUK"
      metaDescription="Schedule 1 Children Act 1989 UK explained. Periodical payments, lump sums, property settlements, school fees and top-up maintenance for children of unmarried parents."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Schedule 1 Children Act UK", href: "/schedule-1-children-act-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Schedule 1 of the Children Act 1989 is the main route for financial provision for children of unmarried parents. The financial provisions of the Matrimonial Causes Act do not apply to unmarried couples on separation — but children of those relationships still need housing, maintenance, school fees and other support. Schedule 1 fills that gap. The orders are for the children's benefit, not the resident parent's: a property settlement, for example, provides a home until the children finish education and then reverts to the paying parent.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Schedule 1 does not give the resident parent ownership of any assets — only use of them for the children's benefit until they finish education. For unmarried parents who relied on the relationship financially, this is often a hard reality. Cohabitation agreements remain the only way to create direct rights between unmarried partners.</p>
          </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things You Need to Know</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Schedule 1 Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Will Need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {figures.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Property reverts at end of dependency", desc: "Schedule 1 property settlements end when the children finish education. The receiving parent must then re-house themselves. Long-term housing security usually needs to be planned outside the Schedule 1 framework." },
            { label: "No 'sharing' of paying parent's wealth", desc: "Unlike divorce, Schedule 1 does not give the resident parent a share of the paying parent's wealth. The award is calibrated to the children's needs, not to fairness between the parents." },
            { label: "Top-up maintenance only above CMS cap", desc: "CMS has primary jurisdiction up to £156,000 gross annual income. Top-up maintenance under Schedule 1 only kicks in above the cap. This protects high earners from broader Schedule 1 maintenance awards." },
            { label: "Costs in Schedule 1 proceedings", desc: "Costs follow the event in Schedule 1 proceedings (unlike divorce financial remedy where the default is no order as to costs). This adds financial risk to applications." },
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
            "What property settlement the children actually need in your case",
            "Whether top-up maintenance above CMS levels is realistic",
            "How school fees should be apportioned between you and the other parent",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What Schedule 1 orders are realistic given the other parent's resources?</li>
          <li>How does Schedule 1 interact with any existing CMS arrangement?</li>
          <li>How long should a property settlement provide for the children?</li>
          <li>What is my long-term housing position once the property reverts?</li>
          <li>What are my cost exposures in Schedule 1 proceedings?</li>
        </ul>
        <InlineCTA label="Compare Settlement Scenarios" />
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
