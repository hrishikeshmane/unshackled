import { ProductForm } from "./_components/product-form";
import { api } from "~/trpc/server";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await api.product.getProductById({ id: params.productId });
  const tags = await api.tag.getTagsByStoreId({ storeId: params.storeId });
  const types = await api.types.getTypesByStoreId({ storeId: params.storeId });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {<ProductForm initialData={product} tags={tags} types={types} />}
      </div>
    </div>
  );
};

export default ProductPage;
