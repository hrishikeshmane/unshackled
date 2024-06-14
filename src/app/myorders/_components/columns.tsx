"use client"
import { type ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type OrdersColumn = {
    id: string
    product: string
    isFullfilled: boolean
    isPaid: boolean
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
    {
        accessorKey: 'isPaid',
        header: 'Paid',
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