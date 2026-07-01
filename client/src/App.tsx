import { Switch, Route, Redirect } from "wouter";
import { useState, useEffect, lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFoundPage from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import { AccessGate } from "@/components/access-gate";


const WizardPage = lazy(() => import("@/pages/wizard"));
const ResultsPage = lazy(() => import("@/pages/results"));
const ReportPage = lazy(() => import("@/pages/report"));
const PreviewPage = lazy(() => import("@/pages/preview"));
const UnlockPage = lazy(() => import("@/pages/unlock"));
const PricingPage = lazy(() => import("@/pages/pricing"));
const PaymentSuccessPage = lazy(() => import("@/pages/payment-success"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const MethodologyPage = lazy(() => import("@/pages/methodology"));
const RecoverPage = lazy(() => import("@/pages/recover"));
const AdminPage = lazy(() => import("@/pages/admin"));
const PillarPage = lazy(() => import("@/pages/content/pillar-divorce-financial-modelling"));
const Cluster5050Split = lazy(() => import("@/pages/content/cluster-5050-split"));
const ClusterHouseBuyout = lazy(() => import("@/pages/content/cluster-house-buyout"));
const ClusterPensionSplit = lazy(() => import("@/pages/content/cluster-pension-split"));
const ClusterMortgageAffordability = lazy(() => import("@/pages/content/cluster-mortgage-affordability"));
const ClusterMediationChecklist = lazy(() => import("@/pages/content/cluster-mediation-checklist"));
const FreeDivorceCalculatorPage = lazy(() => import("@/pages/content/free-divorce-calculator-uk"));
const DivorceCalculatorUkPage = lazy(() => import("@/pages/content/divorce-calculator-uk"));
const DivorceSettlementCalculatorPage = lazy(() => import("@/pages/content/divorce-settlement-calculator-uk"));
const FairDivorceSettlementCalculatorPage = lazy(() => import("@/pages/content/fair-divorce-settlement-calculator"));
const DivorceAssetSplitCalculatorPage = lazy(() => import("@/pages/content/divorce-asset-split-calculator"));
const EquitySplitDivorceCalculatorPage = lazy(() => import("@/pages/content/equity-split-divorce-calculator"));
const DivorcePensionCalculatorPage = lazy(() => import("@/pages/content/divorce-pension-calculator"));
const PensionSharingCalculatorPage = lazy(() => import("@/pages/content/pension-sharing-calculator-divorce"));
const PensionOffsettingCalculatorPage = lazy(() => import("@/pages/content/pension-offsetting-calculator-divorce"));
const SpousalMaintenanceCalculatorPage = lazy(() => import("@/pages/content/spousal-maintenance-calculator-uk"));
const DivorceMaintenanceCalculatorPage = lazy(() => import("@/pages/content/divorce-maintenance-calculator"));
const HouseDivorceCalculatorPage = lazy(() => import("@/pages/content/house-divorce-calculator"));
const CanIKeepHouseCalculatorPage = lazy(() => import("@/pages/content/can-i-keep-the-house-after-divorce-calculator"));
const MortgageDivorceCalculatorPage = lazy(() => import("@/pages/content/mortgage-divorce-calculator"));
const DivorceCashflowCalculatorPage = lazy(() => import("@/pages/content/divorce-cashflow-calculator"));
const Faq5050Automatic = lazy(() => import("@/pages/content/faq-5050-automatic"));
const FaqKeepHouse = lazy(() => import("@/pages/content/faq-keep-house"));
const FaqPensionsDivided = lazy(() => import("@/pages/content/faq-pensions-divided"));
const FreeGuidePage = lazy(() => import("@/pages/free-guide"));
const SeoDivorceCostsPage = lazy(() => import("@/pages/content/seo-divorce-costs"));
const SeoAssetDivisionPage = lazy(() => import("@/pages/content/seo-asset-division"));
const SeoWhoGetsHousePage = lazy(() => import("@/pages/content/seo-who-gets-house"));
const SeoPensionsPage = lazy(() => import("@/pages/content/seo-pensions"));
const SeoSettlementExamplesPage = lazy(() => import("@/pages/content/seo-settlement-examples"));
const DivorceFinancialGuidesPage = lazy(() => import("@/pages/content/divorce-financial-guides"));
const ContactPage = lazy(() => import("@/pages/contact"));
const RefundPolicyPage = lazy(() => import("@/pages/refund-policy"));
const AccessPage = lazy(() => import("@/pages/access"));
const HowPropertyDividedPage = lazy(() => import("@/pages/content/how-is-property-divided-in-divorce-uk"));
const WhatHappensToDebtsPage = lazy(() => import("@/pages/content/what-happens-to-debts-in-divorce-uk"));
const ConsentOrderPage = lazy(() => import("@/pages/content/what-is-a-consent-order-uk-divorce"));
const CleanBreakOrderPage = lazy(() => import("@/pages/content/what-is-a-clean-break-order-uk"));
const FinancialDisclosurePage = lazy(() => import("@/pages/content/financial-disclosure-divorce-uk"));
const FinancialRemedyPage = lazy(() => import("@/pages/content/financial-remedy-proceedings-uk"));
const SavingsSplitPage = lazy(() => import("@/pages/content/how-are-savings-split-in-divorce-uk"));
const InvestmentsDividedPage = lazy(() => import("@/pages/content/how-are-investments-divided-in-divorce-uk"));
const JointBankAccountsPage = lazy(() => import("@/pages/content/joint-bank-accounts-after-divorce-uk"));
const InheritanceClaimPage = lazy(() => import("@/pages/content/can-ex-claim-inheritance-uk-divorce"));
const InheritanceSettlementPage = lazy(() => import("@/pages/content/is-inheritance-included-in-divorce-settlement-uk"));
const BothNamesOnMortgagePage = lazy(() => import("@/pages/content/both-names-on-mortgage-divorce-uk"));
const ForceSaleHousePage = lazy(() => import("@/pages/content/can-i-force-sale-of-house-after-divorce-uk"));
const MortgageDuringDivorcePage = lazy(() => import("@/pages/content/who-pays-mortgage-during-divorce-uk"));
const BuyingPartnerOutPage = lazy(() => import("@/pages/content/buying-partner-out-of-house-divorce-uk"));
const UnmarriedSeparatingHousePage = lazy(() => import("@/pages/content/unmarried-separating-house-uk"));
const DivorceNoAssetsPage = lazy(() => import("@/pages/content/divorce-settlement-no-assets-uk"));
const DivorceWithChildrenPage = lazy(() => import("@/pages/content/divorce-with-children-financial-settlement-uk"));
const DivorceIncomeInequalityPage = lazy(() => import("@/pages/content/divorce-where-one-earns-more-uk"));
const CustodyFinancialSettlementPage = lazy(() => import("@/pages/content/how-does-child-custody-affect-financial-settlement-uk"));
const ChildVsSpousalMaintenancePage = lazy(() => import("@/pages/content/child-maintenance-vs-spousal-maintenance-uk"));
const WhoPaysAfterDivorcePage = lazy(() => import("@/pages/content/who-pays-what-after-divorce-with-children-uk"));
const ChildrenChangeSettlementPage = lazy(() => import("@/pages/content/does-having-children-change-divorce-settlement-uk"));
const HideAssetsPage = lazy(() => import("@/pages/content/can-i-hide-assets-in-divorce-uk"));
const SpouseRefusesDisclosurePage = lazy(() => import("@/pages/content/spouse-refuses-financial-disclosure-uk"));
const DivorceWithoutFinancialSettlementPage = lazy(() => import("@/pages/content/can-i-divorce-without-financial-settlement-uk"));
const ExDoesntAgreeSettlementPage = lazy(() => import("@/pages/content/ex-doesnt-agree-settlement-uk"));
const ReopenDivorceSettlementPage = lazy(() => import("@/pages/content/can-i-reopen-divorce-settlement-uk"));
const FinancialClaimsAfterDivorcePage = lazy(() => import("@/pages/content/how-long-after-divorce-can-financial-claims-be-made-uk"));
const LegallyBindingSettlementPage = lazy(() => import("@/pages/content/when-is-divorce-financial-settlement-legally-binding-uk"));
const StepsAfterFinalOrderPage = lazy(() => import("@/pages/content/steps-after-final-order-finances-uk"));
const MediationVsCourtPage = lazy(() => import("@/pages/content/mediation-vs-court-divorce-uk-costs"));
const ConsentVsCleanBreakPage = lazy(() => import("@/pages/content/consent-order-vs-clean-break-order-uk"));
const SolicitorVsMediationPage = lazy(() => import("@/pages/content/divorce-solicitor-vs-mediation-uk"));
const SettlingOutOfCourtPage = lazy(() => import("@/pages/content/settling-out-of-court-vs-court-divorce-uk"));
const MaintenanceAmountPage = lazy(() => import("@/pages/content/how-much-maintenance-after-divorce-uk"));
const RefuseSettlementPage = lazy(() => import("@/pages/content/can-i-refuse-divorce-financial-settlement-uk"));
const HowLongFinancialSettlementPage = lazy(() => import("@/pages/content/how-long-does-divorce-financial-settlement-take-uk"));
const MediationProcessPage = lazy(() => import("@/pages/content/divorce-mediation-process-uk"));
const DivorceTimelinePage = lazy(() => import("@/pages/content/timeline-of-divorce-and-financial-settlement-uk"));
const PensionOffsettingPage = lazy(() => import("@/pages/content/divorce-pension-offsetting-uk"));
const SpousalMaintenancePage = lazy(() => import("@/pages/content/spousal-maintenance-after-divorce-uk"));
const TransferOfEquityPage = lazy(() => import("@/pages/content/transfer-of-equity-divorce-uk"));
const WhatAmIEntitledToPage = lazy(() => import("@/pages/content/what-am-i-entitled-to-in-divorce-uk"));
const HowMuchWillIGetDivorcePage = lazy(() => import("@/pages/content/how-much-will-i-get-divorce-uk"));
const CareerSacrificeDivorcePage = lazy(() => import("@/pages/content/career-sacrifice-divorce-settlement-uk"));
const WomanGaveUpCareerDivorcePage = lazy(() => import("@/pages/content/woman-gave-up-career-divorce-uk"));
const FormEDisclosurePage = lazy(() => import("@/pages/content/form-e-financial-disclosure-uk"));
const Section25FactorsPage = lazy(() => import("@/pages/content/section-25-factors-divorce-uk"));
const StayAtHomeParentPage = lazy(() => import("@/pages/content/stay-at-home-parent-divorce-settlement-uk"));
const CapitalGainsTaxDivorcePage = lazy(() => import("@/pages/content/capital-gains-tax-on-divorce-uk"));
const ShortMarriageSettlementPage = lazy(() => import("@/pages/content/short-marriage-divorce-settlement-uk"));
const LongMarriageSettlementPage = lazy(() => import("@/pages/content/long-marriage-divorce-settlement-uk"));
const MatrimonialVsNonMatrimonialPage = lazy(() => import("@/pages/content/matrimonial-vs-non-matrimonial-assets-uk"));
const SelfEmployedDivorcePage = lazy(() => import("@/pages/content/self-employed-divorce-uk"));
const MesherVsMartinOrderPage = lazy(() => import("@/pages/content/mesher-vs-martin-order-uk"));
const LumpSumOrderPage = lazy(() => import("@/pages/content/lump-sum-order-divorce-uk"));
const PensionSharingVsOffsettingPage = lazy(() => import("@/pages/content/pension-sharing-vs-offsetting-uk"));
const PreMaritalAssetsPage = lazy(() => import("@/pages/content/pre-marital-assets-divorce-uk"));
const CryptocurrencyDivorcePage = lazy(() => import("@/pages/content/cryptocurrency-divorce-uk"));
const BonusesRsusDivorcePage = lazy(() => import("@/pages/content/bonuses-rsus-divorce-uk"));
const PrenuptialAgreementPage = lazy(() => import("@/pages/content/prenuptial-agreement-uk"));
const PostnuptialAgreementPage = lazy(() => import("@/pages/content/postnuptial-agreement-uk"));
const SeparationAgreementPage = lazy(() => import("@/pages/content/separation-agreement-uk"));
const ArbitrationDivorcePage = lazy(() => import("@/pages/content/arbitration-divorce-uk"));
const CollaborativeLawDivorcePage = lazy(() => import("@/pages/content/collaborative-law-divorce-uk"));
const DivorceAndTheFamilyBusinessPage = lazy(() => import("@/pages/content/divorce-and-the-family-business-uk"));
const TrustAssetsDivorcePage = lazy(() => import("@/pages/content/trust-assets-divorce-uk"));
const OffshoreAssetsDivorcePage = lazy(() => import("@/pages/content/offshore-assets-divorce-uk"));
const MaintenancePendingSuitPage = lazy(() => import("@/pages/content/maintenance-pending-suit-uk"));
const DivorceAndLifeInsurancePage = lazy(() => import("@/pages/content/divorce-and-life-insurance-uk"));
const ChildArrangementsOrderPage = lazy(() => import("@/pages/content/child-arrangements-order-uk"));
const NoFaultDivorcePage = lazy(() => import("@/pages/content/no-fault-divorce-uk"));
const DecreeAbsoluteVsFinalOrderPage = lazy(() => import("@/pages/content/decree-absolute-vs-final-order-uk"));
const HowLongDivorceTakePage = lazy(() => import("@/pages/content/how-long-does-a-divorce-take-uk"));
const AnnulmentVsDivorcePage = lazy(() => import("@/pages/content/annulment-vs-divorce-uk"));
const CommonLawMarriageMythPage = lazy(() => import("@/pages/content/common-law-marriage-uk-myth"));
const SilverDivorcePage = lazy(() => import("@/pages/content/silver-divorce-uk"));
const HighNetWorthDivorcePage = lazy(() => import("@/pages/content/high-net-worth-divorce-uk"));
const CetvExplainedPage = lazy(() => import("@/pages/content/cetv-explained-divorce-uk"));
const NhsPensionPage = lazy(() => import("@/pages/content/nhs-pension-on-divorce-uk"));
const PolicePensionPage = lazy(() => import("@/pages/content/police-pension-on-divorce-uk"));
const MilitaryPensionPage = lazy(() => import("@/pages/content/military-pension-on-divorce-uk"));
const TeachersPensionPage = lazy(() => import("@/pages/content/teachers-pension-on-divorce-uk"));
const StatePensionDivorcePage = lazy(() => import("@/pages/content/state-pension-and-divorce-uk"));
const FinalSalaryPensionPage = lazy(() => import("@/pages/content/final-salary-pension-on-divorce-uk"));
const PensionAttachmentVsSharingPage = lazy(() => import("@/pages/content/pension-attachment-order-vs-sharing-order-uk"));
const BuyToLetPropertyPage = lazy(() => import("@/pages/content/buy-to-let-property-on-divorce-uk"));
const LimitedCompanySharesPage = lazy(() => import("@/pages/content/limited-company-shares-on-divorce-uk"));
const ShareOptionsEmiPage = lazy(() => import("@/pages/content/share-options-and-emi-on-divorce-uk"));
const IsaLifetimeIsaPage = lazy(() => import("@/pages/content/isa-and-lifetime-isa-on-divorce-uk"));
const StampDutyTransferEquityPage = lazy(() => import("@/pages/content/stamp-duty-on-transfer-of-equity-divorce-uk"));
const JointTenantsVsTenantsInCommonPage = lazy(() => import("@/pages/content/joint-tenants-vs-tenants-in-common-divorce-uk"));
const FdrHearingPage = lazy(() => import("@/pages/content/fdr-hearing-financial-dispute-resolution-uk"));
const FdaPage = lazy(() => import("@/pages/content/first-directions-appointment-fda-uk"));
const MiamPage = lazy(() => import("@/pages/content/miam-mediation-information-assessment-uk"));
const TolataPage = lazy(() => import("@/pages/content/tolata-claim-cohabitation-uk"));
const Schedule1Page = lazy(() => import("@/pages/content/schedule-1-children-act-uk"));
const BarderPage = lazy(() => import("@/pages/content/barder-event-reopening-divorce-settlement-uk"));
const ChildBenefitAfterDivorcePage = lazy(() => import("@/pages/content/child-benefit-after-divorce-uk"));
const CouncilTaxSPDPage = lazy(() => import("@/pages/content/council-tax-single-person-discount-divorce-uk"));
const BankruptcyDivorcePage = lazy(() => import("@/pages/content/bankruptcy-and-divorce-uk"));
const AverageDivorceSettlementPage = lazy(() => import("@/pages/content/average-divorce-settlement-uk"));
const WifeEntitled5YearsPage = lazy(() => import("@/pages/content/wife-entitled-divorce-uk-after-5-years"));
const WifeEntitled10YearsPage = lazy(() => import("@/pages/content/wife-entitled-divorce-uk-after-10-years"));
const WifeEntitled20YearsPage = lazy(() => import("@/pages/content/wife-entitled-divorce-uk-after-20-years"));
const WifeEntitled25YearsPage = lazy(() => import("@/pages/content/wife-entitled-divorce-uk-after-25-years"));
const NegativeEquityDivorcePage = lazy(() => import("@/pages/content/negative-equity-and-divorce-uk"));
const SecondMarriageDivorcePage = lazy(() => import("@/pages/content/second-marriage-divorce-settlement-uk"));
const DiyDivorceCostPage = lazy(() => import("@/pages/content/diy-divorce-uk-cost"));
const OnlineDivorceCostPage = lazy(() => import("@/pages/content/online-divorce-uk-cost"));
const MovingOutDuringDivorcePage = lazy(() => import("@/pages/content/moving-out-during-divorce-uk"));
const DoINeedSolicitorPage = lazy(() => import("@/pages/content/do-i-need-a-solicitor-for-financial-settlement-uk"));
const UniversalCreditAfterDivorcePage = lazy(() => import("@/pages/content/universal-credit-after-divorce-uk"));
const MarriageAllowanceAfterDivorcePage = lazy(() => import("@/pages/content/marriage-allowance-after-divorce-uk"));
const InheritanceTaxAfterDivorcePage = lazy(() => import("@/pages/content/inheritance-tax-after-divorce-uk"));
const CouncilTaxDuringDivorcePage = lazy(() => import("@/pages/content/council-tax-during-divorce-uk"));
const SippOnDivorcePage = lazy(() => import("@/pages/content/sipp-on-divorce-uk"));
const SharedOwnershipDivorcePage = lazy(() => import("@/pages/content/shared-ownership-and-divorce-uk"));
const EngagementRingDivorcePage = lazy(() => import("@/pages/content/engagement-ring-and-wedding-gifts-divorce-uk"));
const DirectorsLoanDivorcePage = lazy(() => import("@/pages/content/directors-loan-account-divorce-uk"));
const DivorceInScotlandPage = lazy(() => import("@/pages/content/divorce-in-scotland-financial-settlement"));
const DivorceInNorthernIrelandPage = lazy(() => import("@/pages/content/divorce-in-northern-ireland-financial-settlement"));
const AboutPage = lazy(() => import("@/pages/about"));
const HowItWorksPage = lazy(() => import("@/pages/how-it-works"));
const FaqPage = lazy(() => import("@/pages/faq"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/wizard" component={WizardPage} />
      <Route path="/preview" component={PreviewPage} />
      <Route path="/unlock" component={UnlockPage} />
      <Route path="/payment-success" component={PaymentSuccessPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/methodology" component={MethodologyPage} />
      <Route path="/recover" component={RecoverPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/free-guide" component={FreeGuidePage} />
      <Route path="/divorce-financial-modelling" component={PillarPage} />
      <Route path="/divorce-50-50-split-calculator-uk" component={Cluster5050Split} />
      <Route path="/divorce-house-buyout-calculator-uk" component={ClusterHouseBuyout} />
      <Route path="/divorce-pension-split-calculator-uk" component={ClusterPensionSplit} />
      <Route path="/divorce-mortgage-affordability-after-separation" component={ClusterMortgageAffordability} />
      <Route path="/divorce-financial-checklist-before-mediation" component={ClusterMediationChecklist} />
      <Route path="/is-50-50-split-automatic-uk" component={Faq5050Automatic} />
      <Route path="/can-i-keep-the-house-after-divorce-uk" component={FaqKeepHouse} />
      <Route path="/how-are-pensions-divided-in-divorce-uk" component={FaqPensionsDivided} />
      <Route path="/how-much-does-divorce-cost-uk" component={SeoDivorceCostsPage} />
      <Route path="/divorce-financial-settlement-calculator-uk" component={SeoAssetDivisionPage} />
      <Route path="/who-gets-house-divorce-uk"><Redirect to="/can-i-keep-the-house-after-divorce-uk" /></Route>
      <Route path="/how-pensions-split-divorce-uk"><Redirect to="/how-are-pensions-divided-in-divorce-uk" /></Route>
      <Route path="/divorce-financial-guides" component={DivorceFinancialGuidesPage} />
      <Route path="/divorce-settlement-examples-uk" component={SeoSettlementExamplesPage} />
      <Route path="/access" component={AccessPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/refund-policy" component={RefundPolicyPage} />
      <Route path="/how-is-property-divided-in-divorce-uk" component={HowPropertyDividedPage} />
      <Route path="/what-happens-to-debts-in-divorce-uk" component={WhatHappensToDebtsPage} />
      <Route path="/what-is-a-consent-order-uk-divorce" component={ConsentOrderPage} />
      <Route path="/what-is-a-clean-break-order-uk" component={CleanBreakOrderPage} />
      <Route path="/financial-disclosure-divorce-uk" component={FinancialDisclosurePage} />
      <Route path="/financial-remedy-proceedings-uk" component={FinancialRemedyPage} />
      <Route path="/how-are-savings-split-in-divorce-uk" component={SavingsSplitPage} />
      <Route path="/how-are-investments-divided-in-divorce-uk" component={InvestmentsDividedPage} />
      <Route path="/joint-bank-accounts-after-divorce-uk" component={JointBankAccountsPage} />
      <Route path="/can-ex-claim-inheritance-uk-divorce" component={InheritanceClaimPage} />
      <Route path="/is-inheritance-included-in-divorce-settlement-uk" component={InheritanceSettlementPage} />
      <Route path="/both-names-on-mortgage-divorce-uk" component={BothNamesOnMortgagePage} />
      <Route path="/can-i-force-sale-of-house-after-divorce-uk" component={ForceSaleHousePage} />
      <Route path="/who-pays-mortgage-during-divorce-uk" component={MortgageDuringDivorcePage} />
      <Route path="/buying-partner-out-of-house-divorce-uk" component={BuyingPartnerOutPage} />
      <Route path="/unmarried-separating-house-uk" component={UnmarriedSeparatingHousePage} />
      <Route path="/divorce-settlement-no-assets-uk" component={DivorceNoAssetsPage} />
      <Route path="/divorce-with-children-financial-settlement-uk" component={DivorceWithChildrenPage} />
      <Route path="/divorce-where-one-earns-more-uk" component={DivorceIncomeInequalityPage} />
      <Route path="/how-does-child-custody-affect-financial-settlement-uk" component={CustodyFinancialSettlementPage} />
      <Route path="/child-maintenance-vs-spousal-maintenance-uk" component={ChildVsSpousalMaintenancePage} />
      <Route path="/who-pays-what-after-divorce-with-children-uk" component={WhoPaysAfterDivorcePage} />
      <Route path="/does-having-children-change-divorce-settlement-uk" component={ChildrenChangeSettlementPage} />
      <Route path="/can-i-hide-assets-in-divorce-uk" component={HideAssetsPage} />
      <Route path="/spouse-refuses-financial-disclosure-uk" component={SpouseRefusesDisclosurePage} />
      <Route path="/can-i-divorce-without-financial-settlement-uk" component={DivorceWithoutFinancialSettlementPage} />
      <Route path="/ex-doesnt-agree-settlement-uk" component={ExDoesntAgreeSettlementPage} />
      <Route path="/can-i-reopen-divorce-settlement-uk" component={ReopenDivorceSettlementPage} />
      <Route path="/how-long-after-divorce-can-financial-claims-be-made-uk" component={FinancialClaimsAfterDivorcePage} />
      <Route path="/when-is-divorce-financial-settlement-legally-binding-uk" component={LegallyBindingSettlementPage} />
      <Route path="/steps-after-final-order-finances-uk" component={StepsAfterFinalOrderPage} />
      <Route path="/mediation-vs-court-divorce-uk-costs" component={MediationVsCourtPage} />
      <Route path="/consent-order-vs-clean-break-order-uk" component={ConsentVsCleanBreakPage} />
      <Route path="/divorce-solicitor-vs-mediation-uk" component={SolicitorVsMediationPage} />
      <Route path="/settling-out-of-court-vs-court-divorce-uk" component={SettlingOutOfCourtPage} />
      <Route path="/how-much-maintenance-after-divorce-uk" component={MaintenanceAmountPage} />
      <Route path="/can-i-refuse-divorce-financial-settlement-uk" component={RefuseSettlementPage} />
      <Route path="/how-long-does-divorce-financial-settlement-take-uk" component={HowLongFinancialSettlementPage} />
      <Route path="/divorce-mediation-process-uk" component={MediationProcessPage} />
      <Route path="/timeline-of-divorce-and-financial-settlement-uk" component={DivorceTimelinePage} />
      <Route path="/divorce-pension-offsetting-uk" component={PensionOffsettingPage} />
      <Route path="/spousal-maintenance-after-divorce-uk" component={SpousalMaintenancePage} />
      <Route path="/transfer-of-equity-divorce-uk" component={TransferOfEquityPage} />
      <Route path="/what-am-i-entitled-to-in-divorce-uk" component={WhatAmIEntitledToPage} />
      <Route path="/how-much-will-i-get-divorce-uk" component={HowMuchWillIGetDivorcePage} />
      <Route path="/career-sacrifice-divorce-settlement-uk" component={CareerSacrificeDivorcePage} />
      <Route path="/woman-gave-up-career-divorce-uk" component={WomanGaveUpCareerDivorcePage} />
      <Route path="/form-e-financial-disclosure-uk" component={FormEDisclosurePage} />
      <Route path="/section-25-factors-divorce-uk" component={Section25FactorsPage} />
      <Route path="/stay-at-home-parent-divorce-settlement-uk" component={StayAtHomeParentPage} />
      <Route path="/capital-gains-tax-on-divorce-uk" component={CapitalGainsTaxDivorcePage} />
      <Route path="/short-marriage-divorce-settlement-uk" component={ShortMarriageSettlementPage} />
      <Route path="/long-marriage-divorce-settlement-uk" component={LongMarriageSettlementPage} />
      <Route path="/matrimonial-vs-non-matrimonial-assets-uk" component={MatrimonialVsNonMatrimonialPage} />
      <Route path="/self-employed-divorce-uk" component={SelfEmployedDivorcePage} />
      <Route path="/mesher-vs-martin-order-uk" component={MesherVsMartinOrderPage} />
      <Route path="/lump-sum-order-divorce-uk" component={LumpSumOrderPage} />
      <Route path="/pension-sharing-vs-offsetting-uk" component={PensionSharingVsOffsettingPage} />
      <Route path="/pre-marital-assets-divorce-uk" component={PreMaritalAssetsPage} />
      <Route path="/cryptocurrency-divorce-uk" component={CryptocurrencyDivorcePage} />
      <Route path="/bonuses-rsus-divorce-uk" component={BonusesRsusDivorcePage} />
      <Route path="/prenuptial-agreement-uk" component={PrenuptialAgreementPage} />
      <Route path="/postnuptial-agreement-uk" component={PostnuptialAgreementPage} />
      <Route path="/separation-agreement-uk" component={SeparationAgreementPage} />
      <Route path="/arbitration-divorce-uk" component={ArbitrationDivorcePage} />
      <Route path="/collaborative-law-divorce-uk" component={CollaborativeLawDivorcePage} />
      <Route path="/divorce-and-the-family-business-uk" component={DivorceAndTheFamilyBusinessPage} />
      <Route path="/trust-assets-divorce-uk" component={TrustAssetsDivorcePage} />
      <Route path="/offshore-assets-divorce-uk" component={OffshoreAssetsDivorcePage} />
      <Route path="/maintenance-pending-suit-uk" component={MaintenancePendingSuitPage} />
      <Route path="/divorce-and-life-insurance-uk" component={DivorceAndLifeInsurancePage} />
      <Route path="/child-arrangements-order-uk" component={ChildArrangementsOrderPage} />
      <Route path="/no-fault-divorce-uk" component={NoFaultDivorcePage} />
      <Route path="/decree-absolute-vs-final-order-uk" component={DecreeAbsoluteVsFinalOrderPage} />
      <Route path="/how-long-does-a-divorce-take-uk" component={HowLongDivorceTakePage} />
      <Route path="/annulment-vs-divorce-uk" component={AnnulmentVsDivorcePage} />
      <Route path="/common-law-marriage-uk-myth" component={CommonLawMarriageMythPage} />
      <Route path="/silver-divorce-uk" component={SilverDivorcePage} />
      <Route path="/high-net-worth-divorce-uk" component={HighNetWorthDivorcePage} />
      <Route path="/cetv-explained-divorce-uk" component={CetvExplainedPage} />
      <Route path="/nhs-pension-on-divorce-uk" component={NhsPensionPage} />
      <Route path="/police-pension-on-divorce-uk" component={PolicePensionPage} />
      <Route path="/military-pension-on-divorce-uk" component={MilitaryPensionPage} />
      <Route path="/teachers-pension-on-divorce-uk" component={TeachersPensionPage} />
      <Route path="/state-pension-and-divorce-uk" component={StatePensionDivorcePage} />
      <Route path="/final-salary-pension-on-divorce-uk" component={FinalSalaryPensionPage} />
      <Route path="/pension-attachment-order-vs-sharing-order-uk" component={PensionAttachmentVsSharingPage} />
      <Route path="/buy-to-let-property-on-divorce-uk" component={BuyToLetPropertyPage} />
      <Route path="/limited-company-shares-on-divorce-uk" component={LimitedCompanySharesPage} />
      <Route path="/share-options-and-emi-on-divorce-uk" component={ShareOptionsEmiPage} />
      <Route path="/isa-and-lifetime-isa-on-divorce-uk" component={IsaLifetimeIsaPage} />
      <Route path="/stamp-duty-on-transfer-of-equity-divorce-uk" component={StampDutyTransferEquityPage} />
      <Route path="/joint-tenants-vs-tenants-in-common-divorce-uk" component={JointTenantsVsTenantsInCommonPage} />
      <Route path="/fdr-hearing-financial-dispute-resolution-uk" component={FdrHearingPage} />
      <Route path="/first-directions-appointment-fda-uk" component={FdaPage} />
      <Route path="/miam-mediation-information-assessment-uk" component={MiamPage} />
      <Route path="/tolata-claim-cohabitation-uk" component={TolataPage} />
      <Route path="/schedule-1-children-act-uk" component={Schedule1Page} />
      <Route path="/barder-event-reopening-divorce-settlement-uk" component={BarderPage} />
      <Route path="/child-benefit-after-divorce-uk" component={ChildBenefitAfterDivorcePage} />
      <Route path="/council-tax-single-person-discount-divorce-uk" component={CouncilTaxSPDPage} />
      <Route path="/bankruptcy-and-divorce-uk" component={BankruptcyDivorcePage} />
      <Route path="/average-divorce-settlement-uk" component={AverageDivorceSettlementPage} />
      <Route path="/wife-entitled-divorce-uk-after-5-years" component={WifeEntitled5YearsPage} />
      <Route path="/wife-entitled-divorce-uk-after-10-years" component={WifeEntitled10YearsPage} />
      <Route path="/wife-entitled-divorce-uk-after-20-years" component={WifeEntitled20YearsPage} />
      <Route path="/wife-entitled-divorce-uk-after-25-years" component={WifeEntitled25YearsPage} />
      <Route path="/negative-equity-and-divorce-uk" component={NegativeEquityDivorcePage} />
      <Route path="/second-marriage-divorce-settlement-uk" component={SecondMarriageDivorcePage} />
      <Route path="/diy-divorce-uk-cost" component={DiyDivorceCostPage} />
      <Route path="/online-divorce-uk-cost" component={OnlineDivorceCostPage} />
      <Route path="/moving-out-during-divorce-uk" component={MovingOutDuringDivorcePage} />
      <Route path="/do-i-need-a-solicitor-for-financial-settlement-uk" component={DoINeedSolicitorPage} />
      <Route path="/universal-credit-after-divorce-uk" component={UniversalCreditAfterDivorcePage} />
      <Route path="/marriage-allowance-after-divorce-uk" component={MarriageAllowanceAfterDivorcePage} />
      <Route path="/inheritance-tax-after-divorce-uk" component={InheritanceTaxAfterDivorcePage} />
      <Route path="/council-tax-during-divorce-uk" component={CouncilTaxDuringDivorcePage} />
      <Route path="/sipp-on-divorce-uk" component={SippOnDivorcePage} />
      <Route path="/shared-ownership-and-divorce-uk" component={SharedOwnershipDivorcePage} />
      <Route path="/engagement-ring-and-wedding-gifts-divorce-uk" component={EngagementRingDivorcePage} />
      <Route path="/directors-loan-account-divorce-uk" component={DirectorsLoanDivorcePage} />
      <Route path="/divorce-in-scotland-financial-settlement" component={DivorceInScotlandPage} />
      <Route path="/divorce-in-northern-ireland-financial-settlement" component={DivorceInNorthernIrelandPage} />
      <Route path="/free-divorce-calculator-uk" component={FreeDivorceCalculatorPage} />
      <Route path="/divorce-calculator-uk" component={DivorceCalculatorUkPage} />
      <Route path="/divorce-settlement-calculator-uk" component={DivorceSettlementCalculatorPage} />
      <Route path="/fair-divorce-settlement-calculator" component={FairDivorceSettlementCalculatorPage} />
      <Route path="/divorce-asset-split-calculator" component={DivorceAssetSplitCalculatorPage} />
      <Route path="/equity-split-divorce-calculator" component={EquitySplitDivorceCalculatorPage} />
      <Route path="/divorce-pension-calculator" component={DivorcePensionCalculatorPage} />
      <Route path="/pension-sharing-calculator-divorce" component={PensionSharingCalculatorPage} />
      <Route path="/pension-offsetting-calculator-divorce" component={PensionOffsettingCalculatorPage} />
      <Route path="/spousal-maintenance-calculator-uk" component={SpousalMaintenanceCalculatorPage} />
      <Route path="/divorce-maintenance-calculator" component={DivorceMaintenanceCalculatorPage} />
      <Route path="/house-divorce-calculator" component={HouseDivorceCalculatorPage} />
      <Route path="/can-i-keep-the-house-after-divorce-calculator" component={CanIKeepHouseCalculatorPage} />
      <Route path="/mortgage-divorce-calculator" component={MortgageDivorceCalculatorPage} />
      <Route path="/divorce-cashflow-calculator" component={DivorceCashflowCalculatorPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/results">
        <AccessGate>
          <ResultsPage />
        </AccessGate>
      </Route>
      <Route path="/report">
        <AccessGate>
          <ReportPage />
        </AccessGate>
      </Route>
      <Route path="/dashboard"><Redirect to="/" /></Route>
      <Route path="/assets"><Redirect to="/" /></Route>
      <Route path="/budget"><Redirect to="/" /></Route>
      <Route path="/scenarios"><Redirect to="/" /></Route>
      <Route component={NotFoundPage} />
    </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={100}>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
