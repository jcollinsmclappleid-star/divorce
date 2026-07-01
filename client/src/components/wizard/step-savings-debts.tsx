import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, X, Pencil } from "lucide-react";
import { useAppStore, Asset, Liability } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AssetCategory, LiabilityCategory } from "@shared/schema";
import { cn, formatCurrency } from "@/lib/utils";
import { useInlineConfirm, InlineConfirm } from "@/components/wizard/inline-confirm";
import { chartTheme } from "@/lib/chart-theme";
import {
  UK_ASSET_BENCHMARKS,
  UK_JOINT_ASSET_BENCHMARKS,
  UK_DEBT_BENCHMARKS,
  assetTemplatesForOwner,
  debtTemplatesForOwner,
  findAssetForTemplate,
  findDebtForTemplate,
  hasBenchmarkAssets,
  benchmarkAssetTotal,
  hasBenchmarkDebts,
  benchmarkDebtTotal,
  type AssetTemplate,
  type DebtTemplate,
  type WizardOwner,
} from "@/lib/wizard-asset-templates";

function ownerLabel(owner: WizardOwner, nameA: string, nameB: string): string {
  if (owner === "joint") return "Joint";
  return owner === "A" ? nameA : nameB;
}

function BenchmarkButton({
  label,
  active,
  summary,
  onClick,
  testId,
}: {
  label: string;
  active: boolean;
  summary?: string;
  onClick: () => void;
  testId: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={cn(
        "flex flex-col items-start gap-1 rounded-lg border px-4 py-3 text-left transition-all w-full sm:w-auto sm:min-w-[10rem]",
        active
          ? "border-gold/50 bg-white shadow-[0_4px_12px_-4px_rgba(201,168,76,0.25)]"
          : "border-slate-200 bg-white hover:border-slate-300",
      )}
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-[#1a3357]">
        {active && <Check className="h-4 w-4 text-gold shrink-0" />}
        {label}
      </span>
      {active && summary && <span className="text-[11px] text-muted-foreground">{summary}</span>}
      {!active && <span className="text-[10px] text-gold font-semibold">+ Apply</span>}
    </button>
  );
}

interface AssetChipCardProps {
  template: AssetTemplate;
  asset: Asset | undefined;
  owner: WizardOwner;
  onAdd: (value: number) => void;
  onUpdate: (value: number) => void;
  onRemove: () => void;
}

function AssetChipCard({ template, asset, owner, onAdd, onUpdate, onRemove }: AssetChipCardProps) {
  const Icon = template.icon;
  const active = !!asset;
  const initialAmount = asset?.currentValue ?? template.typical;
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
      data-testid={`chip-asset-${template.id}-${owner}`}
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
              data-testid={`input-chip-asset-${template.id}-${owner}`}
            />
          </div>
          <div className="flex gap-1 pt-0.5">
            <Button
              type="button"
              size="sm"
              className="h-7 text-xs flex-1"
              onMouseDown={(e) => e.preventDefault()}
              onClick={commit}
              data-testid={`button-chip-save-asset-${template.id}-${owner}`}
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
              data-testid={`button-chip-remove-asset-${template.id}-${owner}`}
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
                {formatCurrency(asset!.currentValue)}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <Pencil className="w-2.5 h-2.5 opacity-60" aria-hidden />
              </span>
            </div>
          ) : (
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-[11px] text-muted-foreground">
                ~{formatCurrency(template.typical)} typical
              </span>
              <span className="text-[10px] text-gold font-semibold">Set amount</span>
            </div>
          )}
          <p className="text-[10px] text-muted-foreground/70 mt-1 leading-tight line-clamp-2">{template.hint}</p>
        </button>
      )}
    </motion.div>
  );
}

interface DebtChipCardProps {
  template: DebtTemplate;
  liability: Liability | undefined;
  owner: WizardOwner;
  onAdd: (value: number) => void;
  onUpdate: (value: number) => void;
  onRemove: () => void;
}

function DebtChipCard({ template, liability, owner, onAdd, onUpdate, onRemove }: DebtChipCardProps) {
  const Icon = template.icon;
  const active = !!liability;
  const initialAmount = liability?.balance ?? template.typical;
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
      data-testid={`chip-debt-${template.id}-${owner}`}
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
              data-testid={`input-chip-debt-${template.id}-${owner}`}
            />
          </div>
          <div className="flex gap-1 pt-0.5">
            <Button
              type="button"
              size="sm"
              className="h-7 text-xs flex-1"
              onMouseDown={(e) => e.preventDefault()}
              onClick={commit}
              data-testid={`button-chip-save-debt-${template.id}-${owner}`}
            >
              Save
            </Button>
            <Button type="button" size="sm" variant="ghost" className="h-7 text-xs" onMouseDown={(e) => e.preventDefault()} onClick={() => setEditing(false)}>
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
              <span className="text-base font-bold tabular-nums text-rose-600">
                {formatCurrency(liability!.balance)}
              </span>
              <Pencil className="w-2.5 h-2.5 text-muted-foreground opacity-60" aria-hidden />
            </div>
          ) : (
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-[11px] text-muted-foreground">~{formatCurrency(template.typical)} typical</span>
              <span className="text-[10px] text-gold font-semibold">Set amount</span>
            </div>
          )}
          <p className="text-[10px] text-muted-foreground/70 mt-1 leading-tight line-clamp-2">{template.hint}</p>
        </button>
      )}
    </motion.div>
  );
}

export function StepSavingsDebts() {
  const chipConfirm = useInlineConfirm();
  const {
    assets,
    liabilities,
    addAsset,
    updateAsset,
    removeAsset,
    addLiability,
    updateLiability,
    removeLiability,
    profile,
  } = useAppStore();
  const nameA = profile?.partyAName?.trim() || "Party A";
  const nameB = profile?.partyBName?.trim() || "Party B";

  const [activeOwner, setActiveOwner] = useState<WizardOwner>("A");
  const [customAssetOpen, setCustomAssetOpen] = useState(false);
  const [customDebtOpen, setCustomDebtOpen] = useState(false);
  const [assetForm, setAssetForm] = useState({ name: "", currentValue: 0, category: "cash" as string, owner: "A" as string });
  const [debtForm, setDebtForm] = useState({ name: "", balance: 0, category: "loan" as string, owner: "A" as string });

  const nonHomeAssets = useMemo(
    () => assets.filter((a) => a.category !== "primary_home" && a.category !== "pension"),
    [assets],
  );
  const nonMortgageLiabilities = useMemo(
    () => liabilities.filter((l) => l.category !== "mortgage"),
    [liabilities],
  );

  const ownerAssets = useMemo(
    () => nonHomeAssets.filter((a) => a.owner === activeOwner),
    [nonHomeAssets, activeOwner],
  );
  const ownerDebts = useMemo(
    () => nonMortgageLiabilities.filter((l) => l.owner === activeOwner),
    [nonMortgageLiabilities, activeOwner],
  );

  const assetTemplates = assetTemplatesForOwner(activeOwner);
  const debtTemplates = debtTemplatesForOwner(activeOwner);

  const assetCovered = useMemo(
    () => assetTemplates.filter((t) => !!findAssetForTemplate(nonHomeAssets, t, activeOwner)).length,
    [assetTemplates, nonHomeAssets, activeOwner],
  );
  const debtCovered = useMemo(
    () => debtTemplates.filter((t) => !!findDebtForTemplate(nonMortgageLiabilities, t, activeOwner)).length,
    [debtTemplates, nonMortgageLiabilities, activeOwner],
  );

  const customAssets = useMemo(() => {
    const claimed = new Set<string>();
    for (const t of assetTemplates) {
      const a = findAssetForTemplate(nonHomeAssets, t, activeOwner);
      if (a) claimed.add(a.id);
    }
    return ownerAssets.filter((a) => !claimed.has(a.id));
  }, [assetTemplates, nonHomeAssets, ownerAssets, activeOwner]);

  const customDebts = useMemo(() => {
    const claimed = new Set<string>();
    for (const t of debtTemplates) {
      const l = findDebtForTemplate(nonMortgageLiabilities, t, activeOwner);
      if (l) claimed.add(l.id);
    }
    return ownerDebts.filter((l) => !claimed.has(l.id));
  }, [debtTemplates, nonMortgageLiabilities, ownerDebts, activeOwner]);

  const ownerAssetTotal = ownerAssets.reduce((s, a) => s + a.currentValue, 0);
  const ownerDebtTotal = ownerDebts.reduce((s, l) => s + l.balance, 0);

  const applyBenchmarkAssets = (owner: WizardOwner) => {
    const existing = new Set(nonHomeAssets.filter((a) => a.owner === owner).map((a) => a.name.toLowerCase()));
    const benchmarks = owner === "joint" ? UK_JOINT_ASSET_BENCHMARKS : UK_ASSET_BENCHMARKS;
    benchmarks.forEach((benchmark) => {
      const name = `${benchmark.name} (starting estimate)`;
      if (existing.has(name.toLowerCase())) return;
      addAsset({
        name,
        currentValue: benchmark.value,
        category: benchmark.category,
        owner,
        liquidity: benchmark.category === "vehicle" ? "illiquid" : "liquid",
        saleCostPct: 0,
        taxCostPct: 0,
      });
    });
    chipConfirm.flash(`Starting figures added for ${ownerLabel(owner, nameA, nameB)}`);
  };

  const applyBenchmarkDebts = (owner: "A" | "B") => {
    const existing = new Set(nonMortgageLiabilities.filter((l) => l.owner === owner).map((l) => l.name.toLowerCase()));
    UK_DEBT_BENCHMARKS.forEach((benchmark) => {
      const name = `${benchmark.name} (starting estimate)`;
      if (existing.has(name.toLowerCase())) return;
      addLiability({ name, balance: benchmark.balance, category: benchmark.category, owner });
    });
    chipConfirm.flash(`Debt starting figures added for ${ownerLabel(owner, nameA, nameB)}`);
  };

  const handleAddAsset = (template: AssetTemplate, value: number) => {
    addAsset({
      name: template.label,
      currentValue: value,
      category: template.category,
      owner: activeOwner,
      liquidity: template.liquidity,
      saleCostPct: 0,
      taxCostPct: 0,
    });
    chipConfirm.flash(`Saved — ${template.label} at ${formatCurrency(value)} for ${ownerLabel(activeOwner, nameA, nameB)}`);
  };

  const handleAddDebt = (template: DebtTemplate, value: number) => {
    addLiability({ name: template.label, balance: value, category: template.category, owner: activeOwner });
    chipConfirm.flash(`Saved — ${template.label} at ${formatCurrency(value)} for ${ownerLabel(activeOwner, nameA, nameB)}`);
  };

  const openCustomAsset = () => {
    setAssetForm({ name: "", currentValue: 0, category: "cash", owner: activeOwner === "joint" ? "joint" : activeOwner });
    setCustomAssetOpen(true);
  };

  const openCustomDebt = () => {
    setDebtForm({ name: "", balance: 0, category: "loan", owner: activeOwner === "joint" ? "joint" : activeOwner });
    setCustomDebtOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="p-4 bg-muted/40 rounded-md border-l-4 border-gold/60 space-y-1">
        <p className="text-sm font-medium text-foreground">Tap a tile to set your amount.</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Choose {nameA}, {nameB} or Joint, then tap a category — the box opens with a typical figure you can change before saving.
          One ISA tile per person; joint savings stay under Joint.
        </p>
      </div>

      <div className="rounded-lg border border-gold/25 bg-gold/10 p-4 space-y-4" data-testid="card-savings-benchmarks">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Quick starting point for savings &amp; assets</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Typical UK planning figures if you do not have exact balances yet — replace with statements later.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          {(["A", "B", "joint"] as const).map((owner) => {
            const active = hasBenchmarkAssets(nonHomeAssets, owner);
            const total = benchmarkAssetTotal(nonHomeAssets, owner);
            const count = (owner === "joint" ? UK_JOINT_ASSET_BENCHMARKS : UK_ASSET_BENCHMARKS).length;
            return (
              <BenchmarkButton
                key={owner}
                label={owner === "joint" ? "Joint starting figures" : `Starting figures for ${ownerLabel(owner, nameA, nameB)}`}
                active={active}
                summary={active ? `${count} estimates · ${formatCurrency(total)} total` : undefined}
                onClick={() => applyBenchmarkAssets(owner)}
                testId={`button-apply-savings-benchmark-${owner.toLowerCase()}`}
              />
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-border/40 overflow-x-auto">
        {(["A", "B", "joint"] as const).map((owner) => {
          const isActive = activeOwner === owner;
          const count = nonHomeAssets.filter((a) => a.owner === owner).length;
          const total = nonHomeAssets.filter((a) => a.owner === owner).reduce((s, a) => s + a.currentValue, 0);
          return (
            <button
              key={owner}
              type="button"
              onClick={() => setActiveOwner(owner)}
              data-testid={`assets-owner-tab-${owner}`}
              className={cn(
                "relative px-4 py-2.5 text-sm font-semibold transition-colors -mb-px border-b-2 whitespace-nowrap",
                isActive ? "border-gold text-[#1a3357]" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {ownerLabel(owner, nameA, nameB)}
              {count > 0 && (
                <span className="ml-2 text-[10px] font-mono text-muted-foreground">
                  {count} · {formatCurrency(total)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <InlineConfirm message={chipConfirm.message} />

      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-[#1a3357]">{assetCovered}</span> of {assetTemplates.length} asset types
          {customAssets.length > 0 && <span> · {customAssets.length} other</span>}
        </p>
        <p className="text-xs">
          <span className="text-muted-foreground">{ownerLabel(activeOwner, nameA, nameB)} assets: </span>
          <span className="font-bold text-[#1a3357] tabular-nums">{formatCurrency(ownerAssetTotal)}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {assetTemplates.map((template) => {
          const asset = findAssetForTemplate(nonHomeAssets, template, activeOwner);
          return (
            <AssetChipCard
              key={`${template.id}-${activeOwner}`}
              template={template}
              asset={asset}
              owner={activeOwner}
              onAdd={(v) => handleAddAsset(template, v)}
              onUpdate={(v) => asset && updateAsset(asset.id, { currentValue: v })}
              onRemove={() => asset && removeAsset(asset.id)}
            />
          );
        })}
        <button
          type="button"
          onClick={openCustomAsset}
          className="rounded-lg border-2 border-dashed border-slate-300 p-3 text-left hover:border-gold/50 hover:bg-gold/[0.04] transition-all flex flex-col items-center justify-center min-h-[90px] text-muted-foreground hover:text-foreground"
          data-testid="button-add-asset"
        >
          <Plus className="w-4 h-4 mb-1" />
          <span className="text-xs font-semibold">Add other</span>
          <span className="text-[10px] text-muted-foreground/70">custom asset</span>
        </button>
      </div>

      {customAssets.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Other assets for {ownerLabel(activeOwner, nameA, nameB)}
          </p>
          <AnimatePresence>
            {customAssets.map((a) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1a3357] truncate">{a.name}</p>
                  <p className="text-[10px] text-muted-foreground">{a.category.replace(/_/g, " ")}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold tabular-nums">{formatCurrency(a.currentValue)}</span>
                  <button onClick={() => removeAsset(a.id)} className="p-1 text-rose-500 hover:text-rose-700" aria-label="Remove">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Separator />

      <div className="rounded-lg border border-cyan-200/80 bg-cyan-50/50 p-4 space-y-4" data-testid="card-debt-benchmarks">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Quick starting point for other debts</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Skip if you have no credit cards, loans or car finance outside the mortgage.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          {(["A", "B"] as const).map((owner) => (
            <BenchmarkButton
              key={owner}
              label={`Debt starting figures for ${ownerLabel(owner, nameA, nameB)}`}
              active={hasBenchmarkDebts(nonMortgageLiabilities, owner)}
              summary={
                hasBenchmarkDebts(nonMortgageLiabilities, owner)
                  ? `3 estimates · ${formatCurrency(benchmarkDebtTotal(nonMortgageLiabilities, owner))} total`
                  : undefined
              }
              onClick={() => applyBenchmarkDebts(owner)}
              testId={`button-apply-debt-benchmark-${owner.toLowerCase()}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-[#1a3357]">{debtCovered}</span> of {debtTemplates.length} debt types
          {customDebts.length > 0 && <span> · {customDebts.length} other</span>}
        </p>
        <p className="text-xs">
          <span className="text-muted-foreground">{ownerLabel(activeOwner, nameA, nameB)} debts: </span>
          <span className="font-bold text-rose-600 tabular-nums">{formatCurrency(ownerDebtTotal)}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {debtTemplates.map((template) => {
          const liability = findDebtForTemplate(nonMortgageLiabilities, template, activeOwner);
          return (
            <DebtChipCard
              key={`${template.id}-${activeOwner}`}
              template={template}
              liability={liability}
              owner={activeOwner}
              onAdd={(v) => handleAddDebt(template, v)}
              onUpdate={(v) => liability && updateLiability(liability.id, { balance: v })}
              onRemove={() => liability && removeLiability(liability.id)}
            />
          );
        })}
        {activeOwner !== "joint" && (
          <button
            type="button"
            onClick={openCustomDebt}
            className="rounded-lg border-2 border-dashed border-slate-300 p-3 text-left hover:border-gold/50 hover:bg-gold/[0.04] transition-all flex flex-col items-center justify-center min-h-[90px] text-muted-foreground hover:text-foreground"
            data-testid="button-add-liability"
          >
            <Plus className="w-4 h-4 mb-1" />
            <span className="text-xs font-semibold">Add other</span>
            <span className="text-[10px] text-muted-foreground/70">custom debt</span>
          </button>
        )}
      </div>

      {customDebts.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Other debts for {ownerLabel(activeOwner, nameA, nameB)}
          </p>
          <AnimatePresence>
            {customDebts.map((l) => (
              <motion.div
                key={l.id}
                layout
                className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1a3357] truncate">{l.name}</p>
                  <p className="text-[10px] text-muted-foreground">{l.category.replace(/_/g, " ")}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold tabular-nums text-rose-600">{formatCurrency(l.balance)}</span>
                  <button onClick={() => removeLiability(l.id)} className="p-1 text-rose-500 hover:text-rose-700" aria-label="Remove">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={customAssetOpen} onOpenChange={setCustomAssetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add custom asset</DialogTitle>
            <DialogDescription>Anything not covered by the tiles above.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={assetForm.name} onChange={(e) => setAssetForm((f) => ({ ...f, name: e.target.value }))} data-testid="input-asset-name" />
            </div>
            <div className="space-y-2">
              <Label>Value (£)</Label>
              <Input
                type="number"
                value={assetForm.currentValue || ""}
                onChange={(e) => setAssetForm((f) => ({ ...f, currentValue: parseFloat(e.target.value) || 0 }))}
                data-testid="input-asset-value"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={assetForm.category} onValueChange={(v) => setAssetForm((f) => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {AssetCategory.options.filter((o) => o !== "primary_home" && o !== "pension").map((o) => (
                      <SelectItem key={o} value={o}>{o.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Owner</Label>
                <Select value={assetForm.owner} onValueChange={(v) => setAssetForm((f) => ({ ...f, owner: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joint">Joint</SelectItem>
                    <SelectItem value="A">{nameA}</SelectItem>
                    <SelectItem value="B">{nameB}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (!assetForm.name) return;
                addAsset({ ...assetForm, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 });
                setCustomAssetOpen(false);
              }}
              data-testid="button-save-asset"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={customDebtOpen} onOpenChange={setCustomDebtOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add custom debt</DialogTitle>
            <DialogDescription>Anything not covered by the tiles above.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={debtForm.name} onChange={(e) => setDebtForm((f) => ({ ...f, name: e.target.value }))} data-testid="input-liability-name" />
            </div>
            <div className="space-y-2">
              <Label>Balance (£)</Label>
              <Input
                type="number"
                value={debtForm.balance || ""}
                onChange={(e) => setDebtForm((f) => ({ ...f, balance: parseFloat(e.target.value) || 0 }))}
                data-testid="input-liability-balance"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={debtForm.category} onValueChange={(v) => setDebtForm((f) => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LiabilityCategory.options.filter((o) => o !== "mortgage").map((o) => (
                      <SelectItem key={o} value={o}>{o.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Owner</Label>
                <Select value={debtForm.owner} onValueChange={(v) => setDebtForm((f) => ({ ...f, owner: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joint">Joint</SelectItem>
                    <SelectItem value="A">{nameA}</SelectItem>
                    <SelectItem value="B">{nameB}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (!debtForm.name) return;
                addLiability(debtForm);
                setCustomDebtOpen(false);
              }}
              data-testid="button-save-liability"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
