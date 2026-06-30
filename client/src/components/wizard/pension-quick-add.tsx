import { useState } from "react";
import { Briefcase, Building2, Landmark, PiggyBank, Layers } from "lucide-react";
import { useAppStore } from "@/hooks/use-store";
import { useInlineConfirm, InlineConfirm } from "./inline-confirm";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

type PensionOwner = "A" | "B";

interface PensionTypeOption {
  key: string;
  label: string;
  pensionType: "DC" | "DB";
  icon: typeof Briefcase;
  hint: string;
  figures: number[];
}

const HIGH_CETV_FROM_500K = [
  500_000, 600_000, 700_000, 800_000, 900_000, 1_000_000,
] as const;

/** Merge type-specific lower tiers with £500k–£1m in £100k steps. */
function buildCetvFigures(base: number[]): number[] {
  return Array.from(new Set([...base, ...HIGH_CETV_FROM_500K])).sort((a, b) => a - b);
}

const PENSION_TYPE_OPTIONS: PensionTypeOption[] = [
  {
    key: "workplace",
    label: "Workplace pension",
    pensionType: "DC",
    icon: Briefcase,
    hint: "Current employer auto-enrolment or company scheme",
    figures: buildCetvFigures([25_000, 50_000, 75_000, 100_000, 150_000, 200_000, 300_000, 400_000]),
  },
  {
    key: "sipp",
    label: "SIPP / private pension",
    pensionType: "DC",
    icon: PiggyBank,
    hint: "Self-invested or personal pension pot",
    figures: buildCetvFigures([15_000, 30_000, 60_000, 100_000, 150_000, 250_000, 350_000, 400_000]),
  },
  {
    key: "final_salary",
    label: "Final salary (DB)",
    pensionType: "DB",
    icon: Building2,
    hint: "Defined benefit — CETV often higher than DC pots",
    figures: buildCetvFigures([100_000, 200_000, 350_000]),
  },
  {
    key: "previous_employer",
    label: "Previous employer pension",
    pensionType: "DC",
    icon: Layers,
    hint: "Deferred pension from an earlier job",
    figures: buildCetvFigures([10_000, 25_000, 50_000, 80_000, 120_000, 200_000, 300_000, 400_000]),
  },
  {
    key: "avc",
    label: "Additional / AVC pot",
    pensionType: "DC",
    icon: Landmark,
    hint: "Extra voluntary contributions on top of main scheme",
    figures: buildCetvFigures([5_000, 15_000, 30_000, 50_000, 75_000, 100_000, 150_000, 250_000]),
  },
];

function fmtCetvTile(value: number): string {
  if (value >= 1_000_000) return "£1m";
  if (value >= 1_000) return `£${Math.round(value / 1_000)}k`;
  return formatCurrency(value);
}

export function PensionQuickAdd() {
  const { addAsset, profile } = useAppStore();
  const confirm = useInlineConfirm();
  const nameA = profile?.partyAName || "Party A";
  const nameB = profile?.partyBName || "Party B";

  const [owner, setOwner] = useState<PensionOwner>("A");
  const [selectedTypeKey, setSelectedTypeKey] = useState<string | null>(null);

  const selectedType = PENSION_TYPE_OPTIONS.find((option) => option.key === selectedTypeKey);

  const addPension = (type: PensionTypeOption, cetv: number) => {
    const ownerLabel = owner === "A" ? nameA : nameB;
    addAsset({
      name: `${type.label} — ${fmtCetvTile(cetv)} (starting estimate)`,
      category: "pension",
      owner,
      currentValue: cetv,
      cetv,
      pensionType: type.pensionType,
      liquidity: "illiquid",
      saleCostPct: 0,
      taxCostPct: 0.25,
    });
    confirm.flash(`Added ${type.label} for ${ownerLabel} — ${formatCurrency(cetv)} CETV`);
  };

  return (
    <div
      className="rounded-lg border border-emerald-200/80 bg-emerald-50/40 p-4 space-y-4"
      data-testid="card-pension-quick-add"
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">Fast add — pick type, then CETV</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Choose whose pension you are adding, tap a pension type, then tap a typical CETV figure. Replace with your statement later.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground shrink-0">Whose pension?</span>
        <div className="inline-flex rounded-md border bg-white p-0.5">
          <button
            type="button"
            onClick={() => setOwner("A")}
            className={cn(
              "px-3 py-1.5 text-sm rounded-sm transition-colors",
              owner === "A" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
            data-testid="button-pension-owner-a"
          >
            {nameA}
          </button>
          <button
            type="button"
            onClick={() => setOwner("B")}
            className={cn(
              "px-3 py-1.5 text-sm rounded-sm transition-colors",
              owner === "B" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
            data-testid="button-pension-owner-b"
          >
            {nameB}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">1. Pension type</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PENSION_TYPE_OPTIONS.map((type) => {
            const Icon = type.icon;
            const active = selectedTypeKey === type.key;
            return (
              <button
                key={type.key}
                type="button"
                onClick={() => setSelectedTypeKey(type.key)}
                className={cn(
                  "flex items-start gap-2.5 p-3 text-left rounded-md border transition-colors bg-white",
                  active
                    ? "border-gold/50 shadow-sm ring-1 ring-gold/20"
                    : "border-border hover:border-primary/30 hover:bg-muted/30"
                )}
                data-testid={`button-pension-type-${type.key}`}
              >
                <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", active ? "text-gold" : "text-muted-foreground")} />
                <div className="min-w-0">
                  <span className="text-sm font-medium block">{type.label}</span>
                  <span className="text-[11px] text-muted-foreground leading-snug">{type.hint}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedType && (
        <div className="space-y-2 pt-1 border-t border-emerald-200/60">
          <p className="text-xs font-medium text-muted-foreground">
            2. Typical CETV for {selectedType.label.toLowerCase()} ({owner === "A" ? nameA : nameB})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedType.figures.map((cetv) => (
              <button
                key={`${selectedType.key}-${cetv}`}
                type="button"
                onClick={() => addPension(selectedType, cetv)}
                className="min-w-[4.5rem] px-3 py-2 rounded-md border bg-white text-sm font-semibold tabular-nums hover:border-gold/50 hover:bg-gold/5 transition-colors"
                data-testid={`button-pension-cetv-${selectedType.key}-${cetv}`}
              >
                {fmtCetvTile(cetv)}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Planning figures only — not a pension valuation. {selectedType.pensionType === "DB" ? "DB schemes usually need a formal CETV from the provider." : "Check your annual statement for the exact CETV."}
          </p>
        </div>
      )}

      <InlineConfirm message={confirm.message} />
    </div>
  );
}
