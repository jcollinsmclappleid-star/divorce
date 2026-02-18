
import { describe, it, expect } from "vitest";
import fixtures from "./fixtures.divorceModel.v1.json";
import { DivorceModelInputsSchema } from "@shared/schema";
import { calculateCommon, calculateScenarioS1, calculateScenarioS2, calculateScenarioS4, calculateCMSWeekly } from "../index";

function closeTo(actual: number, expected: number, tol = 0.5) {
  expect(actual).toBeGreaterThanOrEqual(expected - tol);
  expect(actual).toBeLessThanOrEqual(expected + tol);
}

describe("Fixtures", () => {
  for (const f of fixtures as any[]) {
    it(f.name, () => {
      const parsed = DivorceModelInputsSchema.safeParse(f.inputs);
      if (f.expected?.shouldFailValidation) {
        expect(parsed.success).toBe(false);
        return;
      }
      if (!parsed.success) {
        console.error("Validation failed for", f.name, parsed.error);
      }
      expect(parsed.success).toBe(true);

      const common = calculateCommon(parsed.data as any);

      if (f.expected?.common?.primaryHome?.netSaleEquity !== undefined) {
        expect(common.primaryHome.netSaleEquity).toBeCloseTo(f.expected.common.primaryHome.netSaleEquity, 2);
      }
      if (f.expected?.common?.totalLiquid !== undefined) {
        expect(common.totalLiquid).toBeCloseTo(f.expected.common.totalLiquid, 2);
      }
      if (f.expected?.common?.totalPensionCETV !== undefined) {
        expect(common.totalPensionCETV).toBeCloseTo(f.expected.common.totalPensionCETV, 2);
      }

      if (f.expected?.scenarioS1) {
        const s1 = calculateScenarioS1(parsed.data as any, common);
        if (f.expected.scenarioS1.poolLiquidPlusSoldProperty !== undefined) {
          expect(s1.poolLiquidPlusSoldProperty).toBeCloseTo(f.expected.scenarioS1.poolLiquidPlusSoldProperty, 2);
        }
        if (f.expected.scenarioS1.liquidStart) {
          expect(s1.liquidStart.A).toBeCloseTo(f.expected.scenarioS1.liquidStart.A, 2);
          expect(s1.liquidStart.B).toBeCloseTo(f.expected.scenarioS1.liquidStart.B, 2);
        }
      }

      if (f.expected?.scenarioS2_A_keeps_home) {
        const s2 = calculateScenarioS2(parsed.data as any, common);
        if (f.expected.scenarioS2_A_keeps_home.buyoutToB !== undefined) {
          expect(s2.buyoutToB).toBeCloseTo(f.expected.scenarioS2_A_keeps_home.buyoutToB, 2);
        }
        if (f.expected.scenarioS2_A_keeps_home.fundingGap !== undefined) {
          expect(s2.fundingGap).toBeCloseTo(f.expected.scenarioS2_A_keeps_home.fundingGap, 2);
        }
        if (f.expected.scenarioS2_A_keeps_home.liquidStartAfterClamp) {
          expect(s2.liquidStart.A).toBeCloseTo(f.expected.scenarioS2_A_keeps_home.liquidStartAfterClamp.A, 2);
          expect(s2.liquidStart.B).toBeCloseTo(f.expected.scenarioS2_A_keeps_home.liquidStartAfterClamp.B, 2);
        }
        if (f.expected.scenarioS2_A_keeps_home.affordability) {
          expect(s2.affordability.affordable).toBe(f.expected.scenarioS2_A_keeps_home.affordability.affordable);
        }
      }

      if (f.expected?.netIncomeAnnual) {
        if (f.expected.netIncomeAnnual.A !== undefined) {
          expect(common.netIncomeAnnual.A).toBeCloseTo(f.expected.netIncomeAnnual.A, 2);
        }
        if (f.expected.netIncomeAnnual.B !== undefined) {
          expect(common.netIncomeAnnual.B).toBeCloseTo(f.expected.netIncomeAnnual.B, 2);
        }
      }

      if (f.expected?.cmsEstimate?.weeklyAmount !== undefined) {
        const cms = calculateCMSWeekly(parsed.data as any);
        expect(cms.weeklyAmount).toBe(f.expected.cmsEstimate.weeklyAmount);
      }
      
      if (f.expected?.cmsEstimate?.weeklyAmountApprox !== undefined) {
        const cms = calculateCMSWeekly(parsed.data as any);
        closeTo(cms.weeklyAmount, f.expected.cmsEstimate.weeklyAmountApprox, 1.0);
      }
    });
  }
});
