import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calculator, ShieldCheck, AlertTriangle,
  TrendingUp, Scale, Home, PiggyBank, Gauge,
  Lock, FileText, Cpu, Settings,
} from "lucide-react";

function SectionBand({ label, color = "bg-primary/80" }: { label: string; color?: string }) {
  return (
    <div className={`${color} rounded-xl px-5 py-3.5 mb-5 flex items-center gap-3`}>
      <span className="text-xs font-bold uppercase tracking-widest text-white">{label}</span>
    </div>
  );
}

function SpecChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center text-[11px] font-medium text-primary bg-primary/8 border border-primary/15 px-2.5 py-1 rounded-full">
      {label}
    </span>
  );
}

function LimitChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
      {label}
    </span>
  );
}

export default function MethodologyPage() {
  useDocumentTitle("How We Model Divorce Settlements | DivorceCalculatorUK");
  useMetaTags({
    description: "How we calculate divorce financial settlements — 2026/27 UK tax and NI rates, pension offsetting, mortgage capacity, CRI scores, and scenario assumptions explained.",
    canonical: "https://divorcecalculatoruk.co.uk/methodology",
    ogTitle: "Divorce Calculator UK — Calculation Methodology",
    ogDescription: "2026/27 UK tax and NI rates, pension offsetting, mortgage capacity, CRI scores — how our divorce financial model works.",
    ogUrl: "https://divorcecalculatoruk.co.uk/methodology",
    ogType: "website",
  });
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[hsl(220_52%_18%)] via-[hsl(220_52%_22%)] to-[hsl(220_48%_26%)] text-white">
        <div className="container mx-auto px-4 max-w-4xl py-14">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-6 text-white/70 hover:text-white hover:bg-white/10 -ml-2"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>

          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-gold" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Transparency</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3" data-testid="text-methodology-title">
            Model Methodology &amp; Limitations
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl">
            A full technical description of how DivorceCalculatorUK works, what it calculates, and — just as importantly — what it does not do.
          </p>

          {/* Framework chips */}
          <div className="flex flex-wrap gap-2 mt-7">
            {[
              "Deterministic arithmetic model",
              "Client-side only — your data stays local",
              "HMRC 2026/27 rates",
              "England & Wales",
              "No ML or AI",
              "Last updated April 2026",
            ].map((c) => (
              <span key={c} className="text-[11px] font-medium text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12 space-y-10">

        {/* ── 1. Model Framework ── */}
        <section data-testid="section-model-framework">
          <SectionBand label="1 · Model Framework" color="bg-gradient-to-r from-[hsl(220_52%_22%)] to-[hsl(220_52%_16%)]" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              DivorceCalculatorUK uses a deterministic mathematical model to generate illustrative financial projections. All calculations run locally in your browser — no financial data is transmitted to our servers.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: Cpu,        color: "text-blue-600",   bg: "bg-blue-50",   title: "Deterministic",            body: "Identical inputs always produce identical outputs. No random or probabilistic elements." },
                { icon: Calculator, color: "text-violet-600", bg: "bg-violet-50", title: "Pure arithmetic",           body: "All outputs are structured arithmetic operations applied to user data and config parameters." },
                { icon: Lock,       color: "text-emerald-600",bg: "bg-emerald-50",title: "No machine learning",       body: "No ML, neural networks, or statistical learning of any kind. Fully auditable logic." },
                { icon: Settings,   color: "text-cyan-600",   bg: "bg-cyan-50",   title: "Configuration-driven",     body: "Tax rates and NI thresholds live in an external config file. Updated without code changes." },
                { icon: ShieldCheck,color: "text-rose-600",   bg: "bg-rose-50",   title: "Not predictive",           body: "Projects forward based on constant assumptions. Does not predict court outcomes or future events." },
                { icon: FileText,   color: "text-amber-600",  bg: "bg-amber-50",  title: "No real-world validation", body: "Outputs have not been validated against court orders, lender decisions, or settlement data." },
              ].map((card) => (
                <div key={card.title} className="flex gap-3 p-3 rounded-lg bg-muted/20 border border-border/40">
                  <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{card.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. What the Model Calculates ── */}
        <section data-testid="section-what-it-calculates">
          <SectionBand label="2 · What the Model Calculates" color="bg-gradient-to-r from-emerald-700 to-emerald-600" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Based on the figures you enter, the model generates the following illustrative outputs for each settlement scenario.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Net property equity after estimated sale costs",
                "Liquid asset & liability aggregation",
                "Pension allocation — nominal CETV basis",
                "Income tax & Class 1 NI estimates (2026/27)",
                "Indicative lending capacity benchmarks",
                "Capital allocation across 4 settlement scenarios",
                "5-year capital sustainability projections",
                "Cashflow Resilience Indicator (CRI) scores",
                "Child maintenance estimate (CMS-style formula)",
                "Sensitivity analysis — interest rate & expense variations",
                "Monthly surplus / deficit per party per scenario",
                "Funding gap assessment for keep-home scenarios",
              ].map((item) => (
                <SpecChip key={item} label={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Tax Model ── */}
        <section data-testid="section-tax-model">
          <SectionBand label="3 · Tax & NI Model (2026/27)" color="bg-gradient-to-r from-violet-700 to-violet-600" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Income tax and employee Class 1 National Insurance are calculated using current HMRC published rates. The personal allowance taper above £100,000 is modelled. All income sources are aggregated and taxed as a single pool.
              </p>
            </div>

            {/* Income Tax Table */}
            <div className="p-6 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Income Tax — 2026/27 Bands</p>
              <div className="rounded-lg overflow-hidden border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-violet-50 text-violet-800">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold">Band</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold">Taxable income</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { band: "Personal allowance", range: "Up to £12,570",         rate: "0%",  highlight: false },
                      { band: "Basic rate",          range: "£12,571 – £50,270",     rate: "20%", highlight: false },
                      { band: "Higher rate",         range: "£50,271 – £125,140",    rate: "40%", highlight: false },
                      { band: "Additional rate",     range: "Above £125,140",        rate: "45%", highlight: true  },
                      { band: "PA taper",            range: "£1 per £2 above £100k", rate: "—",   highlight: false },
                    ].map((row) => (
                      <tr key={row.band} className={row.highlight ? "bg-violet-50/40" : "bg-white"}>
                        <td className="px-4 py-2.5 text-xs font-medium text-foreground">{row.band}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground tabular-nums">{row.range}</td>
                        <td className="px-4 py-2.5 text-xs font-bold text-right text-violet-700 tabular-nums">{row.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* NI Table */}
            <div className="p-6 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Employee NI — Class 1</p>
              <div className="rounded-lg overflow-hidden border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-cyan-50 text-cyan-800">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold">Band</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold">Earnings range</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { band: "Below Primary Threshold", range: "Up to £12,570",      rate: "0%" },
                      { band: "Main rate",               range: "£12,571 – £50,270",  rate: "8%" },
                      { band: "Upper rate",              range: "Above £50,270",       rate: "2%" },
                    ].map((row) => (
                      <tr key={row.band} className="bg-white">
                        <td className="px-4 py-2.5 text-xs font-medium text-foreground">{row.band}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground tabular-nums">{row.range}</td>
                        <td className="px-4 py-2.5 text-xs font-bold text-right text-cyan-700 tabular-nums">{row.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tax limitations */}
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Not included in the tax model</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Dividend rates or savings allowance",
                  "Scottish income tax rates",
                  "Self-employed NI (Class 2 & 4)",
                  "Capital Gains Tax",
                  "High Income Child Benefit Charge",
                  "Pension contribution relief",
                  "Student loan repayments",
                  "Marriage Allowance",
                  "Employer pension contributions",
                  "Salary sacrifice",
                  "Benefits in kind",
                  "EIS or charitable relief",
                ].map((item) => (
                  <LimitChip key={item} label={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Calculation Methodology ── */}
        <section data-testid="section-calculations">
          <SectionBand label="4 · Core Calculation Methodology" color="bg-gradient-to-r from-blue-700 to-blue-600" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">

            {/* Net income */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Calculator className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">Net income</p>
              </div>
              <div className="bg-blue-50/50 rounded-lg px-4 py-3 text-sm font-mono text-blue-800 mb-3 inline-block">
                Net income = Gross income − Income tax − National Insurance
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">•</span>Gross income entered per party — employment, self-employment, rental, or other</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">•</span>Tax computed using 2026/27 HMRC band rates with PA taper above £100,000</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">•</span>Users may override with their own net income figure if more accurate</li>
              </ul>
            </div>

            {/* Monthly surplus */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">Monthly surplus / deficit</p>
              </div>
              <div className="bg-emerald-50/50 rounded-lg px-4 py-3 text-sm font-mono text-emerald-800 mb-3 inline-block">
                Surplus = (Annual net ÷ 12) − mortgage − living expenses − child maintenance
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-emerald-400 shrink-0">•</span>Monthly net income = Annual net income ÷ 12</li>
                <li className="flex gap-2"><span className="text-emerald-400 shrink-0">•</span>Outgoings include mortgage repayment (scenario-dependent) and user-entered expenses</li>
                <li className="flex gap-2"><span className="text-emerald-400 shrink-0">•</span>Child maintenance deducted from paying party's surplus if applicable</li>
              </ul>
            </div>

            {/* Capital reserve duration */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                  <PiggyBank className="w-3.5 h-3.5 text-violet-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">Capital reserve duration</p>
              </div>
              <div className="bg-violet-50/50 rounded-lg px-4 py-3 text-sm font-mono text-violet-800 mb-3 inline-block">
                Reserve months = Starting liquid capital ÷ Monthly deficit
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span>Starting liquid capital = cash, savings, and investments allocated under each scenario</li>
                <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span>Only calculated when a party has a monthly deficit — surplus parties show reserves as sustained</li>
                <li className="flex gap-2"><span className="text-violet-400 shrink-0">•</span>Below 12 months indicates a limited financial buffer under current assumptions</li>
              </ul>
            </div>

            {/* Lending capacity */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Home className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">Lending capacity benchmark</p>
              </div>
              <div className="flex flex-wrap gap-3 mb-3">
                <div className="bg-amber-50 rounded-lg px-4 py-2.5 text-center border border-amber-100">
                  <p className="text-lg font-bold tabular-nums text-amber-700">4.5×</p>
                  <p className="text-[10px] text-amber-600 font-medium">Income multiple</p>
                </div>
                <div className="bg-amber-50 rounded-lg px-4 py-2.5 text-center border border-amber-100">
                  <p className="text-lg font-bold tabular-nums text-amber-700">35%</p>
                  <p className="text-[10px] text-amber-600 font-medium">Mortgage/net-income cap</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Generalised illustrations only — not a lending assessment or mortgage advice. Actual decisions depend on creditworthiness, credit history, employment status, and lender-specific criteria beyond this model's scope.
              </p>
            </div>

            {/* Child maintenance */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
                  <Scale className="w-3.5 h-3.5 text-rose-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">Child maintenance estimate (CMS-style)</p>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-100 mb-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-rose-50 text-rose-800">
                      <th className="text-left px-4 py-2 font-semibold">Children</th>
                      <th className="text-right px-4 py-2 font-semibold">Rate on qualifying income</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { c: "1 child",    r: "12%" },
                      { c: "2 children", r: "16%" },
                      { c: "3+ children",r: "19%" },
                    ].map((row) => (
                      <tr key={row.c} className="bg-white">
                        <td className="px-4 py-2 text-foreground font-medium">{row.c}</td>
                        <td className="px-4 py-2 text-right font-bold text-rose-700 tabular-nums">{row.r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground">Flat rate threshold of £7/week applied. Does not model shared care adjustments, variations, or CMS collection charges.</p>
            </div>
          </div>
        </section>

        {/* ── 5. CRI ── */}
        <section data-testid="section-cri">
          <SectionBand label="5 · Cashflow Resilience Indicator" color="bg-gradient-to-r from-rose-700 to-rose-600" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              The Cashflow Resilience Indicator (CRI) is a composite metric calculated by the model. It starts at 100 and applies deductions based on five financial pressure factors.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                "Funding shortfall in the settlement structure",
                "Lending capacity benchmark exceeded",
                "Capital depletion within the projection period",
                "Liquid capital below 6-month expenditure reserve",
                "Property concentration above 70% of net worth",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50/40 border border-rose-100">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Score bands</p>
            <div className="flex flex-wrap gap-3">
              {[
                { range: "80 – 100", label: "Higher Resilience",   color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                { range: "60 – 79",  label: "Moderate Resilience", color: "bg-amber-50 border-amber-200 text-amber-700"       },
                { range: "Below 60", label: "Lower Resilience",    color: "bg-rose-50 border-rose-200 text-rose-700"          },
              ].map((band) => (
                <div key={band.range} className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${band.color}`}>
                  <Gauge className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs font-bold tabular-nums">{band.range}</span>
                  <span className="text-xs">— {band.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic">
              These bands are descriptive labels only and do not constitute financial advice, risk profiling, or suitability assessment.
            </p>
          </div>
        </section>

        {/* ── 6. Structural Limitations ── */}
        <section data-testid="section-limitations">
          <SectionBand label="6 · Structural Limitations" color="bg-gradient-to-r from-amber-600 to-amber-500" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">

            {[
              {
                icon: Scale, color: "text-blue-600", bg: "bg-blue-50",
                title: "Legal & judicial",
                items: [
                  "No behavioural modelling — negotiation dynamics, emotional factors, or strategic decision-making are not modelled",
                  "No judicial discretion modelling — courts exercise broad discretion under the Matrimonial Causes Act 1973; this model cannot replicate or predict judicial reasoning",
                  "No forward legislation modelling — applies current published rates only",
                ],
              },
              {
                icon: Home, color: "text-amber-600", bg: "bg-amber-50",
                title: "Property & mortgage",
                items: [
                  "Lending benchmarks are generalised income multiple illustrations — not lender-specific underwriting criteria",
                  "No modelling of ERC (early repayment charges), product fees, or lender credit scoring",
                  "Property values entered by the user — no independent valuation or market data",
                ],
              },
              {
                icon: PiggyBank, color: "text-violet-600", bg: "bg-violet-50",
                title: "Pensions",
                items: [
                  "Pension values treated as nominal CETV figures only — no actuarial adjustment for pension type, annuity rates, or tax on drawdown",
                  "Defined benefit (final salary) schemes may have a CETV that significantly understates long-term value",
                  "Pension sharing orders and their administrative costs are not modelled",
                ],
              },
              {
                icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50",
                title: "Projections",
                items: [
                  "5-year projections hold all current parameters constant — income, expenses, interest rates, and tax rates are static unless the user applies sensitivity sliders",
                  "No inflation modelling — all values are expressed in current nominal terms",
                  "No investment return modelling — liquid capital is assumed to generate no return",
                  "No employment change modelling — income is held static throughout the projection period",
                ],
              },
            ].map((group) => (
              <div key={group.title} className="p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-7 h-7 rounded-lg ${group.bg} flex items-center justify-center`}>
                    <group.icon className={`w-3.5 h-3.5 ${group.color}`} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{group.title}</p>
                </div>
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Architecture & Privacy ── */}
        <section data-testid="section-architecture">
          <SectionBand label="7 · Architecture &amp; Privacy" color="bg-gradient-to-r from-[hsl(220_52%_22%)] to-[hsl(220_52%_16%)]" />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              {[
                { icon: Lock,       color: "text-emerald-600", bg: "bg-emerald-50", title: "Client-side engine",     body: "All core calculations run in your browser. No financial data transmitted to servers." },
                { icon: ShieldCheck,color: "text-blue-600",    bg: "bg-blue-50",    title: "No server storage",      body: "Entered figures are stored in your browser's localStorage only — not on our database." },
                { icon: Settings,   color: "text-violet-600",  bg: "bg-violet-50",  title: "Config-driven rates",    body: "Tax and NI parameters are in an external config file — updated without code changes when HMRC publishes new rates." },
              ].map((card) => (
                <div key={card.title} className="p-4 rounded-xl bg-muted/20 border border-border/40">
                  <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center mb-2.5`}>
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">{card.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-muted/20 border border-border/40 p-4 text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Explicit methodology statement: </span>
              All outputs represent structured arithmetic projections only — not predictive models of real-world outcomes. The model does not predict court outcomes, assess suitability for any financial product, or provide regulated financial advice under the Financial Services and Markets Act 2000. The operator has no visibility of data entered or outputs generated by individual users.
            </div>
          </div>
        </section>

        {/* Footer links */}
        <div className="pt-2 pb-8 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span>For further information:</span>
          <Link href="/terms" className="underline text-primary hover:text-primary/80">Terms of Use</Link>
          <Link href="/privacy" className="underline text-primary hover:text-primary/80">Privacy Policy</Link>
          <Link href="/contact" className="underline text-primary hover:text-primary/80">Contact & Support</Link>
        </div>

      </div>
    </div>
  );
}
