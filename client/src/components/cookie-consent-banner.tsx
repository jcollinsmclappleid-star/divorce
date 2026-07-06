import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { getCookieConsent, setCookieConsent } from "@/lib/cookie-consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  if (!visible) return null;

  function accept() {
    setCookieConsent("accepted");
    setVisible(false);
  }

  function decline() {
    setCookieConsent("declined");
    setVisible(false);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200/90 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 safe-area-inset-bottom"
      role="dialog"
      aria-label="Cookie consent"
      data-testid="cookie-consent-banner"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-2.5">
        <p className="text-[11px] leading-snug text-slate-600 sm:max-w-[70%]">
          We use optional analytics cookies to understand how the site is used and improve it.{" "}
          <Link href="/privacy#cookies" className="font-medium text-primary underline underline-offset-2">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={decline}
            className="h-7 px-2.5 text-[11px] font-medium"
            data-testid="button-cookie-decline"
          >
            Decline
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={accept}
            className="h-7 px-2.5 text-[11px] font-semibold bg-primary hover:bg-primary/90"
            data-testid="button-cookie-accept"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
