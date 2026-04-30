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
  BookOpen,
  XCircle,
  Home,
  Wallet,
  Baby,
  Hourglass,
  Building2,
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
  { title: "Preview the Full Financial Report", description: "See the full financial modelling report in action.", href: "/unlock", badge: "Report" },
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
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-s25-factors">
          The Role of Section 25 Factors
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          The Matrimonial Causes Act 1973, Section 25 sets out the factors a court is required to consider when determining financial provision on divorce. These factors are not ranked in any fixed hierarchy (other than the welfare of minor children being the first consideration), and courts exercise broad discretion in weighing them against the specific circumstances of each case.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Understanding how these factors interact is central to assessing the range of plausible financial outcomes. Financial modelling does not replicate judicial reasoning, but it can clarify the numerical implications when different assumptions about asset allocation are applied.
        </p>
        <Accordion type="multiple" data-testid="accordion-s25-factors">
          <AccordionItem value="needs-obligations" data-testid="accordion-item-needs-obligations">
            <AccordionTrigger data-testid="accordion-trigger-needs-obligations">
              <span className="flex items-center gap-2">
                <HandCoins className="w-4 h-4 text-primary" />
                Financial Needs and Obligations
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Courts assess what each party requires to meet their reasonable needs, including housing, day-to-day living expenses, and obligations such as existing debts or dependant support. In many cases, particularly where there are insufficient assets to meet both parties' needs fully, the needs-based analysis becomes the dominant factor. Modelling different allocation percentages can illustrate whether each party's stated expenditure requirements are met under various scenarios.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="earning-capacity" data-testid="accordion-item-earning-capacity">
            <AccordionTrigger data-testid="accordion-trigger-earning-capacity">
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                Income and Earning Capacity
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Beyond current income, courts may consider each party's capacity to earn in the future. This includes qualifications, work experience, age, and any career impact resulting from caring responsibilities during the marriage. Where one party has been out of the workforce, a period of adjustment may be relevant. Financial modelling can illustrate how different income assumptions affect post-separation affordability and sustainability over a projected period.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="standard-living" data-testid="accordion-item-standard-living">
            <AccordionTrigger data-testid="accordion-trigger-standard-living">
              <span className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-primary" />
                Standard of Living During the Marriage
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The standard of living enjoyed during the marriage provides a reference point, though courts recognise that separation typically results in a reduction for both parties as one household becomes two. This factor is particularly relevant in higher-asset cases where maintaining a comparable lifestyle may be financially feasible. In lower-asset cases, the focus tends to shift towards meeting basic needs rather than replicating previous living standards.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="contributions" data-testid="accordion-item-contributions-detail">
            <AccordionTrigger data-testid="accordion-trigger-contributions-detail">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Contributions (Financial and Non-Financial)
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Courts consider both financial contributions (such as earnings and capital brought into the marriage) and non-financial contributions (such as homemaking and childcare). Following the House of Lords decision in White v White (2000), there is a general principle that financial and non-financial contributions are to be treated equally. This principle does not automatically produce a 50/50 outcome but establishes equality of contribution as a cross-check against any proposed division.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="duration-age" data-testid="accordion-item-duration-age">
            <AccordionTrigger data-testid="accordion-trigger-duration-age">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Duration of Marriage and Age of Parties
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The length of the marriage affects how assets are characterised and divided. In longer marriages, all assets — including those brought into the marriage — may be treated as part of the shared pool. In shorter marriages, pre-marital assets or inheritances may receive different treatment. The age of each party also affects future earning potential and pension accumulation timescales. Modelling can illustrate how different assumptions about asset inclusion affect overall division outcomes.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSection>

      <ContentSection>
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
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-cannot-do">
          What Financial Modelling Cannot Do
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Structured modelling is a numerical illustration tool. It is important to understand its boundaries clearly, as misinterpreting outputs may lead to unrealistic expectations or uninformed decisions.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card data-testid="card-cannot-predict">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Gavel className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                <span className="text-sm font-semibold">Not Predicting Court Outcomes</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Courts exercise broad discretion under the Matrimonial Causes Act 1973. No calculator or modelling tool can replicate judicial reasoning or predict what a court may determine. Modelling illustrates the numerical consequences of hypothetical assumptions — it does not forecast legal outcomes.
              </p>
            </CardContent>
          </Card>
          <Card data-testid="card-cannot-legal">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                <span className="text-sm font-semibold">Not Replacing Legal Advice</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Financial modelling does not assess legal rights, entitlements, or procedural requirements. It cannot determine whether an agreement is enforceable or whether specific disclosure obligations have been met. Independent legal advice from a qualified family solicitor remains essential for binding decisions.
              </p>
            </CardContent>
          </Card>
          <Card data-testid="card-cannot-fairness">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                <span className="text-sm font-semibold">Not Assessing Fairness</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The concept of fairness in financial proceedings involves subjective and fact-specific judicial assessment. Modelling presents numerical outputs based on stated inputs. It does not evaluate whether any particular division would be considered fair, reasonable, or appropriate by a court or mediator.
              </p>
            </CardContent>
          </Card>
          <Card data-testid="card-cannot-regulated">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                <span className="text-sm font-semibold">Not Providing Regulated Advice</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This tool is not regulated by the Financial Conduct Authority (FCA) and does not provide financial advice within the meaning of the Financial Services and Markets Act 2000. Pension, investment, and tax planning decisions may warrant review by a regulated financial adviser.
              </p>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              A critical aspect of 50/50 modelling is recognising that asset composition matters as much as total value. A portfolio consisting of £200,000 in property equity, £150,000 in pension funds, and £50,000 in savings produces very different post-separation outcomes depending on which assets each party retains. Property equity may require sale or remortgage to access, pension funds are typically locked until retirement age, and only liquid savings provide immediate financial flexibility. Modelling each combination illustrates these trade-offs numerically.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Equal division may also interact with income disparity. Where one party earns significantly more than the other, a 50/50 asset split may still result in materially different monthly budgets and sustainability indicators. Modelling both the capital position and the ongoing income picture together provides a more complete illustration of post-separation financial positions.
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              Where one party wishes to retain the property, a buyout scenario typically involves remortgaging to release the departing party's share of equity. This requires the retaining party to demonstrate sufficient income to service the new mortgage independently. Modelling illustrates the relationship between equity release, mortgage affordability at various interest rates, and the remaining liquid capital available after the transaction.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Alternatively, a sale scenario distributes net proceeds after deducting the mortgage balance, estimated agent fees, and potential early repayment charges. Modelling both retention and sale outcomes side by side allows parties to assess the financial trade-offs — housing stability versus capital flexibility — before engaging with legal or financial professionals.
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pension sharing involves a court order that transfers a percentage of one party's pension to the other, creating a separate pension credit in the recipient's name. The Cash Equivalent Transfer Value (CETV) is commonly used as a reference figure, though CETVs for defined benefit schemes may not fully capture the underlying value of guaranteed income in retirement. Actuarial analysis may be warranted for complex pension arrangements.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Offsetting involves one party retaining their pension entitlement while the other receives a greater share of non-pension assets (such as property equity or savings) to compensate. This approach avoids the administrative complexity of pension sharing but introduces a fundamental comparison challenge: pension wealth is illiquid and deferred, while property or cash is accessible now. Modelling can illustrate the nominal value trade-off, though independent financial advice may be warranted to assess the true equivalence.
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              The CMS basic rate applies a percentage of the paying parent's gross income (after pension contributions): 12% for one child, 16% for two children, and 19% for three or more children. Shared care arrangements may reduce the amount payable. These payments directly affect monthly disposable income for both households and may warrant inclusion when modelling post-separation budgets.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Beyond statutory child maintenance, courts may consider additional provision for children's needs through a financial order — particularly in higher-income cases or where specific needs such as school fees or medical expenses arise. Modelling the combined impact of child maintenance payments alongside housing costs, tax, and other outgoings provides a more comprehensive illustration of each party's post-separation financial position.
            </p>
            <ExternalLinkButton href="https://www.gov.uk/calculate-child-maintenance">
              GOV.UK: CMS calculation guidance
            </ExternalLinkButton>
            <ExternalLinkButton href="https://www.gov.uk/income-tax-rates">
              HMRC: 2026/27 income tax rates
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
                  Basic and higher rate income tax thresholds (2026/27)
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
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-child-maintenance">
          Child Maintenance and Income Disparities
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Where children are involved, statutory child maintenance obligations directly affect post-separation household budgets. The Child Maintenance Service (CMS) applies formulaic rates based on the paying parent's gross income. Understanding how these payments interact with tax, housing costs, and other outgoings is central to assessing financial sustainability for both households.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card data-testid="card-cms-basic-rate">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Baby className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-semibold">CMS Basic Rate</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The basic rate applies where the paying parent's gross weekly income falls between £200 and £800. Standard percentages are 12% for one qualifying child, 16% for two, and 19% for three or more. These percentages are applied to gross income after pension contributions are deducted.
              </p>
            </CardContent>
          </Card>
          <Card data-testid="card-cms-reduced-rate">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-semibold">Reduced Rate</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Where gross weekly income is between £100 and £200, a reduced rate applies. This uses a tapered formula that blends a flat rate with a percentage-based calculation. Below £100 per week (or where the paying parent receives certain benefits), a flat rate of £7 per week applies regardless of the number of children.
              </p>
            </CardContent>
          </Card>
          <Card data-testid="card-income-disparity">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-semibold">Income Disparity Impact</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Significant income differences between parties may result in one household having substantially lower disposable income post-separation. Modelling net income after tax, NI, child maintenance, and housing costs for both parties illustrates whether each household's essential expenditure can be sustained under the stated assumptions.
              </p>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
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

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-section-deferred-sale">
          Deferred Sale Orders
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          In some cases, an immediate sale or transfer of the family home may not be appropriate. Courts may order a deferred sale — allowing one party (typically the parent with primary care of children) to remain in the property for a defined period before it is sold and proceeds divided. Two common forms of deferred sale order are Mesher orders and Martin orders.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card data-testid="card-mesher-order">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-semibold">Mesher Orders</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A Mesher order defers the sale of the family home until a specified triggering event — most commonly when the youngest child reaches 18, finishes full-time education, or ceases to live at the property. The occupying party remains in the home and is typically responsible for mortgage payments and maintenance costs. Upon the triggering event, the property is sold and net proceeds divided according to the percentages specified in the order. Modelling can illustrate the projected equity position at future dates under different property value assumptions.
              </p>
            </CardContent>
          </Card>
          <Card data-testid="card-martin-order">
            <CardContent className="pt-4 pb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-semibold">Martin Orders</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A Martin order is similar but typically applies where there are no dependent children. The sale is deferred until the occupying party remarries, cohabits, dies, or voluntarily chooses to sell. These orders are less common and tend to arise in cases where the occupying party has limited housing alternatives. The departing party's capital remains tied up in the property for an indefinite period, which may affect their ability to purchase alternative housing. This trade-off between immediate capital access and deferred entitlement is a key consideration that modelling can help illustrate.
              </p>
            </CardContent>
          </Card>
        </div>
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
