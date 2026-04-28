import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, CheckCircle, AlertTriangle, Loader2, Receipt, LogOut, ShieldCheck, Smartphone } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { useAccess } from "@/hooks/use-access";
import { useAppStore } from "@/hooks/use-store";

type RecoverMode = "email" | "order";

type RecoverState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "sent"; email?: string; maskedEmail?: string }
  | { status: "expired" }
  | { status: "not_found" }
  | { status: "no_email" }
  | { status: "error"; message: string };

const ERROR_MESSAGES: Record<string, string> = {
  invalid_link: "That sign-in link isn't valid. It may have already been used or was entered incorrectly.",
  link_used: "That link has already been used. Sign-in links are single-use — request a new one below.",
  link_expired: "That link has expired (links are valid for 1 hour). Request a fresh one below.",
  server_error: "Something went wrong on our end. Please try again.",
};

export default function RecoverPage() {
  useDocumentTitle("Sign In | DivorceCalculatorUK");
  useNoIndex();
  const search = useSearch();
  const { logout } = useAccess();
  const reset = useAppStore((s) => s.reset);

  const [mode, setMode] = useState<RecoverMode>("email");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [state, setState] = useState<RecoverState>({ status: "idle" });
  const [showLogout, setShowLogout] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const error = params.get("error");
    if (error && ERROR_MESSAGES[error]) {
      setState({ status: "error", message: ERROR_MESSAGES[error] });
    }
  }, [search]);

  async function handleClearSession() {
    await logout();
    reset();
    setLoggedOut(true);
    setShowLogout(false);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState({ status: "loading" });

    try {
      const res = await fetch("/api/auth/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.status === 429) {
        setState({ status: "error", message: "Too many attempts. Please wait an hour before trying again." });
        return;
      }
      if (!res.ok) {
        setState({ status: "error", message: "Something went wrong. Please try again." });
        return;
      }

      // Always show "sent" — server never reveals whether email exists (privacy)
      setState({ status: "sent", email: email.trim() });
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">

          {/* How sign-in works */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/60 border border-border/60 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <div className="space-y-1">
              <p>
                <strong className="text-foreground">No password needed.</strong> Enter the email address you used at checkout. We'll send you a one-click sign-in link — it works on any device, in any browser.
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                <Smartphone className="w-3 h-3 shrink-0" />
                Paid on your laptop? Sign in from your phone using the same email.
              </p>
            </div>
          </div>

          <Card className="w-full">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-display" data-testid="text-recover-title">Sign In to Your Analysis</CardTitle>
              <CardDescription>
                We'll send a one-click sign-in link to your inbox — no password required.
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
                    By order reference
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
                        ? <>We've sent a sign-in link to <span className="font-medium text-foreground">{state.maskedEmail}</span>.</>
                        : <>If we have a purchase linked to <span className="font-medium text-foreground">{state.email}</span>, a sign-in link is on its way.</>
                      }
                    </p>
                  </div>
                  <div className="text-left space-y-2 bg-muted/50 rounded-lg p-3">
                    <p className="text-xs font-medium text-foreground">What to expect:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 list-none">
                      <li>• The link arrives within a minute or two</li>
                      <li>• Click it on <strong>any device</strong> — phone, tablet, or laptop</li>
                      <li>• It's single-use and expires after <strong>1 hour</strong></li>
                      <li>• Check spam or junk if it doesn't arrive</li>
                    </ul>
                    <p className="text-xs text-muted-foreground/70">
                      Email comes from <span className="font-mono">noreply@divorcecalculatoruk.co.uk</span>
                    </p>
                  </div>
                  <Button variant="outline" className="w-full text-sm" onClick={() => { setState({ status: "idle" }); setEmail(""); setOrderId(""); }}>
                    Try a different email
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
                    We found your order, but no email address was recorded at checkout. Please <a href="/contact" className="underline">contact support</a> with your order reference — we'll restore your access manually.
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
                            No purchase found for that email. Try a different email address, or use your <button type="button" onClick={() => switchMode("order")} className="underline font-medium">order reference</button> instead.
                          </p>
                        </div>
                      )}

                      {state.status === "error" && (
                        <div className="flex items-start gap-2 p-3 rounded-md bg-amber-50 border border-amber-200" data-testid="message-error">
                          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                          <p className="text-sm text-amber-800">{state.message}</p>
                        </div>
                      )}

                      <Button type="submit" className="w-full" disabled={isLoading || !email.trim()} data-testid="button-recover-submit">
                        {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending link…</> : "Send Sign-In Link"}
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
                          Your order reference is in your Stripe payment receipt, or in the URL after payment (starts with <code className="bg-muted px-1 rounded text-[11px]">cs_</code>).
                        </p>
                      </div>

                      {state.status === "not_found" && (
                        <div className="flex items-start gap-2 p-3 rounded-md bg-muted" data-testid="message-not-found-order">
                          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            We couldn't match that reference. Check the format (starts with <code className="bg-muted-foreground/10 px-1 rounded text-[11px]">cs_</code>), or try signing in <button type="button" onClick={() => switchMode("email")} className="underline font-medium">by email</button> instead.
                          </p>
                        </div>
                      )}

                      {state.status === "error" && (
                        <div className="flex items-start gap-2 p-3 rounded-md bg-amber-50 border border-amber-200" data-testid="message-error-order">
                          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                          <p className="text-sm text-amber-800">{state.message}</p>
                        </div>
                      )}

                      <Button type="submit" className="w-full" disabled={isLoading || !orderId.trim()} data-testid="button-order-submit">
                        {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Looking up…</> : "Send Access Link"}
                      </Button>
                    </form>
                  )}

                  <p className="text-[10px] text-muted-foreground/70 text-center leading-relaxed mt-3">
                    We only use your details to look up your existing purchase and send a sign-in link. See our{" "}
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
                  <span>Signed out successfully. Your data has been cleared from this browser. Use the form above to sign back in.</span>
                </div>
              ) : showLogout ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    This will sign you out and remove your saved data from this browser. Your purchase is safely stored — sign back in at any time using the form above.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive" className="flex-1" onClick={handleClearSession} data-testid="button-confirm-logout">
                      Yes, sign out
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
                  Sign out and clear data from this browser
                </button>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
