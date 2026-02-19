import { useDocumentTitle } from "@/hooks/use-document-title";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function MethodologyPage() {
  useDocumentTitle("Model Methodology & Limitations | DivorceCalculatorUK");
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6"
          data-testid="button-back-home"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>

        <h1 className="text-3xl font-display font-bold mb-8" data-testid="text-methodology-title">Model Methodology & Limitations</h1>

        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground font-medium">Last updated: February 2026</p>
          <p>This page describes the mathematical framework, structural assumptions, and explicit limitations of the DivorceCalculatorUK financial modelling tool. It is provided for transparency and to support informed use of the modelling outputs.</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Model Framework</h2>
            <p>DivorceCalculatorUK uses a deterministic mathematical model to generate illustrative financial projections. The key characteristics of the model are:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Deterministic:</strong> The model produces the same output for identical inputs. There are no random, stochastic, or probabilistic elements.</li>
              <li><strong>Arithmetic projection:</strong> All outputs are the product of structured arithmetic operations applied to user-entered data and configuration parameters.</li>
              <li><strong>No machine learning:</strong> The model does not use machine learning, artificial intelligence, neural networks, or any form of statistical learning.</li>
              <li><strong>No predictive analytics:</strong> The model does not predict future outcomes. It projects forward based on current assumptions held constant.</li>
              <li><strong>No real-world validation:</strong> Outputs have not been validated against actual court outcomes, professional valuations, lender decisions, or real-world settlement data.</li>
              <li><strong>Configuration-driven:</strong> Tax rates, NI thresholds, and lending capacity benchmarks are stored in an external configuration file and are not hardcoded. This allows updates when HMRC publishes new rates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. What the Model Calculates</h2>
            <p>The model generates the following illustrative outputs based on user-entered data:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Net property equity after deduction of estimated selling costs</li>
              <li>Liquid asset and liability aggregation</li>
              <li>Pension allocation on a nominal CETV basis</li>
              <li>Income tax and employee Class 1 National Insurance estimates (2025/26 rates)</li>
              <li>Indicative lending capacity benchmarks (generalised income multiple illustration)</li>
              <li>Capital allocation across settlement scenarios</li>
              <li>5-year capital sustainability projections (static assumptions)</li>
              <li>Financial sustainability indicators (composite model-based metric)</li>
              <li>Child maintenance estimates using a simplified CMS-style formula</li>
              <li>Sensitivity analysis for interest rate and expense variations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Structural Limitations</h2>
            <p>The model applies significant simplifying assumptions and does not account for the following:</p>

            <p className="font-medium mt-3">Financial and legal limitations:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>No behavioural modelling — the model does not account for negotiation dynamics, emotional factors, or strategic decision-making</li>
              <li>No judicial discretion modelling — courts exercise broad discretion under the Matrimonial Causes Act 1973; this model cannot replicate or predict judicial reasoning</li>
              <li>No lender-specific criteria — lending capacity benchmarks are generalised income multiple illustrations and do not reflect any specific lender's underwriting criteria, credit scoring, or affordability assessment methodology</li>
              <li>No actuarial pension adjustments — pension values are treated as nominal CETV figures without adjustment for pension type, annuity rates, tax on drawdown, or member-specific factors</li>
              <li>No spousal maintenance modelling — periodical payments are not included in the financial model</li>
              <li>No forward legislation modelling — the model applies current published rates and does not anticipate changes in tax law, benefit entitlements, or regulatory frameworks</li>
            </ul>

            <p className="font-medium mt-3">Tax model limitations:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Income tax and employee Class 1 NI only (2025/26 rates)</li>
              <li>Personal allowance tapering above £100,000 is modelled</li>
              <li>All income sources are aggregated and taxed as a single pool — no dividend rates, savings allowance, or source-specific treatment</li>
              <li>Scottish income tax rates are not applied — England, Wales, and Northern Ireland rates are used for all parties</li>
              <li>Self-employed NI (Class 2 and Class 4) is excluded</li>
              <li>Capital Gains Tax, High Income Child Benefit Charge, pension contribution relief, student loan repayments, Marriage Allowance, and Married Couple's Allowance are all excluded</li>
              <li>Employer pension contributions, salary sacrifice arrangements, and benefits-in-kind are not modelled</li>
              <li>No modelling of tax reliefs for charitable donations, Enterprise Investment Scheme, or other tax-advantaged investments</li>
            </ul>

            <p className="font-medium mt-3">Child maintenance limitations:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Uses a simplified CMS-style formula based on gross income of the paying party and number of qualifying children</li>
              <li>Does not model shared care adjustments, variations for other relevant children, special expenses, or voluntary agreements</li>
              <li>CMS rates applied: 12% (1 child), 16% (2 children), 19% (3+ children) of gross income above the £7 per week flat rate threshold</li>
              <li>Does not account for CMS collection charges, enforcement actions, or direct pay vs Collect &amp; Pay distinctions</li>
            </ul>

            <p className="font-medium mt-3">Projection limitations:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>5-year projections assume all current parameters remain constant — income, expenses, interest rates, and tax rates are not varied unless the user applies sensitivity adjustments</li>
              <li>No inflation modelling — all values are expressed in current nominal terms</li>
              <li>No investment return modelling — liquid capital is assumed to generate no return</li>
              <li>No employment change modelling — income is held static throughout the projection period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Financial Sustainability Indicator</h2>
            <p>The Financial Sustainability Indicator is a composite metric generated by the model. It is calculated by applying deductions from a base score of 100 based on the following factors:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Funding shortfall in the settlement structure</li>
              <li>Lending capacity benchmark exceedance</li>
              <li>Capital depletion within the projection period</li>
              <li>Liquid capital below 6-month expenditure reserve</li>
              <li>Property concentration above 70% of net worth</li>
            </ul>
            <p>The indicator uses three neutral bands: Higher Resilience (80+), Moderate Resilience (60-79), and Lower Resilience (below 60). These bands are descriptive labels only and do not constitute financial advice, risk profiling, or suitability assessment.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Lending Capacity Benchmarks</h2>
            <p>Where a scenario involves one party retaining the family home, the model calculates an indicative lending capacity benchmark based on a generalised income multiple (typically 4.5x gross annual income) and a mortgage-to-net-income ratio threshold (35%).</p>
            <p>These are generalised illustrations only. They do not constitute a lending assessment, mortgage advice, or credit approval indication. Actual lending decisions depend on individual creditworthiness, employment status, credit history, existing commitments, lender-specific criteria, and regulatory requirements that are beyond the scope of this model.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Explicit Methodology Statement</h2>
            <p className="font-medium text-foreground">The outputs represent structured arithmetic projections only and are not predictive models of real-world outcomes.</p>
            <p>The model does not predict court outcomes, judicial discretion, legal entitlement, or settlement fairness. It does not assess suitability for any financial product or arrangement. It does not provide regulated financial advice under the Financial Services and Markets Act 2000.</p>
            <p>All outputs are generated locally in the user's web browser and are based entirely on the data entered and assumptions configured by the user. The model operator has no visibility of the data entered or outputs generated.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Client-Side Architecture</h2>
            <p>All financial calculations are performed in the user's web browser using client-side JavaScript. No financial data is transmitted to or stored on the server. This architecture is designed to preserve user privacy, but it also means that the model operator cannot audit, verify, or correct individual outputs.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Configuration and Updates</h2>
            <p>Tax rates, NI thresholds, and lending capacity parameters are stored in an external configuration file (<code>config.fixed.json</code>). When HMRC publishes updated rates for a new tax year, the configuration file is updated accordingly. No changes to the model code are required to update tax parameters.</p>
            <p>The current configuration reflects HMRC published rates for the 2025/26 UK tax year. Users should verify that the tax year applied matches their requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Calculation Methodology</h2>
            <p>The following outlines the core calculation methodology used within the model.</p>

            <p className="font-medium mt-3">Net income calculation:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Gross income is entered by the user for each party</li>
              <li>Income tax is calculated using 2025/26 HMRC rates: 0% personal allowance (£12,570), 20% basic rate (£12,571–£50,270), 40% higher rate (£50,271–£125,140), 45% additional rate (above £125,140)</li>
              <li>Personal allowance tapers by £1 for every £2 of income above £100,000</li>
              <li>Employee Class 1 NI is calculated at 8% on earnings between £12,570 and £50,270, and 2% above £50,270</li>
              <li>Net income = Gross income − Income tax − National Insurance</li>
              <li>Users may override the calculated net income with their own figure if they have more accurate information</li>
            </ul>

            <p className="font-medium mt-3">Monthly surplus / deficit:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Monthly net income = Annual net income ÷ 12</li>
              <li>Monthly outgoings = Monthly living expenses + Monthly mortgage payment (if applicable)</li>
              <li>Monthly surplus or deficit = Monthly net income − Monthly outgoings − Monthly child maintenance (if applicable)</li>
            </ul>

            <p className="font-medium mt-3">Reserve duration:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Starting liquid capital is the total of cash, savings, and investments allocated to each party under each scenario</li>
              <li>If a party has a monthly deficit, reserve duration = Starting liquid capital ÷ Monthly deficit (in months)</li>
              <li>If a party has a monthly surplus, reserves are not being depleted and duration is shown as 99+ months</li>
              <li>Figures below 12 months indicate a limited financial buffer under current assumptions</li>
            </ul>
          </section>

          <div className="pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              For further information, see our <Link href="/terms" className="underline text-primary">Terms of Use</Link> and <Link href="/privacy" className="underline text-primary">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
