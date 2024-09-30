"use client"

import { Heading } from "~/app/admin/_components/heading"
import { Separator } from "@/components/ui/separator"
import { type ApprovalsColumn, columns } from "./columns"
import { DataTable } from "~/app/admin/_components/data-table"

interface OrderClientProps {
    data: ApprovalsColumn[]
}

export const ApprovalClient: React.FC<OrderClientProps> = ({
    data
}) => {

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Approval Requests (${data.length})`}
                    description="Manage approval Requests for your services"/>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="product"/>
        </>
    )
}