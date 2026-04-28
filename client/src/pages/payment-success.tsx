import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { useAccess } from "@/hooks/use-access";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";

export default function PaymentSuccessPage() {
  useDocumentTitle("Payment Confirmed | DivorceCalculatorUK");
  useNoIndex();
  const [, navigate] = useLocation();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const { refresh } = useAccess();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (!sessionId) {
      navigate('/unlock');
      return;
    }

    async function verify() {
      try {
        const res = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkoutSessionId: sessionId }),
        });
        const data = await res.json();
        if (data.status === 'paid') {
          if (data.sessionToken) {
            localStorage.setItem('dfm-session-token', data.sessionToken);
          }
          setVerified(true);
          refresh();
        }
      } catch (err) {
        console.error('Verification error:', err);
      } finally {
        setVerifying(false);
      }
    }

    verify();
  }, [navigate, refresh]);

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
              <h2 className="text-xl font-semibold" data-testid="text-payment-confirmed">Payment Confirmed</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your full structured analysis is now unlocked. You have 12 months of access to model and adjust your financial scenarios.
              </p>
              <div className="text-left bg-muted/50 rounded-lg p-3 space-y-1.5">
                <p className="text-xs font-medium text-foreground">Accessing from another device later?</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A confirmation email is on its way with a sign-in link. You can also visit <strong>/recover</strong> at any time and enter your checkout email to receive a fresh one-click sign-in link — no password ever needed.
                </p>
              </div>
              <Button
                className="w-full"
                onClick={() => navigate('/results')}
                data-testid="button-go-to-results"
              >
                View Full Analysis
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold" data-testid="text-payment-issue">Payment not yet confirmed</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We could not confirm your payment automatically. If you were charged, your access will activate within a few minutes. You can also recover access at any time using the email address you entered at checkout.
              </p>
              <Button
                className="w-full"
                onClick={() => navigate('/recover')}
                data-testid="button-recover-access"
              >
                Recover Access by Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/preview')}
                data-testid="button-back-to-preview"
              >
                Return to Preview
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
