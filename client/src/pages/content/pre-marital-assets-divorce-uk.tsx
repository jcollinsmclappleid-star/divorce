import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const principles = [
  { title: "The starting position — non-matrimonial", desc: "Assets you owned before the marriage are typically considered non-matrimonial in principle. The starting position is that they belong to the original owner and don't fall to be shared. But this principle is heavily qualified by the factors below." },
  { title: "Mingling can convert pre-marital to matrimonial", desc: "If pre-marital assets are mixed with matrimonial assets — for example, a pre-marital savings account topped up with joint earnings, or pre-marital sale proceeds put into a jointly-owned home — the pre-marital protection often disappears." },
  { title: "Length of marriage erodes protection", desc: "The longer the marriage, the harder it becomes to maintain pre-marital protection. In short marriages, keeping assets separate is relatively common. In long marriages of 15+ years, even pristine pre-marital wealth is often drawn into the matrimonial pot." },
  { title: "Needs can affect pre-marital arguments", desc: "Even where assets are clearly pre-marital and well-documented, they may still need discussion if the matrimonial pot cannot meet both parties' needs. Housing needs are often a key practical issue." },
  { title: "The pre-marital home becoming the family home", desc: "If one party owned the home before the marriage and it became the family residence, the analysis becomes more complex. Pre-marital ownership remains a fact to evidence, but it is not the only issue." },
  { title: "Pre-nuptial agreements add weight", desc: "A pre-nup signed before the marriage does not bind automatically, but it can carry weight if properly executed and the circumstances have not changed materially." },
];

const protective = [
  "Keep pre-marital assets in accounts in your sole name",
  "Don't pay marital expenses from pre-marital accounts",
  "Don't put pre-marital sale proceeds into a jointly-owned property",
  "Document the value of pre-marital assets at the date of marriage",
  "Keep clear records showing the source and movement of pre-marital wealth",
  "Consider a pre-nuptial or post-nuptial agreement",
  "Take qualified legal advice when receiving any substantial pre-marital asset",
  "Keep inheritance evidence separate and documented if you may later need to explain it",
];

const faqItems = [
  {
    question: "Are my pre-marital assets automatically protected?",
    answer: "No — they are protected in principle, but only conditionally. Length of marriage, mingling with matrimonial assets, and the needs of both parties can all dilute or override pre-marital protection. The longer and more financially intertwined the marriage, the weaker the protection becomes.",
  },
  {
    question: "What if I owned the home before we married?",
    answer: "If a pre-marital home became the family home during the marriage, it is almost always treated as matrimonial regardless of who originally owned it. The family home has a special status in UK family law. Pre-marital ownership doesn't override this — though it may be one factor among many in deciding the eventual split.",
  },
  {
    question: "Does a pre-nuptial agreement help explain pre-marital wealth?",
    answer: "It can. A properly prepared pre-nup, with independent legal advice on both sides, disclosure, and enough time before the wedding, can carry weight. Whether it is effective in practice depends on the facts and needs legal advice.",
  },
  {
    question: "Can I protect my inheritance during the marriage?",
    answer: "People who want to preserve the non-matrimonial character of an inheritance often keep it in a separate account in their sole name and avoid using it for joint expenses or family assets. The longer the marriage and the more the inheritance is mingled with matrimonial wealth, the weaker the protection typically becomes. A post-nuptial agreement is another option some couples consider — a qualified family solicitor can advise on what would work in your circumstances.",
  },
  {
    question: "What about growth on pre-marital assets during the marriage?",
    answer: "Passive growth (e.g. an investment portfolio that grew through market movement) often retains its non-matrimonial character. Active growth (e.g. a business that grew because of work done during the marriage) is more likely to be treated as matrimonial. The distinction is often disputed and may need expert input.",
  },
  {
    question: "Will the court look at why we married — to protect assets?",
    answer: "The court won't penalise pre-marital planning. Wanting to protect pre-marital wealth is a legitimate concern and pre-nuptial agreements exist precisely for this purpose. The court's focus is on what's fair given all circumstances, not on motives for getting married.",
  },
];

const relatedPages = [
  { title: "Matrimonial vs Non-Matrimonial Assets", description: "The full framework for separating matrimonial and non-matrimonial wealth.", href: "/matrimonial-vs-non-matrimonial-assets-uk", badge: "Assets" },
  { title: "Is Inheritance Included in Divorce Settlement UK?", description: "How inherited wealth is treated in the settlement.", href: "/is-inheritance-included-in-divorce-settlement-uk", badge: "Inheritance" },
  { title: "Short Marriage Divorce Settlement UK", description: "Where pre-marital evidence may matter more.", href: "/short-marriage-divorce-settlement-uk", badge: "Length" },
  { title: "Preview the Full Financial Report", description: "Model settlement scenarios with separate-asset assumptions.", href: "/unlock", badge: "Report" },
];

export default function PreMaritalAssetsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Pre-Marital Assets in UK Divorce"
      subtitle="Wealth you brought into the marriage may need separate evidence and legal review. Length of marriage, mingling, and the needs of both parties all affect how pre-marital assets are discussed."
      documentTitle="Pre-Marital Assets in Divorce UK | DivorceCalculatorUK"
      metaDescription="How pre-marital assets are treated in UK divorce — what evidence matters, how mingling affects the picture, and what to check before relying on separate-asset assumptions."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Pre-Marital Assets in Divorce UK", href: "/pre-marital-assets-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Wealth you owned before the marriage is, in principle, treated differently from wealth built up during the marriage. The starting position is that pre-marital assets are non-matrimonial — yours, and not subject to sharing. In practice, this principle is heavily qualified. Length of marriage, mingling of pre-marital with matrimonial assets, and the needs of both parties can all dilute or override the protection.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Pre-marital protection is fragile. The simplest way to weaken it is to mingle pre-marital wealth with matrimonial finances — paying joint expenses from a pre-marital account, or using pre-marital sale proceeds for the family home. Once mingled, the protection rarely survives.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things That Shape the Outcome</h2>
        <div className="space-y-4 mb-6">
          {principles.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Settlement With Separate-Asset Assumptions" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Practical Steps That Strengthen Protection</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {protective.map((p, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {p}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Date of marriage and any prior cohabitation start date",
            "Value of property brought into the marriage by each party",
            "Pre-marital savings, investment and ISA values",
            "Inheritance amounts received during the marriage and dates",
            "Pre-marital pension CETVs at date of marriage (if obtainable)",
            "Current value of those same assets and any growth",
            "Total length of the marriage in years",
            "Total current matrimonial pot for context",
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
            { label: "Tracing problems after years of mingling", desc: "After many years of joint finances, tracing pre-marital wealth into current assets is often impossible. Without clear documentation showing the source and movement of money, the protection argument is much harder to maintain." },
            { label: "Pre-marital home becoming the family home", desc: "If one party owned the property before marriage and the family lived there, pre-marital ownership becomes one factor in a wider analysis that also includes needs, contributions and affordability." },
            { label: "Active vs passive growth", desc: "Growth on pre-marital assets is sometimes split between passive growth (which retains pre-marital character) and active growth from work during the marriage (which becomes matrimonial). This distinction is often disputed and may need expert evidence." },
            { label: "Needs can affect separate-asset arguments", desc: "Where the matrimonial pot cannot meet both parties' housing needs, pre-marital assets may still need discussion. In modest-asset cases, simple separation of assets may be difficult." },
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
            "Whether your specific pre-marital assets need separate review or may be treated as part of the wider financial picture",
            "How growth during the marriage period should be evidenced and discussed",
            "Whether mingling has gone far enough to lose the pre-marital character",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Which of my pre-marital assets are realistically defensible as non-matrimonial?</li>
          <li>Has any pre-marital wealth been mingled in a way that loses the protection?</li>
          <li>Would needs override a non-matrimonial argument in our case?</li>
          <li>Is a post-nuptial agreement worth considering for any inherited or pre-marital wealth?</li>
          <li>What documentation should I be gathering to support the source of pre-marital assets?</li>
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
