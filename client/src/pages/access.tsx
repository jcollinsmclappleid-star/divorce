import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function AccessPage() {
  useDocumentTitle("Restoring Access | DivorceCalculatorUK");
  useNoIndex();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`/api/access/${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.hasAccess) {
          localStorage.setItem("dfm-session-token", token);
          setStatus("success");
          setTimeout(() => setLocation("/results"), 1500);
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [search, setLocation]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b py-3 px-4">
        <div className="container mx-auto">
          <Logo href="/" size="sm" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          {status === "loading" && (
            <>
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-7 h-7 text-primary animate-spin" />
              </div>
              <h1 className="text-xl font-display font-semibold text-foreground" data-testid="text-access-loading">
                Restoring your access…
              </h1>
              <p className="text-sm text-muted-foreground">Just a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h1 className="text-xl font-display font-semibold text-foreground" data-testid="text-access-success">
                Access restored
              </h1>
              <p className="text-sm text-muted-foreground">Taking you to your analysis now…</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-amber-600" />
              </div>
              <h1 className="text-xl font-display font-semibold text-foreground" data-testid="text-access-error">
                Link not valid
              </h1>
              <p className="text-sm text-muted-foreground">
                This link may have expired or already been used. Sign-in links are valid for 1 hour and can only be clicked once. Request a fresh one below.
              </p>
              <Button onClick={() => setLocation("/recover")} className="w-full" data-testid="button-go-recover">
                Send a new sign-in link
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
