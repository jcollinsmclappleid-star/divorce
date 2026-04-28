import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, RefreshCw, BookOpen, CreditCard, AlertCircle } from "lucide-react";

export default function ContactPage() {
  useDocumentTitle("Contact & Support | DivorceCalculatorUK");
  useMetaTags({
    description: "Get help with DivorceCalculatorUK — access, billing, or technical questions. For England and Wales divorce financial modelling support. Not legal or financial advice.",
    canonical: "https://divorcecalculatoruk.co.uk/contact",
    ogTitle: "Contact Divorce Calculator UK — Support",
    ogDescription: "Get help with access, billing, or platform questions about our divorce financial modelling tool for England and Wales.",
    ogUrl: "https://divorcecalculatoruk.co.uk/contact",
    ogType: "website",
  });
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6"
          data-testid="button-back-home"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>

        <h1 className="text-3xl font-display font-bold mb-2" data-testid="text-contact-title">
          Contact &amp; Support
        </h1>
        <p className="text-muted-foreground mb-2">
          All support messages are read and replied to directly. We aim to respond within one working day.
        </p>
        <p className="text-sm text-muted-foreground mb-10">UK-based support.</p>

        <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10" data-testid="card-email-contact">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">Email us at</p>
            <a
              href="mailto:support@divorcecalculatoruk.co.uk"
              className="text-lg font-semibold text-primary hover:underline break-all"
              data-testid="link-support-email"
            >
              support@divorcecalculatoruk.co.uk
            </a>
          </div>
        </div>

        <h2 className="text-base font-semibold mb-4 text-foreground">Common questions — quick answers</h2>
        <div className="space-y-3 mb-10">
          <div className="rounded-lg border border-border p-4 flex gap-4" data-testid="card-quick-help-access">
            <RefreshCw className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">I've lost my access link</p>
              <p className="text-sm text-muted-foreground">
                Use the{" "}
                <Link href="/recover" className="text-primary underline underline-offset-2">
                  Recover Access
                </Link>{" "}
                page. Enter the email address you used at checkout and we'll resend your session link automatically — no need to email us.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4 flex gap-4" data-testid="card-quick-help-methodology">
            <BookOpen className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">I want to understand how the figures are calculated</p>
              <p className="text-sm text-muted-foreground">
                Our{" "}
                <Link href="/methodology" className="text-primary underline underline-offset-2">
                  Model Methodology
                </Link>{" "}
                page explains every calculation in plain English — tax assumptions, CMS rates, scenario logic, and the limitations of the model.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4 flex gap-4" data-testid="card-quick-help-billing">
            <CreditCard className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">I have a billing or payment question</p>
              <p className="text-sm text-muted-foreground">
                Email us at{" "}
                <a href="mailto:support@divorcecalculatoruk.co.uk" className="text-primary underline underline-offset-2">
                  support@divorcecalculatoruk.co.uk
                </a>
                . Please include the email address you used at checkout so we can locate your purchase quickly.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4 flex gap-4" data-testid="card-quick-help-technical">
            <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">I've found a bug or something isn't working</p>
              <p className="text-sm text-muted-foreground">
                Please email us with a description of what you were doing, the browser you're using, and your session token (shown on the results page under your access expiry date). This helps us reproduce and fix the issue quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted/40 border border-border/50 p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Please note:</span> We are not able to provide legal, tax, or financial advice by email. DivorceCalculatorUK is a financial modelling tool only. For advice specific to your circumstances, please consult a qualified solicitor, financial adviser, or mediator.
          </p>
        </div>
      </div>
    </div>
  );
}
