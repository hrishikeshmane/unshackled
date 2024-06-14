import { TypeForm } from "./_components/type-form";
import { api } from "~/trpc/server"

const TypePage = async ({ params }: { params: { typeId: string, storeId: string } }) => {
    const Type = await api.types.getTypeById({ id: params.typeId });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                {<TypeForm initialData={Type} />}
            </div>
        </div>
    )
}

export default TypePage;