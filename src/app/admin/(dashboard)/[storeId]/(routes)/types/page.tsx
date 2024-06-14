import { format } from 'date-fns'
import { TypesClient } from './_components/client';
import { api } from '~/trpc/server';
import { type TypeColumn } from './_components/columns';
import { type TypeTable } from '~/types/globals';

const TypesPage = async ({ 
    params
}: { 
    params: { storeId: string }
}) => {

    const types: TypeTable[] = await api.types.getTypesByStoreId({ storeId: params.storeId });

    const formattedtypes: TypeColumn[] = types.map(item => ({
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <TypesClient data={formattedtypes} />
            </div>
        </div>
    )
}

export default TypesPage;