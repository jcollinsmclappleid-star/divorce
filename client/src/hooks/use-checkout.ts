import { useCallback, useEffect, useState } from "react";

/** Stripe checkout — resets loading when user navigates back from payment page (bfcache). */
export function useCheckout(sessionToken: string | null | undefined) {
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const resetLoading = () => setCheckoutLoading(false);
    const onVisible = () => {
      if (document.visibilityState === "visible") resetLoading();
    };
    window.addEventListener("pageshow", resetLoading);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("pageshow", resetLoading);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const handleCheckout = useCallback(async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout failed:", data.message || "Unknown error");
        alert("Payment page failed to load. Please try again.");
        setCheckoutLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("An error occurred. Please try again.");
      setCheckoutLoading(false);
    }
  }, [sessionToken]);

  return { checkoutLoading, handleCheckout };
}
