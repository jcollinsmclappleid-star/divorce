import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { InlineConfirm, useInlineConfirm } from "./inline-confirm";

export type WizardOwner = "A" | "B" | "joint";

const VALUE_PRESETS = [1_000, 2_500, 5_000, 10_000, 25_000, 50_000] as const;

export interface WizardEntryPanelProps {
  open: boolean;
  onClose: () => void;
  kind: "asset" | "debt";
  title: string;
  hint: string;
  category: string;
  defaultName: string;
  nameA: string;
  nameB: string;
  allowedOwners: WizardOwner[];
  initialOwner: WizardOwner;
  initialValue?: number;
  initialName?: string;
  isEdit?: boolean;
  onSave: (data: { owner: WizardOwner; value: number; name: string; category: string }) => void;
}

function ownerLabel(owner: WizardOwner, nameA: string, nameB: string): string {
  if (owner === "joint") return "Joint";
  return owner === "A" ? nameA : nameB;
}

export function WizardEntryPanel({
  open,
  onClose,
  kind,
  title,
  hint,
  category,
  defaultName,
  nameA,
  nameB,
  allowedOwners,
  initialOwner,
  initialValue = 0,
  initialName,
  isEdit,
  onSave,
}: WizardEntryPanelProps) {
  const confirm = useInlineConfirm();
  const [owner, setOwner] = useState<WizardOwner>(initialOwner);
  const [value, setValue] = useState(initialValue);
  const [name, setName] = useState(initialName ?? defaultName);

  useEffect(() => {
    if (!open) return;
    setOwner(initialOwner);
    setValue(initialValue);
    setName(initialName ?? defaultName);
  }, [open, initialOwner, initialValue, initialName, defaultName]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const valueLabel = kind === "asset" ? "Current value" : "Outstanding balance";
  const canSave = name.trim().length > 0 && value > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSave({ owner, value, name: name.trim(), category });
    confirm.flash(
      kind === "asset"
        ? `Saved — ${formatCurrency(value)} added for ${ownerLabel(owner, nameA, nameB)}`
        : `Saved — ${formatCurrency(value)} debt for ${ownerLabel(owner, nameA, nameB)}`,
    );
    onClose();
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-[#f4f5f7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="wizard-entry-panel-title"
          data-testid="wizard-entry-panel"
        >
          <div className="shrink-0 border-b border-slate-200/80 bg-white shadow-sm">
            <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                  {isEdit ? "Edit entry" : kind === "asset" ? "Add asset" : "Add debt"}
                </p>
                <h2 id="wizard-entry-panel-title" className="truncate text-lg font-display font-bold text-[#1a3357]">
                  {title}
                </h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close"
                data-testid="button-close-entry-panel"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-lg space-y-6 px-4 py-6 sm:px-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{hint}</p>

              {allowedOwners.length > 1 && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Whose {kind === "asset" ? "asset" : "debt"} is this?</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {allowedOwners.map((o) => {
                      const active = owner === o;
                      return (
                        <button
                          key={o}
                          type="button"
                          onClick={() => setOwner(o)}
                          data-testid={`panel-owner-${o}`}
                          className={cn(
                            "rounded-lg border px-3 py-3 text-sm font-semibold transition-all",
                            active
                              ? "border-gold/50 bg-white shadow-[0_4px_12px_-4px_rgba(201,168,76,0.25)] text-[#1a3357]"
                              : "border-slate-200 bg-white/70 text-muted-foreground hover:border-slate-300",
                          )}
                        >
                          {ownerLabel(o, nameA, nameB)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {allowedOwners.length === 1 && (
                <div className="rounded-lg border border-gold/25 bg-gold/5 px-4 py-3 text-sm">
                  <span className="text-muted-foreground">Owner: </span>
                  <span className="font-semibold text-[#1a3357]">{ownerLabel(allowedOwners[0], nameA, nameB)}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="entry-panel-value" className="text-sm font-semibold">
                  {valueLabel} (£)
                </Label>
                <Input
                  id="entry-panel-value"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={100}
                  value={value || ""}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setValue(Number.isNaN(v) ? 0 : v);
                  }}
                  className="h-14 text-2xl font-bold tabular-nums"
                  placeholder="0"
                  autoFocus
                  data-testid="input-entry-panel-value"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  {VALUE_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setValue(preset)}
                      className={cn(
                        "min-w-[4rem] rounded-md border px-3 py-2 text-sm font-semibold tabular-nums transition-colors",
                        value === preset
                          ? "border-gold/50 bg-gold/10 text-[#1a3357]"
                          : "border-slate-200 bg-white hover:border-gold/40",
                      )}
                      data-testid={`button-value-preset-${preset}`}
                    >
                      £{preset >= 1000 ? `${preset / 1000}k` : preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="entry-panel-name" className="text-sm font-semibold">
                  Label <span className="font-normal text-muted-foreground">(optional to edit)</span>
                </Label>
                <Input
                  id="entry-panel-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-entry-panel-name"
                />
              </div>

              <InlineConfirm message={confirm.message} />
            </div>
          </div>

          <div className="shrink-0 border-t border-slate-200/80 bg-white px-4 py-4 sm:px-6">
            <div className="mx-auto flex max-w-lg gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1 gap-2"
                disabled={!canSave}
                onClick={handleSave}
                data-testid="button-save-entry-panel"
              >
                <Check className="h-4 w-4" />
                {isEdit ? "Update" : "Add to my figures"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
