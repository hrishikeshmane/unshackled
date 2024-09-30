import { api } from "~/trpc/server"
import RequestApprovalForm from "./components/request-approval-form";

const FormApprovalPage = async ({ params }: { params: { productId: string, storeId: string } }) => {
    const product = await api.product.getProductById({ id: params.productId });
    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                {<RequestApprovalForm productId={params.productId} vendorId={product?.creatorId ? product.creatorId : ""} />}
            </div>
        </div>
    )
}

export default FormApprovalPage