import { useState, useCallback, useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
import { formatCurrency, scrollTop, cn } from "@/lib/utils";
import {
  ChevronLeft, ChevronRight, ChevronDown, Heart, Home, Wallet, Landmark,
  Briefcase, Calculator, Plus, Trash2, Edit2, Check, Settings2,
  Shield, Users, TrendingUp, ArrowRight, Receipt, SearchCheck
} from "lucide-react";
import { useAccess } from "@/hooks/use-access";
import { LivePoolConsole, MobilePoolChip } from "@/components/wizard/live-pool-console";
import { StageInsightCard } from "@/components/wizard/stage-insight-card";
import { SmartExpenseChips } from "@/components/wizard/smart-expense-chips";
import { StepIncomeEmployment } from "@/components/wizard/step-income-employment";
import { StepSavingsDebts } from "@/components/wizard/step-savings-debts";
import { PensionQuickAdd } from "@/components/wizard/pension-quick-add";
import { WizardPartySelector } from "@/components/wizard/wizard-party-selector";
import { useInlineConfirm, InlineConfirm } from "@/components/wizard/inline-confirm";
import { WizardStepIllustration, getWizardConcept } from "@/components/section-illustration";

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
    prompt: "See what your situation could leave you with — privately, before you talk to anyone.",
    reassurance: "No solicitor needed to start. Enter rough figures and the model shows your position in plain English. Best estimates are fine throughout."
  },
  {
    prompt: "These details shape what your share could look like across property, pensions and capital.",
    reassurance: "Take it step by step — a rough sense of your situation is all you need. You can refine figures as you go."
  },
  {
    prompt: "The family home is usually the largest asset — and a big part of what you could receive or keep.",
    reassurance: "A rough figure is fine here — Rightmove, Zoopla, or a recent estate agent's view works. Estimates get you most of the way before any formal valuation."
  },
  {
    prompt: "Savings, investments and debts all count towards what is in the pot to divide.",
    reassurance: "Don't worry about precision — bank statements or rough figures work well. The model shows how each asset affects your share across scenarios."
  },
  {
    prompt: "Pensions are often the most valuable asset — and the easiest to overlook when asking 'what will I get?'",
    reassurance: "If you have a recent pension statement, the Cash Equivalent Transfer Value (CETV) is the number to use. Estimates are fine if you don't have it to hand."
  },
  {
    prompt: "Income drives whether any split is actually liveable — not just what looks fair on paper.",
    reassurance: "Enter gross (before tax) income — the model calculates take-home automatically using 2026/27 UK tax rates. Rough figures still produce meaningful results."
  },
  {
    prompt: "Monthly costs show whether the outcome leaves you enough to live on — the question behind 'how much will I get?'",
    reassurance: "Best estimates are completely fine here. These figures tell the model whether each settlement scenario leaves you covering your bills long-term."
  },
  {
    prompt: "Child maintenance assumptions — if relevant to your situation.",
    reassurance: "Child maintenance is estimated using the standard CMS formula based on your income figures. These are indicative — not a formal CMS calculation."
  },
  {
    prompt: "Your full picture is ready — see what your figures could leave you with.",
    reassurance: "The preview shows your share across scenarios for free. Unlock the £79 Settlement Reality Check Report when you want to see what each option could leave you with — plus the source-backed preparation guide and questions to raise before agreeing."
  },
];

const WIZARD_INTENTS = [
  {
    value: "first_private_view",
    label: "I want to see what I will get",
    hint: "Model your share across the house, pensions and monthly costs before anyone else weighs in.",
  },
  {
    value: "offer_check",
    label: "I need to check an offer",
    hint: "Model what a proposed split could leave each person with.",
  },
  {
    value: "fair_split",
    label: "I want to test 50/50 or another split",
    hint: "Check whether a percentage leaves both sides with workable outcomes.",
  },
  {
    value: "house_split",
    label: "I am worried about the house",
    hint: "Focus on equity, buyout pressure and affordability.",
  },
  {
    value: "children_housing",
    label: "Children and housing are my main concern",
    hint: "Check housing pressure, childcare context and monthly affordability.",
  },
  {
    value: "pension_impact",
    label: "I need to understand pensions",
    hint: "Check whether pension value changes the settlement picture.",
  },
  {
    value: "income_gap",
    label: "One of us earns much less",
    hint: "See how income imbalance affects cashflow and sustainability.",
  },
  {
    value: "debt_pressure",
    label: "I am worried debts will distort the split",
    hint: "Include loans, cards and liabilities before comparing outcomes.",
  },
  {
    value: "protect_position",
    label: "I want to protect my position",
    hint: "Look for pressure points, missing value and long-term risk.",
  },
];

const WIZARD_INTENT_ALIASES: Record<string, string> = {
  asset_split: "protect_position",
  settlement: "fair_split",
  mortgage_affordability: "house_split",
  buyout: "house_split",
};

function normaliseWizardIntent(intent: string | null) {
  if (!intent) return "";
  return WIZARD_INTENT_ALIASES[intent] ?? intent;
}

const INTENT_STEP_COPY: Record<string, Partial<Record<number, { prompt: string; reassurance: string }>>> = {
  offer_check: {
    0: {
      prompt: "Let's check what that settlement offer could really leave you with.",
      reassurance: "Enter the offer as assumptions later in the wizard. The calculator helps you understand pressure points before you respond.",
    },
    2: {
      prompt: "The house usually decides whether an offer feels possible or risky.",
      reassurance: "Use the best property and mortgage figures you have. The offer check will test sale, keep-home and buyout pressure against your assumptions.",
    },
    8: {
      prompt: "Set the split assumptions to mirror the offer you want to check.",
      reassurance: "The results will not tell you whether to accept. They show what the offer may leave each person with and which questions to raise.",
    },
  },
  fair_split: {
    0: {
      prompt: "Let's see what your share could look like — across the house, pensions, savings and monthly costs.",
      reassurance: "You do not need a solicitor to start. The calculator shows what different splits could leave you with before you negotiate or accept an offer.",
    },
    8: {
      prompt: "Use these sliders to test 50/50, 60/40 or the split you want to compare.",
      reassurance: "The next screen shows what each option could leave you with — capital, pension, cashflow and monthly pressure side by side.",
    },
  },
  house_split: {
    0: {
      prompt: "Let's see whether the house can realistically work in the settlement.",
      reassurance: "We will focus on equity, buyout pressure, mortgage affordability and cash reserves.",
    },
    2: {
      prompt: "This is the key step for house split and buyout pressure.",
      reassurance: "A current estimate is enough to start. The model uses property value, mortgage balance and sale costs to test the house scenarios.",
    },
    8: {
      prompt: "Review the house and split assumptions before the affordability check.",
      reassurance: "The results will compare sale versus keep-home outcomes and show where mortgage pressure may appear.",
    },
  },
  children_housing: {
    0: {
      prompt: "Let's check the financial picture around children and housing.",
      reassurance: "We will model housing, income, expenses and child maintenance assumptions as financial inputs, not legal advice about child arrangements.",
    },
    2: {
      prompt: "Housing is usually the pressure point when children are involved.",
      reassurance: "Add the property and mortgage details so the model can compare sale, keep-home and affordability pressure.",
    },
    7: {
      prompt: "Add child maintenance assumptions if they are relevant.",
      reassurance: "The model uses these figures for cashflow only. It is not a formal CMS assessment or legal advice.",
    },
    8: {
      prompt: "Review the assumptions before checking housing and monthly pressure.",
      reassurance: "The results will show whether each scenario appears workable month to month under the figures entered.",
    },
  },
  pension_impact: {
    0: {
      prompt: "Let's check whether pensions change the settlement picture.",
      reassurance: "If you do not have exact CETV figures yet, add estimates and refine later.",
    },
    4: {
      prompt: "Pension values can change what looks fair on paper.",
      reassurance: "Enter CETV figures where possible so the model can compare pension sharing and offset pressure.",
    },
    8: {
      prompt: "Review the pension split separately from the asset split.",
      reassurance: "This helps you see whether a property-heavy settlement hides a weaker pension outcome.",
    },
  },
  income_gap: {
    0: {
      prompt: "Let's check how the income gap changes the settlement picture.",
      reassurance: "Income, career breaks and monthly costs often decide whether a split is liveable after separation.",
    },
    5: {
      prompt: "This is the key step for income imbalance.",
      reassurance: "Enter gross income for each person. The model estimates take-home pay and compares monthly pressure across scenarios.",
    },
    6: {
      prompt: "Living costs show whether the lower-income side is left short.",
      reassurance: "Best estimates are fine. These numbers power the monthly surplus and resilience checks.",
    },
    8: {
      prompt: "Review assumptions before testing income-gap pressure.",
      reassurance: "The results will compare capital and monthly sustainability, not just headline asset percentages.",
    },
  },
  debt_pressure: {
    0: {
      prompt: "Let's include debts before comparing any split.",
      reassurance: "Debt can make a settlement that looks balanced on paper feel very different month to month.",
    },
    3: {
      prompt: "Add debts, loans and credit cards so they are not missed.",
      reassurance: "The model will show how liabilities affect the asset pool and each party's financial position.",
    },
    8: {
      prompt: "Review the debt and split assumptions before the reality check.",
      reassurance: "The results will help identify where liabilities create cashflow or reserve pressure.",
    },
  },
  protect_position: {
    0: {
      prompt: "Let's see what your position looks like before you agree — or respond to an offer without the full picture.",
      reassurance: "No solicitor needed to start. The model organises your numbers and shows what could leave you short across property, pensions and monthly costs.",
    },
    3: {
      prompt: "This is where missing value often shows up.",
      reassurance: "Add savings, investments and debts as best you can. The report can then flag gaps and pressure points to discuss.",
    },
    8: {
      prompt: "Review the assumptions for missing value and left-short risk.",
      reassurance: "The results will help you check cashflow, pensions, debts and property pressure before professional conversations.",
    },
  },
};

function getStepCopy(step: number, intent?: string) {
  return INTENT_STEP_COPY[intent || ""]?.[step] ?? STEP_COPY[step];
}

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
  const reduced = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);
  const [midJourneyEmailDismissed, setMidJourneyEmailDismissed] = useState(false);
  const [showMidJourneyEmail, setShowMidJourneyEmail] = useState(false);
  const [interstitial, setInterstitial] = useState<null | "afterAssets" | "afterIncome">(null);
  const [seenInterstitial, setSeenInterstitial] = useState<{ afterAssets: boolean; afterIncome: boolean }>({ afterAssets: false, afterIncome: false });
  const [, setLocation] = useLocation();
  const { hasAccess } = useAccess();
  const calculationIntent = useAppStore((s) => s.profile.calculationIntent);

  const progress = ((currentStep) / (STEPS.length - 1)) * 100;
  const stepCopy = getStepCopy(currentStep, calculationIntent);

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
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-slate-100 via-[#eef3f9] to-[#f4f7fb]">
      <div className="bg-[hsl(220_52%_10%)] text-white/65 px-4 py-1.5 text-xs text-center font-medium" data-testid="text-disclaimer">
        Illustrative modelling only <span className="text-gold/50 mx-1">·</span> Not legal, tax or financial advice
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
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
                            ? `${STEP_META[stepIdx].dotBg} ${STEP_META[stepIdx].dotBorder} text-white ring-2 ring-offset-1 ring-offset-white ring-current`
                            : "border-slate-300/60 text-muted-foreground/50 bg-white"
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

        </div>

        {/* Mobile: coloured step progression */}
        <div className="md:hidden px-3 pb-2.5 bg-white border-b border-slate-100" data-testid="wizard-mobile-stepper">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${STEP_META[currentStep].pillText}`}>
              {currentStep === 0
                ? "Getting started"
                : WIZARD_STAGES.find((s) => s.steps.includes(currentStep))?.label ?? STEP_META[currentStep].category}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground tabular-nums">
              {currentStep === 0 ? "Start" : `Step ${currentStep} of ${STEPS.length - 1}`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {STEPS.map((_, stepIdx) => (
              <button
                key={stepIdx}
                type="button"
                onClick={() => { scrollTop(); setCurrentStep(stepIdx); }}
                data-testid={`stepper-mobile-segment-${stepIdx}`}
                className="flex-1 min-w-0 p-0"
                aria-label={`Go to step ${stepIdx}: ${STEPS[stepIdx].title}`}
              >
                <div
                  className={`h-2.5 w-full rounded-full transition-all duration-300 ${
                    stepIdx < currentStep
                      ? STEP_META[stepIdx].dotBg
                      : stepIdx === currentStep
                        ? `${STEP_META[stepIdx].dotBg} ring-2 ring-offset-1 ring-offset-white ring-slate-300`
                        : "bg-slate-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <Progress value={progress} className={`h-2 md:h-1.5 rounded-none transition-all duration-500 ${STEP_META[currentStep].progressBar}`} data-testid="progress-bar" />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">
            {(() => {
              const meta = STEP_META[currentStep];
              const StepIcon = meta.icon;
              const concept = getWizardConcept(currentStep);

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
                <div className="relative">
                  <div className="relative z-10">
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
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground" data-testid="text-step-title">
                          {STEPS[currentStep].title}
                        </h1>
                        <p className="text-muted-foreground mt-1" data-testid="text-step-prompt">
                          {stepCopy.prompt}
                        </p>
                      </div>
                      {!interstitial && (
                        <motion.div
                          key={currentStep}
                          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: reduced ? 0 : 0.35 }}
                          className="shrink-0"
                        >
                          <WizardStepIllustration concept={concept} />
                        </motion.div>
                      )}
                    </div>
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

                  <Card className={`mb-5 border-t-4 ${meta.borderTop} overflow-hidden bg-white border border-slate-200/80 rounded-xl shadow-lg shadow-primary/[0.06]`}>
                    <CardContent className="pt-6">
                      <StepContent step={currentStep} />
                    </CardContent>
                  </Card>

                  <div className={`p-3.5 bg-white/85 rounded-lg text-sm text-muted-foreground mb-6 flex items-start gap-2 border border-slate-200/70 shadow-sm border-l-4 ${meta.shieldBorder}`}>
                    <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground/60" />
                    <span>
                      {stepCopy.reassurance}
                      <span className="block mt-1 text-xs text-foreground/70">
                        Report focus: {concept.reportHook}
                      </span>
                    </span>
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
                  </div>
                </div>
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

function OptionalRefinements({
  title = "Optional refinements",
  hint,
  children,
  testId,
}: {
  title?: string;
  hint?: string;
  children: ReactNode;
  testId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-md border border-border/60 bg-muted/20" data-testid={testId}>
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm hover:bg-muted/40 transition-colors"
        onClick={() => setOpen(!open)}
        data-testid={`button-toggle-${testId}`}
      >
        <div>
          <span className="font-medium text-foreground">{title}</span>
          {hint && !open && (
            <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-3 space-y-4 border-t border-border/40">
          {children}
        </div>
      )}
    </div>
  );
}

function StepContent({ step }: { step: number }) {
  switch (step) {
    case 0: return <StepWelcome />;
    case 1: return <StepSituation />;
    case 2: return <StepHome />;
    case 3: return <StepSavingsDebts />;
    case 4: return <StepPensions />;
    case 5: return <StepIncomeEmployment />;
    case 6: return <SmartExpenseChips />;
    case 7: return <StepSupport />;
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
  const selectedIntent = WIZARD_INTENTS.find((intent) => intent.value === profile.calculationIntent);

  useEffect(() => {
    if (profile.calculationIntent) return;
    try {
      const homepageIntent = sessionStorage.getItem("dfm-homepage-intent");
      if (homepageIntent) {
        const normalisedIntent = normaliseWizardIntent(homepageIntent);
        updateProfile({
          calculationIntent: normalisedIntent,
          offerStatus: normalisedIntent === "offer_check" ? "received" : profile.offerStatus,
        });
      }
    } catch {
      // Ignore storage access failures in private browsing modes.
    }
  }, [profile.calculationIntent, profile.offerStatus, updateProfile]);

  return (
    <div className="space-y-5">
      <div className="relative rounded-xl bg-gradient-to-br from-primary/[0.07] via-primary/[0.03] to-gold/[0.05] border border-primary/10 p-5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%)",
          backgroundSize: "16px 16px"
        }} />
        <div className="relative">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground leading-snug mb-1.5">
            Let's build your financial picture.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            Answer a few questions — calculations stay private in your browser.
          </p>
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground/70">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-500" /> Private</span>
            <span className="flex items-center gap-1.5"><Calculator className="w-3.5 h-3.5 text-cyan-500" /> Estimates OK</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-gold" /> ~5 min</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="wizard-intent" className="font-medium flex items-center gap-1.5">
          <SearchCheck className="w-3.5 h-3.5 text-primary" />
          What are you trying to check today?
        </Label>
        <Select
          value={profile.calculationIntent || ""}
          onValueChange={(value) =>
            updateProfile({
              calculationIntent: value,
              offerStatus: value === "offer_check" ? "received" : profile.offerStatus,
            })
          }
        >
          <SelectTrigger
            id="wizard-intent"
            className={cn(
              "h-11 text-left border-2 transition-all duration-200",
              profile.calculationIntent
                ? "border-gold/50 bg-gradient-to-br from-gold/[0.09] via-white to-primary/[0.05] shadow-[0_0_0_1px_rgba(201,168,76,0.12)] font-medium text-foreground"
                : "border-dashed border-primary/35 hover:border-primary/55 hover:bg-primary/[0.03]",
            )}
            data-testid="select-wizard-intent"
          >
            <SelectValue placeholder="Choose your main concern…" />
          </SelectTrigger>
          <SelectContent className="p-1.5 border-primary/20 shadow-xl shadow-primary/10 max-h-[min(26rem,var(--radix-select-content-available-height))]">
            {WIZARD_INTENTS.map((intent) => (
              <SelectItem
                key={intent.value}
                value={intent.value}
                textValue={intent.label}
                data-testid={`select-intent-option-${intent.value}`}
                className={cn(
                  "my-0.5 cursor-pointer rounded-lg border border-transparent py-2 pl-9 pr-3",
                  "transition-all duration-150",
                  "data-[highlighted]:border-primary/25 data-[highlighted]:bg-primary/[0.06] data-[highlighted]:shadow-sm",
                  "data-[state=checked]:border-gold/45 data-[state=checked]:bg-gold/[0.08] data-[state=checked]:shadow-[0_0_0_1px_rgba(201,168,76,0.2)]",
                  "focus:bg-primary/[0.06]",
                )}
              >
                <span className="flex flex-col gap-0.5 py-0.5 text-left">
                  <span className="text-sm font-semibold leading-snug text-foreground">{intent.label}</span>
                  <span className="text-[11px] font-normal leading-snug text-muted-foreground">{intent.hint}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedIntent ? (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {selectedIntent.hint} We tailor prompts around this — calculations stay the same.
          </p>
        ) : (
          <p className="text-xs text-muted-foreground leading-relaxed">
            Not sure? Pick the closest match. You can still enter all figures and compare every scenario.
          </p>
        )}
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
        </div>
        <div className="space-y-2">
          <Label className="font-medium">Other party</Label>
          <Input
            value={profile.partyBName}
            onChange={(e) => updateProfile({ partyBName: e.target.value })}
            placeholder="e.g. Taylor"
            className="text-base h-11"
            data-testid="input-party-b-name"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="font-medium text-sm">
            Where are you in the process? <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Select
            value={profile.processStage || "none"}
            onValueChange={(v) => updateProfile({ processStage: v === "none" ? "" : v })}
          >
            <SelectTrigger className="h-10" data-testid="select-process-stage">
              <SelectValue placeholder="Select stage…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Not specified</SelectItem>
              {PROCESS_STAGES.map((stage) => (
                <SelectItem key={stage.value} value={stage.value} data-testid={`select-stage-option-${stage.value}`}>
                  {stage.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="font-medium text-sm">
            What matters most? <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Select
            value={profile.mainPriority || "none"}
            onValueChange={(v) => updateProfile({ mainPriority: v === "none" ? "" : v })}
          >
            <SelectTrigger className="h-10" data-testid="select-main-priority">
              <SelectValue placeholder="Select priority…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Not specified</SelectItem>
              {MAIN_PRIORITIES.map((priority) => (
                <SelectItem key={priority.value} value={priority.value} data-testid={`select-priority-option-${priority.value}`}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <Label className="text-sm font-medium">
          Save progress by email <span className="text-muted-foreground text-xs font-normal">(optional)</span>
        </Label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={profile.capturedEmail || ""}
          onChange={(e) => updateProfile({ capturedEmail: e.target.value })}
          data-testid="input-wizard-email"
          className="max-w-sm h-10"
        />
      </div>
    </div>
  );
}

function StepSituation() {
  const { children, updateChildren, assumptions, updateAssumptions, profile } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-3 rounded-md bg-primary/5 border border-primary/10" data-testid="callout-privacy-step1">
        <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Your privacy is protected.</span> All core calculations happen privately in your browser. If you choose to generate the Settlement Reality Check Report later, only selected de-identified model figures are securely processed — no names, addresses or contact details are included.
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

      <OptionalRefinements
        testId="refinements-situation"
        hint="Tax modelling settings"
      >
        <div className="flex items-center gap-3">
          <Switch
            checked={assumptions.includeTaxModel}
            onCheckedChange={(v) => updateAssumptions({ includeTaxModel: v })}
            data-testid="switch-tax-model"
          />
          <Label className="text-sm">Include UK tax/NI calculations</Label>
        </div>
      </OptionalRefinements>
    </div>
  );
}

function StepHome() {
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
            <p className="text-xs text-muted-foreground">Includes estimated estate agent and legal fees. Expand optional refinements below to adjust.</p>
          </div>
        );
      })()}

      <OptionalRefinements
        testId="refinements-home"
        hint="Ownership and sale costs"
      >
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
      </OptionalRefinements>
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

function StepPensions() {
  const { assets, addAsset, updateAsset, removeAsset, profile } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";
  const pensions = assets.filter(a => a.category === "pension");
  const pensionConfirm = useInlineConfirm();
  const [activeOwner, setActiveOwner] = useState<"A" | "B">("A");

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

      <WizardPartySelector
        owners={["A", "B"]}
        activeOwner={activeOwner}
        onChange={setActiveOwner}
        nameA={nameA}
        nameB={nameB}
        testIdPrefix="pension"
      />

      <PensionQuickAdd owner={activeOwner} onOwnerChange={setActiveOwner} />

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

const UK_EXPENSE_BENCHMARKS = [
  { name: "Council Tax", category: "housing", monthly: 160 },
  { name: "Utilities", category: "housing", monthly: 220 },
  { name: "Food & Groceries", category: "living", monthly: 325 },
  { name: "Transport", category: "transport", monthly: 225 },
  { name: "Phone & Internet", category: "living", monthly: 80 },
  { name: "Insurance", category: "insurance", monthly: 90 },
  { name: "Clothing & Personal", category: "living", monthly: 140 },
  { name: "Emergency / Miscellaneous", category: "other", monthly: 150 },
];

const UK_CHILD_EXPENSE_BENCHMARKS = [
  { name: "Children's Food & Clothing", category: "child", monthly: 175 },
  { name: "School / Activities", category: "child", monthly: 125 },
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


function StepExpenses() {
  const { expenses, addExpense, updateExpense, removeExpense, profile, children } = useAppStore();
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

  const applyBenchmarkExpenses = (owner: "A" | "B") => {
    const existingNames = new Set(
      expenses
        .filter((expense) => expense.owner === owner)
        .map((expense) => expense.name.toLowerCase())
    );
    const benchmarks = [
      ...UK_EXPENSE_BENCHMARKS,
      ...(children.numChildren > 0 ? UK_CHILD_EXPENSE_BENCHMARKS : []),
    ];
    benchmarks.forEach((benchmark) => {
      const name = `${benchmark.name} (starting estimate)`;
      if (existingNames.has(name.toLowerCase())) return;
      addExpense({
        name,
        amountAnnual: benchmark.monthly * 12,
        category: benchmark.category,
        owner,
        inflationLinked: true,
      });
    });
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

      <div className="rounded-lg border border-gold/25 bg-gold/10 p-4 space-y-4" data-testid="card-expense-benchmarks">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">We want your results to be realistic, not falsely reassuring.</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Leaving expenses at £0 can make your position look stronger than it really is. If you do not have exact figures yet, use these typical UK starting figures now, then return anytime to replace them with your own costs.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            className="bg-white"
            onClick={() => applyBenchmarkExpenses("A")}
            data-testid="button-apply-benchmark-a"
          >
            Use starting figures for {nameA}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="bg-white"
            onClick={() => applyBenchmarkExpenses("B")}
            data-testid="button-apply-benchmark-b"
          >
            Use starting figures for {nameB}
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          These are broad editable estimates, not official budgeting guidance. Housing/mortgage payments are handled elsewhere in the model.
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

      {expenses.length === 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900" data-testid="warning-no-expenses">
          <p className="font-medium">No living costs are added yet.</p>
          <p className="text-xs leading-relaxed mt-1">
            You can continue, but the results may look more comfortable than real life. Add your own costs, or use the starting figures above so the first model is more reliable.
          </p>
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

function StepSupport() {
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

      <OptionalRefinements
        testId="refinements-support"
        hint="Mortgage rate and term assumptions"
      >
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
      </OptionalRefinements>
    </div>
  );
}

function StepAssumptions() {
  const { assumptions, updateAssumptions, profile, updateProfile } = useAppStore();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";
  const isOfferCheck = profile.calculationIntent === "offer_check" || profile.offerStatus === "received";

  const setPreset = (split: number, pension: number) => {
    updateAssumptions({ splitRatio: split, splitPensionToA: pension });
  };

  return (
    <div className="space-y-6">
      <div className={`rounded-lg border p-4 space-y-3 ${
        isOfferCheck ? "bg-gold/10 border-gold/30" : "bg-muted/30 border-border/50"
      }`} data-testid="card-offer-check-pathway">
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            isOfferCheck ? "bg-gold/15 text-gold" : "bg-background text-muted-foreground"
          }`}>
            <SearchCheck className="w-4 h-4" />
          </div>
          <div className="space-y-2 flex-1">
            <div>
              <p className="text-sm font-semibold">Settlement offer check</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                If you have been given a proposal, set the sliders below to mirror the offer as closely as possible. The next screen will show what that assumption may leave each person with across property, pensions, cashflow and mortgage pressure.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={isOfferCheck ? "default" : "outline"}
                onClick={() => updateProfile({ calculationIntent: "offer_check", offerStatus: "received" })}
                data-testid="button-offer-check-mode"
              >
                I have an offer to check
              </Button>
              <Button
                size="sm"
                variant={!isOfferCheck ? "default" : "outline"}
                onClick={() => updateProfile({ offerStatus: "", calculationIntent: profile.calculationIntent === "offer_check" ? "" : profile.calculationIntent })}
                data-testid="button-exploring-mode"
              >
                I am exploring options
              </Button>
            </div>
            {isOfferCheck && (
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                This is a modelling view only. It does not decide whether the offer is fair, tell you what to accept, or predict a court outcome.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">How should assets be divided?</Label>
        <p className="text-sm text-muted-foreground">
          Use the sliders below to explore different split ratios. If you are checking an offer, set these as close as possible to the proposed property, asset and pension split.
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
