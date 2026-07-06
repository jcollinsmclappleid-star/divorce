import { cn } from "@/lib/utils";

export type PartyOwner = "A" | "B" | "joint";

function partyLabel(owner: PartyOwner, nameA: string, nameB: string): string {
  if (owner === "joint") return "Shared";
  return owner === "A" ? nameA : nameB;
}

type TabMeta = { count?: number; totalLabel?: string };

type WizardPartySelectorProps<T extends PartyOwner = PartyOwner> = {
  owners: T[];
  activeOwner: T;
  onChange: (owner: T) => void;
  nameA: string;
  nameB: string;
  tabMeta?: Partial<Record<T, TabMeta>>;
  testIdPrefix?: string;
  /** Shorter layout when repeated mid-step (e.g. above debts). */
  variant?: "default" | "inline";
};

export function WizardPartySelector<T extends PartyOwner = PartyOwner>({
  owners,
  activeOwner,
  onChange,
  nameA,
  nameB,
  tabMeta,
  testIdPrefix = "party",
  variant = "default",
}: WizardPartySelectorProps<T>) {
  const activeLabel = partyLabel(activeOwner, nameA, nameB);

  const hasJoint = (owners as PartyOwner[]).includes("joint");
  const selectorHint =
    owners.length === 2 && !hasJoint
      ? `Select ${nameA} or ${nameB}`
      : `Select ${nameA}, ${nameB} or Shared`;

  if (variant === "inline") {
    return (
      <div className="space-y-2" data-testid={`${testIdPrefix}-party-selector`}>
        <p className="text-[11px] font-medium text-muted-foreground">
          Whose figures? <span className="text-foreground font-semibold">{activeLabel}</span>
        </p>
        <div className="flex items-center gap-2 border-b border-border/40 overflow-x-auto">
          {owners.map((owner) => {
            const isActive = activeOwner === owner;
            const meta = tabMeta?.[owner];
            return (
              <button
                key={owner}
                type="button"
                onClick={() => onChange(owner)}
                data-testid={`${testIdPrefix}-owner-tab-${owner}`}
                className={cn(
                  "relative px-4 py-2.5 text-sm font-semibold transition-colors -mb-px border-b-2 whitespace-nowrap",
                  isActive ? "border-gold text-[#1a3357]" : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {partyLabel(owner, nameA, nameB)}
                {meta?.totalLabel ? (
                  <span className="ml-2 text-[10px] font-mono text-muted-foreground">{meta.totalLabel}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border border-primary/15 bg-primary/[0.04] px-3 py-2.5 space-y-2"
      data-testid={`${testIdPrefix}-party-selector`}
    >
      <p className="text-[11px] text-muted-foreground leading-snug">
        <span className="font-medium text-foreground">{selectorHint}</span>
        {" "}— tiles below apply to{" "}
        <span className="font-semibold text-primary">{activeLabel}</span>
      </p>
      <div className="flex items-center gap-2 border-b border-border/40 overflow-x-auto -mx-1 px-1">
        {owners.map((owner) => {
          const isActive = activeOwner === owner;
          const meta = tabMeta?.[owner];
          return (
            <button
              key={owner}
              type="button"
              onClick={() => onChange(owner)}
              data-testid={`${testIdPrefix}-owner-tab-${owner}`}
              className={cn(
                "relative px-4 py-2 text-sm font-semibold transition-colors -mb-px border-b-2 whitespace-nowrap",
                isActive ? "border-gold text-[#1a3357]" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {partyLabel(owner, nameA, nameB)}
              {meta?.count != null && meta.count > 0 && meta.totalLabel ? (
                <span className="ml-2 text-[10px] font-mono text-muted-foreground">
                  {meta.count} · {meta.totalLabel}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
