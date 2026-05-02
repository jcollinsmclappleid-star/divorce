import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layers, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const matrimonial = [
  "The family home (typically treated as matrimonial regardless of when bought)",
  "Wealth built up during the marriage from either party's earnings",
  "Pension contributions accrued during the marriage",
  "Joint savings and investment accounts opened during the marriage",
  "Business interests built or grown during the marriage",
  "Joint debts incurred during the marriage",
];

const nonMatrimonial = [
  "Assets either party owned at the date of marriage (kept separate)",
  "Inheritance received either before or during the marriage (kept separate)",
  "Gifts from family members specifically to one spouse",
  "Personal injury or other compensation awards to one spouse",
  "Pre-marital pension contributions (sometimes — depends on length of marriage)",
  "Assets clearly traceable to a non-matrimonial source",
];

const factors = [
  { title: "Length of marriage", desc: "The longer the marriage, the more difficult it becomes to ring-fence non-matrimonial wealth. In long marriages, the distinction often blurs and even pre-marital assets are commonly drawn into the matrimonial pot." },
  { title: "Mingling and use", desc: "Non-matrimonial wealth that has been mingled with matrimonial assets — for example, an inheritance used to pay down the family mortgage — typically loses its protected status. Keeping non-matrimonial assets in separate accounts strengthens the ring-fencing argument." },
  { title: "Whether needs require it", desc: "Even where assets are clearly non-matrimonial, they can be drawn into the settlement if the matrimonial pot is insufficient to meet both parties' needs (especially housing needs). Needs trumps the matrimonial/non-matrimonial distinction." },
  { title: "How clearly traceable the source is", desc: "Non-matrimonial wealth must be clearly identifiable. Where the source is clean and well-documented (e.g. a single inheritance into a separate account, never touched), ring-fencing is easier. Where it's been mixed with other money over years, it's much harder." },
];

const faqItems = [
  {
    question: "What's the difference between matrimonial and non-matrimonial assets?",
    answer: "Matrimonial assets are wealth built up during the marriage as the joint product of the partnership. Non-matrimonial assets are wealth that pre-dates the marriage or comes from an external source (typically inheritance or family gift) and has been kept separate from the joint finances. The distinction matters because matrimonial assets are subject to sharing principles, while non-matrimonial assets can sometimes be ring-fenced.",
  },
  {
    question: "Is the family home always matrimonial?",
    answer: "Almost always, yes — even if one party owned it before the marriage. The family home is given a special status as the centre of the family and is typically treated as matrimonial regardless of how it was originally acquired. This is one of the most settled rules in UK family law.",
  },
  {
    question: "What if I inherited money during the marriage and put it into our home?",
    answer: "By doing so you have likely converted the inheritance from non-matrimonial to matrimonial — it has been mingled with a clearly matrimonial asset (the family home). The protection that ring-fencing might otherwise have offered is typically lost in that scenario.",
  },
  {
    question: "Does it matter whose name an asset is in?",
    answer: "Not really. UK family courts look at the substance, not the legal title. A pension in one party's name, savings in one party's account, even a property in one party's name — all are treated by reference to when and how the wealth was built up, not whose name is on the paperwork.",
  },
  {
    question: "Can my business be treated as non-matrimonial?",
    answer: "If the business pre-dates the marriage and has remained essentially unchanged, the original business value may be argued as non-matrimonial. But growth in the business during the marriage is typically matrimonial — the partnership has contributed to it indirectly through one spouse running the home or supporting the other's career. This is fact-specific and often needs expert input.",
  },
  {
    question: "How can I protect non-matrimonial assets in future?",
    answer: "Keep them clearly separate from matrimonial finances — separate accounts, separate names, no mingling. A pre-nuptial or post-nuptial agreement can also strengthen protection (though they are not absolutely binding in UK law, they carry significant weight if properly executed). Take qualified legal advice when you receive any substantial non-matrimonial asset.",
  },
];

const relatedPages = [
  { title: "Pre-Marital Assets in Divorce UK", description: "Detailed guide to assets brought into the marriage.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
  { title: "Is Inheritance Included in Divorce Settlement UK?", description: "How inherited wealth is treated.", href: "/is-inheritance-included-in-divorce-settlement-uk", badge: "Inheritance" },
  { title: "Section 25 Factors in UK Divorce", description: "The legal framework that interprets these distinctions.", href: "/section-25-factors-divorce-uk", badge: "Legal" },
  { title: "Preview the Full Financial Report", description: "Model the impact of ring-fenced assets on your settlement.", href: "/unlock", badge: "Report" },
];

export default function MatrimonialVsNonMatrimonialPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Matrimonial vs Non-Matrimonial Assets in UK Divorce"
      subtitle="The distinction between matrimonial and non-matrimonial assets often shapes the entire settlement. Matrimonial wealth is shared; non-matrimonial wealth can sometimes be ring-fenced — but only if it's been kept separate and the rest of the pot meets both parties' needs."
      documentTitle="Matrimonial vs Non-Matrimonial Assets UK | DivorceCalculatorUK"
      metaDescription="Plain-English guide to matrimonial vs non-matrimonial assets in UK divorce — what's shared, what can be ring-fenced, the role of mingling, and how length of marriage affects the outcome."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Matrimonial vs Non-Matrimonial Assets UK", href: "/matrimonial-vs-non-matrimonial-assets-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          UK family law draws a distinction between matrimonial assets — wealth built up during the marriage as the joint product of the partnership — and non-matrimonial assets, which typically pre-date the marriage or come from an external source like inheritance. Matrimonial assets are subject to sharing principles. Non-matrimonial assets can sometimes be ring-fenced from the settlement. The line between the two is not always clear, and in long marriages the distinction often blurs.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Even where assets are clearly non-matrimonial, they can be drawn into the settlement if needs (especially housing) cannot otherwise be met. Ring-fencing is never absolute — needs come first.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Typical Matrimonial Assets</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {matrimonial.map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border bg-background">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {m}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Typical Non-Matrimonial Assets</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {nonMatrimonial.map((n, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border bg-background">
              <Layers className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {n}
            </div>
          ))}
        </div>
        <InlineCTA label="Model Your Settlement With Ring-Fenced Assets" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Four Factors That Decide Whether Ring-Fencing Holds</h2>
        <div className="space-y-4 mb-8">
          {factors.map((f, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Date of marriage and date of any prior cohabitation",
            "Value of property each party brought into the marriage",
            "Pre-marital savings and investment values (with statements where available)",
            "Inheritance amounts received during the marriage and dates",
            "Gifts from family received during the marriage",
            "Pre-marital pension CETVs at the date of marriage (if obtainable)",
            "Current value of all assets — matrimonial and claimed non-matrimonial",
            "Estimated matrimonial pot once non-matrimonial elements are stripped out",
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
            { label: "The mingling trap", desc: "An inheritance paid into a joint account, or used to fund a deposit on the family home, is typically converted from non-matrimonial to matrimonial. Once mingled, the protection rarely survives." },
            { label: "Long marriage erosion", desc: "Even pristine non-matrimonial assets may lose their protection in a 25-year marriage. The longer the partnership, the more the courts treat the wealth as the joint product of the marriage." },
            { label: "Needs override sharing", desc: "If the matrimonial pot can't meet both parties' housing needs, non-matrimonial assets can be drawn in regardless of how clearly they were ring-fenced. Modest-asset cases rarely allow ring-fencing." },
            { label: "Tracing problems", desc: "After many years and many transactions, tracing money from a non-matrimonial source into a current asset can be difficult or impossible. Without clear documentation, the ring-fencing argument is much harder to maintain." },
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
            "Whether a particular asset would be treated as matrimonial or non-matrimonial in your case",
            "How much weight a court would give to mingling or to the length of your marriage",
            "Whether your needs case overrides the ring-fencing argument",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Which of our assets are realistically defensible as non-matrimonial?</li>
          <li>Has any non-matrimonial wealth been mingled in a way that loses its protection?</li>
          <li>In our case, do needs override any ring-fencing argument?</li>
          <li>How does the length of our marriage affect the analysis?</li>
          <li>What documentation should we be gathering to support the source of any asset?</li>
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
