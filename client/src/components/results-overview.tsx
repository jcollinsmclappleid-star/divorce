import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  BarChart3, ChevronDown, Download, FileText, Loader2,
  Sparkles, Shield, Check, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_LAYERS, PRODUCT_NAMES } from "@/lib/product-copy";
import type { GuidedSummaryStatus } from "@/lib/guided-summary/types";

type OutputStatus = "ready" | "action" | "loading" | "locked";

function StatusBadge({ status }: { status: OutputStatus }) {
  if (status === "ready") {
    return (
      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px] shrink-0">
        <Check className="w-3 h-3 mr-1" /> Ready
      </Badge>
    );
  }
  if (status === "loading") {
    return (
      <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary text-[10px] shrink-0">
        <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Generating…
      </Badge>
    );
  }
  if (status === "action") {
    return (
      <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800 text-[10px] shrink-0">
        <AlertCircle className="w-3 h-3 mr-1" /> Action needed
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-[10px] shrink-0 text-muted-foreground">
      Locked
    </Badge>
  );
}

interface ResultsOutputsBarProps {
  poolLabel: string;
  scenarioSummary: string;
  prepSummary: string;
  guidedSummaryStatus: GuidedSummaryStatus;
  hasAccess: boolean;
  pdfNarrativeReady?: boolean;
  onOpenLayer: (index: number) => void;
  onGenerateReport?: () => void;
}

/** Birds-eye view of all outputs — status, summary, and primary actions. */
export function ResultsOutputsBar({
  poolLabel,
  scenarioSummary,
  prepSummary,
  guidedSummaryStatus,
  hasAccess,
  pdfNarrativeReady = false,
  onOpenLayer,
  onGenerateReport,
}: ResultsOutputsBarProps) {
  const reportStatus: OutputStatus = !hasAccess
    ? "locked"
    : guidedSummaryStatus === "loading"
      ? "loading"
      : guidedSummaryStatus === "done"
        ? "ready"
        : "action";

  const pdfStatus: OutputStatus = hasAccess ? "ready" : "locked";

  const reportSummary =
    reportStatus === "ready"
      ? "Generated — read in Section 2 below"
      : reportStatus === "loading"
        ? "Building from your figures…"
        : reportStatus === "action"
          ? "Generate to add narrative — read in Section 2 below"
          : "Unlock to generate";

  return (
    <div
      className="rounded-2xl border border-border/70 bg-gradient-to-br from-white via-white to-gold/[0.04] shadow-sm overflow-hidden"
      data-testid="results-outputs-bar"
    >
      <div className="px-4 py-3 border-b border-border/50 bg-muted/20 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Your outputs</p>
          <p className="text-xs text-muted-foreground mt-0.5">Bird&apos;s-eye view — expand any section below to explore</p>
        </div>
        {hasAccess && (
          <div className="flex flex-wrap gap-2">
            {!pdfNarrativeReady && (
              <Button
                size="sm"
                className="shadow-md font-semibold bg-primary hover:bg-primary/90 text-white"
                onClick={() => onGenerateReport?.()}
                data-testid="button-generate-report-prominent"
              >
                <Sparkles className="w-4 h-4 mr-1.5" /> Generate: {PRODUCT_NAMES.layerStandsOut}
              </Button>
            )}
            <Link href="/report">
              <Button
                size="sm"
                className="shadow-md font-semibold bg-gold hover:bg-gold/90 text-white border-0 shadow-gold/20"
                data-testid="button-download-report-prominent"
              >
                <Download className="w-4 h-4 mr-1.5" /> Download: {PRODUCT_NAMES.pdf}
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Layer 1 — scenarios */}
        <button
          type="button"
          onClick={() => onOpenLayer(0)}
          className="text-left rounded-xl border border-border/60 bg-white p-3 hover:border-cyan-300 hover:shadow-sm transition-all"
          data-testid="output-tile-scenarios"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
              <BarChart3 className="w-4 h-4 text-cyan-600" />
            </div>
            <StatusBadge status="ready" />
          </div>
          <p className="text-xs font-semibold leading-snug">{PRODUCT_NAMES.layerScenarios}</p>
          <p className="text-lg font-bold tabular-nums text-foreground mt-1">{poolLabel}</p>
          <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{scenarioSummary}</p>
        </button>

        {/* Layer 2 — generated report */}
        <button
          type="button"
          onClick={() => {
            onOpenLayer(1);
            if (reportStatus === "action") onGenerateReport?.();
          }}
          className={`text-left rounded-xl border p-3 transition-all ${
            reportStatus === "action"
              ? "border-amber-300 bg-amber-50/80 hover:border-amber-400 hover:shadow-md ring-1 ring-amber-200/60"
              : "border-border/60 bg-white hover:border-gold/40 hover:shadow-sm"
          }`}
          data-testid="output-tile-narrative"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <StatusBadge status={reportStatus} />
          </div>
          <p className="text-xs font-semibold leading-snug">{PRODUCT_NAMES.layerStandsOut}</p>
          <p className="text-[10px] text-muted-foreground leading-relaxed mt-1.5">{reportSummary}</p>
          {reportStatus === "action" && hasAccess && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 mt-2">
              <Sparkles className="w-3 h-3" /> Generate now →
            </span>
          )}
        </button>

        {/* Layer 3 — prep checks */}
        <button
          type="button"
          onClick={() => onOpenLayer(2)}
          className="text-left rounded-xl border border-border/60 bg-white p-3 hover:border-violet-300 hover:shadow-sm transition-all"
          data-testid="output-tile-prep"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-violet-600" />
            </div>
            <StatusBadge status={hasAccess ? "ready" : "locked"} />
          </div>
          <p className="text-xs font-semibold leading-snug">{PRODUCT_NAMES.layerBeforeAgree}</p>
          <p className="text-[10px] text-muted-foreground leading-relaxed mt-1.5">{prepSummary}</p>
        </button>

        {/* PDF — always visible */}
        <div
          className="rounded-xl border-2 border-gold/30 bg-gold/[0.06] p-3 flex flex-col justify-between"
          data-testid="output-tile-pdf"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-gold" />
            </div>
            <StatusBadge status={pdfStatus} />
          </div>
          <div>
            <p className="text-xs font-semibold leading-snug">{PRODUCT_NAMES.pdf}</p>
            <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">
              {pdfNarrativeReady
                ? "Scenarios, narrative, and checks included"
                : "Scenarios & checks now — generate narrative to add that section"}
            </p>
          </div>
          {hasAccess ? (
            <Link href="/report" className="mt-3">
              <Button size="sm" variant="outline" className="w-full border-gold/40 text-gold hover:bg-gold/10 font-semibold">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download: {PRODUCT_NAMES.pdf}
              </Button>
            </Link>
          ) : (
            <p className="text-[10px] text-muted-foreground mt-3">Unlock to download</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface ResultsLayerAccordionProps {
  layerIndex: number;
  title: string;
  description?: string;
  summary: ReactNode;
  status?: OutputStatus;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id: string;
  children: ReactNode;
  headerAction?: ReactNode;
}

/** Expandable layer — collapsed shows summary, expanded shows full content. */
export function ResultsLayerAccordion({
  layerIndex,
  title,
  description,
  summary,
  status = "ready",
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  id,
  children,
  headerAction,
}: ResultsLayerAccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = (next: boolean) => {
    onOpenChange?.(next);
    if (controlledOpen === undefined) setInternalOpen(next);
  };

  const layer = PRODUCT_LAYERS[layerIndex];
  const accent = layer?.color ?? "#0891b2";

  return (
    <section id={id} className="scroll-mt-28" data-testid={`results-layer-accordion-${layerIndex}`}>
      <div className="rounded-xl border border-border/70 bg-white shadow-sm overflow-hidden">
        <div className="h-1" style={{ background: accent }} />
        <button
          type="button"
          className="w-full text-left px-4 py-4 hover:bg-muted/30 transition-colors"
          onClick={() => setOpen(!isOpen)}
          aria-expanded={isOpen}
          data-testid={`button-toggle-layer-${layerIndex}`}
        >
          <div className="flex items-start gap-3">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white mt-0.5"
              style={{ background: accent }}
            >
              {layerIndex + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h2 className="text-base font-display font-bold tracking-tight">{title}</h2>
                <StatusBadge status={status} />
              </div>
              {description && !isOpen && (
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              )}
              {!isOpen && (
                <div className="mt-2 text-xs text-foreground/80 leading-relaxed">{summary}</div>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {headerAction}
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </button>
        {isOpen && (
          <div className="px-4 pb-5 pt-0 border-t border-border/40 space-y-4">
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed pt-4">{description}</p>
            )}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/** Imperative helper — open a layer accordion and scroll into view. */
export function openResultsLayer(layerIndex: number) {
  const toggle = document.querySelector<HTMLButtonElement>(
    `[data-testid="button-toggle-layer-${layerIndex}"]`,
  );
  if (toggle && toggle.getAttribute("aria-expanded") !== "true") {
    toggle.click();
  }
  document.getElementById(`results-layer-${layerIndex}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
