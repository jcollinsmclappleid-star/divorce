import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  TrendingUp,
  Home,
  Coins,
  Baby,
  HeartHandshake,
} from "lucide-react";

import type { Income } from "@/hooks/use-store";

export type IncomeOwner = "A" | "B";

export interface IncomeTemplate {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  /** When set, template only appears on this owner's tab */
  ownerOnly?: IncomeOwner;
  typical: number;
  color: string;
  aliases: string[];
}

export interface SalaryBenchmark {
  id: string;
  label: string;
  grossAnnual: number;
  hint: string;
}

export const SALARY_BENCHMARKS: SalaryBenchmark[] = [
  { id: "parttime", label: "Part-time", grossAnnual: 18000, hint: "ONS LFS part-time median" },
  { id: "median", label: "Median salary", grossAnnual: 35000, hint: "ONS ASHE 2024 UK median" },
  { id: "above", label: "Above median", grossAnnual: 50000, hint: "Upper quartile estimate" },
  { id: "high", label: "Higher earner", grossAnnual: 75000, hint: "Top ~15% of earners" },
  { id: "senior", label: "Senior earner", grossAnnual: 100000, hint: "Senior professional bracket" },
  { id: "veryhigh", label: "Very high earner", grossAnnual: 125000, hint: "Upper professional / executive" },
];

export const INCOME_TEMPLATES: IncomeTemplate[] = [
  {
    id: "salary",
    label: "Salary",
    icon: Briefcase,
    typical: 35000,
    color: "#10B981",
    hint: "Annual gross salary before tax — check payslip or P60",
    aliases: ["salary", "wages", "employment", "earned"],
  },
  {
    id: "self_employment",
    label: "Self-employment",
    icon: TrendingUp,
    typical: 28000,
    color: "#C9A84C",
    hint: "Net profit from self-employment (before personal tax)",
    aliases: ["self-employ", "self employ", "freelance", "business income"],
  },
  {
    id: "rental",
    label: "Rental income",
    icon: Home,
    typical: 12000,
    color: "#06B6D4",
    hint: "Gross annual rent received — before mortgage costs",
    aliases: ["rental", "rent income", "property income"],
  },
  {
    id: "dividends",
    label: "Dividends",
    icon: Coins,
    typical: 5000,
    color: "#8B5CF6",
    hint: "Annual dividend income from shares or company ownership",
    aliases: ["dividend"],
  },
  {
    id: "child_benefit",
    label: "Child benefit",
    icon: Baby,
    ownerOnly: "A",
    typical: 1331,
    color: "#A855F7",
    hint: "Annual Child Benefit received (tax-free up to income threshold)",
    aliases: ["child benefit"],
  },
  {
    id: "other_benefits",
    label: "Other benefits",
    icon: HeartHandshake,
    typical: 6000,
    color: "#64748B",
    hint: "Universal Credit, Tax Credits, or other state benefits",
    aliases: ["benefit", "universal credit", "tax credit"],
  },
];

export function incomeTemplatesForOwner(owner: IncomeOwner): IncomeTemplate[] {
  return INCOME_TEMPLATES.filter((t) => !t.ownerOnly || t.ownerOnly === owner);
}

function normalizeIncomeName(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*$/g, "").trim().toLowerCase();
}

export function findIncomeForTemplate(
  incomes: Income[],
  owner: IncomeOwner,
  template: IncomeTemplate,
): Income | undefined {
  const ownerIncomes = incomes.filter((i) => i.owner === owner);
  const label = template.label.toLowerCase();

  const exact = ownerIncomes.find(
    (i) => normalizeIncomeName(i.name) === label || i.name.toLowerCase().startsWith(label),
  );
  if (exact) return exact;

  return ownerIncomes.find((i) => {
    const n = normalizeIncomeName(i.name);
    return template.aliases.some((a) => n.includes(a));
  });
}

export function findSalaryIncome(incomes: Income[], owner: IncomeOwner): Income | undefined {
  const salaryTemplate = INCOME_TEMPLATES.find((t) => t.id === "salary")!;
  return findIncomeForTemplate(incomes, owner, salaryTemplate);
}

export function activeSalaryBenchmark(
  incomes: Income[],
  owner: IncomeOwner,
): SalaryBenchmark | null {
  const salary = findSalaryIncome(incomes, owner);
  if (!salary || salary.amountAnnualGross <= 0) return null;
  return SALARY_BENCHMARKS.find((b) => b.grossAnnual === salary.amountAnnualGross) ?? null;
}

export interface MaintenancePreset {
  id: string;
  label: string;
  monthlyAmount: number;
  included: boolean;
  hint: string;
  color: string;
}

export const MAINTENANCE_PRESETS: MaintenancePreset[] = [
  {
    id: "none",
    label: "No spousal maintenance",
    monthlyAmount: 0,
    included: false,
    hint: "Clean break — no ongoing payments assumed",
    color: "#94a3b8",
  },
  {
    id: "low",
    label: "~£400/mo",
    monthlyAmount: 400,
    included: true,
    hint: "Lower end — shorter marriage / both working",
    color: "#06B6D4",
  },
  {
    id: "mid",
    label: "~£700/mo",
    monthlyAmount: 700,
    included: true,
    hint: "Mid-range — typical reported England & Wales figure",
    color: "#10B981",
  },
  {
    id: "high",
    label: "~£1,200/mo",
    monthlyAmount: 1200,
    included: true,
    hint: "Higher — significant income gap / longer marriage",
    color: "#C9A84C",
  },
];
