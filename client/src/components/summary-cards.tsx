import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Landmark } from "lucide-react";

interface SummaryProps {
  netWorth: { total: number; partyA: number; partyB: number };
  liquidity: { partyA: number; partyB: number };
}

export function SummaryCards({ netWorth, liquidity }: SummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <Card className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Net Worth</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(netWorth.total)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Combined marital assets
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Party A</CardTitle>
          <Wallet className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(netWorth.partyA)}</div>
              <p className="text-xs text-muted-foreground mt-1">Net Position</p>
            </div>
            <div className="text-right">
               <div className="text-sm font-semibold text-slate-600">{formatCurrency(liquidity.partyA)}</div>
               <p className="text-xs text-muted-foreground">Liquid</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Party B</CardTitle>
          <Landmark className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(netWorth.partyB)}</div>
              <p className="text-xs text-muted-foreground mt-1">Net Position</p>
            </div>
            <div className="text-right">
               <div className="text-sm font-semibold text-slate-600">{formatCurrency(liquidity.partyB)}</div>
               <p className="text-xs text-muted-foreground">Liquid</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
