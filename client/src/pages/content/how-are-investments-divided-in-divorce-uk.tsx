import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrendingUp, AlertTriangle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const investmentTypes = [
  "Stocks and shares ISAs accumulated during the marriage",
  "Share portfolios held in sole or joint names",
  "Unit trusts and OEICs (open-ended investment companies)",
  "Investment bonds (life assurance-based)",
  "Equity in start-ups or unlisted company shareholdings",
  "Employee Share Schemes and Long-Term Incentive Plans (LTIPs)",
];

const faqItems = [
  {
    question: "Who keeps the ISA wrapper after divorce?",
    answer: "ISA allowances and wrappers are individual — you cannot transfer an ISA from one person to another and keep the tax-free wrapper. The assets inside can be transferred and re-invested, but the new holder will need to use their own annual ISA allowance. Specific spousal ISA transfer rules apply in certain circumstances — take financial advice.",
  },
  {
    question: "Can my spouse claim my work bonus invested into shares?",
    answer: "Yes — if bonuses were earned during the marriage and invested, the resulting shares are matrimonial. If bonuses were earned after separation, courts are more likely to treat these as post-separation accrual and exclude them.",
  },
  {
    question: "What if my investment is a business shareholding?",
    answer: "Business shareholdings require specialist valuation — typically by a forensic accountant or business valuator. The valuation method, minority discount, and future income projections all factor in. This is one of the most contested areas in high-value divorces.",
  },
  {
    question: "Can investments be divided without selling?",
    answer: "Yes — if both parties agree, investments can be transferred in specie (without selling) so the receiving party takes the actual assets rather than a cash equivalent. This may have CGT advantages and avoids the need to time a sale.",
  },
];

const relatedPages = [
  { title: "How Are Savings Split in Divorce UK?", description: "How bank accounts and cash savings are treated in divorce.", href: "/how-are-savings-split-in-divorce-uk", badge: "Assets" },
  { title: "Can My Ex Claim My Inheritance in UK Divorce?", description: "When inheritance can and cannot be included in a settlement.", href: "/can-ex-claim-inheritance-uk-divorce", badge: "Assets" },
  { title: "Divorce Financial Settlement Calculator UK", description: "Model your investment portfolio alongside other assets.", href: "/divorce-financial-settlement-calculator-uk", badge: "Calculator" },
];

export default function InvestmentsDividedPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="How Are Investments Divided in Divorce UK?"
      subtitle="Shares, ISAs, unit trusts, and portfolios are treated as matrimonial assets if built up during the marriage. Valuations fluctuate, unvested shares add complexity — here's how courts approach investment division."
      documentTitle="How Are Investments Divided in Divorce UK? | DivorceCalculatorUK"
      metaDescription="Understand how investments including shares, ISAs, LTIPs, and portfolios are divided in UK divorce. Valuation timing, CGT considerations, and employee share schemes explained."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "How Are Investments Divided in Divorce UK?", href: "/how-are-investments-divided-in-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Investments — including shares, stocks and shares ISAs, unit trusts, investment bonds, and managed portfolios — are treated as matrimonial assets in England and Wales if they were built up during the marriage. They are subject to division in the same way as savings and property, but valuations can be complex and fluctuating market values create specific challenges.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What Investments Count as Matrimonial Assets?</h2>
        <ul className="space-y-2 mb-4">
          {investmentTypes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-primary mb-2">Valuation: When Are Investments Valued?</p>
            <p className="text-sm text-muted-foreground">Courts generally use the value at the time of the order (or as close to it as possible), not the value at the time of separation. This means investments that have fallen in value since separation are worth less to divide — and investments that have risen may be more valuable than anticipated when negotiations began. Parties should request up-to-date valuations as close to settlement as possible.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Employee Share Schemes and LTIPs</h2>
        <p className="text-muted-foreground text-sm mb-4">Unvested shares and options may have significant future value but cannot be accessed now. Courts have to decide:</p>
        <ul className="space-y-2 mb-6 text-sm text-muted-foreground list-disc list-inside ml-2">
          <li>Whether unvested shares are a marital or future asset (depends on the vesting timeline)</li>
          <li>What proportion was earned during the marriage vs will be earned after separation</li>
          <li>How to value options or shares that are subject to performance conditions</li>
        </ul>
        <p className="text-sm text-muted-foreground mb-6">Expert valuation evidence is often required for complex share schemes. Courts tend to include the proportion of unvested shares attributable to the marriage period, while leaving post-separation accrual out of the settlement.</p>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Capital Gains Tax Considerations</h2>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Transferring investments between spouses as part of a divorce settlement is generally tax-neutral if done before the end of the tax year of separation. After this point, Capital Gains Tax (CGT) may apply on any transfer. Transfers structured to minimise CGT can significantly affect the real value of what each party receives. Always take tax advice alongside legal advice in any investment-heavy settlement.</p>
            </div>
          </CardContent>
        </Card>

        <div className="p-5 bg-background rounded-lg border mb-4">
          <p className="text-sm font-semibold mb-2">Real-World Example</p>
          <p className="text-sm text-muted-foreground">Claire and Mark divorce after 14 years. Mark has a stocks and shares ISA worth £62,000, built up entirely during the marriage. Claire has a smaller portfolio worth £18,000. They also have the family home. Starting from equal division of investments (£80,000 total = £40,000 each), Mark takes a larger share of property equity while Claire takes all of the investment portfolio. A financial settlement calculator helped them verify the overall values were equivalent before submitting a consent order.</p>
        </div>

        <InlineCTA label="Model Your Investment Portfolio in the Settlement" />
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
