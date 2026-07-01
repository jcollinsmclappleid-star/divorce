import {
  BookOpen, ChevronRight, FileText, Lock, Sparkles, BarChart3, HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_NAMES, PRODUCT_PRICE } from "@/lib/product-copy";
import { REPORT_FACTOR_TEASERS } from "@/lib/settlement-factors";

interface LandingReportPreviewsProps {
  onOpenFullSample: () => void;
  onScrollToPricing: () => void;
}

/** Report 1 — scenario comparison. */
function ScenariosReportPreview() {
  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="space-y-1.5 px-0.5">
        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-cyan-200 bg-cyan-50 text-cyan-800">
          Report 1 of 3
        </Badge>
        <h4 className="text-base md:text-lg font-display font-bold text-foreground leading-snug">
          {PRODUCT_NAMES.layerScenarios}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Four settlement paths side-by-side — capital, monthly surplus, reserves and mortgage pressure.
        </p>
      </div>
      <div className="rounded-2xl border-2 border-cyan-200/70 bg-white shadow-lg overflow-hidden flex flex-col flex-1">
        <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-white border-b border-cyan-100 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-600 shrink-0" />
          <span className="text-[10px] font-semibold text-cyan-800">Sample scenario comparison</span>
        </div>
        <div className="p-3 flex-1 space-y-2 bg-[#f8f9fb]">
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            {["Sell & Split", "A Keeps", "B Keeps", "Deferred"].map((name) => (
              <div key={name} className="rounded-md bg-white border border-slate-200 px-2 py-2 font-medium text-slate-600 text-center">
                {name}
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-2.5 space-y-1.5">
            {["Capital after split", "Monthly surplus", "Reserve outlook"].map((row) => (
              <div key={row} className="flex justify-between text-[10px]">
                <span className="text-slate-500">{row}</span>
                <span className="font-semibold text-slate-700 tabular-nums blur-[2px] select-none">£—</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Report 2 — what stands out. */
function StandsOutReportPreview() {
  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="space-y-1.5 px-0.5">
        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-amber-200 bg-amber-50 text-amber-900">
          Report 2 of 3
        </Badge>
        <h4 className="text-base md:text-lg font-display font-bold text-foreground leading-snug">
          {PRODUCT_NAMES.layerStandsOut}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Plain-English overview of pressure points, trade-offs and what may leave either side short.
        </p>
      </div>
      <div className="rounded-2xl border-2 border-amber-200/70 bg-white shadow-lg overflow-hidden flex flex-col flex-1">
        <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-white border-b border-amber-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-[10px] font-semibold text-amber-900">Sample executive overview</span>
        </div>
        <div className="p-3 flex-1 space-y-2 bg-[#f8f9fb]">
          <div className="rounded-lg border border-slate-200 bg-white p-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Overview (sample)</p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              &ldquo;Monthly position is tighter under a keep-home scenario once housing costs and reduced liquid capital are included…&rdquo;
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {["Pressure points", "Trade-offs", "Missing values"].map((tag) => (
              <span key={tag} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Report 3 — preparation guide. */
function PreparationGuidePreview({ onScrollToPricing }: { onScrollToPricing: () => void }) {
  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="space-y-1.5 px-0.5">
        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-violet-200 bg-violet-50 text-violet-800">
          Report 3 of 3
        </Badge>
        <h4 className="text-base md:text-lg font-display font-bold text-foreground leading-snug">
          {PRODUCT_NAMES.layerBeforeAgree}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Answers the questions in your head — how much your share may be, what to verify, and what to ask before agreeing.
        </p>
        <p className="text-[11px] font-medium text-violet-700/90 leading-relaxed">
          Not included in the public sample — included when you unlock {PRODUCT_PRICE}.
        </p>
      </div>
      <div
        className="rounded-2xl border-2 border-violet-200/80 bg-white shadow-lg overflow-hidden flex flex-col flex-1"
        data-testid="preview-preparation-guide"
      >
        <div className="px-4 py-3 border-b border-violet-100 bg-gradient-to-r from-violet-50 to-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-violet-600 shrink-0" />
          <span className="text-[10px] font-semibold text-violet-800">Questions this report answers</span>
        </div>
        <div className="p-3 flex-1 space-y-1.5 bg-[#f8f9fb]">
          {REPORT_FACTOR_TEASERS.slice(0, 3).map((question) => (
            <div
              key={question}
              className="rounded-lg border border-violet-100 bg-white p-2 flex items-start gap-2"
            >
              <Lock className="w-3 h-3 text-violet-400 shrink-0 mt-0.5" />
              <p className="text-[10px] font-semibold text-foreground leading-snug line-clamp-2">{question}</p>
            </div>
          ))}
          <p className="text-[9px] text-muted-foreground text-center pt-0.5">+ 29 more checks mapped to your figures</p>
        </div>
        <div className="p-3 border-t border-violet-100 bg-white">
          <button
            type="button"
            onClick={onScrollToPricing}
            className="w-full flex items-center justify-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors"
            data-testid="button-prep-guide-to-pricing"
          >
            See full pricing
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function LandingReportPreviews({ onOpenFullSample, onScrollToPricing }: LandingReportPreviewsProps) {
  return (
    <div className="space-y-5" data-testid="landing-report-previews">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-foreground">
          Three reports · all included in {PRODUCT_PRICE}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Three dedicated reports from your figures — plus a combined {PRODUCT_NAMES.pdf.toLowerCase()} that brings them together for download.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
        <ScenariosReportPreview />
        <StandsOutReportPreview />
        <PreparationGuidePreview onScrollToPricing={onScrollToPricing} />
      </div>

      {/* Sample strip — Reports 1 & 2 only */}
      <div
        className="rounded-xl border-2 border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-4 space-y-3"
        data-testid="preview-report-sample"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Public sample · Reports 1 &amp; 2</p>
              <p className="text-sm font-display font-bold text-foreground">{PRODUCT_NAMES.layerScenarios} + {PRODUCT_NAMES.layerStandsOut}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your unlocked {PRODUCT_NAMES.pdf.toLowerCase()} combines all three reports — sample below does not include Report 3.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 border-primary/30 text-primary hover:bg-primary/5 font-semibold w-full sm:w-auto"
            onClick={onOpenFullSample}
            data-testid="button-open-report-sample"
          >
            <BookOpen className="w-4 h-4 mr-2" /> Open sample (Reports 1 &amp; 2)
          </Button>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed border-t border-slate-100 pt-3">
          <span className="font-semibold text-foreground">{PRODUCT_NAMES.layerBeforeAgree}</span> is not shown in the public sample.
          It answers the questions in your head — how much your share may be, what to verify, and what to ask before agreeing — personalised from your figures when you unlock.
        </p>
      </div>
    </div>
  );
}
