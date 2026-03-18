import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";
import WizardPage from "@/pages/wizard";
import ResultsPage from "@/pages/results";
import ReportPage from "@/pages/report";
import PreviewPage from "@/pages/preview";
import UnlockPage from "@/pages/unlock";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
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
      <Route><Redirect to="/" /></Route>
    </Switch>
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
