import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const factors = [
  { title: "1. Income, earning capacity, property and other financial resources", desc: "What each party currently has and what they could reasonably acquire in the foreseeable future. This includes wages, investment income, property, savings, pensions and any reasonable expectation of future inheritance or business proceeds." },
  { title: "2. Financial needs, obligations and responsibilities", desc: "What each party (and the children) need going forward — somewhere appropriate to live, day-to-day living costs, ongoing debts and any care responsibilities. In modest-asset cases, this is often the dominant factor." },
  { title: "3. Standard of living during the marriage", desc: "The lifestyle the family had during the marriage. Courts try to avoid a sharp drop in standard of living for either party where the resources allow, though equal living standards are not always achievable." },
  { title: "4. Age of the parties and length of the marriage", desc: "Longer marriages tend toward equal sharing of assets built during the marriage. Older parties closer to retirement are typically given more weight on income and pension provision." },
  { title: "5. Any physical or mental disability", desc: "A disability affecting earning capacity or care needs is a significant factor and may justify a larger share of the assets to the affected party." },
  { title: "6. Contributions made by each party", desc: "Both financial contributions (income, business success) and non-financial contributions (caring for children, running the home) are recognised — the courts have repeatedly confirmed they count equally." },
  { title: "7. Conduct (in exceptional cases only)", desc: "Conduct is rarely relevant. Only conduct so serious it would be inequitable to disregard it (e.g. dissipating assets, serious financial misconduct) is normally taken into account." },
  { title: "8. Loss of pension or other benefits", desc: "Where divorce will cause one party to lose a benefit they would otherwise have had — most commonly pension survivor benefits — that loss is factored in." },
];

const principles = [
  "Welfare of any minor children is the court's first consideration",
  "Equal sharing is a starting point in long marriages — but not a rule",
  "Needs (especially housing) are typically met before sharing principles apply",
  "Compensation may be relevant where one party has given up career prospects",
  "Pre-marital, inherited and gifted assets can sometimes be ring-fenced",
  "A clean break is preferred where it is fair and achievable",
  "Financial misconduct is taken into account only in exceptional cases",
  "Cases are decided on their own facts — outcomes are highly fact-specific",
];

const faqItems = [
  {
    question: "Are the Section 25 factors weighted equally?",
    answer: "No. The court applies the factors holistically to reach a fair outcome — it doesn't tot them up like a scorecard. In modest-asset cases, needs (factor 2) often dominates. In high-net-worth long marriages, sharing of matrimonial assets is often the central principle. Welfare of children is the first consideration in every case.",
  },
  {
    question: "Where do I find Section 25?",
    answer: "Section 25 is part of the Matrimonial Causes Act 1973. The factors listed there have been refined and interpreted by case law over the decades — most notably in White v White (2000) which established the equal sharing principle, and Miller; McFarlane (2006) which developed the principles of needs, sharing and compensation.",
  },
  {
    question: "What does 'first consideration is the welfare of any minor child' mean?",
    answer: "Any child of the family who is under 18 has their welfare considered first by the court. In practice this often means making sure the parent with day-to-day care has somewhere suitable for the children to live, even if that means an unequal capital split.",
  },
  {
    question: "How does conduct affect the outcome?",
    answer: "Conduct is rarely a factor. Bad behaviour during the marriage (an affair, for example) almost never affects the financial outcome. Only financial misconduct so serious it would be inequitable to ignore — such as deliberately dissipating assets to reduce the pot — is normally taken into account.",
  },
  {
    question: "Is there a Section 25 calculator?",
    answer: "No reliable calculator can apply the Section 25 factors mechanically — the factors require human judgement on contributions, needs, contributions and lifestyle. What financial modelling can do is show the numerical implications of different settlement scenarios, so you can understand the outcome of any given split.",
  },
  {
    question: "Do the Section 25 factors apply to civil partnerships?",
    answer: "Yes. The same statutory framework applies to civil partnership dissolution under the Civil Partnership Act 2004, which mirrors the Section 25 factors of the Matrimonial Causes Act 1973.",
  },
];

const relatedPages = [
  { title: "What Am I Entitled to in a Divorce UK?", description: "How the factors typically play out in practice.", href: "/what-am-i-entitled-to-in-divorce-uk", badge: "Entitlement" },
  { title: "Matrimonial vs Non-Matrimonial Assets", description: "How courts decide what counts as shared wealth.", href: "/matrimonial-vs-non-matrimonial-assets-uk", badge: "Assets" },
  { title: "Financial Remedy Proceedings UK", description: "The court process where Section 25 is applied.", href: "/financial-remedy-proceedings-uk", badge: "Court" },
  { title: "Preview the Full Financial Report", description: "See the financial picture across multiple settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function Section25FactorsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Section 25 Factors in UK Divorce: The Legal Framework"
      subtitle="Section 25 of the Matrimonial Causes Act 1973 sets out the factors a court must consider when deciding a financial settlement. There is no formula — the court weighs these factors to reach a fair outcome."
      documentTitle="Section 25 Factors UK Divorce | DivorceCalculatorUK"
      metaDescription="A plain-English guide to the Section 25 factors of the Matrimonial Causes Act 1973 — the framework UK courts use to decide divorce financial settlements in England and Wales."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Section 25 Factors UK Divorce", href: "/section-25-factors-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Section 25 is the framework UK family courts use to decide financial settlements on divorce. Rather than a fixed formula, it lists factors the court must take into account — income, needs, contributions, the standard of living during the marriage, and several others. The court applies them holistically to reach what it considers fair on the facts of the case. Decades of case law (most notably White v White and Miller; McFarlane) have refined how the factors interact in practice.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Section 25 is interpreted holistically — there is no scorecard. Two broadly similar cases can be decided differently because of how a single factor (e.g. housing needs) plays out. This guide explains the framework — apply it to your situation with a qualified family solicitor.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Eight Statutory Factors</h2>
        <div className="space-y-4 mb-6">
          {factors.map((f, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{f.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model How Different Splits Affect You Financially" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Key Principles That Sit Alongside the Factors</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {principles.map((p, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {p}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Length of marriage in full years (and any prior cohabitation)",
            "Age of each party at the date of separation",
            "Combined gross annual income (both parties)",
            "Total capital pool — assets minus liabilities",
            "Number and ages of dependent children",
            "Combined pension CETVs (workplace, personal, SIPPs)",
            "Family home equity after typical 2–3% sale costs",
            "Estimated monthly income need for each party post-separation",
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
            { label: "Needs vs sharing tension", desc: "In modest-asset cases the entire pot may be needed to meet both parties' housing and income needs — leaving no room for sharing principles to operate. In larger asset cases, sharing of matrimonial wealth becomes the dominant principle." },
            { label: "Treatment of pre-marital wealth", desc: "Wealth one party brought into the marriage can be argued as 'non-matrimonial' and ring-fenced — but this protection erodes over time, especially in long marriages where wealth has been mingled or used for the family." },
            { label: "Pension division", desc: "Pensions accrued during the marriage are matrimonial property. Where pension values are very different between parties (often the case where one was a stay-at-home parent), the equalisation question becomes central." },
            { label: "Standard of living during the marriage", desc: "If the family enjoyed a high standard of living, both parties typically expect to maintain something close to it post-divorce. Where the resources don't stretch to two such households, both parties usually face some adjustment downward." },
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
            "How qualified legal advice might assess needs vs sharing in your specific case",
            "Whether your contributions or pre-marital wealth would be treated as significant",
            "What range of outcomes a judge would consider reasonable for your case",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>In our case, is needs likely to dominate over sharing — or vice versa?</li>
          <li>What weight is likely to be attached to pre-marital or inherited assets in our circumstances?</li>
          <li>Is there any conduct that would be relevant under Section 25?</li>
          <li>How might the court weigh the standard of living we enjoyed during the marriage?</li>
          <li>Are compensation arguments (e.g. for career sacrifice) likely to be relevant?</li>
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
