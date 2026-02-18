import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/utils";
import { Income, Expense, ExpenseCategory } from "@shared/schema";
import { Edit2, Plus, Trash2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const incomeFormSchema = z.object({
  name: z.string().min(1, "Name required"),
  amountAnnualGross: z.coerce.number().min(0),
  owner: z.enum(["A", "B"]),
});

const expenseFormSchema = z.object({
  name: z.string().min(1, "Name required"),
  amountAnnual: z.coerce.number().min(0),
  category: z.enum(ExpenseCategory.options),
  owner: z.enum(["A", "B", "shared"]),
});

export default function BudgetPage() {
  const { incomes, expenses, addIncome, updateIncome, removeIncome, addExpense, updateExpense, removeExpense } = useAppStore();
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const incomeForm = useForm<z.infer<typeof incomeFormSchema>>({
    resolver: zodResolver(incomeFormSchema),
    defaultValues: { name: "", amountAnnualGross: 0, owner: "A" }
  });

  const expenseForm = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: { name: "", amountAnnual: 0, category: "living", owner: "shared" }
  });

  const onIncomeSubmit = (data: any) => {
    if (editingIncomeId) {
      updateIncome(editingIncomeId, data);
    } else {
      addIncome({ ...data, taxTreatment: "use_tax_model" }); 
    }
    setIsIncomeOpen(false);
    setEditingIncomeId(null);
    incomeForm.reset();
  };

  const onExpenseSubmit = (data: any) => {
    if (editingExpenseId) {
      updateExpense(editingExpenseId, data);
    } else {
      addExpense({ ...data, inflationLinked: true }); 
    }
    setIsExpenseOpen(false);
    setEditingExpenseId(null);
    expenseForm.reset();
  };

  const startEditIncome = (income: Income) => {
    setEditingIncomeId(income.id);
    incomeForm.reset({
      name: income.name,
      amountAnnualGross: income.amountAnnualGross,
      owner: income.owner as any
    });
    setIsIncomeOpen(true);
  };

  const startEditExpense = (expense: Expense) => {
    setEditingExpenseId(expense.id);
    expenseForm.reset({
      name: expense.name,
      amountAnnual: expense.amountAnnual,
      category: expense.category as any,
      owner: expense.owner as any
    });
    setIsExpenseOpen(true);
  };

  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amountAnnualGross, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amountAnnual, 0);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Budget Planner</h1>
            <p className="text-muted-foreground mt-1">Estimate post-divorce income needs.</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isIncomeOpen} onOpenChange={setIsIncomeOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">
                  <Plus className="w-4 h-4 mr-2" /> Add Income
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Income Source</DialogTitle>
                </DialogHeader>
                <form onSubmit={incomeForm.handleSubmit(onIncomeSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Source Name</Label>
                    <Input {...incomeForm.register("name")} placeholder="e.g. Salary" />
                  </div>
                  <div className="space-y-2">
                    <Label>Annual Gross (£)</Label>
                    <Input type="number" {...incomeForm.register("amountAnnualGross")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Earner</Label>
                    <Select onValueChange={(v) => incomeForm.setValue("owner", v as any)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Party A</SelectItem>
                        <SelectItem value="B">Party B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Income</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isExpenseOpen} onOpenChange={setIsExpenseOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="shadow-lg shadow-red-500/20">
                  <Plus className="w-4 h-4 mr-2" /> Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Annual Expense</DialogTitle>
                </DialogHeader>
                <form onSubmit={expenseForm.handleSubmit(onExpenseSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Expense Name</Label>
                    <Input {...expenseForm.register("name")} placeholder="e.g. Groceries" />
                  </div>
                  <div className="space-y-2">
                    <Label>Annual Amount (£)</Label>
                    <Input type="number" {...expenseForm.register("amountAnnual")} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select onValueChange={(v) => expenseForm.setValue("category", v as any)}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {ExpenseCategory.options.map(o => (
                            <SelectItem key={o} value={o}>{o.replace('_', ' ')}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Who Pays?</Label>
                      <Select onValueChange={(v) => expenseForm.setValue("owner", v as any)}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shared">Shared / Joint</SelectItem>
                          <SelectItem value="A">Party A</SelectItem>
                          <SelectItem value="B">Party B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Expense</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpCircle className="text-emerald-500" /> Income Sources
              </CardTitle>
              <CardDescription>Total Annual Gross: {formatCurrency(totalIncome)}</CardDescription>
            </CardHeader>
            <CardContent>
              {incomes.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No income recorded.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead>Earner</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomes.map(i => (
                      <TableRow key={i.id}>
                        <TableCell className="font-medium">{i.name}</TableCell>
                        <TableCell>{i.owner === 'A' ? 'Party A' : 'Party B'}</TableCell>
                        <TableCell className="text-right tabular-nums">{formatCurrency(i.amountAnnualGross)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => startEditIncome(i)} className="h-8 w-8 text-muted-foreground hover:text-blue-600">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeIncome(i.id)} className="h-8 w-8 text-muted-foreground hover:text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownCircle className="text-red-500" /> Living Expenses
              </CardTitle>
              <CardDescription>Total Annual: {formatCurrency(totalExpenses)}</CardDescription>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No expenses recorded.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map(e => (
                      <TableRow key={e.id}>
                        <TableCell className="font-medium">{e.name}</TableCell>
                        <TableCell className="capitalize">{e.category.replace('_', ' ')}</TableCell>
                        <TableCell className="text-right tabular-nums text-red-600">-{formatCurrency(e.amountAnnual)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => startEditExpense(e)} className="h-8 w-8 text-muted-foreground hover:text-blue-600">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeExpense(e.id)} className="h-8 w-8 text-muted-foreground hover:text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
