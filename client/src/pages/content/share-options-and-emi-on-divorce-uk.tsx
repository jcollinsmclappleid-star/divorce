import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, TrendingUp } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "EMI options — tax advantaged", desc: "Enterprise Management Incentive options are HMRC-approved options granted by qualifying SMEs. They have generous tax treatment — no income tax or NIC on exercise (where the strike price is at market value), and BADR may apply on disposal. Common in tech/start-up sector." },
  { title: "CSOP and SAYE schemes", desc: "Company Share Option Plans (CSOPs) and SAYE share save schemes are other HMRC-approved schemes with their own tax treatment. Less generous than EMI but still tax-advantaged compared to unapproved options." },
  { title: "Unapproved options", desc: "Plain employee share options — no HMRC tax advantage. Income tax and NIC apply on exercise on the difference between market value and strike price. Often used for senior employees or where the company doesn't qualify for EMI." },
  { title: "Vested vs unvested", desc: "Vested options can be exercised and have an intrinsic value (market value minus strike price). Unvested options depend on continued service or performance conditions and are inherently uncertain. Both must be disclosed but treated differently." },
  { title: "Apportionment for unvested options", desc: "Like RSUs, unvested options are typically apportioned between work done during the marriage (matrimonial) and work to be done post-separation (non-matrimonial). Time-based formulas are common but contested for performance-based options." },
  { title: "Liquidity rarely available", desc: "Private company options can rarely be exercised for cash without an exit event (sale, IPO). Options are typically dealt with via deferred sharing on actual exercise, or capitalised at present value with appropriate discounts." },
];

const figures = [
  "Full schedule of all option grants (EMI, CSOP, SAYE, unapproved)",
  "Strike price and market value at grant for each grant",
  "Vesting schedule (time-based and performance conditions)",
  "Current valuation of underlying shares (409A or independent)",
  "Tax position on exercise (income tax, NIC, CGT, BADR)",
  "Any exit event in prospect (M&A discussions, IPO plans)",
  "Exercise window after termination of employment",
  "Any leaver provisions (good leaver vs bad leaver treatment)",
];

const faqItems = [
  { question: "How are EMI options treated in UK divorce?", answer: "EMI options are part of the matrimonial pot. Vested options have an intrinsic value (market value minus strike price); unvested options are apportioned between matrimonial and post-separation work. The tax-advantaged nature of EMI is preserved if the options remain with the original holder — transferring them to the other spouse usually loses EMI tax treatment." },
  { question: "What's the difference between EMI and unapproved options?", answer: "EMI is HMRC-approved with very generous tax treatment — no income tax or NIC on exercise where the strike was at market value, and BADR-eligible. Unapproved options attract income tax and NIC on exercise on the gain over strike. The tax difference can be 30–40% of the gain — material to settlement valuation." },
  { question: "Can I share my options with my spouse?", answer: "Generally no — most option schemes are non-transferable by their terms. The practical choices are: defer division until exercise (sharing the net proceeds), capitalise the options at present value (with appropriate discounts), or offset against other matrimonial assets. Direct transfer is rarely possible and would usually lose tax advantages." },
  { question: "What about options granted during the marriage but vesting after?", answer: "Typically apportioned: the portion attributable to work performed during the marriage is matrimonial; the portion attributable to future post-separation work is not. Time-based formulas are common — for example, if 60% of vesting period was during the marriage, 60% of the option is matrimonial." },
  { question: "How are options valued in divorce?", answer: "Vested options at intrinsic value (market value of the share minus strike price). Unvested options at intrinsic value with discounts for vesting risk. For private companies, the underlying share value usually requires forensic accountant or 409A-style valuation. Deferred sharing on actual exercise is often preferred where valuation is uncertain." },
  { question: "What if the company gets sold or floats?", answer: "An exit event triggers exercise and crystallises value. Where the divorce settlement included deferred sharing, the receiving party gets their agreed share of net proceeds. Where the settlement capitalised the options at present value, the holder keeps any upside (but also bore the risk of failure)." },
];

const relatedPages = [
  { title: "Bonuses, RSUs and Stock Options Divorce UK", description: "How variable pay is treated.", href: "/bonuses-rsus-divorce-uk", badge: "Equity" },
  { title: "Limited Company Shares on Divorce UK", description: "Valuing private company shares.", href: "/limited-company-shares-on-divorce-uk", badge: "Business" },
  { title: "Capital Gains Tax on Divorce UK", description: "CGT on share disposals.", href: "/capital-gains-tax-on-divorce-uk", badge: "Tax" },
  { title: "Preview the Full Financial Report", description: "Model option-heavy settlements.", href: "/unlock", badge: "Report" },
];

export default function ShareOptionsEmiPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Share Options and EMI on Divorce UK — Valuation, Apportionment and Tax"
      subtitle="EMI, CSOP and unapproved options are common in tech and growth companies. Each has different tax treatment. Vesting, apportionment and the lack of liquidity in private company options all complicate division."
      documentTitle="Share Options and EMI on Divorce UK | DivorceCalculatorUK"
      metaDescription="Share options and EMI on divorce UK. EMI tax treatment, CSOP, SAYE, unapproved options, vested vs unvested, apportionment for matrimonial portion, deferred sharing structures."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Share Options and EMI on Divorce UK", href: "/share-options-and-emi-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Share options — particularly Enterprise Management Incentive (EMI) options in growth companies and unapproved options in larger employers — are often the most contested elements of high-earner divorce settlements. The tax treatment varies sharply between approved and unapproved schemes, vesting may stretch years past separation, and private company options usually have no liquidity until an exit event. Apportionment between matrimonial and post-separation work is fact-specific and often disputed.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">EMI's generous tax treatment depends on the options remaining with the original holder. Direct transfer to a divorcing spouse usually loses the EMI status — turning a tax-advantaged option into a fully-taxed one. Settlement structures should account for this.</p>
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
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Option Scenarios" />
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
            { label: "Apportionment of unvested options", desc: "Time-based apportionment is common but blunt for performance-based vesting. Where options vest only on hitting commercial milestones, the matrimonial portion calculation can be highly contested." },
            { label: "Underlying share valuation", desc: "Private company option value depends on share value. Without a recent funding round or 409A valuation, share valuation requires forensic accounting input — and is often hotly disputed." },
            { label: "Vesting risk and forfeiture", desc: "Options forfeited on leaving the employer (bad leaver) reduce realised value to nil. Options dependent on continued service can disappear if the holder is made redundant. Discount factors for vesting risk vary widely." },
            { label: "Exit event uncertainty", desc: "Many start-up options are only valuable at acquisition or IPO. Both events are uncertain in timing and value. Deferred sharing structures are often preferred where exit is the only liquidity route." },
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
            "What underlying share value should be used in option valuation",
            "What apportionment formula is right for performance-based options",
            "Whether deferred sharing or capitalised value is the better structure for your case",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a forensic accountant to value the underlying shares?</li>
          <li>How should unvested options be apportioned in our case?</li>
          <li>What discount factor applies for vesting and forfeiture risk?</li>
          <li>Should we use deferred sharing or capitalise the options now?</li>
          <li>What is the tax cost of any exercise needed to fund the settlement?</li>
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
