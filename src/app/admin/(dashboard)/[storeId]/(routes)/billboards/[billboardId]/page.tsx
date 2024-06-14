import { BillboardForm } from "./_components/billboard-form";
import { api } from "~/trpc/server"

const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
    const billboard = await api.billboard.getBillboardById({ id: params.billboardId });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                {<BillboardForm initialData={billboard} />}
            </div>
        </div>
    )
}

export default BillboardPage;