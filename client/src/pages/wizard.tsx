import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useAppStore, Asset, Liability, Income, Expense } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AssetCategory, LiabilityCategory, Owner, ExpenseCategory } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";
import {
  ChevronLeft, ChevronRight, Heart, Home, Wallet, Landmark,
  Briefcase, Calculator, Plus, Trash2, Edit2, Check, Settings2,
  Shield, Users, TrendingUp, ArrowRight, Receipt
} from "lucide-react";

const STEPS = [
  { id: 0, title: "Welcome", icon: Heart },
  { id: 1, title: "About Your Situation", icon: Users },
  { id: 2, title: "Property & Mortgage", icon: Home },
  { id: 3, title: "Savings & Debts", icon: Wallet },
  { id: 4, title: "Pension Provision", icon: Landmark },
  { id: 5, title: "Income & Employment", icon: Briefcase },
  { id: 6, title: "Monthly Expenses", icon: Receipt },
  { id: 7, title: "Children & Support", icon: Calculator },
  { id: 8, title: "Review & Model", icon: TrendingUp },
];

const STEP_COPY = [
  {
    prompt: "Let's build your financial model",
    reassurance: "This tool allows you to model different settlement structures and compare their financial implications. All calculations happen in your browser \u2014 your data stays private. Use your best estimates where you're unsure."
  },
  {
    prompt: "About your situation",
    reassurance: "A few baseline assumptions to get started. You can always come back and adjust these later."
  },
  {
    prompt: "Property & mortgage",
    reassurance: "The family home is often the largest asset. A rough valuation is fine \u2014 you can refine assumptions later."
  },
  {
    prompt: "Savings, investments & debts",
    reassurance: "Include savings, investments, vehicles, and any liabilities. Best estimates work well for initial modelling."
  },
  {
    prompt: "Pension provision",
    reassurance: "Pensions can be a significant part of the overall financial picture. If you have a recent statement, the Cash Equivalent Transfer Value (CETV) is the most useful figure."
  },
  {
    prompt: "Income & employment",
    reassurance: "Add each party's income sources. This allows the model to calculate take-home pay and assess long-term sustainability."
  },
  {
    prompt: "Post-separation monthly expenses",
    reassurance: "Estimate what each person is likely to spend after separation. This is key to modelling whether each scenario is financially sustainable."
  },
  {
    prompt: "Children & support assumptions",
    reassurance: "If there are children, you can include a child maintenance estimate. These assumptions feed into the sustainability projections."
  },
  {
    prompt: "Review & model",
    reassurance: "Review your assumptions and compare how different settlement structures affect the financial position of each party."
  },
];

export default function WizardPage() {
  useDocumentTitle("Financial Data Entry | DivorceCalculatorUK");
  useNoIndex();
  const [currentStep, setCurrentStep] = useState(0);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [, setLocation] = useLocation();

  const progress = ((currentStep) / (STEPS.length - 1)) * 100;

  const goNext = useCallback(() => {
    if (currentStep === STEPS.length - 1) {
      setLocation("/preview");
    } else {
      setCurrentStep(s => Math.min(s + 1, STEPS.length - 1));
    }
  }, [currentStep, setLocation]);

  const goBack = useCallback(() => {
    setCurrentStep(s => Math.max(s - 1, 0));
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20" data-testid="text-disclaimer">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Logo size="md" />

          <div className="flex-1 max-w-lg mx-auto hidden md:block">
            <div className="flex items-center gap-1">
              {STEPS.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(i)}
                  className={`flex items-center gap-1 text-xs px-1.5 py-1 rounded transition-colors ${
                    i === currentStep
                      ? "text-primary font-semibold"
                      : i < currentStep
                      ? "text-primary/60"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`stepper-step-${i}`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                    i < currentStep
                      ? "bg-primary text-primary-foreground border-primary"
                      : i === currentStep
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}>
                    {i < currentStep ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className="hidden lg:inline">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground hidden sm:inline">Advanced</Label>
              <Switch
                checked={advancedMode}
                onCheckedChange={setAdvancedMode}
                data-testid="switch-advanced-mode"
              />
            </div>
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none" data-testid="progress-bar" />
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1 md:hidden">
            Step {currentStep + 1} of {STEPS.length}
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground" data-testid="text-step-title">
            {STEPS[currentStep].title}
          </h1>
          <p className="text-muted-foreground mt-1" data-testid="text-step-prompt">
            {STEP_COPY[currentStep].prompt}
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <StepContent step={currentStep} advancedMode={advancedMode} />
          </CardContent>
        </Card>

        <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground mb-6 flex items-start gap-2">
          <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/60" />
          <span>{STEP_COPY[currentStep].reassurance}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={currentStep === 0}
            data-testid="button-back"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>

          <Button
            onClick={goNext}
            data-testid="button-continue"
          >
            {currentStep === STEPS.length - 1 ? "View Full Results" : "Continue"}
            {currentStep === STEPS.length - 1 ? <ArrowRight className="w-4 h-4 ml-1" /> : <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </main>
    </div>
  );
}

function StepContent({ step, advancedMode }: { step: number; advancedMode: boolean }) {
  switch (step) {
    case 0: return <StepWelcome />;
    case 1: return <StepSituation advancedMode={advancedMode} />;
    case 2: return <StepHome advancedMode={advancedMode} />;
    case 3: return <StepAssets advancedMode={advancedMode} />;
    case 4: return <StepPensions advancedMode={advancedMode} />;
    case 5: return <StepIncome advancedMode={advancedMode} />;
    case 6: return <StepExpenses advancedMode={advancedMode} />;
    case 7: return <StepSupport advancedMode={advancedMode} />;
    case 8: return <StepAssumptions />;
    default: return null;
  }
}

function StepWelcome() {
  return (
    <div className="text-center py-8 space-y-6">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
        <Heart className="w-8 h-8 text-primary" />
      </div>
      <div className="space-y-3 max-w-lg mx-auto">
        <h2 className="text-xl font-display font-bold">Welcome to your financial clarity tool</h2>
        <p className="text-muted-foreground">
          Going through a separation is difficult enough without the financial uncertainty.
          This tool helps you explore different settlement options so you can have informed conversations
          with your solicitor or mediator.
        </p>
        <div className="grid gap-3 text-left text-sm pt-4">
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Private &amp; secure</span>
              <p className="text-muted-foreground text-xs mt-0.5">All calculations run in your browser. Your data never leaves your device.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
            <Calculator className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Best estimates are fine</span>
              <p className="text-muted-foreground text-xs mt-0.5">You don't need exact figures. Approximate values will still give meaningful comparisons.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Compare scenarios</span>
              <p className="text-muted-foreground text-xs mt-0.5">See how selling, one party keeping the home, or deferring a sale would work out financially.</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Click Continue to get started</p>
    </div>
  );
}

function StepSituation({ advancedMode }: { advancedMode: boolean }) {
  const { children, updateChildren, assumptions, updateAssumptions } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Do you have children together?</Label>
          <div className="flex items-center gap-4">
            <Button
              variant={children.numChildren > 0 ? "default" : "outline"}
              onClick={() => updateChildren({ numChildren: Math.max(1, children.numChildren) })}
              data-testid="button-has-children-yes"
            >
              Yes
            </Button>
            <Button
              variant={children.numChildren === 0 ? "default" : "outline"}
              onClick={() => updateChildren({ numChildren: 0 })}
              data-testid="button-has-children-no"
            >
              No
            </Button>
          </div>
        </div>

        {children.numChildren > 0 && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-md">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm">Number of children</Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={children.numChildren}
                  onChange={(e) => updateChildren({ numChildren: parseInt(e.target.value) || 1 })}
                  data-testid="input-num-children"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Nights per year with Party A</Label>
                <Input
                  type="number"
                  min={0}
                  max={365}
                  value={children.nightsWithA}
                  onChange={(e) => {
                    const n = parseInt(e.target.value) || 0;
                    updateChildren({ nightsWithA: n, nightsWithB: Math.max(0, 365 - n) });
                  }}
                  data-testid="input-nights-a"
                />
                <p className="text-xs text-muted-foreground">{children.nightsWithB} nights with Party B</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Age of each child</Label>
              <p className="text-xs text-muted-foreground">Child maintenance typically applies until age 16 (or 20 if in full-time education). Ages help model when payments may end.</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {(children.childAges || []).slice(0, children.numChildren).map((age, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap shrink-0">Child {i + 1}</Label>
                    <Input
                      type="number"
                      min={0}
                      max={18}
                      value={age}
                      onChange={(e) => {
                        const newAges = [...(children.childAges || [])];
                        newAges[i] = Math.max(0, Math.min(18, parseInt(e.target.value) || 0));
                        updateChildren({ childAges: newAges });
                      }}
                      data-testid={`input-child-age-${i}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {advancedMode && (
        <div className="space-y-4 pt-2">
          <Separator />
          <Label className="text-sm font-medium text-muted-foreground">Advanced Settings</Label>
          <div className="flex items-center gap-3">
            <Switch
              checked={assumptions.includeTaxModel}
              onCheckedChange={(v) => updateAssumptions({ includeTaxModel: v })}
              data-testid="switch-tax-model"
            />
            <Label className="text-sm">Include UK tax/NI calculations</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={assumptions.includeCMSEstimate}
              onCheckedChange={(v) => updateAssumptions({ includeCMSEstimate: v })}
              data-testid="switch-cms"
            />
            <Label className="text-sm">Include child maintenance estimate</Label>
          </div>
        </div>
      )}
    </div>
  );
}

function StepHome({ advancedMode }: { advancedMode: boolean }) {
  const { assets, liabilities, addAsset, updateAsset, addLiability, updateLiability } = useAppStore();
  const home = assets.find(a => a.category === "primary_home");
  const mortgage = liabilities.find(l => l.category === "mortgage");

  const setHomeValue = (val: number) => {
    if (home) {
      updateAsset(home.id, { currentValue: val });
    } else {
      addAsset({
        name: "Family Home",
        category: "primary_home",
        owner: "joint",
        currentValue: val,
        liquidity: "illiquid",
        saleCostPct: 0.03,
        taxCostPct: 0,
      });
    }
  };

  const setMortgageBalance = (val: number) => {
    if (mortgage) {
      updateLiability(mortgage.id, { balance: val });
    } else {
      addLiability({
        name: "Mortgage",
        category: "mortgage",
        owner: "joint",
        balance: val,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Estimated home value</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">£</span>
          <Input
            type="number"
            className="pl-7"
            value={home?.currentValue ?? ""}
            onChange={(e) => setHomeValue(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 350000"
            data-testid="input-home-value"
          />
        </div>
        <p className="text-xs text-muted-foreground">Check Zoopla or Rightmove for a rough estimate.</p>
      </div>

      <div className="space-y-2">
        <Label>Outstanding mortgage balance</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">£</span>
          <Input
            type="number"
            className="pl-7"
            value={mortgage?.balance ?? ""}
            onChange={(e) => setMortgageBalance(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 180000"
            data-testid="input-mortgage-balance"
          />
        </div>
      </div>

      {(home || mortgage) && (
        <div className="p-4 bg-muted/30 rounded-md">
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="text-muted-foreground">Estimated equity</span>
            <span className="font-bold text-lg">
              {formatCurrency((home?.currentValue ?? 0) - (mortgage?.balance ?? 0))}
            </span>
          </div>
        </div>
      )}

      {advancedMode && (
        <div className="space-y-4 pt-2">
          <Separator />
          <Label className="text-sm font-medium text-muted-foreground">Advanced: Home Details</Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm">Ownership</Label>
              <Select
                value={home?.owner ?? "joint"}
                onValueChange={(v) => home && updateAsset(home.id, { owner: v })}
              >
                <SelectTrigger data-testid="select-home-owner"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="joint">Joint</SelectItem>
                  <SelectItem value="A">Party A</SelectItem>
                  <SelectItem value="B">Party B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Sale costs (%)</Label>
              <Input
                type="number"
                step={0.5}
                value={((home?.saleCostPct ?? 0.03) * 100).toFixed(1)}
                onChange={(e) => home && updateAsset(home.id, { saleCostPct: parseFloat(e.target.value) / 100 || 0.03 })}
                data-testid="input-sale-cost-pct"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ASSET_SUGGESTIONS: { name: string; category: string; owner: string; hint: string }[] = [
  { name: "Joint Savings Account", category: "cash", owner: "joint", hint: "Current or savings accounts held jointly" },
  { name: "ISA", category: "investments", owner: "A", hint: "Individual Savings Account - check your latest statement for the current value" },
  { name: "Stocks & Shares", category: "investments", owner: "A", hint: "Share portfolios, investment platforms (e.g. Hargreaves Lansdown, Vanguard)" },
  { name: "Premium Bonds", category: "cash", owner: "joint", hint: "Check your NS&I account for the current holding" },
  { name: "Buy-to-Let Property", category: "other_property", owner: "joint", hint: "Investment or rental property - use current market value estimate" },
  { name: "Business Interest", category: "business", owner: "A", hint: "Share of a business - use the most recent valuation or accountant's estimate" },
  { name: "Vehicle", category: "vehicle", owner: "A", hint: "Car, motorbike or other vehicle - use a trade-in or private sale value" },
  { name: "Valuables / Jewellery", category: "personal_possessions", owner: "joint", hint: "High-value items such as jewellery, art, antiques or collections" },
];

const DEBT_SUGGESTIONS: { name: string; category: string; owner: string; hint: string }[] = [
  { name: "Credit Card", category: "credit_card", owner: "A", hint: "Outstanding balance on credit cards" },
  { name: "Personal Loan", category: "loan", owner: "joint", hint: "Bank or building society personal loan" },
  { name: "Car Finance", category: "loan", owner: "A", hint: "HP, PCP or other vehicle finance agreement" },
  { name: "Student Loan", category: "loan", owner: "A", hint: "Student loan balance (Plan 1, 2, or postgrad)" },
  { name: "Tax Owed", category: "tax", owner: "A", hint: "Any outstanding tax liability to HMRC" },
  { name: "Overdraft", category: "loan", owner: "A", hint: "Arranged or unarranged overdraft balance" },
];

function StepAssets({ advancedMode }: { advancedMode: boolean }) {
  const { assets, liabilities, addAsset, updateAsset, removeAsset, addLiability, updateLiability, removeLiability } = useAppStore();
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [editingLiability, setEditingLiability] = useState<Liability | null>(null);
  const [assetDialogOpen, setAssetDialogOpen] = useState(false);
  const [liabilityDialogOpen, setLiabilityDialogOpen] = useState(false);

  const [assetForm, setAssetForm] = useState({ name: "", currentValue: 0, category: "cash" as string, owner: "joint" as string });
  const [liabilityForm, setLiabilityForm] = useState({ name: "", balance: 0, category: "loan" as string, owner: "joint" as string });

  const nonHomeAssets = assets.filter(a => a.category !== "primary_home" && a.category !== "pension");
  const nonMortgageLiabilities = liabilities.filter(l => l.category !== "mortgage");

  const openAddAsset = (suggestion?: typeof ASSET_SUGGESTIONS[0]) => {
    setEditingAsset(null);
    if (suggestion) {
      setAssetForm({ name: suggestion.name, currentValue: 0, category: suggestion.category, owner: suggestion.owner });
    } else {
      setAssetForm({ name: "", currentValue: 0, category: "cash", owner: "joint" });
    }
    setAssetDialogOpen(true);
  };

  const openEditAsset = (a: Asset) => {
    setEditingAsset(a);
    setAssetForm({ name: a.name, currentValue: a.currentValue, category: a.category, owner: a.owner });
    setAssetDialogOpen(true);
  };

  const saveAsset = () => {
    if (!assetForm.name) return;
    if (editingAsset) {
      updateAsset(editingAsset.id, assetForm);
    } else {
      addAsset({ ...assetForm, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 });
    }
    setAssetDialogOpen(false);
  };

  const openAddLiability = (suggestion?: typeof DEBT_SUGGESTIONS[0]) => {
    setEditingLiability(null);
    if (suggestion) {
      setLiabilityForm({ name: suggestion.name, balance: 0, category: suggestion.category, owner: suggestion.owner });
    } else {
      setLiabilityForm({ name: "", balance: 0, category: "loan", owner: "joint" });
    }
    setLiabilityDialogOpen(true);
  };

  const openEditLiability = (l: Liability) => {
    setEditingLiability(l);
    setLiabilityForm({ name: l.name, balance: l.balance, category: l.category, owner: l.owner });
    setLiabilityDialogOpen(true);
  };

  const saveLiability = () => {
    if (!liabilityForm.name) return;
    if (editingLiability) {
      updateLiability(editingLiability.id, liabilityForm);
    } else {
      addLiability(liabilityForm);
    }
    setLiabilityDialogOpen(false);
  };

  const addedAssetNames = new Set(nonHomeAssets.map(a => a.name));
  const unusedAssetSuggestions = ASSET_SUGGESTIONS.filter(s => !addedAssetNames.has(s.name));
  const addedDebtNames = new Set(nonMortgageLiabilities.map(l => l.name));
  const unusedDebtSuggestions = DEBT_SUGGESTIONS.filter(s => !addedDebtNames.has(s.name));

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-md space-y-2">
        <p className="text-sm font-medium">Assets beyond the family home</p>
        <p className="text-xs text-muted-foreground">
          Include all savings, investments, vehicles, business interests, and other valuable assets.
          Also add any debts besides the mortgage. These all feed into the settlement calculations.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Label className="text-base font-semibold">Savings, investments &amp; other assets</Label>
          <Button variant="outline" size="sm" onClick={() => openAddAsset()} data-testid="button-add-asset">
            <Plus className="w-4 h-4 mr-1" /> Add Custom
          </Button>
        </div>

        {nonHomeAssets.length === 0 && unusedAssetSuggestions.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
            No other assets added yet.
          </div>
        ) : nonHomeAssets.length === 0 ? null : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nonHomeAssets.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {a.owner === "joint" ? "Joint" : `Party ${a.owner}`}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(a.currentValue)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditAsset(a)}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeAsset(a.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {unusedAssetSuggestions.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Common assets to consider</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {unusedAssetSuggestions.map((s) => (
              <button
                key={s.name}
                onClick={() => openAddAsset(s)}
                className="flex items-start gap-3 p-3 text-left border rounded-md hover-elevate transition-colors"
                data-testid={`button-suggest-asset-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <Plus className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-sm font-medium">{s.name}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.hint}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <Separator />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Label className="text-base font-semibold">Other debts &amp; loans</Label>
          <Button variant="outline" size="sm" onClick={() => openAddLiability()} data-testid="button-add-liability">
            <Plus className="w-4 h-4 mr-1" /> Add Custom
          </Button>
        </div>

        {nonMortgageLiabilities.length === 0 && unusedDebtSuggestions.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
            No other debts added yet.
          </div>
        ) : nonMortgageLiabilities.length === 0 ? null : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nonMortgageLiabilities.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {l.owner === "joint" ? "Joint" : `Party ${l.owner}`}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-red-600">-{formatCurrency(l.balance)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditLiability(l)}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeLiability(l.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {unusedDebtSuggestions.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Common debts to consider</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {unusedDebtSuggestions.map((s) => (
              <button
                key={s.name}
                onClick={() => openAddLiability(s)}
                className="flex items-start gap-3 p-3 text-left border rounded-md hover-elevate transition-colors"
                data-testid={`button-suggest-debt-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <Plus className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-sm font-medium">{s.name}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.hint}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <Dialog open={assetDialogOpen} onOpenChange={setAssetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAsset ? "Edit Asset" : "Add Asset"}</DialogTitle>
            <DialogDescription>Enter the details for this asset.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={assetForm.name} onChange={(e) => setAssetForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. ISA Savings" data-testid="input-asset-name" />
            </div>
            <div className="space-y-2">
              <Label>Value (£)</Label>
              <Input type="number" value={assetForm.currentValue || ""} onChange={(e) => setAssetForm(f => ({ ...f, currentValue: parseFloat(e.target.value) || 0 }))} data-testid="input-asset-value" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={assetForm.category} onValueChange={(v) => setAssetForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {AssetCategory.options.filter(o => o !== "primary_home" && o !== "pension").map(o => (
                      <SelectItem key={o} value={o}>{o.replace(/_/g, ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Owner</Label>
                <Select value={assetForm.owner} onValueChange={(v) => setAssetForm(f => ({ ...f, owner: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joint">Joint</SelectItem>
                    <SelectItem value="A">Party A</SelectItem>
                    <SelectItem value="B">Party B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveAsset} data-testid="button-save-asset">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={liabilityDialogOpen} onOpenChange={setLiabilityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLiability ? "Edit Debt" : "Add Debt"}</DialogTitle>
            <DialogDescription>Enter the details for this debt.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={liabilityForm.name} onChange={(e) => setLiabilityForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Car Loan" data-testid="input-liability-name" />
            </div>
            <div className="space-y-2">
              <Label>Balance (£)</Label>
              <Input type="number" value={liabilityForm.balance || ""} onChange={(e) => setLiabilityForm(f => ({ ...f, balance: parseFloat(e.target.value) || 0 }))} data-testid="input-liability-balance" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={liabilityForm.category} onValueChange={(v) => setLiabilityForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LiabilityCategory.options.filter(o => o !== "mortgage").map(o => (
                      <SelectItem key={o} value={o}>{o.replace(/_/g, ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Owner</Label>
                <Select value={liabilityForm.owner} onValueChange={(v) => setLiabilityForm(f => ({ ...f, owner: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joint">Joint</SelectItem>
                    <SelectItem value="A">Party A</SelectItem>
                    <SelectItem value="B">Party B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveLiability} data-testid="button-save-liability">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const PENSION_SUGGESTIONS: { name: string; owner: string; pensionType: string; hint: string }[] = [
  { name: "Workplace Pension (A)", owner: "A", pensionType: "DC", hint: "Auto-enrolled or employer pension scheme - check your annual statement for the CETV" },
  { name: "Workplace Pension (B)", owner: "B", pensionType: "DC", hint: "Party B's employer pension - request a CETV from the scheme administrator" },
  { name: "SIPP / Private Pension", owner: "A", pensionType: "DC", hint: "Self-Invested Personal Pension - log in to your platform for the current value" },
  { name: "Final Salary Pension", owner: "A", pensionType: "DB", hint: "Defined Benefit / final salary scheme - CETV must be requested from the scheme" },
  { name: "State Pension Top-up", owner: "A", pensionType: "DC", hint: "Additional voluntary contributions to the State Pension" },
];

const INCOME_SUGGESTIONS: { name: string; owner: string; hint: string }[] = [
  { name: "Salary (A)", owner: "A", hint: "Annual gross salary before tax - check your payslip or P60" },
  { name: "Salary (B)", owner: "B", hint: "Party B's annual gross salary before tax" },
  { name: "Self-Employment", owner: "A", hint: "Net profit from self-employment (before personal tax)" },
  { name: "Rental Income", owner: "joint", hint: "Gross annual rent received from investment property" },
  { name: "Dividends", owner: "A", hint: "Annual dividend income from shares or company ownership" },
  { name: "Child Benefit", owner: "A", hint: "Annual Child Benefit received (tax-free up to income threshold)" },
  { name: "Other Benefits", owner: "A", hint: "Universal Credit, Tax Credits, or other state benefits" },
];

function StepPensions({ advancedMode }: { advancedMode: boolean }) {
  const { assets, addAsset, updateAsset, removeAsset } = useAppStore();
  const pensions = assets.filter(a => a.category === "pension");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Asset | null>(null);
  const [form, setForm] = useState({ name: "", currentValue: 0, cetv: 0, owner: "A" as string, pensionType: "DC" as string });

  const openAdd = (suggestion?: typeof PENSION_SUGGESTIONS[0]) => {
    setEditing(null);
    if (suggestion) {
      setForm({ name: suggestion.name, currentValue: 0, cetv: 0, owner: suggestion.owner, pensionType: suggestion.pensionType });
    } else {
      setForm({ name: "", currentValue: 0, cetv: 0, owner: "A", pensionType: "DC" });
    }
    setDialogOpen(true);
  };

  const openEdit = (p: Asset) => {
    setEditing(p);
    setForm({ name: p.name, currentValue: p.currentValue, cetv: p.cetv ?? p.currentValue, owner: p.owner, pensionType: p.pensionType ?? "DC" });
    setDialogOpen(true);
  };

  const save = () => {
    if (!form.name) return;
    const data = {
      name: form.name,
      category: "pension" as string,
      owner: form.owner,
      currentValue: form.currentValue,
      cetv: form.cetv || form.currentValue,
      pensionType: form.pensionType,
      liquidity: "illiquid" as string,
      saleCostPct: 0,
      taxCostPct: 0.25,
    };
    if (editing) {
      updateAsset(editing.id, data);
    } else {
      addAsset(data);
    }
    setDialogOpen(false);
  };

  const totalCETV = pensions.reduce((s, p) => s + (p.cetv ?? p.currentValue), 0);
  const addedPensionNames = new Set(pensions.map(p => p.name));
  const unusedPensionSuggestions = PENSION_SUGGESTIONS.filter(s => !addedPensionNames.has(s.name));

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-md space-y-2">
        <p className="text-sm font-medium">Pension assets</p>
        <p className="text-xs text-muted-foreground">
          Pensions are often one of the largest assets in a divorce. The key figure is the <strong>CETV</strong> (Cash Equivalent Transfer Value) 
          which represents the pension's value if it were transferred. You can find this on your annual statement or by requesting it from 
          your pension provider. Pensions are split separately from other assets.
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div>
          <Label className="text-base font-semibold">Pension plans</Label>
          {pensions.length > 0 && (
            <p className="text-sm text-muted-foreground">Total CETV: {formatCurrency(totalCETV)}</p>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={() => openAdd()} data-testid="button-add-pension">
          <Plus className="w-4 h-4 mr-1" /> Add Custom
        </Button>
      </div>

      {pensions.length === 0 && unusedPensionSuggestions.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
          <Landmark className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40" />
          No pensions added yet. If either party has a workplace or private pension, add it here.
        </div>
      ) : pensions.length === 0 ? null : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-right">CETV</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pensions.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">Party {p.owner}</Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">{formatCurrency(p.cetv ?? p.currentValue)}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeAsset(p.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {unusedPensionSuggestions.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Common pension types to consider</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {unusedPensionSuggestions.map((s) => (
              <button
                key={s.name}
                onClick={() => openAdd(s)}
                className="flex items-start gap-3 p-3 text-left border rounded-md hover-elevate transition-colors"
                data-testid={`button-suggest-pension-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <Plus className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-sm font-medium">{s.name}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.hint}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Pension" : "Add Pension"}</DialogTitle>
            <DialogDescription>Enter the pension details. The CETV (Cash Equivalent Transfer Value) is the most useful figure for comparison.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Pension name</Label>
              <Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Company Pension" data-testid="input-pension-name" />
            </div>
            <div className="space-y-2">
              <Label>CETV value (£)</Label>
              <Input type="number" value={form.cetv || ""} onChange={(e) => {
                const v = parseFloat(e.target.value) || 0;
                setForm(f => ({ ...f, cetv: v, currentValue: v }));
              }} data-testid="input-pension-cetv" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Owner</Label>
                <Select value={form.owner} onValueChange={(v) => setForm(f => ({ ...f, owner: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Party A</SelectItem>
                    <SelectItem value="B">Party B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {advancedMode && (
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={form.pensionType} onValueChange={(v) => setForm(f => ({ ...f, pensionType: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DC">Defined Contribution</SelectItem>
                      <SelectItem value="DB">Defined Benefit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={save} data-testid="button-save-pension">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const EXPENSE_SUGGESTIONS: { name: string; category: string; owner: string; hint: string }[] = [
  { name: "Rent / Housing", category: "housing", owner: "A", hint: "Include rent if you'll be moving out, or your share of housing costs" },
  { name: "Council Tax", category: "housing", owner: "A", hint: "You'll each pay your own council tax after separation" },
  { name: "Utilities (gas, electric, water)", category: "housing", owner: "A", hint: "Estimate monthly bills for your new living situation" },
  { name: "Food & Groceries", category: "living", owner: "A", hint: "Weekly shop for yourself (and children if applicable)" },
  { name: "Transport / Car", category: "transport", owner: "A", hint: "Fuel, insurance, tax, maintenance, or public transport costs" },
  { name: "Insurance (home, life)", category: "insurance", owner: "A", hint: "Contents, life, or other personal insurance" },
  { name: "Childcare", category: "child", owner: "A", hint: "Nursery, after-school clubs, or childminder costs" },
  { name: "Phone & Internet", category: "living", owner: "A", hint: "Mobile phone contract, broadband" },
  { name: "Clothing & Personal", category: "living", owner: "A", hint: "Clothing, toiletries, haircuts" },
  { name: "Leisure & Social", category: "other", owner: "A", hint: "Hobbies, eating out, subscriptions" },
];

const CATEGORY_LABELS: Record<string, string> = {
  living: "Living",
  housing: "Housing",
  child: "Children",
  debt_service: "Debt",
  insurance: "Insurance",
  transport: "Transport",
  other: "Other",
};

function StepIncome({ advancedMode }: { advancedMode: boolean }) {
  const { incomes, addIncome, updateIncome, removeIncome, assumptions, updateAssumptions } = useAppStore();
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);

  const [incomeForm, setIncomeForm] = useState({ name: "", amountAnnualGross: 0, owner: "A" as string });

  const openAddIncome = (suggestion?: typeof INCOME_SUGGESTIONS[0]) => {
    setEditingIncome(null);
    if (suggestion) {
      setIncomeForm({ name: suggestion.name, amountAnnualGross: 0, owner: suggestion.owner });
    } else {
      setIncomeForm({ name: "", amountAnnualGross: 0, owner: "A" });
    }
    setIncomeDialogOpen(true);
  };

  const openEditIncome = (i: Income) => {
    setEditingIncome(i);
    setIncomeForm({ name: i.name, amountAnnualGross: i.amountAnnualGross, owner: i.owner });
    setIncomeDialogOpen(true);
  };

  const saveIncome = () => {
    if (!incomeForm.name) return;
    if (editingIncome) {
      updateIncome(editingIncome.id, incomeForm);
    } else {
      addIncome({ ...incomeForm, taxTreatment: "use_tax_model" });
    }
    setIncomeDialogOpen(false);
  };

  const addedIncomeNames = new Set(incomes.map(i => i.name));
  const unusedIncomeSuggestions = INCOME_SUGGESTIONS.filter(s => !addedIncomeNames.has(s.name));

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-md space-y-2">
        <p className="text-sm font-medium">Income sources</p>
        <p className="text-xs text-muted-foreground">
          Add each party's income sources. Enter <strong>annual gross</strong> (before tax) amounts. 
          The model will calculate take-home pay using 2025/26 UK tax and NI rates. 
          Include all regular income: employment, self-employment, benefits, rental income, dividends, etc.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Label className="text-base font-semibold">Income sources</Label>
          <Button variant="outline" size="sm" onClick={() => openAddIncome()} data-testid="button-add-income">
            <Plus className="w-4 h-4 mr-1" /> Add Custom
          </Button>
        </div>

        {incomes.length === 0 && unusedIncomeSuggestions.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
            Add income sources for both parties.
          </div>
        ) : incomes.length === 0 ? null : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Earner</TableHead>
                <TableHead className="text-right">Annual Gross</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomes.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">{i.name}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">Party {i.owner}</Badge></TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(i.amountAnnualGross)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditIncome(i)}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeIncome(i.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {unusedIncomeSuggestions.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Common income types to consider</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {unusedIncomeSuggestions.map((s) => (
              <button
                key={s.name}
                onClick={() => openAddIncome(s)}
                className="flex items-start gap-3 p-3 text-left border rounded-md hover-elevate transition-colors"
                data-testid={`button-suggest-income-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <Plus className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-sm font-medium">{s.name}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.hint}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {advancedMode && (
        <div className="space-y-4 pt-2">
          <Separator />
          <Label className="text-sm font-medium text-muted-foreground">Override Take-Home Pay (Optional)</Label>
          <p className="text-xs text-muted-foreground">
            If you know the actual annual take-home pay (after tax, NI, and any deductions), enter it here. 
            This will replace the model's estimated net income for that party. Leave blank to use the model's calculation.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm">Party A take-home ({"\u00A3"}/year)</Label>
              <Input
                type="number"
                min={0}
                placeholder="Leave blank for model estimate"
                value={assumptions.overrideNetIncomeA ?? ""}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  updateAssumptions({ overrideNetIncomeA: isNaN(v) || v <= 0 ? null : v });
                }}
                data-testid="input-override-net-a"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Party B take-home ({"\u00A3"}/year)</Label>
              <Input
                type="number"
                min={0}
                placeholder="Leave blank for model estimate"
                value={assumptions.overrideNetIncomeB ?? ""}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  updateAssumptions({ overrideNetIncomeB: isNaN(v) || v <= 0 ? null : v });
                }}
                data-testid="input-override-net-b"
              />
            </div>
          </div>
        </div>
      )}

      <Dialog open={incomeDialogOpen} onOpenChange={setIncomeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIncome ? "Edit Income" : "Add Income"}</DialogTitle>
            <DialogDescription>Enter annual gross income details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Source name</Label>
              <Input value={incomeForm.name} onChange={(e) => setIncomeForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Salary" data-testid="input-income-name" />
            </div>
            <div className="space-y-2">
              <Label>Annual gross ({"\u00A3"})</Label>
              <Input type="number" value={incomeForm.amountAnnualGross || ""} onChange={(e) => setIncomeForm(f => ({ ...f, amountAnnualGross: parseFloat(e.target.value) || 0 }))} data-testid="input-income-amount" />
            </div>
            <div className="space-y-2">
              <Label>Earner</Label>
              <Select value={incomeForm.owner} onValueChange={(v) => setIncomeForm(f => ({ ...f, owner: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Party A</SelectItem>
                  <SelectItem value="B">Party B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveIncome} data-testid="button-save-income">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StepExpenses({ advancedMode }: { advancedMode: boolean }) {
  const { expenses, addExpense, updateExpense, removeExpense } = useAppStore();
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [expenseFrequency, setExpenseFrequency] = useState<"monthly" | "annual">("monthly");

  const [expenseForm, setExpenseForm] = useState({ name: "", amount: 0, category: "living" as string, owner: "A" as string, frequency: "monthly" as "monthly" | "annual" });

  const openAddExpense = (suggestion?: typeof EXPENSE_SUGGESTIONS[0]) => {
    setEditingExpense(null);
    if (suggestion) {
      setExpenseForm({ name: suggestion.name, amount: 0, category: suggestion.category, owner: suggestion.owner, frequency: "monthly" });
    } else {
      setExpenseForm({ name: "", amount: 0, category: "living", owner: "A", frequency: "monthly" });
    }
    setExpenseDialogOpen(true);
  };

  const openEditExpense = (e: Expense) => {
    setEditingExpense(e);
    const isMonthly = e.amountAnnual % 12 === 0;
    setExpenseForm({
      name: e.name,
      amount: isMonthly ? Math.round(e.amountAnnual / 12) : e.amountAnnual,
      category: e.category,
      owner: e.owner,
      frequency: isMonthly ? "monthly" : "annual",
    });
    setExpenseDialogOpen(true);
  };

  const saveExpense = () => {
    if (!expenseForm.name) return;
    const amountAnnual = expenseForm.frequency === "monthly" ? expenseForm.amount * 12 : expenseForm.amount;
    if (editingExpense) {
      updateExpense(editingExpense.id, { name: expenseForm.name, amountAnnual, category: expenseForm.category, owner: expenseForm.owner });
    } else {
      addExpense({ name: expenseForm.name, amountAnnual, category: expenseForm.category, owner: expenseForm.owner, inflationLinked: true });
    }
    setExpenseDialogOpen(false);
  };

  const addedNames = new Set(expenses.map(e => e.name));
  const unusedSuggestions = EXPENSE_SUGGESTIONS.filter(s => !addedNames.has(s.name));

  const totalAnnualA = expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0);
  const totalAnnualB = expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0);
  const totalShared = expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual, 0);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-md space-y-2">
        <p className="text-sm font-medium">Post-separation living costs</p>
        <p className="text-xs text-muted-foreground">
          Estimate what each person's living costs will be <strong>after separation</strong>. 
          These feed into the sustainability and runway projections, helping you see whether each scenario is affordable long-term. 
          Don't include mortgage payments here - those are calculated automatically from your home details.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <Label className="text-base font-semibold">Living expenses</Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add each party's individual post-separation expenses. Use the suggestions below as a starting point.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => openAddExpense()} data-testid="button-add-expense">
            <Plus className="w-4 h-4 mr-1" /> Add Custom
          </Button>
        </div>

        {expenses.length > 0 && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense</TableHead>
                  <TableHead>Who</TableHead>
                  <TableHead className="text-right">Monthly</TableHead>
                  <TableHead className="text-right">Annual</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{e.name}</span>
                        <Badge variant="secondary" className="text-xs">{CATEGORY_LABELS[e.category] ?? e.category}</Badge>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{e.owner === "shared" ? "Both (50/50)" : `Party ${e.owner}`}</Badge></TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">{formatCurrency(Math.round(e.amountAnnual / 12))}/mo</TableCell>
                    <TableCell className="text-right tabular-nums">{formatCurrency(e.amountAnnual)}/yr</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEditExpense(e)} data-testid={`button-edit-expense-${e.id}`}>
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => removeExpense(e.id)} data-testid={`button-remove-expense-${e.id}`}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex flex-wrap gap-4 mt-3 text-xs">
              {totalAnnualA > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Party A total:</span>
                  <span className="font-semibold">{formatCurrency(Math.round(totalAnnualA / 12))}/mo</span>
                  <span className="text-muted-foreground">({formatCurrency(totalAnnualA)}/yr)</span>
                </div>
              )}
              {totalAnnualB > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Party B total:</span>
                  <span className="font-semibold">{formatCurrency(Math.round(totalAnnualB / 12))}/mo</span>
                  <span className="text-muted-foreground">({formatCurrency(totalAnnualB)}/yr)</span>
                </div>
              )}
              {totalShared > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Both (split equally):</span>
                  <span className="font-semibold">{formatCurrency(Math.round(totalShared / 12))}/mo</span>
                  <span className="text-muted-foreground">({formatCurrency(Math.round(totalShared / 24))}/mo each)</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {unusedSuggestions.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Common expenses to consider</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {unusedSuggestions.map((s) => (
              <button
                key={s.name}
                onClick={() => openAddExpense(s)}
                className="flex items-start gap-3 p-3 text-left border rounded-md hover-elevate transition-colors group"
                data-testid={`button-suggest-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <Plus className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-sm font-medium">{s.name}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.hint}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {expenses.length === 0 && unusedSuggestions.length === 0 && (
        <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
          Add post-separation living expenses to model sustainability.
        </div>
      )}

      <Dialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingExpense ? "Edit Expense" : "Add Expense"}</DialogTitle>
            <DialogDescription>Enter your estimated post-separation cost. You can enter monthly or annual amounts.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Expense name</Label>
              <Input value={expenseForm.name} onChange={(e) => setExpenseForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Rent, Council Tax" data-testid="input-expense-name" />
            </div>
            <div className="space-y-2">
              <Label>Amount ({"\u00A3"})</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={expenseForm.amount || ""}
                  onChange={(e) => setExpenseForm(f => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
                  placeholder={expenseForm.frequency === "monthly" ? "e.g. 850" : "e.g. 10200"}
                  className="flex-1"
                  data-testid="input-expense-amount"
                />
                <Select value={expenseForm.frequency} onValueChange={(v: "monthly" | "annual") => setExpenseForm(f => ({ ...f, frequency: v }))}>
                  <SelectTrigger className="w-[120px]" data-testid="select-expense-frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">per month</SelectItem>
                    <SelectItem value="annual">per year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {expenseForm.amount > 0 && (
                <p className="text-xs text-muted-foreground">
                  = {expenseForm.frequency === "monthly"
                    ? `${formatCurrency(expenseForm.amount * 12)} per year`
                    : `${formatCurrency(Math.round(expenseForm.amount / 12))} per month`}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={expenseForm.category} onValueChange={(v) => setExpenseForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                      <SelectItem key={val} value={val}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Who pays?</Label>
                <Select value={expenseForm.owner} onValueChange={(v) => setExpenseForm(f => ({ ...f, owner: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Party A</SelectItem>
                    <SelectItem value="B">Party B</SelectItem>
                    <SelectItem value="shared">Both (split equally)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Most post-separation costs should be assigned to one party. Use "Both" only for genuinely shared costs like joint childcare.</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveExpense} data-testid="button-save-expense">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StepSupport({ advancedMode }: { advancedMode: boolean }) {
  const { assumptions, updateAssumptions } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          If there are children, the UK's Child Maintenance Service (CMS) formula estimates a weekly maintenance figure.
          This is factored into the sustainability projections if enabled.
        </p>

        <div className="flex items-center gap-3">
          <Switch
            checked={assumptions.includeCMSEstimate}
            onCheckedChange={(v) => updateAssumptions({ includeCMSEstimate: v })}
            data-testid="switch-cms-support"
          />
          <Label>Include child maintenance estimate in projections</Label>
        </div>

        {assumptions.includeCMSEstimate && (
          <div className="space-y-3 p-4 bg-muted/30 rounded-md">
            <Label className="text-sm font-medium">Override Child Maintenance Amount (Optional)</Label>
            <p className="text-xs text-muted-foreground">
              If you have a private arrangement or know your actual CMS assessment, enter it here.
              Leave blank to use the model's CMS formula estimate.
            </p>
            <div className="space-y-2">
              <Label className="text-sm">Annual child maintenance ({"\u00A3"}/year)</Label>
              <Input
                type="number"
                min={0}
                placeholder="Leave blank for CMS formula estimate"
                value={assumptions.overrideCMSAnnual ?? ""}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  updateAssumptions({ overrideCMSAnnual: isNaN(v) || v <= 0 ? null : v });
                }}
                data-testid="input-override-cms"
              />
            </div>
          </div>
        )}
      </div>

      {advancedMode && (
        <div className="space-y-4 pt-2">
          <Separator />
          <Label className="text-sm font-medium text-muted-foreground">Advanced: Cost Assumptions</Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm">Mortgage APR (%)</Label>
              <Input
                type="number"
                step={0.25}
                value={(assumptions.mortgageAPR * 100).toFixed(2)}
                onChange={(e) => updateAssumptions({ mortgageAPR: parseFloat(e.target.value) / 100 || 0.05 })}
                data-testid="input-mortgage-apr"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Mortgage term (years)</Label>
              <Input
                type="number"
                min={5}
                max={40}
                value={assumptions.mortgageTermYears}
                onChange={(e) => updateAssumptions({ mortgageTermYears: parseInt(e.target.value) || 25 })}
                data-testid="input-mortgage-term"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepAssumptions() {
  const { assumptions, updateAssumptions } = useAppStore();

  const setPreset = (split: number, pension: number) => {
    updateAssumptions({ splitRatio: split, splitPensionToA: pension });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-semibold">How should assets be divided?</Label>
        <p className="text-sm text-muted-foreground">
          Use the sliders below to explore different split ratios. The results on the next page will update based on these assumptions.
        </p>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={assumptions.splitRatio === 0.5 && assumptions.splitPensionToA === 0.5 ? "default" : "outline"}
            size="sm"
            onClick={() => setPreset(0.5, 0.5)}
            data-testid="button-preset-equal"
          >
            Equal (50/50)
          </Button>
          <Button
            variant={assumptions.splitRatio === 0.6 && assumptions.splitPensionToA === 0.6 ? "default" : "outline"}
            size="sm"
            onClick={() => setPreset(0.6, 0.6)}
            data-testid="button-preset-needs"
          >
            Needs tilt (60/40)
          </Button>
          <Button
            variant={assumptions.splitRatio === 0.7 && assumptions.splitPensionToA === 0.7 ? "default" : "outline"}
            size="sm"
            onClick={() => setPreset(0.7, 0.7)}
            data-testid="button-preset-strong"
          >
            Strong tilt (70/30)
          </Button>
          <Button
            variant={assumptions.splitRatio === 0.8 && assumptions.splitPensionToA === 0.8 ? "default" : "outline"}
            size="sm"
            onClick={() => setPreset(0.8, 0.8)}
            data-testid="button-preset-heavy"
          >
            Heavy tilt (80/20)
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm">Overall asset split (A : B)</Label>
        <Slider
          value={[assumptions.splitRatio * 100]}
          onValueChange={([v]) => updateAssumptions({ splitRatio: v / 100 })}
          min={10}
          max={90}
          step={5}
          data-testid="slider-split-ratio"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Party A: {Math.round(assumptions.splitRatio * 100)}%</span>
          <span className="text-muted-foreground">Party B: {Math.round((1 - assumptions.splitRatio) * 100)}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm">Pension split (A : B)</Label>
        <Slider
          value={[assumptions.splitPensionToA * 100]}
          onValueChange={([v]) => updateAssumptions({ splitPensionToA: v / 100 })}
          min={0}
          max={100}
          step={5}
          data-testid="slider-pension-split"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Party A: {Math.round(assumptions.splitPensionToA * 100)}%</span>
          <span className="text-muted-foreground">Party B: {Math.round((1 - assumptions.splitPensionToA) * 100)}%</span>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm">Projection years</Label>
          <Input
            type="number"
            min={1}
            max={30}
            value={assumptions.projectionYears}
            onChange={(e) => updateAssumptions({ projectionYears: parseInt(e.target.value) || 5 })}
            data-testid="input-projection-years"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Growth / inflation rate (%)</Label>
          <Input
            type="number"
            step={0.5}
            value={(assumptions.inflationRate * 100).toFixed(1)}
            onChange={(e) => updateAssumptions({ inflationRate: parseFloat(e.target.value) / 100 || 0.02 })}
            data-testid="input-inflation-rate"
          />
        </div>
      </div>
    </div>
  );
}
