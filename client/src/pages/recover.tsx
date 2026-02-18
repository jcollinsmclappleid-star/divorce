import { useState } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";

type RecoverState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "recovered"; expiresAt: string }
  | { status: "expired" }
  | { status: "not_found" }
  | { status: "error"; message: string };

export default function RecoverPage() {
  useDocumentTitle("Recover Access | DivorceCalculatorUK");
  useNoIndex();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<RecoverState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setState({ status: "loading" });

    try {
      const res = await fetch("/api/access/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        setState({ status: "error", message: "Something went wrong. Please try again." });
        return;
      }

      const data = await res.json();

      if (!data.found) {
        setState({ status: "not_found" });
      } else if (data.expired) {
        setState({ status: "expired" });
      } else {
        localStorage.setItem("dfm-session-token", data.sessionToken);
        setState({ status: "recovered", expiresAt: data.expiresAt });
      }
    } catch {
      setState({ status: "error", message: "Connection error. Please try again." });
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b py-3 px-4">
        <div className="container mx-auto flex items-center justify-between gap-2 flex-wrap">
          <Logo href="/" size="sm" />
          <Button variant="ghost" onClick={() => setLocation("/")} data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-display" data-testid="text-recover-title">Recover Your Access</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the email address you used when you purchased access. We'll restore your session.
            </p>
          </CardHeader>
          <CardContent>
            {state.status === "recovered" ? (
              <div className="text-center space-y-4" data-testid="section-recovery-success">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Access Restored</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your access has been recovered. It is valid until{" "}
                    <span className="font-medium text-foreground">
                      {new Date(state.expiresAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>.
                  </p>
                </div>
                <Button onClick={() => setLocation("/results")} className="w-full" data-testid="button-go-to-results">
                  Go to My Results
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={state.status === "loading"}
                    data-testid="input-recover-email"
                  />
                </div>

                {state.status === "not_found" && (
                  <div className="flex items-start gap-2 p-3 rounded-md bg-muted" data-testid="message-not-found">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      We couldn't find a purchase linked to that email address. Please check the email you used during checkout, or contact us if you need help.
                    </p>
                  </div>
                )}

                {state.status === "expired" && (
                  <div className="flex items-start gap-2 p-3 rounded-md bg-muted" data-testid="message-expired">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      We found your purchase, but your 6-month access period has expired. You can purchase a new access period to continue using the full analysis.
                    </p>
                  </div>
                )}

                {state.status === "error" && (
                  <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10" data-testid="message-error">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <p className="text-sm text-destructive">{state.message}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={state.status === "loading" || !email.trim()}
                  data-testid="button-recover-submit"
                >
                  {state.status === "loading" ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Looking up...</>
                  ) : (
                    "Recover Access"
                  )}
                </Button>

                <p className="text-[10px] text-muted-foreground/70 text-center leading-relaxed">
                  We only use your email to look up your existing purchase. No data is stored from this form. See our{" "}
                  <a href="/privacy" className="underline">Privacy Policy</a>.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
