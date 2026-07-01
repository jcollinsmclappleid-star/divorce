import { useState, useCallback } from "react";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useSessionToken } from "@/hooks/use-access";
import { buildPayload } from "@/lib/guided-summary/buildPayload";
import type { GuidedSummary } from "@/lib/guided-summary/types";

export function useGuidedSummaryGenerate() {
  const store = useAppStore();
  const engine = useEngine();
  const sessionToken = useSessionToken();
  const { guidedSummary, guidedSummaryStatus, setGuidedSummary, setGuidedSummaryStatus } = store;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const generate = useCallback(async () => {
    setErrorMessage(null);
    setGuidedSummaryStatus("loading");
    try {
      const payload = buildPayload(store, engine);
      const res = await fetch("/api/guided-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken, payload }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      const data: GuidedSummary = await res.json();
      setGuidedSummary(data);
      setGuidedSummaryStatus("done");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
      setGuidedSummaryStatus("error");
    }
  }, [store, engine, sessionToken, setGuidedSummary, setGuidedSummaryStatus]);

  const resetForRegenerate = useCallback(() => {
    setGuidedSummary(null);
    setGuidedSummaryStatus("idle");
    setErrorMessage(null);
  }, [setGuidedSummary, setGuidedSummaryStatus]);

  return {
    guidedSummary,
    guidedSummaryStatus,
    errorMessage,
    generate,
    resetForRegenerate,
  };
}
