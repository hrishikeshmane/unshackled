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
    quantity: number
    orderTotal: string
    vendorPayout: boolean
    orderId: string
    createdAt: string
    customerFullName: string
    customerEmail: string
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
        accessorKey:'customerFullName',
        header: 'Customer Name'
    },
    {
        accessorKey:'customerEmail',
        header: 'Customer Email'
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
    {
        accessorKey: 'orderTotal',
        header: 'Order Total',
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
        header: 'paymentStatus'
    },
    // {
    //     accessorKey: 'vendorPayout',
    //     header: 'Vendor Payout',
    // },
    {
        accessorKey: "approval",
        header: 'approval'
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