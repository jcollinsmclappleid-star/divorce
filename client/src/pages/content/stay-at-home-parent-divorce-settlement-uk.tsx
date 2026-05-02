import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heart, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const considerations = [
  { title: "Recognised contribution to the marriage", desc: "UK law treats child-rearing and homemaking as equal in value to financial contributions. The years spent out of paid work to raise children are not counted against you in the settlement — they are recognised as a contribution to the family." },
  { title: "Career impact and earning capacity", desc: "Time out of paid work typically reduces earning capacity going forward. Courts factor this into both capital provision (which may be larger to compensate) and any spousal maintenance award." },
  { title: "Housing for the children", desc: "The parent with day-to-day care of children typically needs housing suitable for the children. This often means a larger share of the property equity, or retaining the family home until the children are independent." },
  { title: "Pension equalisation", desc: "A stay-at-home parent typically has a much smaller pension than the working spouse — sometimes only the state pension. Pension sharing orders can equalise this position. Pensions are often the most overlooked asset in stay-at-home parent cases." },
  { title: "Spousal maintenance", desc: "Where the receiving party cannot meet income needs from their own earnings (often because returning to work after a long break is difficult), spousal maintenance may be awarded — sometimes for a fixed term, sometimes joint lives in long marriages." },
  { title: "Child maintenance separately", desc: "Child maintenance is calculated separately from any spousal arrangement, normally via the Child Maintenance Service formula. It is not part of the asset division but does affect post-settlement cashflow." },
];

const figures = [
  "Years out of paid work during the marriage",
  "Pre-break earnings (or qualifications/career path interrupted)",
  "Realistic post-divorce earning capacity (after retraining if needed)",
  "Pension value of the working spouse vs the stay-at-home parent",
  "Property equity and mortgage balance on the family home",
  "Children's ages and how long they will be dependent",
  "Family budget — current and projected post-divorce monthly needs",
  "Any childcare costs that would be incurred returning to work",
];

const faqItems = [
  {
    question: "Will my time as a stay-at-home parent count against me?",
    answer: "No — the opposite. UK courts have repeatedly confirmed that homemaking and child-rearing are recognised contributions to the marriage, equal in value to financial contributions. Your years out of paid work are typically a factor in your favour in the settlement assessment.",
  },
  {
    question: "Am I entitled to half the pensions?",
    answer: "Pensions accrued during the marriage are matrimonial assets and form part of the settlement. Equalisation through a pension sharing order is common where one party has a much larger pension than the other — but the actual split depends on overall asset position, ages, and other factors.",
  },
  {
    question: "Can I stay in the family home with the children?",
    answer: "Often yes, particularly while the children are young. Options include: outright transfer of the home (with offsetting elsewhere), retaining a share with deferred sale (Mesher order) until the children are independent, or a buyout if affordable. The right approach depends on overall finances and what's fair given housing needs.",
  },
  {
    question: "Will I get spousal maintenance?",
    answer: "It depends on whether you can meet your own income needs from the capital provided plus your own earning capacity. Where there is a clear income shortfall and the working spouse has surplus income, maintenance is common — sometimes for a fixed term to allow time to return to work, sometimes longer in long marriages.",
  },
  {
    question: "What if I never returned to work and have no earning record?",
    answer: "This is recognised in the settlement. The court considers your realistic earning capacity going forward, not just current earnings. Long career breaks reduce earning capacity, and this typically results in a more generous capital and/or maintenance award. Compensation principles can also apply where career sacrifices were made for the family.",
  },
  {
    question: "Should I get back into work before the financial settlement?",
    answer: "Returning to work demonstrates earning capacity and is generally viewed positively. However, taking the wrong job under pressure can prejudice your position by making your earning capacity look higher than it is sustainably. Take advice on the right approach for your circumstances.",
  },
];

const relatedPages = [
  { title: "Spousal Maintenance After Divorce UK", description: "How ongoing maintenance is calculated and awarded.", href: "/spousal-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "Divorce Where One Earns More UK", description: "How income disparity affects the financial settlement.", href: "/divorce-where-one-earns-more-uk", badge: "Income" },
  { title: "Mesher vs Martin Order UK", description: "Deferred sale arrangements that let one parent stay in the home.", href: "/mesher-vs-martin-order-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model your settlement including pension equalisation and maintenance.", href: "/unlock", badge: "Report" },
];

export default function StayAtHomeParentPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Stay-at-Home Parent Divorce Settlement UK"
      subtitle="If you've been out of paid work raising children, you are not in a weaker position in the settlement — UK law treats homemaking as an equal contribution to financial earning. Here's how the financial settlement typically approaches your situation."
      documentTitle="Stay-at-Home Parent Divorce Settlement UK | DivorceCalculatorUK"
      metaDescription="How UK divorce settlements treat stay-at-home parents — recognition of homemaking contribution, pension equalisation, housing for children, and spousal maintenance. England & Wales guide."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Stay-at-Home Parent Divorce Settlement UK", href: "/stay-at-home-parent-divorce-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A common worry for parents who have been out of paid work for years is that their lack of recent earnings or pension contributions will leave them with little in a divorce settlement. UK family law is designed to recognise this exact situation. Time spent raising children and running the home is a recognised contribution to the marriage, weighed equally with financial contributions — and the financial settlement is designed to address the asymmetry created during the marriage years.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">The single most overlooked asset in stay-at-home parent settlements is pensions. The working spouse may have built a substantial pension over the years; without pension equalisation, the gap can be financially severe at retirement.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things That Shape the Settlement</h2>
        <div className="space-y-4 mb-6">
          {considerations.map((c, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{c.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Settlement Including Pensions and Maintenance" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures You Will Need</h2>
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
            { label: "Underestimating the pension gap", desc: "Many stay-at-home parent cases settle without proper pension equalisation. CETV (Cash Equivalent Transfer Value) figures should be exchanged for every pension on both sides — the difference is often tens of thousands and sometimes hundreds of thousands of pounds." },
            { label: "Returning to work too quickly", desc: "Pressure to demonstrate earning capacity can lead to taking a low-paid job that becomes the benchmark for ongoing income, even though you could earn much more with retraining. Move at the right pace." },
            { label: "Housing for the children", desc: "Where children are involved, suitable housing is typically a priority in the capital division. Trying to preserve the family home when it's unaffordable on a single income leads to financial stress later — sometimes a smaller, more affordable property is the better outcome." },
            { label: "Term of spousal maintenance", desc: "A 'joint lives' maintenance order (lasting until remarriage or death) is now less common than fixed-term maintenance designed to allow gradual return to work. The right term depends on age, qualifications, children's ages and the receiving party's realistic earning capacity." },
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
            "Whether spousal maintenance will be awarded in your case, on what term and at what level",
            "How a court would weigh your specific career sacrifice and earning capacity",
            "Whether retaining the family home is the right answer for your situation",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What is the realistic value of pension equalisation in our case?</li>
          <li>Is spousal maintenance likely, and on what term?</li>
          <li>What is my realistic earning capacity given retraining options?</li>
          <li>Should we be looking at the family home outright, a Mesher order, or a sale and split?</li>
          <li>How does compensation (for career sacrifice) factor into our case?</li>
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
