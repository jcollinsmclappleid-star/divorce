import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, ArrowDown, AlertTriangle, Banknote, ShieldAlert, TrendingDown } from "lucide-react";
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
    title: "50/50 Split Calculator UK",
    description: "Model what an equal allocation of net marital assets would look like numerically.",
    href: "/divorce-50-50-split-calculator-uk",
    badge: "Asset Division",
  },
  {
    title: "Mortgage After Divorce UK",
    description: "Assess mortgage affordability and sustainability after separation.",
    href: "/divorce-mortgage-affordability-after-separation",
    badge: "Affordability",
  },
];

export default function ClusterHouseBuyout() {
  return (
    <ContentPageLayout
      title="Divorce House Buyout Calculator UK"
      subtitle="The family home is often the largest marital asset. Financial modelling can illustrate the implications of retaining or selling property under different assumptions."
      documentTitle="Divorce House Buyout Calculator UK | DivorceCalculatorUK"
      metaDescription="Model the financial implications of retaining or selling the family home in divorce. Calculate net equity, assess affordability, and compare property scenarios."
      relatedPages={relatedPages}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-net-equity">
          Calculating Net Equity
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Modelling property retention begins with understanding net equity — the value remaining after deducting outstanding obligations and estimated costs.
        </p>
        <div className="space-y-3 max-w-md">
          <Card data-testid="card-step-property-value">
            <CardContent className="pt-4 pb-3 flex items-center gap-3">
              <Home className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Current Property Value</p>
                <p className="text-xs text-muted-foreground">Estimated market value of the property</p>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </div>
          <Card data-testid="card-step-mortgage">
            <CardContent className="pt-4 pb-3 flex items-center gap-3">
              <Banknote className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Minus Outstanding Mortgage</p>
                <p className="text-xs text-muted-foreground">Remaining mortgage balance to be deducted</p>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </div>
          <Card data-testid="card-step-costs">
            <CardContent className="pt-4 pb-3 flex items-center gap-3">
              <TrendingDown className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Minus Estimated Sale Costs</p>
                <p className="text-xs text-muted-foreground">Agent fees, legal costs, and other expenses</p>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </div>
          <Card className="border-primary/30" data-testid="card-step-net-equity">
            <CardContent className="pt-4 pb-3 flex items-center gap-3">
              <Badge variant="outline" className="shrink-0">Result</Badge>
              <div>
                <p className="text-sm font-semibold text-foreground">Net Equity</p>
                <p className="text-xs text-muted-foreground">Base figure for scenario comparison</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-affordability">
          Affordability Considerations
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Retaining the property requires careful assessment beyond just the equity figure.
        </p>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="mortgage" data-testid="accordion-mortgage">
            <AccordionTrigger className="text-sm font-semibold">
              Mortgage Affordability
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A new or existing mortgage must be affordable under one income. Income multiple benchmarks (often around 4-4.5x gross income) are generalised illustrations only and not lending decisions. Actual lender criteria vary significantly.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="liquidity" data-testid="accordion-liquidity">
            <AccordionTrigger className="text-sm font-semibold">
              Liquidity Assessment
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Retaining property may concentrate wealth in an illiquid asset. Consider whether sufficient liquid reserves remain for emergencies, moving costs, and transitional expenses.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sustainability" data-testid="accordion-sustainability">
            <AccordionTrigger className="text-sm font-semibold">
              Ongoing Cost Sustainability
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monthly mortgage payments, utilities, maintenance, and insurance must be sustainable alongside other living expenses on a single income. Stress testing against interest rate changes provides a more complete picture.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-liquidity-risk">
          Liquidity Risk
        </h2>
        <Card className="border-destructive/20 bg-destructive/5" data-testid="card-liquidity-warning">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Property Concentration Warning</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Concentrating wealth in property may reduce:
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground">Immediate access to capital</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground">Emergency financial flexibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground">Short-term financial resilience</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Modelling helps visualise these trade-offs before making decisions.
              </p>
            </div>
          </CardContent>
        </Card>
        <InlineCTA label="Model property scenarios" />
      </ContentSection>
    </ContentPageLayout>
  );
}
