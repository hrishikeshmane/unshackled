"use client"

import { Heading } from "~/app/admin/_components/heading"
import { Separator } from "@/components/ui/separator"
import { type VendorColumn, columns } from "./columns"
import { DataTable } from "~/app/admin/_components/data-table"

interface VendorClientProps {
    data: VendorColumn[]
}

export const VendorClient: React.FC<VendorClientProps> = ({
    data
}) => {

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Vendors (${data.length})`}
                    description="Manage Vendors"/>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="userId"/>
        </>
    )
}