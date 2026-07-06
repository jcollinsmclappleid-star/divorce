import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useSessionToken } from "@/hooks/use-access";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import { POSITION_REVIEW_BOUNDARY, PRODUCT_NAMES } from "@/lib/product-copy";
import type { ExpertReviewIntake } from "@shared/expert-review-intake";

const SITUATION_OPTIONS: { value: ExpertReviewIntake["situationStage"]; label: string }[] = [
  { value: "offer_on_table", label: "There is an offer on the table" },
  { value: "mediation_soon", label: "Mediation is booked or likely soon" },
  { value: "solicitor_instructed", label: "I have instructed a solicitor" },
  { value: "early_research", label: "Early research — no formal steps yet" },
  { value: "other", label: "Other" },
];

const PRIORITY_OPTIONS: { value: ExpertReviewIntake["topPriority"]; label: string }[] = [
  { value: "keep_house", label: "Keeping the family home" },
  { value: "protect_pension", label: "Protecting pension value" },
  { value: "monthly_cashflow", label: "Monthly cashflow after the split" },
  { value: "clean_break", label: "Achieving a clean break" },
  { value: "fair_split", label: "Fair overall split of the pot" },
];

export default function ExpertReviewIntakePage() {
  useDocumentTitle(`Position Review Intake | ${PRODUCT_NAMES.positionReview}`);
  useNoIndex();
  const sessionToken = useSessionToken();
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [eligible, setEligible] = useState(false);

  const [situationStage, setSituationStage] = useState<ExpertReviewIntake["situationStage"]>("early_research");
  const [offerOnTable, setOfferOnTable] = useState<ExpertReviewIntake["offerOnTable"]>();
  const [housingPlan, setHousingPlan] = useState<ExpertReviewIntake["housingPlan"]>();
  const [remortgageExplored, setRemortgageExplored] = useState<ExpertReviewIntake["remortgageExplored"]>();
  const [pensionDiscussed, setPensionDiscussed] = useState<ExpertReviewIntake["pensionDiscussed"]>();
  const [pensionTypes, setPensionTypes] = useState<NonNullable<ExpertReviewIntake["pensionTypes"]>>([]);
  const [incomeVariability, setIncomeVariability] = useState<ExpertReviewIntake["incomeVariability"]>();
  const [childrenArrangements, setChildrenArrangements] = useState<ExpertReviewIntake["childrenArrangements"]>();
  const [jointDebtConcern, setJointDebtConcern] = useState<ExpertReviewIntake["jointDebtConcern"]>();
  const [topPriority, setTopPriority] = useState<ExpertReviewIntake["topPriority"]>("fair_split");
  const [mainConcern, setMainConcern] = useState("");
  const [questionsBeforeAgreeing, setQuestionsBeforeAgreeing] = useState("");

  useEffect(() => {
    if (!sessionToken) {
      navigate("/recover");
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/expert-review/status/${encodeURIComponent(sessionToken)}`);
        const data = await res.json();
        if (!data.purchased) {
          navigate("/results");
          return;
        }
        if (data.intakeCompleted) {
          setSubmitted(true);
        }
        setEligible(true);
      } catch {
        navigate("/results");
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionToken, navigate]);

  function togglePensionType(value: NonNullable<ExpertReviewIntake["pensionTypes"]>[number]) {
    setPensionTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionToken) return;
    setSubmitting(true);
    try {
      const intake: ExpertReviewIntake = {
        situationStage,
        offerOnTable,
        housingPlan,
        remortgageExplored,
        pensionDiscussed,
        pensionTypes: pensionTypes.length ? pensionTypes : undefined,
        incomeVariability,
        childrenArrangements,
        jointDebtConcern,
        topPriority,
        mainConcern: mainConcern.trim() || undefined,
        questionsBeforeAgreeing: questionsBeforeAgreeing.trim() || undefined,
      };
      const res = await fetch("/api/expert-review/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken, intake }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(data.message || "Could not save intake. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!eligible) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between max-w-2xl">
          <Logo href="/" size="md" />
          <Link href="/results" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to results
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-2xl">
        {submitted ? (
          <Card data-testid="card-intake-complete">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
              <h1 className="text-xl font-semibold">Intake received</h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                Thank you. Your human-reviewed briefing will be prepared from your modelled figures and this intake — delivered by email within <strong>5 working days</strong>.
              </p>
              <Button onClick={() => navigate("/results")} data-testid="button-intake-done">
                Return to results
              </Button>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-expert-review-intake">
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-bold">{PRODUCT_NAMES.positionReview} — intake</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A few questions so your reviewer can focus on what matters most in your case. Takes about 5 minutes.
              </p>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Where are you in the process?</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={situationStage} onValueChange={(v) => setSituationStage(v as ExpertReviewIntake["situationStage"])}>
                  {SITUATION_OPTIONS.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value={opt.value} id={`sit-${opt.value}`} />
                      <Label htmlFor={`sit-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {(situationStage === "offer_on_table" || situationStage === "mediation_soon") && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Is there a specific offer to check?</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={offerOnTable ?? ""} onValueChange={(v) => setOfferOnTable(v as ExpertReviewIntake["offerOnTable"])}>
                    {[
                      { value: "yes", label: "Yes — I have figures to sense-check" },
                      { value: "considering", label: "An offer is being discussed" },
                      { value: "no", label: "Not yet" },
                    ].map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value={opt.value} id={`offer-${opt.value}`} />
                        <Label htmlFor={`offer-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Housing</CardTitle>
                <CardDescription>What are you hoping happens with the family home?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={housingPlan ?? ""} onValueChange={(v) => setHousingPlan(v as ExpertReviewIntake["housingPlan"])}>
                  {[
                    { value: "keep_home", label: "I want to keep the home" },
                    { value: "sell_home", label: "Sell and split proceeds" },
                    { value: "unsure", label: "Unsure — need to compare options" },
                    { value: "not_applicable", label: "No property in the pot" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value={opt.value} id={`house-${opt.value}`} />
                      <Label htmlFor={`house-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {housingPlan === "keep_home" && (
                  <div>
                    <Label className="text-sm mb-2 block">Have you explored remortgage / buyout affordability?</Label>
                    <RadioGroup value={remortgageExplored ?? ""} onValueChange={(v) => setRemortgageExplored(v as ExpertReviewIntake["remortgageExplored"])}>
                      {["yes", "no", "unsure"].map((v) => (
                        <div key={v} className="flex items-center space-x-2 py-1">
                          <RadioGroupItem value={v} id={`remort-${v}`} />
                          <Label htmlFor={`remort-${v}`} className="font-normal cursor-pointer capitalize">{v}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pensions & income</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">Pension types in your model (select all that apply)</Label>
                  <div className="space-y-2">
                    {[
                      { value: "defined_benefit" as const, label: "Defined benefit (final salary / career average)" },
                      { value: "defined_contribution" as const, label: "Defined contribution (personal / workplace DC)" },
                      { value: "mixed" as const, label: "Both parties have significant pensions" },
                      { value: "none" as const, label: "No pensions modelled" },
                    ].map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pen-${opt.value}`}
                          checked={pensionTypes.includes(opt.value)}
                          onCheckedChange={() => togglePensionType(opt.value)}
                        />
                        <Label htmlFor={`pen-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Has pension sharing been discussed?</Label>
                  <RadioGroup value={pensionDiscussed ?? ""} onValueChange={(v) => setPensionDiscussed(v as ExpertReviewIntake["pensionDiscussed"])}>
                    {["yes", "no", "unsure"].map((v) => (
                      <div key={v} className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value={v} id={`pen-disc-${v}`} />
                        <Label htmlFor={`pen-disc-${v}`} className="font-normal cursor-pointer capitalize">{v}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Income stability</Label>
                  <RadioGroup value={incomeVariability ?? ""} onValueChange={(v) => setIncomeVariability(v as ExpertReviewIntake["incomeVariability"])}>
                    {[
                      { value: "stable", label: "Stable employed income" },
                      { value: "variable", label: "Self-employed or variable income" },
                      { value: "not_applicable", label: "Not applicable" },
                    ].map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value={opt.value} id={`inc-${opt.value}`} />
                        <Label htmlFor={`inc-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Children & debts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">Children arrangements</Label>
                  <RadioGroup value={childrenArrangements ?? ""} onValueChange={(v) => setChildrenArrangements(v as ExpertReviewIntake["childrenArrangements"])}>
                    {[
                      { value: "primary_carer", label: "I am the primary carer" },
                      { value: "shared", label: "Shared care" },
                      { value: "no_children", label: "No dependent children" },
                      { value: "prefer_not_say", label: "Prefer not to say" },
                    ].map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value={opt.value} id={`child-${opt.value}`} />
                        <Label htmlFor={`child-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Are joint debts a concern in the settlement?</Label>
                  <RadioGroup value={jointDebtConcern ?? ""} onValueChange={(v) => setJointDebtConcern(v as ExpertReviewIntake["jointDebtConcern"])}>
                    {["yes", "no", "unsure"].map((v) => (
                      <div key={v} className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value={v} id={`debt-${v}`} />
                        <Label htmlFor={`debt-${v}`} className="font-normal cursor-pointer capitalize">{v}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Your priorities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">What matters most right now?</Label>
                  <RadioGroup value={topPriority} onValueChange={(v) => setTopPriority(v as ExpertReviewIntake["topPriority"])}>
                    {PRIORITY_OPTIONS.map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value={opt.value} id={`pri-${opt.value}`} />
                        <Label htmlFor={`pri-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="mainConcern" className="text-sm">What is your main concern? (optional)</Label>
                  <Textarea
                    id="mainConcern"
                    value={mainConcern}
                    onChange={(e) => setMainConcern(e.target.value)}
                    placeholder="e.g. Worried the offer ignores my pension contribution…"
                    className="mt-1.5 min-h-[80px]"
                    maxLength={2000}
                  />
                </div>
                <div>
                  <Label htmlFor="questionsBeforeAgreeing" className="text-sm">Questions you want answered before agreeing (optional)</Label>
                  <Textarea
                    id="questionsBeforeAgreeing"
                    value={questionsBeforeAgreeing}
                    onChange={(e) => setQuestionsBeforeAgreeing(e.target.value)}
                    placeholder="e.g. Can I afford to keep the house on one income?"
                    className="mt-1.5 min-h-[80px]"
                    maxLength={2000}
                  />
                </div>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground leading-relaxed">{POSITION_REVIEW_BOUNDARY}</p>

            <Button type="submit" className="w-full" disabled={submitting} data-testid="button-submit-intake">
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…</> : "Submit intake — begin my review"}
            </Button>
          </form>
        )}
      </main>
    </div>
  );
}
