import type { LucideIcon } from "lucide-react";
import {
  PiggyBank,
  TrendingUp,
  Car,
  Briefcase,
  Home,
  Gem,
  CreditCard,
  Landmark,
  GraduationCap,
  Receipt,
} from "lucide-react";

import type { Asset, Liability } from "@/hooks/use-store";

export type WizardOwner = "A" | "B" | "joint";
export type OwnerScope = "individual" | "joint";

export interface AssetTemplate {
  id: string;
  label: string;
  category: string;
  hint: string;
  icon: LucideIcon;
  ownerScope: OwnerScope;
  liquidity: "liquid" | "illiquid";
  /** Typical UK planning figure shown when tile opens */
  typical: number;
  color: string;
}

export interface DebtTemplate {
  id: string;
  label: string;
  category: string;
  hint: string;
  icon: LucideIcon;
  ownerScope: OwnerScope;
  typical: number;
  color: string;
}

export const UK_ASSET_BENCHMARKS = [
  { name: "Cash / savings", category: "cash", value: 4250 },
  { name: "ISA / investments", category: "investments", value: 7500 },
  { name: "Vehicle", category: "vehicle", value: 8000 },
] as const;

export const UK_JOINT_ASSET_BENCHMARKS = [
  { name: "Joint savings account", category: "cash", value: 8500 },
  { name: "ISA / investments (joint)", category: "investments", value: 15000 },
] as const;

export const UK_DEBT_BENCHMARKS = [
  { name: "Credit card", category: "credit_card", balance: 2400 },
  { name: "Personal loan", category: "loan", balance: 4500 },
  { name: "Car finance", category: "loan", balance: 6500 },
] as const;

export const INDIVIDUAL_ASSET_TEMPLATES: AssetTemplate[] = [
  {
    id: "cash",
    label: "Cash / savings",
    category: "cash",
    icon: PiggyBank,
    ownerScope: "individual",
    liquidity: "liquid",
    typical: 4250,
    color: "#10B981",
    hint: "Current or easy-access accounts in one person's name",
  },
  {
    id: "isa",
    label: "ISA",
    category: "investments",
    icon: TrendingUp,
    ownerScope: "individual",
    liquidity: "liquid",
    typical: 7500,
    color: "#3B82F6",
    hint: "Individual Savings Account — use your latest statement value",
  },
  {
    id: "stocks",
    label: "Stocks & shares",
    category: "investments",
    icon: TrendingUp,
    ownerScope: "individual",
    liquidity: "liquid",
    typical: 10000,
    color: "#6366F1",
    hint: "Share portfolios or platforms (e.g. Hargreaves Lansdown, Vanguard)",
  },
  {
    id: "vehicle",
    label: "Vehicle",
    category: "vehicle",
    icon: Car,
    ownerScope: "individual",
    liquidity: "illiquid",
    typical: 8000,
    color: "#06B6D4",
    hint: "Car, motorbike or other vehicle — trade-in or private sale value",
  },
  {
    id: "business",
    label: "Business interest",
    category: "business",
    icon: Briefcase,
    ownerScope: "individual",
    liquidity: "illiquid",
    typical: 25000,
    color: "#8B5CF6",
    hint: "Share of a business — recent valuation or accountant's estimate",
  },
];

export const JOINT_ASSET_TEMPLATES: AssetTemplate[] = [
  {
    id: "joint_savings",
    label: "Joint savings account",
    category: "cash",
    icon: PiggyBank,
    ownerScope: "joint",
    liquidity: "liquid",
    typical: 8500,
    color: "#10B981",
    hint: "Current or savings accounts held jointly",
  },
  {
    id: "joint_investments",
    label: "Joint ISA / investments",
    category: "investments",
    icon: TrendingUp,
    ownerScope: "joint",
    liquidity: "liquid",
    typical: 15000,
    color: "#3B82F6",
    hint: "Investment or ISA accounts held in both names",
  },
  {
    id: "premium_bonds",
    label: "Premium Bonds",
    category: "cash",
    icon: Landmark,
    ownerScope: "joint",
    liquidity: "liquid",
    typical: 5000,
    color: "#EAB308",
    hint: "NS&I Premium Bonds — check your NS&I balance",
  },
  {
    id: "buy_to_let",
    label: "Buy-to-let property",
    category: "other_property",
    icon: Home,
    ownerScope: "joint",
    liquidity: "illiquid",
    typical: 200000,
    color: "#F59E0B",
    hint: "Investment or rental property — current market value estimate",
  },
  {
    id: "valuables",
    label: "Valuables / jewellery",
    category: "personal_possessions",
    icon: Gem,
    ownerScope: "joint",
    liquidity: "illiquid",
    typical: 5000,
    color: "#EC4899",
    hint: "High-value items such as jewellery, art or collections",
  },
];

export const INDIVIDUAL_DEBT_TEMPLATES: DebtTemplate[] = [
  {
    id: "credit_card",
    label: "Credit card",
    category: "credit_card",
    icon: CreditCard,
    ownerScope: "individual",
    typical: 2400,
    color: "#F43F5E",
    hint: "Outstanding credit card balance",
  },
  {
    id: "car_finance",
    label: "Car finance",
    category: "loan",
    icon: Car,
    ownerScope: "individual",
    typical: 6500,
    color: "#06B6D4",
    hint: "HP, PCP or other vehicle finance",
  },
  {
    id: "student_loan",
    label: "Student loan",
    category: "loan",
    icon: GraduationCap,
    ownerScope: "individual",
    typical: 15000,
    color: "#8B5CF6",
    hint: "Student loan balance (Plan 1, 2, or postgrad)",
  },
  {
    id: "overdraft",
    label: "Overdraft",
    category: "loan",
    icon: Landmark,
    ownerScope: "individual",
    typical: 1500,
    color: "#F59E0B",
    hint: "Arranged or unarranged overdraft balance",
  },
  {
    id: "tax_owed",
    label: "Tax owed",
    category: "tax",
    icon: Receipt,
    ownerScope: "individual",
    typical: 2000,
    color: "#64748B",
    hint: "Outstanding liability to HMRC",
  },
];

export const JOINT_DEBT_TEMPLATES: DebtTemplate[] = [
  {
    id: "personal_loan",
    label: "Personal loan",
    category: "loan",
    icon: CreditCard,
    ownerScope: "joint",
    typical: 4500,
    color: "#F43F5E",
    hint: "Bank or building society loan in joint names",
  },
];

export function assetTemplatesForOwner(owner: WizardOwner): AssetTemplate[] {
  return owner === "joint" ? JOINT_ASSET_TEMPLATES : INDIVIDUAL_ASSET_TEMPLATES;
}

export function debtTemplatesForOwner(owner: WizardOwner): DebtTemplate[] {
  return owner === "joint" ? JOINT_DEBT_TEMPLATES : INDIVIDUAL_DEBT_TEMPLATES;
}

export function findAssetForTemplate(
  assets: Asset[],
  template: AssetTemplate,
  owner: WizardOwner,
): Asset | undefined {
  return assets.find(
    (a) =>
      a.owner === owner &&
      a.category === template.category &&
      a.name.toLowerCase().startsWith(template.label.toLowerCase()),
  );
}

export function findDebtForTemplate(
  liabilities: Liability[],
  template: DebtTemplate,
  owner: WizardOwner,
): Liability | undefined {
  return liabilities.find(
    (l) =>
      l.owner === owner &&
      l.category === template.category &&
      l.name.toLowerCase().startsWith(template.label.toLowerCase()),
  );
}

export function hasBenchmarkAssets(
  assets: { name: string; owner: string; category: string }[],
  owner: WizardOwner,
): boolean {
  return assets.some(
    (a) =>
      a.owner === owner &&
      a.category !== "primary_home" &&
      a.category !== "pension" &&
      a.name.includes("(starting estimate)"),
  );
}

export function benchmarkAssetTotal(
  assets: { name: string; owner: string; category: string; currentValue: number }[],
  owner: WizardOwner,
): number {
  return assets
    .filter(
      (a) =>
        a.owner === owner &&
        a.category !== "primary_home" &&
        a.category !== "pension" &&
        a.name.includes("(starting estimate)"),
    )
    .reduce((s, a) => s + a.currentValue, 0);
}

export function hasBenchmarkDebts(
  liabilities: { name: string; owner: string; category: string }[],
  owner: "A" | "B",
): boolean {
  return liabilities.some(
    (l) => l.category !== "mortgage" && l.owner === owner && l.name.includes("(starting estimate)"),
  );
}

export function benchmarkDebtTotal(
  liabilities: { name: string; owner: string; category: string; balance: number }[],
  owner: "A" | "B",
): number {
  return liabilities
    .filter((l) => l.category !== "mortgage" && l.owner === owner && l.name.includes("(starting estimate)"))
    .reduce((s, l) => s + l.balance, 0);
}
