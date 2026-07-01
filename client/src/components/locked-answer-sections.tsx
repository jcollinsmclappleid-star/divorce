import { Lock, ChevronRight } from "lucide-react";
import { LOCKED_ANSWER_SECTIONS, PRODUCT_NAMES, getUnlockCta } from "@/lib/product-copy";
import { REPORT_FACTOR_TEASERS } from "@/lib/settlement-factors";

interface LockedAnswerSectionsProps {
  onUnlock?: () => void;
  checkoutLoading?: boolean;
  intent?: string | null;
  showFactorTopics?: boolean;
  variant?: "light" | "dark";
}

export function LockedAnswerSections({
  onUnlock,
  checkoutLoading = false,
  intent,
  showFactorTopics = true,
  variant = "light",
}: LockedAnswerSectionsProps) {
  const cta = getUnlockCta(intent);
  const isDark = variant === "dark";

  return (
    <div className="space-y-3" data-testid="locked-answer-sections">
      <p className={`text-sm ${isDark ? "text-white/65" : "text-muted-foreground"}`}>
        Built from your figures. Reveal what each scenario leaves you with, what stands out, and what to check before you agree.
      </p>
      <div className="grid gap-2 sm:grid-cols-1">
        {LOCKED_ANSWER_SECTIONS.map((section) => (
          <button
            key={section.title}
            type="button"
            onClick={onUnlock}
            disabled={!onUnlock || checkoutLoading}
            className={`relative w-full text-left rounded-xl border overflow-hidden transition-shadow hover:shadow-md disabled:opacity-80 ${
              isDark ? "border-white/15 bg-white/5 hover:bg-white/8" : "border-border/60 bg-white hover:border-gold/30"
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: section.color }} />
            <div className="pt-4 pb-3.5 px-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-foreground"}`}>{section.title}</p>
                <p className={`text-[11px] leading-relaxed mt-1 blur-[3px] select-none ${isDark ? "text-white/50" : "text-muted-foreground"}`}>
                  {section.desc}
                </p>
              </div>
              <Lock className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? "text-gold" : "text-amber-500"}`} />
            </div>
          </button>
        ))}
      </div>
      {showFactorTopics && (
        <div className={`rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-gold/25 bg-gold/[0.04]"}`}>
          <p className={`text-xs font-semibold mb-2 ${isDark ? "text-gold" : "text-foreground"}`}>
            Topics inside {PRODUCT_NAMES.layerBeforeAgree}
          </p>
          <ul className="space-y-1.5">
            {REPORT_FACTOR_TEASERS.map((topic) => (
              <li key={topic} className={`flex gap-2 text-[11px] ${isDark ? "text-white/55" : "text-muted-foreground"}`}>
                <Lock className="w-3 h-3 shrink-0 mt-0.5 opacity-60" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {onUnlock && (
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onUnlock}
            disabled={checkoutLoading}
            className={`inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl shadow-md transition-all hover:shadow-lg disabled:opacity-70 ${
              isDark
                ? "bg-white text-primary hover:bg-white/95"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
            data-testid="button-reveal-full-answer"
          >
            <Lock className={`w-4 h-4 ${isDark ? "text-gold" : "text-gold"}`} />
            {cta}
            <ChevronRight className="w-4 h-4 opacity-60" />
          </button>
        </div>
      )}
    </div>
  );
}
