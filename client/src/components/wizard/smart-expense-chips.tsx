import { useState, useMemo, useEffect, useRef } from "react";
import { useInlineConfirm, InlineConfirm } from "./inline-confirm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Zap, ShoppingCart, Car, Shield, Users, Phone,
  Shirt, Coffee, Heart, Plus, Check, X, Pencil
} from "lucide-react";
import { useAppStore, Expense } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { chartTheme } from "@/lib/chart-theme";

interface ChipDef {
  key: string;
  name: string;
  category: string;
  icon: typeof Home;
  median: number;
  hint: string;
  color: string;
  /** Lowercase substrings used to recognise legacy expense names */
  aliases: string[];
}

const CHIPS: ChipDef[] = [
  { key: "rent",       name: "Rent / Housing",       category: "housing",   icon: Home,         median: 950,  hint: "or your share of housing costs",       color: "#F43F5E", aliases: ["rent", "housing", "mortgage payment"] },
  { key: "council",    name: "Council Tax",          category: "housing",   icon: Home,         median: 165,  hint: "you'll each pay your own after",       color: "#EC4899", aliases: ["council"] },
  { key: "utilities",  name: "Gas, electric, water", category: "housing",   icon: Zap,          median: 180,  hint: "monthly bills for new household",      color: "#F59E0B", aliases: ["utilit", "gas", "electric", "water", "energy", "bills"] },
  { key: "groceries",  name: "Food & groceries",     category: "living",    icon: ShoppingCart, median: 320,  hint: "weekly shop for yourself",             color: "#84CC16", aliases: ["food", "grocer", "shop"] },
  { key: "transport",  name: "Transport / car",      category: "transport", icon: Car,          median: 220,  hint: "fuel, insurance, tax, maintenance",    color: "#06B6D4", aliases: ["transport", "car", "fuel", "petrol"] },
  { key: "insurance",  name: "Insurance",            category: "insurance", icon: Shield,       median: 65,   hint: "contents, life, or other personal",    color: "#8B5CF6", aliases: ["insur"] },
  { key: "childcare",  name: "Childcare",            category: "child",     icon: Users,        median: 480,  hint: "nursery, after-school, childminder",   color: "#A855F7", aliases: ["childcare", "nursery", "childminder"] },
  { key: "phone",      name: "Phone & internet",     category: "living",    icon: Phone,        median: 50,   hint: "mobile + broadband",                   color: "#3B82F6", aliases: ["phone", "internet", "mobile", "broadband"] },
  { key: "clothing",   name: "Clothing & personal", category: "living",    icon: Shirt,        median: 90,   hint: "clothes, toiletries, haircuts",        color: "#10B981", aliases: ["cloth", "personal", "toiletries"] },
  { key: "leisure",    name: "Leisure & social",     category: "other",     icon: Coffee,       median: 150,  hint: "hobbies, eating out, subscriptions",   color: "#EAB308", aliases: ["leisure", "social", "hobby", "subscript"] },
  { key: "health",     name: "Health & fitness",     category: "other",     icon: Heart,        median: 60,   hint: "gym, dental, prescriptions",           color: "#F43F5E", aliases: ["health", "fitness", "gym", "dental", "medical"] },
];

const CATEGORY_LABELS: Record<string, string> = {
  living: "Living",
  housing: "Housing",
  child: "Children",
  debt_service: "Debt",
  insurance: "Insurance",
  transport: "Transport",
  other: "Other",
};

type ExpenseOwner = "A" | "B" | "joint";

function findExpenseForChip(expenses: Expense[], chip: ChipDef, owner: ExpenseOwner): Expense | undefined {
  const ownerExpenses = expenses.filter((e) => e.owner === owner);
  // 1. Exact name match (current chip label)
  const exact = ownerExpenses.find((e) => e.name === chip.name);
  if (exact) return exact;
  // 2. Alias substring match within the same category
  const lower = (s: string) => s.toLowerCase();
  return ownerExpenses.find((e) => {
    if (e.category !== chip.category) return false;
    const n = lower(e.name);
    return chip.aliases.some((a) => n.includes(a));
  });
}

interface ChipCardProps {
  chip: ChipDef;
  expense: Expense | undefined;
  owner: ExpenseOwner;
  onAdd: (monthly: number) => void;
  onUpdate: (monthly: number) => void;
  onRemove: () => void;
}

function ChipCard({ chip, expense, owner, onAdd, onUpdate, onRemove }: ChipCardProps) {
  const Icon = chip.icon;
  const active = !!expense;
  const initialFreq: "monthly" | "annual" = expense && expense.amountAnnual % 12 !== 0 ? "annual" : "monthly";
  const initialAmount = expense
    ? initialFreq === "monthly"
      ? Math.round(expense.amountAnnual / 12)
      : Math.round(expense.amountAnnual)
    : chip.median;
  const monthly = expense ? Math.round(expense.amountAnnual / 12) : 0;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialAmount);
  const [freq, setFreq] = useState<"monthly" | "annual">(initialFreq);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setDraft(initialAmount);
      setFreq(initialFreq);
      setTimeout(() => { inputRef.current?.focus(); inputRef.current?.select(); }, 30);
    }
  }, [editing, initialAmount, initialFreq]);

  const commit = () => {
    const raw = Math.max(0, Math.round(draft || 0));
    const monthlyEquivalent = freq === "monthly" ? raw : Math.round(raw / 12);
    if (monthlyEquivalent === 0) {
      if (active) onRemove();
    } else if (active) {
      onUpdate(monthlyEquivalent);
    } else {
      onAdd(monthlyEquivalent);
    }
    setEditing(false);
  };

  const handleClick = () => {
    if (!active) {
      onAdd(chip.median);
    } else {
      setEditing(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: chartTheme.ease }}
      className={`relative rounded-lg border p-3 text-left transition-all overflow-hidden ${
        active
          ? "bg-white border-gold/50 shadow-[0_4px_12px_-4px_rgba(201,168,76,0.25)]"
          : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
      }`}
      data-testid={`chip-expense-${chip.key}-${owner}`}
    >
      {active && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gold flex items-center justify-center" aria-hidden>
          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
        </span>
      )}

      {editing ? (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" style={{ color: chip.color }} />
            <span className="text-xs font-semibold text-[#1a3357] truncate">{chip.name}</span>
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
              onBlur={commit}
              className="h-7 text-sm px-2"
              data-testid={`input-chip-${chip.key}-${owner}`}
            />
          </div>
          <div className="flex gap-0.5 rounded-md bg-slate-100 p-0.5 text-[10px] font-medium" onMouseDown={(e) => e.preventDefault()}>
            {(["monthly", "annual"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFreq(f)}
                className={`flex-1 rounded px-1.5 py-0.5 transition-all ${
                  freq === f ? "bg-white text-[#1a3357] shadow-sm" : "text-muted-foreground"
                }`}
                data-testid={`freq-${chip.key}-${owner}-${f}`}
              >
                {f === "monthly" ? "/mo" : "/yr"}
              </button>
            ))}
          </div>
          {active && (
            <button
              type="button"
              onClick={(ev) => { ev.stopPropagation(); onRemove(); setEditing(false); }}
              className="text-[10px] text-rose-500 hover:text-rose-700 font-medium"
              data-testid={`button-chip-remove-${chip.key}-${owner}`}
            >
              Remove
            </button>
          )}
        </div>
      ) : (
        <button type="button" onClick={handleClick} className="w-full text-left">
          <div className="flex items-center gap-1.5 mb-1">
            <Icon className="w-3.5 h-3.5" style={{ color: chip.color }} />
            <span className="text-xs font-semibold text-[#1a3357] truncate">{chip.name}</span>
          </div>
          {active ? (
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-base font-bold tabular-nums" style={{ color: chip.color }}>
                £{monthly.toLocaleString("en-GB")}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                /mo <Pencil className="w-2.5 h-2.5 opacity-60" />
              </span>
            </div>
          ) : (
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-[11px] text-muted-foreground">
                ~£{chip.median}/mo typical
              </span>
              <span className="text-[10px] text-gold font-semibold">+ Add</span>
            </div>
          )}
          <p className="text-[10px] text-muted-foreground/70 mt-1 leading-tight line-clamp-1">{chip.hint}</p>
        </button>
      )}
    </motion.div>
  );
}

interface SmartExpenseChipsProps {
  advancedMode: boolean;
}

export function SmartExpenseChips({ advancedMode }: SmartExpenseChipsProps) {
  const { expenses, addExpense, updateExpense, removeExpense, profile } = useAppStore();
  const nameA = profile?.partyAName?.trim() || "Party A";
  const nameB = profile?.partyBName?.trim() || "Party B";

  const [activeOwner, setActiveOwner] = useState<ExpenseOwner>("A");
  const [otherDialogOpen, setOtherDialogOpen] = useState(false);
  const [otherForm, setOtherForm] = useState({ name: "", amount: 0, category: "other" as string, frequency: "monthly" as "monthly" | "annual", owner: "A" as ExpenseOwner });
  const chipConfirm = useInlineConfirm();

  const ownerLabel = (o: ExpenseOwner) => (o === "A" ? nameA : o === "B" ? nameB : "Shared");

  const handleAdd = (chip: ChipDef, owner: ExpenseOwner, monthly: number) => {
    addExpense({
      name: chip.name,
      amountAnnual: monthly * 12,
      category: chip.category,
      owner,
      inflationLinked: true,
    });
    chipConfirm.flash(`Saved — ${chip.name} added at £${monthly.toLocaleString("en-GB")}/mo for ${ownerLabel(owner)}`);
  };

  const handleUpdate = (expense: Expense, monthly: number) => {
    updateExpense(expense.id, { amountAnnual: monthly * 12 });
    chipConfirm.flash(`Updated — ${expense.name} now £${monthly.toLocaleString("en-GB")}/mo`);
  };

  const ownerExpenses = useMemo(() => expenses.filter((e) => e.owner === activeOwner), [expenses, activeOwner]);
  const ownerCovered = useMemo(
    () => CHIPS.filter((c) => !!findExpenseForChip(expenses, c, activeOwner)).length,
    [expenses, activeOwner]
  );
  const ownerTotalMonthly = useMemo(
    () => Math.round(ownerExpenses.reduce((s, e) => s + e.amountAnnual, 0) / 12),
    [ownerExpenses]
  );

  const customExpenses = useMemo(() => {
    const claimedIds = new Set<string>();
    for (const c of CHIPS) {
      const e = findExpenseForChip(expenses, c, activeOwner);
      if (e) claimedIds.add(e.id);
    }
    return ownerExpenses.filter((e) => !claimedIds.has(e.id));
  }, [expenses, ownerExpenses, activeOwner]);

  const openOtherDialog = () => {
    setOtherForm({ name: "", amount: 0, category: "other", frequency: "monthly", owner: activeOwner });
    setOtherDialogOpen(true);
  };

  const saveOther = () => {
    if (!otherForm.name || otherForm.amount <= 0) return;
    const annual = otherForm.frequency === "monthly" ? otherForm.amount * 12 : otherForm.amount;
    addExpense({
      name: otherForm.name,
      amountAnnual: annual,
      category: otherForm.category,
      owner: otherForm.owner,
      inflationLinked: true,
    });
    chipConfirm.flash(`Saved — ${otherForm.name} added for ${ownerLabel(otherForm.owner)}`);
    setOtherForm({ name: "", amount: 0, category: "other", frequency: "monthly", owner: activeOwner });
    setOtherDialogOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="p-4 bg-muted/40 rounded-md border-l-4 border-rose-300">
        <p className="text-sm font-medium text-foreground mb-1">Tap a category to add it.</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Each tile uses a typical UK monthly figure as a starting point — tap again to adjust to your own number.
          Don't include mortgage payments here; those are calculated automatically.
        </p>
      </div>

      <div className="flex items-center gap-2 border-b border-border/40 overflow-x-auto">
        {(["A", "B", "joint"] as const).map((owner) => {
          const isActive = activeOwner === owner;
          const label = ownerLabel(owner);
          const count = expenses.filter((e) => e.owner === owner).length;
          const total = Math.round(expenses.filter((e) => e.owner === owner).reduce((s, e) => s + e.amountAnnual, 0) / 12);
          return (
            <button
              key={owner}
              type="button"
              onClick={() => setActiveOwner(owner)}
              data-testid={`tab-expenses-owner-${owner}`}
              className={`relative px-4 py-2.5 text-sm font-semibold transition-colors -mb-px border-b-2 whitespace-nowrap ${
                isActive
                  ? "border-gold text-[#1a3357]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {count > 0 && (
                <span className="ml-2 text-[10px] font-mono text-muted-foreground">
                  {count} · £{total.toLocaleString("en-GB")}/mo
                </span>
              )}
            </button>
          );
        })}
      </div>

      <InlineConfirm message={chipConfirm.message} />

      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-[#1a3357]">{ownerCovered}</span> of {CHIPS.length} categories considered
          {customExpenses.length > 0 && <span> · {customExpenses.length} custom</span>}
        </p>
        <p className="text-xs">
          <span className="text-muted-foreground">{ownerLabel(activeOwner)} total: </span>
          <span className="font-bold text-[#1a3357] tabular-nums">£{ownerTotalMonthly.toLocaleString("en-GB")}/mo</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {CHIPS.map((chip) => {
          const expense = findExpenseForChip(expenses, chip, activeOwner);
          return (
            <ChipCard
              key={`${chip.key}-${activeOwner}`}
              chip={chip}
              expense={expense}
              owner={activeOwner}
              onAdd={(m) => handleAdd(chip, activeOwner, m)}
              onUpdate={(m) => expense && handleUpdate(expense, m)}
              onRemove={() => expense && removeExpense(expense.id)}
            />
          );
        })}
        <button
          type="button"
          onClick={openOtherDialog}
          className="rounded-lg border-2 border-dashed border-slate-300 p-3 text-left hover:border-gold/50 hover:bg-gold/[0.04] transition-all flex flex-col items-center justify-center min-h-[90px] text-muted-foreground hover:text-foreground"
          data-testid="button-chip-add-other"
        >
          <Plus className="w-4 h-4 mb-1" />
          <span className="text-xs font-semibold">Add other</span>
          <span className="text-[10px] text-muted-foreground/70">custom expense</span>
        </button>
      </div>

      {customExpenses.length > 0 && (
        <div className="space-y-1.5 pt-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Custom expenses for {ownerLabel(activeOwner)}</p>
          <AnimatePresence>
            {customExpenses.map((e) => (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md"
                data-testid={`custom-expense-${e.id}`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1a3357] truncate">{e.name}</p>
                  <p className="text-[10px] text-muted-foreground">{CATEGORY_LABELS[e.category] ?? e.category}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold tabular-nums text-[#1a3357]">{formatCurrency(Math.round(e.amountAnnual / 12))}/mo</span>
                  <button onClick={() => removeExpense(e.id)} className="p-1 text-rose-500 hover:text-rose-700" aria-label="Remove" data-testid={`button-remove-custom-${e.id}`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={otherDialogOpen} onOpenChange={setOtherDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add custom expense</DialogTitle>
            <DialogDescription>Anything not covered by the standard categories.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Expense name</Label>
              <Input value={otherForm.name} onChange={(e) => setOtherForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Music lessons" data-testid="input-other-name" />
            </div>
            <div className="space-y-2">
              <Label>Amount (£)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={otherForm.amount || ""}
                  onChange={(e) => setOtherForm((f) => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
                  className="flex-1"
                  data-testid="input-other-amount"
                />
                <Select value={otherForm.frequency} onValueChange={(v: "monthly" | "annual") => setOtherForm((f) => ({ ...f, frequency: v }))}>
                  <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">per month</SelectItem>
                    <SelectItem value="annual">per year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Whose expense?</Label>
                <Select value={otherForm.owner} onValueChange={(v: ExpenseOwner) => setOtherForm((f) => ({ ...f, owner: v }))}>
                  <SelectTrigger data-testid="select-other-owner"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">{nameA}</SelectItem>
                    <SelectItem value="B">{nameB}</SelectItem>
                    <SelectItem value="joint">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={otherForm.category} onValueChange={(v) => setOtherForm((f) => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                      <SelectItem key={val} value={val}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveOther} data-testid="button-save-other-expense">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
