"use client"

import { Heading } from "~/app/admin/_components/heading"
import { Separator } from "@/components/ui/separator"
import { type UserColumn, columns } from "./columns"
import { DataTable } from "~/app/admin/_components/data-table"

interface UserClientProps {
    data: UserColumn[]
}

export const UserClient: React.FC<UserClientProps> = ({
    data
}) => {

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Users (${data.length})`}
                    description="Manage users"/>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="fullName"/>
        </>
    )
}