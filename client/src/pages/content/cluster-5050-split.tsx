import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, BarChart3, ShieldCheck, TrendingUp, Users } from "lucide-react";
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
];

export default function Cluster5050Split() {
  return (
    <ContentPageLayout
      title="Divorce 50/50 Split Calculator UK"
      subtitle="Model what an equal allocation of net marital assets would look like numerically. A 50/50 scenario provides a neutral baseline for structured comparison — it does not determine legal entitlement."
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
    </ContentPageLayout>
  );
}
