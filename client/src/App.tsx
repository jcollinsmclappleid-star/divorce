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
import { AccessGate } from "@/components/access-gate";

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
