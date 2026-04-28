import type { StoreState } from "@/hooks/use-store";
import type { EngineResult } from "@/hooks/use-engine";

export function computeConfidence(
  store: StoreState,
  engine: EngineResult
): "High" | "Medium" | "Low" {
  const hasProperty = store.assets.some(
    (a) => a.category === "primary_home" && a.currentValue > 0
  );
  const hasMortgage = store.liabilities.some(
    (l) => l.category === "mortgage" && l.balance > 0
  );
  const incomeA = engine.taxA.gross;
  const incomeB = engine.taxB.gross;
  const bothHaveIncome = incomeA > 0 && incomeB > 0;
  const eitherHasIncome = incomeA > 0 || incomeB > 0;
  const hasPension = store.assets.some((a) => a.category === "pension");
  const allPensionsHaveCETV = store.assets
    .filter((a) => a.category === "pension")
    .every((p) => (p.cetv ?? 0) > 0 || p.currentValue > 0);
  const enabledScenariosCount = [
    store.scenarios.S1_Sell_Split.enabled,
    store.scenarios.S2_A_Keeps_Home.enabled,
    store.scenarios.S3_B_Keeps_Home.enabled,
    store.scenarios.S4_Joint_Then_Sell.enabled,
  ].filter(Boolean).length;
  const moreThanBaseScenario = enabledScenariosCount > 1;
  const assetCount = store.assets.length;
  const liabilityCount = store.liabilities.length;

  // Low: very sparse data
  if (!eitherHasIncome && assetCount <= 1) return "Low";
  if (!eitherHasIncome && assetCount === 0) return "Low";
  if (assetCount === 0) return "Low";

  // High: comprehensive data
  if (
    hasProperty &&
    hasMortgage &&
    bothHaveIncome &&
    moreThanBaseScenario &&
    (!hasPension || allPensionsHaveCETV)
  ) {
    return "High";
  }

  // Medium: partial data
  return "Medium";
}
