import { format } from "date-fns";
import { ProductClient } from "./_components/client";
import { api } from "~/trpc/server";
import { type ProductColumn } from "./_components/columns";
import { type ProductWithRelations } from "~/types/globals";
import { formatPrice } from "~/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products: ProductWithRelations[] =
    await api.product.getProductsByStoreId({ storeId: params.storeId });

  const formattedProducts: ProductColumn[] = await Promise.all(
    products.map(async (item) => {
      let creatorName = item.creatorId;
      try {
        const user = await clerkClient.users.getUser(item.creatorId);
        if (user) {
          creatorName =
            `${user.firstName} ${user.lastName}`.trim() ??
            user.emailAddresses[0]?.emailAddress ??
            item.creatorId;
        }
      } catch (error) {
        console.error(
          `Error fetching user for creatorId ${item.creatorId}:`,
          error,
        );
      }

      return {
        id: item.id,
        name: item.name,
        creator: item.creatorId,
        tag: item.tag ? item.tag.name : "N/A",
        type: item.type ? item.type.name : "N/A",
        isFeatured: item.isFeatured,
        isApproved: item.isApproved,
        isArchived: item.isArchived,
        price: formatPrice(Number(item.price)),
        commission: item.commission,
        commissionType: item.commissionType,
        estTurnAroundTime: item.estTurnAroundTime,
        domainRank: item.domainRank,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
      };
    }),
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
