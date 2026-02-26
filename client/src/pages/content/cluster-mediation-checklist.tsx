import { Card, CardContent } from "@/components/ui/card";
import { Home, Banknote, PiggyBank, Landmark, CreditCard, Wallet, Receipt, FileCheck, Eye, ShieldCheck, Clock } from "lucide-react";
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
    title: "Mortgage After Divorce UK",
    description: "Assess mortgage affordability and sustainability after separation.",
    href: "/divorce-mortgage-affordability-after-separation",
    badge: "Affordability",
  },
];

const checklistItems = [
  {
    icon: Home,
    title: "Property Valuations",
    description: "Current market value estimates for all owned properties, including the family home and any buy-to-let or investment properties.",
  },
  {
    icon: Banknote,
    title: "Mortgage Balances",
    description: "Outstanding mortgage amounts, current interest rates, remaining terms, and whether on fixed or variable rates.",
  },
  {
    icon: Landmark,
    title: "Pension Statements",
    description: "Recent pension statements showing current values (CETVs for defined benefit schemes), contribution levels, and projected retirement benefits.",
  },
  {
    icon: PiggyBank,
    title: "Savings & Investments",
    description: "Bank account balances, ISAs, investment portfolios, premium bonds, and any other liquid assets held by either party.",
  },
  {
    icon: CreditCard,
    title: "Liabilities",
    description: "Outstanding debts including credit cards, personal loans, car finance, and any other financial obligations.",
  },
  {
    icon: Wallet,
    title: "Income Evidence",
    description: "Recent payslips, tax returns, or accounts for self-employed individuals. Include any additional income sources such as rental income or benefits.",
  },
  {
    icon: Receipt,
    title: "Monthly Expenditure",
    description: "A detailed breakdown of regular monthly spending including housing costs, utilities, food, transport, childcare, and other essential outgoings.",
  },
];

export default function ClusterMediationChecklist() {
  return (
    <ContentPageLayout
      title="Divorce Financial Checklist Before Mediation"
      subtitle="Preparation before mediation can improve clarity and reduce dispute. A structured checklist helps ensure all relevant financial information is gathered and organised."
      documentTitle="Divorce Financial Checklist Before Mediation | DivorceCalculatorUK"
      metaDescription="Prepare for divorce mediation with our financial checklist. Covers property, pensions, savings, liabilities, income, and expenses for England & Wales."
      relatedPages={relatedPages}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-checklist-heading">
          Financial Information Checklist
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Gathering the following information before mediation allows for more productive discussions and structured comparison of potential outcomes.
        </p>
        <div className="space-y-3">
          {checklistItems.map((item, index) => (
            <Card key={item.title} data-testid={`card-checklist-${index}`}>
              <CardContent className="pt-4 pb-3 flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FileCheck className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-why-preparation">
          Why Preparation Matters
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Mediation discussions benefit from structured financial preparation. Arriving with organised information enables more focused conversations.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-benefit-totals">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Wallet className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Clear Asset Totals</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Having accurate totals prevents misunderstandings and enables realistic scenario comparison.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-benefit-liquidity">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Eye className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Liquidity Visibility</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Understanding which assets are liquid vs illiquid informs more practical discussions about division.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-benefit-sustainability">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Sustainability Awareness</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Understanding ongoing costs helps assess whether proposed arrangements are financially sustainable.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-benefit-pension">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Pension Clarity</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Pension values and structures are often misunderstood. Having statements available enables informed discussion.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-official-guidance">
          Official Guidance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          General information about financial orders is available from the UK Government. This tool does not replace legal advice.
        </p>
        <ExternalLinkButton href="https://www.gov.uk/money-property-when-relationship-ends">
          GOV.UK Financial Orders Guidance
        </ExternalLinkButton>
        <InlineCTA label="Build your financial model" />
      </ContentSection>
    </ContentPageLayout>
  );
}
