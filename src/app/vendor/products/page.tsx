import { format } from "date-fns";
import { ProductClient } from "./_components/client";
import { api } from "~/trpc/server";
import { type ProductColumn } from "./_components/columns";
import { type ProductWithRelations } from "~/types/globals";
import { formatPrice } from "~/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ProductsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const products: ProductWithRelations[] =
    await api.product.getProductsByCreatorId({ creatorId: userId });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    creator: item.creatorId,
    storeId: item.storeId,
    tag: item.tag ? item.tag.name : "N/A",
    type: item.type ? item.type.name : "N/A",
    isFeatured: item.isFeatured,
    isApproved: item.isApproved,
    isArchived: item.isArchived,
    price: formatPrice(Number(item.price)),
    commission: item.commission,
    estTurnAroundTime: item.estTurnAroundTime,
    domainRank: item.domainRank,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const vendor = await api.vendor.getVendorById({ userId: userId });
  const vendorStripeConnected = vendor?.stripeConnected ?? false;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient
          data={formattedProducts}
          vendorStripeConnected={vendorStripeConnected}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
