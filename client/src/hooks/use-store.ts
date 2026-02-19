import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { 
  AppConfigSchema,
} from '@shared/schema';

export interface Asset {
  id: string;
  name: string;
  category: string;
  owner: string;
  currentValue: number;
  liquidity: string;
  saleCostPct: number;
  taxCostPct: number;
  growthRate?: number;
  pensionType?: string;
  cetv?: number;
  securedLiabilityId?: string;
}

export interface Liability {
  id: string;
  name: string;
  category: string;
  owner: string;
  balance: number;
  interestAPR?: number;
  termYearsRemaining?: number;
  securedAgainstAssetId?: string;
}

export interface Income {
  id: string;
  name: string;
  owner: string;
  amountAnnualGross: number;
  amountAnnualNet?: number;
  taxTreatment: string;
  growthRate?: number;
}

export interface Expense {
  id: string;
  name: string;
  owner: string;
  amountAnnual: number;
  category: string;
  inflationLinked: boolean;
}

export interface Assumptions {
  splitRatio: number;
  splitPropertyToA: number;
  splitPensionToA: number;
  projectionYears: number;
  inflationRate: number;
  includeTaxModel: boolean;
  includeCMSEstimate: boolean;
  mortgageAPR: number;
  mortgageTermYears: number;
  overrideNetIncomeA?: number | null;
  overrideNetIncomeB?: number | null;
  overrideCMSAnnual?: number | null;
}

export interface Children {
  numChildren: number;
  childAges: number[];
  nightsWithA: number;
  nightsWithB: number;
}

export interface Scenarios {
  S1_Sell_Split: { enabled: boolean; params: Record<string, any> };
  S2_A_Keeps_Home: { enabled: boolean; params: Record<string, any> };
  S3_B_Keeps_Home: { enabled: boolean; params: Record<string, any> };
  S4_Joint_Then_Sell: { enabled: boolean; params: Record<string, any> };
}

export interface StoreState {
  assets: Asset[];
  liabilities: Liability[];
  incomes: Income[];
  expenses: Expense[];
  config: { taxYear: string; currency: string };
  scenarios: Scenarios;
  assumptions: Assumptions;
  children: Children;
}

const initialState: StoreState = {
  assets: [],
  liabilities: [],
  incomes: [],
  expenses: [],
  config: {
    taxYear: "2025/26",
    currency: "GBP"
  },
  scenarios: {
    S1_Sell_Split: { enabled: true, params: {} },
    S2_A_Keeps_Home: { enabled: false, params: {} },
    S3_B_Keeps_Home: { enabled: false, params: {} },
    S4_Joint_Then_Sell: { enabled: false, params: {} },
  },
  assumptions: {
    splitRatio: 0.5,
    splitPropertyToA: 0.5,
    splitPensionToA: 0.5,
    projectionYears: 10,
    inflationRate: 0.02,
    includeTaxModel: true,
    includeCMSEstimate: false,
    mortgageAPR: 0.05,
    mortgageTermYears: 25,
  },
  children: {
    numChildren: 0,
    childAges: [],
    nightsWithA: 182,
    nightsWithB: 183,
  }
};

interface AppActions {
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAsset: (id: string, asset: Partial<Asset>) => void;
  removeAsset: (id: string) => void;
  
  addLiability: (liability: Omit<Liability, 'id'>) => void;
  updateLiability: (id: string, liability: Partial<Liability>) => void;
  removeLiability: (id: string) => void;

  addIncome: (income: Omit<Income, 'id'>) => void;
  updateIncome: (id: string, income: Partial<Income>) => void;
  removeIncome: (id: string) => void;

  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  removeExpense: (id: string) => void;

  updateConfig: (config: Partial<StoreState['config']>) => void;
  toggleScenario: (type: keyof Scenarios, enabled: boolean) => void;
  updateAssumptions: (assumptions: Partial<Assumptions>) => void;
  updateChildren: (children: Partial<Children>) => void;

  reset: () => void;
  loadState: (state: StoreState) => void;
}

export const useAppStore = create<StoreState & AppActions>()(
  persist(
    (set) => ({
      ...initialState,

      addAsset: (asset) => set((state) => ({ 
        assets: [...state.assets, { ...asset, id: uuidv4() }] 
      })),
      updateAsset: (id, updates) => set((state) => ({
        assets: state.assets.map(a => a.id === id ? { ...a, ...updates } : a)
      })),
      removeAsset: (id) => set((state) => ({
        assets: state.assets.filter(a => a.id !== id)
      })),

      addLiability: (liability) => set((state) => ({
        liabilities: [...state.liabilities, { ...liability, id: uuidv4() }]
      })),
      updateLiability: (id, updates) => set((state) => ({
        liabilities: state.liabilities.map(l => l.id === id ? { ...l, ...updates } : l)
      })),
      removeLiability: (id) => set((state) => ({
        liabilities: state.liabilities.filter(l => l.id !== id)
      })),

      addIncome: (income) => set((state) => ({
        incomes: [...state.incomes, { ...income, id: uuidv4() }]
      })),
      updateIncome: (id, updates) => set((state) => ({
        incomes: state.incomes.map(i => i.id === id ? { ...i, ...updates } : i)
      })),
      removeIncome: (id) => set((state) => ({
        incomes: state.incomes.filter(i => i.id !== id)
      })),

      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, { ...expense, id: uuidv4() }]
      })),
      updateExpense: (id, updates) => set((state) => ({
        expenses: state.expenses.map(e => e.id === id ? { ...e, ...updates } : e)
      })),
      removeExpense: (id) => set((state) => ({
        expenses: state.expenses.filter(e => e.id !== id)
      })),

      updateConfig: (configUpdates) => set((state) => ({
        config: { ...state.config, ...configUpdates }
      })),
      toggleScenario: (type, enabled) => set((state) => ({
        scenarios: {
          ...state.scenarios,
          [type]: { ...state.scenarios[type], enabled }
        }
      })),
      updateAssumptions: (updates) => set((state) => ({
        assumptions: { ...state.assumptions, ...updates }
      })),
      updateChildren: (updates) => set((state) => {
        const merged = { ...state.children, ...updates };
        if ('numChildren' in updates && updates.numChildren !== undefined) {
          const n = updates.numChildren;
          const existing = merged.childAges || [];
          if (n > existing.length) {
            merged.childAges = [...existing, ...Array(n - existing.length).fill(5)];
          } else {
            merged.childAges = existing.slice(0, n);
          }
        }
        return { children: merged };
      }),

      reset: () => set(initialState),
      loadState: (newState) => set(newState),
    }),
    {
      name: 'divorce-model-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && state.children) {
          const c = state.children;
          if (!c.childAges || c.childAges.length === 0) {
            if (c.numChildren > 0) {
              c.childAges = Array(c.numChildren).fill(5);
            } else {
              c.childAges = [];
            }
          } else if (c.childAges.length < c.numChildren) {
            c.childAges = [...c.childAges, ...Array(c.numChildren - c.childAges.length).fill(5)];
          }
        }
      },
    }
  )
);
