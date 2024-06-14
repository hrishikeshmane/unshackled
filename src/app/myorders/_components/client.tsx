"use client"

import { Heading } from "~/app/admin/_components/heading"
import { Separator } from "@/components/ui/separator"
import { type OrdersColumn, columns } from "./columns"
import { DataTable } from "~/app/admin/_components/data-table"

interface OrderClientProps {
    data: OrdersColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`My Orders (${data.length})`}
                    description="Manage your Orders"/>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="product"/>
        </>
    )
}