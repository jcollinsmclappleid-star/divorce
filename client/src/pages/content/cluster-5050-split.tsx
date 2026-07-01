import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, BarChart3, ShieldCheck, TrendingUp, Users, Droplets, Clock, Sprout } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
} from "@/components/content-page-layout";

const relatedPages = [
  {
    title: "Divorce Financial Modelling",
    description: "Comprehensive guide to structured financial scenario modelling for separation in England & Wales.",
    href: "/divorce-financial-modelling",
    badge: "Pillar Guide",
  },
  {
    title: "House Buyout Calculator UK",
    description: "Model the financial implications of retaining or selling the family home.",
    href: "/divorce-house-buyout-calculator-uk",
    badge: "Property",
  },
  {
    title: "Pension Split Calculator UK",
    description: "Compare pension sharing and offsetting scenarios side by side.",
    href: "/divorce-pension-split-calculator-uk",
    badge: "Pensions",
  },
  {
    title: "Is a 50/50 Split Automatic in UK Divorce?",
    description: "The legal reality behind equal division — what courts actually consider.",
    href: "/is-50-50-split-automatic-uk",
    badge: "FAQ",
  },
  {
    title: "Divorce Where One Partner Earns More",
    description: "How income disparity and needs typically shape financial outcomes.",
    href: "/divorce-where-one-earns-more-uk",
    badge: "Situations",
  },
  { title: "Divorce Asset Split Calculator", description: "Model how assets could be divided between parties numerically.", href: "/divorce-asset-split-calculator", badge: "Calculator" },
  { title: "Divorce Settlement Calculator UK", description: "Comprehensive scenario modelling for all asset types.", href: "/divorce-settlement-calculator-uk", badge: "Calculator" },
  { title: "Preview the Full Financial Report", description: "See a full 50/50 split modelled with real figures.", href: "/unlock", badge: "Report" },
];

export default function Cluster5050Split() {
  return (
    <ContentPageLayout
      title="Divorce 50/50 Split Calculator UK"
      subtitle="Model what an equal allocation of net marital assets would look like numerically. A 50/50 scenario provides a neutral baseline for structured comparison — it does not determine legal rights."
      documentTitle="Divorce 50/50 Split Calculator UK | DivorceCalculatorUK"
      metaDescription="Use our 50/50 divorce split calculator to model equal asset division scenarios in England & Wales. Compare liquidity, pensions, and property allocations."
      relatedPages={relatedPages}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-5050-meaning">
          What Does 50/50 Mean in Practice?
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          In England & Wales, equal division is frequently referenced as a starting point in long marriages. However, financial outcomes remain discretionary and fact-specific. A 50/50 modelling scenario illustrates what an equal allocation would look like numerically.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-party-a">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">Party A</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between gap-2">
                  <span>Share of net assets</span>
                  <span className="font-semibold text-foreground">50%</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Property allocation</span>
                  <span className="font-medium text-foreground">Varies</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Pension allocation</span>
                  <span className="font-medium text-foreground">Varies</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Liquid assets</span>
                  <span className="font-medium text-foreground">Varies</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-party-b">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">Party B</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between gap-2">
                  <span>Share of net assets</span>
                  <span className="font-semibold text-foreground">50%</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Property allocation</span>
                  <span className="font-medium text-foreground">Varies</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Pension allocation</span>
                  <span className="font-medium text-foreground">Varies</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Liquid assets</span>
                  <span className="font-medium text-foreground">Varies</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          Even where totals appear equal, outcomes may differ materially due to property concentration, pension illiquidity, income disparities, and ongoing housing costs.
        </p>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-why-model-5050">
          Why Model a 50/50 Scenario?
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Structured modelling can provide clarity and context. It does not predict court outcomes.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-benefit-baseline">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Neutral Baseline</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Provides a structured starting point for comparing alternative scenarios.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-benefit-affordability">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Affordability Pressures</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Highlights where equal division may create liquidity or sustainability challenges.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-benefit-tradeoffs">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Pension vs Cash Trade-offs</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Illustrates the difference between liquid and illiquid asset allocations.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-benefit-sustainability">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Sustainability Risks</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Identifies where an equal split may not be financially sustainable for one or both parties.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model a 50/50 scenario" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-asset-composition">
          Asset Composition Matters
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          An equal split by total value does not necessarily produce equivalent financial positions. A portfolio containing £200,000 in property equity and £200,000 in pension rights is fundamentally different from £400,000 in cash savings. The nature, accessibility, and growth characteristics of each asset class affect real-world outcomes significantly.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card data-testid="card-composition-liquidity">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Droplets className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Liquidity</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Cash and savings are immediately accessible. Property equity requires a sale or remortgage to release. Pension funds are typically locked until minimum pension age. Two allocations with the same total value may provide very different levels of immediate financial flexibility.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-composition-timing">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Access Timing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Different assets become available at different life stages. Pension wealth may not be accessible for decades, while property equity depends on market conditions and sale timing. Modelling illustrates when each asset class becomes practically useful.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-composition-growth">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Sprout className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Growth Potential</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Asset classes grow at different rates. Pension investments may compound over decades in tax-advantaged wrappers. Property values fluctuate with local markets. Cash savings may be eroded by inflation. These differences mean equal value today does not imply equal value in the future.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          Understanding these distinctions is central to meaningful scenario comparison. A 50/50 allocation by total value may produce materially different real-world outcomes depending on which assets each party receives.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-5050-considerations">
          Key Considerations
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Users className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Marriage length</span> — Equal division is more commonly referenced in longer marriages. Shorter marriages may produce different outcomes.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Scale className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Needs-based departure</span> — Courts may depart from equality where one party has greater needs, such as primary carer responsibilities.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <BarChart3 className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Asset composition</span> — Equal total value does not mean equal liquidity. Property and pensions behave differently from savings.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-common-misconceptions">
          Common Misconceptions
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Several widespread assumptions about 50/50 division in England & Wales do not accurately reflect how financial remedy proceedings operate. Structured modelling can help clarify these distinctions.
        </p>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="law" data-testid="accordion-misconception-law">
            <AccordionTrigger className="text-sm font-semibold">
              "50/50 is the law"
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                There is no statutory requirement for equal division in England & Wales. While the House of Lords in White v White (2001) established equality as a "yardstick" or cross-check, outcomes remain discretionary. Courts assess multiple factors under Section 25 of the Matrimonial Causes Act 1973, and the final allocation depends on the specific circumstances of each case. Equal division may be discussed in many long-marriage cases, but it is not automatic.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="all-assets" data-testid="accordion-misconception-all-assets">
            <AccordionTrigger className="text-sm font-semibold">
              "All assets are automatically included"
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                While all assets are potentially relevant and subject to disclosure, the treatment of specific assets may vary. Pre-marital assets, inherited wealth, and gifts may be treated differently depending on the length of the marriage and whether they have been "mingled" with matrimonial assets. The distinction between matrimonial and non-matrimonial property can be significant, particularly in shorter marriages.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pensions" data-testid="accordion-misconception-pensions">
            <AccordionTrigger className="text-sm font-semibold">
              "Pensions are less important than property"
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pension assets frequently represent a substantial proportion of overall marital wealth — in some cases exceeding the value of the family home. Overlooking or undervaluing pension rights can result in a materially incomplete picture of the financial landscape. The cash equivalent transfer value (CETV) may not fully reflect the economic benefit of a pension, particularly for defined benefit schemes, making careful analysis essential.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="equal-outcome" data-testid="accordion-misconception-equal-outcome">
            <AccordionTrigger className="text-sm font-semibold">
              "Equal value means equal outcome"
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Two allocations with the same total value can produce very different practical outcomes. A party receiving primarily property equity faces ongoing maintenance costs, potential interest rate exposure, and illiquidity. A party receiving primarily pension rights has long-term retirement provision but limited immediate access to capital. Modelling these differences helps illustrate why numerical equality does not automatically translate to equivalent financial positions.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSection>
    </ContentPageLayout>
  );
}
