import { Layout } from "@/components/layout";
import { SummaryCards } from "@/components/summary-cards";
import { useEngine } from "@/hooks/use-engine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { formatCurrency } from "@/lib/utils";

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'];

export default function Dashboard() {
  const { netWorth, liquidity, projection } = useEngine();

  const pieData = [
    { name: 'Party A', value: netWorth.partyA },
    { name: 'Party B', value: netWorth.partyB },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Financial Overview</h1>
          <p className="text-muted-foreground mt-2">Current snapshot of marital assets and liabilities.</p>
        </div>

        <SummaryCards netWorth={netWorth} liquidity={liquidity} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Asset Split</CardTitle>
              <CardDescription>Current division of net wealth</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#2563EB' : '#10B981'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>10-Year Projection</CardTitle>
              <CardDescription>Estimated future wealth based on current inputs</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projection}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `£${value / 1000}k`} 
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    cursor={{fill: 'transparent'}}
                  />
                  <Legend />
                  <Bar dataKey="assetsA" name="Party A" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="assetsB" name="Party B" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
