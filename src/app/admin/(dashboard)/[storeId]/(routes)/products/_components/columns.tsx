"use client"
import { type ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type ProductColumn = {
    id: string;
    name: string;
    price: string;
    commission: string;
    commissionType: string;
    creator: string;
    estTurnAroundTime: string;
    domainRank: string;
    isFeatured: boolean;
    isArchived: boolean;
    isApproved: string;
    tag: string;
    type: string;
    createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: 'name',
        header: 'name',
    },
    {
        accessorKey: 'creator',
        header: 'Creator',
    },
    {
        accessorKey: 'tag',
        header: 'Tag',
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'price',
        header: 'price',
    },
    {
        accessorKey: 'commission',
        header: 'Commission',
    },
    {
        accessorKey: 'commissionType',
        header: 'Commission Type',
    },
    {
        accessorKey: 'estTurnAroundTime',
        header: 'Turnaround Time',
    },
    {
        accessorKey: 'domainRank',
        header: 'Rank',
    },
    {
        accessorKey: 'isFeatured',
        header: 'Featured',
    },
    {
        accessorKey: 'isArchived',
        header: 'Archived',
    },
    {
        accessorKey: 'isApproved',
        header: 'Approved',
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