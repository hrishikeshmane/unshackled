"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "~/app/admin/_components/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ProductColumn, columns } from "./columns";
import { DataTable } from "~/app/admin/_components/data-table";
import { AddStoreModal } from "./add-product-modal";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <AddStoreModal>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </AddStoreModal>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
