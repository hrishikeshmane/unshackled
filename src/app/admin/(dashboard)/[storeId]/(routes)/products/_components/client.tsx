"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "~/app/admin/_components/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { type ProductColumn, columns } from "./columns";
import { DataTable } from "~/app/admin/_components/data-table";
import { useUser } from "@clerk/nextjs";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const user = useUser();
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId;

  if (typeof storeId !== "string") {
    return null;
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button
          disabled={user.user?.publicMetadata.role === "admin"}
          onClick={() => router.push(`/admin/${storeId}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
