/** Cookie consent storage and consent-gated Google Analytics (G-26BB9XFNH5). */

export const COOKIE_CONSENT_KEY = "dfm-cookie-consent";

export type CookieConsent = "accepted" | "declined";

const GA_MEASUREMENT_ID = "G-26BB9XFNH5";

let analyticsLoaded = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getCookieConsent(): CookieConsent | null {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "declined") return value;
  } catch {
    /* private browsing */
  }
  return null;
}

export function setCookieConsent(value: CookieConsent): void {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  if (value === "accepted") {
    enableGoogleAnalytics();
  }
}

export function clearCookieConsent(): void {
  try {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {
    /* ignore */
  }
}

export function enableGoogleAnalytics(): void {
  if (analyticsLoaded || typeof window === "undefined") return;
  analyticsLoaded = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
}

/** Apply stored preference on app load (analytics only if previously accepted). */
export function initCookieConsent(): void {
  if (getCookieConsent() === "accepted") {
    enableGoogleAnalytics();
  }
}
