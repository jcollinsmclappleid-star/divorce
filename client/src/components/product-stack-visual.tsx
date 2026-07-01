import { ArrowDown, Check } from "lucide-react";
import { PRODUCT_LAYERS, PRODUCT_NAMES, PRODUCT_PRICE, PRODUCT_TAGLINE } from "@/lib/product-copy";

interface ProductStackVisualProps {
  onLayerClick?: (index: number) => void;
  compact?: boolean;
}

export function ProductStackVisual({ onLayerClick, compact = false }: ProductStackVisualProps) {
  return (
    <div className="space-y-3" data-testid="product-stack-visual">
      <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3 text-center">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Your figures</p>
        <p className="text-xs text-muted-foreground mt-0.5">House · pensions · savings · debts · income</p>
      </div>
      {!compact && (
        <div className="flex justify-center">
          <ArrowDown className="w-4 h-4 text-gold/60" aria-hidden />
        </div>
      )}
      <div className="space-y-2">
        {PRODUCT_LAYERS.map((layer, i) => (
          <button
            key={layer.key}
            type="button"
            onClick={() => onLayerClick?.(i)}
            className={`w-full text-left rounded-xl border border-border/60 bg-white shadow-sm hover:border-gold/40 hover:shadow-md transition-all ${onLayerClick ? "cursor-pointer" : "cursor-default"}`}
            data-testid={`product-layer-${i}`}
          >
            <div className="h-1 rounded-t-xl" style={{ background: layer.color }} />
            <div className={`px-4 ${compact ? "py-2.5" : "py-3.5"}`}>
              <div className="flex items-start gap-2">
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white mt-0.5"
                  style={{ background: layer.color }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className={`font-semibold text-foreground leading-snug ${compact ? "text-xs" : "text-sm"}`}>
                    {layer.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{layer.subtitle}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {!compact && (
        <>
          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-gold/60" aria-hidden />
          </div>
          <div className="rounded-xl border-2 border-gold/30 bg-gold/5 px-4 py-3 text-center">
            <p className="text-sm font-bold text-foreground">{PRODUCT_NAMES.fullPosition}</p>
            <p className="text-xs text-muted-foreground mt-1">{PRODUCT_TAGLINE}</p>
            <p className="text-lg font-bold text-gold mt-2 tabular-nums">{PRODUCT_PRICE}</p>
          </div>
        </>
      )}
    </div>
  );
}

/** Compact checklist for preview — what's ready vs locked. */
export function AnswerReadinessStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 ${className}`} data-testid="answer-readiness-strip">
      {[
        { label: "Figures entered", ready: true },
        { label: "Scenarios modelled", ready: true },
        { label: PRODUCT_NAMES.layerScenarios, ready: false },
        { label: PRODUCT_NAMES.layerStandsOut, ready: false },
        { label: PRODUCT_NAMES.layerBeforeAgree, ready: false },
        { label: PRODUCT_NAMES.pdf, ready: false },
      ].map((item) => (
        <div
          key={item.label}
          className={`rounded-lg border px-2.5 py-2 text-[10px] leading-tight ${
            item.ready
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-amber-200/80 bg-amber-50/50 text-amber-900/80"
          }`}
        >
          <span className="flex items-center gap-1.5">
            {item.ready ? (
              <Check className="w-3 h-3 shrink-0 text-emerald-600" />
            ) : (
              <span className="w-3 h-3 shrink-0 rounded-full border border-amber-400/60" aria-hidden />
            )}
            <span className="font-medium">{item.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function LayerSectionHeader({
  layerIndex,
  title,
  description,
  id,
}: {
  layerIndex: number;
  title: string;
  description?: string;
  id?: string;
}) {
  const layer = PRODUCT_LAYERS[layerIndex];
  return (
    <div id={id} className="scroll-mt-28 pt-2">
      <div className="flex items-start gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white mt-0.5"
          style={{ background: layer?.color ?? "#0891b2" }}
        >
          {layerIndex + 1}
        </span>
        <div className="min-w-0">
          <h2 className="text-lg md:text-xl font-display font-bold tracking-tight">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-2xl">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Jump nav for unlocked results — three product layers. */
export function ResultsLayersNav({ className = "" }: { className?: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className={`grid sm:grid-cols-3 gap-2 ${className}`} data-testid="results-layers-nav">
      {PRODUCT_LAYERS.map((layer, i) => (
        <button
          key={layer.key}
          type="button"
          onClick={() => scrollTo(`results-layer-${i}`)}
          className="text-left rounded-lg border border-emerald-200/80 bg-emerald-50/80 px-3 py-2.5 hover:border-emerald-300 hover:shadow-sm transition-all"
        >
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
            <Check className="w-3 h-3 shrink-0" /> Unlocked
          </span>
          <p className="text-xs font-semibold text-foreground leading-snug mt-1">{layer.title}</p>
          <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{layer.subtitle}</p>
        </button>
      ))}
    </div>
  );
}
