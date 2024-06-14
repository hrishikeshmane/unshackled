import { TagForm } from "./_components/tag-form";
import { api } from "~/trpc/server"

const TagPage = async ({ params }: { params: { tagId: string } }) => {
    const tag = await api.tag.getTagById({ id: params.tagId });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                {<TagForm initialData={tag} />}
            </div>
        </div>
    )
}

export default TagPage