import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, X, Pencil, ChevronDown, Ban, HeartHandshake, TrendingUp } from "lucide-react";
import { useAppStore, Income } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn, formatCurrency } from "@/lib/utils";
import { useInlineConfirm, InlineConfirm } from "@/components/wizard/inline-confirm";
import { WizardPartySelector } from "@/components/wizard/wizard-party-selector";
import { chartTheme } from "@/lib/chart-theme";
import { loadConfig } from "@/lib/engine/config/loadConfig";
import { calcIncomeTax } from "@/lib/engine/calc/incomeTax";
import { calcNationalInsurance } from "@/lib/engine/calc/nationalInsurance";
import {
  incomeTemplatesForOwner,
  findIncomeForTemplate,
  MAINTENANCE_PRESETS,
  type IncomeTemplate,
  type IncomeOwner,
  type MaintenancePreset,
} from "@/lib/wizard-income-templates";

const taxConfig = loadConfig();

function modelledNetMonthly(grossAnnual: number): number {
  if (grossAnnual <= 0) return 0;
  const tax = calcIncomeTax(grossAnnual, taxConfig);
  const ni = calcNationalInsurance(grossAnnual, taxConfig);
  return Math.round((grossAnnual - tax - ni) / 12);
}

function fmtK(n: number) {
  if (n === 0) return "£0";
  if (n >= 1000) return `£${(n / 1000).toFixed(0)}k`;
  return `£${n}`;
}

function OptionalRefinements({
  title = "Optional refinements",
  hint,
  children,
  testId,
}: {
  title?: string;
  hint?: string;
  children: ReactNode;
  testId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-md border border-border/60 bg-muted/20" data-testid={testId}>
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm hover:bg-muted/40 transition-colors"
        onClick={() => setOpen(!open)}
        data-testid={`button-toggle-${testId}`}
      >
        <div>
          <span className="font-medium text-foreground">{title}</span>
          {hint && !open && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
        </div>
        <ChevronDown className={cn("w-4 h-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-3 space-y-4 border-t border-border/40">{children}</div>
      )}
    </div>
  );
}

interface IncomeChipCardProps {
  template: IncomeTemplate;
  income: Income | undefined;
  owner: IncomeOwner;
  ownerName: string;
  onAdd: (value: number) => void;
  onUpdate: (value: number) => void;
  onRemove: () => void;
}

function IncomeChipCard({ template, income, owner, ownerName, onAdd, onUpdate, onRemove }: IncomeChipCardProps) {
  const Icon = template.icon;
  const active = !!income && income.amountAnnualGross > 0;
  const initialAmount = active ? income!.amountAnnualGross : template.typical;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialAmount);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setDraft(initialAmount);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 30);
    }
  }, [editing, initialAmount]);

  const commit = () => {
    const value = Math.max(0, Math.round(draft || 0));
    if (value === 0) {
      if (active) onRemove();
    } else if (active) {
      onUpdate(value);
    } else {
      onAdd(value);
    }
    setEditing(false);
  };

  const open = () => {
    setDraft(active ? initialAmount : template.typical);
    setEditing(true);
  };

  const netHint = draft > 0 ? modelledNetMonthly(draft) : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: chartTheme.ease }}
      className={cn(
        "relative rounded-lg border p-3 text-left transition-all overflow-hidden",
        active
          ? "bg-white border-gold/50 shadow-[0_4px_12px_-4px_rgba(201,168,76,0.25)]"
          : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300",
      )}
      data-testid={`chip-income-${template.id}-${owner}`}
    >
      {active && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold flex items-center justify-center" aria-hidden>
          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
        </span>
      )}

      {editing ? (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" style={{ color: template.color }} />
            <span className="text-xs font-semibold text-[#1a3357] truncate">{template.label}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">£</span>
            <Input
              ref={inputRef}
              type="number"
              min={0}
              value={draft || ""}
              onChange={(e) => setDraft(parseInt(e.target.value) || 0)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                if (e.key === "Escape") setEditing(false);
              }}
              className="h-7 text-sm px-2"
              data-testid={`input-chip-income-${template.id}-${owner}`}
            />
            <span className="text-[10px] text-muted-foreground shrink-0">/yr gross</span>
          </div>
          {draft > 0 && (
            <p className="text-[10px] text-muted-foreground tabular-nums">
              ~£{netHint.toLocaleString("en-GB")}/mo modelled net for {ownerName}
            </p>
          )}
          <div className="flex gap-1 pt-0.5">
            <Button
              type="button"
              size="sm"
              className="h-7 text-xs flex-1"
              onMouseDown={(e) => e.preventDefault()}
              onClick={commit}
              data-testid={`button-chip-save-income-${template.id}-${owner}`}
            >
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 text-xs"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
          {active && (
            <button
              type="button"
              onClick={() => {
                onRemove();
                setEditing(false);
              }}
              className="text-[10px] text-rose-500 hover:text-rose-700 font-medium"
              data-testid={`button-chip-remove-income-${template.id}-${owner}`}
            >
              Remove
            </button>
          )}
        </div>
      ) : (
        <button type="button" onClick={open} className="w-full text-left">
          <div className="flex items-center gap-1.5 mb-1">
            <Icon className="w-3.5 h-3.5" style={{ color: template.color }} />
            <span className="text-xs font-semibold text-[#1a3357] truncate">{template.label}</span>
          </div>
          {active ? (
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-base font-bold tabular-nums" style={{ color: template.color }}>
                {fmtK(income!.amountAnnualGross)}
                <span className="text-[10px] font-normal text-muted-foreground">/yr gross</span>
              </span>
              <Pencil className="w-2.5 h-2.5 text-muted-foreground opacity-60" aria-hidden />
            </div>
          ) : (
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-[11px] text-muted-foreground">~{fmtK(template.typical)}/yr typical</span>
              <span className="text-[10px] text-gold font-semibold">Set amount</span>
            </div>
          )}
          {active && income!.amountAnnualGross > 0 && (
            <p className="text-[10px] text-muted-foreground mt-0.5 tabular-nums">
              ~£{modelledNetMonthly(income!.amountAnnualGross).toLocaleString("en-GB")}/mo modelled net
            </p>
          )}
          <p className="text-[10px] text-muted-foreground/70 mt-1 leading-tight line-clamp-2">{template.hint}</p>
        </button>
      )}
    </motion.div>
  );
}

interface MaintenanceChipCardProps {
  preset: MaintenancePreset;
  active: boolean;
  currentAmount?: number;
  onSave: (included: boolean, monthlyAmount: number) => void;
}

function MaintenanceChipCard({ preset, active, currentAmount, onSave }: MaintenanceChipCardProps) {
  const Icon = !preset.included ? Ban : preset.monthlyAmount >= 1000 ? TrendingUp : HeartHandshake;
  const initialAmount = active && currentAmount !== undefined ? currentAmount : preset.monthlyAmount;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialAmount);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setDraft(initialAmount);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 30);
    }
  }, [editing, initialAmount]);

  const commit = () => {
    if (!preset.included) {
      onSave(false, 0);
    } else {
      onSave(true, Math.max(0, Math.round(draft || 0)));
    }
    setEditing(false);
  };

  const open = () => {
    if (!preset.included) {
      onSave(false, 0);
      return;
    }
    setDraft(active && currentAmount !== undefined ? currentAmount : preset.monthlyAmount);
    setEditing(true);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: chartTheme.ease }}
      className={cn(
        "relative rounded-lg border p-3 text-left transition-all overflow-hidden",
        active
          ? "bg-white border-gold/50 shadow-[0_4px_12px_-4px_rgba(201,168,76,0.25)]"
          : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300",
      )}
      data-testid={`chip-maintenance-${preset.id}`}
    >
      {active && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold flex items-center justify-center" aria-hidden>
          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
        </span>
      )}

      {editing && preset.included ? (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" style={{ color: preset.color }} />
            <span className="text-xs font-semibold text-[#1a3357] truncate">{preset.label}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">£</span>
            <Input
              ref={inputRef}
              type="number"
              min={0}
              value={draft || ""}
              onChange={(e) => setDraft(parseInt(e.target.value) || 0)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                if (e.key === "Escape") setEditing(false);
              }}
              className="h-7 text-sm px-2"
              data-testid={`input-chip-maintenance-${preset.id}`}
            />
            <span className="text-[10px] text-muted-foreground shrink-0">/mo</span>
          </div>
          <div className="flex gap-1 pt-0.5">
            <Button type="button" size="sm" className="h-7 text-xs flex-1" onMouseDown={(e) => e.preventDefault()} onClick={commit}>
              Save
            </Button>
            <Button type="button" size="sm" variant="ghost" className="h-7 text-xs" onMouseDown={(e) => e.preventDefault()} onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={open} className="w-full text-left">
          <div className="flex items-center gap-1.5 mb-1">
            <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: preset.color }} />
            <span className="text-xs font-semibold text-[#1a3357] truncate">{preset.label}</span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            {active ? (
              <span className="text-base font-bold tabular-nums" style={{ color: preset.color }}>
                {preset.included ? `£${(currentAmount ?? preset.monthlyAmount).toLocaleString("en-GB")}/mo` : "None"}
              </span>
            ) : (
              <span className="text-[11px] text-muted-foreground">
                {preset.included ? `£${preset.monthlyAmount}/mo planning` : "Clean break"}
              </span>
            )}
            {!active && preset.included && <span className="text-[10px] text-gold font-semibold">Set amount</span>}
          </div>
          <p className="text-[10px] text-muted-foreground/70 mt-1 leading-tight line-clamp-1">{preset.hint}</p>
        </button>
      )}
    </motion.div>
  );
}

export function StepIncomeEmployment() {
  const chipConfirm = useInlineConfirm();
  const {
    incomes,
    addIncome,
    updateIncome,
    removeIncome,
    assumptions,
    updateAssumptions,
    profile,
    maintenance,
    updateMaintenance,
  } = useAppStore();

  const nameA = profile?.partyAName?.trim() || "Party A";
  const nameB = profile?.partyBName?.trim() || "Party B";

  const [activeOwner, setActiveOwner] = useState<IncomeOwner>("A");
  const [customOpen, setCustomOpen] = useState(false);
  const [customForm, setCustomForm] = useState({ name: "", amountAnnualGross: 0, owner: "A" as string });

  const ownerName = activeOwner === "A" ? nameA : nameB;
  const templates = incomeTemplatesForOwner(activeOwner);

  const ownerIncomes = useMemo(
    () => incomes.filter((i) => i.owner === activeOwner),
    [incomes, activeOwner],
  );

  const covered = useMemo(
    () => templates.filter((t) => {
      const inc = findIncomeForTemplate(incomes, activeOwner, t);
      return !!inc && inc.amountAnnualGross > 0;
    }).length,
    [templates, incomes, activeOwner],
  );

  const customIncomes = useMemo(() => {
    const claimed = new Set<string>();
    for (const t of templates) {
      const inc = findIncomeForTemplate(incomes, activeOwner, t);
      if (inc) claimed.add(inc.id);
    }
    return ownerIncomes.filter((i) => !claimed.has(i.id) && i.amountAnnualGross > 0);
  }, [templates, incomes, ownerIncomes, activeOwner]);

  const ownerGrossTotal = ownerIncomes.reduce((s, i) => s + i.amountAnnualGross, 0);
  const grossA = Math.round(incomes.filter((i) => i.owner === "A").reduce((s, i) => s + i.amountAnnualGross, 0) / 1000);
  const grossB = Math.round(incomes.filter((i) => i.owner === "B").reduce((s, i) => s + i.amountAnnualGross, 0) / 1000);

  const activeMaintenanceKey = useMemo(() => {
    if (!maintenance.included) return "none";
    return MAINTENANCE_PRESETS.find((p) => p.included && p.monthlyAmount === maintenance.monthlyAmount)?.id ?? null;
  }, [maintenance]);

  const handleAddIncome = (template: IncomeTemplate, value: number) => {
    addIncome({
      name: template.id === "salary" ? `Salary (${ownerName})` : template.label,
      owner: activeOwner,
      amountAnnualGross: value,
      taxTreatment: "use_tax_model",
    });
    chipConfirm.flash(`Saved — ${template.label} at ${formatCurrency(value)}/yr gross for ${ownerName}`);
  };

  const incomeTabMeta = useMemo(() => ({
    A: { totalLabel: grossA > 0 ? `£${grossA}k/yr` : undefined },
    B: { totalLabel: grossB > 0 ? `£${grossB}k/yr` : undefined },
  }), [grossA, grossB]);

  const openCustom = () => {
    setCustomForm({ name: "", amountAnnualGross: 0, owner: activeOwner });
    setCustomOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="p-4 bg-muted/40 rounded-md border-l-4 border-cyan-300 space-y-1">
        <p className="text-sm font-medium text-foreground">Tap a tile to set your gross income.</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Choose {nameA} or {nameB}, then tap a category — the box opens with a typical annual figure you can change before saving.
          Modelled take-home uses simplified 2026/27 England/Wales income tax and employee NI only (not tax advice).
        </p>
      </div>

      <WizardPartySelector
        owners={["A", "B"]}
        activeOwner={activeOwner}
        onChange={setActiveOwner}
        nameA={nameA}
        nameB={nameB}
        tabMeta={incomeTabMeta}
        testIdPrefix="income"
      />

      <InlineConfirm message={chipConfirm.message} />

      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-[#1a3357]">{covered}</span> of {templates.length} income types
          {customIncomes.length > 0 && <span> · {customIncomes.length} other</span>}
        </p>
        <p className="text-xs">
          <span className="text-muted-foreground">{ownerName} gross: </span>
          <span className="font-bold text-[#1a3357] tabular-nums">{formatCurrency(ownerGrossTotal)}/yr</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {templates.map((template) => {
          const income = findIncomeForTemplate(incomes, activeOwner, template);
          return (
            <IncomeChipCard
              key={`${template.id}-${activeOwner}`}
              template={template}
              income={income}
              owner={activeOwner}
              ownerName={ownerName}
              onAdd={(v) => handleAddIncome(template, v)}
              onUpdate={(v) => income && updateIncome(income.id, { amountAnnualGross: v })}
              onRemove={() => income && removeIncome(income.id)}
            />
          );
        })}
        <button
          type="button"
          onClick={openCustom}
          className="rounded-lg border-2 border-dashed border-slate-300 p-3 text-left hover:border-gold/50 hover:bg-gold/[0.04] transition-all flex flex-col items-center justify-center min-h-[90px] text-muted-foreground hover:text-foreground"
          data-testid="button-add-income"
        >
          <Plus className="w-4 h-4 mb-1" />
          <span className="text-xs font-semibold">Add other</span>
          <span className="text-[10px] text-muted-foreground/70">custom income</span>
        </button>
      </div>

      {customIncomes.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Other income for {ownerName}
          </p>
          <AnimatePresence>
            {customIncomes.map((i) => (
              <motion.div
                key={i.id}
                layout
                className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1a3357] truncate">{i.name}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold tabular-nums">{formatCurrency(i.amountAnnualGross)}/yr</span>
                  <button onClick={() => removeIncome(i.id)} className="p-1 text-rose-500 hover:text-rose-700" aria-label="Remove">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-muted pl-3">
        Illustrative only: excludes Scottish rates, dividends tax treatment, pension relief, benefits-in-kind, student loans, and other adjustments.
      </p>

      <OptionalRefinements testId="refinements-income" hint="Override modelled take-home pay">
        <p className="text-xs text-muted-foreground">
          If you know the actual annual take-home pay (after tax, NI, and any deductions), enter it here.
          This will replace the model&apos;s estimated net income for that party. Leave blank to use the model&apos;s calculation.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm">{nameA} take-home (£/year)</Label>
            <Input
              type="number"
              min={0}
              placeholder="Leave blank for model estimate"
              value={assumptions.overrideNetIncomeA ?? ""}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                updateAssumptions({ overrideNetIncomeA: isNaN(v) || v <= 0 ? null : v });
              }}
              data-testid="input-override-net-a"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">{nameB} take-home (£/year)</Label>
            <Input
              type="number"
              min={0}
              placeholder="Leave blank for model estimate"
              value={assumptions.overrideNetIncomeB ?? ""}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                updateAssumptions({ overrideNetIncomeB: isNaN(v) || v <= 0 ? null : v });
              }}
              data-testid="input-override-net-b"
            />
          </div>
        </div>
      </OptionalRefinements>

      <Separator />

      <div className="p-4 bg-muted/40 rounded-md border-l-4 border-rose-300 space-y-1">
        <p className="text-sm font-medium text-foreground">Spousal maintenance assumption</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Tap a tile to set a planning assumption. Illustrative figures based on reported England &amp; Wales ranges — not a legal assessment.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {MAINTENANCE_PRESETS.map((preset) => (
          <MaintenanceChipCard
            key={preset.id}
            preset={preset}
            active={activeMaintenanceKey === preset.id}
            currentAmount={maintenance.monthlyAmount}
            onSave={(included, monthlyAmount) => {
              updateMaintenance({ included, monthlyAmount });
              chipConfirm.flash(
                included
                  ? `Saved — spousal maintenance set to £${monthlyAmount}/mo (planning figure)`
                  : "Saved — no spousal maintenance assumed",
              );
            }}
          />
        ))}
      </div>

      {maintenance?.included && (
        <div className="space-y-3 p-4 bg-muted/30 rounded-md">
          <div className="flex items-center gap-3">
            <Switch
              checked={maintenance.included}
              onCheckedChange={(v) => updateMaintenance({ included: v })}
              data-testid="switch-maintenance"
            />
            <Label className="text-sm">Spousal maintenance included in model</Label>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Direction of payment</Label>
            <Select
              value={maintenance.direction}
              onValueChange={(v: "AtoB" | "BtoA") => updateMaintenance({ direction: v })}
            >
              <SelectTrigger data-testid="select-maintenance-direction">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AtoB">{nameA} pays {nameB}</SelectItem>
                <SelectItem value="BtoA">{nameB} pays {nameA}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Dialog open={customOpen} onOpenChange={setCustomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add custom income</DialogTitle>
            <DialogDescription>Anything not covered by the tiles above.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Source name</Label>
              <Input
                value={customForm.name}
                onChange={(e) => setCustomForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Bonus"
                data-testid="input-income-name"
              />
            </div>
            <div className="space-y-2">
              <Label>Annual gross (£)</Label>
              <Input
                type="number"
                value={customForm.amountAnnualGross || ""}
                onChange={(e) => setCustomForm((f) => ({ ...f, amountAnnualGross: parseFloat(e.target.value) || 0 }))}
                data-testid="input-income-amount"
              />
            </div>
            <div className="space-y-2">
              <Label>Earner</Label>
              <Select value={customForm.owner} onValueChange={(v) => setCustomForm((f) => ({ ...f, owner: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">{nameA}</SelectItem>
                  <SelectItem value="B">{nameB}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (!customForm.name) return;
                addIncome({ ...customForm, taxTreatment: "use_tax_model" });
                setCustomOpen(false);
              }}
              data-testid="button-save-income"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
