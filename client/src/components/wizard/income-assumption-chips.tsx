import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, BanknoteIcon, TrendingUp, TrendingDown, Minus,
  Check, Pencil, HeartHandshake, Ban
} from "lucide-react";
import { useAppStore, Income } from "@/hooks/use-store";
import { useInlineConfirm, InlineConfirm } from "./inline-confirm";
import { chartTheme } from "@/lib/chart-theme";

/*
 * Salary presets — ONS Annual Survey of Hours & Earnings 2024
 * Gross figures fed into the store; net estimates shown as hints only.
 * Net approximations use 2026/27 UK tax/NI (basic rate band, standard PA).
 */
interface SalaryPreset {
  key: string;
  label: string;
  grossAnnual: number;
  netMonthlyEst: number;
  hint: string;
  color: string;
}

const SALARY_PRESETS: SalaryPreset[] = [
  {
    key: "zero",
    label: "No earned income",
    grossAnnual: 0,
    netMonthlyEst: 0,
    hint: "Not currently in employment",
    color: "#94a3b8",
  },
  {
    key: "parttime",
    label: "Part-time",
    grossAnnual: 18000,
    netMonthlyEst: 1316,
    hint: "~£18,000/yr gross · ONS LFS part-time median",
    color: "#06B6D4",
  },
  {
    key: "median",
    label: "Median salary",
    grossAnnual: 35000,
    netMonthlyEst: 2300,
    hint: "~£35,000/yr gross · ONS ASHE 2024 UK median",
    color: "#10B981",
  },
  {
    key: "above",
    label: "Above median",
    grossAnnual: 50000,
    netMonthlyEst: 3142,
    hint: "~£50,000/yr gross · upper quartile estimate",
    color: "#C9A84C",
  },
  {
    key: "high",
    label: "Higher earner",
    grossAnnual: 75000,
    netMonthlyEst: 4375,
    hint: "~£75,000/yr gross · top ~15% of earners",
    color: "#8B5CF6",
  },
];

/*
 * Spousal maintenance presets — planning figures only, not a legal assessment.
 * Source: Stowe Family Law / Resolution reported ranges for England & Wales 2024.
 */
interface MaintenancePreset {
  key: string;
  label: string;
  monthlyAmount: number;
  included: boolean;
  hint: string;
  color: string;
}

const MAINTENANCE_PRESETS: MaintenancePreset[] = [
  {
    key: "none",
    label: "No spousal maintenance",
    monthlyAmount: 0,
    included: false,
    hint: "Clean break — no ongoing payments assumed",
    color: "#94a3b8",
  },
  {
    key: "low",
    label: "~£400/mo",
    monthlyAmount: 400,
    included: true,
    hint: "Lower end — shorter marriage / both working",
    color: "#06B6D4",
  },
  {
    key: "mid",
    label: "~£700/mo",
    monthlyAmount: 700,
    included: true,
    hint: "Mid-range — typical reported England & Wales figure",
    color: "#10B981",
  },
  {
    key: "high",
    label: "~£1,200/mo",
    monthlyAmount: 1200,
    included: true,
    hint: "Higher — significant income gap / longer marriage",
    color: "#C9A84C",
  },
];

function fmtK(n: number) {
  if (n === 0) return "£0";
  if (n >= 1000) return `£${(n / 1000).toFixed(0)}k`;
  return `£${n}`;
}

function fmtNet(n: number) {
  if (n === 0) return "£0/mo";
  return `~£${n.toLocaleString("en-GB")}/mo`;
}

function findSalaryIncome(incomes: Income[], owner: string): Income | undefined {
  return incomes.find(
    (i) =>
      i.owner === owner &&
      ["salary", "wages", "employment", "earned"].some((kw) =>
        i.name.toLowerCase().includes(kw)
      )
  );
}

function matchPreset(income: Income | undefined): string | null {
  if (!income) return null;
  return (
    SALARY_PRESETS.find((p) => p.grossAnnual === income.amountAnnualGross)
      ?.key ?? null
  );
}

interface SalaryChipProps {
  preset: SalaryPreset;
  active: boolean;
  currentGross?: number;
  onClick: () => void;
}

function SalaryChip({ preset, active, currentGross, onClick }: SalaryChipProps) {
  const Icon = preset.grossAnnual === 0 ? Ban : preset.grossAnnual >= 50000 ? TrendingUp : Briefcase;
  const displayGross = active && currentGross !== undefined ? currentGross : preset.grossAnnual;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: chartTheme.ease }}
      data-testid={`chip-salary-${preset.key}`}
      className={`relative rounded-lg border p-3 text-left transition-all overflow-hidden w-full ${
        active
          ? "bg-white border-gold/50 shadow-[0_4px_12px_-4px_rgba(201,168,76,0.25)]"
          : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
      }`}
    >
      {active && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
        </span>
      )}
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: preset.color }} />
        <span className="text-xs font-semibold text-[#1a3357] truncate">{preset.label}</span>
      </div>
      {active ? (
        <div className="flex items-baseline justify-between gap-1">
          <span className="text-base font-bold tabular-nums" style={{ color: preset.color }}>
            {fmtK(displayGross)}<span className="text-[10px] font-normal text-muted-foreground">/yr</span>
          </span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
            gross <Pencil className="w-2.5 h-2.5 opacity-60" />
          </span>
        </div>
      ) : (
        <div className="flex items-baseline justify-between gap-1">
          <span className="text-[11px] text-muted-foreground">
            {preset.grossAnnual > 0 ? fmtNet(preset.netMonthlyEst) : "—"} net est.
          </span>
          {preset.grossAnnual > 0 && (
            <span className="text-[10px] text-gold font-semibold">+ Apply</span>
          )}
        </div>
      )}
      <p className="text-[10px] text-muted-foreground/70 mt-1 leading-tight line-clamp-1">
        {preset.hint}
      </p>
    </motion.button>
  );
}

interface MaintenanceChipProps {
  preset: MaintenancePreset;
  active: boolean;
  onClick: () => void;
}

function MaintenanceChip({ preset, active, onClick }: MaintenanceChipProps) {
  const Icon = !preset.included ? Minus : preset.monthlyAmount >= 1000 ? TrendingUp : HeartHandshake;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: chartTheme.ease }}
      data-testid={`chip-maintenance-${preset.key}`}
      className={`relative rounded-lg border p-3 text-left transition-all overflow-hidden w-full ${
        active
          ? "bg-white border-gold/50 shadow-[0_4px_12px_-4px_rgba(201,168,76,0.25)]"
          : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
      }`}
    >
      {active && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
        </span>
      )}
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: preset.color }} />
        <span className="text-xs font-semibold text-[#1a3357] truncate">{preset.label}</span>
      </div>
      <div className="flex items-baseline justify-between gap-1">
        {active ? (
          <span className="text-base font-bold tabular-nums" style={{ color: preset.color }}>
            {preset.included ? `£${preset.monthlyAmount.toLocaleString("en-GB")}/mo` : "None"}
          </span>
        ) : (
          <span className="text-[11px] text-muted-foreground">
            {preset.included ? `£${preset.monthlyAmount}/mo planning` : "Clean break"}
          </span>
        )}
        {!active && preset.included && (
          <span className="text-[10px] text-gold font-semibold">+ Apply</span>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground/70 mt-1 leading-tight line-clamp-1">
        {preset.hint}
      </p>
    </motion.button>
  );
}

export function IncomeAssumptionChips() {
  const { incomes, addIncome, updateIncome, maintenance, updateMaintenance, profile } =
    useAppStore();

  const nameA = profile?.partyAName?.trim() || "Party A";
  const nameB = profile?.partyBName?.trim() || "Party B";

  const [activeOwner, setActiveOwner] = useState<"A" | "B">("A");
  const confirm = useInlineConfirm();

  const ownerName = activeOwner === "A" ? nameA : nameB;

  const salaryIncome = useMemo(
    () => findSalaryIncome(incomes, activeOwner),
    [incomes, activeOwner]
  );

  const activePresetKey = useMemo(
    () => matchPreset(salaryIncome),
    [salaryIncome]
  );

  const activeMaintenanceKey = useMemo(() => {
    if (!maintenance.included) return "none";
    return (
      MAINTENANCE_PRESETS.find(
        (p) => p.included && p.monthlyAmount === maintenance.monthlyAmount
      )?.key ?? null
    );
  }, [maintenance]);

  const handleSalaryChip = (preset: SalaryPreset) => {
    if (preset.grossAnnual === 0) {
      if (salaryIncome) {
        updateIncome(salaryIncome.id, { amountAnnualGross: 0 });
        confirm.flash(`Updated — ${ownerName} set to no earned income`);
      } else {
        confirm.flash(`${ownerName} — no earned income noted`);
      }
      return;
    }

    const grossAnnual = preset.grossAnnual;
    const name = `Salary (${ownerName})`;

    if (salaryIncome) {
      updateIncome(salaryIncome.id, { amountAnnualGross: grossAnnual });
      confirm.flash(
        `Updated — ${ownerName} salary set to £${grossAnnual.toLocaleString("en-GB")}/yr gross`
      );
    } else {
      addIncome({
        name,
        owner: activeOwner,
        amountAnnualGross: grossAnnual,
        taxTreatment: "use_tax_model",
      });
      confirm.flash(
        `Saved — ${ownerName} salary added at £${grossAnnual.toLocaleString("en-GB")}/yr gross`
      );
    }

  };

  const handleMaintenanceChip = (preset: MaintenancePreset) => {
    updateMaintenance({
      included: preset.included,
      monthlyAmount: preset.monthlyAmount,
    });
    if (preset.included) {
      confirm.flash(
        `Saved — spousal maintenance set to £${preset.monthlyAmount}/mo (planning figure)`
      );
    } else {
      confirm.flash("Saved — no spousal maintenance assumed");
    }
  };

  const grossA = useMemo(
    () =>
      Math.round(
        incomes.filter((i) => i.owner === "A").reduce((s, i) => s + i.amountAnnualGross, 0) /
          1000
      ),
    [incomes]
  );
  const grossB = useMemo(
    () =>
      Math.round(
        incomes.filter((i) => i.owner === "B").reduce((s, i) => s + i.amountAnnualGross, 0) /
          1000
      ),
    [incomes]
  );

  return (
    <div className="space-y-5">
      {/* Salary chips */}
      <div className="p-4 bg-muted/40 rounded-md border-l-4 border-cyan-300 space-y-1">
        <p className="text-sm font-medium text-foreground">Quick-add salary assumption</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Tap a tile to set a typical salary as a starting point — adjust the figure in the
          income table below. Based on ONS 2024 earnings data. Net estimates are approximate
          after 2026/27 UK tax &amp; NI. Planning figures only — not tax advice.
        </p>
      </div>

      <div className="flex items-center gap-2 border-b border-border/40 overflow-x-auto">
        {(["A", "B"] as const).map((owner) => {
          const isActive = activeOwner === owner;
          const name = owner === "A" ? nameA : nameB;
          const gross = owner === "A" ? grossA : grossB;
          return (
            <button
              key={owner}
              type="button"
              onClick={() => setActiveOwner(owner)}
              data-testid={`tab-salary-owner-${owner}`}
              className={`relative px-4 py-2.5 text-sm font-semibold transition-colors -mb-px border-b-2 whitespace-nowrap ${
                isActive
                  ? "border-gold text-[#1a3357]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {name}
              {gross > 0 && (
                <span className="ml-2 text-[10px] font-mono text-muted-foreground">
                  £{gross}k/yr gross
                </span>
              )}
            </button>
          );
        })}
      </div>

      <InlineConfirm message={confirm.message} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {SALARY_PRESETS.map((preset) => (
          <SalaryChip
            key={preset.key}
            preset={preset}
            active={activePresetKey === preset.key}
            currentGross={salaryIncome?.amountAnnualGross}
            onClick={() => handleSalaryChip(preset)}
          />
        ))}
      </div>

      {/* Spousal maintenance chips */}
      <div className="p-4 bg-muted/40 rounded-md border-l-4 border-rose-300 space-y-1">
        <p className="text-sm font-medium text-foreground">Spousal maintenance assumption</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Tap a tile to set a planning assumption for spousal maintenance. These are
          illustrative figures based on reported England &amp; Wales ranges — not a legal
          assessment. Child maintenance is configured on the next step.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {MAINTENANCE_PRESETS.map((preset) => (
          <MaintenanceChip
            key={preset.key}
            preset={preset}
            active={activeMaintenanceKey === preset.key}
            onClick={() => handleMaintenanceChip(preset)}
          />
        ))}
      </div>
    </div>
  );
}
