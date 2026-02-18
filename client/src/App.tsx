import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import AssetsPage from "@/pages/assets";
import BudgetPage from "@/pages/budget";
import ScenariosPage from "@/pages/scenarios";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/assets" component={AssetsPage} />
      <Route path="/budget" component={BudgetPage} />
      <Route path="/scenarios" component={ScenariosPage} />
      <Route component={NotFound} />
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
