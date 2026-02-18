import { useMemo } from 'react';
import { useAppStore } from './use-store';
import { AppState } from '@shared/schema';

// This is a simplified "Engine" for demonstration. 
// In a real app, this would be much more complex and likely in its own lib/engine folder.

export interface SimulationResult {
  netWorth: {
    total: number;
    partyA: number;
    partyB: number;
  };
  liquidity: {
    partyA: number;
    partyB: number;
  };
  budget: {
    surplusA: number;
    surplusB: number;
  };
  projection: Array<{
    year: number;
    assetsA: number;
    assetsB: number;
  }>;
}

export function useEngine() {
  const state = useAppStore();

  const result = useMemo<SimulationResult>(() => {
    return calculateScenario(state);
  }, [state.assets, state.liabilities, state.incomes, state.expenses, state.config]);

  return result;
}

function calculateScenario(state: AppState): SimulationResult {
  // 1. Calculate Net Worth
  let assetsA = 0;
  let assetsB = 0;
  
  state.assets.forEach(a => {
    const val = a.currentValue * (1 - a.saleCostPct - a.taxCostPct);
    if (a.owner === 'A') assetsA += val;
    else if (a.owner === 'B') assetsB += val;
    else {
      assetsA += val / 2;
      assetsB += val / 2;
    }
  });

  let liabilitiesA = 0;
  let liabilitiesB = 0;

  state.liabilities.forEach(l => {
    if (l.owner === 'A') liabilitiesA += l.balance;
    else if (l.owner === 'B') liabilitiesB += l.balance;
    else {
      liabilitiesA += l.balance / 2;
      liabilitiesB += l.balance / 2;
    }
  });

  const netWorthA = assetsA - liabilitiesA;
  const netWorthB = assetsB - liabilitiesB;

  // 2. Calculate Budget
  let incomeA = state.incomes.filter(i => i.owner === 'A').reduce((sum, i) => sum + (i.amountAnnualNet || i.amountAnnualGross * 0.8), 0);
  let incomeB = state.incomes.filter(i => i.owner === 'B').reduce((sum, i) => sum + (i.amountAnnualNet || i.amountAnnualGross * 0.8), 0);

  let expenseA = state.expenses.filter(e => e.owner === 'A').reduce((sum, e) => sum + e.amountAnnual, 0);
  let expenseB = state.expenses.filter(e => e.owner === 'B').reduce((sum, e) => sum + e.amountAnnual, 0);
  let expenseShared = state.expenses.filter(e => e.owner === 'shared').reduce((sum, e) => sum + e.amountAnnual, 0);

  const surplusA = incomeA - expenseA - (expenseShared / 2);
  const surplusB = incomeB - expenseB - (expenseShared / 2);

  // 3. Simple Projection
  const projection = [];
  let currentAssetsA = netWorthA;
  let currentAssetsB = netWorthB;

  for (let i = 0; i <= 10; i++) {
    projection.push({
      year: new Date().getFullYear() + i,
      assetsA: currentAssetsA,
      assetsB: currentAssetsB,
    });

    // Grow by inflation + surplus
    currentAssetsA = currentAssetsA * (1 + state.config.inflationRate) + surplusA;
    currentAssetsB = currentAssetsB * (1 + state.config.inflationRate) + surplusB;
  }

  return {
    netWorth: {
      total: netWorthA + netWorthB,
      partyA: netWorthA,
      partyB: netWorthB,
    },
    liquidity: {
      partyA: netWorthA * 0.6, // Mock liquidity calculation
      partyB: netWorthB * 0.6,
    },
    budget: {
      surplusA,
      surplusB,
    },
    projection
  };
}
