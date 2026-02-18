import { Layout } from "@/components/layout";
import { useAppStore } from "@/hooks/use-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScenarioType } from "@shared/schema";
import { AlertCircle } from "lucide-react";

export default function ScenariosPage() {
  const { scenarios, toggleScenario } = useAppStore();

  const scenarioList = [
    {
      id: "S1_Sell_Split",
      title: "Clean Break (Sell & Split)",
      description: "Sell all major assets including family home and split proceeds 50/50.",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: "S2_A_Keeps_Home",
      title: "Party A Retains Home",
      description: "Party A keeps the primary residence. Party B receives other assets or cash to offset.",
      color: "bg-emerald-100 text-emerald-800"
    },
    {
      id: "S3_B_Keeps_Home",
      title: "Party B Retains Home",
      description: "Party B keeps the primary residence. Party A receives other assets or cash to offset.",
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: "S4_Joint_Then_Sell",
      title: "Mesher Order (Deferred Sale)",
      description: "Property remains in joint names until a trigger event (e.g. youngest child turns 18), then sold.",
      color: "bg-amber-100 text-amber-800"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Scenario Planning</h1>
          <p className="text-muted-foreground mt-1">Compare different financial outcomes.</p>
        </div>

        <div className="grid gap-6">
          {scenarioList.map((s) => (
            <Card key={s.id} className={`transition-all ${scenarios[s.id as keyof typeof scenarios]?.enabled ? 'ring-2 ring-primary border-primary' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {s.title}
                    {scenarios[s.id as keyof typeof scenarios]?.enabled && (
                      <Badge variant="default" className="ml-2">Active</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{s.description}</CardDescription>
                </div>
                <Switch 
                  checked={scenarios[s.id as keyof typeof scenarios]?.enabled}
                  onCheckedChange={(checked) => toggleScenario(s.id as any, checked)}
                />
              </CardHeader>
              <CardContent>
                {scenarios[s.id as keyof typeof scenarios]?.enabled ? (
                  <div className="bg-muted/50 p-4 rounded-lg mt-2 text-sm">
                    <h4 className="font-semibold mb-2">Scenario Details</h4>
                    <p className="text-muted-foreground">
                      This scenario assumes immediate liquidity events for assets not retained. 
                      Go to the Dashboard to see how this affects your 10-year projection.
                    </p>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground flex items-center gap-2 opacity-50">
                    <AlertCircle className="w-4 h-4" /> Enable this scenario to view projections.
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
