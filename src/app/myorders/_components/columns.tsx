"use client"
import { type ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type OrdersColumn = {
    id: string
    product: string
    isFullfilled: boolean
    isPaid: boolean
    paymentStatus: string
    approval: string
    orderId: string
    createdAt: string
}

export const columns: ColumnDef<OrdersColumn>[] = [
    {
        accessorKey: 'orderId',
        header: 'Order ID',
    },
    {
        accessorKey: 'product',
        header: 'Product',
    },
    {
        accessorKey: 'isFullfilled',
        header: 'Fullfilled',
    },
    // {
    //     accessorKey: 'isPaid',
    //     header: 'Paid',
    // },
    {
        accessorKey: 'paymentStatus',
        header: 'Payment Status'
    },
    {
        accessorKey: 'approval',
        header: 'Vendor Approval'
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]