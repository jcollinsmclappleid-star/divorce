import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const principles = [
  { title: "What 'short marriage' means", desc: "There is no statutory definition. As a rule of thumb, marriages under five years are commonly treated as short, though the period of cohabitation before marriage can also be added to the analysis. Marriages between five and ten years sit in a grey zone where length is one factor among many." },
  { title: "Return to pre-marriage position is the starting point", desc: "Unlike long marriages where equal sharing of matrimonial assets is the starting point, short marriage cases tend toward returning each party to (broadly) the financial position they were in before the marriage — adjusted for needs and any children." },
  { title: "Pre-marital assets need clear evidence", desc: "Wealth either party brought into the marriage may need separate review in a short marriage, especially if the assets have been kept separate and needs can still be met." },
  { title: "Children change the analysis significantly", desc: "Where the short marriage produced children, housing needs for the parent with day-to-day care typically take priority — this can pull the outcome much closer to a needs-based settlement, regardless of marriage length." },
  { title: "Earning capacity loss is rarely a major factor", desc: "Compensation for career sacrifice is uncommon in short marriages because there has typically not been enough time for one spouse's career to be materially affected." },
  { title: "Pension sharing is less common", desc: "Pensions accrued during a short marriage are usually a smaller portion of the total pot, and pension sharing orders are less frequent than in long marriages — though they remain available where appropriate." },
];

const figures = [
  "Date of marriage and date of separation",
  "Period of cohabitation before marriage (sometimes added to the timeline)",
  "Each party's net assets at the date of marriage",
  "Each party's net assets at the date of separation",
  "Increase in matrimonial assets during the marriage",
  "Children's ages and care arrangements",
  "Each party's income at separation",
  "Housing needs going forward (especially if children are involved)",
];

const faqItems = [
  {
    question: "How long is a 'short' marriage in UK divorce?",
    answer: "There is no fixed cut-off in UK law. Marriages under five years are commonly treated as short. Some cases also count meaningful periods of pre-marital cohabitation, which can lengthen the relationship for analysis purposes. Five to ten years is a grey zone where length is one factor among many.",
  },
  {
    question: "Do pre-marital assets matter more in a short marriage?",
    answer: "They can. Assets brought into the marriage and kept separate may need different evidence and legal review from assets built together. If they have been used for the family or mingled with matrimonial wealth, the analysis becomes more complex.",
  },
  {
    question: "Does the 50/50 starting point apply to short marriages?",
    answer: "Less strongly. The equal sharing principle applies most clearly to wealth built during a long marriage. In short marriages, the focus tends to be on returning parties to broadly the position they were in before — particularly where the matrimonial pot built during the marriage itself is small.",
  },
  {
    question: "What if we have children from the short marriage?",
    answer: "This changes the analysis significantly. Children's housing and welfare needs take priority and can drive a more needs-based outcome regardless of the marriage being short. The parent with day-to-day care typically needs suitable housing — sometimes funded from the other party's pre-marital wealth if needs cannot otherwise be met.",
  },
  {
    question: "Will I get spousal maintenance after a short marriage?",
    answer: "Spousal maintenance after short marriages is less common — courts are reluctant to impose long-term financial obligations following a brief relationship. Where awarded, terms tend to be short and aimed at adjustment rather than long-term support. Child maintenance, if there are children, is calculated separately.",
  },
  {
    question: "What about pre-marital cohabitation?",
    answer: "Periods of cohabitation immediately before marriage that were settled and committed are sometimes added to the marriage length for analysis. This is more common where the parties bought property together or had children before marrying. It is fact-specific.",
  },
];

const relatedPages = [
  { title: "Long Marriage Divorce Settlement UK", description: "How outcomes differ in marriages of 15+ years.", href: "/long-marriage-divorce-settlement-uk", badge: "Comparison" },
  { title: "Pre-Marital Assets in Divorce UK", description: "How wealth brought into the marriage is treated.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
  { title: "Matrimonial vs Non-Matrimonial Assets", description: "The legal distinction that matters most in short marriages.", href: "/matrimonial-vs-non-matrimonial-assets-uk", badge: "Assets" },
  { title: "Preview the Full Financial Report", description: "Model your settlement using your actual figures.", href: "/unlock", badge: "Report" },
];

export default function ShortMarriageSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Short Marriage Divorce Settlement UK"
      subtitle="Short marriages are typically treated differently from long ones — pre-marital wealth is more strongly protected, the 50/50 starting point applies less rigidly, and the focus is often on returning each party to roughly the position they were in before."
      documentTitle="Short Marriage Divorce Settlement UK | DivorceCalculatorUK"
      metaDescription="How UK divorce settlements treat short marriages — protection of pre-marital assets, the role of children, pension sharing, and how length of marriage influences the outcome."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Short Marriage Divorce Settlement UK", href: "/short-marriage-divorce-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The length of a marriage is one of the statutory factors a UK court must consider when deciding a financial settlement. In short marriages — typically those under five years — the analysis tends to differ from long marriages. The equal sharing principle that dominates long-marriage cases applies less strongly, and the focus tends to be on returning each party to broadly the position they were in before the marriage, with adjustments for needs and any children.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">"Short marriage" is not a defence against a fair settlement. Where there are children, where one party has substantially weaker resources, or where pre-marital wealth has been mingled, outcomes can look much closer to a long-marriage settlement.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">How Short Marriages Are Typically Approached</h2>
        <div className="space-y-4 mb-6">
          {principles.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Short-Marriage Settlement" />
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
            { label: "Mingling of pre-marital assets", desc: "Even in short marriages, pre-marital assets that have been mingled (for example, sale proceeds put into a jointly-owned home) may lose their protected status. Keeping pre-marital wealth in separate accounts strengthens the non-matrimonial argument." },
            { label: "Children rearrange the analysis", desc: "If children have arrived, housing needs typically dominate. This can produce outcomes that look much closer to a needs-based long-marriage case despite the short marriage." },
            { label: "Pre-marital cohabitation", desc: "Where the parties cohabited substantially before marrying, that period may be added to the marriage length for analysis. This typically pushes outcomes closer to long-marriage principles." },
            { label: "Substantial growth during the marriage", desc: "If matrimonial assets grew significantly during the short marriage — for instance, a business taking off — the increase is matrimonial and subject to sharing principles, even though the underlying business may have pre-dated the marriage." },
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
            "Whether your specific marriage will be treated as 'short' for this purpose",
            "How pre-marital wealth should be evidenced and reviewed in your case",
            "How pre-marital cohabitation may be discussed in your situation",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Will our marriage be treated as short for this purpose?</li>
          <li>Which of my pre-marital assets need separate evidence and legal review?</li>
          <li>Does our cohabitation before marriage change the analysis?</li>
          <li>How does the presence of children affect the short-marriage analysis?</li>
          <li>What is the realistic range of outcomes if this went to court?</li>
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
