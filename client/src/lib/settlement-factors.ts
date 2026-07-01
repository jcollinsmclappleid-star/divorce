import type { StoreState } from "@/hooks/use-store";
import type { EngineResult } from "@/hooks/use-engine";
import { formatCurrency } from "@/lib/utils";

export interface SettlementFactor {
  title: string;
  fact: string;
  whyItMatters: string;
  userQuestion?: string;
  figuresToCheck?: string[];
  documentsToGather?: string[];
  discussWith?: string[];
  professionalQuestions?: string[];
  sourceLabel?: string;
  sourceUrl?: string;
  sourceSummary?: string;
}

export interface SettlementFactorGroup {
  id: string;
  title: string;
  intro: string;
  items: SettlementFactor[];
}

function pensionTotal(store: StoreState) {
  return store.assets
    .filter((asset) => asset.category === "pension")
    .reduce((sum, pension) => sum + (pension.cetv ?? pension.currentValue), 0);
}

function nonMortgageDebt(store: StoreState) {
  return store.liabilities
    .filter((liability) => liability.category !== "mortgage")
    .reduce((sum, liability) => sum + liability.balance, 0);
}

export const FACTOR_SOURCES = {
  govMoneyProperty: {
    label: "GOV.UK money and property",
    url: "https://www.gov.uk/money-property-when-relationship-ends",
    summary: "GOV.UK explains that divorcing couples need to divide finances including property, pensions, savings and investments, and can apply for a consent order or financial order.",
  },
  govCourtDecision: {
    label: "GOV.UK financial order route",
    url: "https://www.gov.uk/money-property-when-relationship-ends/get-court-to-decide",
    summary: "GOV.UK lists Form E information such as property, debts, pension documents, salary evidence and future living costs, and explains that financial orders involve needs, earning ability, resources and children.",
  },
  section25: {
    label: "Matrimonial Causes Act 1973 s25",
    url: "https://www.legislation.gov.uk/ukpga/1973/18/section/25",
    summary: "Section 25 lists matters including income, earning capacity, property, needs, standard of living, age, duration, disability, contributions and benefits lost on divorce.",
  },
  cms: {
    label: "GOV.UK child maintenance calculator",
    url: "https://www.gov.uk/calculate-child-maintenance",
    summary: "GOV.UK explains that the child maintenance calculator estimates payments and does not send details to DWP; actual CMS payments can be higher or lower.",
  },
  moneyHelperPensions: {
    label: "MoneyHelper pensions guidance",
    url: "https://www.moneyhelper.org.uk/en/family-and-care/divorce-and-separation",
    summary: "MoneyHelper is government-backed and offers impartial guidance on divorce finances, including pensions and divorce or dissolution appointments.",
  },
  formE: {
    label: "GOV.UK financial statement (Form E)",
    url: "https://www.gov.uk/government/publications/form-e-financial-statement-for-a-financial-order",
    summary: "GOV.UK publishes Form E, the financial statement used to set out property, pensions, income, outgoings, liabilities and capital needs for financial order proceedings.",
  },
} as const;

const FACTOR_ENRICHMENT: Record<string, Partial<SettlementFactor>> = {
  "Needs and available resources": {
    userQuestion: "Before anyone talks percentages, what does the full financial picture actually show?",
    figuresToCheck: ["Total assets", "Total liabilities", "Net home equity", "Liquid savings", "Monthly surplus or deficit"],
    documentsToGather: ["Recent mortgage statement", "Bank and savings statements", "Loan and credit card balances", "Income evidence"],
    discussWith: ["Solicitor or mediator", "Financial planner where appropriate"],
    professionalQuestions: [
      "Are any major assets, liabilities or income sources missing from the figures entered?",
      "Which figures would materially change the picture if updated?",
      "Which scenario creates the most pressure in cashflow rather than headline capital?",
    ],
    sourceLabel: FACTOR_SOURCES.section25.label,
    sourceUrl: FACTOR_SOURCES.section25.url,
    sourceSummary: FACTOR_SOURCES.section25.summary,
  },
  "Housing needs and the family home": {
    userQuestion: "Can I stay in the home, or would the mortgage and monthly costs make that unrealistic?",
    figuresToCheck: ["Home value", "Mortgage balance", "Net equity after sale costs", "Possible buyout amount", "Monthly mortgage payment"],
    documentsToGather: ["Mortgage statement", "Property valuation or estate agent estimate", "Redemption statement if available", "Buildings insurance and service charge figures"],
    discussWith: ["Solicitor or mediator", "Mortgage broker"],
    professionalQuestions: [
      "What further property evidence is needed before relying on this home value?",
      "Does either party's income support the mortgage balance under a keep-home scenario?",
      "What sale or transfer costs should be checked before comparing options?",
    ],
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
  },
  "Family home and rehousing pressure": {
    userQuestion: "Does the home split leave enough cash and income for both people to rehouse?",
    figuresToCheck: ["Home value", "Mortgage balance", "Sale costs", "Liquid cash after each scenario", "Monthly housing costs"],
    documentsToGather: ["Mortgage statement", "Valuation estimate", "Rental or mortgage affordability estimates", "Moving cost estimates"],
    discussWith: ["Mortgage broker", "Solicitor or mediator"],
    professionalQuestions: [
      "Does the modelled keep-home route create a funding gap?",
      "How does the sale scenario compare with the buyout scenario for monthly cashflow?",
      "Which housing figures need third-party confirmation?",
    ],
    sourceLabel: FACTOR_SOURCES.govMoneyProperty.label,
    sourceUrl: FACTOR_SOURCES.govMoneyProperty.url,
    sourceSummary: FACTOR_SOURCES.govMoneyProperty.summary,
  },
  "Pensions can be taken into account": {
    userQuestion: "Is a large pension value being missed because everyone is focused on the house?",
    figuresToCheck: ["CETV for every pension", "Owner of each pension", "Pension type", "Pension split assumption", "Property offset assumption"],
    documentsToGather: ["Latest pension statement", "Cash Equivalent Transfer Value", "Scheme booklet or pension type details", "State Pension forecast where relevant"],
    discussWith: ["Pension expert", "Solicitor or mediator", "Financial planner where appropriate"],
    professionalQuestions: [
      "Are the CETV figures current enough to compare with property and savings?",
      "Would specialist pension valuation help before comparing pension and property value?",
      "Does any scenario leave one party property-heavy but pension-light?",
    ],
    sourceLabel: FACTOR_SOURCES.moneyHelperPensions.label,
    sourceUrl: FACTOR_SOURCES.moneyHelperPensions.url,
    sourceSummary: FACTOR_SOURCES.moneyHelperPensions.summary,
  },
  "Earning capacity and income imbalance": {
    userQuestion: "If one of us earns less, gave up work, or paused a career, does the monthly picture still work?",
    figuresToCheck: ["Gross income for both parties", "Estimated net income", "Monthly bills", "Childcare costs", "Pension gap"],
    documentsToGather: ["Payslips", "P60s", "Self-assessment returns", "Benefit statements", "Childcare invoices", "Pension statements"],
    discussWith: ["Solicitor or mediator", "Financial planner where appropriate"],
    professionalQuestions: [
      "Are the income figures stable and evidenced?",
      "What extra evidence is needed about realistic post-separation income and costs?",
      "Which scenario creates the larger monthly shortfall under the current assumptions?",
    ],
    sourceLabel: FACTOR_SOURCES.section25.label,
    sourceUrl: FACTOR_SOURCES.section25.url,
    sourceSummary: FACTOR_SOURCES.section25.summary,
  },
  "Income and monthly affordability": {
    userQuestion: "Does the split still work after tax, housing payments and ordinary bills?",
    figuresToCheck: ["Gross income", "Estimated net income", "Monthly expenses", "Mortgage payments", "Reserve runway"],
    documentsToGather: ["Payslips", "Bank statements", "Mortgage statements", "Utility and childcare bills", "Budget notes"],
    discussWith: ["Solicitor or mediator", "Mortgage broker where property is involved"],
    professionalQuestions: [
      "Which monthly costs are estimates and which are evidenced?",
      "Which party is more exposed to a monthly deficit under the current model?",
      "Would updated income or bill evidence materially change the scenario comparison?",
    ],
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
  },
  "Career breaks and homemaking contributions": {
    userQuestion: "I gave up work, carried the home, or looked after the kids. How do I make sure the financial impact is visible?",
    figuresToCheck: ["Current income gap", "Pension gap", "Childcare costs", "Monthly surplus or deficit", "Retraining or return-to-work assumptions"],
    documentsToGather: ["Employment history notes", "Pension statements", "Childcare invoices", "Household budget", "Evidence of current and realistic future income"],
    discussWith: ["Solicitor or mediator", "Pension expert where pension gap is material"],
    professionalQuestions: [
      "What evidence is useful to explain the financial impact of time out of paid work?",
      "Do the pension and income figures show a long-term imbalance that needs professional review?",
      "Which assumptions about future earnings should be checked before relying on the model?",
    ],
    sourceLabel: FACTOR_SOURCES.section25.label,
    sourceUrl: FACTOR_SOURCES.section25.url,
    sourceSummary: FACTOR_SOURCES.section25.summary,
  },
  "Child maintenance and household cashflow": {
    userQuestion: "What does child support do to the monthly numbers?",
    figuresToCheck: ["Gross weekly income", "Number of children", "Shared care nights", "Childcare costs", "Monthly surplus after child-related costs"],
    documentsToGather: ["Income evidence", "Childcare invoices", "School or activity costs", "Shared-care assumptions", "CMS estimate if used"],
    discussWith: ["Solicitor or mediator", "Child Maintenance Service where appropriate"],
    professionalQuestions: [
      "Are the child maintenance assumptions only being used for cashflow modelling?",
      "Which child-related costs are not included in the monthly budget yet?",
      "Would a different shared-care assumption materially change the cashflow model?",
    ],
    sourceLabel: FACTOR_SOURCES.cms.label,
    sourceUrl: FACTOR_SOURCES.cms.url,
    sourceSummary: FACTOR_SOURCES.cms.summary,
  },
  "Debts and liquidity": {
    userQuestion: "Did I carry the bills, cards, loans or mortgage pressure, and does that show in the numbers?",
    figuresToCheck: ["Credit card balances", "Loan balances", "Car finance", "Overdrafts", "Monthly debt payments", "Cash reserves"],
    documentsToGather: ["Credit card statements", "Loan agreements", "Car finance agreements", "Bank statements", "HMRC/tax balance evidence if relevant"],
    discussWith: ["Solicitor or mediator", "Debt adviser where appropriate"],
    professionalQuestions: [
      "Are all debt balances current and correctly allocated in the model?",
      "Which debts affect monthly cashflow most after separation?",
      "Does any scenario leave one party with low cash reserves after debt pressure?",
    ],
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
  },
  "Property equity": {
    userQuestion: "Have the home value, mortgage and sale costs all been counted before comparing any split?",
    figuresToCheck: ["Current property valuation", "Mortgage balance", "Estimated sale costs", "Net equity after costs", "Buyout amount if one party keeps the home"],
    documentsToGather: ["Mortgage statement", "Estate agent valuation or comparable sales", "Redemption quote if available", "Buildings insurance and service charge details"],
    discussWith: ["Solicitor or mediator", "Mortgage broker if keeping the home"],
    professionalQuestions: [
      "Is the home value evidenced enough to compare sale, buyout and deferred-sale routes?",
      "Which sale or transfer costs should be checked before relying on net equity?",
      "Does either party's income support the mortgage under a keep-home scenario?",
    ],
    sourceLabel: FACTOR_SOURCES.govMoneyProperty.label,
    sourceUrl: FACTOR_SOURCES.govMoneyProperty.url,
    sourceSummary: FACTOR_SOURCES.govMoneyProperty.summary,
  },
  "Savings, investments and accounts": {
    userQuestion: "Have savings, ISAs and investments been separated from the house so short-term cash is visible?",
    figuresToCheck: ["Current account balances", "ISA and savings totals", "Investment portfolio values", "Joint vs sole ownership", "Cash needed for moving and legal costs"],
    documentsToGather: ["Bank statements (last 3–6 months)", "ISA and investment statements", "Premium Bond or NS&I records", "Notes on account ownership"],
    discussWith: ["Solicitor or mediator", "Financial planner where investments are material"],
    professionalQuestions: [
      "Are all liquid accounts included in the disclosure list?",
      "Which balances are joint and which are sole?",
      "Would tax, penalties or notice periods change the practical value of any investment?",
    ],
    sourceLabel: FACTOR_SOURCES.formE.label,
    sourceUrl: FACTOR_SOURCES.formE.url,
    sourceSummary: FACTOR_SOURCES.formE.summary,
  },
  "Debts and liabilities": {
    userQuestion: "Are cards, loans and other debts reducing the net pot — and who has been paying them?",
    figuresToCheck: ["Credit card balances", "Personal and car loans", "Overdraft limits used", "Tax or HMRC balances", "Monthly debt repayments"],
    documentsToGather: ["Credit card and loan statements", "Car finance agreements", "Bank statements showing repayments", "HMRC or tax liability evidence if relevant"],
    discussWith: ["Solicitor or mediator", "Debt adviser where arrears or unmanageable debt exist"],
    professionalQuestions: [
      "Are all liabilities current and correctly allocated between parties?",
      "Which debts affect monthly cashflow most after separation?",
      "Would clearing or reallocating any debt change the capital comparison?",
    ],
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
  },
  "Business or self-employed value": {
    userQuestion: "If one of us runs a business, has its value been thought about separately from everyday income?",
    figuresToCheck: ["Estimated business value", "Director salary and dividends", "Company cash reserves", "Tax on extracting value", "Liquidity if value is not readily accessible"],
    documentsToGather: ["Latest accounts and management information", "Tax returns and SA302s", "Shareholder or partnership agreements", "Valuation notes or accountant letters if available"],
    discussWith: ["Solicitor or mediator", "Accountant or business valuer where value is material"],
    professionalQuestions: [
      "Is the business value an estimate or supported by accounts?",
      "How would tax or company structure affect extracting value?",
      "Would a formal valuation help before comparing scenarios?",
    ],
    sourceLabel: FACTOR_SOURCES.formE.label,
    sourceUrl: FACTOR_SOURCES.formE.url,
    sourceSummary: FACTOR_SOURCES.formE.summary,
  },
  "Sale, buyout or deferred sale": {
    userQuestion: "What changes if we sell now, buy one person out, or delay a sale?",
    figuresToCheck: ["Net equity after sale costs", "Buyout lump sum required", "Monthly mortgage after transfer", "Cash left after each route", "Deferred sale trigger dates if modelled"],
    documentsToGather: ["Mortgage statement", "Property valuation", "Broker affordability notes", "Draft consent order clauses if available"],
    discussWith: ["Solicitor or mediator", "Mortgage broker"],
    professionalQuestions: [
      "Which home route is realistic on current income and mortgage assumptions?",
      "What further property evidence is needed before comparing routes?",
      "How does each route change monthly cashflow for both parties?",
    ],
    sourceLabel: FACTOR_SOURCES.govMoneyProperty.label,
    sourceUrl: FACTOR_SOURCES.govMoneyProperty.url,
    sourceSummary: FACTOR_SOURCES.govMoneyProperty.summary,
  },
  "Mortgage affordability": {
    userQuestion: "If I keep the home, can my income actually support the mortgage on my own?",
    figuresToCheck: ["Mortgage balance", "Monthly mortgage payment", "Gross and net income", "Deposit or equity available", "Benchmark lending multiple used in the model"],
    documentsToGather: ["Mortgage statement", "Payslips or income evidence", "Broker or lender illustration if available", "Credit file summary if relevant"],
    discussWith: ["Mortgage broker", "Solicitor or mediator"],
    professionalQuestions: [
      "Would a lender assess affordability differently from the model's benchmark?",
      "Would a remortgage or product transfer be required to retain the home?",
      "What deposit or capital sum would a buyout require in practice?",
    ],
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
  },
  "Rehousing pressure": {
    userQuestion: "Even if capital is shared, is there enough cash and income for both homes afterwards?",
    figuresToCheck: ["Liquid cash after each scenario", "Deposit or rent upfront costs", "Monthly housing costs", "Moving and furnishing costs", "Reserve runway in months"],
    documentsToGather: ["Local rental or purchase estimates", "Moving cost quotes", "Mortgage or tenancy affordability notes", "Estate agent comparables for target areas"],
    discussWith: ["Mortgage broker", "Solicitor or mediator"],
    professionalQuestions: [
      "Does the model leave enough liquid capital for both parties to rehouse?",
      "Which housing costs are estimates and need local confirmation?",
      "Would a different home value or sale-cost assumption change rehousing feasibility?",
    ],
    sourceLabel: FACTOR_SOURCES.govMoneyProperty.label,
    sourceUrl: FACTOR_SOURCES.govMoneyProperty.url,
    sourceSummary: FACTOR_SOURCES.govMoneyProperty.summary,
  },
  "Sale costs": {
    userQuestion: "Have agent fees, conveyancing costs and moving expenses been taken off the home value?",
    figuresToCheck: ["Gross property value", "Estimated agent commission", "Conveyancing and legal fees", "EPC or compliance costs if relevant", "Net equity after all costs"],
    documentsToGather: ["Estate agent fee quote", "Conveyancing estimate", "Mortgage redemption statement", "Moving cost estimate"],
    discussWith: ["Solicitor or mediator", "Estate agent for sale-cost estimates"],
    professionalQuestions: [
      "Are the sale-cost assumptions in line with current local practice?",
      "Would any early repayment charge or leasehold cost change net proceeds?",
      "Is net equity calculated consistently across all scenarios?",
    ],
    sourceLabel: FACTOR_SOURCES.govMoneyProperty.label,
    sourceUrl: FACTOR_SOURCES.govMoneyProperty.url,
    sourceSummary: FACTOR_SOURCES.govMoneyProperty.summary,
  },
  "Cash Equivalent Transfer Values (CETVs)": {
    userQuestion: "Do we have a recent CETV for every pension — and are we comparing like with like?",
    figuresToCheck: ["CETV for each pension", "Date of each CETV", "Pension type (DC vs DB)", "Owner of each pension", "Whether CETVs are stale (often over 3 months old)"],
    documentsToGather: ["Latest pension statements", "CETV letters from each scheme", "Scheme booklets or benefit summaries", "State Pension forecast from GOV.UK"],
    discussWith: ["Pension expert", "Solicitor or mediator"],
    professionalQuestions: [
      "Are all CETVs current enough to compare with property and cash?",
      "Would specialist valuation help before offsetting any defined benefit pension?",
      "Are we comparing DC fund values with DB CETVs without adjustment?",
    ],
    sourceLabel: FACTOR_SOURCES.moneyHelperPensions.label,
    sourceUrl: FACTOR_SOURCES.moneyHelperPensions.url,
    sourceSummary: FACTOR_SOURCES.moneyHelperPensions.summary,
  },
  "Pension gaps": {
    userQuestion: "If one of us has a much smaller pension, does the model make that gap visible?",
    figuresToCheck: ["Total CETV per party", "Pension gap between parties", "State Pension forecast for each party", "Years out of paid work if relevant", "Retirement income assumptions"],
    documentsToGather: ["Pension statements for both parties", "State Pension forecasts", "Employment history notes", "NI credit or childcare credit records if relevant"],
    discussWith: ["Pension expert", "Solicitor or mediator", "Financial planner where appropriate"],
    professionalQuestions: [
      "Does the pension gap reflect career breaks or lower earnings during the marriage?",
      "Would separate pension sharing and offsetting scenarios make the gap clearer?",
      "What evidence helps explain the long-term impact of a smaller pension pot?",
    ],
    sourceLabel: FACTOR_SOURCES.section25.label,
    sourceUrl: FACTOR_SOURCES.section25.url,
    sourceSummary: FACTOR_SOURCES.section25.summary,
  },
  "Offsetting": {
    userQuestion: "If one person keeps the house and the other keeps pensions, are we comparing lifetime value properly?",
    figuresToCheck: ["Property net equity", "Total pension CETV", "Pension type mix (DC vs DB)", "Tax on pension drawdown", "Cash liquidity after offsetting"],
    documentsToGather: ["Pension CETVs", "Property valuation and mortgage statement", "PODE or actuarial note if available", "Tax guidance notes on pension access"],
    discussWith: ["Pension expert", "Solicitor or mediator", "Financial planner where appropriate"],
    professionalQuestions: [
      "Does a face-value CETV-to-equity swap reflect lifetime income differences?",
      "Would modelling pension sharing alongside offsetting reveal a different lifetime picture?",
      "Which party becomes property-heavy or pension-light under the current model?",
    ],
    sourceLabel: FACTOR_SOURCES.moneyHelperPensions.label,
    sourceUrl: FACTOR_SOURCES.moneyHelperPensions.url,
    sourceSummary: FACTOR_SOURCES.moneyHelperPensions.summary,
  },
  "Specialist valuation": {
    userQuestion: "Do any pensions need actuarial input before we treat the CETV as the full picture?",
    figuresToCheck: ["DB vs DC pension mix", "CETV vs estimated retirement income", "Public-sector or NHS scheme sections", "Age gap between parties", "Survivor benefit implications"],
    documentsToGather: ["Full pension scheme details", "Latest CETV", "Scheme administrator contact details", "Brief for a Pensions on Divorce Expert if commissioned"],
    discussWith: ["Pension expert", "Solicitor or mediator"],
    professionalQuestions: [
      "Which pensions would benefit from specialist review before comparing with property?",
      "Would equal CETV produce unequal retirement income because of age or scheme type?",
      "Are survivor benefits or McCloud-style choices affecting the CETV?",
    ],
    sourceLabel: FACTOR_SOURCES.moneyHelperPensions.label,
    sourceUrl: FACTOR_SOURCES.moneyHelperPensions.url,
    sourceSummary: FACTOR_SOURCES.moneyHelperPensions.summary,
  },
  "Income gap": {
    userQuestion: "If one of us earns much more, do the monthly numbers still work after separation?",
    figuresToCheck: ["Gross income each party", "Estimated net income", "Monthly bills and childcare", "Maintenance assumptions entered", "Monthly surplus or deficit per scenario"],
    documentsToGather: ["Payslips and P60s", "Self-assessment returns if self-employed", "Benefit statements", "Bank statements showing regular outgoings"],
    discussWith: ["Solicitor or mediator", "Financial planner where appropriate"],
    professionalQuestions: [
      "Are income figures stable and supported by documents?",
      "Which scenario creates the larger monthly shortfall for the lower earner?",
      "Would testing spousal maintenance separately from child maintenance clarify the monthly picture?",
    ],
    sourceLabel: FACTOR_SOURCES.section25.label,
    sourceUrl: FACTOR_SOURCES.section25.url,
    sourceSummary: FACTOR_SOURCES.section25.summary,
  },
  "Career breaks": {
    userQuestion: "I stepped back from work or raised children — how do I show the financial impact in the numbers?",
    figuresToCheck: ["Current income gap", "Pension gap", "Years out of paid work", "Childcare costs", "Realistic return-to-work income assumptions"],
    documentsToGather: ["Employment history timeline", "Pension statements", "Childcare invoices", "Training or re-skilling cost estimates", "Benefit or NI credit records"],
    discussWith: ["Solicitor or mediator", "Pension expert where pension gap is material"],
    professionalQuestions: [
      "What evidence best explains the financial impact of time out of paid work?",
      "Do pension and income figures show a long-term imbalance worth professional review?",
      "Which future earning assumptions in the model need checking?",
    ],
    sourceLabel: FACTOR_SOURCES.section25.label,
    sourceUrl: FACTOR_SOURCES.section25.url,
    sourceSummary: FACTOR_SOURCES.section25.summary,
  },
  "Living costs": {
    userQuestion: "After the split, will ordinary bills, food, transport and housing still be affordable?",
    figuresToCheck: ["Total monthly expenses entered", "Housing cost per scenario", "Utilities and council tax", "Child-related running costs", "Reserve runway if income falls short"],
    documentsToGather: ["Recent bank statements", "Utility and council tax bills", "Childcare and school cost records", "Budget worksheet for post-separation life"],
    discussWith: ["Solicitor or mediator", "Mortgage broker where housing costs dominate"],
    professionalQuestions: [
      "Which monthly costs are estimates that need replacing with real bills?",
      "Which party faces the tighter monthly margin under each scenario?",
      "Would updated childcare or housing costs change the scenario comparison?",
    ],
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
  },
  "Maintenance assumptions": {
    userQuestion: "If spousal maintenance is included, how much does it change the monthly picture?",
    figuresToCheck: ["Maintenance amount entered", "Term or review date assumed", "Combined with child maintenance total", "Net income after maintenance flows", "Capitalisation lump sum if modelled"],
    documentsToGather: ["Draft maintenance proposals", "Income evidence for both parties", "Budget showing gap maintenance is meant to fill", "CMS estimate if child maintenance also applies"],
    discussWith: ["Solicitor or mediator"],
    professionalQuestions: [
      "Is maintenance in the model an assumption only, not an assessment?",
      "How sensitive is each scenario to a change in maintenance amount or duration?",
      "Would modelling maintenance separately from capital division make the trade-offs clearer?",
    ],
    sourceLabel: FACTOR_SOURCES.section25.label,
    sourceUrl: FACTOR_SOURCES.section25.url,
    sourceSummary: FACTOR_SOURCES.section25.summary,
  },
  "Child maintenance estimate": {
    userQuestion: "What does child support do to the monthly numbers — and is it only an estimate?",
    figuresToCheck: ["Gross weekly income used", "Number of children", "Shared-care nights assumed", "CMS-style weekly estimate", "Net monthly effect after tax and other costs"],
    documentsToGather: ["Income evidence", "Shared-care arrangement notes", "CMS calculation printout if used", "Child-related cost breakdown"],
    discussWith: ["Solicitor or mediator", "Child Maintenance Service where appropriate"],
    professionalQuestions: [
      "Is the maintenance figure in the model clearly marked as indicative only?",
      "Would a different shared-care assumption materially change cashflow?",
      "Which child costs are not yet included in the monthly budget?",
    ],
    sourceLabel: FACTOR_SOURCES.cms.label,
    sourceUrl: FACTOR_SOURCES.cms.url,
    sourceSummary: FACTOR_SOURCES.cms.summary,
  },
  "Child-related costs": {
    userQuestion: "Have childcare, school runs and activity costs been included in the monthly budget?",
    figuresToCheck: ["Childcare fees", "After-school and holiday clubs", "School meals and uniforms", "Travel costs for handovers", "Monthly surplus after child costs"],
    documentsToGather: ["Childcare invoices and contracts", "School fee or activity statements", "Travel cost estimates", "Benefit statements if relevant"],
    discussWith: ["Solicitor or mediator"],
    professionalQuestions: [
      "Which recurring child costs are missing from the monthly model?",
      "Do housing and childcare costs together make a scenario unworkable?",
      "Would any recurring child costs need separate treatment from the capital assumptions?",
    ],
    sourceLabel: FACTOR_SOURCES.cms.label,
    sourceUrl: FACTOR_SOURCES.cms.url,
    sourceSummary: FACTOR_SOURCES.cms.summary,
  },
  "Housing with children": {
    userQuestion: "Does keeping or selling the home still work once children's housing needs are in the picture?",
    figuresToCheck: ["Home value and mortgage", "Bedroom and location needs", "Monthly housing cost per scenario", "Liquid cash for deposits or rent", "Child maintenance and childcare combined pressure"],
    documentsToGather: ["Mortgage statement", "Local rental or purchase comparables near schools", "Childcare location map", "Draft housing proposals if available"],
    discussWith: ["Solicitor or mediator", "Mortgage broker"],
    professionalQuestions: [
      "Does the model show enough housing stability and cashflow for children under each route?",
      "Which housing figures need updating before serious discussions?",
      "How do home and childcare costs interact in the tightest scenario?",
    ],
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
  },
  "Property valuation": {
    userQuestion: "Is the home value a rough guess that could move every scenario?",
    figuresToCheck: ["Entered property value", "Date of estimate", "Mortgage balance", "Net equity sensitivity to ±5–10% value change", "Share of total asset pool from the home"],
    documentsToGather: ["Estate agent market appraisal", "Recent comparable sales", "RICS survey if available", "Online valuation cross-check"],
    discussWith: ["Solicitor or mediator", "Estate agent or surveyor for updated valuation"],
    professionalQuestions: [
      "How much would a changed property value move net equity and buyout figures?",
      "Would a formal valuation be useful before relying on the model?",
      "Is the valuation consistent with the mortgage lender's view?",
    ],
    sourceLabel: FACTOR_SOURCES.formE.label,
    sourceUrl: FACTOR_SOURCES.formE.url,
    sourceSummary: FACTOR_SOURCES.formE.summary,
  },
  "Pension statements": {
    userQuestion: "Are pension figures based on current statements — or old estimates?",
    figuresToCheck: ["CETV date on each statement", "Pension owner", "Scheme name and type", "Total pension value in the model", "Gap between parties' pension totals"],
    documentsToGather: ["Latest annual pension statement", "Fresh CETV request from scheme administrator", "State Pension forecast", "Notes on missing or frozen pensions"],
    discussWith: ["Pension expert", "Solicitor or mediator"],
    professionalQuestions: [
      "Which pension figures are stale and should be refreshed?",
      "Are any pensions missing from the asset list entirely?",
      "Would updated CETVs change the apparent balance of the split?",
    ],
    sourceLabel: FACTOR_SOURCES.moneyHelperPensions.label,
    sourceUrl: FACTOR_SOURCES.moneyHelperPensions.url,
    sourceSummary: FACTOR_SOURCES.moneyHelperPensions.summary,
  },
  "Expense estimates": {
    userQuestion: "Are monthly costs realistic for life after separation — or still rough guesses?",
    figuresToCheck: ["Total monthly expenses", "Housing cost per scenario", "Single vs shared household cost difference", "Reserve months if income is tight", "Biggest cost categories"],
    documentsToGather: ["Bank statements (3–6 months)", "Utility and council tax bills", "Childcare invoices", "New budget for two households"],
    discussWith: ["Solicitor or mediator", "Financial planner where appropriate"],
    professionalQuestions: [
      "Which expense lines are placeholders that need real bills?",
      "Does either scenario fail once realistic post-separation costs are entered?",
      "Which single cost assumption moves the result most if corrected?",
    ],
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
  },
  "Debt balances": {
    userQuestion: "Could an outdated loan or card balance be hiding the true net position?",
    figuresToCheck: ["Credit card balances", "Loan settlement figures", "Overdraft usage", "Monthly debt repayments", "Net assets after all liabilities"],
    documentsToGather: ["Latest credit card and loan statements", "Bank statements", "Settlement quotes for early repayment", "Credit file summary if helpful"],
    discussWith: ["Solicitor or mediator", "Debt adviser if arrears exist"],
    professionalQuestions: [
      "Are debt balances current as of today, not an old wizard estimate?",
      "Would clearing or refinancing any debts change the capital comparison?",
      "Does either scenario leave insufficient cash after debt is accounted for?",
    ],
    sourceLabel: FACTOR_SOURCES.formE.label,
    sourceUrl: FACTOR_SOURCES.formE.url,
    sourceSummary: FACTOR_SOURCES.formE.summary,
  },
};

function enrichFactor(factor: SettlementFactor): SettlementFactor {
  return { ...factor, ...(FACTOR_ENRICHMENT[factor.title] ?? {}) };
}

const GROUP_GUIDE_DEFAULTS: Record<string, Partial<SettlementFactor>> = {
  "asset-pool": {
    sourceLabel: FACTOR_SOURCES.govMoneyProperty.label,
    sourceUrl: FACTOR_SOURCES.govMoneyProperty.url,
    sourceSummary: FACTOR_SOURCES.govMoneyProperty.summary,
    discussWith: ["Solicitor or mediator", "Financial planner where appropriate"],
    figuresToCheck: ["Current value", "Owner", "Debt attached to it", "Whether the figure is estimated or evidenced"],
    documentsToGather: ["Statements or valuations", "Account balances", "Debt balances", "Notes on ownership"],
    professionalQuestions: [
      "Is this figure evidenced enough to rely on?",
      "Would tax, fees, debt or liquidity change the practical value?",
      "Is anything missing from the asset list?",
    ],
  },
  "home-housing": {
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
    discussWith: ["Solicitor or mediator", "Mortgage broker"],
    figuresToCheck: ["Home value", "Mortgage balance", "Sale costs", "Deposit or buyout need", "Monthly housing cost"],
    documentsToGather: ["Mortgage statement", "Valuation estimate", "Sale cost estimate", "Broker or lender notes"],
    professionalQuestions: [
      "Which home route is realistic under the current income and mortgage assumptions?",
      "Which property figures need updating before a serious conversation?",
      "How does the home route affect each person's monthly cashflow?",
    ],
  },
  pensions: {
    sourceLabel: FACTOR_SOURCES.moneyHelperPensions.label,
    sourceUrl: FACTOR_SOURCES.moneyHelperPensions.url,
    sourceSummary: FACTOR_SOURCES.moneyHelperPensions.summary,
    discussWith: ["Pension expert", "Solicitor or mediator", "Financial planner where appropriate"],
    figuresToCheck: ["CETV", "Pension type", "Owner", "Date of valuation", "Whether specialist valuation may be needed"],
    documentsToGather: ["Latest pension statement", "CETV", "Scheme details", "State Pension forecast where relevant"],
    professionalQuestions: [
      "Are the pension values current and comparable?",
      "Is specialist pension input needed before comparing with property or cash?",
      "Does the model hide a pension gap behind a property split?",
    ],
  },
  "income-career": {
    sourceLabel: FACTOR_SOURCES.section25.label,
    sourceUrl: FACTOR_SOURCES.section25.url,
    sourceSummary: FACTOR_SOURCES.section25.summary,
    discussWith: ["Solicitor or mediator", "Financial planner where appropriate"],
    figuresToCheck: ["Gross income", "Estimated net income", "Monthly bills", "Childcare costs", "Pension gap"],
    documentsToGather: ["Payslips", "P60s", "Self-assessment returns", "Bank statements", "Budget notes"],
    professionalQuestions: [
      "Are the income and expense figures evidenced?",
      "What assumption has the biggest effect on monthly pressure?",
      "Which career or income facts need explaining with documents?",
    ],
  },
  "children-support": {
    sourceLabel: FACTOR_SOURCES.cms.label,
    sourceUrl: FACTOR_SOURCES.cms.url,
    sourceSummary: FACTOR_SOURCES.cms.summary,
    discussWith: ["Solicitor or mediator", "Child Maintenance Service where appropriate"],
    figuresToCheck: ["Number of children", "Shared-care assumption", "Gross income", "Child-related costs", "Child maintenance assumption"],
    documentsToGather: ["Income evidence", "Childcare invoices", "School or activity cost notes", "CMS estimate if used"],
    professionalQuestions: [
      "Which child-related costs are included and which are missing?",
      "Is the maintenance figure only an estimate for modelling?",
      "Does housing or childcare pressure alter the monthly comparison?",
    ],
  },
  "input-quality": {
    sourceLabel: FACTOR_SOURCES.govCourtDecision.label,
    sourceUrl: FACTOR_SOURCES.govCourtDecision.url,
    sourceSummary: FACTOR_SOURCES.govCourtDecision.summary,
    discussWith: ["Solicitor or mediator", "Relevant financial professional for the missing figure"],
    figuresToCheck: ["Value", "Date last updated", "Evidence source", "Sensitivity of the model to that estimate"],
    documentsToGather: ["Latest statements", "Valuations", "Bills", "Pension or mortgage documents"],
    professionalQuestions: [
      "Which estimate would most change the result if corrected?",
      "What document should replace this estimate?",
      "Is this a high-impact missing value before relying on the report?",
    ],
  },
};

function enrichGroupFactor(groupId: string, factor: SettlementFactor): SettlementFactor {
  return {
    ...GROUP_GUIDE_DEFAULTS[groupId],
    ...factor,
    ...(FACTOR_ENRICHMENT[factor.title] ?? {}),
  };
}

export function getRelevantSettlementFactors(
  store: StoreState,
  engine: EngineResult
): SettlementFactor[] {
  const hasProperty = store.assets.some((asset) => asset.category === "primary_home" && asset.currentValue > 0);
  const hasChildren = store.children.numChildren > 0;
  const pensionValue = pensionTotal(store);
  const debts = nonMortgageDebt(store);
  const incomeA = engine.taxA.gross;
  const incomeB = engine.taxB.gross;
  const incomeGap = Math.abs(incomeA - incomeB);
  const lowerIncome = Math.min(incomeA || 0, incomeB || 0);
  const intent = store.profile.calculationIntent;

  const factors: SettlementFactor[] = [
    {
      title: "Needs and available resources",
      fact: "England and Wales uses a discretionary fairness framework, not a fixed percentage table.",
      whyItMatters: `The report compares the modelled asset pool, income and monthly pressure so you can see what each scenario may practically leave both parties with.`,
    },
  ];

  if (hasProperty) {
    factors.push({
      title: hasChildren ? "Housing needs and the family home" : "Family home and rehousing pressure",
      fact: hasChildren
        ? "Children's housing needs can be a relevant factor when the financial picture is assessed."
        : "The family home is often the largest asset and may affect liquidity, mortgage pressure and rehousing options.",
      whyItMatters: `Your model includes ${formatCurrency(engine.intermediate.netHomeEquity)} estimated net home equity after sale costs, then compares sale, keep-home and deferred-sale style scenarios.`,
    });
  }

  if (pensionValue > 0) {
    factors.push({
      title: "Pensions can be taken into account",
      fact: "Pensions built during the marriage are commonly considered part of the overall financial picture.",
      whyItMatters: `You have ${formatCurrency(pensionValue)} of pension Cash Equivalent Transfer Value (CETV) entered. The report shows pension value separately so it is not hidden behind the house split.`,
    });
  }

  if (incomeA > 0 || incomeB > 0) {
    const materialGap = incomeGap >= 15000 || (lowerIncome > 0 && incomeGap / Math.max(1, lowerIncome) >= 0.5);
    factors.push({
      title: materialGap ? "Earning capacity and income imbalance" : "Income and monthly affordability",
      fact: materialGap
        ? "Current income and realistic earning capacity may be relevant, especially where one person stepped back from work or earns materially less."
        : "Income and outgoings affect whether a proposed split is workable month to month.",
      whyItMatters: `The model uses entered gross incomes of ${formatCurrency(incomeA)} and ${formatCurrency(incomeB)} to test cashflow and resilience under each scenario.`,
    });
  }

  if (intent === "income_gap" || intent === "fair_split" || intent === "first_private_view") {
    factors.push({
      title: "Career breaks and homemaking contributions",
      fact: "Homemaking and child-rearing are recognised contributions; a career break may also affect earning capacity and pensions.",
      whyItMatters: "The report highlights pension gaps, income gaps and monthly pressure points to help you prepare informed questions for a solicitor or mediator.",
    });
  }

  if (hasChildren) {
    factors.push({
      title: "Child maintenance and household cashflow",
      fact: "Child maintenance is usually assessed separately from the asset split, but it can affect monthly cashflow.",
      whyItMatters: engine.cmsWeekly > 0
        ? `Your model includes an indicative Child Maintenance Service style estimate of ${formatCurrency(engine.cmsWeekly)} per week for cashflow modelling only.`
        : "The report can flag where child-related costs or missing maintenance assumptions may change monthly pressure.",
    });
  }

  if (debts > 0) {
    factors.push({
      title: "Debts and liquidity",
      fact: "Liabilities and access to cash can change the practical effect of a headline percentage split.",
      whyItMatters: `You have ${formatCurrency(debts)} of non-mortgage debt entered. The report checks whether debt, low reserves or buyout pressure may leave either side exposed.`,
    });
  }

  return factors.slice(0, 6).map(enrichFactor);
}

export const REPORT_FACTOR_TEASERS = [
  "I paid the majority of the mortgage. Where does that show in the split?",
  "I paused my career to look after the children — will that show fairly in the split?",
  "I gave up work or put my career on hold. What financial evidence should I have ready?",
  "I carried the mortgage, bills or debts. Where does that show in the numbers?",
  "Everyone is focused on the house. What about pensions and long-term security?",
  "Is 50/50 still workable once childcare, housing and monthly bills are included?",
];

export const SETTLEMENT_FACTOR_GROUPS: SettlementFactorGroup[] = [
  {
    id: "asset-pool",
    title: "What is actually in the pot?",
    intro: "For users asking whether the house, savings, business value, cards or loans have all been counted before comparing any split.",
    items: [
      {
        title: "Property equity",
        fact: "The family home is often the largest asset and can dominate the practical outcome.",
        whyItMatters: "A split can look balanced as a percentage but feel very different once sale costs, mortgage balance and buyout pressure are included.",
      },
      {
        title: "Savings, investments and accounts",
        fact: "Cash, savings, ISAs, investments and other liquid assets shape short-term resilience.",
        whyItMatters: "Liquid assets matter because they pay deposits, legal costs, moving costs and early post-separation bills.",
      },
      {
        title: "Debts and liabilities",
        fact: "Credit cards, loans, car finance, tax debts and overdrafts can reduce the practical value of an asset split.",
        whyItMatters: "The report separates gross assets from debts so users can see the net position rather than a headline asset figure.",
      },
      {
        title: "Business or self-employed value",
        fact: "Business interests can be financially significant but may not behave like cash.",
        whyItMatters: "A business value may affect the overall model, but liquidity, tax and valuation uncertainty need separate checking.",
      },
    ],
  },
  {
    id: "home-housing",
    title: "Can I keep or rehouse from here?",
    intro: "For users worried about the home, mortgage, buyout, sale timing and whether the numbers still work after moving costs.",
    items: [
      {
        title: "Sale, buyout or deferred sale",
        fact: "Different home routes create different cash, mortgage and timing outcomes.",
        whyItMatters: "The model compares sale, keep-home and deferred-sale style scenarios so users can see the trade-offs clearly.",
      },
      {
        title: "Mortgage affordability",
        fact: "A keep-home scenario depends on income, deposit/equity, mortgage size and monthly payment pressure.",
        whyItMatters: "The report uses benchmark lending checks for modelling only; a broker or lender would need to assess the real position.",
      },
      {
        title: "Rehousing pressure",
        fact: "Even if capital is shared equally, both parties still need somewhere to live after separation.",
        whyItMatters: "The report shows whether the model leaves enough liquid capital and monthly surplus to make each scenario workable.",
      },
      {
        title: "Sale costs",
        fact: "Estate agent, legal and moving costs can reduce the net equity available.",
        whyItMatters: "The model subtracts estimated sale costs so the user sees the net home equity rather than just the valuation.",
      },
    ],
  },
  {
    id: "pensions",
    title: "Are pensions being missed behind the house?",
    intro: "For users worried that long-term pension value is being ignored because the conversation is focused on property.",
    items: [
      {
        title: "Cash Equivalent Transfer Values (CETVs)",
        fact: "A CETV is the figure commonly used to compare pension value in financial disclosure.",
        whyItMatters: "The report keeps pension value separate from liquid cash so it is easier to spot pension-heavy or property-heavy outcomes.",
      },
      {
        title: "Pension gaps",
        fact: "A lower earner or someone who took a career break may have a smaller pension pot.",
        whyItMatters: "The model highlights pension gaps numerically so they are not lost in the headline asset percentage.",
      },
      {
        title: "Offsetting",
        fact: "Pension value and immediately usable assets are not the same kind of money.",
        whyItMatters: "The report helps users see when a property-heavy outcome may leave a weaker pension position, or vice versa.",
      },
      {
        title: "Specialist valuation",
        fact: "Some defined benefit or public sector pensions can need specialist review.",
        whyItMatters: "The report can flag that pension figures should be checked, without giving pension advice.",
      },
    ],
  },
  {
    id: "income-career",
    title: "What if I earned less, paused work or paid more bills?",
    intro: "For users thinking about career sacrifice, income gaps, mortgage and bill pressure, and whether a split survives monthly reality.",
    items: [
      {
        title: "Income gap",
        fact: "Different income levels can create very different post-separation monthly positions.",
        whyItMatters: "The model compares gross income, estimated net income and monthly surplus or deficit under each scenario.",
      },
      {
        title: "Career breaks",
        fact: "Time out of paid work can affect current income, pension value and financial resilience.",
        whyItMatters: "The report does not assess legal conclusions; it shows the financial symptoms: income gap, pension gap and monthly pressure.",
      },
      {
        title: "Living costs",
        fact: "Housing, utilities, childcare, transport and food costs often decide whether a split is workable.",
        whyItMatters: "The report compares post-separation costs against income and starting capital to show where pressure appears.",
      },
      {
        title: "Maintenance assumptions",
        fact: "Maintenance entered by the user changes the monthly cashflow model.",
        whyItMatters: "The report treats maintenance as an assumption, not an assessment, so users can see how it changes the numbers.",
      },
    ],
  },
  {
    id: "children-support",
    title: "How do children change the cashflow picture?",
    intro: "For users trying to see childcare, child maintenance assumptions and housing pressure without turning the report into child-arrangements advice.",
    items: [
      {
        title: "Child maintenance estimate",
        fact: "A Child Maintenance Service style estimate can be used for cashflow modelling.",
        whyItMatters: "The report keeps this indicative and separate from any formal CMS calculation.",
      },
      {
        title: "Child-related costs",
        fact: "Childcare, school, travel and activity costs can materially change monthly pressure.",
        whyItMatters: "These costs affect whether a scenario remains workable after ordinary household bills are included.",
      },
      {
        title: "Housing with children",
        fact: "Children can make housing pressure more important in practical financial modelling.",
        whyItMatters: "The report shows cashflow and housing pressure without advising on child arrangements or outcomes.",
      },
    ],
  },
  {
    id: "input-quality",
    title: "Which estimates could move the result?",
    intro: "For users who need to know which rough values, missing documents or stale figures should be checked before serious conversations.",
    items: [
      {
        title: "Property valuation",
        fact: "A rough estimate is enough to start, but a stale valuation can move every scenario.",
        whyItMatters: "The report identifies property value as a high-impact input when the home dominates the asset pool.",
      },
      {
        title: "Pension statements",
        fact: "Pension values should be based on current statements or CETV figures where available.",
        whyItMatters: "Missing or outdated pension figures can make the apparent split misleading.",
      },
      {
        title: "Expense estimates",
        fact: "Starting estimates should be replaced with real post-separation bills when possible.",
        whyItMatters: "Cashflow results are only as reliable as the monthly costs entered.",
      },
      {
        title: "Debt balances",
        fact: "Debt balances can change quickly and affect both net assets and monthly outgoings.",
        whyItMatters: "The report flags debt pressure so users can check statements before relying on the numbers.",
      },
    ],
  },
];

export function getSettlementFactorGroups() {
  return SETTLEMENT_FACTOR_GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) => enrichGroupFactor(group.id, item)),
  }));
}

/** Dev/QA helper: confirms every library factor has question-led enrichment. */
export function getFactorLibraryCoverage() {
  const dynamicTitles = [
    "Needs and available resources",
    "Housing needs and the family home",
    "Family home and rehousing pressure",
    "Pensions can be taken into account",
    "Earning capacity and income imbalance",
    "Income and monthly affordability",
    "Career breaks and homemaking contributions",
    "Child maintenance and household cashflow",
    "Debts and liquidity",
  ];
  const libraryTitles = SETTLEMENT_FACTOR_GROUPS.flatMap((group) => group.items.map((item) => item.title));
  const allTitles = Array.from(new Set([...dynamicTitles, ...libraryTitles]));
  const enriched = allTitles.filter((title) => Boolean(FACTOR_ENRICHMENT[title]?.userQuestion));
  return {
    total: allTitles.length,
    enriched: enriched.length,
    complete: enriched.length === allTitles.length,
    missing: allTitles.filter((title) => !FACTOR_ENRICHMENT[title]?.userQuestion),
  };
}

/** Dev/QA helper: confirms enriched guide cards have source links and prep fields. */
export function getFactorGuideQualityReport() {
  const issues: { title: string; missing: string[] }[] = [];

  const checkFactor = (factor: SettlementFactor) => {
    const missing: string[] = [];
    if (!factor.userQuestion?.trim()) missing.push("userQuestion");
    if (!factor.sourceUrl?.trim()) missing.push("sourceUrl");
    if (!factor.sourceLabel?.trim()) missing.push("sourceLabel");
    if (!factor.sourceSummary?.trim()) missing.push("sourceSummary");
    if (!factor.professionalQuestions?.length) missing.push("professionalQuestions");
    if (!factor.figuresToCheck?.length && !factor.documentsToGather?.length) {
      missing.push("figuresToCheck/documentsToGather");
    }
    if (missing.length > 0) issues.push({ title: factor.title, missing });
  };

  for (const group of getSettlementFactorGroups()) {
    for (const item of group.items) checkFactor(item);
  }

  const coverage = getFactorLibraryCoverage();
  for (const title of coverage.missing) {
    issues.push({ title, missing: ["userQuestion (enrichment entry)"] });
  }

  for (const title of Object.keys(FACTOR_ENRICHMENT)) {
    if (!FACTOR_ENRICHMENT[title]?.sourceUrl?.trim()) {
      issues.push({ title, missing: ["sourceUrl (enrichment entry)"] });
    }
  }

  const factorCount = new Set([
    ...Object.keys(FACTOR_ENRICHMENT),
    ...SETTLEMENT_FACTOR_GROUPS.flatMap((group) => group.items.map((item) => item.title)),
  ]).size;

  return {
    ok: issues.length === 0,
    factorCount,
    issues,
  };
}
