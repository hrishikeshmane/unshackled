import { ProductForm } from "./_components/product-form";
import { api } from "~/trpc/server";

type Question = {
  type: "short" | "long";
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  productId: string;
  vendorId: string;
  question: string;
};

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await api.product.getProductById({ id: params.productId });
  const tags = await api.tag.getTagsByStoreId({ storeId: params.storeId });
  const types = await api.types.getTypesByStoreId({ storeId: params.storeId });

  let questions: Question[] | [] = []
  if (product && product.id) {
      questions = await api.approvalForms.getQuestions(
          { productId: product.id, vendorId: product.creatorId }
        );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {<ProductForm initialData={product} tags={tags} types={types} questions={questions} />}
      </div>
    </div>
  );
};

export default ProductPage;
