import React from 'react'
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Overview } from "@/components/overview";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heading } from '~/app/admin/_components/heading';
import { Separator } from "@/components/ui/separator";
import { api } from '~/trpc/server';
import { formatPrice } from '~/lib/utils';

interface DashboardPageProps {
  params: { storeId: string }
}


const DashboardPage: React.FC<DashboardPageProps> = async ({ params })  => {
  const { storeId } = params;
  const store = await api.store.getStoreById({ id: storeId });


  const totalRevenue = await api.storeAnalytics.getRevenueByStoreId({ storeId });
  const salesCount = await api.storeAnalytics.getSalesCountByStoreId({ storeId });
  const stockCount = await api.storeAnalytics.getStockCountByStoreId({ storeId });
  const graphRevenue = await api.storeAnalytics.getRevenueGraphByStoreId({ storeId });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{salesCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
               Services Listed
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stockCount}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage