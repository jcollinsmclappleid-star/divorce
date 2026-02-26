import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Wallet,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Building2,
  Banknote,
  PiggyBank,
  CheckCircle,
  XCircle,
  Users,
  FileText,
  ArrowLeftRight,
} from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  ExternalLinkButton,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const relatedPages = [
  {
    title: "Divorce House Buyout Calculator UK",
    description: "Calculate equity splits and affordability when one party retains the home.",
    href: "/divorce-house-buyout-calculator-uk",
    badge: "Property",
  },
  {
    title: "Divorce Financial Modelling",
    description: "Understand the full structured modelling framework for England & Wales.",
    href: "/divorce-financial-modelling",
    badge: "Pillar Guide",
  },
  {
    title: "Mortgage After Divorce UK",
    description: "Model mortgage affordability on a single income after separation.",
    href: "/divorce-mortgage-affordability-after-separation",
    badge: "Affordability",
  },
];

const keyFactors = [
  {
    icon: Building2,
    label: "Net Equity",
    description: "Current property value minus outstanding mortgage and estimated sale costs. This determines the capital available for division.",
  },
  {
    icon: Banknote,
    label: "Mortgage Affordability",
    description: "Whether the retaining party can meet lender affordability criteria on a single income. Income multiple benchmarks (often around 4-4.5x gross income) are generalised illustrations only.",
  },
  {
    icon: Wallet,
    label: "Liquidity",
    description: "Retaining property may reduce access to capital for emergency expenses, legal fees, and pension balancing.",
  },
  {
    icon: TrendingUp,
    label: "Sustainability",
    description: "Ongoing affordability must consider income volatility, interest rate sensitivity, and household expenses over time.",
  },
];

const retainPros = [
  "Housing stability for family",
  "No relocation disruption",
  "Avoids transaction costs",
];

const retainCons = [
  "Reduced liquidity",
  "Higher debt concentration",
  "Budget sensitivity to rate changes",
];

const sellPros = [
  "Releases capital for both parties",
  "Reduces debt exposure",
  "Simplifies asset division",
];

const sellCons = [
  "Requires rehousing",
  "Transaction costs (agent fees, legal fees)",
  "Market timing uncertainty",
];

const FAQ_SCHEMA_ITEMS = [
  {
    question: "Can I keep the house after divorce in the UK?",
    answer: "Whether one party can retain the family home depends on multiple financial considerations including net equity, mortgage affordability on a single income, available liquidity, and ongoing cost sustainability. There is no automatic right to retain property.",
  },
  {
    question: "What financial factors affect keeping the house?",
    answer: "Key factors include net equity (property value minus mortgage and sale costs), whether a new or existing mortgage is affordable on one income, sufficient liquid reserves for emergencies, and whether ongoing housing costs are sustainable alongside living expenses.",
  },
  {
    question: "Is it better to keep or sell the house in divorce?",
    answer: "Retaining property provides housing stability but may reduce liquidity and increase debt concentration. Selling releases capital for both parties and simplifies division but requires rehousing. Structured modelling can illustrate these trade-offs.",
  },
];

export default function FAQKeepHouse() {
  const [, setLocation] = useLocation();
  useFaqJsonLd(FAQ_SCHEMA_ITEMS);

  return (
    <ContentPageLayout
      title="Can I Keep the House After Divorce?"
      subtitle="Whether one party can retain the family home depends on multiple financial considerations. There is no automatic right to retain property."
      documentTitle="Can I Keep the House After Divorce UK? | DivorceCalculatorUK"
      metaDescription="Understand the financial factors that determine whether you can keep the house after divorce in the UK. Model property retention vs sale scenarios."
      relatedPages={relatedPages}
    >
      <ContentSection>
        <div className="flex items-start gap-2 mb-6">
          <ExternalLinkButton href="https://www.gov.uk/money-property-when-relationship-ends/apply-for-a-financial-order">
            GOV.UK: Financial orders in divorce
          </ExternalLinkButton>
        </div>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-key-factors-heading">
          Key Financial Factors
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          When modelling property retention, the following financial considerations are typically assessed. Courts consider housing needs, affordability, available capital, and the overall asset picture.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {keyFactors.map((item) => (
            <Card key={item.label} data-testid={`card-factor-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-children-housing-heading">
          Children's Housing Needs
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Where there are dependent children, their accommodation needs are a primary consideration in financial remedy proceedings. Courts place significant weight on ensuring that children have suitable housing, which may influence how property is allocated between the parties.
        </p>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          The welfare of children is not the paramount consideration in financial proceedings (unlike in children's proceedings under the Children Act 1989), but it is the first consideration under section 25(1) of the Matrimonial Causes Act 1973. In practice, this means that housing the primary carer and children adequately may take priority over achieving a numerically equal division of assets.
        </p>
        <Card className="bg-muted/40" data-testid="card-children-housing">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">Practical Implications</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Where the family home provides stability for children — proximity to schools, established social networks, and continuity of routine — courts may give weight to these factors when assessing whether property retention is appropriate. This does not create an automatic right to retain, but children's needs frequently influence the outcome. Modelling can illustrate the financial trade-offs involved in retaining the property versus selling and rehousing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-practice-heading">
          What This Means in Practice
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Retaining the house may increase housing stability but create reduced liquidity, higher debt concentration, and budget sensitivity. Structured financial modelling can illustrate these trade-offs.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Post-retention net asset allocation",
            "Cash flow sustainability",
            "Mortgage stress scenarios",
            "Alternative sale scenarios",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              {text}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          This comparison helps clarify trade-offs without determining legal outcome.
        </p>
        <InlineCTA label="Model property retention scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-comparison-heading">
          Retain vs Sell: Comparison
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card data-testid="card-retain-option">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Home className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Retain the Property</h3>
              </div>
              <div className="space-y-2 mb-3">
                {retainPros.map((text) => (
                  <div key={text} className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {retainCons.map((text) => (
                  <div key={text} className="flex items-start gap-2 text-xs">
                    <XCircle className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-sell-option">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Banknote className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Sell the Property</h3>
              </div>
              <div className="space-y-2 mb-3">
                {sellPros.map((text) => (
                  <div key={text} className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {sellCons.map((text) => (
                  <div key={text} className="flex items-start gap-2 text-xs">
                    <XCircle className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          Modelling both retention and sale scenarios allows side-by-side comparison before mediation.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-transfer-title-heading">
          Transfer of Title
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          When one party retains the family home, the legal mechanism for transferring ownership depends on the circumstances. Understanding the distinction between a transfer of equity and a sale helps clarify the practical steps involved.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card data-testid="card-transfer-equity">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Transfer of Equity</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    A transfer of equity involves removing one party from the property title while the other remains. This typically requires the remaining party to remortgage in their sole name and may involve a lump sum payment to the departing party representing their share of equity. Transfers between spouses as part of a court order are generally exempt from Stamp Duty Land Tax, though independent legal advice on the specific circumstances may be warranted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-sale-purchase">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start gap-3">
                <ArrowLeftRight className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Sale and Purchase</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Where neither party retains the existing property, a sale releases capital for both parties to purchase or rent independently. Sale proceeds are divided according to the agreed or court-ordered split. Transaction costs — including estate agent fees, conveyancing fees, and potential SDLT on new purchases — reduce the net capital available. Modelling these costs provides a clearer picture of post-sale purchasing capacity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-explore-heading">
          Explore Structured Scenario Comparison
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          You can model equity splits, affordability assumptions, and sustainability indicators using the structured modelling tool.
        </p>
        <InlineCTA label="Model property scenarios" />
      </ContentSection>
    </ContentPageLayout>
  );
}
