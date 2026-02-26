import { Card, CardContent } from "@/components/ui/card";
import { Clock, Lock, BarChart3, Coins } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  ExternalLinkButton,
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
    title: "50/50 Split Calculator UK",
    description: "Model what an equal allocation of net marital assets would look like numerically.",
    href: "/divorce-50-50-split-calculator-uk",
    badge: "Asset Division",
  },
  {
    title: "House Buyout Calculator UK",
    description: "Model the financial implications of retaining or selling the family home.",
    href: "/divorce-house-buyout-calculator-uk",
    badge: "Property",
  },
];

export default function ClusterPensionSplit() {
  return (
    <ContentPageLayout
      title="Divorce Pension Split Calculator UK"
      subtitle="Pensions are treated as financial assets in divorce financial remedy proceedings. They may represent a substantial proportion of overall wealth and require careful scenario modelling."
      documentTitle="Divorce Pension Split Calculator UK | DivorceCalculatorUK"
      metaDescription="Compare pension sharing and offsetting scenarios in UK divorce. Model how pension division affects overall asset distribution and long-term financial outcomes."
      relatedPages={relatedPages}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-pension-approaches">
          Pension Sharing vs Offsetting
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Two broad mechanisms are commonly discussed when addressing pension assets in divorce proceedings.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-pension-sharing">
            <CardContent className="pt-5 pb-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Pension Sharing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                A percentage of one party's pension is transferred into the other party's name via a pension sharing order. The receiving party then holds pension rights in their own right.
              </p>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">+</span> Clean break on pension assets
                </p>
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">+</span> Independent retirement provision
                </p>
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-destructive mt-0.5">-</span> May reduce other capital available
                </p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-pension-offsetting">
            <CardContent className="pt-5 pb-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Offsetting</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                One party retains pension assets while the other retains different capital assets of equivalent value, such as a greater share of property equity or savings.
              </p>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">+</span> Preserves pension structure
                </p>
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">+</span> May provide immediate liquidity
                </p>
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-destructive mt-0.5">-</span> Comparing unlike assets is complex
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-5">
          <ExternalLinkButton href="https://www.gov.uk/government/publications/pension-sharing-on-divorce-or-dissolution">
            GOV.UK Pension Sharing Guidance
          </ExternalLinkButton>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-why-pensions-complex">
          Why Pensions Are Complex
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Pension assets differ fundamentally from cash and property. Understanding these differences is essential for meaningful scenario comparison.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-factor-access">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Not Immediately Accessible</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Pension funds cannot typically be accessed before minimum pension age, limiting short-term flexibility.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-factor-retirement">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Long-term Retirement Impact</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Pension decisions affect retirement income for decades. The implications may not be immediately apparent.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-factor-liquidity">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Coins className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Liquidity Differences</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Pensions cannot be used for immediate needs such as housing deposits or debt repayment.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-factor-valuation">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Valuation Complexity</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">CETV values are nominal transfer values and may not reflect the true economic value of pension benefits.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Compare pension scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-pension-modelling">
          What Modelling Illustrates
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          Structured modelling illustrates capital distribution differences, liquidity impact, and sustainability under retirement assumptions. It does not determine suitability or predict outcomes.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Professional actuarial advice may be needed for complex pension arrangements, particularly defined benefit schemes.
        </p>
      </ContentSection>
    </ContentPageLayout>
  );
}
