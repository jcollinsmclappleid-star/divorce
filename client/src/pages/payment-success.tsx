import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { useAccess, useSessionToken } from "@/hooks/use-access";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";
import { ExpertPositionReviewUpsell } from "@/components/expert-position-review";
import { PRODUCT_NAMES } from "@/lib/product-copy";

export default function PaymentSuccessPage() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const isExpertReviewOnly = params.get("expert_review") === "1";
  const isBundle = params.get("bundle") === "1";

  useDocumentTitle(
    isExpertReviewOnly || isBundle
      ? `${PRODUCT_NAMES.positionReview} Confirmed | DivorceCalculatorUK`
      : "Payment Confirmed | DivorceCalculatorUK",
  );
  useNoIndex();
  const [, navigate] = useLocation();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [needsIntake, setNeedsIntake] = useState(false);
  const { refresh } = useAccess();
  const sessionToken = useSessionToken();

  useEffect(() => {
    const sessionId = params.get("session_id");

    if (!sessionId) {
      navigate(isExpertReviewOnly ? "/results" : "/unlock");
      return;
    }

    async function verify() {
      try {
        if (isExpertReviewOnly) {
          const res = await fetch("/api/checkout/verify-expert-review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ checkoutSessionId: sessionId }),
          });
          const data = await res.json();
          if (data.status === "paid") {
            setVerified(true);
            setNeedsIntake(!data.intakeCompleted);
          }
        } else {
          const res = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ checkoutSessionId: sessionId }),
          });
          const data = await res.json();
          if (data.status === "paid") {
            if (data.sessionToken) {
              localStorage.setItem("dfm-session-token", data.sessionToken);
            }
            setVerified(true);
            if (isBundle || data.expertReviewPurchased) {
              setNeedsIntake(true);
            }
            refresh();
          }
        }
      } catch (err) {
        console.error("Verification error:", err);
      } finally {
        setVerifying(false);
      }
    }

    verify();
  }, [navigate, refresh, isExpertReviewOnly, isBundle]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center space-y-6">
          <div className="flex justify-center">
            <Logo href="/" size="lg" />
          </div>
          {verifying ? (
            <>
              <Loader2 className="w-12 h-12 animate-spin text-muted-foreground mx-auto" />
              <h2 className="text-xl font-semibold" data-testid="text-verifying">Confirming your payment...</h2>
              <p className="text-muted-foreground text-sm">This should only take a moment.</p>
            </>
          ) : verified ? (
            <>
              <CheckCircle className="w-14 h-14 text-green-600 mx-auto" />
              <h2 className="text-xl font-semibold" data-testid="text-payment-confirmed">
                {isExpertReviewOnly || isBundle ? `${PRODUCT_NAMES.positionReview} confirmed` : "Payment Confirmed"}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {isExpertReviewOnly ? (
                  needsIntake
                    ? "Complete the short intake form so we can begin your human-reviewed briefing — delivered within 5 working days."
                    : "Your intake is on file. Your human-reviewed briefing will arrive by email within 5 working days."
                ) : isBundle ? (
                  "Your full analysis is unlocked and your Position Review is confirmed. Complete the intake form next so we can begin your briefing."
                ) : (
                  "Your full structured analysis is now unlocked. You have 12 months of access to model and adjust your financial scenarios."
                )}
              </p>
              {!isExpertReviewOnly && !isBundle && (
                <div className="text-left bg-muted/50 rounded-lg p-3 space-y-1.5">
                  <p className="text-xs font-medium text-foreground">Accessing from another device later?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A confirmation email is on its way with a sign-in link. You can also visit <strong>/recover</strong> at any time and enter your checkout email to receive a fresh one-click sign-in link — no password ever needed.
                  </p>
                </div>
              )}
              {needsIntake ? (
                <Button
                  className="w-full"
                  onClick={() => navigate("/expert-review/intake")}
                  data-testid="button-go-to-intake"
                >
                  Complete intake form
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => navigate("/results")}
                  data-testid="button-go-to-results"
                >
                  {isExpertReviewOnly ? "Back to results" : "View Full Analysis"}
                </Button>
              )}
              {!isExpertReviewOnly && !isBundle && verified && sessionToken && (
                <div className="text-left pt-2">
                  <ExpertPositionReviewUpsell sessionToken={sessionToken} source="payment_success" compact />
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold" data-testid="text-payment-issue">Payment not yet confirmed</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We could not confirm your payment automatically. If you were charged, it will activate within a few minutes.
              </p>
              <Button
                className="w-full"
                onClick={() => navigate(isExpertReviewOnly ? "/results" : "/recover")}
                data-testid="button-recover-access"
              >
                {isExpertReviewOnly ? "Return to results" : "Recover Access by Email"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
