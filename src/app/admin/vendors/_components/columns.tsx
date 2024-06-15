"use client"
import { type ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type VendorColumn = {
    id: string
    userId: string
    stripeConnected: boolean
    stripeConnectedId: string
    status: string
    createdAt: string
}

export const columns: ColumnDef<VendorColumn>[] = [
    {
        accessorKey: 'userId',
        header: 'User ID',
    },
    {
        accessorKey: 'stripeConnected',
        header: 'Stripe Connected',
    },
    {
        accessorKey: 'stripeConnectedId',
        header: 'Stripe Connected ID',
    },
    {
        accessorKey: 'status',
        header: 'Status',
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