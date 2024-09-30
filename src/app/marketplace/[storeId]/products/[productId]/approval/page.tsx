import { api } from "~/trpc/server";
import ConsumerApprovalForm from "./_components/consumer-approval-form";

export default async function ApprovalPage({ params }: { params: { productId: string, storeId: string } }) {
  const product = await api.product.getProductById({ id: params.productId });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <ConsumerApprovalForm 
        storeId={params.storeId}
        productId={params.productId}
        vendorId={product.creatorId} 
      />
    </div>
  );
}