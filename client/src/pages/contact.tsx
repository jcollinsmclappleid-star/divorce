import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Mail, RefreshCw, BookOpen, CreditCard,
  AlertCircle, Clock, Shield, MessageSquare, ArrowRight,
  CheckCircle, Phone,
} from "lucide-react";

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

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[hsl(220_52%_18%)] via-[hsl(220_52%_22%)] to-[hsl(220_48%_26%)] text-white">
        <div className="container mx-auto px-4 max-w-3xl py-14">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-6 text-white/70 hover:text-white hover:bg-white/10 -ml-2"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>

          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-gold" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Support</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3" data-testid="text-contact-title">
            Contact &amp; Support
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xl">
            All support messages are read and replied to directly. No bots, no outsourced queue.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-3 mt-7">
            {[
              { icon: Clock,   label: "Typical response", value: "Within 24 hours" },
              { icon: Shield,  label: "Support type",      value: "UK-based, direct" },
              { icon: Phone,   label: "Method",            value: "Email only" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5">
                <s.icon className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider leading-none mb-0.5">{s.label}</p>
                  <p className="text-sm font-semibold text-white leading-none">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Email CTA ── */}
      <div className="container mx-auto px-4 max-w-3xl -mt-5">
        <div
          className="bg-white rounded-2xl shadow-lg border border-gold/20 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          data-testid="card-email-contact"
        >
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6 text-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Email us at</p>
            <a
              href="mailto:support@divorcecalculatoruk.co.uk"
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors break-all"
              data-testid="link-support-email"
            >
              support@divorcecalculatoruk.co.uk
            </a>
            <p className="text-xs text-muted-foreground mt-1">We'll reply directly — typically within 24 hours on weekdays.</p>
          </div>
          <a href="mailto:support@divorcecalculatoruk.co.uk" className="shrink-0">
            <Button className="bg-gold hover:bg-gold/90 text-white border-0 shadow-sm shadow-gold/20" data-testid="button-email-cta">
              Send email <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </a>
        </div>
      </div>

      {/* ── Quick help cards ── */}
      <div className="container mx-auto px-4 max-w-3xl py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Common questions — sorted instantly</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: RefreshCw,
              color:  "text-cyan-600",
              bg:     "bg-cyan-50",
              border: "border-cyan-100",
              title:  "Lost your access link?",
              body:   "Use the Access Recovery page — enter the email you used at checkout and we'll resend your session link automatically. No need to email us at all.",
              cta:    { label: "Recover access →", href: "/recover" },
              testid: "card-quick-help-access",
            },
            {
              icon: BookOpen,
              color:  "text-violet-600",
              bg:     "bg-violet-50",
              border: "border-violet-100",
              title:  "Want to understand the figures?",
              body:   "Our Model Methodology page explains every calculation in plain English — tax rates, CMS formula, scenario logic, lending benchmarks, and what the model cannot do.",
              cta:    { label: "View methodology →", href: "/methodology" },
              testid: "card-quick-help-methodology",
            },
            {
              icon: CreditCard,
              color:  "text-emerald-600",
              bg:     "bg-emerald-50",
              border: "border-emerald-100",
              title:  "Billing or payment question?",
              body:   "Email us at support@divorcecalculatoruk.co.uk. Include the email address you used at checkout so we can locate your purchase quickly.",
              cta:    { label: "Email us →", href: "mailto:support@divorcecalculatoruk.co.uk" },
              testid: "card-quick-help-billing",
            },
            {
              icon: AlertCircle,
              color:  "text-rose-600",
              bg:     "bg-rose-50",
              border: "border-rose-100",
              title:  "Found a bug?",
              body:   "Email us with: what you were doing, the browser you're using, and your session token (shown on the results page). This lets us reproduce and fix it quickly.",
              cta:    { label: "Report a bug →", href: "mailto:support@divorcecalculatoruk.co.uk?subject=Bug%20report" },
              testid: "card-quick-help-technical",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border ${card.border} bg-white p-5 flex flex-col gap-3 shadow-sm`}
              data-testid={card.testid}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center shrink-0`}>
                  <card.icon className={`w-4.5 h-4.5 ${card.color}`} />
                </div>
                <p className="text-sm font-semibold text-foreground leading-tight">{card.title}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              {card.cta.href.startsWith("/") ? (
                <Link href={card.cta.href} className={`text-xs font-semibold ${card.color} mt-auto`}>
                  {card.cta.label}
                </Link>
              ) : (
                <a href={card.cta.href} className={`text-xs font-semibold ${card.color} mt-auto`}>
                  {card.cta.label}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* What we can help with vs can't */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> We can help with
            </p>
            <ul className="space-y-2">
              {[
                "Access and account recovery",
                "Payment and billing queries",
                "How to use the tool",
                "Understanding model outputs",
                "Technical bugs or errors",
                "Refund requests",
              ].map((item) => (
                <li key={item} className="text-sm text-emerald-800 flex items-start gap-2">
                  <span className="text-emerald-500 shrink-0 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-100 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> Outside our scope
            </p>
            <ul className="space-y-2">
              {[
                "Legal advice on your settlement",
                "Tax advice specific to your situation",
                "Financial planning recommendations",
                "Mortgage or lending advice",
                "Pension valuation guidance",
                "Predicting court outcomes",
              ].map((item) => (
                <li key={item} className="text-sm text-amber-800 flex items-start gap-2">
                  <span className="text-amber-500 shrink-0 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl bg-muted/30 border border-border/50 p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Important: </span>
            DivorceCalculatorUK is a financial modelling tool only. We cannot provide legal, tax, or financial advice by email or otherwise. For advice specific to your circumstances, please consult a qualified solicitor, financial adviser, or mediator.
          </p>
        </div>
      </div>
    </div>
  );
}
