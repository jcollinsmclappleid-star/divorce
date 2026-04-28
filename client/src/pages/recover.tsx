import { useState } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, CheckCircle, AlertTriangle, Loader2, Receipt, LogOut, ShieldCheck } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

type RecoverMode = "email" | "order";

type RecoverState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "sent"; email?: string; maskedEmail?: string }
  | { status: "expired" }
  | { status: "not_found" }
  | { status: "no_email" }
  | { status: "error"; message: string };

export default function RecoverPage() {
  useDocumentTitle("Recover Access | DivorceCalculatorUK");
  useNoIndex();

  const [mode, setMode] = useState<RecoverMode>("email");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [state, setState] = useState<RecoverState>({ status: "idle" });
  const [showLogout, setShowLogout] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  function handleClearSession() {
    localStorage.removeItem("dfm-session-token");
    setLoggedOut(true);
    setShowLogout(false);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState({ status: "loading" });

    try {
      const res = await fetch("/api/access/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.status === 429) {
        setState({ status: "error", message: "Too many attempts. Please wait a while before trying again." });
        return;
      }
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
        setState({ status: "sent", email: email.trim() });
      }
    } catch {
      setState({ status: "error", message: "Connection error. Please try again." });
    }
  }

  async function handleOrderSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orderId.trim()) return;
    setState({ status: "loading" });

    try {
      const res = await fetch("/api/access/recover-by-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutSessionId: orderId.trim() }),
      });

      if (res.status === 429) {
        setState({ status: "error", message: "Too many attempts. Please wait a while before trying again." });
        return;
      }
      if (!res.ok) {
        setState({ status: "error", message: "Something went wrong. Please try again." });
        return;
      }

      const data = await res.json();
      if (!data.found) {
        setState({ status: "not_found" });
      } else if (data.expired) {
        setState({ status: "expired" });
      } else if (data.noEmail) {
        setState({ status: "no_email" });
      } else {
        setState({ status: "sent", maskedEmail: data.maskedEmail });
      }
    } catch {
      setState({ status: "error", message: "Connection error. Please try again." });
    }
  }

  function switchMode(m: RecoverMode) {
    setMode(m);
    setState({ status: "idle" });
  }

  const isLoading = state.status === "loading";
  const isDone =
    state.status === "sent" ||
    state.status === "expired" ||
    state.status === "not_found" ||
    state.status === "no_email";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">

          {/* How access works — context panel */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/60 border border-border/60 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <p>
              <strong className="text-foreground">No password needed.</strong> Access is tied to your browser. If you've switched devices or cleared your browser data, use one of the options below to receive a one-click access link by email.
            </p>
          </div>

          <Card className="w-full">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-display" data-testid="text-recover-title">Recover Your Access</CardTitle>
              <CardDescription>
                We'll send an instant access link to your email address.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Mode tabs */}
              <div className="flex rounded-lg border border-border overflow-hidden mb-5">
                <button
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === "email" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
                  onClick={() => switchMode("email")}
                  data-testid="tab-email-recovery"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    By email
                  </span>
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium transition-colors border-l border-border ${mode === "order" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
                  onClick={() => switchMode("order")}
                  data-testid="tab-order-recovery"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5" />
                    By order ID
                  </span>
                </button>
              </div>

              {/* Success state */}
              {state.status === "sent" && (
                <div className="text-center space-y-4" data-testid="section-recovery-success">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Check your inbox</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {state.maskedEmail
                        ? <>We've sent an access link to <span className="font-medium text-foreground">{state.maskedEmail}</span>.</>
                        : <>We've sent an access link to <span className="font-medium text-foreground">{state.email}</span>.</>
                      } Click the link to restore your access instantly.
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    Can't find it? Check your spam or junk folder. The email comes from noreply@divorcecalculatoruk.co.uk.
                  </p>
                  <Button variant="outline" className="w-full text-sm" onClick={() => { setState({ status: "idle" }); setEmail(""); setOrderId(""); }}>
                    Try a different method
                  </Button>
                </div>
              )}

              {/* Expired */}
              {state.status === "expired" && (
                <div className="space-y-4" data-testid="section-expired">
                  <div className="flex items-start gap-2 p-3 rounded-md bg-amber-50 border border-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-amber-800">
                      We found your purchase, but your 12-month access period has expired. You can purchase a new access period to continue.
                    </p>
                  </div>
                  <Button className="w-full" onClick={() => window.location.href = "/unlock"}>
                    Purchase Access Again
                  </Button>
                </div>
              )}

              {/* No email on file */}
              {state.status === "no_email" && (
                <div className="flex items-start gap-2 p-3 rounded-md bg-muted" data-testid="section-no-email">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    We found your order, but no email address was recorded. Please <a href="/contact" className="underline">contact support</a> and quote your order reference — we'll restore your access manually.
                  </p>
                </div>
              )}

              {/* Form states */}
              {(state.status === "idle" || state.status === "loading" || state.status === "not_found" || state.status === "error") && (
                <>
                  {mode === "email" ? (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          data-testid="input-recover-email"
                        />
                        <p className="text-xs text-muted-foreground mt-1.5">Use the email address you entered at checkout.</p>
                      </div>

                      {state.status === "not_found" && (
                        <div className="flex items-start gap-2 p-3 rounded-md bg-muted" data-testid="message-not-found">
                          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            We couldn't find a purchase linked to that email. Try a different email, or use your <button type="button" onClick={() => switchMode("order")} className="underline font-medium">order reference</button> instead.
                          </p>
                        </div>
                      )}

                      {state.status === "error" && (
                        <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10" data-testid="message-error">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          <p className="text-sm text-destructive">{state.message}</p>
                        </div>
                      )}

                      <Button type="submit" className="w-full" disabled={isLoading || !email.trim()} data-testid="button-recover-submit">
                        {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Looking up…</> : "Send Access Link"}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="cs_live_... or cs_test_..."
                          value={orderId}
                          onChange={(e) => setOrderId(e.target.value)}
                          required
                          disabled={isLoading}
                          data-testid="input-recover-order"
                        />
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Find your order reference in the Stripe payment confirmation email, or in the URL on the page you saw after payment (starts with <code className="bg-muted px-1 rounded text-[11px]">cs_</code>).
                        </p>
                      </div>

                      {state.status === "not_found" && (
                        <div className="flex items-start gap-2 p-3 rounded-md bg-muted" data-testid="message-not-found-order">
                          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            We couldn't match that order reference. Check the format (it should start with <code className="bg-muted-foreground/10 px-1 rounded text-[11px]">cs_</code>), or try recovering <button type="button" onClick={() => switchMode("email")} className="underline font-medium">by email</button> instead.
                          </p>
                        </div>
                      )}

                      {state.status === "error" && (
                        <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10" data-testid="message-error-order">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          <p className="text-sm text-destructive">{state.message}</p>
                        </div>
                      )}

                      <Button type="submit" className="w-full" disabled={isLoading || !orderId.trim()} data-testid="button-order-submit">
                        {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Looking up…</> : "Send Access Link"}
                      </Button>
                    </form>
                  )}

                  <p className="text-[10px] text-muted-foreground/70 text-center leading-relaxed mt-3">
                    We only use your details to look up your existing purchase and send an access link. See our{" "}
                    <a href="/privacy" className="underline">Privacy Policy</a>.
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Sign out / clear session */}
          <Card className="w-full border-dashed">
            <CardContent className="pt-5 pb-5">
              {loggedOut ? (
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Session cleared. Your browser no longer has access saved. Use recovery above to sign in again.</span>
                </div>
              ) : showLogout ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    This will remove your saved access from this browser only. Your purchase record is safely stored — you can recover access any time using your email or order reference.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive" className="flex-1" onClick={handleClearSession} data-testid="button-confirm-logout">
                      Yes, clear this browser
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setShowLogout(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
                  onClick={() => setShowLogout(true)}
                  data-testid="button-sign-out"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Sign out of this browser / clear saved access
                </button>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
