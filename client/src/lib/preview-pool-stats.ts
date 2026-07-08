import type { Asset } from "@/hooks/use-store";

type Intermediate = {
  netHomeEquity: number;
  totalLiquid: number;
};

export type PreviewPoolStats = {
  /** Net home equity + liquid savings/investments — capital split in scenarios. */
  settlementPool: number;
  /** Total pension CETV across both parties. */
  pensionTotal: number;
  /** Settlement pool + pensions — full marital estate from entered figures. */
  totalEstate: number;
  halfSettlementPool: number;
  halfTotalEstate: number;
};

export function sumPensionCetv(assets: Asset[]): number {
  return assets
    .filter((a) => a.category === "pension")
    .reduce((s, p) => s + (p.cetv ?? p.currentValue ?? 0), 0);
}

/** Single source of truth for preview / nurture pool figures. */
export function getPreviewPoolStats(intermediate: Intermediate, assets: Asset[]): PreviewPoolStats {
  const settlementPool = intermediate.netHomeEquity + intermediate.totalLiquid;
  const pensionTotal = sumPensionCetv(assets);
  return {
    settlementPool,
    pensionTotal,
    totalEstate: settlementPool + pensionTotal,
    halfSettlementPool: Math.round(settlementPool / 2),
    halfTotalEstate: Math.round((settlementPool + pensionTotal) / 2),
  };
}
