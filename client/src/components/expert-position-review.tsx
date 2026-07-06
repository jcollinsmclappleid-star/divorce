import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, Loader2, Shield } from "lucide-react";
import {
  POSITION_REVIEW_BOUNDARY,
  POSITION_REVIEW_DELIVERABLES,
  POSITION_REVIEW_PRICE,
  POSITION_REVIEW_TAGLINE,
  POSITION_REVIEW_CTA,
  PRODUCT_NAMES,
} from "@/lib/product-copy";

function trackExpertReviewCheckoutClick(source: string) {
  const w = window as Window & { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer?.push({ event: "expert_review_checkout_click", package: "249", source });
  w.gtag?.("event", "expert_review_checkout_click", { package: "249", source });
}

type Props = {
  sessionToken: string;
  /** Where the upsell is shown — for analytics */
  source?: "results" | "report" | "payment_success";
  compact?: boolean;
};

export function ExpertPositionReviewUpsell({ sessionToken, source = "results", compact = false }: Props) {
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);
  const [intakeCompleted, setIntakeCompleted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/expert-review/status/${encodeURIComponent(sessionToken)}`);
        const data = await res.json();
        if (!cancelled) {
          setPurchased(Boolean(data.purchased));
          setIntakeCompleted(Boolean(data.intakeCompleted));
        }
      } catch {
        /* non-fatal */
      } finally {
        if (!cancelled) setStatusLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sessionToken]);

  async function handleCheckout() {
    setLoading(true);
    trackExpertReviewCheckoutClick(source);
    try {
      const res = await fetch("/api/checkout/create-expert-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      alert(data.message || "Payment page failed to load. Please try again.");
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (statusLoading) {
    return (
      <section className="mt-10 pt-8 border-t border-border/40" data-testid="section-expert-review">
        <div className="flex items-center gap-2 text-sm text-muted-foreground max-w-xl">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      </section>
    );
  }

  if (purchased) {
    return (
      <section className={compact ? "" : "mt-10 pt-8 border-t border-border/40"} data-testid="section-expert-review">
        <Card className="border-emerald-200/80 bg-emerald-50/40 max-w-xl" data-testid="card-expert-review-purchased">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700">
              <Check className="w-5 h-5" />
              <h3 className="text-sm font-bold">{PRODUCT_NAMES.positionReview} — confirmed</h3>
            </div>
            {intakeCompleted ? (
              <p className="text-sm text-muted-foreground leading-relaxed">
                Intake received. Your briefing will arrive by email within <strong>5 working days</strong>.
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Payment received. Complete the short intake form so we can begin your review.
                </p>
                <Link href="/expert-review/intake">
                  <Button size="sm" data-testid="button-expert-review-intake">
                    Complete intake form
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className={compact ? "" : "mt-10 pt-8 border-t border-border/40"} data-testid="section-expert-review">
      {!compact && (
        <div className="mb-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Optional — after your report</p>
          <h2 className="text-lg font-display font-bold">About to reply to an offer or go to mediation?</h2>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{POSITION_REVIEW_TAGLINE}</p>
        </div>
      )}

      <Card className="border-gold/25 bg-gradient-to-br from-gold/[0.06] to-background max-w-xl" data-testid="card-expert-review-249">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-bold">{PRODUCT_NAMES.positionReview}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Written briefing on your modelled position.</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-bold text-primary">{POSITION_REVIEW_PRICE}</p>
              <p className="text-[10px] text-muted-foreground">one-off · 5 working days</p>
            </div>
          </div>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {POSITION_REVIEW_DELIVERABLES.map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Button
            className="w-full bg-gold hover:bg-gold/90 text-white"
            onClick={handleCheckout}
            disabled={loading}
            data-testid="button-expert-review-checkout"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Redirecting to checkout…</>
            ) : POSITION_REVIEW_CTA}
          </Button>
        </CardContent>
      </Card>

      <div className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50/60 p-3 text-xs text-amber-900 flex gap-2.5 max-w-xl" data-testid="expert-review-boundary-note">
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          {POSITION_REVIEW_BOUNDARY} Platform and billing help remains free via{" "}
          <a href="mailto:support@divorcecalculatoruk.co.uk" className="underline">support@divorcecalculatoruk.co.uk</a>.
        </p>
      </div>
    </section>
  );
}
