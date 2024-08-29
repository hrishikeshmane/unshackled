"use client"
import { type ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type OrdersColumn = {
    id: string
    product: string
    customerName: string
    customerEmail: string
    isFullfilled: boolean
    paymentStatus: string
    approval: string
    isPaid: boolean
    orderTotal: string
    quantity: number
    vendorPayout: boolean
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
        accessorKey: 'quantity',
        header: 'Quantity',
    },
    {
        accessorKey: 'orderTotal',
        header: 'Order Total',
    },
    {
        accessorKey: 'customer',
        header: 'Customer Name',
    },
    {
        accessorKey: 'customerEmail',
        header: 'Customer Email',
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
        accessorKey: 'paymentStatus',
        header: 'PaymentStatus'
    },
    // {
    //     accessorKey: 'vendorPayout',
    //     header: 'Vendor Payout',
    // },
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