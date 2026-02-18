import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { 
  AppState, 
  Asset, 
  Liability, 
  Income, 
  Expense, 
  AppConfigSchema,
  ScenarioType
} from '@shared/schema';

// Initial Empty State
const initialState: any = {
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
    S5_No_Property: { enabled: false, params: {} },
  }
};

interface AppActions {
  // Assets
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAsset: (id: string, asset: Partial<Asset>) => void;
  removeAsset: (id: string) => void;
  
  // Liabilities
  addLiability: (liability: Omit<Liability, 'id'>) => void;
  updateLiability: (id: string, liability: Partial<Liability>) => void;
  removeLiability: (id: string) => void;

  // Incomes
  addIncome: (income: Omit<Income, 'id'>) => void;
  updateIncome: (id: string, income: Partial<Income>) => void;
  removeIncome: (id: string) => void;

  // Expenses
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  removeExpense: (id: string) => void;

  // Config & Scenarios
  updateConfig: (config: Partial<AppState['config']>) => void;
  toggleScenario: (type: keyof typeof ScenarioType.Values, enabled: boolean) => void;

  // Management
  reset: () => void;
  loadState: (state: AppState) => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      ...initialState,

      // Assets
      addAsset: (asset) => set((state) => ({ 
        assets: [...state.assets, { ...asset, id: uuidv4() }] 
      })),
      updateAsset: (id, updates) => set((state) => ({
        assets: state.assets.map(a => a.id === id ? { ...a, ...updates } : a)
      })),
      removeAsset: (id) => set((state) => ({
        assets: state.assets.filter(a => a.id !== id)
      })),

      // Liabilities
      addLiability: (liability) => set((state) => ({
        liabilities: [...state.liabilities, { ...liability, id: uuidv4() }]
      })),
      updateLiability: (id, updates) => set((state) => ({
        liabilities: state.liabilities.map(l => l.id === id ? { ...l, ...updates } : l)
      })),
      removeLiability: (id) => set((state) => ({
        liabilities: state.liabilities.filter(l => l.id !== id)
      })),

      // Incomes
      addIncome: (income) => set((state) => ({
        incomes: [...state.incomes, { ...income, id: uuidv4() }]
      })),
      updateIncome: (id, updates) => set((state) => ({
        incomes: state.incomes.map(i => i.id === id ? { ...i, ...updates } : i)
      })),
      removeIncome: (id) => set((state) => ({
        incomes: state.incomes.filter(i => i.id !== id)
      })),

      // Expenses
      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, { ...expense, id: uuidv4() }]
      })),
      updateExpense: (id, updates) => set((state) => ({
        expenses: state.expenses.map(e => e.id === id ? { ...e, ...updates } : e)
      })),
      removeExpense: (id) => set((state) => ({
        expenses: state.expenses.filter(e => e.id !== id)
      })),

      // Config & Scenarios
      updateConfig: (configUpdates) => set((state) => ({
        config: { ...state.config, ...configUpdates }
      })),
      toggleScenario: (type, enabled) => set((state) => ({
        scenarios: {
          ...state.scenarios,
          [type]: { ...state.scenarios[type as any], enabled }
        }
      })),

      // Management
      reset: () => set(initialState),
      loadState: (newState) => set(newState),
    }),
    {
      name: 'divorce-model-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
