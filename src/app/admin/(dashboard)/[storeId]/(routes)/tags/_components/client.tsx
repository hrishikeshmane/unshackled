"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "~/app/admin/_components/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { type TagColumn, columns } from "./columns"
import { DataTable } from "~/app/admin/_components/data-table"

interface TagClientProps {
    data: TagColumn[]
}

export const TagClient: React.FC<TagClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const storeId = params.storeId;

    if (typeof storeId !== 'string') {
        return null;
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Tags (${data.length})`}
                    description="Manage Tags for your store"/>
                <Button onClick={() => router.push(`/admin/${storeId}/tags/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name"/>
        </>
    )
}