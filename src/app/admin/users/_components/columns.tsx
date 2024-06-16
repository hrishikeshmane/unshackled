"use client"
import { type ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type UserColumn = {
    id: string
    fullName: string
    email: string
    role: string
    member: boolean
    createdAt: string
}

export const columns: ColumnDef<UserColumn>[] = [
    {
        accessorKey: 'id',
        header: 'User ID',
    },
    {
        accessorKey: 'fullName',
        header: 'Full Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
    {
        accessorKey: 'member',
        header: 'Member',
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