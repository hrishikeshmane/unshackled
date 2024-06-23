import { redirect } from "next/navigation";
import React from "react";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import Billboard from "~/components/billboard";
import { api } from "~/trpc/server";
import { type BillboardTable } from "~/types/globals";
import Marketplace from "./_components/marketplace";
import BecomeASeller from "../_components/become-a-seller";

interface StoreParams {
  params: { storeId: string };
}

const StorePage = async ({ params }: StoreParams) => {
  const store = await api.store.getStoreById({ id: params.storeId });
  const billboard = await api.billboard.getBillboardsByStoreId({
    storeId: params.storeId,
  });
  const products = await api.product.getApprovedProductsByStoreId({
    storeId: params.storeId,
  });

  if (!store || !billboard) {
    redirect("/marketplace");
  }

  return (
    <MaxWidthWrapper>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard[0] as BillboardTable} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <Marketplace products={products} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default StorePage;
