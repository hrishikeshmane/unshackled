import React from "react";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Overview } from "@/components/overview";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "~/trpc/server";
import { formatPrice } from "~/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";

interface VendorDashboardPageProps {
  params: { storeId: string };
}

const VendorDashboardPage: React.FC<VendorDashboardPageProps> = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!user || !userId) {
    return null;
  }

  const totalRevenue = await api.vendorAnalytics.getRevenueByCreatorId({
    creatorId: userId,
  });
  const salesCount = await api.vendorAnalytics.getSalesCountByCreatorId({
    creatorId: userId,
  });
  const stockCount = await api.vendorAnalytics.getStockCountByCreatorId({
    creatorId: userId,
  });
  const graphRevenue = await api.vendorAnalytics.getRevenueGraphByCreatorId({
    creatorId: userId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <div className="mx-auto flex max-w-3xl flex-col items-center py-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Hello <span className="text-primary">{user.firstName}</span>,
              welcome to your vendor dashboard.
            </h1>
            <p className="mt-6 max-w-prose text-lg text-muted-foreground">
              Control & manage your products, customers, view your orders and
              more.
            </p>
          </div>
        </div>
        {/* <Heading title="Dashboard" description="Overview of your store" /> */}
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Services Listed
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
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
  );
};

export default VendorDashboardPage;
