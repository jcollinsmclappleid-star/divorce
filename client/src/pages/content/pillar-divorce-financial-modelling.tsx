import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  ContentPageLayout,
  ExternalLinkButton,
  InlineCTA,
  ContentSection,
} from "@/components/content-page-layout";
import {
  Scale,
  Heart,
  Briefcase,
  Clock,
  Users,
  HandCoins,
  Stethoscope,
  BarChart3,
  Droplets,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Gavel,
  UserCheck,
  PiggyBank,
  AlertTriangle,
  Ban,
  FileWarning,
  LineChart,
} from "lucide-react";

const relatedPages = [
  {
    title: "Divorce 50/50 Split Calculator UK",
    description: "Model an equal division of marital assets and compare liquidity outcomes.",
    href: "/divorce-50-50-split-calculator-uk",
    badge: "Asset Division",
  },
  {
    title: "Divorce House Buyout Calculator UK",
    description: "Calculate net equity and model property retention vs sale scenarios.",
    href: "/divorce-house-buyout-calculator-uk",
    badge: "Property",
  },
  {
    title: "Divorce Pension Split Calculator UK",
    description: "Compare pension sharing and offsetting approaches side by side.",
    href: "/divorce-pension-split-calculator-uk",
    badge: "Pensions",
  },
  {
    title: "Mortgage After Divorce UK",
    description: "Assess post-separation mortgage affordability under different assumptions.",
    href: "/divorce-mortgage-affordability-after-separation",
    badge: "Affordability",
  },
];

const statutoryFactors = [
  { icon: Heart, label: "Welfare of Children", description: "The court's first consideration in all family proceedings" },
  { icon: Briefcase, label: "Income & Resources", description: "Earning capacity, property, and other financial resources" },
  { icon: HandCoins, label: "Financial Needs", description: "Obligations and responsibilities of each party" },
  { icon: Scale, label: "Standard of Living", description: "The standard enjoyed during the marriage" },
  { icon: Clock, label: "Duration of Marriage", description: "Length of the marriage and its financial impact" },
  { icon: Users, label: "Contributions", description: "Financial and non-financial contributions by each party" },
  { icon: Stethoscope, label: "Age & Health", description: "Physical or mental health considerations" },
];

const modellingBenefits = [
  { icon: BarChart3, label: "Compare Scenarios", description: "Model alternative percentage splits and see the numerical outcomes side by side" },
  { icon: Droplets, label: "Assess Liquidity", description: "Identify concentration risk where assets are tied up in property or pensions" },
  { icon: Calculator, label: "Model Tax Impact", description: "Illustrate basic income tax band implications on net income" },
  { icon: ShieldCheck, label: "Test Sustainability", description: "Run sensitivity tests on interest rates and expenditure assumptions" },
];

const professionalAdvice = [
  { icon: Gavel, label: "Family Solicitor", description: "Provides legal advice on entitlement, court process, and binding agreements under the Matrimonial Causes Act 1973." },
  { icon: UserCheck, label: "Accredited Mediator", description: "Facilitates structured negotiation between parties to reach mutually acceptable financial arrangements." },
  { icon: PiggyBank, label: "Financial Adviser", description: "Provides regulated advice on pensions, investments, tax planning, and long-term financial sustainability." },
];

export default function PillarDivorceFinancialModelling() {
  return (
    <ContentPageLayout
      title="Divorce Financial Modelling in England & Wales"
      subtitle="Structured scenario comparison to clarify the financial implications of different division assumptions before mediation or legal consultation."
      documentTitle="Divorce Financial Modelling England & Wales | DivorceCalculatorUK"
      metaDescription="Understand how structured financial modelling can help you explore asset division scenarios before mediation or legal advice in England & Wales."
      relatedPages={relatedPages}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-framework">
          Understanding the Financial Framework
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Financial arrangements following divorce are governed by legislation and judicial discretion. Courts consider a range of statutory factors when determining how assets, income, and pensions may be divided.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {statutoryFactors.map((factor) => (
            <Card key={factor.label} data-testid={`card-factor-${factor.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="pt-4 pb-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <factor.icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-semibold">{factor.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{factor.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          In longer marriages, equality is often referenced as a starting point. However, outcomes remain fact-specific and may depart from equal division depending on assessed needs and circumstances. Financial modelling does not replace this legal framework — it illustrates the numerical consequences of different hypothetical allocations.
        </p>
        <ExternalLinkButton href="https://www.gov.uk/money-property-when-relationship-ends">
          GOV.UK: Financial orders in divorce
        </ExternalLinkButton>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-why-modelling">
          Why Structured Modelling Matters
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Headline totals alone do not capture liquidity, affordability, or sustainability. Structured modelling enables you to explore the numerical implications before engaging with professionals.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {modellingBenefits.map((benefit) => (
            <Card key={benefit.label} data-testid={`card-benefit-${benefit.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="pt-4 pb-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <benefit.icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-semibold">{benefit.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Start Modelling" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-scenarios">
          Common Financial Scenarios
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Divorce discussions frequently involve property equity, pension values, savings, investments, liabilities, and ongoing income needs. Explore the key scenario types below.
        </p>
        <Tabs defaultValue="5050" data-testid="tabs-scenarios">
          <TabsList className="w-full flex flex-wrap">
            <TabsTrigger value="5050" data-testid="tab-trigger-5050">50/50 Split</TabsTrigger>
            <TabsTrigger value="property" data-testid="tab-trigger-property">Property</TabsTrigger>
            <TabsTrigger value="pensions" data-testid="tab-trigger-pensions">Pensions</TabsTrigger>
            <TabsTrigger value="child" data-testid="tab-trigger-child">Child Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="5050" className="space-y-3 mt-4" data-testid="tab-content-5050">
            <h3 className="text-base font-semibold">Equal Division (50/50) Scenario Modelling</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An equal division assumption models a 50/50 allocation of net marital assets. This provides a neutral baseline comparison, illustrates liquidity differences, highlights pension vs cash trade-offs, and demonstrates income sustainability impact.
            </p>
            <p className="text-xs text-muted-foreground">
              Equal division modelling is illustrative only and may not reflect any final agreement or court determination.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <InlineCTA label="Model a 50/50 scenario" />
              <Link href="/divorce-50-50-split-calculator-uk" className="text-xs text-primary font-medium hover:underline" data-testid="link-5050-cluster">
                Read the full guide
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="property" className="space-y-3 mt-4" data-testid="tab-content-property">
            <h3 className="text-base font-semibold">Retaining or Selling the Family Home</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The family home is frequently the largest asset. Financial modelling considers current market value, outstanding mortgage, estimated sale costs, net equity, and affordability under a single income. Retaining property may increase housing stability but reduce accessible capital.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <InlineCTA label="Model property scenarios" />
              <Link href="/divorce-house-buyout-calculator-uk" className="text-xs text-primary font-medium hover:underline" data-testid="link-house-cluster">
                Read the full guide
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="pensions" className="space-y-3 mt-4" data-testid="tab-content-pensions">
            <h3 className="text-base font-semibold">Pension Sharing and Offsetting</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pensions may represent a significant proportion of total wealth. Two broad mechanisms are often discussed: pension sharing (division of pension fund value) and offsetting (retaining pension in exchange for other assets). Modelling illustrates long-term retirement impact, liquidity differences, and short-term capital availability trade-offs.
            </p>
            <ExternalLinkButton href="https://www.gov.uk/pension-sharing-when-you-divorce">
              GOV.UK: Pension sharing orders
            </ExternalLinkButton>
            <div className="flex items-center gap-3 flex-wrap mt-2">
              <InlineCTA label="Compare pension scenarios" />
              <Link href="/divorce-pension-split-calculator-uk" className="text-xs text-primary font-medium hover:underline" data-testid="link-pension-cluster">
                Read the full guide
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="child" className="space-y-3 mt-4" data-testid="tab-content-child">
            <h3 className="text-base font-semibold">Income Disparity and Child Maintenance</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Where children are involved, statutory child maintenance calculations are typically handled separately through the Child Maintenance Service. Financial modelling may illustrate net income differences post-separation, household budget impact, and sustainability indicators.
            </p>
            <ExternalLinkButton href="https://www.gov.uk/calculate-child-maintenance">
              GOV.UK: CMS calculation guidance
            </ExternalLinkButton>
            <ExternalLinkButton href="https://www.gov.uk/income-tax-rates">
              HMRC: 2025/26 income tax rates
            </ExternalLinkButton>
            <InlineCTA label="Start Modelling" />
          </TabsContent>
        </Tabs>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-tax">
          Tax & Financial Assumptions
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Financial modelling applies simplified UK income tax bands for illustrative purposes. The following outlines what is and is not included.
        </p>
        <Accordion type="multiple" data-testid="accordion-tax">
          <AccordionItem value="included" data-testid="accordion-item-included">
            <AccordionTrigger data-testid="accordion-trigger-included">What the model includes</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                  Basic and higher rate income tax thresholds (2025/26)
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                  Personal allowance tapering above £100,000
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                  Employee Class 1 National Insurance contributions
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                  Net income estimation for affordability modelling
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                  Generalised lending capacity benchmarks (income multiples)
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="excluded" data-testid="accordion-item-excluded">
            <AccordionTrigger data-testid="accordion-trigger-excluded">What the model excludes</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Ban className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/70 shrink-0" />
                  Capital Gains Tax
                </li>
                <li className="flex items-start gap-2">
                  <Ban className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/70 shrink-0" />
                  Dividend tax variations
                </li>
                <li className="flex items-start gap-2">
                  <Ban className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/70 shrink-0" />
                  Scottish income tax bands
                </li>
                <li className="flex items-start gap-2">
                  <Ban className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/70 shrink-0" />
                  Pension relief complexities
                </li>
                <li className="flex items-start gap-2">
                  <Ban className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/70 shrink-0" />
                  Self-employed NI (Class 2 and 4)
                </li>
                <li className="flex items-start gap-2">
                  <Ban className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/70 shrink-0" />
                  Individual allowances beyond basic modelling
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-sustainability">
          Sustainability & Lending Capacity
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Asset division alone does not determine financial stability. Structured modelling examines post-division net income, estimated essential expenditure, interest rate sensitivity, income multiple benchmarks, and 5-year sustainability indicators.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          Lending benchmarks referenced are generalised illustrations, not lending decisions or guarantees. Sustainability modelling highlights potential pressure points under stated assumptions.
        </p>
        <InlineCTA label="Run sustainability modelling" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-limitations">
          Limitations
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Divorce financial calculators and modelling tools have significant structural limitations. The following outlines each category.
        </p>
        <Accordion type="multiple" data-testid="accordion-limitations">
          <AccordionItem value="legal" data-testid="accordion-item-legal">
            <AccordionTrigger data-testid="accordion-trigger-legal">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground/70" />
                Legal & Judicial Limitations
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Does not determine legal entitlement or assess fairness</li>
                <li>Does not predict court outcomes or replicate judicial reasoning</li>
                <li>Cannot incorporate judicial discretion under the Matrimonial Causes Act 1973</li>
                <li>No behavioural or negotiation dynamics modelling</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="financial" data-testid="accordion-item-financial">
            <AccordionTrigger data-testid="accordion-trigger-financial">
              <span className="flex items-center gap-2">
                <FileWarning className="w-4 h-4 text-muted-foreground/70" />
                Financial Model Limitations
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>No lender-specific criteria — lending capacity benchmarks are generalised</li>
                <li>No actuarial pension adjustments — values are nominal CETV figures</li>
                <li>No spousal maintenance modelling</li>
                <li>No forward legislation modelling</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="projection" data-testid="accordion-item-projection">
            <AccordionTrigger data-testid="accordion-trigger-projection">
              <span className="flex items-center gap-2">
                <LineChart className="w-4 h-4 text-muted-foreground/70" />
                Projection Limitations
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>5-year projections assume all parameters remain constant</li>
                <li>No inflation modelling — values in current nominal terms</li>
                <li>No investment return modelling — liquid capital generates no return</li>
                <li>No employment change modelling — income held static</li>
                <li>Outputs depend entirely on user-entered assumptions</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-professional">
          When to Seek Professional Advice
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Independent advice remains essential when making legally binding decisions. Structured modelling supports informed conversations — it does not replace professional advice.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {professionalAdvice.map((item) => (
            <Card key={item.label} data-testid={`card-professional-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="pt-4 pb-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Explore the modelling tool" />
      </ContentSection>
    </ContentPageLayout>
  );
}
