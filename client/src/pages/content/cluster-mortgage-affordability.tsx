import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wallet, Receipt, TrendingUp, Calculator, Users, Briefcase, HeartHandshake, FileSearch, CreditCard, Landmark } from "lucide-react";
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
    title: "Financial Checklist Before Mediation",
    description: "Prepare structured financial information before entering mediation discussions.",
    href: "/divorce-financial-checklist-before-mediation",
    badge: "Preparation",
  },
  {
    title: "Who Pays the Mortgage During Divorce?",
    description: "What happens to mortgage payments while proceedings are ongoing.",
    href: "/who-pays-mortgage-during-divorce-uk",
    badge: "Property",
  },
  {
    title: "Both Names on the Mortgage — What Happens?",
    description: "Your options when the mortgage is in joint names and you separate.",
    href: "/both-names-on-mortgage-divorce-uk",
    badge: "Property",
  },
];

export default function ClusterMortgageAffordability() {
  return (
    <ContentPageLayout
      title="Mortgage After Divorce UK"
      subtitle="Retaining property after divorce requires careful affordability assessment. Structured modelling examines net income, expenditure, interest rate sensitivity, and income multiple benchmarks — as generalised illustrations, not lending approvals."
      documentTitle="Mortgage After Divorce UK – Affordability Modelling | DivorceCalculatorUK"
      metaDescription="Model mortgage affordability after divorce in the UK. Assess net income, expenses, interest rate sensitivity, and lending capacity benchmarks for property retention."
      relatedPages={relatedPages}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-affordability-factors">
          Key Affordability Factors
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Financial sustainability modelling considers multiple interacting factors. Each must be assessed individually and in combination.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-factor-income">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Wallet className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Net Income Post-Separation</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Gross income minus tax, National Insurance, and pension contributions. This determines the actual funds available for housing costs.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-factor-expenses">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Receipt className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Essential Expenditure</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Monthly living costs, childcare, transport, and other fixed obligations that must be met alongside mortgage payments.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-factor-rates">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Interest Rate Sensitivity</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Modelling how payment amounts change if interest rates rise provides a forward-looking perspective on sustainability.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-factor-multiples">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Calculator className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Income Multiple Benchmarks</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Generalised lending benchmarks (often 4-4.5x gross income) are illustrative only and not lending decisions. Actual criteria vary by lender.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-income-changes">
          Post-Separation Income Changes
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Separation frequently affects household income in ways that may not be immediately apparent. Where two incomes previously supported a single household, post-separation each party typically bears independent housing costs on a reduced income base. Understanding these changes is a relevant consideration when assessing mortgage sustainability.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card data-testid="card-income-joint">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Loss of Joint Income Benefits</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Two-income households often benefit from combined tax thresholds, shared utility costs, and pooled resources. Separation removes these efficiencies, meaning net disposable income per person typically decreases even if gross income remains unchanged.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-income-maintenance">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Potential Maintenance Payments</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Spousal or child maintenance obligations may affect the paying party's disposable income and mortgage capacity. Conversely, maintenance receipts may form part of the receiving party's income for affordability purposes, though lender treatment of maintenance income varies.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-income-work">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Return to Work Considerations</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Where one party has been out of the workforce during the marriage, returning to employment may take time. Initial earnings may be lower than historical income levels, and childcare costs may reduce net income further during the transition period.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-stress-testing">
          Stress Testing Scenarios
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Financial sustainability modelling may include adverse scenarios to test resilience. This provides a more complete picture but does not replace regulated mortgage advice.
        </p>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="rate-rise" data-testid="accordion-rate-rise">
            <AccordionTrigger className="text-sm font-semibold">
              Interest Rate Increases
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Modelling a 1-2% rate increase above current levels illustrates how monthly payments would change. This is particularly relevant for variable rate mortgages or when fixed rate periods are ending. Rising rates can significantly impact affordability, especially when combined with other post-separation financial pressures.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="income-drop" data-testid="accordion-income-drop">
            <AccordionTrigger className="text-sm font-semibold">
              Income Reduction
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Considering a scenario where income decreases — whether through job change, reduced hours, or loss of supplementary income — helps assess the margin of safety in affordability calculations. A scenario with 10-20% lower income can reveal vulnerability.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="unexpected" data-testid="accordion-unexpected">
            <AccordionTrigger className="text-sm font-semibold">
              Unexpected Expenses
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Property maintenance, repairs, and other unplanned costs can strain budgets. Modelling with an additional contingency allocation (typically 5-10% of monthly income) helps assess whether the budget has sufficient flexibility for unexpected demands.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <InlineCTA label="Run affordability modelling" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-lender-assessment">
          What Lenders Typically Assess
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          While this tool does not replicate lender criteria, understanding the general categories that lenders typically evaluate may provide useful context when modelling affordability scenarios. Actual lending decisions involve proprietary criteria and individual assessment.
        </p>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="income-verification" data-testid="accordion-income-verification">
            <AccordionTrigger className="text-sm font-semibold">
              Income Verification
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lenders generally require evidence of stable, verifiable income. For employed applicants, this typically includes recent payslips and P60 forms. Self-employed applicants may need to provide two or three years of accounts or SA302 tax calculations. Some lenders may accept maintenance income as part of affordability assessments, though policies vary considerably between institutions.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="credit-history" data-testid="accordion-credit-history">
            <AccordionTrigger className="text-sm font-semibold">
              Credit History
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A credit search forms part of the standard application process. Joint financial associations from the marriage may remain on credit files until formally disassociated. Outstanding debts, missed payments, and county court judgments may affect eligibility. Separation itself does not appear on credit records, but financial disruption during the process may leave marks that affect future applications.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="deposit-equity" data-testid="accordion-deposit-equity">
            <AccordionTrigger className="text-sm font-semibold">
              Deposit & Equity Requirements
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Where a party is retaining the existing property, the equity held after buying out the other party's share effectively serves as the deposit. Where purchasing a new property, deposit requirements typically range from 5% to 25% of the purchase price, with lower interest rates generally available at higher deposit levels. The loan-to-value ratio is a key factor in both pricing and eligibility.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-important-note">
          Important Note
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This modelling provides generalised illustrations only. It does not constitute mortgage advice, a lending decision, or a guarantee of borrowing capacity. Independent mortgage advice from a regulated adviser may be warranted before making property retention decisions.
        </p>
      </ContentSection>
    </ContentPageLayout>
  );
}
