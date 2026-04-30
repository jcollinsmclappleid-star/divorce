import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, ArrowDown, AlertTriangle, Banknote, ShieldAlert, TrendingDown, FileCheck, Clock, Scale } from "lucide-react";
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
  {
    title: "Can I Keep the House After Divorce?",
    description: "The four main options for the family home — and the factors that determine which is viable.",
    href: "/can-i-keep-the-house-after-divorce-uk",
    badge: "FAQ",
  },
  {
    title: "Transfer of Equity in Divorce",
    description: "The legal process for moving the family home into sole ownership.",
    href: "/transfer-of-equity-divorce-uk",
    badge: "Property",
  },
  { title: "Preview the Full Financial Report", description: "Model a property buyout scenario with your figures.", href: "/unlock", badge: "Report" },
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

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-stamp-duty">
          Stamp Duty Considerations
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Stamp Duty Land Tax (SDLT) treatment varies depending on timing and the nature of the property transfer. Understanding these distinctions is relevant when modelling buyout costs.
        </p>
        <Card data-testid="card-sdlt-info">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <FileCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Transfer Between Spouses</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Transfers of property between spouses or civil partners as part of a divorce or dissolution are generally exempt from SDLT, provided the transfer is made pursuant to a court order or agreement. This applies during the period of separation and divorce proceedings.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                However, if a party purchases a new property after decree absolute — particularly where they already own or retain an interest in another property — the higher rate SDLT surcharge may apply. This additional cost can be significant and may warrant inclusion in financial modelling.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                SDLT rates and exemptions are subject to change. Independent professional verification of current rules may be warranted.
              </p>
            </div>
          </CardContent>
        </Card>
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

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-deferred-sale">
          Deferred Sale Alternative
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Where an immediate buyout is not affordable or practical, courts may consider deferred sale arrangements. These allow one party to remain in the property for a defined period before a future sale and division of proceeds.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-mesher-order">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Mesher Order</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  A Mesher order postpones the sale of the family home until a specified triggering event — typically the youngest child reaching 18, completing full-time education, or the occupying party remarrying or cohabiting. Both parties retain a defined share of the equity.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This arrangement prioritises children's housing stability but means the non-occupying party's capital remains tied up in the property for an extended period, affecting their ability to purchase alternative accommodation.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-martin-order">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Martin Order</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  A Martin order allows one party to remain in the property indefinitely — or until they choose to sell, remarry, or cohabit. This is more commonly used where there are no dependent children but one party has a particular housing need.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The non-occupying party's share remains locked in the property for a potentially indefinite period. Modelling the financial implications of deferred access to capital may be relevant when evaluating this arrangement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          Both types of deferred sale order involve trade-offs between immediate housing needs and long-term financial flexibility. Independent legal advice may be warranted to assess suitability.
        </p>
      </ContentSection>
    </ContentPageLayout>
  );
}
