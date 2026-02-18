import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useAppStore, Asset, Liability, Income, Expense } from "@/hooks/use-store";
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
  Shield, Users, TrendingUp, ArrowRight
} from "lucide-react";

const STEPS = [
  { id: 0, title: "Welcome", icon: Heart },
  { id: 1, title: "Your Situation", icon: Users },
  { id: 2, title: "Home", icon: Home },
  { id: 3, title: "Assets & Debts", icon: Wallet },
  { id: 4, title: "Pensions", icon: Landmark },
  { id: 5, title: "Income", icon: Briefcase },
  { id: 6, title: "Costs & Support", icon: Calculator },
  { id: 7, title: "Results", icon: TrendingUp },
];

const STEP_COPY = [
  {
    prompt: "Let's get you some clarity",
    reassurance: "This tool helps you explore different financial settlement options. All calculations happen in your browser \u2014 your data stays private. Take your time, and use your best estimates where you're unsure."
  },
  {
    prompt: "Tell us about your situation",
    reassurance: "We just need a few basics to get started. You can always come back and change these later."
  },
  {
    prompt: "Your family home",
    reassurance: "The family home is often the biggest asset. A rough value is fine \u2014 you can refine it later."
  },
  {
    prompt: "Other assets and debts",
    reassurance: "Include savings, investments, vehicles, and any debts. Don't worry if you're not sure of exact figures \u2014 best estimates work well."
  },
  {
    prompt: "Pensions",
    reassurance: "Pensions can be a significant part of the overall picture. If you have a recent statement, the 'Cash Equivalent Transfer Value' (CETV) is the most useful figure."
  },
  {
    prompt: "Income and monthly reality",
    reassurance: "Understanding take-home pay and living costs helps model whether each scenario is sustainable long-term."
  },
  {
    prompt: "One-off costs and support",
    reassurance: "If there are children or any anticipated one-off costs, include them here. These feed into the sustainability projections."
  },
  {
    prompt: "Your results",
    reassurance: "Here's how different settlement options compare. You can adjust the split ratios and explore different scenarios."
  },
];

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [, setLocation] = useLocation();

  const progress = ((currentStep) / (STEPS.length - 1)) * 100;

  const goNext = useCallback(() => {
    if (currentStep === STEPS.length - 1) {
      setLocation("/results");
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
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-bold tracking-tight hidden sm:inline-block">
              DivorceModeller<span className="text-primary">.UK</span>
            </span>
          </div>

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
    case 6: return <StepSupport advancedMode={advancedMode} />;
    case 7: return <StepAssumptions />;
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
          <div className="grid gap-4 sm:grid-cols-2 p-4 bg-muted/30 rounded-md">
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

  const openAddAsset = () => {
    setEditingAsset(null);
    setAssetForm({ name: "", currentValue: 0, category: "cash", owner: "joint" });
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

  const openAddLiability = () => {
    setEditingLiability(null);
    setLiabilityForm({ name: "", balance: 0, category: "loan", owner: "joint" });
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

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Label className="text-base font-semibold">Savings, investments &amp; other assets</Label>
          <Button variant="outline" size="sm" onClick={openAddAsset} data-testid="button-add-asset">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>

        {nonHomeAssets.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
            No other assets added yet.
          </div>
        ) : (
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

      <Separator />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Label className="text-base font-semibold">Other debts &amp; loans</Label>
          <Button variant="outline" size="sm" onClick={openAddLiability} data-testid="button-add-liability">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>

        {nonMortgageLiabilities.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
            No other debts added yet.
          </div>
        ) : (
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

function StepPensions({ advancedMode }: { advancedMode: boolean }) {
  const { assets, addAsset, updateAsset, removeAsset } = useAppStore();
  const pensions = assets.filter(a => a.category === "pension");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Asset | null>(null);
  const [form, setForm] = useState({ name: "", currentValue: 0, cetv: 0, owner: "A" as string, pensionType: "DC" as string });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", currentValue: 0, cetv: 0, owner: "A", pensionType: "DC" });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <Label className="text-base font-semibold">Pension plans</Label>
          {pensions.length > 0 && (
            <p className="text-sm text-muted-foreground">Total CETV: {formatCurrency(totalCETV)}</p>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={openAdd} data-testid="button-add-pension">
          <Plus className="w-4 h-4 mr-1" /> Add Pension
        </Button>
      </div>

      {pensions.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
          <Landmark className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40" />
          No pensions added yet. If either party has a workplace or private pension, add it here.
        </div>
      ) : (
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

function StepIncome({ advancedMode }: { advancedMode: boolean }) {
  const { incomes, expenses, addIncome, updateIncome, removeIncome, addExpense, updateExpense, removeExpense } = useAppStore();
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const [incomeForm, setIncomeForm] = useState({ name: "", amountAnnualGross: 0, owner: "A" as string });
  const [expenseForm, setExpenseForm] = useState({ name: "", amountAnnual: 0, category: "living" as string, owner: "shared" as string });

  const openAddIncome = () => {
    setEditingIncome(null);
    setIncomeForm({ name: "", amountAnnualGross: 0, owner: "A" });
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

  const openAddExpense = () => {
    setEditingExpense(null);
    setExpenseForm({ name: "", amountAnnual: 0, category: "living", owner: "shared" });
    setExpenseDialogOpen(true);
  };

  const openEditExpense = (e: Expense) => {
    setEditingExpense(e);
    setExpenseForm({ name: e.name, amountAnnual: e.amountAnnual, category: e.category, owner: e.owner });
    setExpenseDialogOpen(true);
  };

  const saveExpense = () => {
    if (!expenseForm.name) return;
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseForm);
    } else {
      addExpense({ ...expenseForm, inflationLinked: true });
    }
    setExpenseDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Label className="text-base font-semibold">Income sources</Label>
          <Button variant="outline" size="sm" onClick={openAddIncome} data-testid="button-add-income">
            <Plus className="w-4 h-4 mr-1" /> Add Income
          </Button>
        </div>

        {incomes.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
            Add income sources for both parties.
          </div>
        ) : (
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

      <Separator />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Label className="text-base font-semibold">Monthly / annual expenses</Label>
          <Button variant="outline" size="sm" onClick={openAddExpense} data-testid="button-add-expense">
            <Plus className="w-4 h-4 mr-1" /> Add Expense
          </Button>
        </div>

        {expenses.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
            Add living expenses to model post-separation sustainability.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expense</TableHead>
                <TableHead>Who pays</TableHead>
                <TableHead className="text-right">Annual</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{e.owner === "shared" ? "Shared" : `Party ${e.owner}`}</Badge></TableCell>
                  <TableCell className="text-right tabular-nums text-red-600">-{formatCurrency(e.amountAnnual)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditExpense(e)}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeExpense(e.id)}>
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
              <Label>Annual gross (£)</Label>
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

      <Dialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingExpense ? "Edit Expense" : "Add Expense"}</DialogTitle>
            <DialogDescription>Enter annual expense details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Expense name</Label>
              <Input value={expenseForm.name} onChange={(e) => setExpenseForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Rent" data-testid="input-expense-name" />
            </div>
            <div className="space-y-2">
              <Label>Annual amount (£)</Label>
              <Input type="number" value={expenseForm.amountAnnual || ""} onChange={(e) => setExpenseForm(f => ({ ...f, amountAnnual: parseFloat(e.target.value) || 0 }))} data-testid="input-expense-amount" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={expenseForm.category} onValueChange={(v) => setExpenseForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ExpenseCategory.options.map(o => (
                      <SelectItem key={o} value={o}>{o.replace(/_/g, ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Who pays?</Label>
                <Select value={expenseForm.owner} onValueChange={(v) => setExpenseForm(f => ({ ...f, owner: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shared">Shared</SelectItem>
                    <SelectItem value="A">Party A</SelectItem>
                    <SelectItem value="B">Party B</SelectItem>
                  </SelectContent>
                </Select>
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
            Equal split (50/50)
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
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm">Overall asset split (A : B)</Label>
        <Slider
          value={[assumptions.splitRatio * 100]}
          onValueChange={([v]) => updateAssumptions({ splitRatio: v / 100 })}
          min={30}
          max={70}
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
