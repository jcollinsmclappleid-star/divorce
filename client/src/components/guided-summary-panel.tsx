import { useState } from "react";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useSessionToken } from "@/hooks/use-access";
import { buildPayload } from "@/lib/guided-summary/buildPayload";
import { computeConfidence } from "@/lib/guided-summary/computeConfidence";
import type { GuidedSummary } from "@/lib/guided-summary/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  FileSearch,
  TrendingUp,
  RefreshCw,
  Lock,
  ChevronDown,
  ChevronUp,
  Scale,
  Home,
  PiggyBank,
} from "lucide-react";
import { Link } from "wouter";
import { formatCurrency } from "@/lib/utils";

interface ConfidenceBadgeProps {
  level: "High" | "Medium" | "Low";
  size?: "sm" | "default";
}

function ConfidenceBadge({ level, size = "default" }: ConfidenceBadgeProps) {
  const colour =
    level === "High"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : level === "Medium"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-rose-50 text-rose-700 border-rose-200";
  return (
    <Badge
      variant="outline"
      className={`${colour} ${size === "sm" ? "text-[10px] px-1.5 py-0" : "text-xs"} font-medium`}
    >
      Model confidence: {level}
    </Badge>
  );
}

function SummaryBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-border/60 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
        onClick={() => setOpen((v) => !v)}
        data-testid={`button-guided-summary-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary/70 shrink-0" />
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="px-4 py-3 text-sm text-muted-foreground leading-relaxed space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function formatTextBlock(text: string) {
  return text.split("\n").filter(Boolean).map((line, i) => (
    <p key={i} className="leading-relaxed">
      {line.startsWith("- ") || line.startsWith("• ") ? (
        <span className="flex gap-2">
          <span className="text-primary/60 shrink-0 mt-0.5">•</span>
          <span>{line.replace(/^[-•]\s*/, "")}</span>
        </span>
      ) : (
        line
      )}
    </p>
  ));
}

interface ProfessionalQuestionsProps {
  questions: GuidedSummary["questions_for_professionals"];
  hasProperty: boolean;
  hasPension: boolean;
}

function ProfessionalQuestions({ questions, hasProperty, hasPension }: ProfessionalQuestionsProps) {
  const groups = [
    {
      key: "solicitor_mediator" as const,
      label: "Solicitor / Mediator",
      icon: Scale,
      show: true,
    },
    {
      key: "mortgage_broker" as const,
      label: "Mortgage Broker",
      icon: Home,
      show: hasProperty,
    },
    {
      key: "pension_expert" as const,
      label: "Pension Expert",
      icon: PiggyBank,
      show: hasPension,
    },
  ];

  return (
    <div className="space-y-4">
      {groups
        .filter((g) => g.show && questions[g.key]?.length > 0)
        .map((g) => (
          <div key={g.key}>
            <div className="flex items-center gap-2 mb-2">
              <g.icon className="w-3.5 h-3.5 text-primary/60" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                {g.label}
              </span>
            </div>
            <ul className="space-y-1.5 pl-1">
              {questions[g.key].map((q, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-primary/50 shrink-0 font-medium">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

interface GuidedSummaryPanelProps {
  hasAccess: boolean;
}

export function GuidedSummaryPanel({ hasAccess }: GuidedSummaryPanelProps) {
  const store = useAppStore();
  const engine = useEngine();
  const sessionToken = useSessionToken();
  const { guidedSummary, guidedSummaryStatus, setGuidedSummary, setGuidedSummaryStatus } = store;

  const confidence = computeConfidence(store, engine);
  const hasProperty = store.assets.some((a) => a.category === "primary_home" && a.currentValue > 0);
  const hasPension = store.assets.some((a) => a.category === "pension");

  const [confirmRegenerate, setConfirmRegenerate] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const generate = async () => {
    setErrorMessage(null);
    setGuidedSummaryStatus("loading");
    try {
      const payload = buildPayload(store, engine);
      const res = await fetch("/api/guided-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken, payload }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.message || `Request failed (${res.status})`
        );
      }

      const data: GuidedSummary = await res.json();
      setGuidedSummary(data);
      setGuidedSummaryStatus("done");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
      setGuidedSummaryStatus("error");
    }
  };

  const handleGenerate = () => {
    if (guidedSummaryStatus === "done") {
      setConfirmRegenerate(true);
    } else {
      generate();
    }
  };

  const handleConfirmRegenerate = () => {
    setConfirmRegenerate(false);
    setGuidedSummary(null);
    generate();
  };

  if (!hasAccess) {
    return (
      <div className="mt-8" data-testid="section-guided-summary-locked">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Guided Report Summary</h2>
          </div>
          <ConfidenceBadge level={confidence} size="sm" />
        </div>
        <Card className="border-border/60 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-muted/20 border-b border-border/40">
              <p className="text-sm text-muted-foreground">
                Guided Report Summary turns your calculated results into plain-English takeaways, pressure points, missing-information checks and questions to raise with professionals.
              </p>
            </div>
            <div className="relative">
              <div className="p-4 blur-sm select-none pointer-events-none" aria-hidden>
                <p className="text-sm text-muted-foreground">
                  Based on the figures entered, Party A and Party B are dealing with a combined estate of moderate complexity. The primary residence represents the largest single asset and will likely drive the core negotiation. There is a notable income disparity between the two parties which will affect post-settlement sustainability in several of the scenarios modelled...
                </p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm rounded-b-lg">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground text-center px-4">
                  Unlock full access to generate your Guided Report Summary
                </p>
                <Link href="/unlock">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-unlock-guided-summary">
                    Unlock for £79
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8" data-testid="section-guided-summary">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Guided Report Summary</h2>
          <Badge variant="outline" className="text-[10px] px-1.5 text-muted-foreground border-border/60">
            Intelligent summary
          </Badge>
        </div>
        <ConfidenceBadge level={confidence} />
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Guided Report Summary turns your calculated results into plain-English takeaways, pressure points, missing-information checks and questions to raise with professionals.
      </p>

      {guidedSummaryStatus === "idle" || guidedSummaryStatus === "error" ? (
        <Card className="border-border/60" data-testid="card-guided-summary-generate">
          <CardContent className="p-4 space-y-4">
            {guidedSummaryStatus === "error" && errorMessage && (
              <div className="flex items-start gap-2 p-3 rounded-md bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-700">{errorMessage}</p>
              </div>
            )}
            <div className="flex items-start gap-3 p-3 rounded-md bg-muted/40 border border-border/40">
              <Sparkles className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                To generate this guided summary, we securely process selected figures from your model. No names, addresses, contact details, documents or messages are included.
              </p>
            </div>
            <Button
              onClick={handleGenerate}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-generate-guided-summary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Guided Summary
            </Button>
          </CardContent>
        </Card>
      ) : guidedSummaryStatus === "loading" ? (
        <Card className="border-border/60" data-testid="card-guided-summary-loading">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-sm text-muted-foreground">Generating your guided summary — this usually takes 10–20 seconds…</p>
            </div>
            <div className="space-y-2 animate-pulse">
              {[80, 65, 90, 55, 75].map((w, i) => (
                <div key={i} className={`h-3 bg-muted rounded`} style={{ width: `${w}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : guidedSummary ? (
        <div className="space-y-3" data-testid="section-guided-summary-content">
          <SummaryBlock icon={TrendingUp} title="Plain-English Overview">
            {formatTextBlock(guidedSummary.overview)}
          </SummaryBlock>

          <SummaryBlock icon={Sparkles} title="What Stands Out">
            {formatTextBlock(guidedSummary.what_stands_out)}
          </SummaryBlock>

          <SummaryBlock icon={BookOpen} title="Scenario Interpretation">
            {formatTextBlock(guidedSummary.scenario_interpretation)}
          </SummaryBlock>

          <SummaryBlock icon={AlertTriangle} title="Pressure Points">
            {formatTextBlock(guidedSummary.pressure_points)}
          </SummaryBlock>

          <SummaryBlock icon={HelpCircle} title="Questions for Professionals">
            <ProfessionalQuestions
              questions={guidedSummary.questions_for_professionals}
              hasProperty={hasProperty}
              hasPension={hasPension}
            />
          </SummaryBlock>

          <SummaryBlock icon={FileSearch} title="Missing Information & Model Confidence">
            <div className="flex items-center gap-2 mb-2">
              <ConfidenceBadge level={guidedSummary.confidence} size="sm" />
            </div>
            {formatTextBlock(guidedSummary.missing_information)}
          </SummaryBlock>

          <Separator className="my-2" />

          {confirmRegenerate ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-md bg-amber-50 border border-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 flex-1">
                Regenerating will replace your current summary. Are you sure?
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setConfirmRegenerate(false)} data-testid="button-cancel-regenerate">
                  Cancel
                </Button>
                <Button size="sm" onClick={handleConfirmRegenerate} data-testid="button-confirm-regenerate">
                  Regenerate
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerate}
                data-testid="button-regenerate-guided-summary"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Regenerate
              </Button>
              <p className="text-xs text-muted-foreground">
                Use if you've updated your inputs significantly.
              </p>
            </div>
          )}

          <p className="text-[10px] text-muted-foreground/60 italic">
            This guided summary is illustrative and generated from the figures you entered. It is not legal, tax, or financial advice. Please consult qualified professionals before making any decisions.
          </p>
        </div>
      ) : null}
    </div>
  );
}
