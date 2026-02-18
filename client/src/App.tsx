import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WizardPage from "@/pages/wizard";
import ResultsPage from "@/pages/results";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WizardPage} />
      <Route path="/results" component={ResultsPage} />
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
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
