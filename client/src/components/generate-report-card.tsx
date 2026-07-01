import { useState, useId } from "react";
import { Link } from "wouter";
import {
  Sparkles, AlertTriangle, Download, FileText, Check, Loader2, ExternalLink, ArrowRight, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PRODUCT_NAMES } from "@/lib/product-copy";
import type { GuidedSummaryStatus } from "@/lib/guided-summary/types";

export const OPENAI_GENERATION_DISCLOSURE =
  "When you click Generate, selected anonymous model figures (amounts, ratios, and scenario outputs — no names, addresses, contact details, or free text) are sent to our server and forwarded to OpenAI to produce your plain-English narrative. OpenAI processes this as a sub-processor and does not use API-submitted data to train its models. We do not store the response on our servers — it returns to your browser only.";

const X = PRODUCT_NAMES.layerStandsOut;
const Y = PRODUCT_NAMES.pdf;

interface GenerateReportCardProps {
  status: GuidedSummaryStatus;
  errorMessage?: string | null;
  onGenerate: () => void;
  id?: string;
  /** Compact layout for use inside accordion section 2 */
  variant?: "bar" | "inline";
}

function OpenAiConsentBlock({
  checked,
  onCheckedChange,
  id,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
      <div className="flex items-start gap-2">
        <FileText className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-700 leading-relaxed">{OPENAI_GENERATION_DISCLOSURE}</p>
      </div>
      <Link href="/privacy" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
        Read full privacy &amp; OpenAI details <ExternalLink className="w-3 h-3" />
      </Link>
      <div className="flex items-start gap-3 p-3 rounded-lg border border-amber-200/80 bg-amber-50/50">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          data-testid="checkbox-openai-consent"
        />
        <Label htmlFor={id} className="text-xs leading-relaxed cursor-pointer font-normal text-amber-950">
          I understand anonymous figures will be sent to OpenAI to generate <strong className="font-semibold">{X}</strong>, and that this will be included in <strong className="font-semibold">{Y}</strong>.
        </Label>
      </div>
    </div>
  );
}

/** Dual-action bar: Generate X → then Download Y / read X in section 2 below. */
export function GenerateReportCard({
  status,
  errorMessage,
  onGenerate,
  id = "generate-report-card",
  variant = "bar",
}: GenerateReportCardProps) {
  const [openAiConsent, setOpenAiConsent] = useState(false);
  const consentId = useId();
  const pdfReady = status === "done";
  const isLoading = status === "loading";

  const handleGenerateClick = () => {
    if (!openAiConsent) {
      document.getElementById(consentId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      document.getElementById(consentId)?.focus();
      return;
    }
    onGenerate();
  };

  const generateButton = (
    <Button
      size="lg"
      disabled={isLoading}
      onClick={pdfReady ? () => {
        document.getElementById("results-layer-1")?.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelector<HTMLButtonElement>('[data-testid="button-toggle-layer-1"]')?.click();
      } : handleGenerateClick}
      className={`w-full font-semibold text-sm sm:text-base h-auto py-3 px-4 whitespace-normal text-left justify-start ${
        pdfReady
          ? "border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
          : openAiConsent
            ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
            : "bg-primary/70 hover:bg-primary/80 text-primary-foreground shadow-md ring-2 ring-amber-300 ring-offset-1"
      }`}
      data-testid="button-generate-guided-summary"
    >
      {isLoading ? (
        <><Loader2 className="w-5 h-5 mr-2 shrink-0 animate-spin" /> Generating {X}…</>
      ) : pdfReady ? (
        <><Check className="w-5 h-5 mr-2 shrink-0 text-emerald-600" /> {X} — ready</>
      ) : (
        <><Sparkles className="w-5 h-5 mr-2 shrink-0" /> Generate: {X}</>
      )}
    </Button>
  );

  const downloadButton = (
    <Link href="/report" className="w-full">
      <Button
        size="lg"
        className="w-full font-semibold text-sm sm:text-base h-auto py-3 px-4 whitespace-normal text-left justify-start bg-gold hover:bg-gold/90 text-white shadow-md shadow-gold/20"
        data-testid="button-download-report-action"
      >
        <Download className="w-5 h-5 mr-2 shrink-0" /> Download: {Y}
      </Button>
    </Link>
  );

  if (variant === "inline") {
    if (pdfReady || isLoading) return null;
    return (
      <div className="space-y-4" data-testid="card-generate-report-inline">
        {status === "error" && errorMessage && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-sm text-rose-700">{errorMessage}</p>
          </div>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed">
          Generate here or use the action bar at the top. Adds your narrative to {Y} and Section 2 below.
        </p>
        <OpenAiConsentBlock checked={openAiConsent} onCheckedChange={setOpenAiConsent} id={consentId} />
        {generateButton}
        {!openAiConsent && (
          <p className="text-[11px] text-amber-800">Tick the box above, then click Generate.</p>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        id={id}
        className="rounded-2xl border-2 border-primary/25 bg-white shadow-lg p-5 sm:p-6 scroll-mt-32"
        data-testid="card-generate-report-loading"
      >
        <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-stretch mb-4">
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
            <div>
              <p className="text-sm font-bold text-foreground">Generating {X}…</p>
              <p className="text-xs text-muted-foreground">Usually 10–20 seconds</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center justify-center text-muted-foreground">
            <span className="text-[10px] font-medium text-muted-foreground">+</span>
          </div>
          <div className="rounded-xl border border-gold/40 bg-gold/5 p-4 flex items-center gap-3">
            <Download className="w-5 h-5 text-gold shrink-0" />
            <p className="text-sm font-medium">{Y} — download anytime</p>
          </div>
        </div>
        <div className="space-y-2 animate-pulse">
          {[85, 70, 92, 60, 78].map((w, i) => (
            <div key={i} className="h-2.5 bg-muted rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (pdfReady) {
    return (
      <div
        id={id}
        className="rounded-2xl border-2 border-emerald-300/80 bg-emerald-50/90 shadow-lg p-5 sm:p-6 scroll-mt-32"
        data-testid="card-generate-report-done"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-3">Narrative ready</p>
        <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
          {generateButton}
          <div className="hidden sm:flex items-center justify-center text-emerald-600">
            <ArrowRight className="w-5 h-5" />
          </div>
          {downloadButton}
        </div>
        <p className="text-xs text-emerald-800/80 mt-3 leading-relaxed">
          {X} is included in {Y} and shown in <strong className="font-semibold">Section 2 below</strong>.
        </p>
      </div>
    );
  }

  return (
    <div
      id={id}
      className="rounded-2xl border-2 border-amber-400 bg-white shadow-lg shadow-amber-100/60 p-5 sm:p-6 scroll-mt-32 ring-2 ring-amber-200/50"
      data-testid="card-generate-report-prompt"
    >
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1">
          Two actions — independent
        </p>
        <h2 className="text-lg sm:text-xl font-display font-bold text-foreground leading-snug">
          Generate <span className="text-gold">{X}</span> · Download <span className="text-gold">{Y}</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-2xl">
          <strong className="font-medium text-foreground">Step 1</strong> creates your plain-English narrative — read it in Section 2 below and it is added to the PDF when generated. <strong className="font-medium text-foreground">Step 2</strong> downloads your report now (scenarios and checks included; narrative section appears after Step 1).
        </p>
      </div>

      {status === "error" && errorMessage && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 mb-4">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p className="text-sm text-rose-700">{errorMessage}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-stretch mb-4">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Step 1 · Generate</p>
          {generateButton}
        </div>
        <div className="hidden sm:flex flex-col items-center justify-center gap-1 text-muted-foreground px-1">
          <span className="text-[9px] font-semibold uppercase tracking-wide">and</span>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Step 2 · Download</p>
          {downloadButton}
          {!pdfReady && (
            <p className="text-[10px] text-muted-foreground pl-1">Available now — narrative section added after Step 1</p>
          )}
        </div>
      </div>

      <OpenAiConsentBlock checked={openAiConsent} onCheckedChange={setOpenAiConsent} id={consentId} />

      {!openAiConsent && (
        <p className="text-xs text-amber-800 font-medium mt-3 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          Tick the OpenAI consent box above — then Step 1 activates.
        </p>
      )}
    </div>
  );
}

export function scrollToGenerateReportCard() {
  document.getElementById("generate-report-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
