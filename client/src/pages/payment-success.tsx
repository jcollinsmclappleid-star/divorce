import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { useAccess } from "@/hooks/use-access";

export default function PaymentSuccessPage() {
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
                Your full structured analysis is now unlocked. You have unlimited access for 6 months to model and adjust your financial scenarios.
              </p>
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
              <h2 className="text-xl font-semibold" data-testid="text-payment-issue">Something went wrong</h2>
              <p className="text-muted-foreground text-sm">
                We could not verify your payment. If you were charged, your access will be activated shortly.
              </p>
              <Button
                variant="outline"
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
