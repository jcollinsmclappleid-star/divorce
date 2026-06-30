import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, Loader2 } from "lucide-react";

function trackSupportCheckoutClick() {
  const w = window as Window & { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer?.push({ event: "report_support_checkout_click", package: "129" });
  w.gtag?.("event", "report_support_checkout_click", { package: "129" });
}

type Props = {
  sessionToken: string;
};

export function OptionalReportSupport({ sessionToken }: Props) {
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/support/status/${encodeURIComponent(sessionToken)}`);
        const data = await res.json();
        if (!cancelled) setPurchased(Boolean(data.purchased));
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
    trackSupportCheckoutClick();
    try {
      const res = await fetch("/api/checkout/create-support", {
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

  return (
    <section className="mt-10 pt-8 border-t border-border/40" data-testid="section-report-support">
      <div className="mb-5 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Optional service — after your report</p>
        <h2 className="text-lg font-display font-bold">Still stuck on one part of your report?</h2>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Your report is designed to answer most questions on its own. If one section still does not click, optional written email support can help you sense-check inputs and read the modelling outputs — no call required.
        </p>
      </div>

      {statusLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground max-w-xl">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading support options…
        </div>
      ) : purchased ? (
        <Card className="border-emerald-200/80 bg-emerald-50/40 max-w-xl" data-testid="card-support-129-purchased">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700">
              <Check className="w-5 h-5" />
              <h3 className="text-sm font-bold">Report walkthrough support — confirmed</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Payment received. We will email you from <strong>support@divorcecalculatoruk.co.uk</strong> within 2–3 working days. Reply with the section you want help with.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/60 bg-muted/20 max-w-xl" data-testid="card-support-129">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold">Report walkthrough support</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Written email help with your inputs and report outputs.</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-primary">£129</p>
                <p className="text-[10px] text-muted-foreground">one-off · email</p>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Sense-check your inputs and what the outputs mean.</li>
              <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Clarify house, pension, cashflow and mortgage pressure figures.</li>
              <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Help you prepare focused questions for your solicitor, broker or pension adviser.</li>
            </ul>
            <Button
              className="w-full"
              onClick={handleCheckout}
              disabled={loading}
              data-testid="button-support-checkout"
            >
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Redirecting to checkout…</> : "Get walkthrough support — £129"}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50/60 p-3 text-xs text-amber-900 flex gap-2.5 max-w-xl" data-testid="support-boundary-note">
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          Modelling support only — we help you understand calculator outputs and assumptions. We cannot provide legal, financial, mortgage or tax advice, tell you what to accept, or predict court outcomes. Platform and billing help remains free via{" "}
          <a href="mailto:support@divorcecalculatoruk.co.uk" className="underline">support@divorcecalculatoruk.co.uk</a>.
        </p>
      </div>
    </section>
  );
}
