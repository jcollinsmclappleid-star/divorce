import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, TrendingUp } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "London is the 'divorce capital'", desc: "England and Wales is widely considered one of the most generous jurisdictions in the world for the financially weaker spouse — particularly in long marriages. International couples with a UK connection often see significant differences in outcomes versus continental jurisdictions." },
  { title: "Equal sharing as a starting point", desc: "After White v White (2000) and Miller/McFarlane (2006), equal sharing of matrimonial assets is the default starting point in long-marriage HNW cases. Departures from equality require a principled basis — typically needs of one party, or a non-matrimonial origin of specific assets." },
  { title: "Matrimonial vs non-matrimonial property", desc: "Inherited wealth, pre-marital assets and gifts may need separate review. Needs, mingling and the length of the marriage can all affect how those assets are discussed." },
  { title: "Business interests need specialist valuation", desc: "Owner-managed businesses, partnership interests and private equity stakes require forensic accounting valuations and detailed scrutiny of how value should be split. Liquidity is usually limited, so structuring (deferred payments, share transfers, earn-outs) matters." },
  { title: "Trusts, structures and offshore assets", desc: "HNW divorces frequently involve trusts (UK and offshore), corporate structures and assets held in non-UK jurisdictions. Disclosure obligations apply to all of these. Hiding assets is rarely successful — costs and adverse inferences make it counter-productive." },
  { title: "Costs are higher but proportionate", desc: "HNW financial remedy proceedings can cost £100k+ per side through to a final hearing — but as a percentage of the matrimonial pot this is usually small. Conduct of litigation matters: the court can and does make adverse cost orders against parties who litigate unreasonably." },
];

const figures = [
  "Full asset schedule including all properties (UK and overseas)",
  "Pension CETVs for all schemes (UK and overseas)",
  "Up-to-date company valuations for any business interests",
  "Trust deeds and beneficiary information for any settled trusts",
  "All bank accounts and investment portfolios (3 years of statements)",
  "Schedules of art, jewellery, classic cars and other chattels of value",
  "Tax returns and HMRC correspondence (5 years)",
  "Any pre or post-nuptial agreements",
];

const faqItems = [
  { question: "Why is London called the 'divorce capital of the world'?", answer: "Because the courts in England and Wales tend to be relatively generous to the financially weaker spouse, especially in long marriages. The combination of equal-sharing principles, broad disclosure requirements, and a willingness to share both income and capital fairly between long-married couples makes London a comparatively favourable jurisdiction for the lower-earning party." },
  { question: "Are pre-nuptial agreements binding in HNW divorces?", answer: "Pre-nups are not strictly binding in England and Wales but the Supreme Court in Radmacher v Granatino (2010) established that they will be given decisive weight if entered into freely, with full disclosure, with proper independent legal advice, and where the agreement is fair in the circumstances. HNW couples should treat them as effectively binding when properly executed." },
  { question: "Can my spouse hide assets in a HNW divorce?", answer: "It is harder than it appears. Disclosure obligations are extensive, the court can order third-party disclosure (banks, accountants), and adverse inferences are routinely drawn against parties who fail to disclose. International asset tracing through specialist firms is now well established. Hiding assets typically results in worse outcomes for the hiding party once discovered." },
  { question: "How are private companies valued in divorce?", answer: "Forensic accountants typically use a combination of approaches: maintainable earnings (EBITDA multiplied by an appropriate multiple), net asset value, and discounted cash flow. The valuation date matters, as does liquidity. The court is usually realistic about the difference between a paper valuation and what can actually be extracted as cash." },
  { question: "What happens to assets held in trust?", answer: "It depends on the type of trust and the level of effective control. A 'sham' trust where the settlor retains real control is treated as the settlor's own asset. A genuine discretionary trust where the divorcing party is one beneficiary among many may be treated as a 'financial resource' that can be taken into account, even if not directly divisible. Specialist trust evidence is normally needed." },
  { question: "How long do HNW divorces take?", answer: "More complex than typical cases — usually 12 to 24 months from issue to final order, often longer if business valuations or international assets are involved. The court process includes the First Directions Appointment (FDA), a Financial Dispute Resolution (FDR) appointment, and a final hearing if needed. Most HNW cases settle at or before FDR." },
];

const relatedPages = [
  { title: "Section 25 Factors Divorce UK", description: "The legal framework that drives every settlement.", href: "/section-25-factors-divorce-uk", badge: "Law" },
  { title: "Matrimonial vs Non-Matrimonial Assets UK", description: "What may need separate review.", href: "/matrimonial-vs-non-matrimonial-assets-uk", badge: "Assets" },
  { title: "Pre-Marital Assets Divorce UK", description: "Evidence for wealth brought into the marriage.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
  { title: "Preview the Full Financial Report", description: "Model complex settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function HighNetWorthDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="High Net Worth Divorce UK — How Complex Settlements Are Resolved"
      subtitle="HNW divorces involve businesses, trusts, international assets and substantial pensions. England and Wales is widely seen as one of the most generous jurisdictions for the financially weaker spouse. Here is the framework."
      documentTitle="High Net Worth Divorce UK | DivorceCalculatorUK"
      metaDescription="High net worth divorce UK explained. Equal sharing principles, business valuations, trusts, international assets, pre-nups, disclosure and the financial remedy process for HNW cases."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "High Net Worth Divorce UK", href: "/high-net-worth-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          High net worth divorces in England and Wales typically involve business interests, complex investment portfolios, trust structures, international assets and substantial pensions. London's reputation as one of the world's most generous divorce jurisdictions for the financially weaker spouse — particularly in long marriages — is well earned. The framework remains the Matrimonial Causes Act 1973 section 25, but the application in HNW cases is shaped by the leading cases (White, Miller/McFarlane, Charman, Radmacher) which together establish equal sharing of matrimonial assets, careful treatment of non-matrimonial property and the weight given to nuptial agreements.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">In HNW cases, the cost of getting disclosure, valuations and structuring right is small compared to the cost of getting them wrong. Specialist input — forensic accountant, pensions on divorce expert, tax adviser and a senior family lawyer — is almost always justified by the values at stake.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Defining Features of HNW Divorces</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Complex Settlement Scenarios" />
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
            { label: "Liquidity vs paper value", desc: "A £20m business may be worth £20m on paper but yield far less in cash without affecting the underlying enterprise. Settlements often involve deferred payments, share transfers or earn-outs to bridge the liquidity gap." },
            { label: "Mingling of non-matrimonial property", desc: "Inherited or pre-marital wealth used to buy the family home or fund family lifestyle may be harder to treat separately. Separate-asset arguments depend heavily on how cleanly property was kept separate during the marriage." },
            { label: "Forum disputes", desc: "International couples may have jurisdiction issues to resolve. Where proceedings are issued can materially affect process and outcome, so specialist advice is important." },
            { label: "Litigation conduct and costs", desc: "The court can and does make adverse cost orders where one party litigates unreasonably, fails to engage with FDR, or makes manifestly unrealistic offers. HNW litigation strategy needs to be reasonable as well as robust." },
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
            "How a private company should be valued for matrimonial purposes",
            "Whether trust assets are part of the matrimonial pot or merely a 'resource'",
            "What jurisdiction to issue in for an internationally-mobile couple",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we have a jurisdiction question that needs specialist advice?</li>
          <li>What forensic accountancy, pension and trust expert input is needed?</li>
          <li>How should non-matrimonial asset evidence be reviewed in our circumstances?</li>
          <li>How much weight may our pre-nup or post-nup carry?</li>
          <li>What is the realistic litigation budget through to FDR and (if needed) final hearing?</li>
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
