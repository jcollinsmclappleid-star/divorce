import { useState } from "react";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { computeConfidence } from "@/lib/guided-summary/computeConfidence";
import type { GuidedSummary } from "@/lib/guided-summary/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  AlertCircle,
  Shield,
  FileText,
} from "lucide-react";
import { Link } from "wouter";
import { DEFAULT_UNLOCK_CTA, PRODUCT_NAMES } from "@/lib/product-copy";
import { useGuidedSummaryGenerate } from "@/hooks/use-guided-summary-generate";
import { OPENAI_GENERATION_DISCLOSURE, GenerateReportCard } from "@/components/generate-report-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SectionIllustration } from "@/components/section-illustration";
import {
  getRelevantSettlementFactors,
  getSettlementFactorGroups,
  REPORT_FACTOR_TEASERS,
  type SettlementFactor,
  type SettlementFactorGroup,
} from "@/lib/settlement-factors";

interface ConfidenceBadgeProps {
  level: "High" | "Medium" | "Low";
  size?: "sm" | "default";
}

function ConfidenceBadge({ level, size = "default" }: ConfidenceBadgeProps) {
  const style =
    level === "High"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : level === "Medium"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-rose-50 text-rose-700 border-rose-200";
  return (
    <Badge
      variant="outline"
      className={`${style} ${size === "sm" ? "text-[10px] px-1.5 py-0" : "text-xs"} font-medium`}
    >
      Model confidence: {level}
    </Badge>
  );
}

const BLOCK_META: Record<string, { color: string; icon: React.ElementType; borderColor: string }> = {
  "Plain-English Overview":             { color: "text-primary", icon: TrendingUp,   borderColor: "border-l-primary/40" },
  "What Stands Out":                    { color: "text-gold",    icon: Sparkles,      borderColor: "border-l-gold/50" },
  "Scenario Interpretation":            { color: "text-cyan-600",icon: BookOpen,      borderColor: "border-l-cyan-400" },
  "Pressure Points":                    { color: "text-rose-500",icon: AlertCircle,   borderColor: "border-l-rose-400" },
  "Settlement Position Check":           { color: "text-gold",    icon: Shield,        borderColor: "border-l-gold/50" },
  "Questions for Professionals":        { color: "text-cyan-600",icon: HelpCircle,    borderColor: "border-l-cyan-300" },
  "Missing Information & Model Confidence": { color: "text-amber-500", icon: FileSearch, borderColor: "border-l-amber-400" },
};

function SummaryBlock({
  icon: Icon,
  title,
  borderColor,
  children,
}: {
  icon: React.ElementType;
  title: string;
  borderColor: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`border-l-4 ${borderColor} pl-4 py-1`}>
      <button
        className="w-full flex items-center justify-between py-1.5 text-left group"
        onClick={() => setOpen((v) => !v)}
        data-testid={`button-guided-summary-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 shrink-0 ${BLOCK_META[title]?.color ?? "text-muted-foreground"}`} />
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        {open
          ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors" />
          : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors" />}
      </button>
      {open && (
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2 pb-1">
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
          <span className="text-primary/50 shrink-0 mt-0.5">•</span>
          <span>{line.replace(/^[-•]\s*/, "")}</span>
        </span>
      ) : line}
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
    { key: "solicitor_mediator" as const, label: "Solicitor / Mediator", icon: Scale,     show: true },
    { key: "mortgage_broker"    as const, label: "Mortgage Broker",       icon: Home,      show: hasProperty },
    { key: "pension_expert"     as const, label: "Pension Expert",        icon: PiggyBank, show: hasPension },
  ];
  return (
    <div className="space-y-5">
      {groups
        .filter((g) => g.show && questions[g.key]?.length > 0)
        .map((g) => (
          <div key={g.key}>
            <div className="flex items-center gap-2 mb-2">
              <g.icon className="w-3.5 h-3.5 text-primary/60" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wide">{g.label}</span>
            </div>
            <ol className="space-y-1.5">
              {questions[g.key].map((q, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                  <span className="text-primary/50 shrink-0 font-semibold tabular-nums">{i + 1}.</span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
    </div>
  );
}

function PositionCheck({ check }: { check: NonNullable<GuidedSummary["position_check"]> }) {
  const groups = [
    { label: "Missing values", items: check.missing_values },
    { label: "Left-short risk", items: check.left_short_risk },
    { label: "Offer trade-offs", items: check.offer_trade_offs },
    { label: "Housing and needs pressure", items: check.housing_needs_pressure },
    { label: "Questions before agreeing", items: check.questions_before_agreeing },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {groups
        .filter((group) => group.items.length > 0)
        .map((group) => (
          <div key={group.label} className="rounded-md border bg-muted/20 p-3">
            <p className="text-xs font-semibold text-foreground mb-2">{group.label}</p>
            <ul className="space-y-1.5">
              {group.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

function getSourceBadgeText(sourceLabel?: string) {
  if (!sourceLabel) return null;
  if (sourceLabel.includes("Matrimonial Causes")) return "MCA 1973";
  if (sourceLabel.includes("Child Maintenance")) return "CMS";
  if (sourceLabel.includes("MoneyHelper")) return "MoneyHelper";
  if (sourceLabel.includes("Form E")) return "Form E";
  if (sourceLabel.includes("GOV.UK")) return "GOV.UK";
  return sourceLabel;
}

function SourceBadge({ factor }: { factor: SettlementFactor }) {
  const label = getSourceBadgeText(factor.sourceLabel);
  if (!label) return null;
  return (
    <span
      title={factor.sourceLabel}
      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-gold/20 bg-gold/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gold"
    >
      <FileText className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

function FactorList({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items?.length) return null;
  return (
    <div className="rounded-md bg-slate-50 p-2">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <ul className="mt-1 space-y-1 text-[11px] text-slate-600 leading-relaxed">
        {items.slice(0, 5).map((item) => (
          <li key={item} className="flex gap-1.5">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FactorGuideCard({
  factor,
  defaultOpen = false,
}: {
  factor: SettlementFactor;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <article className="rounded-lg border border-white/80 bg-white/95 p-3 shadow-sm shadow-black/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full text-left"
        data-testid={`button-factor-guide-${factor.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground">{factor.userQuestion ?? factor.title}</p>
            <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">{factor.fact}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <SourceBadge factor={factor} />
            {open
              ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground/60" />
              : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60" />}
          </div>
        </div>
      </button>
      <p className="mt-1.5 text-[11px] text-primary/80 leading-relaxed">{factor.whyItMatters}</p>
      {open ? (
        <div className="mt-3 space-y-2">
          <div className="grid gap-2 sm:grid-cols-2">
            <FactorList title="Figures to check" items={factor.figuresToCheck} />
            <FactorList title="Evidence to gather" items={factor.documentsToGather} />
          </div>
          {factor.professionalQuestions?.length ? (
            <div className="rounded-md border border-cyan-100 bg-cyan-50/60 p-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan-700">Questions to raise</p>
              <ul className="mt-1 space-y-1 text-[11px] text-cyan-900/75 leading-relaxed">
                {factor.professionalQuestions.slice(0, 3).map((question) => (
                  <li key={question} className="flex gap-1.5">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {factor.discussWith?.length ? (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Discuss with</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {factor.discussWith.map((person) => (
                  <span key={person} className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] text-slate-600">
                    {person}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {factor.sourceSummary ? (
            <div className="rounded-md border border-slate-100 bg-slate-50/70 p-2 text-[10px] text-slate-500 leading-relaxed">
              <p>Source note: {factor.sourceSummary}</p>
              {factor.sourceUrl ? (
                <a href={factor.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex font-semibold text-gold hover:underline">
                  Open source
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function RelevantFactorsCard({
  factors,
  groups,
}: {
  factors: SettlementFactor[];
  groups: SettlementFactorGroup[];
}) {
  const defaultGroupValue = groups[0] ? [groups[0].id] : [];
  return (
    <div className="rounded-xl border border-gold/25 bg-gold/[0.04] p-4 space-y-4" data-testid="card-relevant-settlement-factors">
      <div className="flex items-start gap-2.5">
        <Scale className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">{PRODUCT_NAMES.layerBeforeAgree}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Fixed source-backed content selected from approved rules. The AI does not write or alter this section; use it to prepare better professional conversations.
          </p>
        </div>
      </div>
      {factors.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">Most relevant to the figures entered</p>
            <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-muted-foreground">Tap a card to expand</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {factors.map((factor, index) => (
              <FactorGuideCard key={factor.title} factor={factor} defaultOpen={index === 0} />
            ))}
          </div>
        </div>
      )}
      <Accordion type="multiple" defaultValue={defaultGroupValue} className="space-y-2">
        {groups.map((group) => (
          <AccordionItem key={group.id} value={group.id} className="rounded-lg border border-slate-200/80 bg-white px-3">
            <AccordionTrigger className="py-3 text-left hover:no-underline">
              <div className="pr-3">
                <p className="text-xs font-semibold text-foreground">{group.title}</p>
                <p className="mt-1 text-[11px] font-normal text-muted-foreground leading-relaxed">{group.intro}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="grid gap-2 sm:grid-cols-2">
                {group.items.map((item) => (
                  <FactorGuideCard key={item.title} factor={item} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

interface GuidedSummaryPanelProps {
  hasAccess: boolean;
  /** When true, hide duplicate section header (parent accordion owns the title). */
  embedded?: boolean;
}

export function GuidedSummaryPanel({ hasAccess, embedded = false }: GuidedSummaryPanelProps) {
  const store = useAppStore();
  const engine = useEngine();
  const { guidedSummary, guidedSummaryStatus, errorMessage, generate, resetForRegenerate } = useGuidedSummaryGenerate();

  const confidence = computeConfidence(store, engine);
  const hasProperty = store.assets.some((a) => a.category === "primary_home" && a.currentValue > 0);
  const hasPension = store.assets.some((a) => a.category === "pension");
  const relevantFactors = getRelevantSettlementFactors(store, engine);
  const factorGroups = getSettlementFactorGroups();

  const [confirmRegenerate, setConfirmRegenerate] = useState(false);
  const [regenerateConsent, setRegenerateConsent] = useState(false);

  const handleGenerate = () => {
    if (guidedSummaryStatus === "done") setConfirmRegenerate(true);
    else generate();
  };

  const handleConfirmRegenerate = () => {
    if (!regenerateConsent) return;
    setConfirmRegenerate(false);
    setRegenerateConsent(false);
    resetForRegenerate();
    generate();
  };

  if (!hasAccess) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${embedded ? "" : "mt-8"}`} data-testid="section-guided-summary-locked">
        <SectionIllustration variant="ledger-reveal" fill tone="background" />
        <div className="relative z-10 space-y-4">
        {!embedded ? (
        <div className="bg-gradient-to-r from-primary to-[hsl(220_52%_28%)] rounded-xl px-5 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-semibold text-white">{PRODUCT_NAMES.layerStandsOut}</h2>
                <span className="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded-full font-medium">Personalised from your figures</span>
              </div>
              <p className="text-xs text-white/45 mt-0.5">See what may leave you short before you agree</p>
            </div>
          </div>
          <ConfidenceBadge level={confidence} size="sm" />
        </div>
        ) : null}
        <Card className="border-border/60 overflow-hidden">
          <CardContent className="p-0">
            {/* Section preview list */}
            <div className="p-4 border-b border-border/40 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">What you'll receive</p>
              {[
                { icon: TrendingUp,   label: "Plain-English Overview",               desc: "What the asset pool, income gap and available capital mean in real life.",                 borderColor: "border-l-primary/40" },
                { icon: Sparkles,     label: "What Stands Out",                      desc: "The figures most likely to change the conversation, pulled from your numbers.",           borderColor: "border-l-gold/50" },
                { icon: Scale,        label: PRODUCT_NAMES.layerBeforeAgree,       desc: "Fixed source-backed sections on career, bills, home, pensions, children and offers — figures, evidence and professional questions to check.",        borderColor: "border-l-gold/50" },
                { icon: BookOpen,     label: "Scenario Interpretation",              desc: "What each option leaves each party with — capital, pension and monthly pressure.",        borderColor: "border-l-cyan-400" },
                { icon: AlertCircle,  label: "Pressure Points",                      desc: "Where a settlement can look fair on paper but strain cashflow, housing or pensions.",      borderColor: "border-l-rose-400" },
                { icon: Shield,       label: PRODUCT_NAMES.layerBeforeAgree,             desc: "Left-short risk, offer trade-offs, missing values and questions before agreeing.",        borderColor: "border-l-gold/50" },
                { icon: HelpCircle,   label: "Questions for Professionals",          desc: "Specific questions to take to your solicitor, mediator, broker and pension expert.",      borderColor: "border-l-cyan-300" },
                { icon: FileSearch,   label: "Missing Information & Confidence",     desc: "What needs checking before you rely on the figures in a serious discussion.",             borderColor: "border-l-amber-400" },
              ].map(({ icon: Icon, label, desc, borderColor }) => (
                <div key={label} className={`border-l-4 ${borderColor} pl-3 py-1 flex items-start gap-2.5`}>
                  <Icon className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground/70">{label}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Blurred teaser + unlock */}
            <div className="relative">
              <div className="p-4 blur-sm select-none pointer-events-none" aria-hidden>
                <div className="space-y-1.5">
                  {REPORT_FACTOR_TEASERS.slice(0, 3).map((line) => (
                    <p key={line} className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm rounded-b-lg p-4">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground text-center">
                  See what each scenario could leave you with — plus the preparation guide
                </p>
                <Link href="/unlock">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-unlock-guided-summary">
                    {DEFAULT_UNLOCK_CTA}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={embedded ? "" : "mt-8"} data-testid="section-guided-summary">
      {/* Premium header */}
      {!embedded ? (
      <div className="bg-gradient-to-r from-primary to-[hsl(220_52%_28%)] rounded-xl px-5 py-4 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-gold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">{PRODUCT_NAMES.layerStandsOut}</h2>
              <span className="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded-full font-medium">Personalised from your figures</span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">Pressure points, trade-offs and questions before agreeing</p>
          </div>
        </div>
        <ConfidenceBadge level={confidence} />
      </div>
      ) : null}

      {guidedSummaryStatus === "idle" || guidedSummaryStatus === "error" ? (
        <GenerateReportCard
          variant="inline"
          status={guidedSummaryStatus}
          errorMessage={errorMessage}
          onGenerate={generate}
        />
      ) : guidedSummaryStatus === "loading" ? (
        <Card className="border-border/60" data-testid="card-guided-summary-loading">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-sm text-muted-foreground">Generating {PRODUCT_NAMES.layerStandsOut} — this usually takes 10–20 seconds…</p>
            </div>
            <div className="space-y-2.5 animate-pulse">
              {[80, 65, 90, 55, 75].map((w, i) => (
                <div key={i} className="h-2.5 bg-muted rounded-full" style={{ width: `${w}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : guidedSummary ? (
        <div className="space-y-4" data-testid="section-guided-summary-content">
          <SummaryBlock icon={TrendingUp} title="Plain-English Overview" borderColor="border-l-primary/40">
            {formatTextBlock(guidedSummary.overview)}
          </SummaryBlock>
          <SummaryBlock icon={Sparkles} title="What Stands Out" borderColor="border-l-gold/50">
            {formatTextBlock(guidedSummary.what_stands_out)}
          </SummaryBlock>
          <RelevantFactorsCard factors={relevantFactors} groups={factorGroups} />
          <SummaryBlock icon={BookOpen} title="Scenario Interpretation" borderColor="border-l-cyan-400">
            {formatTextBlock(guidedSummary.scenario_interpretation)}
          </SummaryBlock>
          <SummaryBlock icon={AlertCircle} title="Pressure Points" borderColor="border-l-rose-400">
            {formatTextBlock(guidedSummary.pressure_points)}
          </SummaryBlock>
          {guidedSummary.position_check && (
            <SummaryBlock icon={Shield} title={PRODUCT_NAMES.layerBeforeAgree} borderColor="border-l-gold/50">
              <PositionCheck check={guidedSummary.position_check} />
            </SummaryBlock>
          )}
          <SummaryBlock icon={HelpCircle} title="Questions for Professionals" borderColor="border-l-cyan-300">
            <ProfessionalQuestions
              questions={guidedSummary.questions_for_professionals}
              hasProperty={hasProperty}
              hasPension={hasPension}
            />
          </SummaryBlock>
          <SummaryBlock icon={FileSearch} title="Missing Information & Model Confidence" borderColor="border-l-amber-400">
            <div className="flex items-center gap-2 mb-2">
              <ConfidenceBadge level={guidedSummary.confidence} size="sm" />
            </div>
            {formatTextBlock(guidedSummary.missing_information)}
          </SummaryBlock>

          <div className="pt-1 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {confirmRegenerate ? (
              <div className="flex flex-col gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200 w-full">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 flex-1 leading-relaxed">
                    Regenerating replaces your current narrative and sends anonymous figures to OpenAI again.
                  </p>
                </div>
                <p className="text-[11px] text-amber-900/80 leading-relaxed">{OPENAI_GENERATION_DISCLOSURE}</p>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="regenerate-openai-consent"
                    checked={regenerateConsent}
                    onCheckedChange={(v) => setRegenerateConsent(v === true)}
                  />
                  <Label htmlFor="regenerate-openai-consent" className="text-xs font-normal leading-relaxed cursor-pointer">
                    I understand anonymous figures will be sent to OpenAI again.
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setConfirmRegenerate(false); setRegenerateConsent(false); }} data-testid="button-cancel-regenerate">Cancel</Button>
                  <Button size="sm" disabled={!regenerateConsent} onClick={handleConfirmRegenerate} data-testid="button-confirm-regenerate">Regenerate</Button>
                </div>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setConfirmRegenerate(true)} data-testid="button-regenerate-guided-summary">
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Regenerate
                </Button>
                <p className="text-xs text-muted-foreground">Use if you've updated your inputs significantly. Limit: 3 per hour.</p>
              </>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground/60 italic">
            This report was produced from the anonymous model figures you entered. It is illustrative only and is not legal, tax, or financial advice. Please consult qualified professionals before making any decisions.
          </p>
        </div>
      ) : null}
    </div>
  );
}
