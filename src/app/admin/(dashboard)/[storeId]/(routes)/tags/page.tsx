import { format } from 'date-fns'
import { TagClient } from './_components/client';
import { api } from '~/trpc/server';
import { type TagColumn } from './_components/columns';

const TagsPage = async ({ 
    params
}: { 
    params: { storeId: string }
}) => {

    const tags = await api.tag.getTagsByStoreId({ storeId: params.storeId });

    const formattedTags: TagColumn[] = tags.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <TagClient data={formattedTags} />
            </div>
        </div>
    )
}

export default TagsPage