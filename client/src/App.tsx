import { Switch, Route, Redirect } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFoundPage from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import WizardPage from "@/pages/wizard";
import ResultsPage from "@/pages/results";
import ReportPage from "@/pages/report";
import PreviewPage from "@/pages/preview";
import UnlockPage from "@/pages/unlock";
import PricingPage from "@/pages/pricing";
import PaymentSuccessPage from "@/pages/payment-success";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import MethodologyPage from "@/pages/methodology";
import RecoverPage from "@/pages/recover";
import AdminPage from "@/pages/admin";
import { AccessGate } from "@/components/access-gate";
import PillarPage from "@/pages/content/pillar-divorce-financial-modelling";
import Cluster5050Split from "@/pages/content/cluster-5050-split";
import ClusterHouseBuyout from "@/pages/content/cluster-house-buyout";
import ClusterPensionSplit from "@/pages/content/cluster-pension-split";
import ClusterMortgageAffordability from "@/pages/content/cluster-mortgage-affordability";
import ClusterMediationChecklist from "@/pages/content/cluster-mediation-checklist";
import Faq5050Automatic from "@/pages/content/faq-5050-automatic";
import FaqKeepHouse from "@/pages/content/faq-keep-house";
import FaqPensionsDivided from "@/pages/content/faq-pensions-divided";
import FreeGuidePage from "@/pages/free-guide";
import SeoDivorceCostsPage from "@/pages/content/seo-divorce-costs";
import SeoAssetDivisionPage from "@/pages/content/seo-asset-division";
import SeoWhoGetsHousePage from "@/pages/content/seo-who-gets-house";
import SeoPensionsPage from "@/pages/content/seo-pensions";
import SeoSettlementExamplesPage from "@/pages/content/seo-settlement-examples";
import DivorceFinancialGuidesPage from "@/pages/content/divorce-financial-guides";
import ContactPage from "@/pages/contact";
import RefundPolicyPage from "@/pages/refund-policy";
import AccessPage from "@/pages/access";
import HowPropertyDividedPage from "@/pages/content/how-is-property-divided-in-divorce-uk";
import WhatHappensToDebtsPage from "@/pages/content/what-happens-to-debts-in-divorce-uk";
import ConsentOrderPage from "@/pages/content/what-is-a-consent-order-uk-divorce";
import CleanBreakOrderPage from "@/pages/content/what-is-a-clean-break-order-uk";
import FinancialDisclosurePage from "@/pages/content/financial-disclosure-divorce-uk";
import FinancialRemedyPage from "@/pages/content/financial-remedy-proceedings-uk";
import SavingsSplitPage from "@/pages/content/how-are-savings-split-in-divorce-uk";
import InvestmentsDividedPage from "@/pages/content/how-are-investments-divided-in-divorce-uk";
import JointBankAccountsPage from "@/pages/content/joint-bank-accounts-after-divorce-uk";
import InheritanceClaimPage from "@/pages/content/can-ex-claim-inheritance-uk-divorce";
import InheritanceSettlementPage from "@/pages/content/is-inheritance-included-in-divorce-settlement-uk";
import BothNamesOnMortgagePage from "@/pages/content/both-names-on-mortgage-divorce-uk";
import ForceSaleHousePage from "@/pages/content/can-i-force-sale-of-house-after-divorce-uk";
import MortgageDuringDivorcePage from "@/pages/content/who-pays-mortgage-during-divorce-uk";
import BuyingPartnerOutPage from "@/pages/content/buying-partner-out-of-house-divorce-uk";
import UnmarriedSeparatingHousePage from "@/pages/content/unmarried-separating-house-uk";
import DivorceNoAssetsPage from "@/pages/content/divorce-settlement-no-assets-uk";
import DivorceWithChildrenPage from "@/pages/content/divorce-with-children-financial-settlement-uk";
import DivorceIncomeInequalityPage from "@/pages/content/divorce-where-one-earns-more-uk";
import CustodyFinancialSettlementPage from "@/pages/content/how-does-child-custody-affect-financial-settlement-uk";
import ChildVsSpousalMaintenancePage from "@/pages/content/child-maintenance-vs-spousal-maintenance-uk";
import WhoPaysAfterDivorcePage from "@/pages/content/who-pays-what-after-divorce-with-children-uk";
import ChildrenChangeSettlementPage from "@/pages/content/does-having-children-change-divorce-settlement-uk";
import HideAssetsPage from "@/pages/content/can-i-hide-assets-in-divorce-uk";
import SpouseRefusesDisclosurePage from "@/pages/content/spouse-refuses-financial-disclosure-uk";
import DivorceWithoutFinancialSettlementPage from "@/pages/content/can-i-divorce-without-financial-settlement-uk";
import ExDoesntAgreeSettlementPage from "@/pages/content/ex-doesnt-agree-settlement-uk";
import ReopenDivorceSettlementPage from "@/pages/content/can-i-reopen-divorce-settlement-uk";
import FinancialClaimsAfterDivorcePage from "@/pages/content/how-long-after-divorce-can-financial-claims-be-made-uk";
import LegallyBindingSettlementPage from "@/pages/content/when-is-divorce-financial-settlement-legally-binding-uk";
import StepsAfterFinalOrderPage from "@/pages/content/steps-after-final-order-finances-uk";
import MediationVsCourtPage from "@/pages/content/mediation-vs-court-divorce-uk-costs";
import ConsentVsCleanBreakPage from "@/pages/content/consent-order-vs-clean-break-order-uk";
import SolicitorVsMediationPage from "@/pages/content/divorce-solicitor-vs-mediation-uk";
import SettlingOutOfCourtPage from "@/pages/content/settling-out-of-court-vs-court-divorce-uk";
import MaintenanceAmountPage from "@/pages/content/how-much-maintenance-after-divorce-uk";
import RefuseSettlementPage from "@/pages/content/can-i-refuse-divorce-financial-settlement-uk";
import HowLongFinancialSettlementPage from "@/pages/content/how-long-does-divorce-financial-settlement-take-uk";
import MediationProcessPage from "@/pages/content/divorce-mediation-process-uk";
import DivorceTimelinePage from "@/pages/content/timeline-of-divorce-and-financial-settlement-uk";
import PensionOffsettingPage from "@/pages/content/divorce-pension-offsetting-uk";
import SpousalMaintenancePage from "@/pages/content/spousal-maintenance-after-divorce-uk";
import TransferOfEquityPage from "@/pages/content/transfer-of-equity-divorce-uk";
import WhatAmIEntitledToPage from "@/pages/content/what-am-i-entitled-to-in-divorce-uk";
import FormEDisclosurePage from "@/pages/content/form-e-financial-disclosure-uk";
import Section25FactorsPage from "@/pages/content/section-25-factors-divorce-uk";
import StayAtHomeParentPage from "@/pages/content/stay-at-home-parent-divorce-settlement-uk";
import CapitalGainsTaxDivorcePage from "@/pages/content/capital-gains-tax-on-divorce-uk";
import ShortMarriageSettlementPage from "@/pages/content/short-marriage-divorce-settlement-uk";
import LongMarriageSettlementPage from "@/pages/content/long-marriage-divorce-settlement-uk";
import MatrimonialVsNonMatrimonialPage from "@/pages/content/matrimonial-vs-non-matrimonial-assets-uk";
import SelfEmployedDivorcePage from "@/pages/content/self-employed-divorce-uk";
import MesherVsMartinOrderPage from "@/pages/content/mesher-vs-martin-order-uk";
import LumpSumOrderPage from "@/pages/content/lump-sum-order-divorce-uk";
import PensionSharingVsOffsettingPage from "@/pages/content/pension-sharing-vs-offsetting-uk";
import PreMaritalAssetsPage from "@/pages/content/pre-marital-assets-divorce-uk";
import CryptocurrencyDivorcePage from "@/pages/content/cryptocurrency-divorce-uk";
import BonusesRsusDivorcePage from "@/pages/content/bonuses-rsus-divorce-uk";
import AboutPage from "@/pages/about";
import HowItWorksPage from "@/pages/how-it-works";
import FaqPage from "@/pages/faq";

function Router() {
  return (
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
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "all");
    setVisible(false);
  };

  const essential = () => {
    localStorage.setItem("cookieConsent", "essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] bg-primary/97 backdrop-blur border-t border-white/15 px-4 py-3"
      data-testid="section-cookie-banner"
    >
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/70 leading-relaxed text-center sm:text-left">
          We use essential cookies to keep the platform working. No tracking without your consent.{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-white transition-colors">
            Privacy Policy
          </a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={essential}
            className="text-xs text-white/55 hover:text-white px-3 py-1.5 rounded border border-white/20 hover:border-white/40 transition-colors"
            data-testid="button-cookie-essential"
          >
            Essential only
          </button>
          <button
            onClick={accept}
            className="text-xs bg-gold hover:bg-gold/90 text-white px-3 py-1.5 rounded transition-colors font-medium"
            data-testid="button-cookie-accept"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={100}>
        <Toaster />
        <Router />
        <CookieBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
