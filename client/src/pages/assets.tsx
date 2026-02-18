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
import { Asset, Liability, AssetCategory, LiabilityCategory, Owner } from "@shared/schema";
import { Plus, Trash2, Edit2, Wallet, CreditCard } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const assetFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  currentValue: z.coerce.number().min(0),
  category: z.enum(AssetCategory.options),
  owner: z.enum(Owner.options),
});

const liabilityFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  balance: z.coerce.number().min(0),
  category: z.enum(LiabilityCategory.options),
  owner: z.enum(Owner.options),
});

export default function AssetsPage() {
  const { assets, liabilities, addAsset, updateAsset, removeAsset, addLiability, updateLiability, removeLiability } = useAppStore();
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [isLiabilityOpen, setIsLiabilityOpen] = useState(false);

  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [editingLiabilityId, setEditingLiabilityId] = useState<string | null>(null);

  const assetForm = useForm<z.infer<typeof assetFormSchema>>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: { name: "", currentValue: 0, category: "other", owner: "joint" }
  });

  const liabilityForm = useForm<z.infer<typeof liabilityFormSchema>>({
    resolver: zodResolver(liabilityFormSchema),
    defaultValues: { name: "", balance: 0, category: "loan", owner: "joint" }
  });

  const onAssetSubmit = (data: any) => {
    if (editingAssetId) {
      updateAsset(editingAssetId, data);
    } else {
      addAsset({ ...data, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 }); 
    }
    setIsAssetOpen(false);
    setEditingAssetId(null);
    assetForm.reset();
  };

  const onLiabilitySubmit = (data: any) => {
    if (editingLiabilityId) {
      updateLiability(editingLiabilityId, data);
    } else {
      addLiability({ ...data }); 
    }
    setIsLiabilityOpen(false);
    setEditingLiabilityId(null);
    liabilityForm.reset();
  };

  const startEditAsset = (asset: Asset) => {
    setEditingAssetId(asset.id);
    assetForm.reset({
      name: asset.name,
      currentValue: asset.currentValue,
      category: asset.category as any,
      owner: asset.owner as any,
    });
    setIsAssetOpen(true);
  };

  const startEditLiability = (liability: Liability) => {
    setEditingLiabilityId(liability.id);
    liabilityForm.reset({
      name: liability.name,
      balance: liability.balance,
      category: liability.category as any,
      owner: liability.owner as any,
    });
    setIsLiabilityOpen(true);
  };

  const totalAssets = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.balance, 0);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Assets & Liabilities</h1>
            <p className="text-muted-foreground mt-1">Manage marital property, pensions, and debts.</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAssetOpen} onOpenChange={setIsAssetOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                  <Plus className="w-4 h-4 mr-2" /> Add Asset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Asset</DialogTitle>
                  <DialogDescription>Enter details of the asset.</DialogDescription>
                </DialogHeader>
                <form onSubmit={assetForm.handleSubmit(onAssetSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Asset Name</Label>
                    <Input {...assetForm.register("name")} placeholder="e.g. Family Home" />
                  </div>
                  <div className="space-y-2">
                    <Label>Value (£)</Label>
                    <Input type="number" {...assetForm.register("currentValue")} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select onValueChange={(v) => assetForm.setValue("category", v as any)}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {AssetCategory.options.map(o => (
                            <SelectItem key={o} value={o}>{o.replace('_', ' ')}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Owner</Label>
                      <Select onValueChange={(v) => assetForm.setValue("owner", v as any)}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Party A</SelectItem>
                          <SelectItem value="B">Party B</SelectItem>
                          <SelectItem value="joint">Joint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Asset</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isLiabilityOpen} onOpenChange={setIsLiabilityOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="shadow-lg shadow-red-500/20">
                  <Plus className="w-4 h-4 mr-2" /> Add Debt
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Liability</DialogTitle>
                  <DialogDescription>Enter details of the debt or loan.</DialogDescription>
                </DialogHeader>
                <form onSubmit={liabilityForm.handleSubmit(onLiabilitySubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Liability Name</Label>
                    <Input {...liabilityForm.register("name")} placeholder="e.g. Mortgage" />
                  </div>
                  <div className="space-y-2">
                    <Label>Balance (£)</Label>
                    <Input type="number" {...liabilityForm.register("balance")} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select onValueChange={(v) => liabilityForm.setValue("category", v as any)}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {LiabilityCategory.options.map(o => (
                            <SelectItem key={o} value={o}>{o.replace('_', ' ')}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Owner</Label>
                      <Select onValueChange={(v) => liabilityForm.setValue("owner", v as any)}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Party A</SelectItem>
                          <SelectItem value="B">Party B</SelectItem>
                          <SelectItem value="joint">Joint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Liability</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Assets Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-600" /> Assets
                </CardTitle>
                <CardDescription>Total: {formatCurrency(totalAssets)}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {assets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  No assets added yet.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            asset.owner === 'A' ? 'bg-blue-100 text-blue-700' : 
                            asset.owner === 'B' ? 'bg-emerald-100 text-emerald-700' : 
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {asset.owner === 'joint' ? 'Joint' : `Party ${asset.owner}`}
                          </span>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{formatCurrency(asset.currentValue)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => startEditAsset(asset)} className="h-8 w-8 text-muted-foreground hover:text-blue-600">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeAsset(asset.id)} className="h-8 w-8 text-muted-foreground hover:text-red-500">
                              <Trash2 className="h-4 w-4" />
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

          {/* Liabilities Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-red-600" /> Liabilities
                </CardTitle>
                <CardDescription>Total: {formatCurrency(totalLiabilities)}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {liabilities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  No liabilities added yet.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {liabilities.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.owner === 'A' ? 'bg-blue-100 text-blue-700' : 
                            item.owner === 'B' ? 'bg-emerald-100 text-emerald-700' : 
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {item.owner === 'joint' ? 'Joint' : `Party ${item.owner}`}
                          </span>
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-red-600">-{formatCurrency(item.balance)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => startEditLiability(item)} className="h-8 w-8 text-muted-foreground hover:text-blue-600">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeLiability(item.id)} className="h-8 w-8 text-muted-foreground hover:text-red-500">
                              <Trash2 className="h-4 w-4" />
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
