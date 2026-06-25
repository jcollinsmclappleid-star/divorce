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
import { formatCurrency, scrollTop } from "@/lib/utils";
import {
  ChevronLeft, ChevronRight, Heart, Home, Wallet, Landmark,
  Briefcase, Calculator, Plus, Trash2, Edit2, Check, Settings2,
  Shield, Users, TrendingUp, ArrowRight, Receipt
} from "lucide-react";
import { useAccess } from "@/hooks/use-access";
import { LivePoolConsole, MobilePoolChip } from "@/components/wizard/live-pool-console";
import { StageInsightCard } from "@/components/wizard/stage-insight-card";
import { SmartExpenseChips } from "@/components/wizard/smart-expense-chips";
import { IncomeAssumptionChips } from "@/components/wizard/income-assumption-chips";
import { useInlineConfirm, InlineConfirm } from "@/components/wizard/inline-confirm";

const STEPS = [
  { id: 0, title: "Welcome", icon: Heart },
  { id: 1, title: "About Your Situation", icon: Users },
  { id: 2, title: "Property & Mortgage", icon: Home },
  { id: 3, title: "Savings & Debts", icon: Wallet },
  { id: 4, title: "Pension Provision", icon: Landmark },
  { id: 5, title: "Income & Employment", icon: Briefcase },
  { id: 6, title: "Monthly Expenses", icon: Receipt },
  { id: 7, title: "Children & Support", icon: Calculator },
  { id: 8, title: "Your model is ready", icon: TrendingUp },
];

const STEP_META = [
  { category: "Welcome",  icon: Heart,      pillBg: "bg-cyan-100",    pillText: "text-cyan-700",    borderTop: "border-t-cyan-400",    dotBg: "bg-cyan-500",    dotBorder: "border-cyan-500",    shieldBorder: "border-l-cyan-300",    progressBar: "[&>div]:bg-cyan-500" },
  { category: "Profile",  icon: Users,      pillBg: "bg-violet-100",  pillText: "text-violet-700",  borderTop: "border-t-violet-400",  dotBg: "bg-violet-500",  dotBorder: "border-violet-500",  shieldBorder: "border-l-violet-300",  progressBar: "[&>div]:bg-violet-500" },
  { category: "Property", icon: Home,       pillBg: "bg-rose-100",    pillText: "text-rose-700",    borderTop: "border-t-rose-400",    dotBg: "bg-rose-500",    dotBorder: "border-rose-500",    shieldBorder: "border-l-rose-300",    progressBar: "[&>div]:bg-rose-500" },
  { category: "Assets",   icon: Wallet,     pillBg: "bg-amber-100",   pillText: "text-amber-700",   borderTop: "border-t-amber-400",   dotBg: "bg-amber-500",   dotBorder: "border-amber-500",   shieldBorder: "border-l-amber-300",   progressBar: "[&>div]:bg-amber-500" },
  { category: "Pensions", icon: Landmark,   pillBg: "bg-emerald-100", pillText: "text-emerald-700", borderTop: "border-t-emerald-400", dotBg: "bg-emerald-500", dotBorder: "border-emerald-500", shieldBorder: "border-l-emerald-300", progressBar: "[&>div]:bg-emerald-500" },
  { category: "Income",   icon: Briefcase,  pillBg: "bg-cyan-100",    pillText: "text-cyan-700",    borderTop: "border-t-cyan-400",    dotBg: "bg-cyan-500",    dotBorder: "border-cyan-500",    shieldBorder: "border-l-cyan-300",    progressBar: "[&>div]:bg-cyan-500" },
  { category: "Expenses", icon: Receipt,    pillBg: "bg-rose-100",    pillText: "text-rose-700",    borderTop: "border-t-rose-400",    dotBg: "bg-rose-500",    dotBorder: "border-rose-500",    shieldBorder: "border-l-rose-300",    progressBar: "[&>div]:bg-rose-500" },
  { category: "Children", icon: Users,      pillBg: "bg-violet-100",  pillText: "text-violet-700",  borderTop: "border-t-violet-400",  dotBg: "bg-violet-500",  dotBorder: "border-violet-500",  shieldBorder: "border-l-violet-300",  progressBar: "[&>div]:bg-violet-500" },
  { category: "Summary",  icon: TrendingUp, pillBg: "bg-emerald-100", pillText: "text-emerald-700", borderTop: "border-t-emerald-400", dotBg: "bg-emerald-500", dotBorder: "border-emerald-500", shieldBorder: "border-l-emerald-300", progressBar: "[&>div]:bg-emerald-500" },
];

const STEP_COPY = [
  {
    prompt: "Let's build your financial picture together.",
    reassurance: "All core calculations happen privately in your browser. Best estimates are fine throughout. You can refine figures as you go."
  },
  {
    prompt: "A few baseline details to shape your model.",
    reassurance: "Take it step by step — a rough sense of your situation is all you need here. You can always come back and adjust these details later."
  },
  {
    prompt: "The family home is usually the largest asset in any settlement.",
    reassurance: "A rough figure is fine here — Rightmove, Zoopla, or a recent estate agent's view works. Your solicitor will want a formal valuation later, but estimates get you 90% of the way."
  },
  {
    prompt: "Savings, investments, and any debts outside the mortgage.",
    reassurance: "Don't worry about precision — bank statements or rough figures work well. The model shows relative impact across scenarios, not an exact penny count."
  },
  {
    prompt: "Pensions are often the most valuable asset in a divorce — easy to overlook.",
    reassurance: "If you have a recent pension statement, the Cash Equivalent Transfer Value (CETV) is the number to use. Estimates are fine if you don't have it to hand."
  },
  {
    prompt: "Income figures power the sustainability calculations.",
    reassurance: "Enter gross (before tax) income — the model calculates take-home automatically using 2026/27 UK tax rates. Rough figures still produce meaningful results."
  },
  {
    prompt: "Monthly costs after separation — the key to knowing if each option is liveable.",
    reassurance: "Best estimates are completely fine here. These figures tell the model whether each settlement scenario leaves you covering your bills long-term."
  },
  {
    prompt: "Child maintenance assumptions — if relevant to your situation.",
    reassurance: "Child maintenance is estimated using the standard CMS formula based on your income figures. These are indicative — not a formal CMS calculation."
  },
  {
    prompt: "Everything's in place — review your assumptions below.",
    reassurance: "Take a moment to check the figures look right. When you're ready, your full financial picture is one click away."
  },
];

const WIZARD_STAGES = [
  { label: "Your Assets", steps: [1, 2, 3], stageNum: 1 },
  { label: "Your Income", steps: [4, 5], stageNum: 2 },
  { label: "Finishing Up", steps: [6, 7, 8], stageNum: 3 },
];

function getStageForStep(step: number): number {
  for (const s of WIZARD_STAGES) {
    if (s.steps.includes(step)) return s.stageNum;
  }
  return 0;
}

export default function WizardPage() {
  useDocumentTitle("Build Your Financial Model | DivorceCalculatorUK");
  useNoIndex();
  const [currentStep, setCurrentStep] = useState(0);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [midJourneyEmailDismissed, setMidJourneyEmailDismissed] = useState(false);
  const [showMidJourneyEmail, setShowMidJourneyEmail] = useState(false);
  const [interstitial, setInterstitial] = useState<null | "afterAssets" | "afterIncome">(null);
  const [seenInterstitial, setSeenInterstitial] = useState<{ afterAssets: boolean; afterIncome: boolean }>({ afterAssets: false, afterIncome: false });
  const [, setLocation] = useLocation();
  const { hasAccess } = useAccess();

  const progress = ((currentStep) / (STEPS.length - 1)) * 100;

  const goNext = useCallback(() => {
    scrollTop();
    if (currentStep === STEPS.length - 1) {
      const { assets, profile } = useAppStore.getState();
      const capturedEmail = profile?.capturedEmail;
      if (capturedEmail && !hasAccess) {
        const assetPool = String(
          (assets || []).reduce((s, a) => s + (a.currentValue ?? 0), 0)
        );
        fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: capturedEmail, source: "wizard_preview", assetPoolSnapshot: assetPool }),
        }).catch(() => {});
      }
      setLocation(hasAccess ? "/results" : "/preview");
      return;
    }
    if (currentStep === 3 && !seenInterstitial.afterAssets) {
      setInterstitial("afterAssets");
      setSeenInterstitial((s) => ({ ...s, afterAssets: true }));
      return;
    }
    if (currentStep === 5 && !seenInterstitial.afterIncome) {
      setInterstitial("afterIncome");
      setSeenInterstitial((s) => ({ ...s, afterIncome: true }));
      return;
    }
    // Show mid-journey email at the top of step 6 once stage 2 has been seen
    if (currentStep === 5) {
      const { profile } = useAppStore.getState();
      if (!profile?.capturedEmail && !midJourneyEmailDismissed && !hasAccess) {
        setShowMidJourneyEmail(true);
      }
    }
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  }, [currentStep, setLocation, midJourneyEmailDismissed, seenInterstitial, hasAccess]);

  const continueFromInterstitial = useCallback(() => {
    scrollTop();
    // Trigger mid-journey email when leaving the income (stage 2) interstitial.
    // This mirrors the eligibility check in goNext so both progression paths
    // (interstitial-shown and interstitial-skipped) behave identically.
    if (interstitial === "afterIncome") {
      const { profile } = useAppStore.getState();
      if (!profile?.capturedEmail && !midJourneyEmailDismissed && !hasAccess) {
        setShowMidJourneyEmail(true);
      }
    }
    setInterstitial(null);
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  }, [interstitial, midJourneyEmailDismissed, hasAccess]);

  const goBack = useCallback(() => {
    scrollTop();
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

          <div className="flex-1 max-w-2xl mx-auto hidden md:flex items-start justify-center gap-6">
            {WIZARD_STAGES.map((stage) => {
              const stageComplete = stage.steps.every(s => s < currentStep);
              const stageActive = stage.steps.includes(currentStep);
              return (
                <div key={stage.stageNum} className="flex flex-col items-center gap-1 min-w-0">
                  <span className={`text-[9px] font-semibold uppercase tracking-widest whitespace-nowrap transition-colors ${
                    stageActive ? "text-primary" : stageComplete ? "text-primary/50" : "text-muted-foreground/40"
                  }`}>
                    {stage.label}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {stage.steps.map((stepIdx) => (
                      <button
                        key={stepIdx}
                        onClick={() => { scrollTop(); setCurrentStep(stepIdx); }}
                        data-testid={`stepper-step-${stepIdx}`}
                        title={STEPS[stepIdx].title}
                        className="p-0.5"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 transition-all duration-300 ${
                          stepIdx < currentStep
                            ? `${STEP_META[stepIdx].dotBg} ${STEP_META[stepIdx].dotBorder} text-white`
                            : stepIdx === currentStep
                            ? `${STEP_META[stepIdx].dotBg} ${STEP_META[stepIdx].dotBorder} text-white ring-2 ring-offset-1 ring-offset-background ring-current`
                            : "border-muted-foreground/30 text-muted-foreground/50 bg-background"
                        }`}>
                          {stepIdx < currentStep ? <Check className="w-3 h-3" /> : stepIdx}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
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
        <Progress value={progress} className={`h-1.5 rounded-none transition-all duration-500 ${STEP_META[currentStep].progressBar}`} data-testid="progress-bar" />
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">
            {(() => {
              const meta = STEP_META[currentStep];
              const StepIcon = meta.icon;

              if (interstitial) {
                return (
                  <>
                    <div className="mb-5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/15 text-[#1a3357]" data-testid="text-step-category">
                        <Check className="w-3 h-3 text-gold" />
                        Stage complete
                      </span>
                    </div>
                    <StageInsightCard stage={interstitial} onContinue={continueFromInterstitial} />
                  </>
                );
              }

              return (
                <>
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.pillBg} ${meta.pillText}`} data-testid="text-step-category">
                        <StepIcon className="w-3 h-3" />
                        {meta.category}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground lg:hidden" data-testid="text-step-progress">
                        {currentStep === 0
                          ? "Start"
                          : getStageForStep(currentStep) > 0
                            ? `Stage ${getStageForStep(currentStep)} of 3 · Step ${currentStep} of ${STEPS.length - 1}`
                            : `Step ${currentStep} of ${STEPS.length - 1}`
                        }
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground" data-testid="text-step-title">
                      {STEPS[currentStep].title}
                    </h1>
                    <p className="text-muted-foreground mt-1" data-testid="text-step-prompt">
                      {STEP_COPY[currentStep].prompt}
                    </p>
                  </div>

                  {currentStep === 6 && showMidJourneyEmail && !midJourneyEmailDismissed && (
                    <div className="mb-5">
                      <MidJourneyEmailCard
                        onDismiss={() => {
                          setMidJourneyEmailDismissed(true);
                          setShowMidJourneyEmail(false);
                        }}
                      />
                    </div>
                  )}

                  <Card className={`mb-5 border-t-4 ${meta.borderTop} overflow-hidden`}>
                    <CardContent className="pt-6">
                      <StepContent step={currentStep} advancedMode={advancedMode} />
                    </CardContent>
                  </Card>

                  <div className={`p-3 bg-muted/40 rounded-md text-sm text-muted-foreground mb-6 flex items-start gap-2 border-l-4 ${meta.shieldBorder}`}>
                    <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground/60" />
                    <span>{STEP_COPY[currentStep].reassurance}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 pb-20 lg:pb-0">
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
                      disabled={false}
                      data-testid="button-continue"
                      className="bg-gold hover:bg-gold/90 text-white border-0 shadow-md shadow-gold/20 btn-shimmer"
                    >
                      {currentStep === STEPS.length - 1
                        ? "Show me my results"
                        : currentStep === 0
                        ? "Let's begin"
                        : "Continue"
                      }
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Reserve sidebar slot from the start to prevent layout jump when it appears at step 2 */}
          {!interstitial && currentStep >= 2 ? (
            <>
              <LivePoolConsole currentStep={currentStep} stages={WIZARD_STAGES} />
              <MobilePoolChip currentStep={currentStep} stages={WIZARD_STAGES} />
            </>
          ) : (
            <div className="hidden lg:block w-[280px] shrink-0" aria-hidden />
          )}
        </div>
      </main>
    </div>
  );
}

function MidJourneyEmailCard({ onDismiss }: { onDismiss: () => void }) {
  const { profile, updateProfile } = useAppStore();
  const [email, setEmail] = useState(profile.capturedEmail || "");
  const [submitted, setSubmitted] = useState(false);

  const handleSave = () => {
    if (!email || !email.includes("@")) return;
    updateProfile({ capturedEmail: email });
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "wizard_midpoint" }),
    }).catch(() => {});
    setSubmitted(true);
    setTimeout(onDismiss, 1800);
  };

  return (
    <div className="mb-5 rounded-lg border border-cyan-200 bg-cyan-50/60 dark:border-cyan-900 dark:bg-cyan-950/30 p-4" data-testid="card-midjourney-email">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {submitted ? (
            <p className="text-sm text-cyan-700 font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Saved — we'll email your progress link.
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold text-foreground mb-0.5">Want to save your progress?</p>
              <p className="text-xs text-muted-foreground mb-3">We'll email your figures so you can return to this exactly where you left off. Completely optional.</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm h-8 max-w-xs"
                  data-testid="input-midjourney-email"
                />
                <Button size="sm" onClick={handleSave} className="h-8 bg-cyan-600 hover:bg-cyan-700 text-white border-0 shrink-0" data-testid="button-midjourney-save">
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-muted-foreground/50 hover:text-muted-foreground shrink-0 mt-0.5"
          aria-label="Dismiss"
          data-testid="button-midjourney-dismiss"
        >
          ✕
        </button>
      </div>
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
    case 6: return <SmartExpenseChips advancedMode={advancedMode} />;
    case 7: return <StepSupport advancedMode={advancedMode} />;
    case 8: return <StepAssumptions />;
    default: return null;
  }
}

const PROCESS_STAGES = [
  { value: "early_thinking", label: "Just starting to think about it" },
  { value: "in_discussions", label: "Currently in discussions" },
  { value: "mediation", label: "In mediation" },
  { value: "legal", label: "Working with a solicitor" },
  { value: "court", label: "Awaiting a court date" },
];

const MAIN_PRIORITIES = [
  { value: "understand_options", label: "Understanding what I might receive" },
  { value: "keep_home", label: "Whether I can keep the home" },
  { value: "protect_future", label: "Protecting my long-term finances" },
  { value: "children", label: "Making sure the children are provided for" },
  { value: "move_on", label: "Moving on as quickly as possible" },
];

function StepWelcome() {
  const { profile, updateProfile } = useAppStore();

  return (
    <div className="space-y-7">
      <div className="relative rounded-xl bg-gradient-to-br from-primary/[0.07] via-primary/[0.03] to-gold/[0.05] border border-primary/10 p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%)",
          backgroundSize: "16px 16px"
        }} />
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-snug mb-2">
            Let's build your financial picture.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            Answer a few questions about your situation. All core calculations happen privately in your browser.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground/70">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-500" /> Privately calculated</span>
            <span className="flex items-center gap-1.5"><Calculator className="w-3.5 h-3.5 text-cyan-500" /> Best estimates are fine</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-gold" /> Under 5 minutes</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="font-medium">Your first name</Label>
          <Input
            value={profile.partyAName}
            onChange={(e) => updateProfile({ partyAName: e.target.value })}
            placeholder="e.g. Alex"
            className="text-base h-11"
            data-testid="input-party-a-name"
          />
          <p className="text-xs text-muted-foreground">Used to personalise your model</p>
        </div>
        <div className="space-y-2">
          <Label className="font-medium">What shall we call the other party?</Label>
          <Input
            value={profile.partyBName}
            onChange={(e) => updateProfile({ partyBName: e.target.value })}
            placeholder="e.g. My ex, Sarah, My husband"
            className="text-base h-11"
            data-testid="input-party-b-name"
          />
          <p className="text-xs text-muted-foreground">A name or description — whatever feels right</p>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="font-medium flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          Where are you in the process? <span className="text-muted-foreground text-xs font-normal">(optional)</span>
        </Label>
        <div className="flex flex-wrap gap-2">
          {PROCESS_STAGES.map((stage) => (
            <button
              key={stage.value}
              type="button"
              onClick={() => updateProfile({ processStage: profile.processStage === stage.value ? "" : stage.value })}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                profile.processStage === stage.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
              data-testid={`button-stage-${stage.value}`}
            >
              {stage.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="font-medium flex items-center gap-1.5">
          What matters most to you right now? <span className="text-muted-foreground text-xs font-normal">(optional)</span>
        </Label>
        <div className="flex flex-wrap gap-2">
          {MAIN_PRIORITIES.map((priority) => (
            <button
              key={priority.value}
              type="button"
              onClick={() => updateProfile({ mainPriority: profile.mainPriority === priority.value ? "" : priority.value })}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                profile.mainPriority === priority.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
              data-testid={`button-priority-${priority.value}`}
            >
              {priority.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-t pt-5">
        <Label className="text-sm font-medium flex items-center gap-1.5">
          Save your progress by email <span className="text-muted-foreground text-xs font-normal">(optional)</span>
        </Label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={profile.capturedEmail || ""}
          onChange={(e) => updateProfile({ capturedEmail: e.target.value })}
          data-testid="input-wizard-email"
          className="max-w-sm"
        />
        <p className="text-xs text-muted-foreground">
          We'll email your combined pool total when you reach the preview. No spam, no account needed.
        </p>
      </div>
    </div>
  );
}

function StepSituation({ advancedMode }: { advancedMode: boolean }) {
  const { children, updateChildren, assumptions, updateAssumptions, profile } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-3 rounded-md bg-primary/5 border border-primary/10" data-testid="callout-privacy-step1">
        <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Your privacy is protected.</span> All core calculations happen privately in your browser. If you choose to generate the Guided Intelligence Report later, only selected de-identified model figures are securely processed — no names, addresses or contact details are included.
        </p>
      </div>
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
                  onChange={(e) => { const v = parseInt(e.target.value); updateChildren({ numChildren: isNaN(v) || v < 1 ? 1 : v }); }}
                  data-testid="input-num-children"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Nights per year with {nameA}</Label>
                <Input
                  type="number"
                  min={0}
                  max={365}
                  value={children.nightsWithA || ""}
                  onChange={(e) => {
                    const n = parseInt(e.target.value);
                    const nights = isNaN(n) ? 0 : Math.max(0, Math.min(365, n));
                    updateChildren({ nightsWithA: nights, nightsWithB: Math.max(0, 365 - nights) });
                  }}
                  data-testid="input-nights-a"
                />
                <p className="text-xs text-muted-foreground">{children.nightsWithB} nights with {nameB}</p>
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
                      value={age || ""}
                      onChange={(e) => {
                        const newAges = [...(children.childAges || [])];
                        const v = parseInt(e.target.value);
                        newAges[i] = isNaN(v) ? 0 : Math.max(0, Math.min(18, v));
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
  const { assets, liabilities, addAsset, updateAsset, addLiability, updateLiability, profile } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";
  const home = assets.find(a => a.category === "primary_home");
  const mortgage = liabilities.find(l => l.category === "mortgage");
  const homeConfirm = useInlineConfirm();
  const mortgageConfirm = useInlineConfirm();

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
            value={home?.currentValue || ""}
            onChange={(e) => { const v = parseFloat(e.target.value); setHomeValue(isNaN(v) ? 0 : v); }}
            onBlur={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v > 0) homeConfirm.flash(`Saved — ${formatCurrency(v)} home value`); }}
            placeholder="e.g. 350000"
            data-testid="input-home-value"
          />
        </div>
        <InlineConfirm message={homeConfirm.message} />
        <p className="text-xs text-muted-foreground">Check Zoopla or Rightmove for a rough estimate.</p>
      </div>

      <div className="space-y-2">
        <Label>Outstanding mortgage balance</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">£</span>
          <Input
            type="number"
            className="pl-7"
            value={mortgage?.balance || ""}
            onChange={(e) => { const v = parseFloat(e.target.value); setMortgageBalance(isNaN(v) ? 0 : v); }}
            onBlur={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v >= 0 && (home?.currentValue ?? 0) > 0) { const eq = Math.max(0, (home?.currentValue ?? 0) - v); mortgageConfirm.flash(`Saved — that's about ${formatCurrency(eq)} equity before sale costs`); } }}
            placeholder="e.g. 180000"
            data-testid="input-mortgage-balance"
          />
        </div>
        <InlineConfirm message={mortgageConfirm.message} />
      </div>

      {(home || mortgage) && (() => {
        const homeVal = home?.currentValue ?? 0;
        const mortgageVal = mortgage?.balance ?? 0;
        const grossEquity = homeVal - mortgageVal;
        const saleCostPct = home?.saleCostPct ?? 0.03;
        const saleCosts = homeVal * saleCostPct;
        const netEquity = Math.max(0, grossEquity - saleCosts);
        return (
          <div className="p-4 bg-muted/30 rounded-md space-y-2">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">Gross equity</span>
              <span className="font-medium">{formatCurrency(grossEquity)}</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">Est. sale costs ({(saleCostPct * 100).toFixed(1)}%)</span>
              <span className="font-medium text-rose-500">−{formatCurrency(saleCosts)}</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm border-t border-border/50 pt-2">
              <span className="text-muted-foreground font-medium">Net sale equity</span>
              <span className="font-bold text-lg">{formatCurrency(netEquity)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Includes estimated estate agent and legal fees. Adjustable in advanced mode.</p>
          </div>
        );
      })()}

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
                  <SelectItem value="A">{nameA}</SelectItem>
                  <SelectItem value="B">{nameB}</SelectItem>
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
  { name: "ISA (A)", category: "investments", owner: "A", hint: "Party A's Individual Savings Account — check your latest statement for the current value" },
  { name: "ISA (B)", category: "investments", owner: "B", hint: "Party B's Individual Savings Account — check their latest statement for the current value" },
  { name: "Stocks & Shares (A)", category: "investments", owner: "A", hint: "Party A's share portfolios or investment platforms (e.g. Hargreaves Lansdown, Vanguard)" },
  { name: "Stocks & Shares (B)", category: "investments", owner: "B", hint: "Party B's share portfolios or investment platforms" },
  { name: "Premium Bonds", category: "cash", owner: "joint", hint: "Check your NS&I account for the current holding" },
  { name: "Buy-to-Let Property", category: "other_property", owner: "joint", hint: "Investment or rental property — use current market value estimate" },
  { name: "Business Interest (A)", category: "business", owner: "A", hint: "Party A's share of a business — use the most recent valuation or accountant's estimate" },
  { name: "Business Interest (B)", category: "business", owner: "B", hint: "Party B's share of a business — use the most recent valuation or accountant's estimate" },
  { name: "Vehicle (A)", category: "vehicle", owner: "A", hint: "Party A's car, motorbike or other vehicle — use a trade-in or private sale value" },
  { name: "Vehicle (B)", category: "vehicle", owner: "B", hint: "Party B's car, motorbike or other vehicle — use a trade-in or private sale value" },
  { name: "Valuables / Jewellery", category: "personal_possessions", owner: "joint", hint: "High-value items such as jewellery, art, antiques or collections" },
];

const DEBT_SUGGESTIONS: { name: string; category: string; owner: string; hint: string }[] = [
  { name: "Credit Card (A)", category: "credit_card", owner: "A", hint: "Party A's outstanding credit card balance" },
  { name: "Credit Card (B)", category: "credit_card", owner: "B", hint: "Party B's outstanding credit card balance" },
  { name: "Personal Loan", category: "loan", owner: "joint", hint: "Bank or building society personal loan" },
  { name: "Car Finance (A)", category: "loan", owner: "A", hint: "Party A's HP, PCP or other vehicle finance agreement" },
  { name: "Car Finance (B)", category: "loan", owner: "B", hint: "Party B's HP, PCP or other vehicle finance agreement" },
  { name: "Student Loan (A)", category: "loan", owner: "A", hint: "Party A's student loan balance (Plan 1, 2, or postgrad)" },
  { name: "Student Loan (B)", category: "loan", owner: "B", hint: "Party B's student loan balance (Plan 1, 2, or postgrad)" },
  { name: "Tax Owed", category: "tax", owner: "A", hint: "Any outstanding tax liability to HMRC" },
  { name: "Overdraft (A)", category: "loan", owner: "A", hint: "Party A's arranged or unarranged overdraft balance" },
  { name: "Overdraft (B)", category: "loan", owner: "B", hint: "Party B's arranged or unarranged overdraft balance" },
];

function StepAssets({ advancedMode }: { advancedMode: boolean }) {
  const assetConfirm = useInlineConfirm();
  const liabilityConfirm = useInlineConfirm();
  const { assets, liabilities, addAsset, updateAsset, removeAsset, addLiability, updateLiability, removeLiability, profile } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";
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

  const unusedAssetSuggestions = ASSET_SUGGESTIONS;
  const unusedDebtSuggestions = DEBT_SUGGESTIONS;

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
              <Input type="number" value={assetForm.currentValue || ""} onChange={(e) => { const v = parseFloat(e.target.value); setAssetForm(f => ({ ...f, currentValue: isNaN(v) ? 0 : v })); }} onBlur={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v > 0) assetConfirm.flash(`Looks good — ${formatCurrency(v)} recorded`); }} data-testid="input-asset-value" />
              <InlineConfirm message={assetConfirm.message} />
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
                    <SelectItem value="A">{nameA}</SelectItem>
                    <SelectItem value="B">{nameB}</SelectItem>
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
              <Input type="number" value={liabilityForm.balance || ""} onChange={(e) => { const v = parseFloat(e.target.value); setLiabilityForm(f => ({ ...f, balance: isNaN(v) ? 0 : v })); }} onBlur={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v > 0) liabilityConfirm.flash(`Saved — ${formatCurrency(v)} debt recorded`); }} data-testid="input-liability-balance" />
              <InlineConfirm message={liabilityConfirm.message} />
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
                    <SelectItem value="A">{nameA}</SelectItem>
                    <SelectItem value="B">{nameB}</SelectItem>
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
  { name: "Salary (A)", owner: "A", hint: "Annual gross salary before tax — check your payslip or P60" },
  { name: "Salary (B)", owner: "B", hint: "Party B's annual gross salary before tax" },
  { name: "Self-Employment (A)", owner: "A", hint: "Net profit from self-employment (before personal tax)" },
  { name: "Self-Employment (B)", owner: "B", hint: "Party B's net profit from self-employment (before personal tax)" },
  { name: "Rental Income (A)", owner: "A", hint: "Gross annual rent received — use the figure before mortgage costs" },
  { name: "Rental Income (B)", owner: "B", hint: "Party B's gross annual rental income from investment property" },
  { name: "Dividends (A)", owner: "A", hint: "Annual dividend income from shares or company ownership" },
  { name: "Dividends (B)", owner: "B", hint: "Party B's annual dividend income" },
  { name: "Child Benefit", owner: "A", hint: "Annual Child Benefit received (tax-free up to income threshold)" },
  { name: "Other Benefits", owner: "A", hint: "Universal Credit, Tax Credits, or other state benefits" },
];

function StepPensions({ advancedMode }: { advancedMode: boolean }) {
  const { assets, addAsset, updateAsset, removeAsset, profile } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";
  const pensions = assets.filter(a => a.category === "pension");
  const pensionConfirm = useInlineConfirm();

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
  const unusedPensionSuggestions = PENSION_SUGGESTIONS;

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
                const v = parseFloat(e.target.value);
                const val = isNaN(v) ? 0 : v;
                setForm(f => ({ ...f, cetv: val, currentValue: val }));
              }} onBlur={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v > 0) pensionConfirm.flash(`Saved — ${formatCurrency(v)} CETV recorded`); }} data-testid="input-pension-cetv" />
              <InlineConfirm message={pensionConfirm.message} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Owner</Label>
                <Select value={form.owner} onValueChange={(v) => setForm(f => ({ ...f, owner: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">{nameA}</SelectItem>
                    <SelectItem value="B">{nameB}</SelectItem>
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
  const { incomes, addIncome, updateIncome, removeIncome, assumptions, updateAssumptions, profile, maintenance, updateMaintenance } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const incomeConfirm = useInlineConfirm();

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

  const unusedIncomeSuggestions = INCOME_SUGGESTIONS;

  return (
    <div className="space-y-6">
      <IncomeAssumptionChips />

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
              <Label className="text-sm">{nameA} take-home ({"\u00A3"}/year)</Label>
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
              <Label className="text-sm">{nameB} take-home ({"\u00A3"}/year)</Label>
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

      <div className="space-y-3 pt-2">
        <Separator />
        <div className="space-y-2">
          <Label className="text-sm font-medium">Spousal maintenance</Label>
          <p className="text-xs text-muted-foreground">If one party is likely to pay the other ongoing maintenance, include an estimate here. This affects the monthly surplus/deficit figures in your analysis.</p>
          <div className="flex items-center gap-3">
            <Switch
              checked={maintenance?.included ?? false}
              onCheckedChange={(v) => updateMaintenance({ included: v })}
              data-testid="switch-maintenance"
            />
            <Label className="text-sm">Is spousal maintenance likely to be part of this settlement?</Label>
          </div>
        </div>
        {maintenance?.included && (
          <div className="space-y-3 p-4 bg-muted/30 rounded-md">
            <div className="space-y-2">
              <Label className="text-sm">Estimated monthly maintenance amount (£)</Label>
              <p className="text-xs text-muted-foreground">If you're unsure, use a rough estimate — you can re-run the model at any time.</p>
              <Input
                type="number"
                min={0}
                value={maintenance.monthlyAmount || ""}
                onChange={(e) => { const v = parseFloat(e.target.value); updateMaintenance({ monthlyAmount: isNaN(v) ? 0 : v }); }}
                data-testid="input-maintenance-amount"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Direction of payment</Label>
              <Select
                value={maintenance.direction}
                onValueChange={(v: "AtoB" | "BtoA") => updateMaintenance({ direction: v })}
              >
                <SelectTrigger data-testid="select-maintenance-direction">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AtoB">{nameA} pays {nameB}</SelectItem>
                  <SelectItem value="BtoA">{nameB} pays {nameA}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
              <Label>Annual gross ({"\u00A3"})</Label>
              <Input type="number" value={incomeForm.amountAnnualGross || ""} onChange={(e) => { const v = parseFloat(e.target.value); setIncomeForm(f => ({ ...f, amountAnnualGross: isNaN(v) ? 0 : v })); }} onBlur={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v > 0) incomeConfirm.flash(`Saved — ${formatCurrency(Math.round(v / 12))}/mo gross before tax`); }} data-testid="input-income-amount" />
              <InlineConfirm message={incomeConfirm.message} />
            </div>
            <div className="space-y-2">
              <Label>Earner</Label>
              <Select value={incomeForm.owner} onValueChange={(v) => setIncomeForm(f => ({ ...f, owner: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">{nameA}</SelectItem>
                  <SelectItem value="B">{nameB}</SelectItem>
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
  const { expenses, addExpense, updateExpense, removeExpense, profile } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";
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
                  <span className="text-muted-foreground">{nameA} total:</span>
                  <span className="font-semibold">{formatCurrency(Math.round(totalAnnualA / 12))}/mo</span>
                  <span className="text-muted-foreground">({formatCurrency(totalAnnualA)}/yr)</span>
                </div>
              )}
              {totalAnnualB > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">{nameB} total:</span>
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
                  onChange={(e) => { const v = parseFloat(e.target.value); setExpenseForm(f => ({ ...f, amount: isNaN(v) ? 0 : v })); }}
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
                    <SelectItem value="A">{nameA}</SelectItem>
                    <SelectItem value="B">{nameB}</SelectItem>
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
                onChange={(e) => { const v = parseFloat(e.target.value); updateAssumptions({ mortgageAPR: isNaN(v) ? 0.05 : v / 100 }); }}
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
  const { assumptions, updateAssumptions, profile } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";

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

      <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border/50">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Overall asset split</Label>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="text-primary">{nameA}: {Math.round(assumptions.splitRatio * 100)}%</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-foreground/70">{nameB}: {Math.round((1 - assumptions.splitRatio) * 100)}%</span>
          </div>
        </div>
        <Slider
          value={[assumptions.splitRatio * 100]}
          onValueChange={([v]) => updateAssumptions({ splitRatio: v / 100 })}
          min={10}
          max={90}
          step={5}
          data-testid="slider-split-ratio"
          className="mt-2"
        />
        <div className="flex justify-between text-[11px] text-muted-foreground/60 -mt-1">
          <span>All to {nameB}</span>
          <span>Equal</span>
          <span>All to {nameA}</span>
        </div>
      </div>

      <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border/50">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Pension split</Label>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="text-primary">{nameA}: {Math.round(assumptions.splitPensionToA * 100)}%</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-foreground/70">{nameB}: {Math.round((1 - assumptions.splitPensionToA) * 100)}%</span>
          </div>
        </div>
        <Slider
          value={[assumptions.splitPensionToA * 100]}
          onValueChange={([v]) => updateAssumptions({ splitPensionToA: v / 100 })}
          min={0}
          max={100}
          step={5}
          data-testid="slider-pension-split"
          className="mt-2"
        />
        <div className="flex justify-between text-[11px] text-muted-foreground/60 -mt-1">
          <span>All to {nameB}</span>
          <span>Equal</span>
          <span>All to {nameA}</span>
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
            onChange={(e) => { const v = parseFloat(e.target.value); updateAssumptions({ inflationRate: isNaN(v) ? 0.02 : v / 100 }); }}
            data-testid="input-inflation-rate"
          />
        </div>
      </div>

    </div>
  );
}
