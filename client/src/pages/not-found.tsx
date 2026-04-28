import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Info, PoundSterling, Mail } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { scrollTop } from "@/lib/utils";

export default function NotFound() {
  useDocumentTitle("Page Not Found | DivorceCalculatorUK");

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <p className="text-gold font-mono text-sm tracking-widest uppercase">404</p>
        <h1
          className="text-3xl md:text-4xl font-display font-bold text-white leading-tight"
          data-testid="text-404-headline"
        >
          This page doesn't exist — but your financial clarity does.
        </h1>
        <p className="text-white/60 text-sm leading-relaxed">
          The page you were looking for isn't here. Use the links below to find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/" onClick={scrollTop}>
            <Button
              className="bg-gold hover:bg-gold/90 text-white border-0 w-full sm:w-auto"
              data-testid="button-404-home"
            >
              <Home className="w-4 h-4 mr-1.5" />
              Go to Home
            </Button>
          </Link>
          <Link href="/wizard" onClick={scrollTop}>
            <Button
              variant="outline"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent w-full sm:w-auto"
              data-testid="button-404-wizard"
            >
              Start modelling — free
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-5 pt-2">
          {[
            { href: "/how-it-works", label: "How It Works", icon: Info },
            { href: "/pricing", label: "Pricing", icon: PoundSterling },
            { href: "/contact", label: "Contact", icon: Mail },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={scrollTop}
              className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              data-testid={`link-404-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <link.icon className="w-3.5 h-3.5" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
