import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, Check } from "lucide-react";
import { useAppStore, Asset, Liability } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AssetCategory, LiabilityCategory } from "@shared/schema";
import { cn, formatCurrency } from "@/lib/utils";
import { useInlineConfirm, InlineConfirm } from "@/components/wizard/inline-confirm";
import { WizardEntryPanel, type WizardOwner } from "@/components/wizard/wizard-entry-panel";
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
} from "@/lib/wizard-asset-templates";

function OwnerTabs({
  active,
  onChange,
  nameA,
  nameB,
  testIdPrefix,
}: {
  active: WizardOwner;
  onChange: (owner: WizardOwner) => void;
  nameA: string;
  nameB: string;
  testIdPrefix: string;
}) {
  const tabs: { id: WizardOwner; label: string }[] = [
    { id: "A", label: nameA },
    { id: "B", label: nameB },
    { id: "joint", label: "Joint" },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-border/40 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            data-testid={`${testIdPrefix}-owner-tab-${tab.id}`}
            className={cn(
              "relative px-4 py-2.5 text-sm font-semibold transition-colors -mb-px border-b-2 whitespace-nowrap",
              isActive ? "border-gold text-[#1a3357]" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
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

function TemplateChip({
  template,
  active,
  activeValue,
  onClick,
  testId,
}: {
  template: AssetTemplate | DebtTemplate;
  active: boolean;
  activeValue?: number;
  onClick: () => void;
  testId: string;
}) {
  const Icon = template.icon;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-testid={testId}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex items-start gap-3 rounded-lg border p-3 text-left transition-all w-full overflow-hidden",
        active
          ? "border-gold/50 bg-white shadow-[0_4px_12px_-4px_rgba(201,168,76,0.25)]"
          : "border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-white",
      )}
    >
      <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", active ? "text-gold" : "text-muted-foreground")} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-[#1a3357]">{template.label}</span>
          {active && activeValue != null && activeValue > 0 && (
            <span className="text-xs font-bold tabular-nums text-gold shrink-0">
              {formatCurrency(activeValue)}
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">{template.hint}</p>
        {!active && <span className="text-[10px] text-gold font-semibold mt-1 inline-block">Tap to add</span>}
      </div>
      {active && (
        <Check className="absolute top-2 right-2 h-3.5 w-3.5 text-gold" aria-hidden />
      )}
    </motion.button>
  );
}

type PanelState =
  | { kind: "closed" }
  | {
      kind: "asset";
      template: AssetTemplate;
      owner: WizardOwner;
      editing?: Asset;
    }
  | {
      kind: "debt";
      template: DebtTemplate;
      owner: WizardOwner;
      editing?: Liability;
    }
  | { kind: "asset-custom"; editing?: Asset }
  | { kind: "debt-custom"; editing?: Liability };

export function StepSavingsDebts() {
  const assetConfirm = useInlineConfirm();
  const liabilityConfirm = useInlineConfirm();
  const { assets, liabilities, addAsset, updateAsset, removeAsset, addLiability, updateLiability, removeLiability, profile } =
    useAppStore();
  const nameA = profile?.partyAName?.trim() || "Party A";
  const nameB = profile?.partyBName?.trim() || "Party B";

  const [activeOwner, setActiveOwner] = useState<WizardOwner>("A");
  const [panel, setPanel] = useState<PanelState>({ kind: "closed" });

  const [customAssetOpen, setCustomAssetOpen] = useState(false);
  const [customDebtOpen, setCustomDebtOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [editingLiability, setEditingLiability] = useState<Liability | null>(null);
  const [assetForm, setAssetForm] = useState({ name: "", currentValue: 0, category: "cash" as string, owner: "joint" as string });
  const [liabilityForm, setLiabilityForm] = useState({ name: "", balance: 0, category: "loan" as string, owner: "joint" as string });

  const nonHomeAssets = assets.filter((a) => a.category !== "primary_home" && a.category !== "pension");
  const nonMortgageLiabilities = liabilities.filter((l) => l.category !== "mortgage");

  const assetTemplates = assetTemplatesForOwner(activeOwner);
  const debtTemplates = debtTemplatesForOwner(activeOwner);

  const ownerDisplay = (owner: string) => {
    if (owner === "joint") return "Joint";
    if (owner === "A") return nameA;
    if (owner === "B") return nameB;
    return owner;
  };

  const applyBenchmarkAssets = (owner: WizardOwner) => {
    const existing = new Set(
      nonHomeAssets.filter((a) => a.owner === owner).map((a) => a.name.toLowerCase()),
    );
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
  };

  const applyBenchmarkDebts = (owner: "A" | "B") => {
    const existing = new Set(
      nonMortgageLiabilities.filter((l) => l.owner === owner).map((l) => l.name.toLowerCase()),
    );
    UK_DEBT_BENCHMARKS.forEach((benchmark) => {
      const name = `${benchmark.name} (starting estimate)`;
      if (existing.has(name.toLowerCase())) return;
      addLiability({ name, balance: benchmark.balance, category: benchmark.category, owner });
    });
  };

  const openAssetTemplate = (template: AssetTemplate) => {
    const existing = findAssetForTemplate(nonHomeAssets, template, activeOwner);
    if (existing) {
      setPanel({ kind: "asset", template, owner: activeOwner, editing: existing });
    } else {
      setPanel({ kind: "asset", template, owner: activeOwner });
    }
  };

  const openDebtTemplate = (template: DebtTemplate) => {
    const existing = findDebtForTemplate(nonMortgageLiabilities, template, activeOwner);
    if (existing) {
      setPanel({ kind: "debt", template, owner: activeOwner, editing: existing });
    } else {
      setPanel({ kind: "debt", template, owner: activeOwner });
    }
  };

  const panelProps = useMemo(() => {
    if (panel.kind === "closed") return null;

    if (panel.kind === "asset") {
      const allowedOwners: WizardOwner[] = panel.template.ownerScope === "joint" ? ["joint"] : ["A", "B", "joint"];
      return {
        open: true,
        kind: "asset" as const,
        title: panel.template.label,
        hint: panel.template.hint,
        category: panel.template.category,
        defaultName: panel.template.label,
        allowedOwners,
        initialOwner: panel.editing?.owner as WizardOwner ?? (panel.template.ownerScope === "joint" ? "joint" : panel.owner),
        initialValue: panel.editing?.currentValue ?? 0,
        initialName: panel.editing?.name,
        isEdit: Boolean(panel.editing),
        onSave: ({ owner, value, name, category }: { owner: WizardOwner; value: number; name: string; category: string }) => {
          const data = {
            name,
            currentValue: value,
            category,
            owner,
            liquidity: panel.template.liquidity,
            saleCostPct: 0,
            taxCostPct: 0,
          };
          if (panel.editing) updateAsset(panel.editing.id, data);
          else addAsset(data);
        },
      };
    }

    if (panel.kind === "debt") {
      const allowedOwners: WizardOwner[] = panel.template.ownerScope === "joint" ? ["joint"] : ["A", "B", "joint"];
      return {
        open: true,
        kind: "debt" as const,
        title: panel.template.label,
        hint: panel.template.hint,
        category: panel.template.category,
        defaultName: panel.template.label,
        allowedOwners,
        initialOwner: panel.editing?.owner as WizardOwner ?? (panel.template.ownerScope === "joint" ? "joint" : panel.owner),
        initialValue: panel.editing?.balance ?? 0,
        initialName: panel.editing?.name,
        isEdit: Boolean(panel.editing),
        onSave: ({ owner, value, name, category }: { owner: WizardOwner; value: number; name: string; category: string }) => {
          const data = { name, balance: value, category, owner };
          if (panel.editing) updateLiability(panel.editing.id, data);
          else addLiability(data);
        },
      };
    }

    return null;
  }, [panel, addAsset, updateAsset, addLiability, updateLiability]);

  const openCustomAsset = (asset?: Asset) => {
    setEditingAsset(asset ?? null);
    if (asset) {
      setAssetForm({ name: asset.name, currentValue: asset.currentValue, category: asset.category, owner: asset.owner });
    } else {
      setAssetForm({ name: "", currentValue: 0, category: "cash", owner: activeOwner === "joint" ? "joint" : activeOwner });
    }
    setCustomAssetOpen(true);
  };

  const openCustomDebt = (liability?: Liability) => {
    setEditingLiability(liability ?? null);
    if (liability) {
      setLiabilityForm({ name: liability.name, balance: liability.balance, category: liability.category, owner: liability.owner });
    } else {
      setLiabilityForm({ name: "", balance: 0, category: "loan", owner: activeOwner === "joint" ? "joint" : activeOwner });
    }
    setCustomDebtOpen(true);
  };

  const saveCustomAsset = () => {
    if (!assetForm.name) return;
    if (editingAsset) updateAsset(editingAsset.id, assetForm);
    else addAsset({ ...assetForm, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 });
    setCustomAssetOpen(false);
  };

  const saveCustomDebt = () => {
    if (!liabilityForm.name) return;
    if (editingLiability) updateLiability(editingLiability.id, liabilityForm);
    else addLiability(liabilityForm);
    setCustomDebtOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-md space-y-2">
        <p className="text-sm font-medium">Assets beyond the family home</p>
        <p className="text-xs text-muted-foreground">
          Choose whose figures you are adding, tap a common asset type, then enter the value on the full-screen panel.
          Joint items stay under the Joint tab.
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
            const label =
              owner === "joint" ? "Joint starting figures" : `Starting figures for ${owner === "A" ? nameA : nameB}`;
            const count = (owner === "joint" ? UK_JOINT_ASSET_BENCHMARKS : UK_ASSET_BENCHMARKS).length;
            return (
              <BenchmarkButton
                key={owner}
                label={label}
                active={active}
                summary={active ? `${count} estimates · ${formatCurrency(total)} total` : undefined}
                onClick={() => applyBenchmarkAssets(owner)}
                testId={`button-apply-savings-benchmark-${owner.toLowerCase()}`}
              />
            );
          })}
        </div>
      </div>

      <OwnerTabs active={activeOwner} onChange={setActiveOwner} nameA={nameA} nameB={nameB} testIdPrefix="assets" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Label className="text-base font-semibold">
            {activeOwner === "joint" ? "Joint assets" : `Assets for ${ownerDisplay(activeOwner)}`}
          </Label>
          <Button variant="outline" size="sm" onClick={() => openCustomAsset()} data-testid="button-add-asset">
            <Plus className="w-4 h-4 mr-1" /> Add custom
          </Button>
        </div>

        {nonHomeAssets.length > 0 && (
          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="w-[70px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {nonHomeAssets.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{ownerDisplay(a.owner)}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(a.currentValue)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openCustomAsset(a)}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeAsset(a.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Common assets to consider</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {assetTemplates.map((template) => {
              const existing = findAssetForTemplate(nonHomeAssets, template, activeOwner);
              return (
                <TemplateChip
                  key={template.id}
                  template={template}
                  active={Boolean(existing)}
                  activeValue={existing?.currentValue}
                  onClick={() => openAssetTemplate(template)}
                  testId={`button-suggest-asset-${template.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Separator />

      <div className="rounded-lg border border-cyan-200/80 bg-cyan-50/50 p-4 space-y-4" data-testid="card-debt-benchmarks">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Quick starting point for other debts</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Skip if you have no credit cards, loans or car finance outside the mortgage.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          {(["A", "B"] as const).map((owner) => {
            const active = hasBenchmarkDebts(nonMortgageLiabilities, owner);
            const total = benchmarkDebtTotal(nonMortgageLiabilities, owner);
            return (
              <BenchmarkButton
                key={owner}
                label={`Debt starting figures for ${owner === "A" ? nameA : nameB}`}
                active={active}
                summary={active ? `3 estimates · ${formatCurrency(total)} total` : undefined}
                onClick={() => applyBenchmarkDebts(owner)}
                testId={`button-apply-debt-benchmark-${owner.toLowerCase()}`}
              />
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Label className="text-base font-semibold">
            {activeOwner === "joint" ? "Joint debts" : `Debts for ${ownerDisplay(activeOwner)}`}
          </Label>
          <Button variant="outline" size="sm" onClick={() => openCustomDebt()} data-testid="button-add-liability">
            <Plus className="w-4 h-4 mr-1" /> Add custom
          </Button>
        </div>

        {nonMortgageLiabilities.length > 0 && (
          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="w-[70px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {nonMortgageLiabilities.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{ownerDisplay(l.owner)}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-red-600">-{formatCurrency(l.balance)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openCustomDebt(l)}>
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeLiability(l.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            {activeOwner === "joint" ? "Common joint debts" : "Common debts to consider"}
          </Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {debtTemplates.map((template) => {
              const existing = findDebtForTemplate(nonMortgageLiabilities, template, activeOwner);
              return (
                <TemplateChip
                  key={template.id}
                  template={template}
                  active={Boolean(existing)}
                  activeValue={existing?.balance}
                  onClick={() => openDebtTemplate(template)}
                  testId={`button-suggest-debt-${template.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {panelProps && (
        <WizardEntryPanel
          {...panelProps}
          nameA={nameA}
          nameB={nameB}
          onClose={() => setPanel({ kind: "closed" })}
        />
      )}

      <Dialog open={customAssetOpen} onOpenChange={setCustomAssetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAsset ? "Edit asset" : "Add custom asset"}</DialogTitle>
            <DialogDescription>For anything not listed above.</DialogDescription>
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
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setAssetForm((f) => ({ ...f, currentValue: Number.isNaN(v) ? 0 : v }));
                }}
                onBlur={(e) => {
                  const v = parseFloat(e.target.value);
                  if (!Number.isNaN(v) && v > 0) assetConfirm.flash(`Looks good — ${formatCurrency(v)} recorded`);
                }}
                data-testid="input-asset-value"
              />
              <InlineConfirm message={assetConfirm.message} />
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
            <Button onClick={saveCustomAsset} data-testid="button-save-asset">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={customDebtOpen} onOpenChange={setCustomDebtOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLiability ? "Edit debt" : "Add custom debt"}</DialogTitle>
            <DialogDescription>For anything not listed above.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={liabilityForm.name} onChange={(e) => setLiabilityForm((f) => ({ ...f, name: e.target.value }))} data-testid="input-liability-name" />
            </div>
            <div className="space-y-2">
              <Label>Balance (£)</Label>
              <Input
                type="number"
                value={liabilityForm.balance || ""}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setLiabilityForm((f) => ({ ...f, balance: Number.isNaN(v) ? 0 : v }));
                }}
                onBlur={(e) => {
                  const v = parseFloat(e.target.value);
                  if (!Number.isNaN(v) && v > 0) liabilityConfirm.flash(`Saved — ${formatCurrency(v)} debt recorded`);
                }}
                data-testid="input-liability-balance"
              />
              <InlineConfirm message={liabilityConfirm.message} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={liabilityForm.category} onValueChange={(v) => setLiabilityForm((f) => ({ ...f, category: v }))}>
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
                <Select value={liabilityForm.owner} onValueChange={(v) => setLiabilityForm((f) => ({ ...f, owner: v }))}>
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
            <Button onClick={saveCustomDebt} data-testid="button-save-liability">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
