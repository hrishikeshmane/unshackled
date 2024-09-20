"use client"
import { type ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action'; 

export type ApprovalsColumn = {
    id: string;
    productId: string;
    customerFullName: string;
    customerEmail: string;
    status: string;
    createdAt: string;
}

export const columns: ColumnDef<ApprovalsColumn>[] = [
    {
        accessorKey: 'productId',
        header: 'Product ID',
    },
    {
        accessorKey: 'customerFullName',
        header: 'Customer Name',
    },
    {
        accessorKey: 'customerEmail',
        header: 'Customer Email',
    },
    {
        accessorKey: 'status',
        header: 'Approval Status',
    },
    {
        accessorKey: 'createdAt',
        header: 'Request Date',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
];
