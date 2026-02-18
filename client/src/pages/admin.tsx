import { useState } from "react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Search, Loader2, CheckCircle, Clock, AlertTriangle, CalendarPlus } from "lucide-react";

interface PurchaseResult {
  id: string;
  email: string | null;
  status: string;
  purchasedAt: string | null;
  expiresAt: string | null;
  isActive: boolean;
}

export default function AdminPage() {
  useDocumentTitle("Admin | DivorceCalculatorUK");
  useNoIndex();

  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState<PurchaseResult[] | null>(null);
  const [lookupError, setLookupError] = useState("");

  const [extendId, setExtendId] = useState<string | null>(null);
  const [extendMonths, setExtendMonths] = useState("3");
  const [extending, setExtending] = useState(false);
  const [extendSuccess, setExtendSuccess] = useState("");

  function getAuthHeaders() {
    return { "Content-Type": "application/json", Authorization: `Bearer ${password}` };
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(false);
    try {
      const res = await fetch("/api/admin/lookup", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ email: "test@test.com" }),
      });
      if (res.status === 403 || res.status === 401) {
        setAuthError(true);
        return;
      }
      setAuthenticated(true);
    } catch {
      setAuthError(true);
    }
  }

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setLookupError("");
    setPurchases(null);
    setExtendSuccess("");

    try {
      const res = await fetch("/api/admin/lookup", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        setLookupError("Lookup failed");
        return;
      }
      const data = await res.json();
      setPurchases(data.purchases);
    } catch {
      setLookupError("Connection error");
    } finally {
      setLoading(false);
    }
  }

  async function handleExtend(purchaseId: string) {
    setExtending(true);
    setExtendSuccess("");
    try {
      const res = await fetch("/api/admin/extend", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ purchaseId, months: parseInt(extendMonths) }),
      });
      if (!res.ok) {
        setLookupError("Extension failed");
        return;
      }
      const data = await res.json();
      setExtendSuccess(`Extended to ${new Date(data.expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`);
      setExtendId(null);
      if (email.trim()) {
        const lookupRes = await fetch("/api/admin/lookup", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ email: email.trim() }),
        });
        if (lookupRes.ok) {
          const d = await lookupRes.json();
          setPurchases(d.purchases);
        }
      }
    } catch {
      setLookupError("Extension failed");
    } finally {
      setExtending(false);
    }
  }

  function formatDate(d: string | null) {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle data-testid="text-admin-title">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-admin-password"
              />
              {authError && (
                <p className="text-sm text-destructive" data-testid="text-auth-error">Invalid password</p>
              )}
              <Button type="submit" className="w-full" data-testid="button-admin-login">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b py-3 px-4">
        <div className="container mx-auto flex items-center justify-between gap-2 flex-wrap">
          <h1 className="text-lg font-semibold" data-testid="text-admin-heading">Purchase Management</h1>
          <Badge variant="outline">Admin</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Look Up by Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLookup} className="flex gap-2">
              <Input
                type="email"
                placeholder="customer@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                data-testid="input-admin-email"
              />
              <Button type="submit" disabled={loading || !email.trim()} data-testid="button-admin-lookup">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4 mr-1" /> Look Up</>}
              </Button>
            </form>

            {lookupError && <p className="text-sm text-destructive mt-3" data-testid="text-lookup-error">{lookupError}</p>}
            {extendSuccess && (
              <div className="flex items-center gap-2 mt-3 p-2 bg-emerald-50 rounded-md" data-testid="text-extend-success">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-700">{extendSuccess}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {purchases !== null && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {purchases.length === 0 ? "No purchases found" : `${purchases.length} purchase${purchases.length > 1 ? "s" : ""} found`}
              </CardTitle>
            </CardHeader>
            {purchases.length > 0 && (
              <CardContent className="space-y-4">
                {purchases.map((p) => (
                  <div key={p.id} className="border rounded-md p-4 space-y-2" data-testid={`purchase-${p.id}`}>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-sm font-medium text-muted-foreground">{p.email || "No email"}</span>
                      {p.isActive ? (
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                          <CheckCircle className="w-3 h-3 mr-1" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                          <AlertTriangle className="w-3 h-3 mr-1" /> Expired
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>
                        <span className="block font-medium text-foreground">Purchased</span>
                        {formatDate(p.purchasedAt)}
                      </div>
                      <div>
                        <span className="block font-medium text-foreground">Expires</span>
                        {formatDate(p.expiresAt)}
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground/60">ID: {p.id}</div>

                    {extendId === p.id ? (
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Select value={extendMonths} onValueChange={setExtendMonths}>
                          <SelectTrigger className="w-28" data-testid="select-extend-months">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 month</SelectItem>
                            <SelectItem value="2">2 months</SelectItem>
                            <SelectItem value="3">3 months</SelectItem>
                            <SelectItem value="6">6 months</SelectItem>
                            <SelectItem value="12">12 months</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          onClick={() => handleExtend(p.id)}
                          disabled={extending}
                          data-testid="button-confirm-extend"
                        >
                          {extending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Extend"}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setExtendId(null)} data-testid="button-cancel-extend">
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="pt-2 border-t">
                        <Button variant="outline" size="sm" onClick={() => setExtendId(p.id)} data-testid={`button-extend-${p.id}`}>
                          <CalendarPlus className="w-3.5 h-3.5 mr-1" /> Extend Access
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        )}

        <p className="text-[10px] text-muted-foreground/60 text-center">
          This panel shows minimal data required for purchase management. No financial modelling data is accessible. All actions are logged server-side.
        </p>
      </main>
    </div>
  );
}
